import type { SearchIndex } from '@/utils/search-index';
import type { FuseResult } from 'fuse.js';

const ItemActorIMDB = ({ data }: { data: FuseResult<SearchIndex> }) => {
  return (
    <a
      className="flex font-franklin p-3 text-black"
      // href={`/person/${data.item.id}`}
      href={`/rt?q=${data.item.name}`}
    >
      <p>
        <b>Person</b>: {data.item.name}
      </p>
    </a>
  );
};

export default ItemActorIMDB;
