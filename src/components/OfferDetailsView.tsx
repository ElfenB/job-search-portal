import { useCallback, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { Offer } from "@prisma/client";
import { calendarOutline, eye, locationOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import { DangerZone } from "./DangerZone";
import { Divider } from "./Divider";
import { InfoItem } from "./InfoItem";
import { OfferDetailsSection } from "./OfferDetailsSection";
import { UserAvatar } from "./UserAvatar";
import { MoneyDisplay } from "./MoneyDisplay";

type Props = {
  offer: Offer;
  onDelete: () => void;
};

export function OfferDetailsView({ offer, onDelete }: Props) {
  const { t } = useTranslation();
  const { user } = useAuth0();

  const { authorId, createdAt, currency, description, image, location, money, offerType, paymentType, title, views } =
    offer;

  const [imageHeight, setImageHeight] = useState<"25vh" | undefined>("25vh");

  const toggleImageHeight = useCallback(() => {
    setImageHeight(imageHeight === "25vh" ? undefined : "25vh");
  }, [imageHeight, setImageHeight]);

  return (
    <>
      {image && (
        <div role="button" tabIndex={0} onClick={toggleImageHeight} onKeyDown={toggleImageHeight}>
          <img alt={title} src={image} style={{ height: imageHeight, objectFit: "cover", width: "100%" }} />
        </div>
      )}

      <OfferDetailsSection>
        <h2>
          {title} {`(${t(offerType)})`}
        </h2>

        <MoneyDisplay money={money} currency={currency} paymentType={paymentType} />

        <InfoItem icon={locationOutline}>{location}</InfoItem>
        <div style={{ display: "flex", marginTop: "1rem" }}>
          <InfoItem icon={calendarOutline}>{createdAt.toLocaleDateString()}</InfoItem>
          <InfoItem icon={eye} style={{ marginLeft: "1rem" }}>
            {String(views)}
          </InfoItem>
        </div>
      </OfferDetailsSection>

      <Divider />

      <OfferDetailsSection>
        {title === "" ? (
          <></>
        ) : (
          <div>
            <h3>{t("label.offerdetails")}</h3>
            <p>{description}</p>
          </div>
        )}
      </OfferDetailsSection>

      <Divider />

      <OfferDetailsSection>
        <UserAvatar userId={authorId} withName />
      </OfferDetailsSection>

      {user?.sub === authorId && (
        <>
          <Divider />
          <DangerZone offerType={offerType} onDelete={onDelete} />
        </>
      )}
    </>
  );
}
