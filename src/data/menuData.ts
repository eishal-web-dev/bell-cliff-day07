import fullEnglish from '@/assets/dishes/full-english-breakfast.jpg';
import fishChips from '@/assets/dishes/fish-and-chips.jpg';
import mussels from '@/assets/dishes/mussels.jpg';
import scampi from '@/assets/dishes/breaded-scampi.jpg';
import lasagne from '@/assets/dishes/homemade-lasagne.jpg';
import soup from '@/assets/dishes/soup-of-the-day.jpg';
import creamTea from '@/assets/dishes/dorset-cream-tea.jpg';
import scones from '@/assets/dishes/homemade-scones.jpg';
import appleCake from '@/assets/dishes/dorset-apple-cake.jpg';
import chocolateCake from '@/assets/dishes/chocolate-fudge-cake.jpg';
import cappuccino from '@/assets/dishes/cappuccino.jpg';
import hotChocolate from '@/assets/dishes/hot-chocolate.jpg';

export type MenuCategory =
  | 'Breakfast'
  | 'English Favourites'
  | 'Seafood'
  | 'Cream Tea'
  | 'Desserts'
  | 'Children\u2019s Menu'
  | 'Vegan Options'
  | 'Hot & Cold Drinks';

export const menuCategories: MenuCategory[] = [
  'Breakfast',
  'English Favourites',
  'Seafood',
  'Cream Tea',
  'Desserts',
  'Children\u2019s Menu',
  'Vegan Options',
  'Hot & Cold Drinks',
];

export type MenuDish = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  image: string;
  imageCredit: string;
  dietary: string[];
  featured: boolean;
  availability: string;
  priceNote: string;
};

const placeholderCredit =
  'Pexels stock photography (placeholder; replace with authentic Bell Cliff photography)';

export const menu: MenuDish[] = [
  {
    id: 'full-english-breakfast',
    name: 'Full English Breakfast',
    category: 'Breakfast',
    description: 'Eggs, bacon, sausage, beans, grilled tomato and toast.',
    image: fullEnglish,
    imageCredit: placeholderCredit,
    dietary: [],
    featured: true,
    availability: 'Served during breakfast hours.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'soup-of-the-day',
    name: 'Soup of the Day',
    category: 'Breakfast',
    description: 'A warming homemade soup, served with crusty bread.',
    image: soup,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: false,
    availability: 'Ask about today\u2019s selection.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'fish-and-chips',
    name: 'Fish & Chips',
    category: 'English Favourites',
    description: 'Crispy battered fish with golden chips and mushy peas.',
    image: fishChips,
    imageCredit: placeholderCredit,
    dietary: [],
    featured: true,
    availability: 'Subject to daily catch.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'homemade-lasagne',
    name: 'Homemade Lasagne',
    category: 'English Favourites',
    description: 'Layers of pasta, rich sauce and melted cheese, baked to order.',
    image: lasagne,
    imageCredit: placeholderCredit,
    dietary: [],
    featured: false,
    availability: 'Ask about today\u2019s selection.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'breaded-scampi',
    name: 'Breaded Scampi',
    category: 'Seafood',
    description: 'Golden breaded scampi with chips and a fresh lemon wedge.',
    image: scampi,
    imageCredit: placeholderCredit,
    dietary: [],
    featured: false,
    availability: 'Subject to daily availability.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'mussels',
    name: 'Mussels',
    category: 'Seafood',
    description: 'Fresh mussels steamed in a fragrant broth with crusty bread.',
    image: mussels,
    imageCredit: placeholderCredit,
    dietary: [],
    featured: true,
    availability: 'Subject to daily availability.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'dorset-cream-tea',
    name: 'Dorset Cream Tea',
    category: 'Cream Tea',
    description: 'Homemade scones with Dorset clotted cream, jam and a pot of tea.',
    image: creamTea,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: true,
    availability: 'Served through the afternoon.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'homemade-scones',
    name: 'Homemade Scones',
    category: 'Cream Tea',
    description: 'Freshly baked scones, served warm with butter or cream.',
    image: scones,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: false,
    availability: 'Ask about today\u2019s selection.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'dorset-apple-cake',
    name: 'Dorset Apple Cake',
    category: 'Desserts',
    description: 'A moist, spiced apple cake, a comforting Dorset favourite.',
    image: appleCake,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: false,
    availability: 'Subject to daily selection.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'chocolate-fudge-cake',
    name: 'Chocolate Fudge Cake',
    category: 'Desserts',
    description: 'A rich, generous slice of chocolate fudge cake.',
    image: chocolateCake,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: true,
    availability: 'Subject to daily selection.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Hot & Cold Drinks',
    description: 'A smooth, frothy cappuccino made with freshly brewed coffee.',
    image: cappuccino,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: false,
    availability: 'Served throughout the day.',
    priceNote: 'Ask about today\u2019s price',
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'Hot & Cold Drinks',
    description: 'A warming mug of hot chocolate, a cosy afternoon treat.',
    image: hotChocolate,
    imageCredit: placeholderCredit,
    dietary: ['Vegetarian'],
    featured: false,
    availability: 'Served throughout the day.',
    priceNote: 'Ask about today\u2019s price',
  },
];

export const dietaryFilters = ['Vegetarian', 'Vegan', 'Gluten-free'] as const;
export type DietaryFilter = (typeof dietaryFilters)[number];
