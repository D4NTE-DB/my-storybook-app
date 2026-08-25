import { useState, useEffect } from 'react';
import { CheckBorderIcon } from '../../core-ui/react-icons';
import { classNames } from '../../core-ui/utils';
import styles from './toast.module.scss';

export interface ToastProps {
  /**
   * Sets the unique identifier for the toast.
   */
  id?: string;
  /**
   * Sets the message displayed in the toast.
   */
  message?: string;
  /**
   * Sets the time of toast on screen before disappearing in milliseconds.
   */
  delay?: number;
  /**
   * Controls the visibility of the toast.
   */
  open?: boolean;
  /**
   * A callback function that is called when the toast is closed.
   */
  onClose?: () => void;
  /**
   * @deprecated property has no effect
   */
}

function Toast({
  id,
  message,
  delay = 5000,
  open = true,
  onClose,
}: ToastProps) {
  'use no memo';

  const [visible, setVisible] = useState<boolean>(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    const time = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, delay);
    return () => {
      clearTimeout(time);
    };
  }, [delay, onClose]);

  return (
    <div
      id={id}
      className={classNames(
        styles['container'],
        visible ? styles['visible'] : styles['hidden']
      )}
    >
      <div className={styles['image-container']}>
        <CheckBorderIcon color="icon-inverse" size="medium" />
      </div>
      <div className={styles['text-wrapper']}>{message}</div>
    </div>
  );
}

Toast.displayName = 'Toast';

export default Toast;
