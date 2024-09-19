export function formatDate(input: string) {
  // Remover todos os caracteres não numéricos
  const cleaned = input.replace(/\D/g, "");

  // Limitar o comprimento máximo para 8 caracteres (DDMMYYYY)
  const limited = cleaned.slice(0, 8);

  // Formatar conforme o usuário digita
  let formatted = limited;

  if (limited.length > 2) {
    formatted = `${limited.slice(0, 2)}/${limited.slice(2)}`;
  }
  if (limited.length > 4) {
    formatted = `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(
      4,
      8
    )}`;
  }

  return formatted;
}
