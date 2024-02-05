import { argv } from 'node:process';

export const parseArgs = () => {
  return argv
    .find((arg) => arg.startsWith('--username='))
    .replace('--username=', '');
}
