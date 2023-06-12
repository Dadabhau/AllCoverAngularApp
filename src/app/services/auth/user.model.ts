export class User {
  constructor(
    public username: string,
    public id: string,
    private _token: string,
    private _tokanExpirationDate: Date
  ) {}
  get token() {
    if (!this._tokanExpirationDate || new Date() > this._tokanExpirationDate) {
      return null;
    }
    return this._token;
  }
}
