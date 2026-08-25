import React from 'react';

function resolveSpacing(val: any) {
  if (!val) return undefined;
  if (!isNaN(val)) return `${parseInt(val) * 0.25}rem`;
  return val;
}

export function Block({ inline, w, h, mr, ml, mt, mb, p, m, children, style, ...rest }: any) {
  const inlineStyle = {
    ...style,
    ...(inline && { display: 'inline-flex' }),
    ...(w && { width: resolveSpacing(w) }),
    ...(h && { height: resolveSpacing(h) }),
    ...(mr && { marginRight: resolveSpacing(mr) }),
    ...(ml && { marginLeft: resolveSpacing(ml) }),
    ...(mt && { marginTop: resolveSpacing(mt) }),
    ...(mb && { marginBottom: resolveSpacing(mb) }),
    ...(p && { padding: resolveSpacing(p) }),
    ...(m && { margin: resolveSpacing(m) }),
  };
  return <div style={inlineStyle} {...rest}>{children}</div>;
}
export default Block;
