const getDefaults = (): Meta => ({
  limit: 20,
  next: '',
  offset: 20,
  previous: '',
  total_count: 407
});

export const getMetaMock = (props) => ({
  ...getDefaults(),
  ...props
});
