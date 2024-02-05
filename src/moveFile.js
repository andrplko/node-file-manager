import { createReadStream, createWriteStream, unlink } from 'node:fs';
import { join } from 'path';
import { access } from 'fs/promises';

const move = async (input, homeDirectory) => {
  const transformedInput = input.split(/\s/g).filter(item => item !== '');
  const [file, destination] = [transformedInput[1], transformedInput[2]];

  const sourceFilePath = join(homeDirectory, file);
  const destinationFilePath = join(homeDirectory, destination, file);

  try {
    await access(sourceFilePath);
  } catch {
    console.error('Operation failed');
    return;
  }

  const readableStream = createReadStream(sourceFilePath, { encoding: 'utf8' });
  const writableStream = createWriteStream(destinationFilePath, { encoding: 'utf8' });

  readableStream.on('error', () => {
    console.error('Operation failed');
  });

  writableStream.on('error', () => {
    console.error('Operation failed');
  });

  readableStream.on('finish', () => {
    unlink(sourceFilePath, (err) => {
      if (err) {
        console.error('Operation failed');
      }
    });
  });

  readableStream.pipe(writableStream);
}

export { move };
