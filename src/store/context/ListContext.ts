import { createContext } from 'react';
import { TListItemProps } from '../../types';

export type TListContextProps = {
  readonly createList: (todos: TListItemProps[]) => void;
  readonly deleteList: (id: string) => void;
};

const initialState = {
  createList: () => null,
  deleteList: () => null,
};

export const ListContext = createContext<TListContextProps>(initialState);
