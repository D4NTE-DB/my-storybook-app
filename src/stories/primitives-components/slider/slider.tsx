import {
  type ChangeEvent,
  type KeyboardEvent,
  useId,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Text } from '../text';
import styles from './slider.module.scss';

export interface SliderProps {
  /**
   * Unique identifier for the slider.
   * Used for accessibility attributes and DOM references.
   */
  id: string;

  /**
   * Callback triggered when the slider value changes.
   * Returns the updated numeric value.
   */
  onChange: (value: number) => void;

  /**
   * Defines the value range and scale of the slider.
   * - `1-5` renders a compact slider with 5 steps
   * - `1-10` renders the default slider with 10 steps
   */
  format?: '1-5' | '1-10';

  /**
   * Toggles the visibility of the slider label.
   */
  label?: boolean;

  /**
   * Displays numeric markers along the slider track.
   */
  numberValue?: boolean;

  /**
   * Text label describing the purpose of the slider.
   * Used as visible text and as an accessible label.
   */
  labelName?: string;

  /**
   * Displays the minimum value label on the left side of the slider.
   */
  minValue?: boolean;

  /**
   * Displays the maximum value label on the right side of the slider.
   */
  maxValue?: boolean;

  /**
   * Text displayed for the minimum value indicator.
   */
  minLabel?: string;

  /**
   * Text displayed for the maximum value indicator.
   */
  maxLabel?: string;

  /**
   * Sets the initial slider position based on a percentage.
   * Determines the starting value depending on the selected format.
   *
   * Supported values align with predefined design steps.
   */
  percentage?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | 25 | 75;
}

function Slider({
  id,
  onChange,
  format = '1-10',
  label,
  numberValue = true,
  labelName = 'Label',
  minValue,
  maxValue,
  minLabel = 'Min',
  maxLabel = 'Max',
  percentage = 50,
}: SliderProps) {
  'use no memo';

  const isSmall = format === '1-5' || percentage === 25 || percentage === 75;
  const max = isSmall ? 5 : 10;
  const generatedId = useId();
  const sliderId = id || generatedId;
  const [value, setValue] = useState<number>(
    isSmall ? percentage / 25 + 1 : percentage / 10
  );

  const sliderRef = useRef<HTMLInputElement>(null);

  const sliderChange = `linear-gradient(to right, #150404 0%, #150404 ${
    isSmall ? (value - 1) * 25 : value === 2 ? 12 : (value - 1) * 11
  }%, #ddd 0%, #ddd 100%)`;

  const updateValue = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  const increaseValue = () => updateValue(Math.min(value + 1, max));
  const decreaseValue = () => updateValue(Math.max(value - 1, 1));

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        increaseValue();
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        decreaseValue();
        break;
      case 'Home':
        event.preventDefault();
        updateValue(1);
        break;
      case 'End':
        event.preventDefault();
        updateValue(max);
        break;
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.background = sliderChange;
    }
  }, [sliderChange]);

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    updateValue(newValue);
  };

  function renderText(
    content: string | number | undefined,
    textStyle: 'body-02' | 'body-03' | 'body-02-strong'
  ) {
    if (content === undefined || content === null) return null;

    return (
      <Text textStyle={textStyle} color="primary">
        {content}
      </Text>
    );
  }

  return (
    <div
      className={`${styles['slider-container']} ${isSmall && styles['small']}`}
    >
      <div
        className={`${styles['slider-label-container']} ${
          isSmall && styles['small']
        }`}
      >
        {label && (
          <label
            className={styles['slider-label']}
            id={`${sliderId}-slider-label`}
            htmlFor={`${sliderId}-slider`}
          >
            {renderText(labelName, 'body-02-strong')}
          </label>
        )}

        <div
          className={`${styles['slider-label-min-max-container']} ${
            isSmall && styles['small']
          }`}
        >
          {minValue && (
            <div className={styles['min-max-container']} aria-hidden="true">
              {renderText(minLabel, 'body-03')}
            </div>
          )}

          <div className={styles['slider']}>
            <div
              className={`${styles['range-slider']} ${
                isSmall && styles['small']
              }`}
            >
              <div
                className={`${styles['range-container']} ${
                  isSmall && styles['small']
                }`}
              >
                <input
                  type="range"
                  min={1}
                  max={max}
                  value={value}
                  id={`${sliderId}-slider`}
                  data-testid="slider-input"
                  className={`${styles['range']} ${isSmall && styles['small']}`}
                  aria-label={!label ? labelName : undefined}
                  onChange={handleSliderChange}
                  onKeyDown={handleKeyDown}
                  ref={sliderRef}
                />
              </div>

              <div
                aria-hidden="true"
                className={`${styles['number-marks']} ${
                  isSmall && styles['small']
                }`}
              >
                {numberValue &&
                  Array.from({ length: max }).map((_, index) => (
                    <div className={styles['number-text']} key={index}>
                      {renderText(index + 1, 'body-03')}
                      <span
                        className={`${styles['tick-marks']} ${
                          isSmall && styles['small']
                        }`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {maxValue && (
            <div className={styles['min-max-container']} aria-hidden="true">
              {renderText(maxLabel, 'body-03')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Slider.displayName = 'Slider';

export default Slider;
