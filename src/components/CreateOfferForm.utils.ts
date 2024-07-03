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
  hasMaxTwoDecimals: (value: number) => {
    const [, decimalsDot] = value.toString().split('.');
    const [, decimalsComma] = value.toString().split(',');
    if (!decimalsDot && !decimalsComma) {
      return true;
    }
    return decimalsDot ? decimalsDot.length <= 2 : decimalsComma.length <= 2;
  },
  isNonEmptyString: (value: string) => typeof value === 'string' && value.trim().length > 0,
  isNumber: (value: number) => !isNaN(value),
  isPositiveNumber: (value: number) => !isNaN(value) && value > 0
};

type ValidatorLib = typeof validatorLib;
export type Validator = keyof ValidatorLib;
type ValidatorFn = (value: number | string) => boolean;
