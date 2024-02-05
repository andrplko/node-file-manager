import { rm } from 'fs/promises';
import { join } from 'path';

const remove = async (input, homeDirectory) => {
  const fileName = input.replace(/^rm\s*/, '');

  try {
    const filePath = join(homeDirectory, fileName);
    await rm(filePath);
  } catch {
    console.error('Operation failed');
  }
}

export { remove };
