import { useId, forwardRef } from 'react';
import { cn } from './utils';

import styles from './Input.module.css';

export default forwardRef(({ label, className, ...props }, ref) => {
  const id = useId();
  return (
    <>
      <label htmlFor={props.id || id} className={styles.label}>
        {label}
      </label>
      <input ref={ref} className={cn(className, styles.input)} id={id} {...props} />
    </>
  );
});
