# nutty-log

[![npm](https://img.shields.io/npm/v/nutty-log.svg?style=flat-square)](https://www.npmjs.com/package/nutty-log)
[![npm](https://img.shields.io/npm/dt/nutty-log.svg?style=flat-square)](https://www.npmjs.com/package/nutty-log)

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

Display a debug message in console.

```javascript
log.debug('My debug message');
```

### log.info(message)

Display a info message in console.

```javascript
log.info('My info message');
```

### log.notice(message)

Display a notice message in console.

```javascript
log.notice('My notice message');
```

### log.warning(message)

Display a warning message in console.

```javascript
log.warning('My warning message');
```

### log.debug(message)

Display a debug message in console.

```javascript
log.debug('My debug message');
```

### log.debug(message)

Display a debug message in console.

```javascript
log.debug('My debug message');
```

## Related

- [nutty](https://github.com/nuttyjs/nutty) A small and minimal CLI framework.

## License

[MIT LICENSE](./LICENSE) &copy; Josemi Juanes.
