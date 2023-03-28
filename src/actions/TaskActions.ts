export enum ETaskActionsEnum {
  MARK_AS_DONE = 'mark_as_done',
  MARK_AS_ACTIVE = 'mark_as_active',
  DELETE_TASK = 'delete_task',
}

type TTaskIdProps = { id: string };

export type TTaskActions =
  | ({ type: ETaskActionsEnum.MARK_AS_DONE } & TTaskIdProps)
  | ({ type: ETaskActionsEnum.MARK_AS_ACTIVE } & TTaskIdProps)
  | ({ type: ETaskActionsEnum.DELETE_TASK } & TTaskIdProps);
