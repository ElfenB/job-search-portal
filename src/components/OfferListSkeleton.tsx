import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSkeletonText,
} from "@ionic/react";

export function OfferListSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

function SkeletonCard() {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <IonSkeletonText animated style={{ height: "2rem", width: "80%" }} />
        </IonCardTitle>
        <IonCardSubtitle>
          <IonSkeletonText animated style={{ height: "1rem", width: "80%" }} />
        </IonCardSubtitle>

        <IonAvatar style={{ position: "absolute", right: "1rem", top: "1rem" }}>
          <IonSkeletonText animated style={{ height: "2rem", width: "2rem" }} />
        </IonAvatar>
      </IonCardHeader>

      <IonCardContent>
        <IonSkeletonText animated style={{ height: "3rem", width: "100%" }} />
      </IonCardContent>
    </IonCard>
  );
}
