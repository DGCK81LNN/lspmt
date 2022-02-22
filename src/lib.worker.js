/// <reference lib="WebWorker" />
/// <reference types="./types" />

(function () {
  self.onmessage = async ({ data: { nonce, action, data } }) => {
    console.log("子线程收到请求", { nonce, action, data })
    try {
      var result = process(action, data)
    } catch (err) {
      self.postMessage({ nonce, errorOccurred: true, data: err })
      return
    }
    self.postMessage(
      { nonce, errorOccurred: false, data: result.data },
      result.transfer
    )
  }
  
  /**
   * @template {ActionType} T
   * @param {T} action
   * @param {RequestData<T>} data
   * @returns {Promise<{ data: ResponseData<T>, transfer: Transferable[] }>}
   */
  function process(action, data) {
    switch (action) {
      case "check-support": {
        return { data: checkSupport() }
      }
      case "wytk-bitmap":
      case "wytk-imgdata": {
        let { buffer, name, type } = decodeWYTK(data)
        return { data: new File([buffer], name, { type }), transfer: [buffer] }
      }
      default: {
        throw "Invalid action"
      }
    }
  }
  
  const textDecoder = new TextDecoder()
  
  function checkSupport() {
    if (typeof createImageBitmap !== "function") return false
    if (typeof OffscreenCanvas !== "function") return false
    try {
      let cvs = new OffscreenCanvas(1, 1)
      cvs.getContext("2d")
    } catch (_) {
      return false
    }
    return true
  }
  
  /**
   * @param {ImageBitmap | ImageData} data
   */
  function decodeWYTK(data) {
    const metaMaxSize = 4096
    const mimeCorrect = new Map([
      [".mp4", "video/mp4"],
      [".webm", "video/webm"],
      [".zip", "application/zip"],
      [".txt", "text/plain"],
    ])
  
    /**
     * 比特队列
     */
    class BitQueue32 {
      constructor() {
        this._value = 0
        this._length = 0
      }
  
      get length() {
        return this._length
      }
  
      /**
       * 入队列指定长度的比特串；最高位先进
       * @param {number} value 入队列的数据；只有低`len`位有效
       * @param {number} len 入队列数据的比特数，默认为8；此参数只有低5位有效
       */
      enqueue(value, len = 8) {
        len &= 31
        value &= ~(-1 << len)
        if (this._length + len > 32)
          throw new RangeError("BitQueue32.prototype.enqueue(): Overflow")
        this._length += len
        this._value <<= len
        this._value |= value
      }
      /**
       * 出队列指定长度的比特串；最高位先出
       * @param len 出队列数据的比特数，默认为8；此参数只有低5位有效
       * @returns 出队列的数据
       */
      dequeue(len = 8) {
        len &= 31
        var newLength = this._length - len
        var result
        if (newLength < 0) {
          result = this._value << -newLength
          this._value = 0
          this._length = 0
        } else {
          result = this._value >>> newLength
          this._value &= ~(-1 << newLength)
          this._length = newLength
        }
        return result
      }
    }
  
    return (decodeWYTK = function decodeWYTK(data) {
      if (typeof ImageBitmap === "function" && data instanceof ImageBitmap) {
        let cvs = new OffscreenCanvas(data.width, data.height)
        /** @type {CanvasRenderingContext2D} */
        let cxt = cvs.getContext("2d")
        cxt.drawImage(data, 0, 0)
        var imgdata = cxt.getImageData(0, 0, cvs.width, cvs.height)
      } else if (data instanceof ImageData) {
        var imgdata = data
      } else throw new TypeError("decodeWYTK(): wrong argument type")
  
      // 识别坦克
      var mode = imgdata.data[2] & 7
      if (
        (imgdata.data[0] & 7) !== 0 ||
        (imgdata.data[1] & 7) !== 3 ||
        mode === 0
      )
        throw new Error("decodeWYTK(): 无法识别坦克")
  
      // 读取坦克元数据
      var pixelCount = imgdata.width * imgdata.height
      var bitBuffer = new BitQueue32()
      var i = 1,
        j = 0,
        bytes = new Uint8Array(metaMaxSize)
      while (i < pixelCount) {
        while (bitBuffer.length < 8) {
          bitBuffer.enqueue(imgdata.data[i << 2], mode)
          bitBuffer.enqueue(imgdata.data[(i << 2) | 1], mode)
          bitBuffer.enqueue(imgdata.data[(i << 2) | 2], mode)
          ++i
        }
        var byte = bitBuffer.dequeue()
        if (byte === 0) break
        bytes[j++] = byte
        if (j >= metaMaxSize)
          throw new Error(`decodeWYTK(): 元数据过长（超过 ${metaMaxSize} 字节）`)
      }
      var fileMetadata = textDecoder.decode(bytes.subarray(0, j)).split("\x01")
      var [fileSizeStr, fileName, fileType] = fileMetadata
      console.log({ fileSizeStr, fileName, fileType })
      var fileSize = Number(fileSizeStr)
      if (
        fileMetadata.length < 3 ||
        isNaN(fileSize) ||
        (0 | fileSize) !== fileSize || // 判断是否为32位整数
        fileSize < 0
      )
        throw new Error("坦克元数据无效")
  
      // 读取里图
      bytes = new Uint8Array(fileSize)
      j = 0
      while (i < pixelCount && j < fileSize) {
        while (bitBuffer.length < 8) {
          bitBuffer.enqueue(imgdata.data[i << 2], mode)
          bitBuffer.enqueue(imgdata.data[(i << 2) | 1], mode)
          bitBuffer.enqueue(imgdata.data[(i << 2) | 2], mode)
          ++i
        }
        var byte = bitBuffer.dequeue()
        bytes[j++] = byte
      }
  
      // 纠正MIME类型
      for (let [mime, extension] of mimeCorrect) {
        if (fileName.endsWith(extension)) {
          fileType = mime
          break
        }
      }
  
      return {
        buffer: bytes.buffer,
        name: fileName,
        type: fileType,
      }
    })(data)
  }  
})()
