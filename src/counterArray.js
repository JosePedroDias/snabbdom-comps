const h = require('./main').h;
const counter = require('./counter');



const ADD     = Symbol('add');
const UPDATE  = Symbol('update');
const REMOVE  = Symbol('remove');
const RESET   = Symbol('reset');

function init() {
  return { nextID: 1, counters: [] };
}

function view(model, handler) {
  return h('div', [
    h('button', {
      on: { click: handler.bind(null, {type: ADD}) }
    }, 'add'),
    h('button', {
      on: { click: handler.bind(null, {type: RESET}) }
    }, 'reset'),
    h('hr'),
    h('div.counter-list', model.counters.map(function(c) {
      return counterItemView(c, handler);
    }))
]);
}

function counterItemView(item, handler) {
  return h('div.counter-item', {key: item.id}, [
    counter.view(
      item.counter, // state
      function(counterAction, ev) { // handler, had to merge inner handler data with our data bound earlier to know what to pass back to whom
        this.data = counterAction;
        handler(this);
      }.bind({type: UPDATE, id: item.id})
    ),
    h('button', {
      on: { click: function() {
        handler({ type: REMOVE, id: item.id});
      }}
    }, 'remove')
  ]);
}

function update(model, action) {
  return  action.type === ADD     ? addCounter(model)
        : action.type === RESET   ? resetCounters(model)
        : action.type === REMOVE  ? removeCounter(model, action.id)
        : action.type === UPDATE  ? updateCounter(model, action.id, action.data)
        : model;
}

function addCounter(model) {
  let counters_ = model.counters.slice();
  counters_.push({
    id      : model.nextID,
    counter : counter.init()
  });
  return {
    nextID   : model.nextID + 1,
    counters : counters_
  };
}

function resetCounters(model) {
  return {
    nextID   : model.nextID,
    counters : model.counters.map(function(c) {
      return {
        id      : c.id,
        counter : counter.init()
      };
    })
  };
}

function removeCounter(model, id) {
  return {
    nextID   : model.nextID,
    counters : model.counters.filter(function(c) {
      return c.id !== id;
    })
  };
}

function updateCounter(model, id, action) {
  return {
    nextID   : model.nextID,
    counters : model.counters.map(function(c) {
      if (id !== c.id) { return c; }
      return {
        id      : c.id,
        counter : counter.update(c.counter, action)
      };
    })
  };
}

module.exports = { init, view, update, actions: { ADD, RESET, UPDATE, REMOVE } };
