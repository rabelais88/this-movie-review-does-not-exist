import { joinClass } from '@/utils';
import { useSearch } from '@/utils/react-hooks';
import { type InputHTMLAttributes } from 'react';
import ItemActor from './ItemActor';
import ItemFilm from './ItemFilm';
import IconSearch from './IconSearch';
import IconClose from './IconClose';

interface SearchReviewInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const SearchReviewInput = ({ className, ...props }: SearchReviewInputProps) => {
  const { keyword, setKeyword, searchResult } = useSearch();
  return (
    <div
      data-comp="search-review-input"
      className={joinClass('relative z-50', className)}
    >
      <input
        className="pl-4"
        value={keyword}
        onChange={(ev) => setKeyword(ev.target.value)}
        type="text"
        {...props}
      />
      {keyword === '' && (
        <IconSearch className="absolute right-2 -translate-y-1/2 inset-y-1/2 text-[#757575] pointer-events-none" />
      )}
      {keyword !== '' && (
        <IconClose
          className="absolute right-2 -translate-y-1/2 inset-y-1/2 text-[#757575] cursor-pointer"
          onClick={() => setKeyword('')}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 overflow-visible">
        <div className="absolute inset-x-0 top-0 max-h-[300px] bg-white overflow-y-auto flex flex-col">
          {searchResult.map((result) =>
            result.item.type === 'film' ? (
              <ItemFilm key={result.refIndex} data={result} />
            ) : (
              <ItemActor key={result.refIndex} data={result} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchReviewInput;
