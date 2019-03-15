'use strict';

var title = document.getElementById('cookie_title');
title.innerHTML= `Pat's Amazing Salmon Cookies`;
 
var hours_of_operation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var store_table = document.getElementById('stores');
var cookie_form = document.getElementById('cookie_store');
var new_stores = document.getElementById('new_store')
var number_of_stores = [];

function getRandomIntInclusive(min, max) { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
};

function Sales(name, min_customers, max_customers, avg_customers, hourly_cookie_sales, element_id) {
  this.name = name;
  this.min_customers = min_customers;
  this.max_customers = max_customers;
  this.hours_in_workday = 14;
  this.avg_customers = avg_customers;
  this.hourly_cookie_sales = hourly_cookie_sales;
  this.element_id = element_id;
  this.daily_sales_total = 0;
};

//random hourly cookie generator

Sales.prototype.random_cookie_number = function (){
  for(var i = 0; i < this.hours_in_workday; i++){
    var random_customer = getRandomIntInclusive(this.min_customers, this.max_customers);
    var random_cookie_number = random_customer * this.avg_customers;
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
  var store_table = document.getElementById('cookie_table')
  var new_row = document.createElement('tr');
  var new_data, cookie_sales;

  // Add header to row
  new_data = document.createElement('th'); 
  new_data.textContent = this.name;
  new_row.appendChild(new_data);

  // Add hourly cookie sales table data to row
  for (var k = 0; k < this.hourly_cookie_sales.length; k++) {
    new_data = document.createElement('td'); 
    cookie_sales = this.hourly_cookie_sales[k];
    new_data.textContent = cookie_sales;
    new_row.appendChild(new_data);
  }

  // Add total to row
  new_data = document.createElement('td');
  new_data.textContent = this.daily_sales_total;
  new_row.appendChild(new_data);
  store_table.appendChild(new_row);
};

//total store sales

function get_total_hourly_sales(stores_array) {
  var grand_total = 0;
  var total_hourly_sales, new_data;
  var store_table = document.getElementById('cookie_table')
  var new_row = document.createElement('tr');
  /**
   * Add an id called 'total's' to this table row so we can remove it later when adding a new store.
   */
  new_row.id = 'totals';

  var new_data;
  new_data = document.createElement('th'); 
  new_data.textContent = 'Total';
  new_row.appendChild(new_data);
  for (var l = 0; l < hours_of_operation.length; l++){
    total_hourly_sales = 0;
    for (var k = 0; k < stores_array.length; k++){
      total_hourly_sales += stores_array[k].hourly_cookie_sales[l];
    }
    grand_total += total_hourly_sales;
    new_data = document.createElement('td');
    new_data.textContent = total_hourly_sales;
    new_row.appendChild(new_data);
  }
    new_data = document.createElement('td');
    new_data.textContent = grand_total;
    new_row.appendChild(new_data);
    store_table.appendChild(new_row);
}

/**
 * Helper function to remove the old totals row before new row is added.
 */
function remove_totals_row() {
  document.getElementById('totals').remove();
}

//arguments going into parameters

var cookie_locations_array = [];

cookie_locations_array.push(new Sales('First and Pike', 23, 65, 6.3, [], 'pike'));  //Pike
cookie_locations_array.push(new Sales('Sea Tac Airport', 3, 24, 1.2, [], 'seatac')); //Seatac Airport
cookie_locations_array.push(new Sales('Seattle Central', 11, 38, 3.7, [], 'seattle')); //Seattle Central
cookie_locations_array.push(new Sales('Capitol Hill', 20, 38, 2.3, [], 'chill')); //Capitol Hill
cookie_locations_array.push(new Sales('Alki', 2, 16, 4.6, [], 'alkis')); //Alki

// Go through all the store location objects in the stores array and render them to the page.

for (var l = 0; l < cookie_locations_array.length; l++) {
    cookie_locations_array[l].render();
}

function add_new_store(event) {
  // Prevent default submission from submit button
  event.preventDefault();

  // Get values from form
  var name = event.target.store_name.value;
  var min_customers = event.target.min_customers.value;
  var max_customers = event.target.max_customers.value;
  var avg_customers = event.target.avg_customers.value;

  // Create new OBJECT instance
  var add_store = new Sales(name, min_customers, max_customers, avg_customers, [], 'store');

  console.log(add_store);

  // Push new store location object into current store location array
  cookie_locations_array.push(add_store);
  console.log(add_store.hourly_cookie_sales)
  add_store.render();
  /**
   * Remove the OLD totals row, and then recalculate the new totals row with the new store in the cookie locations array.
   */
  remove_totals_row();
  get_total_hourly_sales(cookie_locations_array);
}
get_total_hourly_sales(cookie_locations_array);
cookie_store.addEventListener('submit', add_new_store);