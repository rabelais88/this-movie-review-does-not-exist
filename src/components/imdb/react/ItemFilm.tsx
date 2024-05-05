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
      className="bg-[#1F1F1F] flex-col lg:flex-row lg:h-[120px] text-white flex p-3 font-imdb-roboto hover:bg-[rgb(80,80,80)] gap-2"
      href={`/review/${data.item.id}`}
    >
      <img
        src={`${cloudFrontUrl}/${data.item.id}-0.webp`}
        className="h-full w-[200px] object-cover"
      />
      <div className="flex-1">
        <p>{data.item.name}</p>
        <p className="text-gray-400">{data.item.year}</p>
        <p className="text-gray-400">{data.item.actors}</p>
      </div>
    </a>
  );
};

export default ItemFilm;
