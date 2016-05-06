const h = require('./main').h;
const counter = require('./counter');



const RESET         = Symbol('reset');
const UPDATE_FIRST  = Symbol('update first');
const UPDATE_SECOND = Symbol('update second');

function init() {
  return { first: counter.init(), second: counter.init() };
}

function view(model, handler) {
  return h('div', [
    h('button', {
      on: { click: handler.bind(null, {type: RESET}) }
    }, 'reset buttons'),
    counter.view(model.first, counterAction => handler({
      type: UPDATE_FIRST, data: counterAction})),
    counter.view(model.second, counterAction => handler({
      type: UPDATE_SECOND, data: counterAction}))
  ]);
}

function update(model, action) { // here you can identify who to fire to by action type
  return action.type === RESET ?
          { first: counter.init(), second: counter.init() }
      : action.type === UPDATE_FIRST ?
          { second: model.second, first: counter.update(model.first, action.data) }
      : action.type === UPDATE_SECOND ?
          { first: model.first, second: counter.update(model.second, action.data) }
      : model;
}

module.exports = { init, view, update, actions: { UPDATE_FIRST, UPDATE_SECOND, RESET } };
