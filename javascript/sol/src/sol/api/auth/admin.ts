import {IdView} from 'sol/api';
import {API_AUTH} from 'sol/config/proxy';
import {sendJsonOnly} from 'sol/web/http';

export function privilege(param: IdView & {admin: boolean}): Promise<void> {
  return sendJsonOnly('PUT', PRIVILEGE, param);
}

export function activate(param: IdView & {active: boolean}): Promise<void> {
  return sendJsonOnly('PUT', ACTIVATE, param);
}

const ADMIN = API_AUTH + '/admin';
const PRIVILEGE = ADMIN + '/privilege';
const ACTIVATE = ADMIN + '/activate';
