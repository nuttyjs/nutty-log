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
    //Initialize the message
    var message = '';

    //Check for object
    if(typeof text === 'object')
    {
      //Read the object
      for(var key in text)
      {
        //Get the value
        //var value = JSON.stringify(text[key]);
        var value = text[key];

        //Build the message
        message = message + log.message(level, key + ' : ' + value);
      }
    }
    else
    {
      //Get the simple message
      message = log.message(level, text);
    }

    //Check the log level
    if(log.levels[level].index >= log.levels[log._level].index)
    {
      //Get the level color
      var color = log.levels[level].color;

      //Get the stream
      var stream = (log.levels[level].print === 'error') ? process.stderr : process.stdout;

      //Split the message
      message.split('\n').forEach(function(msg)
      {
        //Check for empty message
        if(msg.trim() === ''){ return true; }

        //Get the index
        var index = msg.indexOf('] [');

        //Get the message with colors
        msg = colors.gray(msg.substring(0, index + 1)) + colors[color](msg.substring(index + 1)) + '\n';

        //Print the message
        stream.write(msg);
      });
    }

    //Return the message
    return message;
  };
});

//Parse a list of messages
log.parse = function(messages)
{
  //Check for string
  if(typeof messages === 'string')
  {
    //Contert into array
    messages = messages.replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n');
  }

  //Initialize the output list
  var list = [];

  //Read all the messages
  messages.forEach(function(el)
  {
    //Initialize the output object
    var obj = {};

    //Check the first character
    if(el.charAt(0) !== '['){ return true; }

    //Get the position of the ] [
    var index1 = el.indexOf('] [');

    //Check the index value
    if(index1 === -1){ return true; }

    //Get the time
    obj.time = el.substring(1, index1);

    //Check the length
    if(obj.time.length !== 19){ return true; }

    //Get the next ]
    var index2 = el.indexOf(']', index1 + 1);

    //Check for no index
    if(index2 === -1){ return true; }

    //Get the level
    obj.level = el.substring(index1 + 3, index2).toLowerCase();

    //Check the level value
    if(typeof log.levels[obj.level] === 'undefined'){ return true; }

    //Save the message
    obj.message = el.substring(index2 + 1).trim();

    //Add to the list
    list.push(obj);
  });

  //Return the list of messages
  return list;
};

//Exports to node
module.exports = log;
