import { EOL, homedir, userInfo, cpus, arch } from 'node:os';

const getOperatingSystemInfo = (input) => {
  const command = input.replace('os --', '');

  switch(command) {
    case('EOL'): {
      console.log(EOL);
      break;
    }
    case('cpus'): {
      console.log(`Amount of CPUS: ${cpus().length}`);
      cpus().forEach(core => {
        console.log(core.model);
        console.log(`${core.speed / 1000} GHz`);
      });
      break;
    }
    case('homedir'): {
      console.log(homedir());
      break;
    }
    case('username'): {
      console.log(userInfo().username);
      break;
    }
    case('architecture'): {
      console.log(arch());
      break;
    }
    default:
      console.error('Invalid input');
      break;
  }
}

export { getOperatingSystemInfo };
