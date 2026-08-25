import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { IBaseProps } from '../../types';
import { Text } from '../text';
import styles from './checkbox.module.scss';

type TextStyle =
  | 'body-01'
  | 'body-02'
  | 'body-03'
  | 'body-04'
  | 'body-01-strong'
  | 'body-02-strong'
  | 'body-03-strong'
  | 'body-04-strong';

export interface CheckboxProps extends IBaseProps {
  /**
   * Unique identifier for the checkbox.
   */
  id: string;
  /**
   * Adds accessible text to the checkbox.
   */
  ariaLabel?: string;
  /**
   * Sets the vertical alignment of the checkbox relative to the label. Options are "top", "middle", and "bottom".
   * @default 'middle'
   */
  checkboxVerticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * Sets the default as checked when set to true.
   * @default false
   */
  checked?: boolean;
  /**
   * Adds disabled styling and disables the checkbox.
   */
  disabled?: boolean;
  /**
   * Sets the checkbox to an indeterminate state.
   */
  indeterminate?: boolean;
  /**
   * Sets the label text of the checkbox.
   */
  label?: string;
  /**
   * Sets the typography style of the label text.
   * @default 'body-02'
   */
  labelStyle?: TextStyle;
  /**
   * Sets the description text of the checkbox.
   */
  description?: string;
  /**
   * Sets the typography style of the description text.
   * @default 'body-03'
   */
  descriptionStyle?: TextStyle;
  /**
   * Sets the checkbox to required input.
   * @default false
   */
  required?: boolean;
  /**
   * Sets the skeleton loading state.
   * @default false
   */
  skeleton?: boolean;
  /**
   * Adds error styling when set to true.
   * @default false
   */
  error?: boolean;
  /**
   * Sets the tab index of the checkbox.
   * @default 0
   */
  externalTabIndex?: number;
  /**
   * A callback for when the checkbox state changes.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   */
  /**
   */
}

function Checkbox({
  id = 'checkbox',
  ariaLabel,
  checkboxVerticalAlign = 'middle',
  checked: checkedProp,
  disabled,
  indeterminate,
  label,
  labelStyle = 'body-02',
  description,
  descriptionStyle = 'body-03',
  required = false,
  skeleton = false,
  error = false,
  externalTabIndex = 0,
  onChange,
}: CheckboxProps) {
  'use no memo';

  const [checkedState, setCheckedState] = useState(checkedProp || false);

  useEffect(() => {
    setCheckedState(checkedProp || false);
  }, [checkedProp]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setCheckedState(e.target.checked);

    onChange?.(e);
  }

  function renderSkeleton() {
    return (
      <div
        className={styles['checkbox-skeleton-container']}
        data-testid="checkbox-skeleton"
      >
        <span id={styles['checkbox-skeleton']}></span>
        <span id={styles['label-skeleton']}></span>
      </div>
    );
  }

  if (skeleton) {
    return renderSkeleton();
  }
  return (
    <div
      data-testid="checkbox-wrapper"
      className={`${styles['checkbox-wrapper']} ${styles['checkbox']} ${
        error ? styles['error'] : ''
      } ${styles[checkboxVerticalAlign]}`}
    >
      <input
        tabIndex={externalTabIndex}
        className={`${
          (indeterminate && !disabled && styles['indeterminate']) ||
          (indeterminate && disabled && styles['indeterminate-disabled'])
        }`}
        type="checkbox"
        id={`checkbox-${id}`}
        aria-label={label ? undefined : ariaLabel}
        checked={!error && checkedState}
        disabled={disabled}
        onChange={handleOnChange}
      />
      <span className={styles['checkbox-label']} aria-hidden="true"></span>
      {label || description ? (
        <div
          className={`${styles['label-wrapper']} ${
            disabled && styles['disabled']
          }`}
        >
          {label && (
            <label id={`checkbox-label-${id}`} htmlFor={`checkbox-${id}`}>
              <Text
                element={'span'}
                textStyle={labelStyle}
                color={disabled ? 'disabled' : error ? 'negative' : 'primary'}
              >
                {`${label}${required ? ' *' : ''}`}
              </Text>
            </label>
          )}
          {description && (
            <Text
              element={'p'}
              textStyle={descriptionStyle}
              color={disabled ? 'disabled' : error ? 'negative' : 'secondary'}
            >
              {description}
            </Text>
          )}
        </div>
      ) : null}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';

export default Checkbox;
