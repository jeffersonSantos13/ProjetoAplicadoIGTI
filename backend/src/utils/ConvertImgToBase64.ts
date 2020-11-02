import path from 'path';
import fs from 'fs';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const ConvertImgToBase64 = async ({ file }) => {
  const bitmap = fs.readFileSync(`${tmpFolder}\\${file}`);

  return bitmap.toString('base64');
};

export default ConvertImgToBase64;
