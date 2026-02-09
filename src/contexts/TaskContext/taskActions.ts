import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';

export enum ETaskActionsTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_STATE = 'RESET_STATE',
  COMPLETE_TASK = 'COMPLETE_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
}

export type TaskActionWithPayload =
  | {
      type: ETaskActionsTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: ETaskActionsTypes.COUNT_DOWN;
      payload: Pick<TaskStateModel, 'secondsRemaining'>;
    };

export type TaskActionWithoutPayload =
  | { type: ETaskActionsTypes.RESET_STATE }
  | {
      type: ETaskActionsTypes.INTERRUPT_TASK;
    }
  | {
      type: ETaskActionsTypes.COMPLETE_TASK;
    };

export type TaskActionModel = TaskActionWithPayload | TaskActionWithoutPayload;
