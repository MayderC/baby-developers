
export interface ITokenPayload {

  id: string;
  fullName: string;
  roles : string[]
}

export interface IRefreshTokenPayload {
  id: string;
}