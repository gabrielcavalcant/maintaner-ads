export function formatToBRL(value: string | number): string {
  const stringValue =
    typeof value === "number" ? value.toFixed(2).toString() : value;
    
  // Remove todos os caracteres que não são dígitos
  const numericValue = stringValue?.replace(/[^\d]/g, "") || "";

  // Adiciona zeros à esquerda se necessário para ter pelo menos 3 dígitos
  const paddedValue = numericValue.padStart(3, "0");

  // Separa a parte inteira da parte decimal
  const integerPart = paddedValue.slice(0, -2);
  const decimalPart = paddedValue.slice(-2);

  // Converte a parte inteira em um número com formatação de milhar
  const formattedIntegerPart = parseInt(integerPart, 10).toLocaleString(
    "pt-BR"
  );

  // Constrói o valor formatado
  const formattedValue = `R$ ${formattedIntegerPart},${decimalPart}`;

  return formattedValue;
}
