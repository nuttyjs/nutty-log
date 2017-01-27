# nutty-log

[![npm](https://img.shields.io/npm/v/nutty-log.svg?style=flat-square)](https://www.npmjs.com/package/nutty-log)
[![npm](https://img.shields.io/npm/dt/nutty-log.svg?style=flat-square)](https://www.npmjs.com/package/nutty-log)
[![npm](https://img.shields.io/npm/l/nutty-log.svg?style=flat-square)](https://github.com/nuttyjs/nutty-log)

> Logger for cli apps and nutty middlewares  

![Demo](https://raw.githubusercontent.com/nuttyjs/nutty-log/master/media/screenshot.png)

## Install

```
npm install --save nutty-log
```

## Usage

```javascript
var log = require('nutty-log');

//Set the minimum log level
log.level('info');

//Print an error message
log.error('My error message'); // -->  [2017/01/26 11:39:54] [ERROR] My error message

//Print a debug message
log.debug('My debug message'); // Not printed, because log level is set to info or higher.
```

## Levels

- Level 5: `fatal`.
- Level 4: `error`.
- Level 3: `warning`.
- Level 2: `notice`.
- Level 1: `info`.
- Level 0: `debug`.

## Api

### log.level(level)

Set the minimum log level. Only messages with higher level will be printed in console.

### log.debug(message)

Display a debug message in console. The message will be printed

```javascript
log.debug('My debug message'); // -->  [2017/01/26 12:00:48] [DEBUG] My debug message
```

### log.info(message)

Display an info message in console.

```javascript
log.info('My info message'); // -->  [2017/01/26 12:00:48] [INFO] My info message
```

### log.notice(message)

Display a notice message in console.

```javascript
log.notice('My notice message'); // -->  [2017/01/26 12:00:48] [NOTICE] My notice message
```

### log.warning(message)

Display a warning message in `process.stderr`.

```javascript
log.warning('My warning message'); // -->  [2017/01/26 12:00:48] [WARNING] My warning message
```

### log.error(message)

Display an error message in `process.stderr`.

```javascript
log.error('My error message'); // -->  [2017/01/26 12:00:48] [ERROR] My error message
```

### log.fatal(message)

Display a fatal message in `process.stderr`.

```javascript
log.fatal('My fatal message'); // -->  [2017/01/26 12:00:48] [FATAL] My fatal message
```

### log.message(level, message)

Returns a string with the structure `[yyyy/mm/dd hh:mm:ss] [LEVEL] message`.

### log.json(level, obj)

Prints a JSON object in console.

```javascript
//Object to print in console
var obj = { key1: 'My value1', key2: [ 1, 2, 3 ], key3: true };

//Print in console
log.json('warning', obj);

//Will print:
// [2017/01/27 15:28:19] [WARNING] key1 : My value1
// [2017/01/27 15:28:19] [WARNING] key2 : [1,2,3]
// [2017/01/27 15:28:19] [WARNING] key3 : true
```

## Related

- [nutty](https://github.com/nuttyjs/nutty) A small and minimal CLI framework.

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
