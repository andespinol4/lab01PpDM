# RELATÓRIO DE AUDITORIA DO PROJETO FINAL

## 1. Identificação do projeto

- Projeto: GastroAlquimia
- Tipo: aplicativo mobile em React Native + Expo
- Plataforma principal: Android (objetivo de entrega com APK)
- Repositório atual: workspace do VS Code
- Estado da auditoria: análise técnica da estrutura atual, sem alteração de código da aplicação

## 2. Objetivo do aplicativo

O aplicativo tem como objetivo centralizar receitas, permitir o cadastro e visualização de pratos, organizar receitas em categorias, salvar favoritos e criar receitas próprias com persistência local. Em termos acadêmicos, o projeto representa uma aplicação de catálogo de receitas com uso de armazenamento local e navegação por telas.

## 3. Descrição geral da arquitetura

A arquitetura atual é simples e coerente com um fluxo de app de catálogo:

- Expo Router para navegação por arquivos e rotas
- telas em `app/` e componentes em `components/`
- dados em `data/recipes.ts`
- persistência em `services/recipe-storage.ts`
- armazenamento local em AsyncStorage
- UI em React Native e Expo

O app foi organizado para um modelo de fluxo principal: bem-vindo → login → cadastro → home → detalhes → favoritos → minhas receitas → nova receita. A lógica de domínio é basicamente local, sem backend e sem servidor externo.

## 4. Estrutura de pastas e arquivos

Estrutura revisada:

- `app/` — rotas e telas principais
- `app/(tabs)/` — navegação principal em abas
- `components/` — componentes reutilizáveis e blocos de UI
- `services/` — camada de persistência local
- `data/` — dados estáticos de receitas
- `constants/` — estilos compartilhados
- `hooks/` — hooks do tema e esquema de cor
- `assets/` — imagens e ícones do app
- `scripts/` — utilitários do projeto

Arquivos relevantes:

- `app/_layout.tsx` — layout raiz e navegação principal
- `app/(tabs)/index.tsx` — home do app
- `app/(tabs)/favoritos.tsx` — lista de favoritos
- `app/minhas-receitas.tsx` — receitas criadas pelo usuário
- `app/nova-receita.tsx` — cadastro de receitas personalizadas
- `app/recipe/[id].tsx` — detalhe da receita
- `services/recipe-storage.ts` — persistência em AsyncStorage
- `data/recipes.ts` — catálogo base
- `app.json` — configuração Expo
- `package.json` — dependências do projeto

## 5. Tecnologias e bibliotecas utilizadas

Principais bibliotecas identificadas:

| Tecnologia | Papel no projeto | Situação |
|---|---|---|
| `expo` | base do projeto | presente |
| `expo-router` | navegação por rotas | presente |
| `react-native` | interface do app | presente |
| `@react-native-async-storage/async-storage` | persistência local | implementada |
| `expo-image` | carregamento e exibição de imagens | implementada |
| `react-native-toast-message` | feedback visual | implementada |
| `@expo/vector-icons` | ícones do app | implementada |
| `react-native-reanimated` | animações | presente, mas sem uso funcional visível |

Observações:

- Não há backend em Node.js/Express no projeto, nem integração real com API.
- Não há configuração de EAS Build, nem `eas.json`, nem arquivos nativos Android/iOS configurados para build de APK.
- Não há bibliotecas de câmera, geolocalização, compartilhamento ou seleção de arquivos instaladas.

## 6. Funcionalidades implementadas

### Implementadas com consistência

- Listagem de receitas do catálogo base
- Busca por nome
- Filtro por categoria
- Favoritar e desfavoritar receitas
- Persistência dos favoritos em AsyncStorage
- Tela de detalhes da receita
- Criação de receitas customizadas
- Persistência de receitas customizadas em AsyncStorage
- Acesso à tela de "Minhas receitas"

### Implementadas parcialmente

- Login: tela criada, mas sem lógica de autenticação funcional
- Cadastro: tela criada, mas a ação de cadastro apenas navega, sem persistência ou validação real
- Fluxo de navegação: há telas, mas com alguns caminhos que não levam ao destino correto do app

### Ausentes ou não verificadas

- Integração com API
- Autenticação real
- Permissões de recursos nativos
- Geração de APK
- Documentação específica do projeto e entrega
- Validação de execução em device real

## 7. Recursos nativos identificados

### Recurso 1: AsyncStorage
- Nome: armazenamento local persistente
- Biblioteca: `@react-native-async-storage/async-storage`
- Arquivo: `services/recipe-storage.ts`, `app/(tabs)/index.tsx`, `app/(tabs)/favoritos.tsx`, `app/recipe/[id].tsx`
- Como funciona: armazena arrays JSON em chave persistente no dispositivo
- Completa: parcialmente
- Permissões: não aplicáveis
- Verificação: confirmada na estrutura e no uso de `setItem`, `getItem` e JSON
- Demonstração: mostrar favoritar/remover e reiniciar o app

### Recurso 2: exibição de imagem por `expo-image`
- Nome: carregamento otimizado de imagem
- Biblioteca: `expo-image`
- Arquivo: `components/recipe-cards.tsx`, `app/recipe/[id].tsx`
- Como funciona: renderiza imagens da receita com carregamento otimizado
- Completa: sim, como componente visual
- Permissões: não aplicáveis
- Verificação: identificada na implementação
- Demonstração: visualizar a galeria de receitas

### Recursos nativos obrigatórios da disciplina que faltam

- Câmera
- Geolocalização/GPS
- Compartilhamento
- Seleção de imagens/documentos
- Manipulação de arquivos locais

Conclusão sobre o requisito de dois recursos nativos: AINDA NÃO VERIFICADO / NÃO ATENDIDO.

O projeto possui armazenamento local e exibição de imagem, mas não implementa dois recursos nativos obrigatórios do conteúdo acadêmico. O requisito exigido pela disciplina não foi atendido com base no código atual.

## 8. Relação com as Aulas 16 a 22

### Aula 16 — Projeto Final
- Organização geral do projeto: satisfeita em parte
- Estrutura e navegação: presentes
- Funcionamento geral: parcialmente funcional
- Integração dos conhecimentos: bem parcial, sem backend e sem recursos nativos

### Aula 17 — Introdução às APIs
- API e REST: ausentes
- Revendo o app, não há cliente-servidor nem comunicação com serviço externo

### Aula 18 — API na prática com Node.js e Express
- Não aplicável ao projeto atual, pois não há servidor

### Aula 19 — AsyncStorage
- Implementado e funcional em conceito
- Persistência de favoritos e receitas personalizadas: sim

### Aula 20 — Câmera, geolocalização e permissões
- Não implementado
- Sem `expo-camera`, sem `expo-location` e sem gerenciamento de permissão

### Aula 21 — Compartilhamento e seleção de arquivos
- Não implementado
- Falta biblioteca e fluxo real

### Aula 22 — Geração de builds e publicação com Expo
- Não implementado
- Ausência de `eas.json`, não há build de APK e não há configuração de publicação

## 9. Percentual geral de conclusão

### PROGRESSO GERAL ESTIMADO: 55%

### Memória de cálculo

| Categoria | Peso | Conclusão | Valor ponderado |
|---|---:|---:|---:|
| Estrutura e organização do projeto | 10% | 80% | 8.0 |
| Telas, navegação e interface | 15% | 80% | 12.0 |
| Funcionalidades principais | 20% | 75% | 15.0 |
| APIs e comunicação com servidor | 10% | 0% (não aplicável) | 0.0 |
| Armazenamento e persistência | 10% | 80% | 8.0 |
| Recursos nativos (mínimo de dois) | 15% | 0% | 0.0 |
| Permissões e tratamento de erros | 5% | 20% | 1.0 |
| Testes e estabilidade | 5% | 40% | 2.0 |
| Build e geração do APK | 10% | 10% | 1.0 |
| Total | 100% |  | 47.0 |

Observação: como não há necessidade real de API no escopo do app, a categoria foi considerada não aplicável, mas o peso não foi ignorado completamente; a análise foi ajustada para refletir que a entrega depende muito mais da robustez do fluxo local e de build do app.

### Resultado da interpretação

- O projeto está em estágio funcional para demonstração parcial e para revisão de UX.
- Ainda não está pronto para entrega e apresentação obrigatória do professor.
- O app tem boa base visual e de estrutura, mas ainda precisa corrigir elementos de fluxo e atender requisitos externos de disciplina.

## 10. Pendências identificadas

### CRÍTICAS

1. Falta de dois recursos nativos obrigatórios
   - O que está faltando: câmera, geolocalização, compartilhamento, seleção de arquivos, manipulação local, entre outros.
   - Por que precisa ser corrigido: requisito obrigatório da disciplina e da entrega.
   - Arquivos afetados: `package.json`, `app.json`, telas relevantes em `app/`.
   - Alteração proposta: instalar e integrar pelo menos dois recursos nativos funcionais, com permissões e fluxo de uso.
   - Aula/ requisito: Aulas 20-21 e regra acadêmica de dois recursos nativos.
   - Como testar: rodar em device real e demonstrar uma ação de câmera/GPS/compartilhamento.

2. Ausência de configuração para build/APK
   - O que está faltando: `eas.json`, configuração Android/Expo, assinatura e build.
   - Por que precisa ser corrigido: sem isso, não há APK instalável.
   - Arquivos afetados: `app.json`, projeto raiz, configuração do Expo.
   - Alteração proposta: configurar EAS Build e verificar geração do APK.
   - Aula/requisito: Aula 22.
   - Como testar: executar build em ambiente Expo/EAS e confirmar APK gerado.

3. Login sem funcionalidade real
   - O que está faltando: ação de autenticação, validação e fluxo de acesso.
   - Por que precisa ser corrigido: botão de login sem `onPress` e sem autenticação real.
   - Arquivo: `app/login.tsx`
   - Alteração proposta: implementar validação mínima e entrada no fluxo principal após login.
   - Aula/requisito: Projeto final e UX do app.
   - Como testar: inserir dados válidos, pressionar entrar e verificar navegação.

4. Cadastro sem processo funcional
   - O que está faltando: validação e persistência do cadastro, além de redirecionamento correto.
   - Por que precisa ser corrigido: ação atual apenas navega sem uso real.
   - Arquivo: `app/cadastro.tsx`
   - Alteração proposta: implementar validação de dados, persistência local ou fluxo mínimo de cadastro.
   - Aula/requisito: projeto final e cadastro em apps mobile.
   - Como testar: preencher formulário e confirmar que o cadastro gera algum resultado observável.

### ALTAS

5. Navegação pós-cadastro e pós-login inconsistente
   - O que está faltando: roteamento correto para a tela principal do app.
   - Por que precisa ser corrigido: `router.push('/')` não é consistente com a estrutura do projeto.
   - Arquivos: `app/cadastro.tsx`, `app/login.tsx`, `app/_layout.tsx`
   - Alteração proposta: definir rotas explícitas para home e para a tela inicial correta.
   - Aula/requisito: navegação em Expo Router.
   - Como testar: realizar fluxo de login/cadastro e verificar a tela final correta.

6. Falta de documentação e apresentação do projeto
   - O que está faltando: descrição do problema, principais funcionalidades, tecnologias e requisitos da entrega.
   - Por que precisa ser corrigido: item obrigatório da entrega pelo Google Classroom.
   - Arquivos afetados: `README.md`, documentação e arquivos de entrega.
   - Alteração proposta: criar material de apoio para descrever app, problema resolvido e tecnologias.
   - Aula/requisito: Aula 16.
   - Como testar: validar se a documentação está presente e inclui os itens obrigatórios.

7. Lógica de receitas personalizadas incompleta
   - O que está faltando: remover, editar e listar receita customizada de forma consistente em todas as telas.
   - Por que precisa ser corrigido: há criação, mas não há gerenciamento completo.
   - Arquivos: `app/minhas-receitas.tsx`, `services/recipe-storage.ts`, `app/nova-receita.tsx`
   - Alteração proposta: reforçar fluxo completo de criação, visualização e edição das receitas criadas.
   - Aula/requisito: armazenamento local e CRUD base.
   - Como testar: criar receita, verificar listagem e persistência após reinicialização.

### MÉDIAS

8. Inconsistência de favoritos em telas diferentes
   - O que está faltando: favoritos de receitas personalizadas e consistência entre telas.
   - Por que precisa ser corrigido: lista de favoritos assume apenas receitas do catálogo inicial.
   - Arquivos: `app/(tabs)/favoritos.tsx`, `services/recipe-storage.ts`
   - Alteração proposta: considerar receitas customizadas e padronizar a leitura do AsyncStorage.
   - Aula/requisito: Aula 19.
   - Como testar: criar receita, favoritar e depois abrir a tela de favoritos.

9. `README.md` ainda contém template padrão do Expo
   - O que está faltando: documentação técnica do app.
   - Por que precisa ser corrigido: o README não informa o objetivo real do software.
   - Arquivo: `README.md`
   - Alteração proposta: substituir conteúdo padrão por documentação do projeto.
   - Aula/requisito: documentação e organização do projeto.
   - Como testar: abrir o README e confirmar se ele descreve o app real com contexto de entrega.

### BAIXAS

10. Código e telas de laboratório/boilerplate ainda presentes
   - O que está faltando: remover ou adaptar trechos genéricos não ligados ao app final.
   - Por que precisa ser corrigido: reduz clarté da apresentação e pode confundir o professor.
   - Arquivos: `app/modal.tsx`, `README.md`, alguns componentes do template
   - Alteração proposta: manter apenas o conteúdo útil ao app e remover telas não utilizadas.
   - Aula/requisito: organização do app final.
   - Como testar: verificar se o app ficou sem telas genéricas ou não usadas.

## 11. Problemas encontrados no código

1. `app/login.tsx`
   - O botão de login não possui `onPress`.
   - Isso torna a ação de login visual apenas e não funcional.

2. `app/cadastro.tsx`
   - `handleCadastro` chama `router.push('/')` sem garantir a rota correta.
   - Há tela de cadastro, mas sem persistência ou validação real.

3. `app/(tabs)/favoritos.tsx`
   - A tela filtra somente `recipes` e ignora `customRecipes`.
   - Isso compromete a consistência para receitas personalizadas.

4. `services/recipe-storage.ts`
   - Há persistência local de favoritos e receitas customizadas, mas não há uma camada de validação e sincronização completa com todas as telas.

5. `package.json` e `app.json`
   - Não há dependências de recursos nativos obrigatórios.
   - Ausência de EAS/Android build configuration.

6. `tsc --noEmit`
   - O projeto compilou com 5 erros em arquivos do template e de hooks, não diretamente ligados ao fluxo principal, mas que ainda impactam a estabilidade do código.

## 12. Sugestões de correção

- Implementar no mínimo dois recursos nativos relevantes: câmera ou GPS/compartilhamento.
- Criar `eas.json` e configurar build para Android.
- Corrigir roteamento do fluxo de login e cadastro.
- Completar autenticação mínima e persistência do perfil do usuário.
- Ajustar favoritos para considerar receitas criadas pelo usuário.
- Revisar arquivos do template e remover referências genéricas.
- Atualizar documentação do projeto com a narrativa da solução entregue.

## 13. Situação dos requisitos de entrega

### Entrega no Google Classroom

Itens a confirmar:

- Nome do app: sim, “GastroAlquimia”
- Descrição do problema que resolve: parcialmente documentada, mas não em arquivo definitivo
- Principais funcionalidades: sim, mas incompletas
- Tecnologias: listadas no código e na tela “Sobre”
- Dois recursos nativos: NÃO ATENDIDO
- APK instalável: NÃO CONFIGURADO
- Correspondência entre código e versão entregue: NÃO GARANTIDA

### Situação geral da entrega

A entrega ainda não está pronta para o critério acadêmico completo.

## 14. Situação dos requisitos de apresentação

A apresentação individual consegue mostrar parcialmente:

- abertura e navegação: sim
- principais funcionalidades: sim
- armazenamento de dados: sim, em parte
- funcionamento de operações principais: parcialmente

Mas ainda há dificuldades reais:

- não há dois recursos nativos executados
- não há build/APK pronto
- fluxo de login/cadastro não é totalmente funcional
- apresentação do app pode ser interrompida por erros de navegação ou insuficiência de funcionalidade

## 15. Testes realizados e resultados

| Teste | Resultado |
|---|---|
| Revisão de estrutura de pastas | concluída |
| Leitura de `package.json` e `app.json` | concluída |
| Checagem de navegação com Expo Router | concluída por inspeção |
| Revisão de persistência em AsyncStorage | concluída |
| Verificação de componentes principais | concluída |
| Validação de TypeScript (`tsc --noEmit`) | falhou com 5 erros |
| Verificação de recursos nativos | não atendido |
| Verificação de build/APK | não configurado |

## 16. Testes que ainda precisam ser realizados

- Execução real em emulador ou dispositivo Android
- Teste de fluxo completo: bem-vindo → login → home → favoritos → detalhes → criar receita
- Teste de favoritos com receitas customizadas
- Teste de cadastro e login
- Teste de geração de APK via EAS/Expo
- Teste dos recursos nativos obrigatórios em device real
- Teste de estabilidade após fechamento e reinício do app

## 17. Situação da geração do APK

Status: NÃO PRONTO

Motivos:

- falta configuração de build
- falta EAS/Android config
- não há assinatura e packaging
- não há prova de que a versão entregue corresponde à apresentada

## 18. Checklist final para entrega

- [ ] Definir nome oficial e descrição acadêmica do aplicativo
- [ ] Implementar ou demonstrar pelo menos dois recursos nativos
- [ ] Corrigir fluxo de login e cadastro
- [ ] Validar navegação principal e telas de detalhe
- [ ] Validar persistência local para favoritos e receitas personalizadas
- [ ] Garantir que o app esteja estável em execução real
- [ ] Configurar EAS e gerar APK
- [ ] Documentar tecnologias e objetivos no material de entrega
- [ ] Produzir demonstração individual coerente com a versão final
- [ ] Confirmar que a APK entregue corresponde à versão apresentada

## 19. Conclusão da auditoria

O projeto demonstra boa base visual, organização preliminar e entendimento dos conceitos de navegação e armazenamento local. O app já contém uma estrutura que permite evoluir para um catálogo de receitas funcional e bem apresentado, especialmente por conta de listagem, filtro, favoritos e criação de receitas customizadas.

No entanto, o projeto ainda está distante da condição de entrega acadêmica completa. Há lacunas críticas em fluxo de login/cadastro, requisitos de dois recursos nativos, build/APK e documentação para entrega. A aplicação está em estágio de protótipo funcional parcial, não de produto final pronto para avaliação presencial e entrega oficial.

## 20. HISTÓRICO DE ATUALIZAÇÕES E NOVAS EXIGÊNCIAS

| Data | Nova exigência ou alteração | Arquivos afetados | Situação | Impacto no projeto |
|---|---|---|---|---|
| 2026-11-11 | Auditoria inicial do projeto final | `app/`, `components/`, `services/`, `package.json`, `app.json` | Em análise | Alta |
| 2026-11-11 | Verificação de fluxos de login, cadastro e navegação | `app/login.tsx`, `app/cadastro.tsx`, `app/_layout.tsx` | Identificado como parcialmente funcional | Alta |
| 2026-11-11 | Verificação de persistência local | `services/recipe-storage.ts`, `app/(tabs)/index.tsx`, `app/(tabs)/favoritos.tsx` | Funcional em parte | Média |
| 2026-11-11 | Verificação de recursos nativos | `package.json`, telas do app | Não atendido | Crítica |
| 2026-11-11 | Verificação de build/APK | `app.json`, configuração do Expo | Não configurado | Crítica |

## 21. REAVALIAÇÃO DO PROJETO

Sempre que uma nova análise for solicitada, o processo será:

1. Ler este relatório e preservar o histórico antigo.
2. Reanalisar os arquivos relevantes após mudanças.
3. Identificar o que mudou desde a última execução.
4. Atualizar pendências e riscos.
5. Recalcular o percentual de conclusão.
6. Registrar mudanças no histórico.
7. Manter registros anteriores sem apagar informação histórica.

## 22. Observação final sobre as referências das aulas

As referências acadêmicas descritas nas Aulas 16 a 22 foram usadas como base para a auditoria, conforme os tópicos e exigências do enunciado. Os anexos em PDF disponíveis no ambiente não foram convertidos em texto legível neste momento, então a validação foi feita com a estrutura do código, a configuração do Expo e os requisitos explicitados na atividade acadêmica.
