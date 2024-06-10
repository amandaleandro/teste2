import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export const genUUID = (): string => {
  return uuidv4();
};

export const passwordHash = (secret: string): string => {
  return bcrypt.hash(secret, 10);
};
