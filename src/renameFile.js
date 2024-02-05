import { promises } from 'fs';
import { join } from 'path';

const rename = async (input, homeDirectory) => {
  const transformedInput = input.split(/\s/g).filter(item => item !== '');
  const [oldFileName, newFileName] = [transformedInput[1], transformedInput[2]];

  try {
    const oldFilePath = join(homeDirectory, oldFileName);
    const newFilePath = join(homeDirectory, newFileName);
    const content = await promises.readFile(oldFilePath, { encoding: 'utf-8' });
    await promises.writeFile(newFilePath, content);
    await promises.rename(oldFilePath, newFilePath);
  } catch {
    console.error('Operation failed');
  }
}

export { rename };
