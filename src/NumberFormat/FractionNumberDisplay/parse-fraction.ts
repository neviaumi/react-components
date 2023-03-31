export type Fraction = {
  denominator: number | null;
  numerator: number | null;
  raw: string | null;
};

export function parseFraction(value: string | null) {
  if (!value)
    return {
      denominator: null,
      numerator: null,
      raw: value,
    };
  const [numerator, denominator]: string[] = value.split('/');
  const [intNumerator, intDenominator]: [number, number] = [
    parseInt(numerator, 10),
    parseInt(denominator, 10),
  ];
  return {
    denominator: Number.isNaN(intDenominator) ? null : intDenominator,
    numerator: Number.isNaN(intNumerator) ? null : intNumerator,
    raw: value,
  };
}
