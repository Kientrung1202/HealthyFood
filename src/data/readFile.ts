import fs from "fs";

export const isExistFile = async (file: string) =>
  new Promise((resolve, reject) => {
    fs.access(file, fs.constants.F_OK, (error) => {
      if (error) return reject(error);

      resolve(true);
    });
  });

export const readFile = async (file: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appendFile = async (pathFile: string, data: any) =>
  new Promise((resolve, reject) => {
    fs.appendFile(pathFile, data, (error) => {
      if (error) return reject(error);

      return resolve(true);
    });
  });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeFile = async (pathFile: string, data: any) =>
  new Promise((resolve, reject) => {
    fs.writeFile(pathFile, data, (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
export const deleteFirstLine = async (pathFile: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf8", (error, data) => {
      if (error) return reject(error);
      const linesExceptFirst = data.split("\n").slice(1).join("\n");
      fs.writeFile(pathFile, linesExceptFirst, (error) => {
        if (error) return reject(error);

        return resolve(true);
      });
    });
  });
export const unlinkFile = async (pathFile: string) =>
  new Promise((resolve, reject) => {
    fs.unlink(pathFile, (error) => {
      if (error) return reject(error);

      resolve(true);
    });
  });
