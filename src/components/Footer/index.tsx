import styles from './styles.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <a href=''>Entenda como funciona a técnica de Pomodoro.</a>
      <a href=''>Deep Focus. &copy; {new Date().getFullYear()} - Feito com carinho. Aproveite.</a>
    </footer>
  );
}
