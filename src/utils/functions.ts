import DatauriParser from "datauri/parser";
import bcrypt from "bcrypt";

export const datauriFormat = (buffer: Buffer) => {
  const parse = new DatauriParser();
  return parse.format(".jpeg", buffer);
};

export const hashPasswordFC = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePasswordFC = (currentPassword: string, password: string): boolean => {
  if (!currentPassword) return true;
  if (!password) return false;
  return bcrypt.compareSync(password, currentPassword);
};

export const splitFullName = (fullName: string) => {
  const split = fullName.split(" ");
  const firstNameSplice = split[0];
  split.splice(0, 1); // cut lastName
  return { firstName: firstNameSplice, lastName: split.join(" ") };
};

export function normalizePort(portValue: string) {
  const port = parseInt(portValue, 10);
  if (Number.isNaN(port)) return portValue;
  if (port >= 0) return port;
  return false;
}
