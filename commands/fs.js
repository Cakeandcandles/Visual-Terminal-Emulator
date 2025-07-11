const fileSystem = {
  Documents: {
    "notes.txt": "These are some notes.\nRemember to finish the project.",
    "todo.txt": "1. Build shell\n2. Eat cereal\n3. Sleep",
  },
  Projects: {
    "index.html": "<html><body><h1>Hello World</h1></body></html>",
    "main.js": "console.log('hi')",
  },
  "readme.md": "# TermGraphFX\nA virtual terminal emulator in browser.\n",
};

let currentPath = [];

function getDir(path) {
  return path.reduce((dir, folder) => dir[folder], fileSystem);
}

export function ls() {
  let dir;
  try {
    dir = getDir(currentPath);
  } catch {
    return "ls: directory not found\n";
  }
  return Object.keys(dir).join("  ") + "\n";
}

export function cd(target) {
  if (!target || target === "~") {
    currentPath = [];
    return "";
  }
  if (target === "..") {
    if (currentPath.length > 0) currentPath.pop();
    return "";
  }
  let dir;
  try {
    dir = getDir(currentPath);
  } catch {
    return `cd: no such directory: ${target}\n`;
  }
  if (dir[target] && typeof dir[target] === "object") {
    currentPath.push(target);
    return "";
  } else {
    return `cd: no such directory: ${target}\n`;
  }
}

export function pwd() {
  return "/" + currentPath.join("/") + "\n";
}

export function cat(filename) {
  if (!filename) return "cat: missing filename\n";
  let dir;
  try {
    dir = getDir(currentPath);
  } catch {
    return `cat: no such file or directory: ${filename}\n`;
  }
  if (dir[filename] && typeof dir[filename] === "string") {
    return dir[filename] + "\n";
  } else {
    return `cat: ${filename}: No such file\n`;
  }
}
