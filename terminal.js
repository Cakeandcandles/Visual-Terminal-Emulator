import { help } from './commands/help.js';
import { ls, cd, pwd, cat } from './commands/fs.js';
import { cls } from './commands/cls.js';

const input = document.getElementById('terminal-input');
const output = document.getElementById('output');

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    output.innerHTML += `\n$ ${command}\n`;
    handleCommand(command);
    input.value = '';
    output.scrollTop = output.scrollHeight;
  }
});

function handleCommand(cmd) {
  const [command, ...args] = cmd.split(' ');
  switch (command) {
    case 'help':
      output.innerHTML += help();
      break;
    case 'ls':
      output.innerHTML += ls();
      break;
    case 'cd':
      output.innerHTML += cd(args[0]);
      break;
    case 'pwd':
      output.innerHTML += pwd();
      break;
    case 'cat':
      output.innerHTML += cat(args[0]);
      break;
    case 'cls':
        cls(output);
        break;
    case '':
      break;
    default:
      output.innerHTML += `Command not found: ${command}\n`;
  }
}
