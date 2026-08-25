import { type ForwardedRef, forwardRef, useRef } from 'react';
import { classNames } from '../../core-ui/utils';
import { combineRefs } from '../../utils';
import {
  Popper,
  PopperArrow,
  type PopperSide,
  type PopperAlign,
} from '../popper';
import { Text } from '../text';
import { useTooltipContext } from './tooltip-context';
import styles from './tooltip.module.scss';

export interface TooltipContentProps {
  id: string;
  side?: PopperSide;
  align?: PopperAlign;
  sideOffset?: number;
  padding?: number | Partial<Record<PopperSide, number>>;
  dark?: boolean;
  allowCopy?: boolean;
  tooltipDescription?: string;
  maxWidth: '240px' | '320px' | '420px';
  handlePointerEnter: () => void;
  handlePointerLeave: () => void;
  truncate?: boolean;
}

const TooltipContent = forwardRef(function TooltipContent(
  {
    id,
    side,
    align,
    dark = false,
    tooltipDescription = '',
    maxWidth = '240px',
    sideOffset = 8,
    padding = 8,
    allowCopy = false,
    truncate = false,
    handlePointerEnter,
    handlePointerLeave,
  }: TooltipContentProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  'use no memo';

  const { open, trigger, setShowToast } = useTooltipContext();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickTooltip = () => {
    if (allowCopy) {
      navigator.clipboard.writeText(tooltipDescription);
      setShowToast(true);
    }
  };

  return (
    <Popper
      strategy="fixed"
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={0}
      padding={padding}
      className={styles['tooltip-container']}
      shift
      flip
      hide
      reference={trigger ?? undefined}
      returnFocus={false}
      ariaLabel={tooltipDescription}
    >
      <div
        id={id}
        role="tooltip"
        ref={combineRefs(contentRef, forwardedRef)}
        className={classNames([
          styles['container'],
          {
            [styles['opened']]: open,
            [styles['closed']]: !open,
          },
        ])}
        style={{ maxWidth }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <PopperArrow>
          <svg
            className={`${styles.arrow} ${dark && styles.dark}`}
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0L8 8L0 0H16Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </PopperArrow>

        <div
          className={classNames(styles['tooltip'], {
            [styles['dark']]: dark,
            [styles['copy']]: allowCopy,
          })}
          onClick={handleClickTooltip}
        >
          <Text
            element={'span'}
            textStyle={'body-03'}
            color={dark ? 'secondary-inverse' : 'secondary'}
            wordWrap
            truncateLines={truncate ? '3' : undefined}
          >
            {tooltipDescription}
          </Text>
        </div>
      </div>
    </Popper>
  );
});

TooltipContent.displayName = 'TooltipContent';

export default TooltipContent;
