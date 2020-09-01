import {useReducer, useState} from 'react';

export function useSwitch(init: boolean): [boolean, () => void] {
  return useReducer((state: boolean) => !state, init);
}

export function useQueue<T>(): [number, (t: T) => void, () => T] {
  const [queue, setQueue] = useState<T[]>([]);
  return [
    queue.length,
    (t) => setQueue(prev => [...prev, t]),
    () => {
      const pop = queue[0];
      setQueue(prev => prev.slice(1));
      return pop;
    },
  ];
}
