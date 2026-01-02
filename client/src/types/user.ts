export type User = {
  id:string,
  displayName:string,
  email:string,
  token:string,
  photoUrl?:string
};

export type LoginDto = {
  email:string,
  password:string
};
