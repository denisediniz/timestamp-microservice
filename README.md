# Timestamp Microservice

## Notes
1. The API endpoint is `GET https://skitter-comb.glitch.me/api/timestamp/:date_string?`
2. If the date string is **empty** the service uses the current timestamp.
3. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <UNIX_FORMAT_DATE>, "utc" : <UTC_FORMAT_DATE> }
4. If the date string is **invalid** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`.

### Example Usage
* https://skitter-comb.glitch.me/api/timestamp/2015-12-15
* https://skitter-comb.glitch.me/api/timestamp/1450137600000

### Example Output
* { "unix": 1450137600, "natural": "December 15, 2015" }