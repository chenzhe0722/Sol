import * as React from 'react';
import {ReactNode} from 'react';
import {Message, MessageContext, MessageType} from 'sol/component/message';
import {useQueue} from 'sol/util/hook';
import {ChildrenProps} from 'sol/util/props';

export function MessageProvider(props: ChildrenProps): JSX.Element {
  const [len, push, shift] = useQueue<Message>();
  return (
    <MessageContext.Provider
      value={[len, (content, type) => push(format(content, type)), shift]}
    >
      {props.children}
    </MessageContext.Provider>
  );
}

function format(content: ReactNode, type: MessageType): Message {
  return {
    key: Date.now(),
    content: content,
    type: type,
  };
}
