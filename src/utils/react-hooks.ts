import Fuse, { type FuseOptionKey } from 'fuse.js';
import type { SearchIndex } from '@/utils/search-index';
import { useEffect, useMemo, useState } from 'react';

interface SearchIndexApi {
  count: number;
  list: SearchIndex[];
}

const initFuse = <T extends object, K extends FuseOptionKey<T>>(
  list: T[],
  keys: K[]
) => {
  const fuseOptions = {
    keys,
    includeMatches: true,
    threshold: 0.4,
  };
  const fuse = new Fuse(list, fuseOptions);
  return fuse;
};

const urlSearchParams = new URLSearchParams(window.location.search);
const keywordInternal = urlSearchParams.get('q') ?? '';

export const useSearch = () => {
  const [initialKeyword] = useState(keywordInternal);
  const [keyword, _setKeyword] = useState(initialKeyword);

  const setKeyword = (k: string) => {
    var sp = new URLSearchParams(window.location.search);
    sp.set('q', k);
    // window.location.search = sp.toString();
    window.history.replaceState(null, '', `?${sp.toString()}`);
    _setKeyword(k);
  };

  const [fuse, setFuse] =
    useState<ReturnType<typeof initFuse<SearchIndex, []>>>();

  const onInit = async () => {
    const req = await fetch('/api/search-index.json');
    const _data = (await req.json()) as SearchIndexApi;
    if (_data) {
      const _list = _data?.list as SearchIndex[];
      const _fuse = initFuse(_list, [
        'name',
        'year',
        'actors',
        'content',
        'director',
      ]);
      if (_fuse) setFuse(_fuse);
    }
  };

  const searchResult = useMemo(() => {
    if (!fuse) return [];
    const searchRes = fuse.search(keyword);
    console.log(searchRes);
    return searchRes;
  }, [fuse, keyword]);

  useEffect(() => {
    onInit();
  }, []);
  return { searchResult, setKeyword, keyword };
};
