type Props = {
  children?: JSX.Element | JSX.Element[];
};

export function OfferDetailsSection({ children }: Props) {
  return <div className="ion-padding">{children}</div>;
}
