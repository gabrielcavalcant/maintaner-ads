# Mainteiner - Sistema de Gerenciamento de Manutenção

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-blue)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.1-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.7-blue)
![React Query](https://img.shields.io/badge/React%20Query-5.51.21-blue)
![Zod](https://img.shields.io/badge/Zod-3.23.8-blue)
![ESLint](https://img.shields.io/badge/ESLint-8.57.0-blue)
![Prettier](https://img.shields.io/badge/Prettier-2.8.7-blue)
![SonarQube](https://img.shields.io/badge/SonarQube-9.9-blue)

Este repositório contém o código-fonte do sistema de gerenciamento de manutenção desenvolvido para a empresa Mainteiner. O sistema foi projetado para melhorar a eficiência, organização e comunicação entre as equipes de manutenção e outros departamentos, visando aumentar a produtividade e a segurança.

## Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Casos de Uso](#casos-de-uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Visão Geral

A empresa Mainteiner é uma grande indústria que fabrica peças automotivas e enfrenta desafios significativos no gerenciamento da manutenção de seu parque de máquinas diversificado. Este sistema foi desenvolvido para digitalizar e centralizar todas as operações de manutenção, desde o cadastro de máquinas até o gerenciamento de equipes, estoque de peças e monitoramento das solicitações de manutenção.

### Objetivos

- **Centralizar as Informações:** Consolidar dados de máquinas, manutenções e peças em uma plataforma única.
- **Melhorar a Comunicação:** Facilitar a interação entre as equipes de manutenção e outros departamentos.
- **Aumentar a Produtividade:** Reduzir o tempo de inatividade das máquinas e otimizar os processos de manutenção.

## Instalação

### Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Banco de dados (MongoDB, PostgreSQL, etc.)

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/mainteiner.git
   cd mainteiner
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

   ```env
  NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3333/api
   ```

4. Execute a aplicação em ambiente de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse `http://localhost:3000` no seu navegador.

## Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/):** Framework React para desenvolvimento de aplicações web.
- **[React.js](https://reactjs.org/):** Biblioteca JavaScript para construção de interfaces de usuário.
- **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utilitário para estilização rápida e eficiente.
- **[Prisma](https://www.prisma.io/):** ORM para interação com bancos de dados.
- **[TypeScript](https://www.typescriptlang.org/):** Superconjunto de JavaScript que adiciona tipagem estática ao código.

## Funcionalidades Principais

### Gerenciamento de Máquinas

- Cadastro, edição e exclusão de máquinas com detalhes completos.
- Histórico de manutenção associado a cada máquina.
- Filtros e pesquisa para rápida localização de máquinas.

### Gerenciamento de Manutenções

- Criação, atualização e acompanhamento de solicitações de manutenção.
- Atribuição de equipes e registro de materiais utilizados.
- Geração de relatórios por máquina, período e tipo de manutenção.

### Controle de Estoque de Peças

- Cadastro de peças de reposição com controle de entrada e saída.
- Visualização do estoque em tempo real.
- Geração de relatórios de inventário.

### Gerenciamento de Equipes

- Cadastro e gerenciamento de equipes de manutenção.
- Atribuição de tarefas com base em especialidades e disponibilidade.

### Autenticação e Autorização

- Sistema de controle de acesso baseado em funções (RBAC).
- Autenticação multifator (MFA) para maior segurança.

## Casos de Uso

1. **Cadastro de Máquinas:** O supervisor de manutenção cadastra novas máquinas e atualiza seus detalhes conforme necessário.
2. **Atribuição de Solicitações:** O gerente de manutenção atribui solicitações a equipes específicas.
3. **Registro de Peças:** Um membro da equipe de manutenção registra a entrada de peças no estoque.
4. **Atualização de Status:** O líder de manutenção atualiza o status das manutenções em andamento e conclui as tarefas.

## Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch com sua funcionalidade ou correção de bug:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça commit de suas mudanças:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o repositório original:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
