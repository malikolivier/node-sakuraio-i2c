const I2c = require('i2c-bus')
const SakuraIO = require('sakuraio')

const SAKURAIO_SLAVE_ADDR = 0x4F

function decorateI2c (bus) {
  return SakuraIO.use({
    sendByte (byte, cb) {
      bus.sendByte(SAKURAIO_SLAVE_ADDR, byte, cb)
    },
    sendByteSync (byte) {
      bus.sendByteSync(SAKURAIO_SLAVE_ADDR, byte)
    },

    receiveByte (cb) {
      bus.receiveByte(SAKURAIO_SLAVE_ADDR, cb)
    },
    receiveByteSync () {
      return bus.receiveByteSync(SAKURAIO_SLAVE_ADDR)
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
