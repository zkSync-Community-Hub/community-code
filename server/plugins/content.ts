import { EOL } from 'os';
import { join } from 'path';
import { readFileSync } from 'fs';

// files cache
const files = new Map<string, string>();

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:beforeParse', (file) => {
    if (file.body.includes(':code-import{filePath')) {
      const newBody = handleCodeImport(file.body);
      file.body = newBody;
    }
  });
});

function handleCodeImport(body: string) {
  const lines = body.split(EOL);
  let inCodeBlock = false;
  let codeBlockIndent = '';

  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();

    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        const matches = lines[i].match(/^\s*/);
        codeBlockIndent = matches ? matches[0] : '';
      }
    }

    if (inCodeBlock && trimmedLine.includes(':code-import{filePath')) {
      const filepath = trimmedLine.split('"')[1];
      let newCode = getCodeFromFilepath(filepath);

      newCode = newCode
        .split(EOL)
        .map((line) => codeBlockIndent + line)
        .join(EOL);

      lines[i] = newCode;
    }
  }

  return lines.join(EOL);
}

function getCodeFromFilepath(filepath: string) {
  const splitPath = filepath.split(':');
  const cleanPath = splitPath[0];
  const cache = files.get(cleanPath);
  let code;
  if (cache) {
    code = cache;
  } else {
    const fullPath = join(process.cwd(), 'code', cleanPath);
    code = readFileSync(fullPath, 'utf8');
    files.set(filepath, code);
  }
  const exampleComment = splitPath[1] || null;
  if (exampleComment) {
    code = extractCommentBlock(code, exampleComment);
  }
  // remove any other ANCHOR tags
  const lines = code.split(EOL);
  const trimmedLines = lines.filter((line) => !line.trimStart().startsWith('// ANCHOR'));
  return trimmedLines.join(EOL);
}

function extractCommentBlock(content: string, comment: string | null) {
  const commentTypes = ['<!--', '{/*', '//', '/*'];

  const lines = content.split(EOL);
  if (!comment) {
    return content;
  }

  let lineStart = 1;
  let lineEnd = 1;
  let foundStart = false;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].replace(/\s/g, '');
    const start = commentTypes.some((type) => trimmed === `${type}ANCHOR:${comment}`);
    if (start === true && !foundStart) {
      lineStart = i + 1;
      foundStart = true;
    } else {
      const end = commentTypes.some((type) => trimmed === `${type}ANCHOR_END:${comment}`);
      if (end === true) lineEnd = i;
    }
  }
  const newLines = lines.slice(lineStart, lineEnd);
  const linesContent = newLines.join(EOL);
  return linesContent;
}
