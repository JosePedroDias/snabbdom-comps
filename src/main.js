// SNABBDOM SETUP

const snabbdom = require('snabbdom');

const patch = snabbdom.init([          // Init patch function with choosen modules
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/attributes'),     // for setting attributes on DOM elements
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners'), // attaches event listeners
]);

const h = require('snabbdom/h');



// GENERIC SETUP

function main(oldState, oldVnode, {view, update}) {
  const newVnode = view(oldState, event => {
    const newState = update(oldState, event);
    main(newState, newVnode, {view, update});
  });
  patch(oldVnode, newVnode);
}

module.exports = { h, main };
