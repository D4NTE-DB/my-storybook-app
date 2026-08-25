import { type ForwardedRef, forwardRef } from 'react';
import { classNames } from '../../core-ui/utils';
import type { IBaseProps } from '../../types';
import { Icon } from '../icon';
import styles from './button.module.scss';

export interface ButtonProps extends IBaseProps {
  /**
   * Unique identifier for the button.
   */
  id: string;
  /**
   * Adds accessible text to the button.
   */
  ariaLabel?: string;
  /**
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.
   */
  ariaHasPopup?:
    | boolean
    | 'false'
    | 'true'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'
    | undefined;
  /**
   * Content rendered inside the button.
   */
  children?: React.ReactNode;
  /**
   * Adds disabled styling and disables the button.
   */
  disabled?: boolean;
  /**
   * Name of the icon to be displayed in given slot.
   */
  iconName?: string;
  /**
   * URL to where the link should redirect.
   */
  urlLink?: string;
  /**
   * Opens link in a new tab if flag is set.
   */
  newTabLink?: boolean;
  /**
   * Adds styling which affects the size of the button.
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  /**
   * Icon displayed in the button.
   */
  icon?: 'none' | 'leading-icon' | 'trailing-icon' | 'icon-only';
  /**
   * Sets the button type.
   */
  type?: 'button' | 'link' | 'reset' | 'submit';
  /**
   * Adds button variant styles.
   */
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'brand';
  /**
   * A callback for when button is clicked.
   */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => void;
  /**
   * Sets the skeleton loading state.
   */
  skeleton?: boolean;
  /**
   */
  /**
   */
  /**
   * Inverses button colors.
   */
  inverse?: boolean;
  /**
   * @deprecated property has no effect
   */
  roundCorners?: boolean;
  /**
   * Creates a larger clickable area for `ghost` `icon-only` buttons and removes the default padding.
   */
  actionTargetIcon?: boolean;
  /**
   * Sets a custom tab index for the button.
   */
  externalTabIndex?: number;
  /**
   * @deprecated property has no effect
   */
  name?: string;
  /**
   * Sets button to take the full width of its container.
   */
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(
  {
    id,
    ariaLabel,
    ariaHasPopup,
    children,
    disabled = false,
    iconName = 'edit',
    size = 'medium',
    icon = 'none',
    type = 'button',
    style = 'primary',
    onClick,
    urlLink,
    newTabLink = false,
    skeleton = false,
    inverse = false,
    actionTargetIcon = false,
    fullWidth = false,
    externalTabIndex = 0,
  }: ButtonProps,
  forwardedRef: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  'use no memo';

  const baseClassName = classNames(
    styles['button-container'],
    styles[size],
    styles[style],
    styles[icon],
    {
      [styles['inverse']]: inverse,
      [styles['action-target']]:
        actionTargetIcon && style === 'ghost' && icon === 'icon-only',
      [styles['full-width']]: fullWidth,
    }
  );

  const iconSize =
    size === 'xsmall'
      ? 'small'
      : icon === 'icon-only' && size === 'medium'
      ? 'medium'
      : size;


  const handleButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onClick?.(
        event as unknown as React.MouseEvent<HTMLButtonElement>
      );
    }
  };

  // SKELETON (unchanged)
  if (skeleton) {
    return (
      <button
        ref={forwardedRef as ForwardedRef<HTMLButtonElement>}
        aria-label={ariaLabel}
        aria-haspopup={ariaHasPopup}
        className={classNames(
          styles['button-container'],
          styles[size],
          styles[style],
          styles[icon],
          styles['skeleton']
        )}
        disabled={disabled}
        type={type === 'link' ? 'button' : type}
      />
    );
  }

  if (type === 'link') {
    const href = disabled ? undefined : urlLink ?? '#';
    const target = newTabLink ? '_blank' : undefined;
    const rel = newTabLink ? 'noopener noreferrer' : undefined;

    return (
      <a
        ref={forwardedRef as ForwardedRef<HTMLAnchorElement>}
        aria-label={ariaLabel}
        aria-haspopup={ariaHasPopup}
        className={baseClassName}
        href={href}
        target={target}
        rel={rel}
        style={{ textDecoration: 'none' }}
        aria-disabled={disabled || undefined}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
      >
        {iconName && icon && icon !== 'none' && (
          <Icon
            id={id + style}
            name={iconName ? iconName : ''}
            size={iconSize}
          />
        )}
        {icon !== 'icon-only' && size !== 'xsmall' && <span>{children}</span>}
      </a>
    );
  }

  return (
    <button
      ref={forwardedRef as ForwardedRef<HTMLButtonElement>}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      className={baseClassName}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onKeyDown={handleButtonKeyDown}
      tabIndex={externalTabIndex}
    >
      {iconName && icon && icon !== 'none' && (
        <Icon
          id={id + style}
          name={iconName ? iconName : ''}
          size={iconSize}
        />
      )}
      {icon !== 'icon-only' && size !== 'xsmall' && <span>{children}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
