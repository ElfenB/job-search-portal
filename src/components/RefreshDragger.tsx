import type { RefresherEventDetail } from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";

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
