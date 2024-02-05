import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'path';

const copy = (input, homeDirectory) => {
  const transformedInput = input.split(/\s/g).filter(item => item !== '');
  const [file, destination] = [transformedInput[1], transformedInput[2]];

  const sourceFilePath = join(homeDirectory, file);
  const destinationFilePath = join(homeDirectory, destination, file);

  const readableStream = createReadStream(sourceFilePath, { encoding: 'utf8' });
  const writableStream = createWriteStream(destinationFilePath, { encoding: 'utf8' });

  readableStream.pipe(writableStream);

  readableStream.on('error', () => {
    console.error('Operation failed');
  });

  writableStream.on('error', () => {
    console.error('Operation failed');
  });
}

export { copy };
