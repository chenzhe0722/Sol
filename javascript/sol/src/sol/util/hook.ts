import {EventHandler, SyntheticEvent, useReducer, useState} from 'react';

export function useSwitch(init: boolean): [boolean, () => void] {
  return useReducer((state: boolean) => !state, init);
}

export function useQueue<T>(): [() => number, (t: T) => void, () => T] {
  const [queue, setQueue] = useState<T[]>([]);
  return [
    () => queue.length,
    (t) => setQueue(prev => [...prev, t]),
    () => {
      const shift = queue[0];
      setQueue(prev => prev.slice(1));
      return shift;
    },
  ];
}

export function useAnchor<T extends SyntheticEvent<E>, E>(): [EventTarget & E | undefined, EventHandler<T>, () => void] {
  const [anchor, setAnchor] = useState<EventTarget & E | undefined>(undefined);
  return [
    anchor,
    (event) => setAnchor(event.currentTarget),
    () => setAnchor(undefined),
  ];
}
