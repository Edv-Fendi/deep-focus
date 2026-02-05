import styles from './styles.module.css';

type InputProps = {
  id: string;
  label?: string;
} & React.ComponentProps<'input'>;

export function Input({ id, label, type, ...props }: InputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input className={styles.input} type={type} id={id} {...props} />
    </>
  );
}
