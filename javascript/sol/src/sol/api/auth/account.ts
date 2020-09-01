import {IdView} from 'sol/api';
import {API_AUTH} from 'sol/config/proxy';
import {EMPTY_OBJECT} from 'sol/util';
import {getAndRetrieveJson} from 'sol/web/http';

export function currentId(): Promise<IdView> {
  return getAndRetrieveJson(CURRENT_ID, EMPTY_OBJECT);
}

export function currentAlias(): Promise<{alias: string}> {
  return getAndRetrieveJson(CURRENT_ALIAS, EMPTY_OBJECT);
}

const ACCOUNT = API_AUTH + '/account';
const CURRENT_ID = ACCOUNT + '/current-id';
const CURRENT_ALIAS = ACCOUNT + '/current-alias';
