import {
  type ForwardedRef,
  type ComponentType,
  type ReactNode,
  forwardRef,
} from 'react';
import { CrossFilledIcon, EditIcon } from '../../core-ui/react-icons';
import type { IconProps } from '../../core-ui/react-icons';
import { classNames } from '../../core-ui/utils';

import type { IBaseProps } from '../../types';
import { Text } from '../text';
import { Tooltip } from '../tooltip';
import { Icon } from '../icon';
import styles from './chip.module.scss';

export interface ChipProps extends IBaseProps {
  id?: string;
  /**
   * Adds accessible text to the button.
   */
  ariaLabel?: string;
  /**
   * Content rendered inside the button.
   */
  children?: ReactNode;
  /**
   * Adds disabled styling and disables the button.
   * @default false
   */
  disabled?: boolean;
  /**
   * Sets the selected state of the chip.
   * @default false
   */
  selected?: boolean;
  /**
   * Adds a description to the button.
   */
  description?: string;
  /**
   * Sets the error state of the chip.
   */
  error?: boolean;
  /**
   * @deprecated use `icon` prop instead
   */
  iconName?: string;
  /**
   * Icon component to display.
   */
  icon?: ComponentType<IconProps>;
  /**
   * Adds styling which affects the size of the button.
   * @default "small"
   */
  size?: 'small' | 'medium';
  /**
   * Orientation of the icon within the chip.
   */
  iconOrientation?:
    | 'leading-icon'
    | 'trailing-icon'
    | 'icon-only'
    | 'delete'
    | 'none';
  /**
   * Sets the button type.
   * @default "button"
   */
  type?: 'button' | 'reset' | 'submit';
  /**
   * Adds button variant styles.
   * @default "filled"
   */
  variant?: 'filled' | 'ghost' | 'outline';
  /**
   * Text to display in tooltip.
   * @default ""
   */
  tooltipText?: string;
  /**
   * A callback for when button is clicked.
   */
  onClick?: () => void;
  /**
   * A callback for when the cross/delete icon is clicked.
   */
  onClickCross?: () => void;
  /**
   * Sets the skeleton loading state.
   */
  skeleton?: boolean;
  /**
   */
  /**
   */
}

const Chip = forwardRef(function Chip(
  {
    id,
    ariaLabel,
    children,
    disabled = false,
    selected = false,
    description,
    iconName,
    icon = EditIcon,
    size = 'small',
    iconOrientation = 'none',
    type = 'button',
    variant = 'filled',
    onClick,
    onClickCross,
    skeleton,
    error = false,
    tooltipText = '',
  }: ChipProps,
  forwardedRef: ForwardedRef<HTMLButtonElement>
) {
  'use no memo';

  const chipId = id || 'chip';
  const chipLabel =
    typeof children === 'string' ? children : ariaLabel || 'Chip';

  const isDelete = iconOrientation === 'delete';
  const isIconOnly = iconOrientation === 'icon-only';
  const hasVisibleIcon =
    iconOrientation !== 'none' && iconOrientation !== undefined;

  const isFilledSelected = variant === 'filled' && selected;
  const isGhostIconOnlySelected =
    variant === 'ghost' && selected && iconOrientation === 'icon-only';

  function beforeOnClick() {
    if (disabled) return;

    onClick && onClick();
  }
  function beforeOnClickCross() {
    if (disabled) return;
    onClickCross && onClickCross();
  }

  function renderSkeleton() {
    return (
      <button
        aria-label={ariaLabel}
        className={classNames(
          styles['chip-container'],
          styles[variant],
          styles[iconOrientation || ''],
          styles['skeleton'],
          styles[size]
        )}
        disabled={disabled}
        type={type}
      />
    );
  }

  let iconElement;
  if (iconName) {
    iconElement = (
      <Icon
        id={`${chipId}-icon`}
        name={error || isDelete ? 'crossFilled' : iconName}
        data-testid="chip-icon"
        aria-hidden="true"
        size={isIconOnly && size === 'medium' ? 'large' : size}
        color={
          disabled
            ? 'icon-disabled'
            : error
            ? 'icon-negative'
            : isFilledSelected || isGhostIconOnlySelected
            ? 'icon-inverse'
            : 'icon-primary'
        }
      />
    );
  } else {
    const IconComponent = error || isDelete ? CrossFilledIcon : icon;

    iconElement = (
      <IconComponent
        size={isIconOnly && size === 'medium' ? 'large' : size}
        color={
          disabled
            ? 'icon-disabled'
            : error
            ? 'icon-negative'
            : isFilledSelected || isGhostIconOnlySelected
            ? 'icon-inverse'
            : 'icon-primary'
        }
      />
    );
  }

  const descriptionElement = description ? (
    <Text
      element="span"
      color={
        disabled
          ? 'disabled'
          : error
          ? 'negative'
          : isFilledSelected
          ? 'primary-inverse'
          : 'primary'
      }
      wordWrap
      truncateLines="1"
      textStyle={size === 'medium' ? 'body-02' : 'body-03'}
    >
      {description}
    </Text>
  ) : null;

  const labelElement = (
    <Text
      element="span"
      textStyle={size === 'small' ? 'body-03-strong' : 'body-02-strong'}
      color={
        disabled
          ? 'disabled'
          : error
          ? 'negative'
          : isFilledSelected
          ? 'primary-inverse'
          : 'primary'
      }
    >
      {children}
    </Text>
  );

  const renderTextContent = () => (
    <div className={styles['text-container']}>
      {descriptionElement}
      {labelElement}
    </div>
  );

  const renderDeleteButton = () => {
    const deleteButton = (
      <button
        type="button"
        className={classNames(
          styles['delete-icon-container'],
          error && styles['error-delete'],
          disabled && styles['disabled']
        )}
        disabled={disabled}
        aria-label={`Remove ${chipLabel}`}
        aria-describedby={
          tooltipText && !disabled ? `${chipId}-delete-tooltip` : undefined
        }
        onClick={(event) => {
          event.stopPropagation();
          beforeOnClickCross();
        }}
      >
        {iconElement}
      </button>
    );

    if (!tooltipText || disabled) {
      return deleteButton;
    }

    return (
      <Tooltip id={`${chipId}-delete`} text={tooltipText} position="top">
        {deleteButton}
      </Tooltip>
    );
  };

  if (skeleton) {
    return renderSkeleton();
  }

  if (isDelete && onClickCross) {
    return (
      <div
        className={classNames(
          styles['chip-container-delete'],
          styles[size],
          styles[variant],
          error && styles['error-delete'],
          disabled && styles['disabled']
        )}
      >
        <button
          ref={forwardedRef}
          type={type}
          className={styles['delete-chip-content']}
          disabled={disabled}
          aria-label={ariaLabel || chipLabel}
          onClick={beforeOnClick}
        >
          {renderTextContent()}
        </button>

        {renderDeleteButton()}
      </div>
    );
  }

  const orientationClass = iconOrientation === 'none' ? '' : iconOrientation;

  return (
    <button
      ref={forwardedRef}
      aria-label={ariaLabel || chipLabel}
      className={classNames(
        styles['chip-container'],
        styles[size && variant === 'outline' ? `${size}-outline` : size],
        styles[variant],
        styles[
          orientationClass && variant === 'outline'
            ? `${orientationClass}-outline${size === 'medium' ? '-medium' : ''}`
            : orientationClass || ''
        ],
        error && styles['error-delete'],
        styles[
          selected && (variant === 'filled' || (!error && variant === 'ghost'))
            ? 'selected'
            : selected && !hasVisibleIcon
            ? `selected-${size}-no-icon`
            : selected && variant === 'outline'
            ? `selected-${size}${
                iconOrientation === 'icon-only' ? '-icon-only' : ''
              }`
            : ''
        ],
        error && styles['error']
      )}
      disabled={disabled}
      type={type}
      onClick={beforeOnClick}
    >
      {iconOrientation === 'leading-icon' && iconElement}

      {iconOrientation !== 'icon-only' && renderTextContent()}

      {iconOrientation === 'trailing-icon' && iconElement}

      {(iconOrientation === 'icon-only' ||
        (iconOrientation === 'delete' && !onClickCross)) &&
        iconElement}
    </button>
  );
});

Chip.displayName = 'Chip';

export default Chip;
