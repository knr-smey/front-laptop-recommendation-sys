export const sidebarMenuItems = [
  { label: 'Dashboard', icon: 'home', active: true },
  { label: 'New Recommendation', icon: 'chat' },
  { label: 'Compare Laptops', icon: 'tasks' },
  { label: 'Top Picks', icon: 'meetings' },
  { label: 'Saved Models', icon: 'files' },
  { label: 'Shared Lists', icon: 'shared' },
]

export const sidebarHistoryGroups = [
  {
    title: 'Today',
    items: [
      'Gaming laptop under $1200',
      'Laptop for programming student',
      'Video editing recommendation',
    ],
  },
  {
    title: 'Yesterday',
    items: ['Best office laptop with long battery life'],
  },
]

export const sidebarPromo = {
  title: '24 laptop profiles loaded',
  description: 'Add more models to improve recommendation quality',
  buttonLabel: 'Sync Catalog',
}

export const quickActions = [
  'Find a gaming laptop under $1200',
  'Recommend a laptop for coding',
  'Compare MacBook Air vs ASUS Zenbook',
  'Best battery life laptop for students',
]

export const messages = [
  {
    role: 'assistant',
    author: 'Laptop AI',
    time: '09:41 AM',
    text: 'Welcome back. I can recommend laptops by budget, purpose, performance, battery life, and brand preference. What kind of machine are you looking for?',
    chips: ['Budget recommendation', 'Student laptop', 'Gaming laptop'],
  },
  {
    role: 'user',
    author: 'You',
    time: '09:42 AM',
    text: 'I need a laptop for programming and light design work under $1000, with good battery life.',
  },
  {
    role: 'assistant',
    author: 'Laptop AI',
    time: '09:42 AM',
    text: 'Great fit. I would prioritize a recent Ryzen 5 or Intel Core i5, 16GB RAM, 512GB SSD, and a color-accurate display. I can now rank options and explain the tradeoffs between performance, portability, and price.',
  },
]

export const laptopCatalog = [
  {
    id: 1,
    name: 'Lenovo LOQ 15',
    brand: 'Lenovo',
    budget: '$800-$1200',
    ram: '16GB',
    type: 'Gaming',
    screen: '15.6"',
    price: '$999',
    cpu: 'Intel Core i5-13420H',
    gpu: 'RTX 4050',
    battery: '6.5 hrs',
    badge: 'Best Match',
  },
  {
    id: 2,
    name: 'ASUS TUF A15',
    brand: 'ASUS',
    budget: '$800-$1200',
    ram: '16GB',
    type: 'Gaming',
    screen: '15.6"',
    price: '$1,099',
    cpu: 'Ryzen 7 7735HS',
    gpu: 'RTX 4050',
    battery: '7 hrs',
    badge: 'Performance',
  },
  {
    id: 3,
    name: 'HP Victus 15',
    brand: 'HP',
    budget: '$800-$1200',
    ram: '16GB',
    type: 'Gaming',
    screen: '15.6"',
    price: '$929',
    cpu: 'Ryzen 5 8645HS',
    gpu: 'RTX 3050',
    battery: '6 hrs',
    badge: 'Value Pick',
  },
  {
    id: 4,
    name: 'Dell Inspiron 14',
    brand: 'Dell',
    budget: '$500-$800',
    ram: '16GB',
    type: 'Normal',
    screen: '14"',
    price: '$749',
    cpu: 'Intel Core i5',
    gpu: 'Integrated',
    battery: '10 hrs',
    badge: 'Office Use',
  },
  {
    id: 5,
    name: 'MacBook Air 13',
    brand: 'Apple',
    budget: '$1200-$1800',
    ram: '16GB',
    type: 'Creator',
    screen: '13"',
    price: '$1,299',
    cpu: 'Apple M3',
    gpu: 'Integrated',
    battery: '15 hrs',
    badge: 'Battery King',
  },
  {
    id: 6,
    name: 'Acer Aspire 5',
    brand: 'Acer',
    budget: '$500-$800',
    ram: '8GB',
    type: 'Student',
    screen: '15.6"',
    price: '$629',
    cpu: 'Ryzen 5 7530U',
    gpu: 'Integrated',
    battery: '9 hrs',
    badge: 'Budget Pick',
  },
]

export const preferenceGroups = [
  {
    key: 'brand',
    label: 'Brand',
    options: ['ASUS', 'Acer', 'Dell', 'HP', 'Lenovo', 'Apple'],
  },
  {
    key: 'budget',
    label: 'Budget',
    options: ['<$500', '$500-$800', '$800-$1200', '$1200-$1800', '$1800+'],
  },
  {
    key: 'ram',
    label: 'RAM',
    options: ['8GB', '16GB', '32GB', '64GB+'],
  },
  {
    key: 'type',
    label: 'Type',
    options: ['Gaming', 'Normal', 'Student', 'Business', 'Creator'],
  },
  {
    key: 'screen',
    label: 'Screen Size',
    options: ['13"', '14"', '15.6"', '16"+'],
  },
]

export const suggestionCard = {
  eyebrow: 'Recommendation flow',
  title: 'Match laptops by real user needs',
  description:
    'Filter by budget, use case, RAM, storage, and battery life, then explain why each model ranks where it does.',
  buttonLabel: 'Use ranking template',
}

export const tips = [
  'Ask by budget and purpose, for example gaming, office work, study, or programming.',
  'Mention screen size, battery expectations, and whether portability matters.',
  'Compare at least two models when you want clearer tradeoff explanations.',
]
