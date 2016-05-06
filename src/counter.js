const h = require('./main').h;



const INC = Symbol('inc');
const DEC = Symbol('dec');

function init() {
  return 0;
}

function view(count, handler) {
  return h('div', [
    h('button', { on: { click: handler.bind(null, {type: DEC}) }}, '-'),
   ` ${count} `,
    h('button', { on: { click: handler.bind(null, {type: INC}) }}, '+')
  ]);
}

function update(count, action) {
  return  action.type === INC ? count + 1
        : action.type === DEC ? count - 1
        : count;
}

module.exports = { init, view, update, actions : { INC, DEC } };
