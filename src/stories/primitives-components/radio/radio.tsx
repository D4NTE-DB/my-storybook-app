import { useState, useEffect } from 'react';
import { Text } from '../text';
import styles from './radio.module.scss';

export type TextStyle =
  | 'body-01'
  | 'body-02'
  | 'body-03'
  | 'body-04'
  | 'body-01-strong'
  | 'body-02-strong'
  | 'body-03-strong'
  | 'body-04-strong';

export interface RadioProps {
  /**
   * Unique identifier for the radio.
   */
  id: string;
  /**
   * Adds a unique name to the radio.
   */
  name?: string;
  /**
   * Adds accessible text to the radio.
   */
  ariaLabel?: string;
  /**
   * Sets the label text of the radio.
   */
  label?: string;
  /**
   * Sets the typography style of the label.
   * @default 'body-02'
   */
  labelStyle?: TextStyle;
  /**
   * Sets the description text of the radio.
   */
  description?: string;
  /**
   * Sets the typography style of the description.
   * @default 'body-03'
   */
  descriptionStyle?: TextStyle;
  /**
   * Sets the skeleton loading state.
   * @default false
   */
  skeleton?: boolean;
  /**
   * Adds error styling when set to true.
   */
  error?: boolean;
  /**
   * Sets the default selection as checked when set to true.
   * @default false
   */
  checked?: boolean;
  /**
   * Adds disabled styling and disables the radio.
   */
  disabled?: boolean;
  /**
   * Sets the vertical alignment of the radio button relative to the label.
   * @default 'middle'
   */
  radioVerticalAlign?: 'top' | 'middle' | 'bottom';
  /**
   * A callback for when the radio state changes.
   */
  onChange?: () => void;
  /**
   */
  /**
   */
}

function Radio({
  id = 'radio',
  name,
  ariaLabel,
  label,
  labelStyle = 'body-02',
  description,
  descriptionStyle = 'body-03',
  skeleton = false,
  error,
  checked = false,
  disabled,
  radioVerticalAlign = 'middle',
  onChange,
}: RadioProps) {
  'use no memo';

  const [radioChecked, setRadioChecked] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    if (checked) {
      setRadioChecked(checked);
    }
  }, [checked]);

  function handleOnChange() {
    if (checked) {
      setRadioChecked(!radioChecked);
    }

    onChange && onChange();
  }

  function renderSkeleton() {
    return (
      <div className={styles['skeleton']}>
        <span id={styles['radio-skeleton']}></span>
        <span id={styles['label-skeleton']}></span>
      </div>
    );
  }

  if (skeleton) {
    return renderSkeleton();
  }

  return (
    <div
      data-testid="radio-wrapper"
      className={`${styles['radio']} ${disabled ? styles['disabled'] : ''} ${
        error ? styles['error'] : ''
      }  ${styles[radioVerticalAlign]}`}
    >
      <div className={`${styles['radio-button-container']}`} role="none">
        <input
          type="radio"
          id={`radio-${id}`}
          name={name}
          aria-checked={checked}
          aria-label={ariaLabel ? ariaLabel : name}
          title={!label && ariaLabel ? ariaLabel : name}
          disabled={disabled}
          onChange={handleOnChange}
          checked={checked ? radioChecked : undefined}
        />
      </div>
      <div className={`${styles['label-wrapper']}`} role="none">
        <Text
          textStyle={labelStyle}
          color={disabled ? 'disabled' : error ? 'negative' : 'primary'}
          children={label}
        ></Text>
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
    </div>
  );
}

Radio.displayName = 'Radio';

export default Radio;
