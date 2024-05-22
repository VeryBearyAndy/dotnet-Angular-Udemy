export interface Pagenation<T> {
    pageIndex: number
    pageSize: number
    count: number
    data: T;
  }
  