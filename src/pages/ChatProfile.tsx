import type { User } from '@auth0/auth0-react';
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { fallbackUserImage } from '../components/ChatList.consts';

export function ChatProfile() {
  const { id: recipientId } = useParams<{ id: string }>();

  // TODO: Fetch user from API
  const recipient: User = {
    id: recipientId,
    name: 'Johnny Test',
    picture: undefined,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton />
          </IonButtons>

          <IonTitle>{recipient.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <img alt={recipient.name} src={recipient.picture ?? fallbackUserImage} />

        <h1>{recipient.name}</h1>
      </IonContent>
    </IonPage>
  );
}
