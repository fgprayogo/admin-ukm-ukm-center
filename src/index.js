/*
color options : 
	 'light.purple'		'dark.purple'
	 'light.blue'		  'dark.blue'
	 'light.green'		'dark.green'
	 'light.orange'		'dark.orange'
	 'light.red'		  'dark.red'
*/
var color = 'light.blue';
// if (localStorage.getItem('themeColor')) {
//   color = localStorage.getItem('themeColor');
// }

let render = () => {
  const css = import('./assets/css/sass/themes/gogo.' + color + '.scss').then(x => {
    const MainApp = require('./App');
  });

};
render();