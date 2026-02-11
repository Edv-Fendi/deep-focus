import { TrashIcon } from 'lucide-react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';

import { MainTemplate } from '../../templates/MainTemplate';

import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { getTaskType } from '../../utils/getTaskType';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { ETaskActionsTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTasks = state.tasks.length > 0;

  const [sortTasksOptions, setSortTaskOptions] = useState<
    Pick<SortTasksOptions, 'field' | 'direction'>
  >(() => ({
    field: 'startDate',
    direction: 'desc',
  }));

  const sortedTasks = useMemo(() => {
    return sortTasks({
      tasks: state.tasks,
      direction: sortTasksOptions.direction,
      field: sortTasksOptions.field,
    });
  }, [state.tasks, sortTasksOptions.direction, sortTasksOptions.field]);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    toast.dismiss();
    showMessage.confirm('Tem certeza que deseja remover?', confirmation => {
      if (!confirmation) return;
      dispatch({ type: ETaskActionsTypes.RESET_STATE });
    });
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <Button
                icon={<TrashIcon />}
                color='red'
                aria-label='Remover o histórico'
                title='Remover o histórico'
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSortTasks({ field: 'name' })}
                    className={styles.thSort}
                  >
                    Tarefa
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'duration' })}
                    className={styles.thSort}
                  >
                    Duração
                  </th>
                  <th
                    onClick={() => handleSortTasks({ field: 'startDate' })}
                    className={styles.thSort}
                  >
                    Data
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map(task => {
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{getTaskType(task)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!hasTasks && (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Não temos itens no histórico para exibir.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
