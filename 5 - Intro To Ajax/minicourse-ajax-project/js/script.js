
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
    //console.log(streetURL);
    $body.append('<img class="bgimg" src="' + streetURL + '">');

    // NYTimes
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
    url += city;
    url += '&sort=newest&api-key=' + "d7ddee8c903f4e2cbcb2474087b22b4c";

    $.getJSON(url, function(data) {
      var docs = data.response.docs;
      
      $nytHeaderElem.text('New York Times Articles About ' + city);
      
      for(var i=0; i<docs.length; i++) {
        var item = '<li class="article"><a href="' + docs[i].web_url + '">' + docs[i].headline.main + "</a><p>" + docs[i].snippet + "</p></li>" ;
        $nytElem.append(item);
      }
    })
    .error(function() {
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
  
    // wiki
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback-wikiCallback";
  
    var wikiRequestTimeout = setTimeout(function() {
      $wikiElem.text("failed to get wikipedia resources");
    }, 8000);
  
    $.ajax(url, {
      dataType: 'jsonp',
      success: function(response) {
        console.log(response);
        var items = response[1];
        
        for (var i=0; i < items.length; i++) {
          var url = 'http://en.wikipedia.org/wiki/' + items[i];
          $wikiElem.append('<li><a href="' + url + '">' + items[i] + '</a></li>');
        };
        
        clearTimeout(wikiRequestTimeout);
      }
    })

    return false;
};

$('#form-container').submit(loadData);
