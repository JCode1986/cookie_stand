'use strict';
//Good use of Object Literals (no constructors allowed today); one for each store model; 
// properties/values and methods are correctly constructed and given meaningful names
// Main page meets requirements of the problem domain
// Use template literals in your JS logic to render the stores as lists on the sales page
var title = document.getElementById('cookie_title');
title.innerHTML= `Pat's Amazing Salmon Cookies`;

function getRandomIntInclusive(min, max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

function Location (name, starting_hours, min_customers, max_customers, avg_cookie_sales, hourly_cookie_sales, element_id) {
  this.name = name;
  this.starting_hours = starting_hours;
  this.min_customers = min_customers;
  this.max_customers = max_customers;
  this.hours_in_workday = 14;
  this.avg_cookie_sales = avg_cookie_sales;
  this.hourly_cookie_sales = hourly_cookie_sales;
  this.element_id = element_id;
};

//random hourly cookie generator

Location.prototype.random_cookie_number = function (){
  for(var i = 0; i < this.hours_in_workday; i++){
    var random_customer = getRandomIntInclusive(this.min_customers, this.max_customers);
    var random_cookie_number = random_customer * this.avg_cookie_sales;
    var hourly_rounded_sales = Math.floor(random_cookie_number)
    this.hourly_cookie_sales.push(hourly_rounded_sales);
  }
};

//render to page constructor function

Location.prototype.render = function(){
  this.random_cookie_number();
  var table_parent = document.getElementById(this.element_id);
  for (var i = 0; i < this.hourly_cookie_sales.length; i++) {
    var new_data = document.createElement('td'); 
    var cookie_sales = this.hourly_cookie_sales[i];
    new_data.textContent = cookie_sales;
    table_parent.appendChild(new_data);
  }
};

var first_cookie_location = new Location('First and Pike', 6, 23, 65, 6.3, [], 'pike');
var second_cookie_location = new Location('Sea Tac Airport', 6, 3, 24, 1.2, [], 'seatac');
var third_cookie_location = new Location('Seattle Central', 6, 11, 38, 3.7, [], 'seattle');
var fourth_cookie_location = new Location('Capitol Hill', 6, 20, 38, 2.3, [], 'chill');
var fifth_cookie_location = new Location('Alki', 6, 2, 16, 4.6, [], 'alkis');

first_cookie_location.render();
second_cookie_location.render();
third_cookie_location.render();
fourth_cookie_location.render();
fifth_cookie_location.render();