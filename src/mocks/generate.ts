import { faker } from "@faker-js/faker";

export // Função para gerar múltiplos mocks baseados em um mock pré-definido
function generateMocks<T>(mock: T, count: number): T[] {
  return Array.from({ length: count }, () => {
    return {
      ...mock,
      id: faker.number.int(), // Ajuste para gerar IDs únicos
    };
  });
}
