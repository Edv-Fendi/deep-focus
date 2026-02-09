import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { ETaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    showMessage.dismiss();

    if (taskNameInput.current === null) {
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      showMessage.warn('Digite o nome da tarefa!');
      return;
    }

    const newTask: TaskModel = {
      id: String(Date.now()),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: ETaskActionsTypes.START_TASK, payload: newTask });
    showMessage.success('Tarefa Iniciada.');
  }

  function handleInterrupt() {
    showMessage.dismiss()
    showMessage.error("Tarefa interrompida.")
    dispatch({
      type: ETaskActionsTypes.INTERRUPT_TASK,
    });
  }

  return (
    <form onSubmit={handleSubmit} className='form' action=''>
      <div className='formRow'>
        <Input
          type='text'
          label='Task'
          id='input'
          placeholder='Digite uma tarefa'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>
          <Tips />
        </p>
      </div>

      {state.currentCycle !== 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
          <Button
            aria-label='Iniciar Tarefa'
            title='Iniciar Tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            color='green'
          />
        )}

        {state.activeTask && (
          <Button
            aria-label='Interromper Tarefa'
            title='Interromper Tarefa'
            color='red'
            type='button'
            icon={<StopCircleIcon />}
            onClick={handleInterrupt}
          />
        )}
      </div>
    </form>
  );
}
