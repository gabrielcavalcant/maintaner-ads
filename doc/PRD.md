# PRD - Product Requirements Document

# Introdução & objetivo

A empresa Mainteiner é uma indústria de grande porte que fabrica peças automotivas e possui um parque de máquinas diversificado e complexo. A manutenção preventiva e corretiva das máquinas é essencial para garantir a produtividade contínua e a segurança dos colaboradores. No entanto, o sistema atual de gerenciamento de manutenção é manual, o que gera diversos problemas, incluindo falta de organização, comunicação ineficiente e perda de tempo e produtividade.

# Por que implementar isto?

**Motivação Pessoal e Visão:**

A motivação para desenvolver esta aplicação de Gerenciamento de Manutenção surgiu das dificuldades enfrentadas diariamente pelos gestores e equipes de manutenção da Mainteiner. A visão é criar uma solução que transforme radicalmente a maneira como a manutenção é gerenciada, otimizando processos, melhorando a comunicação e aumentando a produtividade. A nova aplicação visa:

- **Centralizar as Informações:** Proporcionar uma plataforma única onde todas as informações sobre máquinas, manutenções e peças estejam acessíveis de maneira rápida e organizada.
- **Melhorar a Comunicação:** Facilitar a comunicação entre as equipes de manutenção e outros departamentos, garantindo que todos estejam informados sobre o progresso e as necessidades de manutenção.
- **Aumentar a Produtividade:** Minimizar o tempo de inatividade das máquinas e reduzir os atrasos na produção, fornecendo dados precisos e em tempo real para a tomada de decisões rápidas e eficientes.

---

# Público alvo

| Perfil de usuário             | Descrição, necessidades e interesses                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supervisores de Manutenção    | **Descrição:** São os principais responsáveis pelo gerenciamento de manutenção dentro da empresa. <br> **Necessidades:** Necessitam de acesso total para manipular equipes, manutenções, ambientes e membros. Precisam de ferramentas para monitorar o status das manutenções e gerar relatórios detalhados. <br> **Interesses:** Melhorar a eficiência dos processos de manutenção e garantir a segurança e produtividade das operações. |
| Gerentes de Manutenção        | **Descrição:** Responsáveis pela coordenação das equipes de manutenção e pela atribuição das tarefas. <br> **Necessidades:** Necessitam manipular equipes, atribuir manutenções e cadastrar peças. Precisam de uma visão clara das manutenções pendentes e em andamento. <br> **Interesses:** Assegurar que todas as tarefas de manutenção sejam atribuídas corretamente e que as peças necessárias estejam disponíveis.                  |
| Líderes de Manutenção         | **Descrição:** Líderes de equipe que supervisionam a execução das tarefas de manutenção. <br> **Necessidades:** Precisam cadastrar manutenções e concluir as tarefas atribuídas a suas equipes. Necessitam de uma interface que permita a fácil comunicação com os membros do time. <br> **Interesses:** Garantir que as tarefas sejam concluídas dentro dos prazos e com a qualidade esperada.                                           |
| Membros do Time de Manutenção | **Descrição:** Técnicos e operários que executam as manutenções. <br> **Necessidades:** Precisam cadastrar peças, concluir manutenções (quando responsáveis) e reportar o status das tarefas. Necessitam de uma interface intuitiva e de fácil acesso para registrar seu trabalho. <br> **Interesses:** Realizar as tarefas de manutenção de maneira eficiente e com os recursos adequados.                                               |
| Gerente de Produção	 | **Descrição:** Responsável por garantir que a produção não seja interrompida por falhas de manutenção. <br> **Necessidades:** Necessita de informações atualizadas sobre o status das manutenções, capacidade de solicitar manutenções emergenciais e monitorar o impacto das manutenções na produção.  <br> **Interesses:** Minimizar o tempo de inatividade das máquinas, melhorar a comunicação com a equipe de manutenção e ajustar os planos de produção conforme necessário.                                              |

# Personas

### Persona 1: Roberto Almeida

- **Ocupação:** Supervisor de Manutenção
- **Objetivos:**
  - Melhorar a eficiência dos processos de manutenção.
  - Garantir a segurança e produtividade das operações.
  - Ter uma visão clara e atualizada de todas as atividades de manutenção.
- **Frustrações:**
  - Dificuldade em monitorar o status das manutenções em tempo real.
  - Falta de ferramentas adequadas para gerar relatórios detalhados.
  - Problemas de comunicação entre as equipes e outros departamentos.

### Persona 2: Ana Costa

- **Ocupação:** Gerente de Manutenção
- **Objetivos:**
  - Assegurar que todas as tarefas de manutenção sejam atribuídas corretamente.
  - Garantir que as peças necessárias estejam disponíveis.
  - Melhorar a comunicação e a eficiência das equipes de manutenção.
- **Frustrações:**
  - Visão pouco clara das manutenções pendentes e em andamento.
  - Dificuldade em coordenar e alocar as equipes de manutenção.
  - Falta de uma interface eficiente para cadastrar e monitorar peças de reposição.

### Persona 3: Marcos Santos

- **Ocupação:** Líder de Manutenção
- **Objetivos:**
  - Garantir que as tarefas sejam concluídas dentro dos prazos.
  - Manter a qualidade esperada das manutenções realizadas.
  - Ter uma comunicação eficiente com a equipe e outros departamentos.
- **Frustrações:**
  - Falta de uma interface que permita fácil comunicação com os membros do time.
  - Dificuldade em registrar e atualizar o status das manutenções.
  - Problemas em supervisionar a execução das tarefas devido à falta de visibilidade.

### Persona 4: Lucas Pereira

- **Ocupação:** Membro do Time de Manutenção
- **Objetivos:**
  - Realizar as tarefas de manutenção de maneira eficiente.
  - Garantir que os recursos adequados estejam disponíveis.
  - Minimizar o tempo de inatividade das máquinas.
- **Frustrações:**
  - Falta de uma interface intuitiva e de fácil acesso para registrar seu trabalho.
  - Dificuldade em cadastrar peças e concluir manutenções.
  - Problemas em reportar o status das tarefas de forma simples e rápida.


### Persona: Carlos Ferreira

-   **Ocupação:** Gerente de Produção
-   **Idade:** 50 anos
-   **Objetivos:**
    -   Minimizar o tempo de inatividade das máquinas para manter a produtividade.
    -   Garantir que a produção não seja interrompida por falhas de manutenção.
    -   Manter uma comunicação eficiente com a equipe de manutenção.
-   **Frustrações:**
    -   Interrupções frequentes na produção devido a falhas nas máquinas.
    -   Falta de informações atualizadas sobre o status das manutenções.
    -   Dificuldade em prever e planejar paradas para manutenção preventiva.
---

# Requisitos Funcionais

#### F1: Gerenciamento de Máquinas

**Descrição:**
O sistema deve permitir o cadastro e a visualização detalhada de máquinas, incluindo informações como nome, tipo, modelo, data de fabricação, número de série, localização e histórico de manutenção.

**Critérios de Aceitação:**

- Permitir o cadastro de novas máquinas com todos os campos obrigatórios.
- Permitir a edição e exclusão de registros de máquinas.
- Exibir uma lista de máquinas cadastradas com opções de filtragem e pesquisa.
- Exibir uma página de detalhes de cada máquina, incluindo seu histórico de manutenção.

**Prioridade:** P1

#### F2: Gerenciamento de Manutenções

**Descrição:**
O sistema deve permitir o cadastro, atualização e acompanhamento das solicitações de manutenção, incluindo informações como descrição do problema, data da solicitação, prioridade, responsável e status da manutenção.

**Critérios de Aceitação:**

- Permitir o cadastro de novas solicitações de manutenção.
- Permitir a atualização do status da manutenção (pendente, em andamento, concluída, cancelada).
- Adicionar comentários e arquivos relacionados à manutenção.
- Atribuir equipes de manutenção às solicitações.
- Registrar as peças e materiais utilizados durante a manutenção.
- Gerar relatórios de manutenção por máquina, período e tipo de manutenção.

**Prioridade:** P1

#### F3: Controle de Estoque de Peças

**Descrição:**
O sistema deve permitir o gerenciamento de peças de reposição, incluindo o cadastro, visualização e controle de entrada e saída de peças no estoque.

**Critérios de Aceitação:**

- Permitir o cadastro de peças de reposição com informações como nome, código, fornecedor, quantidade em estoque e valor unitário.
- Registrar a entrada e saída de peças com data e quantidade.
- Exibir o estoque de peças em tempo real com opções de filtragem e pesquisa.
- Gerar relatórios de estoque.

**Prioridade:** P2

#### F4: Gerenciamento de Equipes

**Descrição:**
O sistema deve permitir o gerenciamento de equipes de manutenção, incluindo o cadastro de colaboradores, suas especialidades e a atribuição de equipes às solicitações de manutenção.

**Critérios de Aceitação:**

- Permitir o cadastro de equipes de manutenção com informações dos colaboradores.
- Atribuir equipes às solicitações de manutenção.
- Gerenciar a disponibilidade dos colaboradores.

**Prioridade:** P2

#### F5: Autenticação e Autorização

**Descrição:**
O sistema deve permitir a criação de contas de usuário com diferentes níveis de acesso (administrador, técnico, etc.) e controlar os acessos a diferentes funcionalidades da aplicação web.

**Critérios de Aceitação:**

- Permitir a criação e gestão de contas de usuário.
- Implementar controle de acesso baseado em funções (RBAC).
- Implementar autenticação multifator (MFA) para maior segurança.

**Prioridade:** P1

### Casos de Uso

> **Caso de uso 1: Cadastro de Máquinas**
>
> **Usuário:** Roberto Almeida (Supervisor de Manutenção)
>
> **Descrição:** Roberto acessa a aplicação, navega até a seção de cadastro de máquinas e preenche o formulário com as informações necessárias. Após o envio, a máquina é cadastrada no sistema e pode ser visualizada na lista de máquinas. Ao perceber um erro de digitação Roberto busca a máquina criada de forma rapida com filtros de busca e realiza a

> **Caso de uso 2: Atribuição de Solicitações de Manutenção**
>
> **Usuário:** Ana Costa (Gerente de Manutenção)
>
> **Descrição:** O gerente de manutenção recebe uma nova solicitação de manutenção e a atribui a uma equipe específica. A equipe é notificada sobre a nova tarefa e começa a trabalhar na resolução do problema.

> **Caso de uso 3: Registro de Entrada de Peças**
>
> **Usuário:** Lucas Pereira (Membro do Time de Manutenção)
>
> **Descrição:** Um membro do time de manutenção registra a entrada de novas peças no estoque, especificando a quantidade e a data de recebimento. As informações são atualizadas no sistema e refletidas no inventário em tempo real.


> **Caso de Uso 4: Atualização do Status de Manutenção**
>
> **Usuário:** Marcos Santos (Líder de Manutenção)
>
> **Descrição:** Marcos acessa a aplicação para atualizar o status de uma manutenção em andamento. Ele navega até a seção de manutenções, seleciona a manutenção específica, altera o status para "Concluída" e adiciona comentários detalhados sobre as ações tomadas. A atualização é refletida em tempo real, e os supervisores e gerentes são notificados.

> **Caso de Uso 5: Geração de Relatórios de Manutenção**
>>
> **Usuário:** Roberto Almeida (Supervisor de Manutenção)
>
> **Descrição:** Roberto precisa gerar um relatório detalhado das manutenções realizadas no último mês. Ele acessa a seção de relatórios, seleciona os filtros desejados (período, tipo de manutenção, etc.) e gera o relatório. O sistema fornece um documento detalhado que pode ser exportado e compartilhado com a administração.

> **Caso de Uso 6: Cadastro de Solicitação de Manutenção**
>
> **Usuário:** Ana Costa (Gerente de Manutenção)
>
> **Descrição:** Ana recebe uma notificação sobre um problema em uma máquina. Ela acessa a aplicação, navega até a seção de solicitações de manutenção e preenche o formulário forncendo informações como a descrição do problema, data de solicitação, prioridade e responsável. A solicitação é cadastrada no sistema e notifica a equipe responsável.

> **Caso de Uso 7: Consulta ao Histórico de Manutenção de uma Máquina**
>
> **Usuário:** Lucas Pereira (Membro do Time de Manutenção)
>
> **Descrição:** Lucas precisa consultar o histórico de manutenção de uma máquina específica antes de realizar uma nova manutenção. Ele acessa a aplicação, navega até a lista de máquinas, seleciona a máquina em questão e visualiza todas as manutenções anteriores, incluindo detalhes sobre as peças utilizadas e os problemas corrigidos.

> **Caso de Uso 8: Gerenciamento do Estoque de Peças**
>
> **Usuário:** Ana Costa (Gerente de Manutenção)
>
> **Descrição:** Ana precisa verificar o estoque atual de peças de reposição. Ela acessa a seção de estoque, visualiza a quantidade disponível de cada peça, registra a saída de peças usadas em manutenções recentes e atualiza o sistema com novas entradas. A gestão de estoque é refletida em tempo real, garantindo que todas as peças estejam disponíveis conforme necessário.

> **Caso de Uso 9: Gerenciamento de Equipes de Manutenção**
>
> **Usuário:** Marcos Santos (Líder de Manutenção)
>
> **Descrição:** Marcos é responsável por alocar e gerenciar sua equipe de manutenção. Ele acessa a aplicação, navega até a seção de equipes, visualiza a disponibilidade dos colaboradores e atribui tarefas conforme a especialidade de cada membro. Ele também pode atualizar a disponibilidade dos colaboradores em caso de ausências ou mudanças de turno.

> **Caso de Uso 10: Solicitação de Manutenção Emergencial**
>
> **Usuário:** Carlos Ferreira (Gerente de Produção)
> 
> **Descrição:** Carlos identifica uma falha crítica em uma máquina que está interrompendo a linha de produção. Ele acessa a aplicação, navega até a seção de solicitações de manutenção e preenche o formulário com uma descrição detalhada do problema, marcando a solicitação como de alta prioridade. A equipe de manutenção é imediatamente notificada sobre a emergência e inicia a resolução do problema. Carlos acompanha o progresso em tempo real para garantir que a produção seja retomada o mais rápido possível.

> **Caso de Uso 11: Monitoramento do Status das Manutenções**
>
> **Usuário:** Carlos Ferreira (Gerente de Produção)
> 
> **Descrição:** Carlos precisa acompanhar o status das manutenções programadas e em andamento para garantir que não haverá impacto na produção. Ele acessa a aplicação, navega até a seção de manutenções e visualiza uma lista detalhada com todas as manutenções, incluindo status, responsáveis e datas previstas de conclusão. Carlos pode filtrar as manutenções por prioridade e data para focar nas mais críticas. Ele utiliza essas informações para ajustar os planos de produção e comunicar-se com a equipe de manutenção de forma eficiente.

---

# Requisitos Não Funcionais

### Requisitos Não Funcionais

Os requisitos não funcionais são essenciais para garantir que a aplicação não só funcione como esperado, mas também ofereça uma boa experiência ao usuário e mantenha a segurança e a integridade dos dados. Baseando-se nas boas práticas da engenharia de software e no desempenho esperado pelos requisitos funcionais, aqui estão os requisitos não funcionais para a aplicação de Gerenciamento de Manutenção da Mainteiner:

#### Desempenho

1. **NF1: Tempo de Resposta** (P1)

   - **Descrição:** O sistema deve ter um tempo de resposta inferior a 2 segundos para qualquer operação CRUD (Create, Read, Update, Delete) nas principais entidades (máquinas, manutenções, peças).
   - **Métrica:** Tempo médio de resposta < 2 segundos.

2. **NF2: Escalabilidade** (P1)

   - **Descrição:** O sistema deve ser capaz de escalar horizontalmente para suportar o aumento de carga, tanto em termos de usuários simultâneos quanto de volume de dados.
   - **Métrica:** Capacidade de suportar até 1000 usuários simultâneos sem degradação significativa no desempenho.

3. **NF3: Capacidade de Processamento de Dados** (P2)
   - **Descrição:** O sistema deve ser capaz de processar e armazenar grandes volumes de dados históricos de manutenção sem perda de desempenho.
   - **Métrica:** Suporte a um crescimento de dados de até 1TB por ano sem necessidade de grandes mudanças na infraestrutura.

#### Segurança

1. **NF4: Autenticação e Autorização** (P1)

   - **Descrição:** O sistema deve garantir que apenas usuários autenticados e autorizados possam acessar as funcionalidades de acordo com suas permissões.
   - **Métrica:** Implementação de autenticação multifator (MFA) e controle de acesso baseado em funções (RBAC).

2. **NF5: Proteção de Dados** (P1)

   - **Descrição:** Todos os dados sensíveis devem ser armazenados e transmitidos de forma criptografada.
   - **Métrica:** Uso de TLS 1.2 ou superior para transmissão de dados e AES-256 para armazenamento de dados sensíveis.

3. **NF6: Logs de Auditoria** (P2)
   - **Descrição:** O sistema deve manter logs detalhados de todas as operações críticas realizadas pelos usuários para fins de auditoria e monitoramento.
   - **Métrica:** Logs armazenados por um período mínimo de 1 ano, com capacidade de busca eficiente.

#### Usabilidade

1. **NF7: Interface Intuitiva** (P1)

   - **Descrição:** O sistema deve possuir uma interface de usuário intuitiva e fácil de usar, minimizando a necessidade de treinamento extensivo.
   - **Métrica:** Satisfação do usuário medida por pesquisas, com um índice de satisfação superior a 85%.

2. **NF8: Acessibilidade** (P2)
   - **Descrição:** O sistema deve ser acessível a usuários com deficiência, seguindo as diretrizes WCAG 2.1.
   - **Métrica:** Conformidade com WCAG 2.1 nível AA.

#### Confiabilidade

1. **NF9: Disponibilidade** (P1)

   - **Descrição:** O sistema deve estar disponível e operacional pelo menos 99,9% do tempo durante o horário comercial.
   - **Métrica:** Tempo de inatividade máximo de 8,76 horas por ano.

2. **NF10: Tolerância a Falhas** (P2)
   - **Descrição:** O sistema deve ser capaz de se recuperar rapidamente de falhas de hardware ou software.
   - **Métrica:** Tempo de recuperação (RTO) inferior a 1 hora e perda de dados (RPO) inferior a 15 minutos.

#### Manutenibilidade

1. **NF11: Modularidade** (P1)

   - **Descrição:** O sistema deve ser desenvolvido de forma modular, facilitando a manutenção e a evolução futura.
   - **Métrica:** Código modular com alta coesão e baixo acoplamento, medido por métricas de qualidade de código (e.g., SonarQube).

2. **NF12: Documentação** (P2)
   - **Descrição:** O sistema deve ter uma documentação clara e abrangente para desenvolvedores e usuários finais.
   - **Métrica:** Documentação atualizada com pelo menos 90% de cobertura de funcionalidades.

### 📊 Métricas

| Medida                  | Estado atual | Esperado             | Resultados |
| ----------------------- | ------------ | -------------------- | ---------- |
| Tempo de resposta médio | N/A          | < 2 segundos         |            |
| Usuários simultâneos    | N/A          | Até 1000             |            |
| Crescimento de dados    | N/A          | 1TB por ano          |            |
| Índice de satisfação    | N/A          | > 85%                |            |
| Tempo de inatividade    | N/A          | < 8,76 horas por ano |            |
| Tempo de recuperação    | N/A          | < 1 hora             |            |
| Perda de dados          | N/A          | < 15 minutos         |            |
| Conformidade WCAG 2.1   | N/A          | Nível AA             |            |