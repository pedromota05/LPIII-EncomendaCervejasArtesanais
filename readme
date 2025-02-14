## Trabalho de LPIII

### Projeto: Propostas de Apresentações Musicais

**Linguagem de Programação III – Guilherme Silva Sampaio**

### Título do Projeto

Propostas Musicais para Eventos

### Entidades e Relacionamentos

- **Usuário**
  - Maestro (proponente)
  - Empresário (interessado)
- **Relacionamentos**
  - Maestro [1:n] Proposta
  - Empresário [1:n] Interesse
  - Interesse : Empresário - Proposta

### Entidades, Atributos e Referências

- **Usuário**
  - Atributos: cpf, nome, email, perfil, status, senha, questão, resposta, cor_tema
  - Maestro: titulação, anos_experiência, especialidade, propostas, usuário
  - Empresário: empresa, setor, telefone, interesses, usuário
- **Proposta**
  - Atributos: id, título, categoria, repertório, data_proposta, descrição, orçamento_estimado, maestro, interesses
- **Interesse**
  - Atributos: id, data_manifestação, justificativa, orçamento_disponível, proposta, empresário

### Enumerados

- **Usuário**
  - Perfil: maestro, empresário
  - Status: ativo, inativo, pendente
  - Cores: amarelo, anil, azul, azul_piscina, cinza_escuro, laranja, rosa, roxo, verde, verde_azulado
- **Maestro**
  - Titulação: doutorado, mestrado
  - Especialidade: clássico, jazz, pop, contemporâneo
- **Empresário**
  - Setor: eventos, publicidade, entretenimento
- **Proposta**
  - Categoria: concerto, show, festival
  - Repertório: clássico, popular, misto

### Filtros: Administrar e Pesquisar

- **Maestro**
  - Administrar Propostas: título, categoria, repertório, orçamento_estimado
  - Pesquisar Interesses: nome_empresário, título_proposta, categoria_proposta, orçamento_disponível
- **Empresário**
  - Administrar Interesses: nome_maestro, categoria_proposta, título_proposta, orçamento_estimado
  - Pesquisar Propostas: nome_maestro, título, categoria, repertório, orçamento_estimado

## Rodar o projeto

### Pré-requisitos

- Node.js instalado (v22)
- Yarn instalado

### Instalando o nvm no Windows - facilita mudar de versão do node caso tenha outra versão na máquina

Para instalar o nvm no Windows, siga os passos abaixo:

1. Baixe o instalador do nvm para Windows a partir do [repositório oficial](https://github.com/coreybutler/nvm-windows/releases).
2. Execute o instalador e siga as instruções na tela.
3. Após a instalação, abra um novo terminal e execute o comando abaixo para verificar se o nvm foi instalado corretamente:

   ```sh
   nvm version
   ```

### Instalando o Node.js v22

Para instalar a versão 22 do Node.js, execute o seguinte comando:

```sh
nvm install 22
```

Para usar a versão 22 do Node.js, execute:

```sh
nvm use 22
```

### Instalando o Yarn globalmente

Para instalar o Yarn globalmente, execute o seguinte comando:

```sh
npm install -g yarn
```

### Dica: para abrir o terminal no VS Code: `Ctrl + "`

Clicando no `+`, é possível usar mais de um terminal ao mesmo tempo, facilitando a navegação entre os diretórios e a execução dos comandos.

![alt text](image.png)

### Passos

1. Abra os dois diretórios do projeto e instale as dependências:

   ```sh
   cd /c:/LPIII/front-end1
   ```

   ```sh
   cd /c:/LPIII/back-end1
   ```

2. Instale as dependências do projeto (em cada diretório, um por vez):

   ```sh
   yarn install
   ```

3. Execute o comando para iniciar a aplicação web (esteja no diretório do backend):

   ```sh
   yarn webapp
   ```

4. Abra o navegador e acesse:

   ```sh
   http://localhost:3000
   ```
