
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var form_data = $('#form-container').serializeArray();
    var street = form_data[0]['value'];
    var city = form_data[1]['value'];
    
    var streetURL = "http://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + street + ", " + city;
    console.log(streetURL);
    $body.append('<img class="bgimg" src="' + streetURL + '">');

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
