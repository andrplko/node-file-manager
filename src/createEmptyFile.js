import { writeFile } from 'fs/promises';
import { join } from 'path';

const createEmptyFile = async (input, homeDirectory) => {
  const fileName = input.replace(/^add\s*/, '');
  const filePath = join(homeDirectory, fileName);

  await writeFile(filePath, '');
}

export { createEmptyFile };
