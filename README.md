# API specification

## sakuraio.getConnectionStatus()

* Returns any of the following string:
00h エラーなし
01h 圏外
02h 接続エラー
03h 意図しない切断

// Common
uint8_t getConnectionStatus();
## getSignalQuality()

## getDateTime(cb)

* cb: function(err, date)

Where `date` is a Date instance.

uint8_t echoback(uint8_t length, uint8_t *data, uint8_t *response);

// Send
uint8_t enqueueTx(uint8_t ch, int32_t value, uint64_t offset);
uint8_t enqueueTx(uint8_t ch, uint32_t value, uint64_t offset);
uint8_t enqueueTx(uint8_t ch, int64_t value, uint64_t offset);
uint8_t enqueueTx(uint8_t ch, uint64_t value, uint64_t offset);
uint8_t enqueueTx(uint8_t ch, float value, uint64_t offset);
uint8_t enqueueTx(uint8_t ch, double value, uint64_t offset);
uint8_t enqueueTx(uint8_t ch, uint8_t value[8], uint64_t offset);
uint8_t enqueueTx(uint8_t ch, int32_t value);
uint8_t enqueueTx(uint8_t ch, uint32_t value);
uint8_t enqueueTx(uint8_t ch, int64_t value);
uint8_t enqueueTx(uint8_t ch, uint64_t value);
uint8_t enqueueTx(uint8_t ch, float value);
uint8_t enqueueTx(uint8_t ch, double value);
uint8_t enqueueTx(uint8_t ch, uint8_t value[8]);
uint8_t sendImmediatelyRaw(uint8_t ch, uint8_t type, uint8_t length, uint8_t *data, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, int32_t value, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, uint32_t value, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, int64_t value, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, uint64_t value, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, float value, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, double value, uint64_t offset);
uint8_t sendImmediately(uint8_t ch, uint8_t value[8], uint64_t offset);
uint8_t sendImmediately(uint8_t ch, int32_t value);
uint8_t sendImmediately(uint8_t ch, uint32_t value);
uint8_t sendImmediately(uint8_t ch, int64_t value);
uint8_t sendImmediately(uint8_t ch, uint64_t value);
uint8_t sendImmediately(uint8_t ch, float value);
uint8_t sendImmediately(uint8_t ch, double value);
uint8_t sendImmediately(uint8_t ch, uint8_t value[8]);
uint8_t getTxQueueLength(uint8_t *available, uint8_t *queued);
uint8_t clearTx();
uint8_t getTxStatus(uint8_t *queue, uint8_t *immediate);
uint8_t send();

// Receive
uint8_t dequeueRx(uint8_t *ch, uint8_t *type, uint8_t *value, int64_t *offset);
uint8_t peekRx(uint8_t *ch, uint8_t *type, uint8_t *value, int64_t *offset);
uint8_t getRxQueueLength(uint8_t *available, uint8_t *queued);
uint8_t clearRx();

// File download
uint8_t startFileDownload(uint16_t fileId);
uint8_t cancelFileDownload();
uint8_t getFileMetaData(uint8_t *status, uint32_t *totalSize, uint64_t *timestamp, uint32_t *crc);
uint8_t getFileDownloadStatus(uint8_t *status, uint32_t *currentSize);
uint8_t getFileData(uint8_t *size, uint8_t *data);

// Operation
uint16_t getProductID();
uint8_t getUniqueID(char *data);
uint8_t getFirmwareVersion(char *data);
uint8_t unlock();
uint8_t updateFirmware();
uint8_t getFirmwareUpdateStatus();
uint8_t reset();
