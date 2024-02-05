import {
  createReadStream,
} from 'node:fs';
const {
  createHash,
} = await import('node:crypto');
import { join } from 'path';

const calculateHash = async (input, homeDirectory) => {
  const fileName = input.replace(/^hash\s*/, '');
  const filePath = join(homeDirectory, fileName);

  const hash = createHash('sha256');
  const stream = createReadStream(filePath);

  stream.on('data', (data) => {
    hash.update(data);
  });

  stream.on('end', () => {
    const hashValue = hash.digest('hex');
    console.log(`${hashValue}\n`);
  });

  stream.on('error', () => {
    console.error('Operation failed\n');
  })
}

export { calculateHash };
