// main.js

var APP_ID = 'bd929bae610d45e8a67ba30a71baa00b';
var ep;
var currencies;

$(document).on('ready', function() {
  alert('I am working.');
  // alert(ep.currencies);
  // init();
});

// Currency Swapping
$("#swapValues").on("click", function(e) {
  e.preventDefault();
  swapValues();
});

// Conversion
$("#convert").on("click", function(e) {
  e.preventDefault();
  convert();
});

function init()
{dataType
  ep = new Endpoint();
  $("#from").append("<option value='CAD'>Canada</option>").find('option[value=CAD]').prop('selected', true).change();
  $("#to").append("<option value='ZMW'>Zambia</option>").find('option[value=ZMW]').prop('selected', true).change();
  // $.get(
  //       ep.currencies,
  //       {app_id : APP_ID},
  //       function(data, status) {
  //         alert(status);
  //         for(country in data)
  //         {
  //           // Build "From" option list
  //           if(country !== "CAD")
  //           {
  //             $("#from").append("<option value='" + country + "'>"
  //                 + country + " - " + data[country] + "</option>");
  //           }
  //           else
  //           {
  //             $("#from").append("<option value='" + country + "'>"
  //                 + country + " - " + data[country] + "</option>");
  //             $('#from option[value=' + country + ']').prop('selected', true).change();
  //           }
  //
  //           // Build "To" option list
  //           if(country !== "ZMW")
  //           {
  //             $("#to").append("<option value='" + country + "'>"
  //                 + country + " - " + data[country] + "</option>");
  //           }
  //           else
  //           {
  //             $("#to").append("<option value='" + country + "'>"
  //                 + country + " - " + data[country] + "</option>");
  //             $('#to option[value=' + country + ']').prop('selected', true).change();
  //
  //             $("#ui-result").text(country + " ");
  //           }
  //         }
  //       },'json')
  //         .done(function() {
  //           alert('Success');
  //         })
  //         .fail(function() {
  //           alert('Error');
  //         })
  //         .always(function() {
  //           alert('Complete');
  //         });

  $('#to').on('change', function(e) {
    $('#ui-result').text($(this).find('option:selected').val());
  });
} // end init()

function convert()
{
  if($("#amount").val() !== "")
  {
    var amount = $("#amount").val();
    var fromValue = $("#from").val().toUpperCase();
    var toValue = $("#to").val().toUpperCase();

    // Parse the baseURL string
    // var url = baseURL.replace(":value", amount).replace(":from", fromValue).replace(":to", toValue);
    $.get(ep.latest, {app_id : APP_ID}, function(data) {
      // Conversion algorithm
      // (base/fromValue) * toValue
      var quotient = (1/data.rates[fromValue]) * data.rates[toValue] * amount;

      $("#ui-result").html(toValue + " " + quotient.toFixed(2));
    });
  }
  else
  {
    $("#result").html("<p>You must enter a non-negative number for the amount.</p>");
  }
} // end convert()

function swapValues()
{
  // Cache the old from value
  var from =  document.querySelector('#from');
  var to =  document.querySelector('#to');
  var fromIndex = from.selectedIndex;
  var toIndex = to.selectedIndex;

  // Swap the indeces
  from.selectedIndex = toIndex;
  to.selectedIndex = fromIndex;

  // Update options views
  $('#from').change();
  $('#to').change();
}

function Endpoint()
{
  this.base = 'https://openexchangerates.org/api/';
  this.latest = this.base + 'latest.json';
  this.historical = this.base + 'historical/YYYY-MM-DD.json';
  this.currencies = this.base + 'currencies.json';
  this.time = this.base + 'time-series.json';
  this.convert = this.base + 'convert/:value/:from/:to';
}
