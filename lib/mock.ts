// lib/mock.ts

export const photographers = [
  {
    id: "omar",
    name: "Omar Al-Khatib",
    specialty: "Product & E-commerce",
    location: "Doha",
    priceQAR: 450,
    verified: true,
    rating: 4.8,
    bio: "Minimal, clean product photography for brands and online stores.",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop",
    reviews: [
      { author: "Sara", stars: 5.0, text: "Great direction and very professional results." },
      { author: "Fahad", stars: 4.7, text: "On time and premium quality." },
      { author: "Nora", stars: 4.8, text: "Smooth communication, excellent edits." },
    ],
  },
  {
    id: "lina",
    name: "Lina Haddad",
    specialty: "Fashion & Portrait",
    location: "Doha",
    priceQAR: 380,
    verified: false,
    rating: 4.6,
    bio: "Fashion and portrait photographer with a soft, editorial style.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
    reviews: [],
  },
  {
    id: "hassan",
    name: "Hassan Noor",
    specialty: "Events & Lifestyle",
    location: "Doha",
    priceQAR: 500,
    verified: true,
    rating: 4.9,
    bio: "Capturing real moments at events, weddings, and private shoots.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    reviews: [],
  },
];

export const models = [
  {
    id: "nora",
    name: "Nora Al-Sayed",
    specialty: "Fashion Model",
    location: "Doha",
    priceQAR: 300,
    verified: true,
    rating: 4.8,
    bio: "Commercial and editorial modeling for brands, lookbooks, and campaigns.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    reviews: [
      { author: "Laila", stars: 5.0, text: "Very professional and easy to work with." },
      { author: "Ahmad", stars: 4.7, text: "Great presence on camera." },
    ],
  },
  {
    id: "fahad",
    name: "Fahad Karim",
    specialty: "Lifestyle Model",
    location: "Doha",
    priceQAR: 250,
    verified: false,
    rating: 4.6,
    bio: "Lifestyle and product shoots with a natural, authentic look.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
    reviews: [],
  },
];
