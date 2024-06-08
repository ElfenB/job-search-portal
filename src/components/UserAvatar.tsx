import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { IonAvatar, IonText } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { trpc } from "../api/trpc";
import { fallbackUserImage } from "./ChatList.consts";
import { UserProfileModal } from "./UserProfileModal";

type Props = {
  style?: CSSProperties;
  userId: string;
  withName?: boolean;
};

export function UserAvatar({ style, userId, withName = false }: Props) {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: person } = trpc.user.byId.useQuery(userId);

  const img = useMemo(() => {
    if (!person || person.picture.length === 0) {
      return fallbackUserImage;
    }
    return person.picture;
  }, [person]);

  const name = useMemo(() => person?.name ?? t("label.avatarPlaceholder"), [person, t]);

  if (withName) {
    return (
      <>
        <div
          role="button"
          style={{ display: "flex", ...style, alignItems: "center" }}
          tabIndex={0}
          onClick={() => {
            setIsModalOpen(true);
          }}
          onKeyDown={() => {
            setIsModalOpen(true);
          }}
        >
          <IonAvatar>
            <img alt={name} src={img} />
          </IonAvatar>

          <div style={{ marginLeft: "0.5rem" }}>
            <IonText color="secondary">
              <span style={{ display: "block" }}>{name}</span>
            </IonText>

            <IonText color="medium">
              <span style={{ display: "block" }}>{person?.email}</span>
            </IonText>
          </div>
        </div>

        <UserProfileModal
          id={userId}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      </>
    );
  }

  return (
    <IonAvatar style={style}>
      <img alt={name} src={img} />
    </IonAvatar>
  );
}
