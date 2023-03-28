import { FC, ReactNode, useReducer, useMemo } from 'react';

import { initialState, listReducer } from '../reducers';
import { EListActionsEnum } from '../actions';
import { TListItemProps } from '../../types';
import { ListContext } from '../context/ListContext';

type TListProviderProps = {
  children: ReactNode;
};

const ListProvider: FC<TListProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      createList: (payload: TListItemProps[]) =>
        dispatch({
          type: EListActionsEnum.CREATE_LIST,
          payload,
        }),
      deleteList: (id: string) =>
        dispatch({
          type: EListActionsEnum.DELETE_LIST,
          id,
        }),
    }),
    [state]
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListProvider;
