import bcrypt from 'bcrypt'
import crypto from "crypto"

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

export function generateRandomString(length) {
  if (typeof length !== 'number' || length <= 0) {
      throw new Error('Invalid length for generateRandomString');
  }

  const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
  const randomString = randomBytes.toString('hex').slice(0, length);
  return randomString;
}
