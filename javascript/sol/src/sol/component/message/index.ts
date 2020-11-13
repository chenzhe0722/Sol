import {createContext, ReactNode, useContext} from 'react';
import {doNothing, ErrorHandler} from 'sol/util';

export function useMessagePush(): MessagePusher {
  const [, push] = useContext(MessageContext);
  return push;
}

export function useServerError(): ErrorHandler {
  const push = useMessagePush();
  return (err) => {
    console.log(err);
    push('Server error.', 'ERROR');
  };
}

export type MessageType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR' | 'DEFAULT';

export type Message = {
  key: number,
  content: ReactNode,
  type: MessageType,
};

export type MessagePusher = (msg: ReactNode, type: MessageType) => void;
export type MessageShifter = () => Message;

export const MessageContext =
  createContext<[() => number, MessagePusher, MessageShifter]>([
    () => 0,
    doNothing,
    () => ({key: 0, content: undefined, type: 'DEFAULT'}),
  ]);
