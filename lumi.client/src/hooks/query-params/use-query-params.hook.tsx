import { useSearchParams } from 'react-router';
import { useMemo } from 'react';

export const useQueryParams = <T extends string>(params: T[]) => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    return params.reduce(
      (acc, param) => {
        acc[param] = searchParams.get(param) || null;
        return acc;
      },
      {} as Record<T, string | null>
    );
  }, [searchParams.toString()]); 
};
