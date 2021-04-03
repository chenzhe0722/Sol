import {NameView} from 'sol/api';
import {API_AUTH} from 'sol/config/proxy';
import {EMPTY_OBJECT} from 'sol/util';
import {sendJsonOnly} from 'sol/web/http';

export function login(params: NameView & {password: string}): Promise<void> {
  return sendJsonOnly('POST', LOGIN, params);
}

export function logout(): Promise<void> {
  return sendJsonOnly('POST', LOGOUT, EMPTY_OBJECT);
}

const LOGIN = API_AUTH + '/login';
const LOGOUT = API_AUTH + '/logout';
