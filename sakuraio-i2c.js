const I2c = require('i2c-bus')
const SakuraIO = require('sakuraio')
const debug = require('debug')('sakuraio-i2c')

const SAKURAIO_SLAVE_ADDR = 0x4F

function decorateI2c (bus) {
  var i = 0
  var request = Buffer.alloc(32)
  var response = Buffer.alloc(32)
  return SakuraIO.use({
    startWrite (cb) {
      i = 0
      process.nextTick(cb)
    },
    startWriteSync () {
      i = 0
    },
    endWrite (cb) {
      // request length is equal to the length of the datum in bytes (request[1])
      // + 1 byte for data length + 1 byte for parity check
      var buf = Buffer.alloc(request[1] + 2)
      request.copy(buf, 0, 1)
      debug('->', request[0], buf)
      bus.writeI2cBlock(SAKURAIO_SLAVE_ADDR, request[0], buf.length, buf, cb)
    },
    endWriteSync () {
      var buf = Buffer.alloc(request[1] + 2)
      request.copy(buf, 0, 1)
      debug('->', request[0], buf)
      bus.writeI2cBlockSync(SAKURAIO_SLAVE_ADDR, request[0], buf.length, buf)
    },
    sendByte (byte, cb) {
      request[i] = byte
      i += 1
      process.nextTick(cb)
    },
    sendByteSync (byte) {
      request[i] = byte
      i += 1
    },

    startRead (cb) {
      i = 0
      bus.readI2cBlock(SAKURAIO_SLAVE_ADDR, 32, 32, response, function (err) {
        if (err) cb(err)
        else {
          debug('<-', response)
          cb()
        }
      })
    },
    startReadSync () {
      i = 0
      bus.readI2cBlockSync(SAKURAIO_SLAVE_ADDR, 32, 32, response)
      debug('<-', response)
    },
    endRead (cb) {
      process.nextTick(cb)
    },
    endReadSync () {},
    receiveByte (cb) {
      i += 1
      cb(null, response[i-1])
    },
    receiveByteSync () {
      i += 1
      return response[i-1]
    }
  })
}

module.exports = {
  open (busNumber, cb) {
    var i2c = I2c.open(busNumber, function (err) {
      if (err) {
        cb(err)
      } else {
        cb(null, decorateI2c(i2c))
      }
    })
  },
  openSync (busNumber) {
    var i2c = I2c.openSync(busNumber)
    return decorateI2c(i2c)
  }
}
