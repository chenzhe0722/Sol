import {QUESTION_MARK} from 'sol/util';
import {getCsrfHeader} from 'sol/web/cookie';

export async function getOnly(
  root: string,
  params: Record<string, string>,
  handler: ResponseHandler = serverError,
): Promise<void> {
  await get(root, params, handler);
}

export async function getAndRetrieveJson<T>(
  root: string,
  params: Record<string, string>,
  handler: ResponseHandler = serverError,
): Promise<T> {
  const res = await get(root, params, handler);
  return await retrieveJson<T>(res);
}

async function get(
  root: string,
  params: Record<string, string>,
  handler: ResponseHandler,
): Promise<Response> {
  const res = await fetch(buildUrl(root, params), {method: 'GET'});
  handler(res);
  return res;
}

function buildUrl(root: string, params?: Record<string, string>): string {
  const param = new URLSearchParams(params).toString();
  return param ? [root, param].join(QUESTION_MARK) : root;
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

function retrieveJson<T>(res: Response): Promise<T> {
  return res.json() as Promise<T>;
}

function serverError(res: Response): void {
  if (!res.ok) {
    throw Error(res.statusText);
  }
}

export type JsonRequestMethod = 'PUT' | 'POST' | 'DELETE';

type ResponseHandler = (res: Response) => void;
