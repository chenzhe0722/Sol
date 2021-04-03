import {IdView} from 'sol/api';
import {API_AUTH} from 'sol/config/proxy';
import {sendJsonOnly} from 'sol/web/http';

export function admin(param: IdView<bigint>): Promise<void> {
  return sendJsonOnly('PUT', ADMIN, param);
}

export function user(param: IdView<bigint>): Promise<void> {
  return sendJsonOnly('PUT', USER, param);
}

export function archived(param: IdView<bigint>): Promise<void> {
  return sendJsonOnly('PUT', ARCHIVED, param);
}

export function deleted(param: IdView<bigint>): Promise<void> {
  return sendJsonOnly('PUT', DELETED, param);
}

const STATUS = API_AUTH + '/status';
const ADMIN = STATUS + '/admin';
const USER = STATUS + '/user';
const ARCHIVED = STATUS + '/archived';
const DELETED = STATUS + '/deleted';
