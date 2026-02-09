import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro'>
        Entenda como funciona a técnica de Pomodoro.
      </RouterLink>
      <RouterLink href='/'>
        Deep Focus. &copy; {new Date().getFullYear()} - Feito com carinho.
        Aproveite.
      </RouterLink>
    </footer>
  );
}
