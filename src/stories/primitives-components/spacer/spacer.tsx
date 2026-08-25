import type { SpacingProp } from '../../styles';
import { Block } from '../block';

export interface SpacerProps {
  float?: 'left' | 'right' | 'none';
  size:
    | '2'
    | '4'
    | '8'
    | '12'
    | '16'
    | '24'
    | '32'
    | '40'
    | '48'
    | '64'
    | '80'
    | '120';
  type?: 'block' | 'horizontal' | 'vertical';
}

const sizeValueMapping: Record<SpacerProps['size'], SpacingProp> = {
  2: '1',
  4: '2',
  8: '3',
  12: '4',
  16: '5',
  24: '6',
  32: '7',
  40: '8',
  48: '9',
  64: '10',
  80: '11',
  120: '12',
};

/**
 * @deprecated use Block component or margin props instead
 */
function Spacer({ float, size, type = 'block' }: SpacerProps) {
  'use no memo';

  const spacing = sizeValueMapping[size];

  return (
    <Block
      inline={float === 'none'}
      w={type === 'vertical' ? '1' : spacing}
      h={type === 'horizontal' ? '1' : spacing}
      mr={float === 'left' ? 'auto' : undefined}
      ml={float === 'right' ? 'auto' : undefined}
    />
  );
}

Spacer.displayName = 'Spacer';

export default Spacer;
