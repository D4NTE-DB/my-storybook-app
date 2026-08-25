import { useEffect, useState } from 'react';
import { classNames } from '../../core-ui/utils';
import { Text } from '../text';
import styles from './progress-bar.module.scss';

export interface ProgressBarProps {
  /**
   * The unique identifier for the progress bar.
   */
  id?: string;
  /**
   * Indicates the progress percentage.
   * Use predefined steps or `custom` for dynamic values.
   */
  progress: 0 | 25 | 50 | 75 | 100 | 'custom';

  /**
   * Defines the visual status of the progress bar.
   * Affects color and semantic meaning.
   */
  type?:
    | 'default'
    | 'positive'
    | 'negative'
    | 'informative'
    | 'warning'
    | 'neutral';

  /**
   * Sets the size of the progress bar.
   */
  size?: 'small' | 'medium';

  /**
   * Toggles the background track behind the progress indicator.
   */
  background?: boolean;

  /**
   * Controls the layout alignment of the progress bar
   * and its helper text.
   */
  alignment?: 'default' | 'inline';

  /**
   * Displays the sub-header text below the main header.
   */
  subHeader?: boolean;

  /**
   * Primary helper text displayed alongside or below the progress bar.
   */
  helperText?: string;

  /**
   * Secondary helper text displayed when alignment is `default`.
   */
  helperTextSecondary?: string;

  /**
   * Main header text displayed above the progress bar.
   */
  header?: string;

  /**
   * Sub-header descriptive text displayed below the header.
   */
  subHeaderText?: string;

  /**
   * Enables the skeleton loading state.
   */
  skeleton?: boolean;

  /**
   * Custom progress value used when `progress` is set to `custom`.
   * Accepts a number between 0 and 100.
   */
  customProgress?: number;

  /**
   * Overrides the default progress bar fill color.
   */
  customColor?: string;
}

function ProgressBar({
  id,
  progress,
  header = 'On Its Way',
  subHeader = true,
  subHeaderText = 'Package in route with the carrier facility',
  helperText = 'Processing',
  helperTextSecondary = 'Delivered',
  alignment = 'default',
  size = 'small',
  background = true,
  skeleton = false,
  customProgress,
  type = 'default',
  customColor,
}: ProgressBarProps) {
  'use no memo';

  const [filledWidth, setFilledWidth] = useState<number>(
    progress === 'custom' ? customProgress ?? 0 : progress
  );

  useEffect(() => {
    setFilledWidth(progress === 'custom' ? customProgress ?? 0 : progress);
  }, [customProgress, progress]);
  type RenderTextOptions = {
    type?: ProgressBarProps['type'];
    truncateLines?: '1' | '2' | '3';
  };

  function renderText(
    content: string | undefined,
    textStyle: 'heading-06' | 'body-01-strong' | 'body-02' | 'body-03',
    { type, truncateLines = '2' }: RenderTextOptions
  ) {
    if (!content) return null;

    return (
      <Text
        textStyle={textStyle}
        truncateLines={truncateLines}
        wordWrap
        color={type === 'negative' ? 'negative' : 'secondary'}
      >
        {content}
      </Text>
    );
  }

  if (skeleton) {
    return (
      <div
        id={id}
        className={classNames(styles['progress-bar-container'], styles[size])}
      >
        <div
          className={classNames(
            styles['progress-bar-item'],
            {
              [styles['background']]: background,
              [styles['subheader-progress']]:
                subHeader && alignment !== 'inline',
            },
            styles['skeleton']
          )}
        />
      </div>
    );
  }

  return (
    <div
      id={id}
      className={classNames(
        styles['progress-bar-container'],
        styles[alignment],
        styles[size]
      )}
    >
      {header && (
        <div className={styles['header-container']}>
          <Text
            element="span"
            truncateLines="1"
            wordWrap
            textStyle={
              alignment === 'inline'
                ? size === 'medium'
                  ? 'heading-06'
                  : 'heading-07'
                : size === 'medium'
                ? 'heading-05'
                : 'heading-06'
            }
          >
            {header}
          </Text>
          {subHeader && (
            <Text
              element="span"
              wordWrap
              truncateLines="2"
              textStyle={
                alignment === 'inline'
                  ? 'body-04'
                  : size === 'medium'
                  ? 'body-04'
                  : 'body-03'
              }
            >
              {subHeaderText}
            </Text>
          )}
        </div>
      )}
      <div
        className={classNames(styles['progress-bar'], styles[alignment], {
          [styles['progress-bar-gap']]: Boolean(
            helperText && helperTextSecondary
          ),
        })}
      >
        <div
          className={classNames(styles['progress-bar-item'], {
            [styles['background']]: !background,
            [styles['subheader-progress']]: subHeader && alignment !== 'inline',
          })}
        >
          {filledWidth > 0 && (
            <div
              className={classNames(
                styles['progress-bar-filled'],
                styles[type]
              )}
              data-testid="progress-bar"
              style={{
                width: `${filledWidth}%`,
                backgroundColor: customColor || undefined,
              }}
            />
          )}
        </div>
        {alignment === 'inline' && helperText && (
          <span className={styles['helper-text-inline']}>
            {renderText(helperText, size === 'small' ? 'body-02' : 'body-03', {
              type,
            })}
          </span>
        )}

        {alignment === 'default' && helperText && (
          <div className={styles['helper-container']}>
            {renderText(helperText, size === 'small' ? 'body-02' : 'body-03', {
              type,
            })}

            {renderText(
              helperTextSecondary,
              size === 'small' ? 'body-02' : 'body-03',
              { type }
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
