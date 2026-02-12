import { SaveIcon } from 'lucide-react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';

import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { ETaskActionsTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (workTime <= 0) {
      showMessage.error('O tempo de trabalho deve ser maior que 0.');
      return;
    }
    if (workTime >= 99) {
      showMessage.error('O tempo de trabalho deve ser menor que 99.');
      return;
    }

    if (shortBreakTime <= 0) {
      showMessage.error('O tempo de descanso deve ser maior que 0.');
      return;
    }
    if (shortBreakTime >= 30) {
      showMessage.error('O tempo de descanso deve ser menor que 30.');
      return;
    }

    if (longBreakTime <= 0) {
      showMessage.error('O tempo de descanso longo deve ser maior que 0.');
      return;
    }
    if (longBreakTime >= 60) {
      showMessage.error('O tempo de descanso longo deve ser menor que 60.');
      return;
    }

    dispatch({
      type: ETaskActionsTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });

    showMessage.success('Configurações salvas com sucesso!');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações do aplicativo, como tema, e tempo de
          trabalho/descanso, além outras opções personalizáveis para melhorar
          sua experiência de uso.
        </p>
      </Container>

      <Container>
        <form action='' className='form' onSubmit={handleSubmit}>
          <div className='formRow'>
            <Input
              id='wortTime'
              label='Tempo de trabalho (minutos)'
              type='number'
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
            />
          </div>

          <div className='formRow'>
            <Input
              id='shortBreakTime'
              label='Tempo de descanso (minutos)'
              type='number'
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
            />
          </div>

          <div className='formRow'>
            <Input
              id='longBreakTime'
              label='Tempo de descanso longo (minutos)'
              type='number'
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}
            />
          </div>

          <div className='formRow'>
            <Button
              icon={<SaveIcon />}
              aria-label='Salvar Configurações'
              title={'Salvar Configurações'}
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
