export enum ROLE {
  expert = 1,
  manage,
  admin,
}
export enum KINDOFBUSINESS {
  production = 1,
  trading,
  tradAndProduct,
}
export enum STATUSOFCER {
  active = 1,
  evict, // bi thu hoi
  exprire,
}
export enum PHASEINSPECT {
  inspectAtOffice = 1, // kiem tra tai co so
  experiment, // lay mau thi nghiem
  conclude, // ket luan
  penalize, // xu phat
}
