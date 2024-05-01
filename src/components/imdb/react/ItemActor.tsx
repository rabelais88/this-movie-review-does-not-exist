import type { SearchIndex } from '@/utils/search-index';
import type { FuseResult } from 'fuse.js';

const ItemActorIMDB = ({ data }: { data: FuseResult<SearchIndex> }) => {
  return (
    <a
      className="bg-[#1F1F1F] text-white flex p-3 font-imdb-roboto hover:bg-[rgb(80,80,80)] gap-2"
      // href={`/person/${data.item.id}`}
      href={`/?q=${data.item.name}`}
    >
      <p>
        <b>Person</b>: {data.item.name}
      </p>
    </a>
  );
};

export default ItemActorIMDB;
