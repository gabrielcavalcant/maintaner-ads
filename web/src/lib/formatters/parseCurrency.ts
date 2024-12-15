export const parseCurrency = (value: unknown): number | undefined => {
  if (typeof value === "string") {
    // Remove caracteres não numéricos e substitui vírgula por ponto
    const numericValue = value.replace(/[^\d,.-]/g, "").replace(/,/g, ".");
    const parsedValue = parseFloat(numericValue);
    if (!isNaN(parsedValue)) {
      return parsedValue;
    }
  }
  return undefined;
};
