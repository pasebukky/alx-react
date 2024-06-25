import $ from 'jquery';
import './header.css';
import logo from '../../assets/holberton-logo.jpg';

console.log('Init header');

$('body').append("<div id='header'></div>");
$('#header').append(`<img src='${logo}' alt='Holberton Logo' id='logo'>`);
$('#header').append('<h1>Holberton Dashboard</h1>');
