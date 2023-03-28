import { EListActionsEnum, TListActions } from '../actions';
import { TListItemProps } from './../../types/ListItemType';

type TListReducer = { todos: TListItemProps[] };

export const initialState = { todos: [] };

export const listReducer = (
  state: TListReducer,
  action: TListActions
): TListReducer => {
  switch (action.type) {
    case EListActionsEnum.CREATE_LIST:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case EListActionsEnum.DELETE_LIST:
      return {
        ...state,
        todos: state.todos.filter((item) => item.idList !== action.id),
      };

    default:
      return state;
  }
};
