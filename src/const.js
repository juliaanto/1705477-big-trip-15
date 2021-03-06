export const SortType = {
  DAY: 'day',
  PRICE: 'price',
  TIME: 'time',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  AVERAGE: 'AVERAGE',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const DEFAULT_POINT_TYPE = 'taxi';

export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
