import {createElement} from '../utils';

const createNoEventTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

//   Значение отображаемого текста зависит от выбранного фильтра:
//     * Everthing – 'Click New Event to create your first point'
//     * Past — 'There are no past events now';
//     * Future — 'There are no future events now'.

export default class NoEvent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoEventTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
