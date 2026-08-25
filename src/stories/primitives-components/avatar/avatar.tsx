import { useState, useEffect } from 'react';
import { sanitizeURL } from '../../core-ui/utils';
import type { IBaseProps } from '../../types';
import { Icon } from '../icon';
import styles from './avatar.module.scss';

export type AvatarImageState = 'idle' | 'loading' | 'error' | 'fallback';

export interface AvatarProps extends IBaseProps {
  id?: string;
  /**
   * Sets the style of the avatar component.
   */
  type?: 'person' | 'product-square' | 'product' | 'text' | 'icon' | 'swatch';
  /**
   * Sets the size of the avatar component.
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  /**
   * Sets the alt text of the <img> tag for the avatar component.
   */
  alt?: string;
  /**
   * Sets the image source as a URL of an image (if type is set to `person` or `product-square` or `product`) to be displayed in the avatar component.
   */
  url?: string;
  /**
   * Sets the image source as the URL of an image (applicable if the type is set to `person`, `product-square`, or `product`) to be displayed if the url property encounters an error.
   */
  fallbackUrl?: string;
  /**
   * Set the text for the avatar component (type text).
   */
  text?: string | number;
  /**
   * Sets the color for the avatar component.
   */
  color?:
    | 'none'
    | 'green'
    | 'yellow'
    | 'dark-red'
    | 'blue'
    | 'red'
    | 'brown'
    | 'teal'
    | 'black'
    | 'white';
  /**
   * Sets the custom color for the avatar component.
   */
  customColor?: string;
  /**
   * Sets the emphasis for the avatar component.
   */
  emphasis?: 'default' | 'high';
  /**
   * Sets the disable state for the avatar component.
   */
  disabled?: boolean;
  /**
   * Sets the enable border for the product type avatar component.
   */
  bordered?: boolean;
  /**
   * Sets how an element's content should blend with the content of the element's parent and the element's background.
   */
  mixBlendMode?: boolean;
  /**
   * Sets the avatar icon for the avatar component.
   */
  avatarIcon?: string;
  /**
   * Sets whether the avatar icon has a background.
   */
  avatarIconBackground?: boolean;
  /**
   * Sets the custom avatar icon color for the avatar component.
   */
  avatarIconColor?:
    | 'icon-primary'
    | 'icon-secondary'
    | 'icon-tertiary'
    | 'icon-positive'
    | 'icon-negative'
    | 'icon-disabled'
    | 'icon-inverse'
    | 'icon-black-700'
    | 'icon-black-600'
    | 'icon-black-500'
    | 'icon-black-400'
    | 'icon-black-300'
    | 'icon-black-200'
    | 'icon-black-100'
    | 'icon-red-700'
    | 'icon-red-600'
    | 'icon-red-500'
    | 'icon-red-400'
    | 'icon-red-300'
    | 'icon-red-200'
    | 'icon-red-100'
    | 'icon-dark-red-400'
    | 'icon-dark-red-300'
    | 'icon-dark-red-200'
    | 'icon-yellow-800'
    | 'icon-yellow-300'
    | 'icon-yellow-200'
    | 'icon-green-400'
    | 'icon-green-300'
    | 'icon-green-200'
    | 'icon-green-800'
    | 'icon-blue-800'
    | 'icon-blue-300'
    | 'icon-blue-200'
    | 'icon-brown-800'
    | 'icon-brown-300'
    | 'icon-brown-200'
    | 'icon-teal-800'
    | 'icon-teal-300'
    | 'icon-teal-200';
  /**
   */
  /**
   * Sets the skeleton loading state.
   */
  skeleton?: boolean;
}

function Avatar({
  type = 'icon',
  size = 'medium',
  alt,
  url = 'https://placehold.co/100x100?text=No+Image',
  fallbackUrl = 'https://placehold.co/100x100?text=No+Image',
  text = 'SH',
  color = 'black',
  emphasis = 'default',
  avatarIconBackground = true,
  disabled = false,
  bordered = false,
  mixBlendMode = true,
  avatarIcon = 'account',
  customColor = '#F3F2F2',
  avatarIconColor = 'icon-primary',
  skeleton = false,
}: AvatarProps) {
  'use no memo';

  const [currentUrl, setCurrentUrl] = useState<string>(fallbackUrl);
  useEffect(() => {
    if (!url) return;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setCurrentUrl(url);
    };
    img.onerror = () => {
      setCurrentUrl(fallbackUrl);
    };
  }, [url, fallbackUrl]);
  if (skeleton) {
    return (
      <div
        className={`${styles['avatar-skeleton']} ${styles[size]} ${styles[type]}`}
      ></div>
    );
  }
  if ((type === 'product' || type === 'product-square') && (url || alt)) {
    return (
      <div
        className={`${styles['image-border-container']} ${styles[size]} ${
          disabled ? styles['disabled'] : ''
        } ${bordered ? styles['avatar-border'] : ''} ${styles[type]} ${
          mixBlendMode ? styles['blend-mode'] : ''
        }`}
      >
        <img
          alt={alt}
          src={sanitizeURL(currentUrl, true) || ''}
          className={`${styles['image-border']} ${styles[size]}`}
          onError={() => setCurrentUrl(fallbackUrl)}
        />
      </div>
    );
  }
  if (type === 'text' && text) {
    return (
      <div className={`${styles['text-wrapper']}`}>
        <div
          className={`${styles['text-container']} ${styles[size]} ${
            !disabled && styles[color]
          } ${!disabled && styles[emphasis]} ${disabled && styles['disabled']}`}
        >
          <div
            className={`${styles['text']} ${styles[size]} ${styles[emphasis]} ${
              styles[color]
            } ${disabled && styles['disabled']} `}
          >
            {text?.toString()?.length > 4
              ? text?.toString().substring(0, 4)
              : text}
          </div>
        </div>
      </div>
    );
  }
  if (type === 'person' && (url || alt)) {
    return (
      <div
        className={`${styles['image-container']} ${
          disabled ? styles['disabled'] : ''
        }`}
      >
        <img
          alt={alt}
          src={sanitizeURL(currentUrl, true) || ''}
          className={`${styles[type]} ${styles[size]}`}
          onError={() => setCurrentUrl(fallbackUrl)}
        />
      </div>
    );
  }
  if (type === 'swatch' && customColor) {
    return (
      <div
        className={`${styles['swatch']} ${styles[size]} ${
          disabled && styles['disabled']
        }`}
        style={{ backgroundColor: customColor }}
      />
    );
  }

  return (
    <div className={styles['icon-container']}>
      <div
        className={`${styles['icon']} ${styles[size]} ${
          avatarIconBackground ? '' : styles['icon-background']
        } ${
          !disabled
            ? `${styles[color]} ${styles[emphasis]}`
            : styles['disabled']
        }`}
      >
        <Icon
          name={avatarIcon}
          id={''}
          size={'default'}
          color={
            emphasis === 'high' &&
            color !== 'yellow' &&
            color !== 'white' &&
            !disabled
              ? 'icon-inverse'
              : disabled
              ? 'icon-disabled'
              : avatarIconColor
          }
        />
      </div>
    </div>
  );
}

Avatar.displayName = 'Avatar';

export default Avatar;
