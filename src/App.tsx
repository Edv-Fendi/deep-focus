import '../src/styles/theme.css';
import '../src/styles/global.css';

import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';

import { Router } from './routers/routes';

export function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer>
        <Router />
      </MessagesContainer>
    </TaskContextProvider>
  );
}
