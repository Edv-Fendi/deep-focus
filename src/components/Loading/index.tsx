import { Loader2Icon } from 'lucide-react';
import styles from './styles.module.css';

type LoadingProps = {
  label?: string;
};

export function Loading({ label = 'Carregando...' }: LoadingProps) {
  return (
    <div className={styles.loading} role='status' aria-live='polite'>
      <Loader2Icon className={styles.icon} />
      <span className={styles.text}>{label}</span>
    </div>
  );
}
