export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function convertEmailToName(email: string): string {
  // Extrair o nome de usuário do e-mail
  const username = email.split('@')[0]; // 'jonathan.bergamo'

  // Separar o nome e sobrenome e capitalizar
  const items = username.split('.');
  const capitalizedItems = items.map(item => capitalizeFirstLetter(item));

  // Juntar o nome e sobrenome
  const fullName = capitalizedItems.join(' ');

  return fullName;
}