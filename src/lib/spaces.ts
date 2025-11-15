export interface Space {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  amenities: string[];
  image: string;
  description: string;
}

export const SPACES: Space[] = [
  {
    id: '1',
    name: 'Open Desk Station',
    type: 'open-desk',
    location: 'Downtown',
    capacity: 1,
    amenities: ['wifi', 'coffee', 'printer'],
    image: '/src/assets/open-desk.jpg',
    description: 'Flexible workspace in a collaborative environment with high-speed WiFi and complimentary coffee.',
  },
  {
    id: '2',
    name: 'Private Office',
    type: 'private-office',
    location: 'Business District',
    capacity: 4,
    amenities: ['wifi', 'coffee', 'printer', 'whiteboard', 'phone-booth'],
    image: '/src/assets/private-office.jpg',
    description: 'Dedicated private office with premium amenities and 24/7 access.',
  },
  {
    id: '3',
    name: 'Meeting Room',
    type: 'meeting-room',
    location: 'Downtown',
    capacity: 10,
    amenities: ['wifi', 'projector', 'whiteboard', 'video-conferencing'],
    image: '/src/assets/meeting-room.jpg',
    description: 'Professional meeting space with state-of-the-art presentation equipment.',
  },
  {
    id: '4',
    name: 'Executive Office',
    type: 'private-office',
    location: 'Uptown',
    capacity: 2,
    amenities: ['wifi', 'coffee', 'printer', 'whiteboard', 'phone-booth', 'standing-desk'],
    image: '/src/assets/private-office.jpg',
    description: 'Premium private workspace with executive-level amenities.',
  },
  {
    id: '5',
    name: 'Shared Workspace',
    type: 'open-desk',
    location: 'Tech Hub',
    capacity: 1,
    amenities: ['wifi', 'coffee', 'printer', 'lounge'],
    image: '/src/assets/open-desk.jpg',
    description: 'Vibrant open workspace in the heart of the tech district.',
  },
  {
    id: '6',
    name: 'Conference Hall',
    type: 'meeting-room',
    location: 'Business District',
    capacity: 20,
    amenities: ['wifi', 'projector', 'whiteboard', 'video-conferencing', 'catering'],
    image: '/src/assets/meeting-room.jpg',
    description: 'Large conference facility perfect for presentations and seminars.',
  },
];

export const AMENITIES = [
  { id: 'wifi', label: 'High-Speed WiFi' },
  { id: 'coffee', label: 'Coffee & Tea' },
  { id: 'printer', label: 'Printer Access' },
  { id: 'whiteboard', label: 'Whiteboard' },
  { id: 'projector', label: 'Projector' },
  { id: 'phone-booth', label: 'Phone Booth' },
  { id: 'video-conferencing', label: 'Video Conferencing' },
  { id: 'standing-desk', label: 'Standing Desk' },
  { id: 'lounge', label: 'Lounge Access' },
  { id: 'catering', label: 'Catering Available' },
];

export const LOCATIONS = ['Downtown', 'Business District', 'Uptown', 'Tech Hub'];
