'use strict';

var title = document.getElementById('cookie_title');
title.innerHTML= `Pat's Amazing Salmon Cookies`;
 
var hours_of_operation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var store_table = document.getElementById('stores');
var cookie_form = document.getElementById('cookie_store');

function getRandomIntInclusive(min, max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

function Sales(name, starting_hours, min_customers, max_customers, avg_cookie_sales, hourly_cookie_sales, element_id) {
  this.name = name;
  this.starting_hours = starting_hours;
  this.min_customers = min_customers;
  this.max_customers = max_customers;
  this.hours_in_workday = 14;
  this.avg_cookie_sales = avg_cookie_sales;
  this.hourly_cookie_sales = hourly_cookie_sales;
  this.element_id = element_id;
  this.daily_sales_total = 0;
};

//random hourly cookie generator

Sales.prototype.random_cookie_number = function (){
  for(var i = 0; i < this.hours_in_workday; i++){
    var random_customer = getRandomIntInclusive(this.min_customers, this.max_customers);
    var random_cookie_number = random_customer * this.avg_cookie_sales;
    var hourly_rounded_sales = Math.floor(random_cookie_number);
    this.hourly_cookie_sales.push(hourly_rounded_sales);
    this.daily_sales_total += hourly_rounded_sales;
  }
};

//total hourly sales stores

Sales.prototype.stores_hourly_sales = function(){
  var total_parent = document.getElementById('totals')
  for(var j = 0; j < this.hours_in_workday.length; j++){
    total_cookies += this.hourly_cookie_sales[j];
    var hourly_totals = document.createElement('td');
    hourly_totals.textContent = hourly_totals;
    total_parent.appendChild(hourly_totals);
  }
};

//render to page

Sales.prototype.render = function(){
  this.random_cookie_number();
  var table_parent = document.getElementById(this.element_id);
  var new_data, cookie_sales;
  for (var k = 0; k < this.hourly_cookie_sales.length; k++) {
    new_data = document.createElement('td'); 
    cookie_sales = this.hourly_cookie_sales[k];
    new_data.textContent = cookie_sales;
    table_parent.appendChild(new_data);
  }
  new_data = document.createElement('td');
  new_data.textContent = this.daily_sales_total;
  table_parent.appendChild(new_data);
};

//total store sales

function get_total_hourly_sales(stores_array) {
  var grand_total = 0;
  var total_hourly_sales, new_data;
  var table_parent = document.getElementById('totals');
  for (var l = 0; l < hours_of_operation.length; l++){
    total_hourly_sales = 0;
    for (var k = 0; k < stores_array.length; k++){
      total_hourly_sales += stores_array[k].hourly_cookie_sales[l];
    }
    grand_total += total_hourly_sales;
    new_data = document.createElement('td');
    new_data.textContent = total_hourly_sales;
    table_parent.appendChild(new_data);
  }
    new_data = document.createElement('td');
    new_data.textContent = grand_total;
    table_parent.appendChild(new_data);
}

//arguments going into parameters

var cookie_locations_array = [];

cookie_locations_array.push(new Sales('First and Pike', 6, 23, 65, 6.3, [], 'pike'));  //Pike
cookie_locations_array.push(new Sales('Sea Tac Airport', 6, 3, 24, 1.2, [], 'seatac')); //Seatac Airport
cookie_locations_array.push(new Sales('Seattle Central', 6, 11, 38, 3.7, [], 'seattle')); //Seattle Central
cookie_locations_array.push(new Sales('Capitol Hill', 6, 20, 38, 2.3, [], 'chill')); //Capitol Hill
cookie_locations_array.push(new Sales('Alki', 6, 2, 16, 4.6, [], 'alkis')); //Alki

//loop render

for (var l = 0; l < cookie_locations_array.length; l++) {
    cookie_locations_array[l].render();
}

get_total_hourly_sales(cookie_locations_array);