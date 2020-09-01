import {EQUAL_MARK, SEMICOLON} from 'sol/util';

export function getCsrfHeader(): Record<string, string> {
  const cookie = getCookie(CSRF_COOKIE);
  return cookie !== undefined ? {[CSRF_HEADER]: cookie} : {};
}

const CSRF_COOKIE = 'XSRF-TOKEN';
const CSRF_HEADER = 'X-XSRF-TOKEN';

function getCookie(name: string): string | undefined {
  const start = name + EQUAL_MARK;
  for (const cookie of document.cookie.split(SEMICOLON)) {
    if (cookie.startsWith(start)) {
      return cookie.slice(start.length);
    }
  }
  return undefined;
}
