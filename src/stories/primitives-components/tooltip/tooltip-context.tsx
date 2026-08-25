import React, { createContext } from 'react';

export interface TooltipContextValue {
  open: boolean;
  trigger: HTMLElement | null;
  setTrigger: (element: HTMLElement | null) => void;
  setOpen: (open: boolean) => void;

  setShowToast: (show: boolean) => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

export default TooltipContext;

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip Context  is not provided');
  }

  return context;
};
