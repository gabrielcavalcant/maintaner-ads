```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant A as API
    participant D as Banco de Dados

    U->>F: Seleciona peças para adicionar à manutenção
    F->>A: Envia dados das peças e ID da manutenção (POST /maintenance/:id/parts)
    A->>D: Verifica se a manutenção existe
    alt Manutenção existe
        D-->>A: Manutenção encontrada
        A->>D: Verifica estoque das peças 
        alt Peças disponíveis em estoque
            D-->>A: Peças encontradas e quantidade suficiente
            A->>D: Insere dados das peças na tabela MAINTENANCE_PART
            D-->>A: Confirma inserção das peças
            A->>F: Retorna confirmação de sucesso
            F->>U: Exibe mensagem de sucesso
        else Peças não disponíveis em estoque
            D-->>A: Quantidade insuficiente para uma ou mais peças
            A->>F: Retorna erro de estoque insuficiente
            F->>U: Exibe mensagem de erro
        end
    else Manutenção não existe
        D-->>A: Manutenção não encontrada
        A->>F: Retorna erro de manutenção não encontrada
        F->>U: Exibe mensagem de erro
    end


```
