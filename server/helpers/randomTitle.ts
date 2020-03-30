const adjectives = [
  'Party',
  'Cool',
  'Awesome',
  'Wicked',
  'Clever',
  'Enjoyable',
  'Boisterous',
  'Divergent',
  'Redundant',
  'Spicy',
  'Slippery',
];

const nouns = [
  'Pool',
  'Town',
  'Board',
  'Watercooler',
  'Couch',
  'Room',
  'Space',
  'Warzone',
  'IDE',
  'Canvas',
  'Panel',
];

export const getRandomName = () => {
  const randAdjIdx = Math.floor(Math.random() * adjectives.length);
  const randNounIdx = Math.floor(Math.random() * nouns.length);
  return `${adjectives[randAdjIdx]} ${nouns[randNounIdx]}`;
};
