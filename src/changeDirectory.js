import { access } from 'node:fs/promises';
import path from 'node:path';

const changeDirectory = async (lineReader, homeDirectory, newDir) => {
  const newPath = path.join(homeDirectory, newDir);

  try {
    await access(newPath);
    homeDirectory = newPath;
    lineReader.setPrompt(`\nYou are currently in ${homeDirectory}\n`);
    lineReader.prompt();
  } catch {
    console.error('\nOperation failed');
  }

  return homeDirectory;
};

export { changeDirectory };