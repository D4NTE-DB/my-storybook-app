import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export function Popper({ strategy, side = 'bottom', align = 'center', sideOffset = 0, alignOffset = 0, padding = 0, reference, shift, flip, hide, returnFocus, ariaLabel, className, children, ...rest }: any) {
  const popperRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!reference?.current || !popperRef.current) return;
    
    const updatePosition = () => {
      const refRect = reference.current.getBoundingClientRect();
      const popRect = popperRef.current!.getBoundingClientRect();
      
      let top = 0;
      let left = 0;
      
      if (side === 'top') {
        top = refRect.top - popRect.height - sideOffset;
        left = refRect.left + (refRect.width / 2) - (popRect.width / 2);
      } else if (side === 'bottom') {
        top = refRect.bottom + sideOffset;
        left = refRect.left + (refRect.width / 2) - (popRect.width / 2);
      } else if (side === 'left') {
        top = refRect.top + (refRect.height / 2) - (popRect.height / 2);
        left = refRect.left - popRect.width - sideOffset;
      } else if (side === 'right') {
        top = refRect.top + (refRect.height / 2) - (popRect.height / 2);
        left = refRect.right + sideOffset;
      }

      setCoords({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [reference, side, sideOffset]);

  const content = (
    <div ref={popperRef} className={className} style={{ position: 'fixed', top: coords.top, left: coords.left, zIndex: 9999 }} {...rest}>
      {children}
    </div>
  );
  
  return createPortal(content, document.body);
}

export const PopperArrow = (props: any) => <div {...props} />;
export type PopperSide = any;
export type PopperAlign = any;
export default Popper;
