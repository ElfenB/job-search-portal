import { useContext } from "react";
import { IonToast } from "@ionic/react";
import { ToastContext } from "./ToastBarContext";

export function ToastBar() {
  const { closeToast, color, duration, isToastOpen, message } = useContext(ToastContext);

  return (
    <IonToast color={color} duration={duration} isOpen={isToastOpen} message={message} onDidDismiss={closeToast} />
  );
}
