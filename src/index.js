import _ from 'lodash';
import './style.css';
import printMe from './print.js';
import Icon from './icon.png';
import {
  cube
} from './math.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  var element = document.createElement('div');
  var element = document.createElement('pre');
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');
  element.classList.add('hello');
  var myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  return element;

}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}