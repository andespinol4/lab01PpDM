# GastroAlquimia

Aplicativo mobile em React Native + Expo para explorar receitas, salvar favoritos e criar receitas próprias.

## Objetivo do projeto

O GastroAlquimia foi desenvolvido como solução para organizar receitas de forma prática, visual e persistente no dispositivo. O app permite:

- visualizar um catálogo inicial de receitas;
- buscar por nome e filtrar por categoria;
- favoritar receitas;
- criar e salvar receitas personalizadas;
- manter a lista de favoritos após fechar o app.

## Funcionalidades principais

- tela de boas-vindas e navegação inicial;
- autenticação local simples por cadastro e login;
- listagem de receitas com busca e filtro;
- detalhe completo da receita;
- favoritos com persistência em AsyncStorage;
- criação de receitas personalizadas;
- uso de recursos nativos: localização e seleção de imagem.

## Tecnologias

- React Native
- Expo
- Expo Router
- AsyncStorage
- Expo Location
- Expo Image Picker
- Expo Image
- React Native Toast Message

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o app:
   ```bash
   npx expo start
   ```

3. Escolha o emulador ou dispositivo conectado.

## Observações da entrega

Este projeto foi estruturado como app acadêmico para apresentação e entrega final, com foco em navegação, persistência local e recursos nativos.

## Estrutura principal

- `app/` — telas e rotas
- `components/` — blocos reutilizáveis da interface
- `services/` — persistência e regras locais
- `data/` — catálogo base de receitas
