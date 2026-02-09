import { Link } from 'react-router';
import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to='/about-pomodoro'>
        Entenda como funciona a técnica de Pomodoro.
      </Link>
      <Link to='/'>
        Deep Focus. &copy; {new Date().getFullYear()} - Feito com carinho.
        Aproveite.
      </Link>
    </footer>
  );
}
