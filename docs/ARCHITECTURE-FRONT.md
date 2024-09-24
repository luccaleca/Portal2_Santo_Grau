# Estrutura de Diretórios do Projeto

Este documento fornece uma visão detalhada da estrutura de diretórios do projeto, explicando o propósito de cada pasta e como elas se relacionam entre si.

## Visão Geral

A estrutura de diretórios está organizada para suportar uma separação clara de responsabilidades entre as diversas partes do projeto, facilitando a manutenção e a escalabilidade.

## Estrutura de Pastas

A seguir, é apresentada a árvore de diretórios do projeto com uma descrição do que cada diretório contém e como eles contribuem para a funcionalidade do sistema.

### `/src`

Diretório principal que contém todo o código fonte do projeto.





#### `/components`
/components
  /AuthPage
    - **LoginForm.jsx**: Gerencia o formulário de login.
    - **CadastroForm.jsx**: Gerencia o formulário de cadastro.
  /DashboardPage
    - **FiltroDashboard.jsx**: Componente para filtros aplicáveis no dashboard.
    - **Podium3Melhores.jsx**: Exibe o pódio dos três melhores vendedores.
    - **Sumario.jsx**: Fornece um resumo das vendas e metas.
    - **TabelaVendedores.jsx**: Apresenta uma tabela com informações dos vendedores.
  /Global
    - **Voltar.jsx**: Botão global de voltar utilizado em várias páginas.
  /PromocoesPage
    - **AdicionarPromocao.jsx**: Componente para adicionar novas promoções.
  /VisualizadorClientePage
    - **FiltroVisualizadorCliente.jsx**: Componente de filtro específico para a visualização de clientes.




#### `/images`
  /icons
    - ícones específicos utilizados na UI para ações como adicionar, deletar, editar, etc.
  /logos
    - logos da empresa ou de parceiros que são utilizados em várias partes do aplicativo, principalmente no cabeçalho e no rodapé.
  /backgrounds
    - imagens de fundo utilizadas para estilização de páginas ou seções específicas.
  /product
    - imagens dos produtos ou serviços oferecidos, organizadas por categoria ou funcionalidade.





#### `/pages`
- **Descrição**: Contém todos os componentes React que funcionam como páginas acessíveis através de rotas definidas no aplicativo.
- **Relação**: Cada componente nesta pasta está diretamente associado a uma rota no front-end.

##### Detalhamento das Páginas
- **404.jsx**
  - **Função**: Exibe uma mensagem de erro quando o usuário tenta acessar uma página que não existe.
  - **Rotas**: Captura todas as rotas não definidas, tipicamente acessada por qualquer URL que não corresponda a outras rotas definidas.

- **Auth.jsx**
  - **Função**: Fornece as interfaces para autenticação, incluindo formulários de login e cadastro.
  - **Rotas**: Acessada por `/auth`.

- **Dashboard.jsx**
  - **Função**: Apresenta uma visão geral interativa com painéis de controle que mostram métricas e estatísticas importantes para a tomada de decisões.
  - **Rotas**: Acessada por `/dashboard`.

- **Home.jsx**
  - **Função**: Serve como a página principal do aplicativo, oferecendo uma visão geral e links para outras seções importantes.
  - **Rotas**: Acessada por `/`.

- **Index.jsx**
  - **Função**: Componente raiz que pode ser usado para gerenciar layouts comuns ou redirecionamentos baseados em lógicas específicas.
  - **Rotas**: Tipicamente não está associada diretamente a uma rota, mas gerencia o layout principal.

- **Promocoes.jsx**
  - **Função**: Permite aos usuários visualizar e gerenciar promoções correntes, bem como adicionar novas promoções.
  - **Rotas**: Acessada por `/promocoes`.

- **VisualizadorClientes.jsx**
  - **Função**: Oferece uma interface para visualizar detalhes sobre clientes, incluindo dados de contato e histórico de interações.
  - **Rotas**: Acessada por `/visualizadorclientes`.





#### `/services`
- **Descrição**: Contém arquivos JavaScript que encapsulam a lógica de comunicação com APIs externas ou internas, além de gerenciar operações de dados que não são diretamente parte dos componentes da UI.

##### Detalhamento dos Serviços
- **authService.js**
  - **Função**: Gerencia todas as operações relacionadas à autenticação, incluindo login e cadastro de usuários.
  - **Métodos Principais**:
    - `login(credentials)`: Autentica o usuário com base nas credenciais fornecidas e retorna os dados do usuário.
    - `cadastro(userData)`: Registra um novo usuário com os dados fornecidos e retorna os dados do novo usuário.

- **dashboardService.js**
  - **Função**: Fornece funções para buscar e manipular dados específicos ao dashboard.
  - **Métodos Principais**:
    - `getDashboardData(filtro, dataInicioCustomizada, dataFimCustomizada)`: Busca os dados do dashboard com base nos filtros e datas especificadas.

- **promocoesService.js**
  - **Função**: Administra a lógica de negócios relacionada às promoções dentro do aplicativo.
  - **Métodos Principais**:
    - `getPromocoes(status)`: Lista promoções com base no status.
    - `addPromocao(novaPromocao)`: Adiciona uma nova promoção ao sistema.
    - `deletePromocao(id)`: Remove uma promoção existente com base no seu identificador.





#### `/styles`
- **Descrição**: Contém arquivos CSS ou SASS para estilização global e específica de componentes, organizados por subpastas que correspondem às páginas ou funções dentro do aplicativo.
- **Relação**: Cada arquivo de estilo é importado diretamente pelos componentes ou páginas relacionadas, aplicando estilos de maneira modular e organizada.

##### Estrutura Detalhada
- **/dashboard**
  - **Descrição**: Contém estilos para a página de Dashboard e seus componentes internos.
  - **Conteúdo**:
    - `Dashboard.css`: Estilos principais da página de Dashboard.
    - `Podium3Melhores.css`: Estilos para o componente que exibe os três melhores resultados.
    - `Sumario.css`: Estilos para o componente de resumo de métricas.
    - `TabelaVendedores.css`: Estilos para a tabela de vendedores.

- **/global**
  - **Descrição**: Armazena estilos que são comuns e reutilizados em várias partes do aplicativo.
  - **Conteúdo**:
    - `Voltar.css`: Estilos para o botão de voltar usado em várias páginas.
    - `index.module.css`: Estilos globais que afetam o layout e componentes em todo o aplicativo.

- **/promocoes**
  - **Descrição**: Estilos específicos para a página de Promoções e seus componentes.
  - **Conteúdo**:
    - `BotaoAdicionar.css`: Estilos para o botão de adicionar novas promoções.
    - `ModalPromocao.css`: Estilos para o modal de gestão de promoções.
    - `Promocoes.css`: Estilos gerais da página de Promoções.

- **/visualizadorCliente**
  - **Descrição**: Estilos dedicados à página de Visualização de Clientes.
  - **Conteúdo**:
    - `VisualizadorClientes.css`: Estilos para a página de visualização de clientes, incluindo tabelas e filtros.




#### `/hooks`
- **Descrição**: Armazena hooks personalizados do React que encapsulam lógicas de estado ou efeitos colaterais.
- **Relação**: Utilizados pelos componentes para compartilhar lógicas comuns.

#### `/utils`
- **Descrição**: Funções auxiliares ou utilitários usados em várias partes do projeto.
- **Relação**: Importado por componentes, serviços ou outros utilitários para facilitar tarefas comuns.

### `/config`
- **Descrição**: Contém arquivos de configuração do projeto, como configurações de ambiente.
- **Relação**: Importado principalmente pelos serviços para configurar conexões de API e outras opções globais.

### `/public`
- **Descrição**: Diretório para arquivos estáticos como imagens, documentos, e ícones que não são processados pelo Webpack.
- **Relação**: Arquivos aqui são acessíveis publicamente pela URL base do projeto.

### `/tests`
- **Descrição**: Contém todos os testes do projeto, organizados de forma espelhada à estrutura do `/src`.
- **Relação**: Cada teste é mapeado para componentes específicos, serviços ou utilitários dentro de `/src`.

## Conclusão

A estrutura de diretórios foi projetada para ser intuitiva e escalável, facilitando a navegação e o desenvolvimento futuro do projeto. As inter-relações entre os diretórios ajudam a manter a modularidade e a reutilização do código.
