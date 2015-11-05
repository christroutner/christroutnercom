/*
Source: https://gist.github.com/fincluster/6145995
Yahoo Finance stock historical data, prices and details retrieval function written in Javascript, jQuery and YQL
v2013-08-05
(c) 2013 by Fincluster ltd - http://fincluster.com <dev@fincluster.com>
*/
(function($) {
    function getStock(opts, type, complete) {
        var defs = {
            desc: false,
            baseURL: 'http://query.yahooapis.com/v1/public/yql?q=',
            query: {
                quotes: 'select * from yahoo.finance.quotes where symbol = "{stock}" | sort(field="{sortBy}", descending="{desc}")',
                historicaldata: 'select * from yahoo.finance.historicaldata where symbol = "{stock}" and startDate = "{startDate}" and endDate = "{endDate}"'
            },
            suffixURL: {
                quotes: '&env=store://datatables.org/alltableswithkeys&format=json&callback=?',
                historicaldata: '&env=store://datatables.org/alltableswithkeys&format=json&callback=?'
            }
        };
 
        opts = opts || {};
 
        if (!opts.stock) {
            complete('No stock defined');
            return;
        }
 
        var query = defs.query[type]
        .replace('{stock}', opts.stock)
        .replace('{sortBy}', defs.sortBy)
        .replace('{desc}', defs.desc)
        .replace('{startDate}', opts.startDate)
        .replace('{endDate}', opts.endDate)
 
        var url = defs.baseURL + query + (defs.suffixURL[type] || '');
        $.getJSON(url, function(data) {
            var err = null;
            if (!data || !data.query) {
                err = true;
            }
            complete(err, !err && data.query.results);    });
    }
    window.getStock = getStock;
})(jQuery);
 
/* Usage Examples
getStock({ stock: 'AAPL' }, 'quotes', function(err, data) {
    console.log(data);
});

getStock({ stock: 'AAPL', startDate: '2013-01-01', endDate: '2013-01-05' }, 'historicaldata', function(err, data) {
    console.log(data);
});
*/


function getHistoricalStockData(ticker, startDate, endDate) {
  
  var stockData = [];
  getStock({ stock: ticker, startDate: startDate, endDate: endDate }, 'historicaldata', function(err, data) {
    
    //Assemble the relevant stock data into a temporary object. Push that object into the stockData array.
    for(var i = data.quote.length-1; i > 0; i--) {
      //debugger;
      var tempObj = {};
      tempObj.date = new Date(data.quote[i].Date);
      tempObj.val = Number(data.quote[i].Adj_Close);
      stockData.push(tempObj);
    }
    
    
    /*
    //Assemble the relevant stock data into a temporary object. Push that object into the stockData array.
    //Note: stockData is a JSON object.
    for(var i = 0; i < data.quote.length; i++) {
      //debugger;
      var tempObj = {};
      tempObj.date = new Date(data.quote[i].Date);
      tempObj.val = Number(data.quote[i].Adj_Close);
      stockData.push(tempObj);
    }
    */
  });
  
  return stockData;
}