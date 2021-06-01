import {EQUAL_MARK, SEMICOLON} from 'sol/util';
import {JsonRequestMethod} from "sol/web/http";

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


export async function sendJsonOnly<T>(
    method: JsonRequestMethod,
    root: string,
    params: T,
    handler: ResponseHandler = serverError,
): Promise<void> {
  await sendJson(method, root, params, handler);
}

export async function sendJsonAndRetrieveJson<T, R>(
    method: JsonRequestMethod,
    root: string,
    params: T,
    handler: ResponseHandler = serverError,
): Promise<R> {
  const res = await sendJson(method, root, params, handler);
  return await retrieveJson<R>(res);
}

async function sendJson<T>(
    method: JsonRequestMethod,
    root: string,
    params: T,
    handler: ResponseHandler,
): Promise<Response> {
  const res = await fetch(root, {
    method: method,
    headers: {
      'content-type': 'application/json',
      ...getCsrfHeader(),
    },
    body: JSON.stringify(params),
  });
  handler(res);
  return res;
}



