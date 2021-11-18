export class Transaction {
  constructor(
    public id: string,
    public categoryId: string,
    public spent: number,
    public date: Date
  ) {}
}
