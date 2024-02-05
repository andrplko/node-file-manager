import { parseArgs } from "./parseArgs.js";
import { stdin as input, stdout as output } from 'node:process';
import { homedir } from 'node:os';
import { createInterface } from 'node:readline';
import path from 'node:path';
import { displayContentOfDirectory } from "./displayContentOfDirectory.js";
import { changeDirectory } from "./changeDirectory.js";
import { navigateToUpDirectory } from "./navigateToUpDirectory.js";
import { getOperatingSystemInfo } from "./getOperatingSystemInfo.js";
import { read } from "./readFile.js";
import { createEmptyFile } from "./createEmptyFile.js";
import { remove } from "./removeFile.js";
import { rename } from "./renameFile.js";
import { copy } from "./copyFile.js";
import { move } from "./moveFile.js";
import { calculateHash } from "./calculateHash.js";
import { compress } from "./compressFile.js";
import { decompress } from "./decompressedFile.js";

const startApplication = () => {
  const username = parseArgs();
  let homeDirectory = homedir();
  console.log(`Welcome to the File Manager, ${username}!`);

  const lineReader = createInterface({
    input,
    output,
    prompt: `\nYou are currently in ${homeDirectory}\n`,
  });

  lineReader.prompt();

  lineReader.on('line', async (input) => {
    if (input === '.exit') {
      lineReader.close();
    } else if (input === 'ls') {
      await displayContentOfDirectory(homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('cd')) {
      if (input === 'cd') {
        homeDirectory = path.parse(homeDirectory).root;
      }
      const newDir = input.replace(/^cd\s*/, '');
      homeDirectory = await changeDirectory(lineReader, homeDirectory, newDir);
    } else if (input === 'up') {
      homeDirectory = navigateToUpDirectory(lineReader, homeDirectory);
    } else if (input.startsWith('os --')) {
      getOperatingSystemInfo(input);
      lineReader.prompt();
    } else if (input.startsWith('cat ')) {
      read(input);
    } else if (input.startsWith('add ')) {
      await createEmptyFile(input, homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('rm ')) {
      await remove(input, homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('rn ')) {
      await rename(input, homeDirectory);s
      lineReader.prompt();
    } else if (input.startsWith('cp ')) {
      copy(input, homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('mv ')) {
      await move(input, homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('hash ')) {
      await calculateHash(input, homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('compress ')) {
      await compress(input, homeDirectory);
      lineReader.prompt();
    } else if (input.startsWith('decompress ')) {
      await decompress(input, homeDirectory);
      lineReader.prompt();
    } else {
      console.log('Invalid input\n');
    }
  })

  lineReader.on('close', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  })
}

startApplication();
