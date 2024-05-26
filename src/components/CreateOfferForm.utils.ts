export function isValidFormInput(value: number | string, validators: Validator[]): boolean | undefined {
  // No validators, no validation
  if (validators.length === 0) {
    return undefined;
  }

  return validators.every((validator) => {
    const validatorFn = validatorLib[validator] as ValidatorFn;
    return validatorFn(value);
  });
}

const validatorLib = {
  isNonEmptyString: (value: string) => typeof value === "string" && value.trim().length > 0,
  isNumber: (value: number) => !isNaN(value),
  isPositiveNumber: (value: number) => !isNaN(value) && value > 0,
};

type ValidatorLib = typeof validatorLib;
export type Validator = keyof ValidatorLib;
type ValidatorFn = (value: number | string) => boolean;
