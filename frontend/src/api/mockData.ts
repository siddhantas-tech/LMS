// src/api/mockData.ts
export const MOCK_CATEGORIES = [
  {
    id: "cat1",
    name: "Additive Manufacturing",
    slug: "additive",
    description: "Focuses on 3D printing and material layering techniques.",
    courseCount: 5
  },
  {
    id: "cat2",
    name: "Electronic Design",
    slug: "electronic",
    description: "Embedded systems, PCB design, and circuit theory.",
    courseCount: 3
  },
  {
    id: "cat3",
    name: "Subtractive Manufacturing",
    slug: "subtractive",
    description: "Traditional machining, CNC, and material removal processes.",
    courseCount: 2
  }
];

export const MOCK_COURSES = [
  {
    id: "1",
    title: "Introduction to Additive Manufacturing",
    category_id: "cat1",
    slug: "intro-to-additive",
    description: "Learn the basics of 3D printing and industrial additive techniques.",
    thumbnail_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    categories: { name: "Additive Manufacturing" },
    rating: 4.8,
    total_students: 1250,
    is_published: true
  },
  {
    id: "2",
    title: "Advanced Electronics Design",
    category_id: "cat2",
    slug: "advanced-electronics",
    description: "PCB layout, circuit simulation, and high-frequency design principles.",
    thumbnail_url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80",
    categories: { name: "Electronic Design" },
    rating: 4.9,
    total_students: 850,
    is_published: true
  }
];