import interior1 from '@/assets/interior/interior-1.jpg';
import interior2 from '@/assets/interior/interior-2.jpg';
import interior3 from '@/assets/interior/interior-3.jpg';
import interior4 from '@/assets/interior/interior-4.jpg';
import breakfastPlatter from '@/assets/gallery/breakfast-platter.jpg';
import seafoodPlatter from '@/assets/gallery/seafood-platter.jpg';
import chocolateCake from '@/assets/gallery/chocolate-cake.jpg';
import teaBuns from '@/assets/gallery/tea-buns.jpg';
import lymeBeach from '@/assets/gallery/lyme-regis-beach.jpg';
import lymeCobb from '@/assets/gallery/lyme-regis-cobb.jpg';
import jurassicCoast from '@/assets/gallery/jurassic-coast.jpg';
import afternoonTea1 from '@/assets/gallery/afternoon-tea-1.jpg';
import afternoonTea2 from '@/assets/gallery/afternoon-tea-2.jpg';
import teaSandwiches from '@/assets/gallery/tea-sandwiches.jpg';

export type GalleryCategory = 'Food' | 'Interior' | 'Lyme Regis' | 'Afternoon Tea' | 'Guest Moments';

export const galleryCategories: GalleryCategory[] = [
  'Food',
  'Interior',
  'Lyme Regis',
  'Afternoon Tea',
  'Guest Moments',
];

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  credit: string;
};

const credit = 'Pexels stock photography (placeholder; replace with authentic Bell Cliff photography)';

export const gallery: GalleryImage[] = [
  { id: 'g1', src: breakfastPlatter, alt: 'A full breakfast platter on a blue plate', category: 'Food', credit },
  { id: 'g2', src: interior1, alt: 'Warm restaurant interior with wooden tables and greenery', category: 'Interior', credit },
  { id: 'g3', src: lymeBeach, alt: 'Lyme Regis beach with boats and an umbrella', category: 'Lyme Regis', credit },
  { id: 'g4', src: afternoonTea1, alt: 'An afternoon tea scene with pastries and tea', category: 'Afternoon Tea', credit },
  { id: 'g5', src: seafoodPlatter, alt: 'A seafood platter with mussels and prawns', category: 'Food', credit },
  { id: 'g6', src: lymeCobb, alt: 'The historic Cobb wall at Lyme Regis', category: 'Lyme Regis', credit },
  { id: 'g7', src: interior2, alt: 'A warm, inviting restaurant interior with wooden tables', category: 'Interior', credit },
  { id: 'g8', src: chocolateCake, alt: 'A slice of rich chocolate cake', category: 'Food', credit },
  { id: 'g9', src: afternoonTea2, alt: 'Scones and pastries for an elegant afternoon tea', category: 'Afternoon Tea', credit },
  { id: 'g10', src: jurassicCoast, alt: 'The Jurassic Coast cliffs and the blue sea', category: 'Lyme Regis', credit },
  { id: 'g11', src: interior3, alt: 'A charming restaurant interior with warm sunlight', category: 'Interior', credit },
  { id: 'g12', src: teaBuns, alt: 'Fresh homemade buns for afternoon tea', category: 'Afternoon Tea', credit },
  { id: 'g13', src: teaSandwiches, alt: 'Cucumber tea sandwiches neatly arranged', category: 'Afternoon Tea', credit },
  { id: 'g14', src: interior4, alt: 'A modern restaurant interior with wooden architecture', category: 'Interior', credit },
  { id: 'g15', src: afternoonTea1, alt: 'Guests enjoying afternoon tea together', category: 'Guest Moments', credit },
  { id: 'g16', src: lymeBeach, alt: 'Families enjoying a day by the coast at Lyme Regis', category: 'Guest Moments', credit },
];
