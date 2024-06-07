import type { CSSProperties } from 'react';
import { IonIcon, IonText } from '@ionic/react';

type Props = {
  children?: null | string;
  icon: string;
  style?: CSSProperties;
};

export function InfoItem({ children, icon, style }: Props) {
  if (!children || children.length === 0) {
    return null;
  }

  return (
    <IonText color="medium" style={{ alignItems: 'center', display: 'flex', ...style }}>
      <IonIcon icon={icon} />
      <span style={{ marginLeft: '4px' }}>{children}</span>
    </IonText>
  );
}
