export class SaveJWT{
  static readonly type = 'Security-SaveJWT';
  constructor(public payload: string) {
  }
}

export class DeleteJWT{
  static readonly type = 'Security-DeleteJWT';
  constructor() {}
}
