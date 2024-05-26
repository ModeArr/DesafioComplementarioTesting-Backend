import { genSalt, hashSync, compareSync } from "bcrypt";

const createHash = async (pass) => {
  const salt = await genSalt()
  return await hashSync(pass, salt)
};

const isValidPasswd = async (psw, encryptedPsw) => {
  const isValid = await compareSync(psw, encryptedPsw)
  return isValid
};

export {
  createHash,
  isValidPasswd,
};