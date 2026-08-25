import type { MouseEvent } from 'react';
import { sanitizeURL, classNames } from '../../core-ui/utils';
import type { IBaseProps } from '../../types';
import { Icon } from '../icon';
import styles from './link.module.scss';

export interface LinkProps extends IBaseProps {
  /**
   * Unique identifier for the link.
   */
  id: string;
  /**
   * Adds accessible text to the link.
   */
  ariaLabel?: string;
  /**
   * Adds link variant styles.
   */
  type?: 'primary' | 'secondary' | 'tertiary';
  /**
   * Sets size of text link to small or large.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Sets icon position for `primary` link.
   */
  icon?: 'leading' | 'trailing';
  /**
   * URL to where the link should redirect.
   */
  url: string;
  /**
   * Link text.
   */
  label?: string;
  /**
   * Makes bold link text if set to `high`
   */
  emphasis?: 'low' | 'high';
  /**
   * Sets the maximum number of lines to display.
   */
  truncateLines?: '1' | '2' | '3';
  /**
   * Replaces link with skeleton.
   */
  skeleton?: boolean;
  /**
   * Prevents link to be clicked.
   */
  disabled?: boolean;
  /**
   * Inverses link colors.
   */
  inverse?: boolean;
  /**
   * Opens link in a new tab if flag is set.
   */
  newTab?: boolean;
  /**
   * Adds a title to the link.
   */
  title?: string;
  /**
   * Function which track the link click event.
   */
  onClickLink?: () => void;
  /**
   */
  /**
   */
  /**
   * Name of the icon to be displayed in given slot.
   */
  iconName?: string;
  /**
   * Width of link skeleton. For example, `64px`
   */
  skeletonWidth?: string;
  /**
   * Keep path case for the link.
   */
  keepPathCase?: boolean;
}

function Link({
  id,
  ariaLabel,
  url,
  label,
  icon = 'leading',
  type = 'primary',
  inverse = false,
  emphasis = 'low',
  skeleton = false,
  disabled = false,
  truncateLines,
  newTab = false,
  title,
  size = 'small',
  onClickLink,
  iconName,
  skeletonWidth,
  keepPathCase = false,
}: LinkProps) {
  'use no memo';

  let linkContent;

  if (type === 'primary') {
    if (icon === 'leading') {
      linkContent = (
        <div className={styles['link-content']}>
          <Icon
            id={'arrow-left-icon'}
            name={iconName ? iconName : 'arrowLeft'}
            size={size}
            color="icon-primary"
          />

          {label}
        </div>
      );
    } else {
      linkContent = (
        <div className={styles['link-content']}>
          {label}
          <Icon
            id={'arrow-right-icon'}
            name={iconName ? iconName : 'arrowRight'}
            size={size}
            color="icon-primary"
          />
        </div>
      );
    }
  }

  if (type === 'secondary' || type === 'tertiary') {
    linkContent = label;
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onClickLink) {
      e.preventDefault();
      onClickLink();
    }
  };

  if (skeleton) {
    return (
      <div
        style={{ width: skeletonWidth }}
        className={classNames(
          styles['skeleton'],
          styles[size],
          styles[emphasis],
          styles[type]
        )}
      >
        <span
          className={classNames(styles['link-skeleton'], styles[size])}
        ></span>
      </div>
    );
  }

  const safeHref = !disabled ? sanitizeURL(url, keepPathCase) : '';

  return (
    <a
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      title={title}
      {...(safeHref && { href: safeHref })}
      {...(newTab &&
        !disabled &&
        safeHref && { target: '_blank', rel: 'noreferrer' })}
      className={classNames(styles['container'], styles[size], styles[icon], {
        [styles[`truncate-${truncateLines}`]]: truncateLines != null,
        [styles['disabled']]: disabled,
        [styles['inverse']]: inverse,
        [styles['emphasis-low']]: emphasis === 'low',
        [styles['emphasis-high']]: emphasis !== 'low',
        [styles['underlined']]: type === 'secondary',
        [styles['tertiary']]: type === 'tertiary',
      })}
      onClick={handleClick}
    >
      {linkContent}
    </a>
  );
}

Link.displayName = 'Link';

export default Link;
