// hooks/useUpdateFetch.ts
import { useSearchParams } from 'react-router';

export function useUpdateFetch() {
  const [searchParams, setSearchParams] = useSearchParams();

  function updateFetch() {
    const fetchId = parseInt(searchParams.get('fetchId') || '1', 10);
    const updatedFetch = (fetchId + 1).toString();

    searchParams.set('fetchId', updatedFetch);
    setSearchParams(searchParams); // atualiza a URL
  }

  return updateFetch;
}
