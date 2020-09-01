import {ExistsView, NameView} from 'sol/api';
import {API_AUTH} from 'sol/config/proxy';
import {getAndRetrieveJson, sendJsonOnly} from 'sol/web/http';

export function check(params: NameView): Promise<ExistsView> {
  return getAndRetrieveJson<ExistsView>(CHECK, params);
}

export function register(
  params: NameView & {password: string, alias: string},
): Promise<void> {
  return sendJsonOnly('POST', REGISTER, params);
}

const SIGN_UP = API_AUTH + '/sign-up';
const CHECK = SIGN_UP + '/check';
const REGISTER = SIGN_UP + '/register';
