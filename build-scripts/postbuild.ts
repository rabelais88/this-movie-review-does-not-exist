import { promises as fs, createReadStream } from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { mapLimit, parallelLimit } from 'async';

import {
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

const serverLog = (...args: any[]) => {
  console.log(...args);
};
const S3_PATH = './public/images';
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION ?? '',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY ?? '',
  },
});

// Recursive getFiles from
// https://stackoverflow.com/a/45130990/831465
async function getFiles(dir: string): Promise<string | string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

export async function uploadFileS3(fileName: string) {
  serverLog('uploading file...', fileName);
  //   const fileBuffer = (await file.arrayBuffer()) as Buffer;
  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: path.relative(S3_PATH, fileName),
    // Body: await fileToBuffer(file), await file.arrayBuffer() as Buffer
    Body: createReadStream(fileName),
  };
  const command = new PutObjectCommand(params);
  const data = await s3Client.send(command);
  serverLog('file upload finished.');
}

const postBuild = async () => {
  const files = (await getFiles(S3_PATH)) as string[];
  let i = 1;
  mapLimit(
    files,
    2,
    async (fileName: string) => {
      serverLog(`${i}/${files.length}`);
      await uploadFileS3(fileName);
      i++;
    },
    () => {
      serverLog('s3 upload finished');
    }
  );
};

await postBuild();
