import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import { ChatList } from '../components/ChatList';

export function Chats() {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('label.chats')}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{t('label.chats')}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <ChatList />
      </IonContent>
    </IonPage>
  );
}
