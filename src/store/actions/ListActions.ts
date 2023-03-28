import { TListItemProps } from '../../types';

export enum EListActionsEnum {
  CREATE_LIST = 'create_list',
  DELETE_LIST = 'remove_list',
}

export type TListActions =
  | {
      type: EListActionsEnum.CREATE_LIST;
      payload: TListItemProps[];
    }
  | { type: EListActionsEnum.DELETE_LIST; id: string };
