import {FilterType} from '../const';
import AbstractView from './abstract';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createNoPointsTemplate = (filterType) => {
  const noPointsTextValue = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noPointsTextValue}</p>`
  );
};

export default class NoPoint extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoPointsTemplate(this._data);
  }
}
