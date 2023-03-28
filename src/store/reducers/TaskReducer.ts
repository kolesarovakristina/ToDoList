import { ETaskActionsEnum, TTaskActions } from '../actions';

type TTaskReducer = { id?: string };

export const taskReducer = (
  state: TTaskReducer,
  action: TTaskActions
): TTaskReducer => {
  switch (action.type) {
    case ETaskActionsEnum.MARK_AS_DONE:
      return {
        ...state,
        [action.id]: true,
      };

    case ETaskActionsEnum.MARK_AS_ACTIVE:
      return {
        ...state,
        [action.id]: false,
      };

    case ETaskActionsEnum.DELETE_TASK:
      const key = action.id;
      const { [key]: value, ...tasks } = state as {
        [key: string]: string;
      };

      return tasks;

    default:
      return state;
  }
};
