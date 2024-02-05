import path from 'node:path';

const navigateToUpDirectory = (lineReader, homeDirectory) => {
  if (homeDirectory !== path.parse(homeDirectory).root) {
    const newDir = path.join(homeDirectory, '..');
    homeDirectory = newDir;
    lineReader.setPrompt(`\nYou are currently in ${homeDirectory}\n`);
  }
  lineReader.prompt();

  return homeDirectory;
}

export { navigateToUpDirectory };
