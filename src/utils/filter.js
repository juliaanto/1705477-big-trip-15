import {FilterType} from '../const';
import {isFuture, isPast} from './point';

export const filter = {
  [FilterType.EVERYTHING]: (points) => (points),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.timeFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.timeTo)),
};
