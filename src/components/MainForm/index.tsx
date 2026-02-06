import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { Button } from '../Button';
import { Cycles } from '../Cycles';
import { Input } from '../Input';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleSubmit(
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    if (taskNameInput.current === null || taskNameInput.current.value === '') {
      return;
    }

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Por favor, insira o nome da tarefa válida.');
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

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterrupt() {
    setState(prevState => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(task => {
          if (task.id === prevState.activeTask?.id) {
            return {
              ...task,
              interruptedDate: Date.now(),
            };
          }
          return task;
        }),
      };
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
        <p>O próximo ciclo é: 25min</p>
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
