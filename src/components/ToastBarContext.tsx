import { createContext, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const stub = (): never => {
  throw new Error("You forgot to wrap your component in <ToastProvider>.");
};

export type OpenToastArgs = { color?: string; duration?: number; message?: string };

type ToastContextType = {
  closeToast: () => void;
  color?: string;
  duration: number;
  isToastOpen: boolean;
  message: string;
  openToast: (options: OpenToastArgs) => void;
};

const initialContext: ToastContextType = {
  closeToast: stub,
  color: undefined,
  duration: 5000,
  isToastOpen: false,
  message: "",
  openToast: stub,
};

export const ToastContext = createContext(initialContext);

export function ToastProvider({ children }: { children: JSX.Element }) {
  const { t } = useTranslation();

  const [isToastOpen, setIsToastOpen] = useState(initialContext.isToastOpen);
  const [message, setMessage] = useState(initialContext.message);
  const [color, setColor] = useState(initialContext.color);
  const [duration, setDuration] = useState(initialContext.duration);

  const openToast = useCallback(
    // Fallback to default values if not provided
    ({ color = initialContext.color, duration = initialContext.duration, message = "" }: OpenToastArgs) => {
      setMessage(message || t("label.error"));
      setColor(color);
      setDuration(duration);

      setIsToastOpen(true);
    },
    [setMessage, setColor, setDuration, setIsToastOpen, t],
  );

  const closeToast = useCallback(() => {
    setIsToastOpen(false);
  }, [setIsToastOpen]);

  const contextValue = useMemo<ToastContextType>(
    () => ({ closeToast, color, duration, isToastOpen, message, openToast }),
    [closeToast, color, duration, isToastOpen, message, openToast],
  );

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
}
