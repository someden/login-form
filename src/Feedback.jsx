import { cn } from './utils';

import styles from './Feedback.module.css';

export default function Feedback({ type, className, ...props }) {
  return <p className={cn(className, styles.feedback, type ? styles[type] : '')} {...props} />;
}
