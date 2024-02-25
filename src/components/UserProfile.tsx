import { useAuth0 } from "@auth0/auth0-react";
import { IonAvatar } from "@ionic/react";
import { useMemo } from "react";

export function UserProfile() {
  const { user, isLoading } = useAuth0();

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
    <IonAvatar>
      <img src={userImage} alt={user.name ?? "your picture"} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </IonAvatar>
  );
}
