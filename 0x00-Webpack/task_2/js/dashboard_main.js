// import $ from 'jquery';
// import _ from 'lodash';
// import '../css/main.css';

// $('body').append("<div id='logo'> </div>");
// $('body').append('<p>Holberton Dashboard</p>');
// $('body').append('<p>Dashboard data for the students</p>');
// $('body').append('<button>Click here to get started</button>');
// $('body').append('<p id="count"></p>');
// $('body').append('<p>Copyright - Holberton School</p>');

// let count = 0;

// function updateCounter () {
//   count++;
//   $('#count').text(`${count} clicks on the button`);
// }

// $('button').on('click', _.debounce(updateCounter, 500));

import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';

$('body').append("<div id='logo'></div>");
$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');

// Container for the button and counter
$('body').append('<div id="button-container"><button>Click here to get started</button><p id="count"></p></div>');

$('body').append('<p>Copyright - Holberton School</p>');

let count = 0;

function updateCounter() {
  count++;
  $('#count').text(`${count} clicks on the button`);
}

$('button').on('click', _.debounce(updateCounter, 500));
