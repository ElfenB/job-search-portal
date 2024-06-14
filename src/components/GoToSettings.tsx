import { IonIcon, IonRouterLink } from '@ionic/react';
import { cog } from 'ionicons/icons';

export function GoToSettings() {
  return (
    <IonRouterLink
      routerDirection="forward"
      routerLink="/personal/settings"
      slot="end"
      style={{ margin: 'auto 0.5rem auto 0' }}
    >
      <IonIcon aria-hidden="true" icon={cog} style={{ fontSize: '2rem' }} />
    </IonRouterLink>
  );
}
