import { readdir } from 'node:fs/promises';

const displayContentOfDirectory = async (location) => {
  const files = await readdir(location, { withFileTypes: true });
  const formattedFiles = files
    .map(file => ({ name: file.name, type: file.isDirectory() ? 'directory' : 'file' }))
    .sort((a, b) => a.type.localeCompare(b.type));
  console.table(formattedFiles);
}

export { displayContentOfDirectory };
