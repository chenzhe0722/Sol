export const EMPTY = '';
export const SPACE = ' ';
export const COLON = ':';
export const SEMICOLON = ';';
export const QUESTION_MARK = '?';
export const EQUAL_MARK = '=';

export const EMPTY_OBJECT = {};

export function doNothing(): void {/* EMPTY */}

export type ExcludeKey<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;

export type ErrorHandler = (err: Error) => void;
