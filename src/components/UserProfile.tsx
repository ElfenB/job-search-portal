import { User, useAuth0 } from "@auth0/auth0-react";
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { useMemo } from "react";

export function UserProfile() {
  const { isLoading, user } = useAuth0();

  // If the SDK is not ready, or a user is not authenticated, exit.
  if (isLoading || !user) return null;

  const userImage = useMemo(
    () =>
      !user.picture || user.picture.length === 0
        ? "https://ionicframework.com/docs/img/demos/avatar.svg"
        : user.picture,
    [user.picture],
  );

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{user.name}</IonCardTitle>

        <IonCardSubtitle>{user.email}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonAvatar style={{ height: "8rem", width: "8rem", margin: "0 auto" }}>
          <img src={userImage} alt={user.name ?? "your picture"} />
        </IonAvatar>

        <IonList lines="full">
          <IonListHeader>Your Details</IonListHeader>

          {Object.keys(user).map((d: keyof User) => {
            // Don't show the picture, name, or email in the list.
            if (d === "picture" || d === "name" || d === "email") {
              return null;
            }

            return (
              <IonItem key={d}>
                <IonLabel>
                  {d}: {user[d]}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}
