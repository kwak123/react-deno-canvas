import { exists } from '../deps.ts';
const cleanFileName = (fileName: string) => {
  if (fileName[0] === '/') {
    return fileName.slice(1);
  }
  return fileName;
};

interface GottenFile {
  file: Deno.File;
  fileInfo: Deno.FileInfo;
  fileType: string;
}

export const getFileOrIndexHtml = async (baseDir: string, fileName: string) => {
  const cleanedFileName = cleanFileName(fileName);
  const filePath = `${baseDir}/${cleanedFileName}`;
  const indexHtmlPath = `${baseDir}/index.html`;

  try {
    const fileExists = await exists(filePath);
    const pathToUse = fileExists ? filePath : indexHtmlPath;
    const [file, fileInfo] = await Promise.all([
      Deno.open(pathToUse),
      Deno.stat(pathToUse),
    ]);
    const fileType = pathToUse.split('.').pop();
    return {
      file,
      fileInfo,
      fileType,
    } as GottenFile;
  } catch (e) {
    console.error(`Failed to read path ${filePath}`);
    console.error(e.message);
    return null;
  }
};
