const I2c = require('i2c-bus')
const SakuraIO = require('sakuraio')

const SAKURAIO_SLAVE_ADDR = 0x4F

function decorateI2c (bus) {
  var i = 0
  var request = Buffer.alloc(32)
  var response = Buffer.alloc(32)
  return SakuraIO.use({
    startWrite (cb) {
      i = 0
      cb()
    },
    startWriteSync () {
      i = 0
    },
    endWrite (cb) {
      // TODO
      cb()
    },
    endWriteSync () {
      var buf = Buffer.alloc(request[1] + 2)
      request.copy(buf, 0, 1)
      console.log('->', buf)
      bus.writeI2cBlockSync(SAKURAIO_SLAVE_ADDR, request[0], buf.length, buf)
    },
    sendByte (byte, cb) {
      i += 1
      request[i] = byte
      cb()
    },
    sendByteSync (byte) {
      i += 1
      request[i] = byte
    },

    startRead (cb) {
      i = 0
      cb()
    },
    startReadSync () {
      i = 0
      bus.readI2cBlockSync(SAKURAIO_SLAVE_ADDR, 32, 32, response)
      console.log('<-', response)
    },
    endRead (cb) {
      // TODO
      cb()
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
