
import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'S001',
    name: 'Denim Rancher Shirt',
    price: 79.99,
    description: 'A classic lightweight denim shirt, perfect for warm summer evenings.',
    details: ['100% Cotton', 'Pearl snap buttons', 'Chest pockets', 'Machine washable'],
    imageUrls: [
      'https://picsum.photos/id/1025/800/800',
      'https://picsum.photos/id/1026/800/800',
      'https://picsum.photos/id/1027/800/800'
    ],
    category: 'summer',
    reviews: [
      {
        id: 'R001',
        author: 'John D.',
        rating: 5,
        comment: "Absolutely love this shirt! The fit is perfect and the quality is top-notch. It's become my go-to for summer evenings.",
        date: '2023-08-15T10:00:00Z'
      },
      {
        id: 'R002',
        author: 'Sarah P.',
        rating: 4,
        comment: "Great shirt, very comfortable. The pearl snaps are a nice touch. It's a little thinner than I expected, but still great for the price.",
        date: '2023-08-20T14:30:00Z'
      }
    ]
  },
  {
    id: 'S002',
    name: 'Embroidered Sundress',
    price: 129.99,
    description: 'Flowy and breathable, this sundress features intricate floral embroidery.',
    details: ['Rayon/Linen blend', 'Adjustable straps', 'Midi length', 'Hand wash recommended'],
    imageUrls: [
      'https://picsum.photos/id/1080/800/800',
      'https://picsum.photos/id/1081/800/800',
      'https://picsum.photos/id/1082/800/800',
    ],
    category: 'summer',
  },
  {
    id: 'S003',
    name: 'Leather Tooled Sandals',
    price: 99.99,
    description: 'Hand-tooled leather sandals with a comfortable, cushioned footbed.',
    details: ['Genuine leather upper', 'Rubber sole for durability', 'Artisan crafted', 'Available in three colors'],
    imageUrls: ['https://picsum.photos/id/219/800/800'],
    category: 'summer',
  },
  {
    id: 'S004',
    name: 'Turquoise Buckle Belt',
    price: 149.99,
    description: 'A statement piece, this leather belt features a stunning turquoise and silver buckle.',
    details: ['Full-grain leather', 'Authentic turquoise stone', 'Fits 1.5" belt loops', 'Made in the USA'],
    imageUrls: ['https://picsum.photos/id/56/800/800'],
    category: 'summer',
  },
  {
    id: 'W001',
    name: 'Sherpa-Lined Denim Jacket',
    price: 189.99,
    description: 'Stay warm with this rugged denim jacket, fully lined with soft sherpa fleece.',
    details: ['Heavyweight denim', 'Cozy sherpa lining', 'Button-front closure', 'Four-pocket design'],
    imageUrls: [
      'https://picsum.photos/id/1062/800/800',
      'https://picsum.photos/id/1063/800/800',
      'https://picsum.photos/id/1064/800/800',
    ],
    category: 'winter',
  },
  {
    id: 'W002',
    name: 'Wool Pendleton Blanket Scarf',
    price: 119.99,
    description: 'An oversized scarf made from iconic Pendleton wool, perfect for chilly days.',
    details: ['82% pure virgin wool / 18% cotton', 'Iconic Southwestern pattern', 'Fringed edges', 'Dry clean only'],
    imageUrls: ['https://picsum.photos/id/312/800/800'],
    category: 'winter',
  },
  {
    id: 'W003',
    name: 'Suede Cowboy Boots',
    price: 249.99,
    description: 'Classic western boots crafted from premium suede with intricate stitching.',
    details: ['Genuine suede leather', 'Leather sole and lining', '12" shaft height', 'Handcrafted for comfort'],
    imageUrls: [
        'https://picsum.photos/id/48/800/800',
        'https://picsum.photos/id/49/800/800',
    ],
    category: 'winter',
    reviews: [
      {
        id: 'R003',
        author: 'Mike R.',
        rating: 5,
        comment: "Best boots I've ever owned. They were comfortable right out of the box and the craftsmanship is incredible. Worth every penny.",
        date: '2023-11-05T09:15:00Z'
      },
      {
        id: 'R004',
        author: 'Emily K.',
        rating: 5,
        comment: "Stunning boots! I get compliments every time I wear them. The suede is so soft and the stitching is beautiful.",
        date: '2023-11-12T18:00:00Z'
      },
      {
        id: 'R005',
        author: 'David L.',
        rating: 4,
        comment: "Really solid pair of boots. Took a few wears to break them in, but now they're very comfortable. The color is a bit lighter in person than in the photos.",
        date: '2023-11-21T11:45:00Z'
      }
    ]
  },
  {
    id: 'W004',
    name: 'Felt Cattleman Hat',
    price: 159.99,
    description: 'A timeless cattleman-style hat made from durable, water-resistant wool felt.',
    details: ['100% Wool felt', '4" brim for sun protection', 'Leather sweatband', 'Satin lining'],
    imageUrls: ['https://picsum.photos/id/211/800/800'],
    category: 'winter',
  },
];