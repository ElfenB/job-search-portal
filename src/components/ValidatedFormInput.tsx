import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { IonInput } from "@ionic/react";
import { useTranslation } from "react-i18next";
import type { Validator } from "./CreateOfferForm.utils";
import { isValidFormInput } from "./CreateOfferForm.utils";

type Props = {
  children?: JSX.Element;
  label: string;
  maxLength?: number;
  name: string;
  onChange: (name: string, value: string, isValid: boolean) => void;
  style?: CSSProperties;
  type:
    | "date"
    | "datetime-local"
    | "email"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  validators: Validator[];
};

export function ValidatedFormInput({ children, label, maxLength, name, onChange, style, type, validators }: Props) {
  const { t } = useTranslation();

  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  // Only used to calculate if counter should be shown
  const [inputValue, setInputValue] = useState<string>("");

  const validate = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);

    setIsValid(undefined);

    const isValidInput = isValidFormInput(value, validators);
    setIsValid(isValidInput);
  };

  // Update parent component with new value and validation status
  useEffect(() => {
    onChange(name, inputValue, isValid ?? true);
  }, [inputValue, isValid, name, onChange]);

  return (
    <IonInput
      className={`${isValid && "ion-valid"} ${isValid === false && "ion-invalid"} ${isTouched && "ion-touched"}`}
      counter={maxLength !== undefined && inputValue.length > maxLength * 0.8} // only show counter if 80% of maxLength is reached
      errorText={t("label.formValidationError")}
      fill="solid"
      label={label}
      labelPlacement="floating"
      maxlength={maxLength}
      style={style}
      type={type}
      onIonBlur={() => {
        setIsTouched(true);
      }}
      onIonInput={(event) => {
        validate(event);
      }}
    >
      {children}
    </IonInput>
  );
}
