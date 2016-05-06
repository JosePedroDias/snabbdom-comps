const main = require('./main').main;
const counterArray = require('./counterArray');



let oldVnode = document.getElementById('ctn');

main(counterArray.init(), oldVnode, {view:counterArray.view, update:counterArray.update});
