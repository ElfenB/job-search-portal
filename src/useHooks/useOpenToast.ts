import { useContext } from 'react';
import type { OpenToastArgs } from '../components/ToastBarContext';
import { ToastContext } from '../components/ToastBarContext';

export function useToast(): (options: OpenToastArgs) => void {
  return useContext(ToastContext).openToast;
}
