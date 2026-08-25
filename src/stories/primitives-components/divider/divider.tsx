import { classNames } from '../../core-ui/utils';
import styles from './divider.module.scss';

export interface DividerProps {
  /**
   * Sets the orientation of the divider horizontally or vertically.
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Controls the style of the divider.
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
}

export function Divider({
  orientation = 'horizontal',
  variant = 'primary',
}: DividerProps) {
  'use memo';

  return <div className={classNames(styles[orientation], styles[variant])} />;
}

Divider.displayName = 'Divider';

export default Divider;
