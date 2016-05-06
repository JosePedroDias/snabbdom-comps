const main = require('./main').main;
const counter = require('./counter');



let oldVnode = document.getElementById('ctn');

main(counter.init(), oldVnode, {view:counter.view, update:counter.update});
