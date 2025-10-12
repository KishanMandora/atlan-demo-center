export const sortingChoices = [
  { value: 'publishedDate', label: 'Latest' },
  { value: 'views', label: 'Popular' }
];

export const selectDurations = [
  { value: 'all', label: 'All' },
  { value: 'quick', label: '0 - 15 minutes' },
  { value: 'short', label: '15 - 30 minutes' },
  { value: 'medium', label: '30 - 45 minutes' },
  { value: 'long', label: '45 - 60 minutes' },
  { value: 'depth', label: '60+ minutes' }
];

export const durationMap = {
  quick: {
    min: 0,
    max: 15
  },
  short: {
    min: 15,
    max: 30
  },
  medium: {
    min: 30,
    max: 45
  },
  long: {
    min: 45,
    max: 60
  },
  depth: {
    min: 60,
    max: Number.MAX_SAFE_INTEGER
  },
  all: {
    min: 0,
    max: Number.MAX_SAFE_INTEGER
  }
};
