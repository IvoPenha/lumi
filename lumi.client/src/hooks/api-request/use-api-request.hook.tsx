import { useState, useEffect } from 'react';
import { toastError, toastSuccess } from '../toast';
import { ResultApi } from '@/types/services';

type ApiRequestOption = {
  noFeedback?: boolean;
  message?: string;
};

type UseApiRequestOptions<Y> = {
  params?: Y;
  success?: ApiRequestOption;
  error?: ApiRequestOption;
  noFeedback?: boolean;
  autoExecute?: boolean; 
};

export function useApiRequest<T, Y>(apiCall: (params: Y) => Promise<ResultApi<T>>, options: UseApiRequestOptions<Y> = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const handleError = (error?: any) => {
    if (options.noFeedback || options?.error?.noFeedback) return;

    const errorMessage = error?.message || options?.error?.message || 'Erro desconhecido';
    setError(errorMessage);
    toastError(errorMessage);
  };

  const handleSuccess = (data: T) => {
    setData(data);
    if (options.noFeedback || options?.success?.noFeedback) return;

    const successMessage = options.success?.message || 'Requisição realizada com sucesso!';
    toastSuccess(successMessage);
  };

  const execute = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(options.params as Y);
      if (!response?.success) return handleError(response);

      handleSuccess(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    if (options.autoExecute) {
      execute();
    }
  }, [options.params]); 

  return { data, loading, error, execute };
}
