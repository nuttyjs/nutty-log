//Import dependencies
var colors = require('colors/safe');

//Log object
var log = {};

//Add the log levels
log.levels = {};
log.levels.fatal = { index: 5, color: 'red', print: 'error' };
log.levels.error = { index: 4, color: 'red', print: 'error' };
log.levels.warning = { index: 3, color: 'yellow', print: 'error' };
log.levels.notice = { index: 2, color: 'blue', print: 'out' };
log.levels.info = { index: 1, color: 'green', print: 'out' };
log.levels.debug = { index: 0, color: 'gray', print: 'out' };

//Parse a log level
log._parse = function(level)
{
  //Convert to lower case
  level = level.toLowerCase();

  //Check for no level
  if(typeof log.levels[level] === 'undefined'){ return 'debug'; }

  //Return the level
  return level;
};

//Minimum level
log._level = 'debug';

//Set the minimum level
log.level = function(level)
{
  //Save the log level
  log._level = log._parse(level);
};

//Build a log message
log.message = function(level, message)
{
  //Parse the level
  level = log._parse(level);

  //Get the actual date
  var d = new Date();

  //Get the year-month-day
  var date_day = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

  //Get the date time
  var date_time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);

  //Build and return the message
  return '[' + date_day + ' ' + date_time + '] [' + level.toUpperCase() + '] ' + message + '\n';
};

//Display a message
Object.keys(log.levels).forEach(function(level)
{
  //Add the log level
  log[level] = function(text)
  {
    //Get the message
    var message = log.message(level, text);

    //Check the log level
    if(log.levels[level].index >= log.levels[log._level].index)
    {
      //Get the level color
      var color = log.levels[level].color;

      //Get the index
      var index = message.indexOf('] [');

      //Get the message with colors
      var msg = colors.gray(message.substring(0, index + 1)) + colors[color](message.substring(index + 1));

      //Check for display on stderr or stdout
      (log.levels[level].print === 'error') ? process.stderr.write(msg) : process.stdout.write(msg);
    }

    //Return the message
    return message;
  };
});

//Print a json in console
log.json = function(level, obj)
{
  //Get the object keys
  var keys = (Array.isArray(obj) === false) ? Object.keys(obj) : Array.apply(null, { length: obj.length }).map(Number.call, Number);

  //Output messages
  var out = [];

  //Read all the keys
  for(var i = 0; i < keys.length; i++)
  {
    //Get the key
    var key = keys[i];

    //Get the value
    var value = obj[key];

    //Check the value
    if(typeof value === 'object'){ value = JSON.stringify(value); }

    //Print the message in console and return
    var message = log[level](key + ' : ' + value);

    //Save the message
    out.push(message);
  }

  //Return the messages list
  return out.join('');
};

//Exports to node
module.exports = log;
