import PointView from './view/point';
import EditFormView from './view/edit-form';
import {render, RenderPosition, replace} from './utils/render';

export default class Point {
  constructor(pointContainer) {
    this._pointContainer = pointContainer;

    this._pointComponent = new PointView();
    this._editFormComponent = new EditFormView();
  }

  init() {

  }

}
