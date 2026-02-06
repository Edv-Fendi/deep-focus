import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForNoActiveTask = {
    workTime: (
      <span>
        Próximo ciclo é de <b>{state.config.workTime} min</b>
      </span>
    ),
    shortBreakTime: (
      <span>
        Próximo descanso é de <b>{state.config.shortBreakTime} min</b>
      </span>
    ),
    longBreakTime: <span>O próximo será um longo descanso.</span>,
  };

  const tipsForWhenActiveTask = {
    workTime: (
      <span>
        Mantenha o foco por <b>{state.config.workTime} min</b>!
      </span>
    ),
    shortBreakTime: (
      <span>
        Descanse por <b>{state.config.shortBreakTime} min</b>!
      </span>
    ),
    longBreakTime: <span>Relaxe! Descanso longo. </span>,
  };
  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}
