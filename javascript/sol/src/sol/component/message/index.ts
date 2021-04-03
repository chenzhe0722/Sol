import {createContext, ReactNode, useContext} from 'react';
import {useLocale} from 'sol/component/locale';
import {doNothing, ErrorHandler} from 'sol/util';

export function useMessagePush(): MessagePusher {
  const [, push] = useContext(MessageContext);
  return push;
}

export function useServerError(): ErrorHandler {
  const push = useMessagePush();
  const locale = useLocale();

  return (err) => {
    console.log(err);
    switch (locale) {
      case 'en':
        import('sol/locale/component/message/en')
          .then(mdl => push(mdl.MESSAGE_TEXT.serverError, 'ERROR'))
          .catch(console.log);
        break;
      case 'cmn-Hans':
        import('sol/locale/component/message/cmn-Hans')
          .then(mdl => push(mdl.MESSAGE_TEXT.serverError, 'ERROR'))
          .catch(console.log);
        break;
    }
  };
}

export type MessageType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR' | 'DEFAULT';

export type Message = {
  key: number | undefined,
  content: ReactNode,
  type: MessageType,
};

export const EMPTY_MESSAGE: Message = {
  key: undefined,
  content: undefined,
  type: 'DEFAULT',
};

export type MessagePusher = (msg: ReactNode, type: MessageType) => void;
export type MessageShifter = () => Message;

export const MessageContext =
  createContext<[() => number, MessagePusher, MessageShifter]>([
    () => 0,
    doNothing,
    () => EMPTY_MESSAGE,
  ]);
