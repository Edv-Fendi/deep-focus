import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const { state } = useTaskContext();

  const cycleSteps = Array.from({ length: state.currentCycle });

  const cycleDescrptionMap = {
    workTime: 'Ciclo de Trabalho',
    shortBreakTime: 'Ciclo de Descanso Curto',
    longBreakTime: 'Ciclo de Descanso Longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>

      <div className={styles.cycleDots}>
        {cycleSteps.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
              key={`${nextCycleType}-${nextCycle}-${index}`}
              aria-label={`Indicador de ${cycleDescrptionMap[nextCycleType]}`}
              title={`Indicador de ${cycleDescrptionMap[nextCycleType]}`}
            />
          );
        })}
      </div>
    </div>
  );
}
