export function hexToBase64Url(hex: string): string {
  return base64ToBase64Url(Buffer.from(hex, 'hex').toString('base64'));
}

export function bufferFromBase64url(base64url: string): Buffer {
  return Buffer.from(toBase64(base64url), 'base64');
}

export function base64UrlToHex(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const binaryString = atob(base64);
  const byteArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  return Array.from(byteArray, (byte) => ('00' + byte.toString(16)).slice(-2)).join('');
}

export function parseHex(hex: string) {
  return hex.startsWith('0x') ? hex.slice(2) : hex;
}

export function bufferToHex(buffer: ArrayBufferLike): string {
  return formatHex(Buffer.from(buffer).toString('hex'));
}

export function toBase64(input: string | Buffer): string {
  input = input.toString();
  return padString(input).replace(/-/g, '+').replace(/_/g, '/');
}

function base64ToBase64Url(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function formatHex(hex: string) {
  return hex.startsWith('0x') ? hex : `0x${hex}`;
}

function padString(input: string): string {
  const segmentLength = 4;
  const stringLength = input.length;
  const diff = stringLength % segmentLength;

  if (!diff) {
    return input;
  }

  let position = stringLength;
  let padLength = segmentLength - diff;
  const paddedStringLength = stringLength + padLength;
  const buffer = Buffer.alloc(paddedStringLength);

  buffer.write(input);

  while (padLength--) {
    buffer.write('=', position++);
  }

  return buffer.toString();
}
