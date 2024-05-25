import { useMemo } from "react";
import { IonAvatar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { trpc } from "../api/trpc";
import { fallbackUserImage } from "./ChatList.consts";

type Props = {
  userId: string;
};

export function UserAvatar({ userId }: Props) {
  const { t } = useTranslation();

  const { data: person } = trpc.user.byId.useQuery(userId);

  const img = useMemo(() => {
    if (!person) {
      return fallbackUserImage;
    }
    return person.picture;
  }, [person]);

  return (
    <IonAvatar style={{ position: "absolute", right: "1rem", top: "1rem" }}>
      <img alt={person?.name ?? t("label.avatarPlaceholder")} src={img} />
    </IonAvatar>
  );
}
