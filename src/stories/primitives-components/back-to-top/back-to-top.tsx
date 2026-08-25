import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '../../core-ui/react-icons';
import type { IBaseProps } from '../../types';
import styles from './back-to-top.module.scss';

export interface BackToTopProps extends IBaseProps {
  /**
   * Unique identifier for the button.
   */
  id: string;
  /**
   * Adds disabled styling and disables the button.
   */
  disabled?: boolean;
  /**
   * Adds accessible text to the button.
   */
  ariaLabel?: string;
  /**
   * Sets the size of the button.
   */
  size?: 'small' | 'medium';
  /**
   * Sets the skeleton loading state.
   */
  skeleton?: boolean;
  /**
   * Optional prop to show the button.
   */
  show?: boolean;
  /**
   */
  /**
   */
}

function BackToTop({
  id,
  ariaLabel,
  disabled = false,
  skeleton = false,
  size = 'medium',
  show = false,
}: BackToTopProps) {
  'use no memo';

  const [visible, setVisible] = useState<boolean>(show ? true : false);
  const handleScroll = () => {
    window?.scrollY > 300 ? setVisible(true) : setVisible(false);
  };
  const handleClick = () => {
    const scrollDuration = 500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };
    requestAnimationFrame(scrollAnimation);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function renderSkeleton() {
    return (
      <div
        aria-label={ariaLabel}
        className={`${styles[disabled ? 'disabled' : 'enable']} ${
          styles['button-container']
        } ${skeleton && styles['skeleton']} ${styles[size]}
          `}
      />
    );
  }

  return skeleton ? (
    renderSkeleton()
  ) : visible ? (
    <button
      aria-label={ariaLabel}
      className={`${styles[disabled ? 'disabled' : 'enable']} ${
        styles['button-container']
      } ${styles[size]}
            `}
      disabled={disabled}
      type="button"
      onClick={handleClick}
    >
      {!skeleton && (
        <>
          <ArrowUpIcon
            color={disabled ? 'icon-disabled' : 'icon-primary'}
            size={size}
          />
          <span className={`${styles['text-button']} ${styles[size]}`}>
            Back to Top
          </span>
        </>
      )}
    </button>
  ) : null;
}

BackToTop.displayName = 'BackToTop';

export default BackToTop;
