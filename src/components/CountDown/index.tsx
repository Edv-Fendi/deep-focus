import { useContext } from 'react';
import styles from './styles.module.css';
import { TaskContext } from '../../contexts/TaskContext/TaskContext';

export function CountDown() {
  const taskContext = useContext(TaskContext);
  return (
    <div className={styles.container}>
      {taskContext.state.formattedSecondsRemaining}
    </div>
  );
}
