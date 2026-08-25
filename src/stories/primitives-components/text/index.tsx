import React from 'react';

export function Text({ element: Tag = 'span', textStyle, color, truncateLines, wordWrap, children, className, style, ...rest }: any) {
  const inlineStyle = {
    ...style,
    ...(truncateLines && {
      display: '-webkit-box', WebkitLineClamp: truncateLines,
      WebkitBoxOrient: 'vertical', overflow: 'hidden',
    }),
    ...(wordWrap && { overflowWrap: 'break-word' }),
    ...(color === 'secondary' && { color: '#525252' }),
    ...(color === 'disabled' && { color: '#a8a8a8' }),
    ...(color === 'negative' && { color: '#da1e28' }),
  };
  return <Tag className={className} style={inlineStyle} {...rest}>{children}</Tag>;
}
export default Text;
