import fullEnglish from '@/assets/dishes/full-english-breakfast.jpg';
import fishChips from '@/assets/dishes/fish-and-chips.jpg';
import mussels from '@/assets/dishes/mussels.jpg';
import creamTea from '@/assets/dishes/dorset-cream-tea.jpg';
import chocolateCake from '@/assets/dishes/chocolate-fudge-cake.jpg';

export type DecorativeIngredient = {
  name: string;
  emoji: string;
  angle: number;
  radius: number;
  size: number;
};

export type CarouselDish = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageCredit: string;
  dietary: string[];
  featured: boolean;
  availability: string;
  rotationDirection: 'cw' | 'ccw';
  dominantColour: string;
  ingredients: DecorativeIngredient[];
};

export const dishCarousel: CarouselDish[] = [
  {
    id: 'full-english-breakfast',
    name: 'Full English Breakfast',
    category: 'Breakfast',
    description:
      'Eggs, bacon, sausage, beans, grilled tomato and toast — a proper start to a Lyme Regis morning.',
    image: fullEnglish,
    imageCredit: 'Pexels — Attie Heunis (placeholder; replace with authentic Bell Cliff photography)',
    dietary: [],
    featured: true,
    availability: 'Served during breakfast hours. Ask about today\u2019s selection.',
    rotationDirection: 'cw',
    dominantColour: '#C79A55',
    ingredients: [
      { name: 'egg', emoji: '\u{1F95A}', angle: 20, radius: 42, size: 28 },
      { name: 'tomato', emoji: '\u{1F345}', angle: 80, radius: 46, size: 24 },
      { name: 'beans', emoji: '\u{1F968}', angle: 150, radius: 44, size: 26 },
      { name: 'toast', emoji: '\u{1F35E}', angle: 220, radius: 48, size: 24 },
      { name: 'sausage', emoji: '\u{1F969}', angle: 300, radius: 45, size: 26 },
    ],
  },
  {
    id: 'fish-and-chips',
    name: 'Fish & Chips',
    category: 'English Favourites',
    description:
      'Crispy battered fish with golden chips, mushy peas and a wedge of lemon — a coastal classic.',
    image: fishChips,
    imageCredit: 'Pexels — Farhad Ibrahimzade (placeholder; replace with authentic Bell Cliff photography)',
    dietary: [],
    featured: true,
    availability: 'Subject to daily catch. Ask about today\u2019s price.',
    rotationDirection: 'cw',
    dominantColour: '#789D8C',
    ingredients: [
      { name: 'lemon', emoji: '\u{1F34B}', angle: 40, radius: 44, size: 26 },
      { name: 'peas', emoji: '\u{1F7E2}', angle: 110, radius: 47, size: 22 },
      { name: 'fish', emoji: '\u{1F41F}', angle: 190, radius: 43, size: 28 },
      { name: 'chips', emoji: '\u{1F35F}', angle: 260, radius: 48, size: 26 },
      { name: 'salt', emoji: '\u{1F9C2}', angle: 330, radius: 46, size: 22 },
    ],
  },
  {
    id: 'mussels',
    name: 'Mussels',
    category: 'Seafood',
    description:
      'Fresh mussels steamed in a fragrant broth, served with crusty bread to soak up every drop.',
    image: mussels,
    imageCredit: 'Pexels — Farhad Ibrahimzade (placeholder; replace with authentic Bell Cliff photography)',
    dietary: [],
    featured: true,
    availability: 'Subject to daily availability. Ask about today\u2019s price.',
    rotationDirection: 'cw',
    dominantColour: '#6E2C32',
    ingredients: [
      { name: 'mussel', emoji: '\u{1F990}', angle: 30, radius: 44, size: 28 },
      { name: 'herb', emoji: '\u{1F33F}', angle: 100, radius: 48, size: 24 },
      { name: 'lemon', emoji: '\u{1F34B}', angle: 175, radius: 46, size: 24 },
      { name: 'bread', emoji: '\u{1F35E}', angle: 250, radius: 47, size: 26 },
      { name: 'wine', emoji: '\u{1F377}', angle: 320, radius: 45, size: 24 },
    ],
  },
  {
    id: 'dorset-cream-tea',
    name: 'Dorset Cream Tea',
    category: 'Cream Tea',
    description:
      'Warm homemade scones with Dorset clotted cream, strawberry jam and a pot of tea.',
    image: creamTea,
    imageCredit: 'Pexels — Studio Naae (placeholder; replace with authentic Bell Cliff photography)',
    dietary: ['Vegetarian'],
    featured: true,
    availability: 'Served through the afternoon. Ask about today\u2019s price.',
    rotationDirection: 'cw',
    dominantColour: '#C79A55',
    ingredients: [
      { name: 'scone', emoji: '\u{1F9D1}', angle: 45, radius: 44, size: 26 },
      { name: 'cream', emoji: '\u{1F9C4}', angle: 120, radius: 47, size: 24 },
      { name: 'jam', emoji: '\u{1F353}', angle: 200, radius: 45, size: 24 },
      { name: 'tea', emoji: '\u{2615}', angle: 280, radius: 46, size: 28 },
      { name: 'butter', emoji: '\u{1F9C8}', angle: 340, radius: 48, size: 22 },
    ],
  },
  {
    id: 'chocolate-fudge-cake',
    name: 'Chocolate Fudge Cake',
    category: 'Desserts',
    description:
      'A rich, moist slice of chocolate fudge cake — a generous end to a memorable meal.',
    image: chocolateCake,
    imageCredit: 'Pexels — kelvin agustinus (placeholder; replace with authentic Bell Cliff photography)',
    dietary: ['Vegetarian'],
    featured: true,
    availability: 'Subject to daily selection. Ask about today\u2019s price.',
    rotationDirection: 'cw',
    dominantColour: '#6E2C32',
    ingredients: [
      { name: 'chocolate', emoji: '\u{1F36B}', angle: 35, radius: 44, size: 28 },
      { name: 'cream', emoji: '\u{1F9C4}', angle: 110, radius: 47, size: 24 },
      { name: 'berry', emoji: '\u{1F353}', angle: 185, radius: 45, size: 24 },
      { name: 'mint', emoji: '\u{1F33F}', angle: 260, radius: 48, size: 22 },
      { name: 'cocoa', emoji: '\u{2615}', angle: 330, radius: 46, size: 26 },
    ],
  },
];

export const dishLabels = [
  'Full English Breakfast',
  'Fish & Chips',
  'Mussels',
  'Breaded Scampi',
  'Homemade Lasagne',
  'Dorset Cream Tea',
  'Apple Cake',
  'Chocolate Fudge Cake',
];
