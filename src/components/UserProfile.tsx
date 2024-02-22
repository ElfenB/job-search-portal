import { IonAvatar } from "@ionic/react";
import { useMemo } from "react";

type Props = {
  img?: string;
  username?: string;
};

export function UserProfile({ img, username }: Props) {
  const userImage = useMemo(
    () => (!img || img.length === 0 ? "https://ionicframework.com/docs/img/demos/avatar.svg" : img),
    [img],
  );

  return (
    <IonAvatar>
      <img src={userImage} alt={username ?? "your picture"} />
    </IonAvatar>
  );
}
