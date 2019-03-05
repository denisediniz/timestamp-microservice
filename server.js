// init project
const express = require('express'),
    moment = require('moment'),
    app = express();

// enable CORS so that the API is remotely testable
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); // some legacy browsers choke on 204

// timestamp endpoint
app.get('/api/timestamp/:date_string?', (req, res) => {

    let dateString  = req.params.date_string,
        handleDate  = (value, el, format) => {
            let result;
            
            switch(value) {
                case 'unix':
                result = Number(moment(el).format('x'));
                break;
                case 'utc':
                result = moment.utc(el).toDate().toUTCString();
                break;
                case 'valid':
                default:
                result = moment(el, format).isValid();
                break;
            }
        
            return result;
        },
        unixDate    = handleDate('unix'),
        utcDate     = handleDate('utc');
    
    if(dateString !== undefined) {
        switch(true) {
            case handleDate('valid', Number(dateString)):
                unixDate    = handleDate('unix', Number(dateString));
                utcDate     = handleDate('utc', unixDate);
                break;
            case handleDate('valid', dateString, moment.ISO_8601):
                unixDate    = handleDate('unix', dateString);
                utcDate     = handleDate('utc', dateString);
                break;
            default:
                unixDate    = null;
                utcDate     = 'Invalid Date';
        }
    }

    res.json({'unix': unixDate, 'utc': utcDate}); 
});

//other requests
app.get('*', (req, res) => {
    res.redirect('/api/timestamp');
});

// listen for requests
var listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your api is listening on port ' + listener.address().port);
});