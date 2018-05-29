require('dotenv').load({
    path: __dirname + '/.env'
});

var request = require('request');
var cheerio = require('cheerio');
var growl = require('notify-send');

var url = 'https://www.packtpub.com/packt/offers/free-learning';
var bookTitle;

//we need cookies for that, therefore let's turn JAR on
request = request.defaults({
    jar: true
});

console.log('----------- Packt Grab Started --------------');
growl.normal.notify('grab-packt', 'Packt Grab Started');
request(url, function(err, res, body) {
    if (err) {
        growl.normal.notify('grab-packt:', 'Request failed');
        console.error('Request failed');
        console.log('----------- Packt Grab Done --------------');
        return;
    }
    
    var $ = cheerio.load(body);
    bookTitle = $(".dotd-title").text().trim();
    growl.normal.notify('grab-packt: Book of the Day',bookTitle);
    console.debug('grab-packt: Book of the Day: ' + bookTitle);
    console.log('----------- Packt Grab Done --------------');
});
