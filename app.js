'use strict';
//Good use of Object Literals (no constructors allowed today); one for each store model; 
// properties/values and methods are correctly constructed and given meaningful names
// Main page meets requirements of the problem domain
// Use template literals in your JS logic to render the stores as lists on the sales page
var title = document.getElementById('cookie_title');
title.innerHTML= 'Cookie Sale';

function getRandomIntInclusive(min, max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

var first_cookie_location = {
  name: 'first and pike',
  min_customers: 23,
  max_customers: 65,
  avg_cookie_sales: 6.3,
  hourly_cookie_sales: []

};

first_cookie_location.render_pike_to_page = function() {
  var first_ul = document.getElementById('loc_pike');
  var first_li = document.createElement('li');
  first_li.textContent = 'Hourly Cookie Sales';
  first_ul.appendChild(first_li);
  for (var i = 0; i < this.hourly_cookie_sales.length; i++) {
    var new_li = document.createElement('li');    //change new_li variable
    var cookie_sales = this.hourly_cookie_sales[i];
    new_li.textContent = `Time ${i + 1} Cookies Sold: ${cookie_sales}`;
    first_ul.appendChild(new_li);
  }
};

first_cookie_location.cookies_sold_hourly = function (){
  for(var i = 0; i < 14; i++){
    var random_customer = getRandomIntInclusive(this.min_customers, this.max_customers);
    var random_cookie = random_customer * this.avg_cookie_sales;
    this.hourly_cookie_sales.push(random_cookie);
  }
};

first_cookie_location.cookies_sold_hourly();
first_cookie_location.render_pike_to_page();

var second_cookie_location = {
  name: 'sea tac airport',
  min_customers: 3,
  max_customers: 24,
  avg_cookie_sales: 1.2,
  hourly_cookie_sales: []
};
second_cookie_location.render_seatac_to_page = function() {
  var second_ul = document.getElementById('loc_seatac');
  var second_li = document.createElement('li');
  second_li.textContent = 'Hourly Cookie Sales';
  second_ul.appendChild(second_li);
  for (var i = 0; i < this.hourly_cookie_sales.length; i++) {
    var new_li = document.createElement('li');    //change new_li variable
    var cookie_sales = this.hourly_cookie_sales[i];
    new_li.textContent = `Time ${i + 1} Cookies Sold: ${cookie_sales}`;
    second_ul.appendChild(new_li);
  }
};

second_cookie_location.cookies_sold_hourly = function (){
  for(var i = 0; i < 14; i++){
    var random_customer = getRandomIntInclusive(this.min_customers, this.max_customers);
    var random_cookie = random_customer * this.avg_cookie_sales;
    this.hourly_cookie_sales.push(random_cookie);
  }
};

second_cookie_location.cookies_sold_hourly();
second_cookie_location.render_seatac_to_page();

var third_cookie_location = {
  name: 'seattle center',
  min_customers: 11,
  max_customers: 38,
  avg_cookie_sales: 3.7,
  hourly_cookie_sales: []
};

var fourth_cookie_location = {
  name: 'capitol hill',
  min_customers: 20,
  max_customers: 38,
  avg_cookie_sales: 2.3,
  hourly_cookie_sales: []
};

var fifth_cookie_location = {
  name: 'alki',
  min_customers: 2,
  max_customers: 16,
  avg_cookie_sales: 4.6,
  hourly_cookie_sales: []
};


