import type { TaskModel } from '../../models/TaskModel';

export enum ETaskActionsTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COMPLETE_TASK = 'COMPLETE_TASK',
  UPDATE_SECONDS_REMAINING = 'UPDATE_SECONDS_REMAINING',
}

export type TaskActionWithPayload = {
  type: ETaskActionsTypes.START_TASK;
  payload: TaskModel;
};

export type TaskActionWithoutPayload =
  | { type: ETaskActionsTypes.RESET_STATE }
  | {
      type: ETaskActionsTypes.INTERRUPT_TASK;
    };

export type TaskActionModel = TaskActionWithPayload | TaskActionWithoutPayload;
