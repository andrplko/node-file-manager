import { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'stream/promises';
import { rm } from 'fs/promises';
import { join } from 'path';

const decompress = async (input, homeDirectory) => {
  const transformedInput = input.split(/\s/g).filter(item => item !== '');
  const [file, destination] = [transformedInput[1], transformedInput[2]];

  const sourceFilePath = join(homeDirectory, file);
  const destinationFilePath = join(homeDirectory, destination);

  try {
    const brotli = createBrotliDecompress();
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(destinationFilePath);

    await pipeline(readableStream, brotli, writableStream);
    await rm(sourceFilePath);
  } catch {
    await rm(destinationFilePath);
    console.error('Operation failed');
  }
}

export { decompress };
