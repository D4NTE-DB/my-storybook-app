import {
  type ReactNode,
  type ComponentType,
  useCallback,
  useState,
} from 'react';
import { useLatest } from '../../hooks/use-latest';
import type { PopperAlign, PopperSide } from '../popper';
import { Toast } from '../toast';
import TooltipContext from './tooltip-context';
import TooltipContent from './tooltip-content';
import styles from './tooltip.module.scss';

export interface TooltipProps<TriggerProps = object> {
  /**
   * Unique identifier for the tooltip.
   */
  id?: string;
  /**
   * Padding around the tooltip content.
   */
  padding?: number;
  /**
   * Offset distance from the trigger element.
   */
  sideOffset?: number;
  /**
   * Text content to display in the tooltip.
   */
  text: string;
  /**
   * Horizontal alignment relative to the trigger.
   */
  alignment?: PopperAlign;
  /**
   * Position of the tooltip relative to the trigger.
   */
  position?: PopperSide;
  /**
   * Enable dark theme styling.
   */
  darkVersion?: boolean;
  /**
   * Maximum width constraint for the tooltip.
   */
  maxWidth?: '240px' | '320px' | '420px';
  /**
   * Enable copy-to-clipboard functionality.
   */
  allowCopy?: boolean;
  /**
   * Custom trigger component and its props.
   */
  triggerProps?: {
    component: ComponentType<TriggerProps>;
  } & TriggerProps;
  /**
   * Enable keyboard focus on the trigger.
   */
  extraFocus?: boolean;
  /**
   */
  /**
   */
  /**
   * Child elements to render as the trigger.
   */
  children?: ReactNode;
  /**
   * Enable text truncation with ellipsis.
   */
  truncate?: boolean;
  /**
   * If true, disables the tooltip functionality.
   */
  disabled?: boolean;
}

function Tooltip<TriggerProps = object>({
  id = 'tooltip',
  padding = 8,
  position = 'bottom',
  alignment = 'center',
  maxWidth = '240px',
  darkVersion = false,
  allowCopy = false,
  text = '',
  sideOffset = 8,
  triggerProps,
  extraFocus = false,
  children,
  truncate = false,
  disabled = false,
}: TooltipProps<TriggerProps>) {
  'use no memo';

  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [openState, setOpenState] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<
    number | NodeJS.Timeout | undefined
  >(undefined);
  const [showToast, setShowToast] = useState(false);

  const openRef = useLatest(openState);

  const setOpen = useCallback(
    (value: boolean) => {
      if (value === openRef.current) {
        return;
      }
      setOpenState(value);
    },
    [openRef]
  );

  const handlePointerEnter = () => {
    if (disabled || !text) return;
    clearTimeout(timeoutId);
    const timerId = setTimeout(() => setOpen(true), 300);
    setTimeoutId(timerId);

  };

  const handlePointerEnterTooltip = () => {
    if (disabled) return;
    if (timeoutId) clearTimeout(timeoutId);
  };

  const handlePointerLeave = () => {
    if (disabled) return;
    const timerId = setTimeout(() => setOpen(false), 300);
    setTimeoutId(timerId);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const TriggerComponent = triggerProps?.component;

  return (
    <TooltipContext.Provider
      value={{
        open: openState,
        trigger,
        setTrigger,
        setOpen,
        setShowToast,
      }}
    >
      <div
        tabIndex={extraFocus ? 0 : undefined}
        className={styles['tooltip-trigger']}
        ref={setTrigger}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handlePointerEnter}
        onBlur={handlePointerLeave}
        aria-describedby={text && !disabled ? `${id}-tooltip` : undefined}
      >
        {TriggerComponent ? <TriggerComponent {...triggerProps} /> : children}
      </div>
      <TooltipContent
        id={`${id}-tooltip`}
        align={alignment}
        side={position}
        padding={padding}
        sideOffset={sideOffset}
        dark={darkVersion}
        maxWidth={maxWidth}
        tooltipDescription={text}
        allowCopy={allowCopy}
        handlePointerEnter={handlePointerEnterTooltip}
        handlePointerLeave={handlePointerLeave}
        truncate={truncate}
      />

      {showToast && (
        <Toast
          id="copy"
          message="Copied to clipboard"
          open={showToast}
          onClose={handleToastClose}
        />
      )}
    </TooltipContext.Provider>
  );
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
