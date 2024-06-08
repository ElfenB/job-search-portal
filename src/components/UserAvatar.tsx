import type { CSSProperties } from "react";
import { useMemo } from "react";
import { IonAvatar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { trpc } from "../api/trpc";
import { fallbackUserImage } from "./ChatList.consts";

type Props = {
  style?: CSSProperties;
  userId: string;
};

export function UserAvatar({ style, userId }: Props) {
  const { t } = useTranslation();

  const { data: person } = trpc.user.byId.useQuery(userId);

  const img = useMemo(() => {
    if (!person || person.picture.length === 0) {
      return fallbackUserImage;
    }
    return person.picture;
  }, [person]);

  const name = useMemo(() => person?.name ?? t("label.avatarPlaceholder"), [person, t]);

  return (
    <IonAvatar style={style}>
      <img alt={name} src={img} />
    </IonAvatar>
  );
}
