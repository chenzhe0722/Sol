import {createContext, ReactNode, useContext} from 'react';
import {doNothing} from 'sol/util';

export function useMessagePush(): (msg: MessageProps) => void {
  const [, push] = useContext(MessageQueueContext);
  return push;
}

export function useServerError(): (err: Error) => void {
  const push = useMessagePush();
  return (err) => {
    console.log(err);
    push({
      content: 'Server error.',
      type: 'ERROR',
    });
  };
}

export type MessageType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR' | 'DEFAULT';

export type MessageProps = {
  content: ReactNode,
  type: MessageType,
}

export type Message = {
  key: number
} & MessageProps

export const MessageQueueContext =
  createContext<[number, (msg: MessageProps) => void, () => Message]>([
    0,
    doNothing,
    () => ({key: 0, content: undefined, type: 'DEFAULT'}),
  ]);
