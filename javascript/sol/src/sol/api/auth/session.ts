import {NameView} from 'sol/api';
import {API_AUTH} from 'sol/config/proxy';
import {EMPTY_OBJECT} from 'sol/util';
import {getAndRetrieveJson} from 'sol/web/http';

export function current(): Promise<CurrentView> {
  return getAndRetrieveJson(CURRENT, EMPTY_OBJECT);
}

export type CurrentView = NameView & {
  admin: boolean,
};

const SESSION = API_AUTH + '/session';
const CURRENT = SESSION + '/current';
