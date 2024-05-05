import type { SearchIndex } from '@/utils/search-index';
import type { FuseResult } from 'fuse.js';

const ItemFilm = ({
  data,
  cloudFrontUrl,
}: {
  data: FuseResult<SearchIndex>;
  cloudFrontUrl: string;
}) => {
  return (
    <a
      className=" h-[120px] p-3 font-franklin text-black flex gap-2"
      href={`/rt/review/${data.item.id}`}
    >
      <img
        src={`${cloudFrontUrl}/${data.item.id}-0.webp`}
        className="h-full w-[200px] object-cover rounded-[4px]"
      />
      <div className="flex-1">
        <p>
          <b>{data.item.name}</b>
          <span>({data.item.year})</span>
        </p>
        <p>{data.item.actors}</p>
      </div>
    </a>
  );
};

export default ItemFilm;
