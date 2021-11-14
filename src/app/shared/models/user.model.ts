export class User {
  constructor(
    public id: string,
    public email: string,
    public userName?: string,
    public token?: string,
    public tokenExpirationDate?: Date
  ) {}
}
