import { cn } from './utils';

import styles from './Button.module.css';

export default function Button({ className, ...props }) {
  return <button className={cn(className, styles.button)} type='button' {...props} />;
}
