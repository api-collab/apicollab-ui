export class WrappedCollection<T> {
  items: Array<T> = [];
  totalCount: number;
  constructor(items?: Array<T>, totalCount?: number) {
    this.items = items;
    this.totalCount = totalCount;
  }
}
