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
    category: 'clothing',
    stock: 50,
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
    category: 'clothing',
    stock: 25,
  },
  {
    id: 'S003',
    name: 'Leather Tooled Sandals',
    price: 99.99,
    description: 'Hand-tooled leather sandals with a comfortable, cushioned footbed.',
    details: ['Genuine leather upper', 'Rubber sole for durability', 'Artisan crafted', 'Available in three colors'],
    imageUrls: ['https://picsum.photos/id/219/800/800'],
    category: 'accessories',
    stock: 80,
  },
  {
    id: 'S004',
    name: 'Turquoise Buckle Belt',
    price: 149.99,
    description: 'A statement piece, this leather belt features a stunning turquoise and silver buckle.',
    details: ['Full-grain leather', 'Authentic turquoise stone', 'Fits 1.5" belt loops', 'Made in the USA'],
    imageUrls: ['https://picsum.photos/id/56/800/800'],
    category: 'accessories',
    stock: 15,
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
    category: 'clothing',
    stock: 40,
  },
  {
    id: 'W002',
    name: 'Wool Pendleton Blanket Scarf',
    price: 119.99,
    description: 'An oversized scarf made from iconic Pendleton wool, perfect for chilly days.',
    details: ['82% pure virgin wool / 18% cotton', 'Iconic Southwestern pattern', 'Fringed edges', 'Dry clean only'],
    imageUrls: ['https://picsum.photos/id/312/800/800'],
    category: 'accessories',
    stock: 5,
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
    category: 'accessories',
    stock: 30,
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
    category: 'accessories',
    stock: 0,
  },
  {
    id: 'F001',
    name: 'Desert Bloom Perfume',
    price: 89.99,
    description: 'A captivating scent with notes of desert sage, jasmine, and warm sand.',
    details: ['Eau de Parfum', '50ml spray bottle', 'Long-lasting scent', 'Made with natural essences'],
    imageUrls: ['https://picsum.photos/id/111/800/800'],
    category: 'fragrance',
    stock: 45,
  },
  {
    id: 'J001',
    name: 'Silver Feather Earrings',
    price: 69.99,
    description: 'Delicate sterling silver earrings, handcrafted into a feather design.',
    details: ['925 Sterling Silver', 'Lightweight for comfort', 'Hypoallergenic', 'Handmade by artisans'],
    imageUrls: ['https://picsum.photos/id/122/800/800'],
    category: 'jewelry',
    stock: 60,
  },
  {
    id: 'A001',
    name: 'Fringed Leather Handbag',
    price: 179.99,
    description: 'A stylish and practical handbag made from soft suede with long leather fringes.',
    details: ['Genuine suede leather', 'Interior zip pocket', 'Magnetic snap closure', 'Adjustable shoulder strap'],
    imageUrls: ['https://picsum.photos/id/145/800/800'],
    category: 'accessories',
    stock: 22,
  },
  {
    id: 'F002',
    name: 'Smoky Cedar Cologne',
    price: 95.00,
    description: 'A rugged and masculine scent with notes of cedarwood, tobacco, and black pepper.',
    details: ['Eau de Cologne', '100ml spray bottle', 'Earthy and woody notes', 'Perfect for evening wear'],
    imageUrls: ['https://picsum.photos/id/164/800/800'],
    category: 'fragrance',
    stock: 30,
  },
  {
    id: 'J002',
    name: 'Engraved Western Cuff',
    price: 199.99,
    description: 'A bold statement cuff bracelet in sterling silver with traditional western engraving.',
    details: ['Solid 925 Sterling Silver', 'Adjustable fit', 'Oxidized finish for a vintage look', 'Unisex design'],
    imageUrls: ['https://picsum.photos/id/21/800/800'],
    category: 'jewelry',
    stock: 18,
  },
  {
    id: 'A002',
    name: 'Silk Wild Rag Scarf',
    price: 59.99,
    description: 'A versatile and vibrant silk scarf, perfect for adding a pop of color to any outfit.',
    details: ['100% Silk', '36" x 36" square', 'Classic paisley pattern', 'Can be worn multiple ways'],
    imageUrls: ['https://picsum.photos/id/440/800/800'],
    category: 'accessories',
    stock: 50,
  },
];
