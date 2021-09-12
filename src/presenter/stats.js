import {remove, render, RenderPosition} from '../utils/render';
import StatsView from '../view/stats';

export default class Stats {
  constructor(statsContainer, pointsModel) {
    this._statsContainer = statsContainer;
    this._statsComponent = null;
    this._pointsModel = pointsModel;
  }

  init() {
    const points = this._pointsModel.getPoints();
    this._statsComponent = new StatsView(points);
    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);

  }

  desrtoy() {
    if (this._statsComponent === null) {
      return;
    }

    remove(this._statsComponent);
    this._statsComponent === null;
  }
}
