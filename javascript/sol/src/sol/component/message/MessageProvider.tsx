import * as React from 'react';
import {Message, MessageQueueContext} from 'sol/component/message';
import {useQueue} from 'sol/util/hook';
import {ChildrenProps} from 'sol/util/props';

export function MessageProvider(props: ChildrenProps): JSX.Element {
  const [len, push, pop] = useQueue<Message>();
  return (
    <MessageQueueContext.Provider
      value={[len, (msg) => push({key: Date.now(), ...msg}), pop]}
    >
      {props.children}
    </MessageQueueContext.Provider>
  );
}
