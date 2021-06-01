import {QUESTION_MARK} from 'sol/util';

export async function getAndRetrieveJson<T>(
  root: string,
  params: Record<string, string>,
  handler: ResponseHandler = serverError,
): Promise<T> {
  const res = await get(root, params, handler);
  return await res.json() as Promise<T>;
}

async function get(
  root: string,
  params: Record<string, string>,
  handler: ResponseHandler,
): Promise<Response> {
  const param = new URLSearchParams(params).toString();
  const req = param ? [root, param].join(QUESTION_MARK) : root;
  const res = await fetch(req, {method: 'GET'});
  handler(res);
  return res;
}

export function serverError(res: Response): void {
  if (!res.ok) {
    throw Error(res.statusText);
  }
}

export type JsonRequestMethod = 'PUT' | 'POST' | 'DELETE';

export type ResponseHandler = (res: Response) => void;
