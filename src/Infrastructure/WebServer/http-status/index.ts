export const OK = 200;
export const BAD = 400;
export const NOT_FOUND =404;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;

interface msg {
  msg: string
}

export const DELETED: msg = {msg : "Deleted"}
export const UPDATED: msg = {msg : 'Updated'}
export const ERROR: msg = {msg : "Error"}
export const SAVED: msg = {msg : "Saved"} 


export const sendMsg = (msg: string): msg => {
  return {msg}
} 

