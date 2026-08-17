export interface Recipe {
  id: string;
  name: string;
  category: string;
  image: string;
  prepTime: string;
  servings: number;
  ingredients: string[];
  steps: string[];
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Macarrão à Carbonara',
    category: 'Massas',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    prepTime: '25 min',
    servings: 2,
    ingredients: [
      '200g de espaguete',
      '100g de bacon em cubos',
      '2 ovos',
      '50g de queijo parmesão ralado',
      'Pimenta-do-reino a gosto',
      'Sal a gosto',
    ],
    steps: [
      'Cozinhe o espaguete em água fervente com sal até ficar al dente.',
      'Frite o bacon em uma frigideira até ficar crocante.',
      'Em uma tigela, misture os ovos e o queijo parmesão.',
      'Escorra o macarrão e misture rapidamente com o bacon.',
      'Adicione a mistura de ovos fora do fogo, mexendo rápido para não talhar.',
      'Finalize com pimenta-do-reino e sirva imediatamente.',
    ],
  },
  {
    id: '2',
    name: 'Salada Caesar',
    category: 'Saladas',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
    prepTime: '15 min',
    servings: 2,
    ingredients: [
      '1 pé de alface romana',
      '50g de croutons',
      '50g de queijo parmesão em lascas',
      '100ml de molho Caesar',
      'Peito de frango grelhado (opcional)',
    ],
    steps: [
      'Lave e corte a alface romana em pedaços grandes.',
      'Grelhe o peito de frango e corte em tiras.',
      'Misture a alface com o molho Caesar em uma tigela grande.',
      'Adicione os croutons e o frango por cima.',
      'Finalize com lascas de parmesão e sirva.',
    ],
  },
  {
    id: '3',
    name: 'Risoto de Cogumelos',
    category: 'Massas',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800',
    prepTime: '40 min',
    servings: 4,
    ingredients: [
      '300g de arroz arbóreo',
      '200g de cogumelos fatiados',
      '1 litro de caldo de legumes',
      '1/2 cebola picada',
      '100ml de vinho branco',
      '50g de manteiga',
      '50g de queijo parmesão ralado',
    ],
    steps: [
      'Refogue a cebola na manteiga até ficar transparente.',
      'Adicione o arroz e refogue por 2 minutos.',
      'Adicione o vinho branco e deixe evaporar.',
      'Adicione o caldo aos poucos, mexendo sempre, até o arroz cozinhar.',
      'Refogue os cogumelos separadamente e misture ao risoto.',
      'Finalize com queijo parmesão e sirva quente.',
    ],
  },
  {
    id: '4',
    name: 'Tacos Mexicanos',
    category: 'Lanches',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800',
    prepTime: '30 min',
    servings: 3,
    ingredients: [
      '6 tortilhas de milho',
      '300g de carne moída',
      '1 cebola picada',
      '1 tomate picado',
      'Alface picada',
      'Queijo ralado',
      'Molho picante a gosto',
    ],
    steps: [
      'Refogue a cebola até dourar.',
      'Adicione a carne moída e tempere a gosto.',
      'Cozinhe até a carne dourar por completo.',
      'Aqueça as tortilhas em uma frigideira seca.',
      'Monte os tacos com a carne, alface, tomate e queijo.',
      'Finalize com molho picante e sirva.',
    ],
  },
  {
    id: '5',
    name: 'Bolo de Chocolate',
    category: 'Sobremesas',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800',
    prepTime: '50 min',
    servings: 8,
    ingredients: [
      '2 xícaras de farinha de trigo',
      '1 xícara de chocolate em pó',
      '2 xícaras de açúcar',
      '3 ovos',
      '1 xícara de leite',
      '1/2 xícara de óleo',
      '1 colher de sopa de fermento em pó',
    ],
    steps: [
      'Pré-aqueça o forno a 180°C.',
      'Misture os ingredientes secos em uma tigela.',
      'Adicione os ovos, o leite e o óleo, misturando bem.',
      'Adicione o fermento por último e misture delicadamente.',
      'Despeje em uma forma untada e leve ao forno por 40 minutos.',
      'Deixe esfriar antes de desenformar e servir.',
    ],
  },
  {
    id: '6',
    name: 'Sopa de Legumes',
    category: 'Sopas',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    prepTime: '35 min',
    servings: 4,
    ingredients: [
      '2 cenouras picadas',
      '2 batatas picadas',
      '1 abobrinha picada',
      '1 cebola picada',
      '1 litro de caldo de legumes',
      'Sal e pimenta a gosto',
    ],
    steps: [
      'Refogue a cebola até ficar transparente.',
      'Adicione os demais legumes e refogue por 5 minutos.',
      'Cubra com o caldo de legumes e deixe cozinhar por 25 minutos.',
      'Tempere com sal e pimenta a gosto.',
      'Bata parte da sopa no liquidificador se preferir mais cremosa.',
      'Sirva quente.',
    ],
  },
];

export const categories = ['Todos', 'Massas', 'Saladas', 'Lanches', 'Sobremesas', 'Sopas'];