import type { CSSProperties } from 'react';
import { useState } from 'react';
import { IonText } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { trpc } from '../api/trpc';
import { UserAvatar } from './UserAvatar';
import { UserProfileModal } from './UserProfileModal';

type Props = {
  style?: CSSProperties;
  userId: string;
};

export function UserAvatarWithText({ style, userId }: Props) {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: person } = trpc.user.byId.useQuery(userId);

  return (
    <>
      <div
        role="button"
        style={{ display: 'flex', ...style, alignItems: 'center', ...style }}
        tabIndex={0}
        onClick={() => {
          setIsModalOpen(true);
        }}
        onKeyDown={() => {
          setIsModalOpen(true);
        }}
      >
        <UserAvatar userId={userId} />

        <div style={{ marginLeft: '0.5rem' }}>
          <IonText color="secondary">
            <span style={{ display: 'block' }}>{person?.name ?? t('label.avatarPlaceholder')}</span>
          </IonText>

          <IonText color="medium">
            <span style={{ display: 'block' }}>{person?.email}</span>
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
