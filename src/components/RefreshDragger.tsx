import { IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";

type Props = {
  onRefresh: (event: CustomEvent<RefresherEventDetail>) => void;
};

export function RefreshDragger({ onRefresh }: Props) {
  return (
    <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
      <IonRefresherContent />
    </IonRefresher>
  );
}
