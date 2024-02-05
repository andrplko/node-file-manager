import { createReadStream } from 'node:fs';
import { cwd } from 'node:process';

const read = (input) => {
  const pathToFile = input.replace(/^cat\s*/, '');
  const stream = createReadStream(pathToFile, { encoding: 'utf8' });

  stream.on('data', (data) => {
    console.log(data)
  });

  stream.on('end', () => {
    console.log(`\nYou are currently in ${cwd()}`);
  });

  stream.on('error', () => {
    console.error('\nOperation failed');
})
}

export { read };
