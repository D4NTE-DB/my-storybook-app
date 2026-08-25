import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '../../core-ui/react-icons';
import { classNames } from '../../core-ui/utils';
import type { IBaseProps } from '../../types';
import { Text } from '../text';
import { type AvatarProps, Avatar } from '../avatar';
import styles from './accordion.module.scss';

export interface AccordionProps extends IBaseProps {
  /**
   * Sets the id for the accordion component.
   */
  id: string;
  /**
   * Sets the title of the accordion component. This is a required field.
   */
  title: string;
  /**
   * The content to be displayed when the accordion is open in the accordion component.
   */
  children: ReactNode;
  /**
   * Sets the top border of the accordion component.
   */
  border?: boolean;
  /**
   * Sets the subhead boolean of the accordion component.
   */
  subhead?: boolean;
  /**
   * Sets the subheader when subhead is true of the accordion component.
   */
  subheader?: string;
  /**
   * Sets the vertical alignment of the accordion content to `top` or `center`.
   */
  alignmentVertical?: 'top' | 'center';
  /**
   * Sets the alignment of the accordion icon to `left` or `right`.
   */
  alignment?: 'left' | 'right';
  /**
   * Sets the disabled state of the accordion component.
   */
  disabled?: boolean;
  /**
   * Sets the accordion with a card view for the accordion component.
   */
  accordionCard?: boolean;
  /**
   * Sets the expanded state of the accordion component. By default, the accordion is collapsed.
   */
  expanded?: boolean;
  /**
   * Sets the skeleton state of the accordion component.
   */
  skeleton?: boolean;
  /**
   * Sets the size of the accordion component to `small`, `medium`, or `large`.
   */
  size?: 'small' | 'medium' | 'large';
  /**
   */
  /**
   * Sets the border color of the accordion component.
   */
  borderColor?: 'border-01' | 'border-02' | 'border-03';
  /**
   * Sets the kind/variant of the accordion component.
   */
  kind?: 'elevated' | 'outline' | 'filled';
  /**
   * Sets the background color of the accordion component when `kind` is set to `filled`. Options are `background-01`, `background-02`, or `background-03`.
   */
  filledColor?: 'background-01' | 'background-02' | 'background-03';
  /**
   */
  /**
   * Sets the padding options for the accordion component.
   */
  paddingOptions?: '0' | '16' | '24' | '32';
  /**
   * Callback function triggered when the accordion is toggled.
   */
  onToggle?: (isOpen: boolean) => void;
  /**
   * When true, displays the chevron icon at the start/beginning of the accordion header.
   */
  chevronAtStart?: boolean;
  /**
   * When true, displays an avatar in the accordion header.
   */
  avatar?: boolean;
  /**
   * Sets the type/variant of the avatar displayed in the accordion header.
   */
  avatarType?: AvatarProps['type'];
  /**
   * Sets the icon to display inside the avatar when `avatarType` is set to `icon`.
   */
  avatarIcon?: AvatarProps['avatarIcon'];
}

export function Accordion({
  title = 'Title of accordion',
  paddingOptions = '16',
  id,
  children,
  subhead = false,
  border = true,
  subheader = 'Subheader',
  alignmentVertical = 'center',
  alignment = 'right',
  size = 'medium',
  disabled = false,
  accordionCard = false,
  expanded = false,
  skeleton = false,
  borderColor = 'border-01',
  kind = 'outline',
  filledColor = 'background-01',
  onToggle,
  chevronAtStart = false,
  avatar = false,
  avatarType = 'product',
  avatarIcon = 'check',
}: AccordionProps) {
  'use no memo';
  const [isOpen, setIsOpen] = useState(expanded);

  useEffect(() => {
    setIsOpen(expanded);
    onToggle?.(expanded);
  }, [expanded, onToggle]);

  const accordionRef = useRef<HTMLDivElement>(null);
  function toggleAccordion() {
    const currentElement = document.activeElement as HTMLElement | null;
    if (currentElement) {
      currentElement.blur();
    }
    setIsOpen(!isOpen);
    onToggle?.(!isOpen);
  }

  function handleKeyDown(e: any) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion();
    }
  }
  function renderIcon(...args: any[]) {
    if (chevronAtStart) {
      return isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />;
    }
    return isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />;
  }
  function renderSkeleton() {
    return (
      <div>
        {accordionCard ? (
          <div
            className={`${
              accordionCard && styles['accordion-card-skeleton']
            }  ${styles[size]}  ${expanded && styles['expanded-skeleton']}`}
          >
            <div
              className={`${
                accordionCard && styles['accordion-card-skeleton-title']
              } ${styles[size]}`}
            />
          </div>
        ) : (
          <div
            ref={accordionRef}
            onKeyDown={handleKeyDown}
            className={`${styles['accordion-container']}  ${styles['accordion-container-skeleton']} `}
          >
            <div
              className={`${styles['accordion-header']}  ${
                disabled && styles['disabled']
              }  ${accordionCard && styles['accordion-card']} `}
              onClick={toggleAccordion}
            >
              <div
                className={`${styles['accordion-header-container']} ${
                  alignment === 'left' && styles['left-align']
                } ${styles[size]}`}
                style={
                  !accordionCard
                    ? {
                        paddingLeft: paddingOptions + 'px',
                        paddingRight: paddingOptions + 'px',
                      }
                    : undefined
                }
              >
                <div
                  className={`${styles['accordion-title-container']} ${styles[size]}`}
                >
                  <div
                    className={`${styles['accordion-skeleton-header']} ${styles[size]}`}
                  ></div>
                  {subhead && (
                    <div
                      className={`${styles['accordion-subheader']} ${styles[size]}`}
                    ></div>
                  )}
                </div>
                <div className={`${styles['accordion-icon']} ${styles[size]}`}>
                  {renderIcon(expanded || isOpen)}
                </div>
              </div>
              {expanded && (
                <div
                  className={`${styles['accordion-skeleton-content']} ${styles[size]}`}
                >
                  <div
                    className={`${styles['accordion-skeleton-contents']} ${styles[size]}`}
                  ></div>
                  <div
                    className={`${styles['accordion-skeleton-contents']} ${styles[size]}`}
                  ></div>
                  <div
                    className={`${styles['accordion-skeleton-contents']} ${styles[size]}`}
                  ></div>
                  <div
                    className={`${styles['accordion-subheader-content']} ${styles[size]}`}
                  ></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  function renderChildren() {
    return (
      isOpen && (
        <div
          id={`${id}-content`}
          role="region"
          aria-labelledby={`${id}-header`}
          className={`${styles['accordion-content']}  ${
            accordionCard && styles['accordion-card']
          } ${styles[kind]} ${styles[size]} ${disabled && styles['disabled']} ${
            kind === 'filled' ? styles[filledColor] : ''
          }`}
          style={
            !accordionCard
              ? {
                  paddingLeft: `${paddingOptions}px`,
                  paddingRight: `${paddingOptions}px`,
                }
              : undefined
          }
        >
          {children}
        </div>
      )
    );
  }

  if (skeleton) return renderSkeleton();

  return (
    <div
      className={classNames(styles['accordion-container'], styles[size], {
        [styles[kind]]: !!accordionCard,
        [styles[`${borderColor}`]]: !accordionCard,
        [styles['accordion-card']]: !!accordionCard,
        [styles['border']]: kind === 'outline',
        [styles['disabled']]: !!disabled,
        [styles['accordion-card-border-expanded']]:
          !!accordionCard && kind === 'outline' && (expanded || isOpen),
        [styles[filledColor]]: kind === 'filled',
      })}
      ref={accordionRef}
      onKeyDown={handleKeyDown}
    >
      <button
        id={`${id}-header`}
        className={classNames(styles['accordion-header'], styles[size], {
          [styles['disabled']]: !!disabled,
          [styles['accordion-card']]: !!accordionCard,
          [styles[`${borderColor}`]]: kind === 'outline',
          [styles[filledColor]]: kind === 'filled',
          [styles['no-border']]: !border && kind !== 'outline',
          [styles['accordion-card-border']]:
            !!accordionCard && kind === 'outline',
          [styles['accordion-card-border-expanded']]:
            !!accordionCard && kind === 'outline' && (expanded || isOpen),
          [styles[kind]]: !!accordionCard && kind === 'outline',
        })}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        aria-label={isOpen ? 'Collapse accordion' : 'Expand accordion'}
        onClick={toggleAccordion}
      >
        <div
          className={classNames(
            styles['accordion-header-container'],
            styles[size],
            {
              [styles['left-align']]: alignment === 'left',
              [styles['accordion-card']]: !!accordionCard,
              [styles['sub-header-container']]: !!subhead,
              [styles['accordion-header-border']]: kind === 'outline',
              [styles['chevron-start']]: chevronAtStart,
            }
          )}
          style={
            !accordionCard
              ? {
                  paddingLeft: `${paddingOptions}px`,
                  paddingRight: `${paddingOptions}px`,
                }
              : undefined
          }
        >
          <div className={`${styles['accordion-title-container']}`}>
            {avatar && (
              <div className={`${styles['accordion-title-icon-wrapper']}`}>
                <Avatar
                  id={''}
                  type={avatarType}
                  avatarIcon={avatarIcon}
                  size="xsmall"
                />
              </div>
            )}
            <div
              className={classNames(
                styles['accordion-title-subheader-container'],
                styles[size],
                {
                  [styles['left-align']]: alignment === 'left',
                  [styles['accordion-card']]: !!accordionCard,
                  [styles['expanded']]: expanded || isOpen,
                }
              )}
            >
              <div
                className={classNames(styles['accordion-title'], {
                  [styles['disabled']]: !!disabled,
                })}
              >
                <Text
                  element="span"
                  textStyle={
                    accordionCard && size === 'small'
                      ? 'heading-06'
                      : 'heading-07'
                  }
                  truncateLines="1"
                  wordWrap
                  color={disabled ? 'disabled' : 'primary'}
                >
                  {title}
                </Text>
              </div>
              {subhead && subheader && (
                <div className={`${styles['accordion-subheader']}`}>
                  <Text
                    element="span"
                    textStyle="heading-07"
                    truncateLines="1"
                    wordWrap
                    color={disabled ? 'disabled' : 'secondary'}
                  >
                    {subheader}
                  </Text>
                </div>
              )}
            </div>
          </div>
          <div
            className={classNames(
              styles[`accordion-icon-wrapper-${alignmentVertical}`],
              styles[size]
            )}
          >
            {renderIcon(expanded || isOpen)}
          </div>
        </div>
      </button>
      {renderChildren()}
    </div>
  );
}

Accordion.displayName = 'Accordion';

export default Accordion;
