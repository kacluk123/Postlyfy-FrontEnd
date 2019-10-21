export interface UseWindowScroll {
  limit: number;
  additionalParams?: any;
}

export interface UseWindowScrollParams extends UseWindowScroll {
  callback: ({ limit, offset, additionalParams }: UseWindowScroll) => void;
}
