const SakuraIOI2c = require('../sakuraio-i2c')

const BUS_NO = 2

SakuraIOI2c.open(BUS_NO, function (err, bus) {
  if (err) throw err
  else {
    bus.getConnectionStatus(function (err, status) {
      if (err) throw err
      console.log('Connection status', status.ok ? 'OK' : 'DOWN')
    })
    bus.getSignalQuality (function (err, quality) {
      if (err) throw err
      console.log('Connection quality', quality)
    })
    bus.echoBack(Buffer.from('Hello'), function (err, echo) {
      if (err) throw err
      console.log(echo.toString())
    })
  }
})
