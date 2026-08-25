export const utils = {};
export function formatValue(v: any) { return v; }

export function combineRefs(...refs: any[]) { return (node: any) => { refs.forEach(ref => { if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }); }; }
