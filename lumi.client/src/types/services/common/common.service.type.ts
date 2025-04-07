export type CommonRangeType<T> = {
  start: T;
  end: T;
};

export type ResultApi<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type Pagination<T> = {
  page?: number;
  size?: number;
  total?: number;
  data?: T[];
  success?: boolean;
};
