# node-sakuraio-i2c

SAKURA Internet IoT Communication Module Library for NodeJS using I2c bus.
Should work on most Linux board like the Raspberry Pi, C.H.I.P., BeagleBone
or Intel Edison. All methods have asynchronous and synchronous forms.

Currently only Node 7 or more are supported (it may work on Node 6).
I2c communication is handled through [i2c-bus](https://github.com/fivdi/i2c-bus#busreadbyteaddr-cmd-cb).
Please refer to i2c-bus documentation if you meet compilation issues or for
I2c setup.

# Disclaimer

This project is not affiliated with sakura.io and is licensed under the very
permissive ISC license. Use it at your own risk.

This is an alpha version so the API may not be stable yet!

# Installation

```
$ npm install sakuraio-i2c
```

# Example

## Asynchronous example

```js
const SakuraIOI2c = require('sakuraio-i2c')

const BUS_NO = 2

SakuraIOI2c.open(BUS_NO, function (err, bus) {
  if (err) throw err
  else {
    bus.getConnectionStatus(function (err, status) {
      console.log('Connection status', status)
    })
  }
})
```

## Synchronous example

```js
const SakuraIOI2c = require('sakuraio-i2c')

const BUS_NO = 2

var bus = SakuraIOI2c.openSync(BUS_NO)
var status = bus.getConnectionStatusSync()
console.log(status)
```

# API specification

## SakuraIOI2c.open(busNo, cb)
* busNo: I2c bus number (integer)
* cb: function (err, bus)
  * bus: Bus object

## SakuraIOI2c.openSync(busNo)
* busNo: I2c bus number (integer)
* returns: Bus object

The returned bus object can the be used to communicate with the SakuraIO module.
Documentation regarding the bus object is bound in the [node-sakuraio](https://github.com/malikolivier/node-sakuraio)
README.
