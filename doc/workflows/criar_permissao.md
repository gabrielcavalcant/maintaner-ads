````mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant A as API
    participant D as Banco de Dados

    U->>F: Preenche formulário para criar nova permissão
    F->>A: Envia dados da nova permissão (POST /permission)
    A->>D: Insere dados da permissão na tabela PERMISSION
    D-->>A: Confirma inserção da permissão
    A->>F: Retorna confirmação de sucesso
    F->>U: Exibe mensagem de sucesso
````