//Import dependencies
var colors = require('colors/safe');

//Log object
var log = {};

//Add the log levels
var level_list = {};
level_list.fatal = { index: 5, color: 'red', print: 'error' };
level_list.error = { index: 4, color: 'red', print: 'error' };
level_list.warning = { index: 3, color: 'yellow', print: 'error' };
level_list.notice = { index: 2, color: 'blue', print: 'out' };
level_list.info = { index: 1, color: 'green', print: 'out' };
level_list.debug = { index: 0, color: 'gray', print: 'out' };

//Parse a log level
var level_parse = function(level)
{
  //Convert to lower case
  level = level.toLowerCase();

  //Check for no level
  if(typeof level_list[level] === 'undefined'){ return 'debug'; }

  //Return the level
  return level;
};

//Minimum level
log._level = 'debug';

//Set the minimum level
log.level = function(level)
{
  //Save the log level
  log._level = level_parse(level);
};

//Build a log message
log.message = function(level, message)
{
  //Parse the level
  level = level_parse(level);

  //Get the color
  var color = level_list[level].color;

  //Get the actual date
  var d = new Date();

  //Get the year-month-day
  var date_day = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2);

  //Get the date time
  var date_time = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2);

  //Build and return the message
  return colors.gray(' [' + date_day + ' ' + date_time + ']') + colors[color](' [' + level.toUpperCase() + '] ' + message) + '\n';
};

//Display a message
Object.keys(level_list).forEach(function(level)
{
  //Add the log level
  log[level] = function(text)
  {
    //Get the message
    var message = log.message(level, text);

    //Check the log level
    if(level_list[level].index >= level_list[log._level].index)
    {
      //Check for display on stderr
      (level_list[level].print === 'error') ? process.stderr.write(message) : process.stdout.write(message);
    }

    //Return the message
    return message;
  };
});

//Exports to node
module.exports = log;
