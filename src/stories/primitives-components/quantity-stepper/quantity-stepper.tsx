import {
  type ChangeEvent,
  type KeyboardEvent,
  useState,
  useEffect,
} from 'react';
import { MinusIcon, PlusIcon, AlertFilledIcon } from '../../core-ui/react-icons';
import { classNames } from '../../core-ui/utils';
import type { IBaseProps } from '../../types';
import styles from './quantity-stepper.module.scss';

export interface QuantityStepperProps extends IBaseProps {
  /**
   * The quantity value.
   */
  quantity?: number;
  /**
   * Identifier for the quantity stepper.
   */
  id: string;
  /**
   * Desktop or mobile configuration.
   */
  configuration?: 'mobile' | 'desktop';
  /**
   */
  /**
   */
  /**
   */
  /**
   * If true, the quantity stepper is read-only.
   */
  readOnly?: boolean;
  /**
   * If true, the quantity stepper is disabled.
   */
  disabled?: boolean;
  /**
   * The minimum allowed value for the quantity stepper.
   */
  minimumValue?: number;
  /**
   * The maximum allowed value for the quantity stepper.
   */
  maximumValue?: number;
  /**
   * If true, indicates an error state.
   */
  error?: boolean;
  /**
   * Error message to display when applicable.
   */
  errorMessage?: string;
  /**
   * The label text for the quantity stepper.
   */
  labelText?: string;
  /**
   * The size of the quantity stepper.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * The position of the label relative to the quantity stepper.
   */
  label?: 'none' | 'top' | 'leading';
  /**
   * If true, displays a skeleton version of the quantity stepper.
   */
  skeleton?: boolean;
  /**
   * Function to return quantity changes.
   */
  onQuantityChange?: (quantity: number | string) => void;
  /**
   */
}

function QuantityStepper({
  quantity = 1,
  configuration = 'desktop',
  readOnly = false,
  disabled = false,
  minimumValue = 1,
  maximumValue = 100,
  error = false,
  errorMessage = '',
  label,
  labelText = 'Quantity',
  size = 'small',
  skeleton = false,
  onQuantityChange,
  id,
}: QuantityStepperProps) {
  'use no memo';

  const [initialValue, setQuantity] = useState<string | number>(quantity);
  const [errorState, setErrorState] = useState<string | null>(
    error ? errorMessage : null
  );

  useEffect(() => {
    if (error) {
      setErrorState(errorMessage);
    } else {
      setErrorState(null);
    }
  }, [error, errorMessage]);

  const handleIncrement = () => {
    const currentValue = parseInt(initialValue as string, 10) || minimumValue;

    if (currentValue < maximumValue) {
      const newValue = currentValue + 1;
      setQuantity(newValue);
      setErrorState(null);
      onQuantityChange?.(newValue);
    } else {
      setQuantity(maximumValue);
      setErrorState(
        size === 'small' ? `Max of ${maximumValue}` : `Max of ${maximumValue}`
      );
      onQuantityChange?.(maximumValue);
    }
  };

  const handleDecrement = () => {
    const currentValue = parseInt(initialValue as string, 10) || minimumValue;

    if (currentValue > minimumValue) {
      const newValue = currentValue - 1;
      setQuantity(newValue);
      setErrorState(null); // Clear error
      onQuantityChange?.(newValue);
    } else {
      setQuantity(minimumValue);
      setErrorState(
        size === 'small'
          ? `Min of ${minimumValue}`
          : `Minimum of ${minimumValue}`
      );
      onQuantityChange?.(minimumValue);
    }
  };

  const onHandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;


    if (inputValue.includes('-') || inputValue.includes('+')) {
      setErrorState('Invalid character'); // Show error if needed
      return;
    }

    if (inputValue === '') {
      setQuantity('');
      onQuantityChange?.('');
      return;
    }

    const newValue = parseInt(inputValue, 10);

    if (isNaN(newValue)) {
      setQuantity(inputValue);
      setErrorState('Please enter a valid number');
      onQuantityChange?.(inputValue);
      return;
    }

    if (newValue < minimumValue) {
      setQuantity(minimumValue);
      setErrorState(
        size === 'small'
          ? `Min of ${minimumValue}`
          : `Minimum of ${minimumValue}`
      );
      onQuantityChange?.(minimumValue);
    } else if (newValue > maximumValue) {
      setQuantity(maximumValue);
      setErrorState(
        size === 'small' ? `Max of ${maximumValue}` : `Max of ${maximumValue}`
      );
      onQuantityChange?.(maximumValue);
    } else {
      setQuantity(newValue);
      setErrorState(null); // Clear error
      onQuantityChange?.(newValue);
    }
  };

  const handleBlur = () => {
    if (initialValue === '') {
      setQuantity(minimumValue ?? quantity);
      setErrorState(null);
      onQuantityChange?.(1);
    }
  };

  function handleTabLeft() {
    const focusableElements = document.querySelectorAll(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const currentFocusIndex = Array.from(focusableElements).indexOf(
      document.activeElement as Element
    );

    let nextFocusIndex = currentFocusIndex - 1;
    if (nextFocusIndex < 0) {
      nextFocusIndex = focusableElements.length - 1;
    }

    (focusableElements[nextFocusIndex] as HTMLElement).focus();
  }

  function handleTabRight() {
    const focusableElements = document.querySelectorAll(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const currentFocusIndex = Array.from(focusableElements).indexOf(
      document.activeElement as Element
    );

    let nextFocusIndex = currentFocusIndex + 1;
    if (nextFocusIndex >= focusableElements.length) {
      nextFocusIndex = 0;
    }

    (focusableElements[nextFocusIndex] as HTMLElement).focus();
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '-' || event.key === '+' || event.key === '.') {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        handleTabRight();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handleTabLeft();
        break;
    }
  };

  function renderSkeleton() {
    return (
      <div
        className={classNames(styles['quantity-container'], styles[size], {
          [styles['leading-label']]: label === 'leading',
          [styles['skeleton']]: skeleton,
        })}
      >
        {labelText && label !== 'none' && (
          <div className={classNames(styles['quantity-label'], styles[size])} />
        )}
        <div
          className={classNames(
            styles['stepper-container'],
            configuration === 'mobile' ? styles['mobile'] : styles[size]
          )}
        />
      </div>
    );
  }

  function renderDesktop() {
    const currentValue =
      typeof initialValue === 'number'
        ? initialValue
        : parseInt(initialValue, 10) || minimumValue;
    const isMinReached = currentValue <= minimumValue;
    const isMaxReached = currentValue >= maximumValue;
    return (
      <div
        onKeyDown={handleKeyDown}
        className={classNames(styles['quantity-container'], styles[size], {
          [styles['leading-label']]: label === 'leading',
          [styles['disabled']]: disabled,
          [styles['read-only']]: readOnly,
        })}
      >
        {labelText && label !== 'none' && (
          <div className={classNames(styles['quantity-label'], styles[size])}>
            {labelText}
          </div>
        )}
        <div className={classNames(styles['stepper-container'], styles[size])}>
          <button
            aria-label="Decrease quantity"
            className={classNames(styles['stepper-button-minus'], styles[size])}
            onClick={handleDecrement}
            disabled={disabled || readOnly || isMinReached}
          >
            <MinusIcon
              aria-hidden={true}
              size={size}
              color={
                disabled || readOnly || isMinReached
                  ? 'icon-disabled'
                  : 'icon-primary'
              }
            />
          </button>
          <div className={`${styles['stepper-count']}`}>
            <input
              type="number"
              aria-label="Input quantity of items"
              value={initialValue}
              min={minimumValue}
              max={maximumValue}
              onChange={onHandleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.currentTarget.select()}
              className={classNames(styles['stepper-text'], styles[size], {
                [styles['error']]: errorState != null || error,
              })}
              readOnly={readOnly}
              disabled={disabled}
            />
          </div>
          <button
            aria-label="Increase quantity"
            onClick={handleIncrement}
            className={classNames(styles['button-plus'], styles[size])}
            disabled={disabled || readOnly || isMaxReached}
          >
            <PlusIcon
              aria-hidden={true}
              size={size}
              color={
                disabled || readOnly || isMaxReached
                  ? 'icon-disabled'
                  : 'icon-primary'
              }
            />
          </button>
        </div>
        {errorState || error ? (
          <div className={styles['error-message-container']}>
            <span>
              <AlertFilledIcon size="small" color="icon-negative" />
            </span>
            <span className={classNames(styles['error-message'], styles[size])}>
              {errorState || errorMessage}
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  function renderMobile() {
    const currentValue =
      typeof initialValue === 'number'
        ? initialValue
        : parseInt(initialValue, 10) || minimumValue;
    const isMinReached = currentValue <= minimumValue;
    const isMaxReached = currentValue >= maximumValue;
    return (
      <div
        onKeyDown={handleKeyDown}
        className={classNames(styles['quantity-container'], styles['mobile'], {
          [styles['leading-label']]: label === 'leading',
          [styles['disabled']]: disabled,
          [styles['read-only']]: readOnly,
        })}
      >
        {labelText && label !== 'none' && (
          <div
            className={classNames(styles['quantity-label'], styles['medium'])}
          >
            {labelText}
          </div>
        )}
        <div
          className={classNames(styles['stepper-container'], styles['mobile'])}
        >
          <button
            aria-label="Decrease quantity"
            className={classNames(
              styles['stepper-button-minus'],
              styles['mobile']
            )}
            onClick={handleDecrement}
            disabled={disabled || readOnly || isMinReached}
          >
            <MinusIcon
              aria-hidden={true}
              size="medium"
              color={
                disabled || readOnly || isMinReached
                  ? 'icon-disabled'
                  : 'icon-primary'
              }
            />
          </button>
          <div
            className={classNames(styles['stepper-count'], styles['mobile'])}
          >
            <input
              type="number"
              value={initialValue}
              min={minimumValue}
              max={maximumValue}
              onChange={onHandleInputChange}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.currentTarget.select()}
              className={classNames(styles['stepper-text'], styles['mobile'], {
                [styles['error']]: errorState != null || error,
              })}
              readOnly={readOnly}
              disabled={disabled || readOnly}
            />
          </div>
          <button
            aria-label="Increase quantity"
            onClick={handleIncrement}
            className={classNames(styles['button-plus'], styles['mobile'])}
            disabled={disabled || readOnly || isMaxReached}
          >
            <PlusIcon
              aria-hidden={true}
              size="medium"
              color={
                disabled || readOnly || isMaxReached
                  ? 'icon-disabled'
                  : 'icon-primary'
              }
            />
          </button>
        </div>
        {errorState || error ? (
          <div className={styles['error-message-container']}>
            <span>
              <AlertFilledIcon size="small" color="icon-negative" />
            </span>
            <span
              className={classNames(styles['error-message'], styles['medium'])}
            >
              {errorState || errorMessage}
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  return skeleton
    ? renderSkeleton()
    : configuration === 'desktop'
    ? renderDesktop()
    : renderMobile();
}

QuantityStepper.displayName = 'QuantityStepper';

export default QuantityStepper;
