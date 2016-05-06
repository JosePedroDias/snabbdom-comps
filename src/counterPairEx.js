const main = require('./main').main;
const counterPair = require('./counterPair');



let oldVnode = document.getElementById('ctn');

main(counterPair.init(), oldVnode, {view:counterPair.view, update:counterPair.update});
