import React from 'react';

export type IconProps = any;

const svgPaths: any = {
  ChevronDownIcon: '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>',
  ChevronUpIcon: '<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"/>',
  ChevronRightIcon: '<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>',
  ArrowUpIcon: '<path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>',
  ArrowDownIcon: '<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>',
  CrossFilledIcon: '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>',
  EditIcon: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
  MinusIcon: '<path d="M19 13H5v-2h14v2z"/>',
  PlusIcon: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>',
  AlertFilledIcon: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
  CheckIcon: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>',
  CloseIcon: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>',
  CheckBorderIcon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>',
};

function createIcon(name: string, defaultPath: string) {
  return function IconComponent({ size = 'medium', color, ...rest }: any) {
    const sizeMap: any = { small: '16px', medium: '24px', large: '32px' };
    const dim = sizeMap[size] || '24px';
    const fill = color === 'icon-inverse' ? '#fff' : color === 'primary' ? '#161616' : color || 'currentColor';
    return (
      <svg width={dim} height={dim} viewBox="0 0 24 24" fill={fill} {...rest} dangerouslySetInnerHTML={{ __html: svgPaths[name] || defaultPath }} />
    );
  };
}

export const ChevronDownIcon = createIcon('ChevronDownIcon', svgPaths.ChevronDownIcon);
export const ChevronUpIcon = createIcon('ChevronUpIcon', svgPaths.ChevronUpIcon);
export const ChevronRightIcon = createIcon('ChevronRightIcon', svgPaths.ChevronRightIcon);
export const ArrowUpIcon = createIcon('ArrowUpIcon', svgPaths.ArrowUpIcon);
export const ArrowDownIcon = createIcon('ArrowDownIcon', svgPaths.ArrowDownIcon);
export const CrossFilledIcon = createIcon('CrossFilledIcon', svgPaths.CrossFilledIcon);
export const EditIcon = createIcon('EditIcon', svgPaths.EditIcon);
export const MinusIcon = createIcon('MinusIcon', svgPaths.MinusIcon);
export const PlusIcon = createIcon('PlusIcon', svgPaths.PlusIcon);
export const AlertFilledIcon = createIcon('AlertFilledIcon', svgPaths.AlertFilledIcon);
export const CheckIcon = createIcon('CheckIcon', svgPaths.CheckIcon);
export const CloseIcon = createIcon('CloseIcon', svgPaths.CloseIcon);
export const CheckBorderIcon = createIcon('CheckBorderIcon', svgPaths.CheckBorderIcon);

export function Icon({ name, size, color, ...rest }: any) {
  const SvgIcon = createIcon(name, '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>');
  return <SvgIcon size={size} color={color} {...rest} />;
}
export default Icon;
