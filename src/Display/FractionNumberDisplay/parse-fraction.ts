export type Fraction = {
  denominator: number | null;
  numerator: number | null;
  raw: string | null;
};

export const separator = '/';

export function parseFraction(value: string | null) {
  if (!value)
    return {
      denominator: null,
      numerator: null,
      raw: value,
    };
  const [numerator, denominator]: string[] = value.split(separator);
  const [intNumerator, intDenominator]: [number, number] = [
    parseInt(numerator, 10),
    parseInt(denominator, 10),
  ];
  return {
    denominator: intDenominator,
    isValidFraction: Number.isNaN(intDenominator) || Number.isNaN(intNumerator),
    numerator: intNumerator,
    raw: value,
  };
}
