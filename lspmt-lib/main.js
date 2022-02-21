/// <reference types="./types" />

window.LSPMT = null
window._LSPMTLoadPromise = (async function () {
  const worker = (window.worker = new Worker("worker.js", {
    name: "lspmt-worker",
  }))
  const textDecoder = new TextDecoder()

  var useNewAPIs = false
  try {
    useNewAPIs = await invokeWorker("check-support")
  } catch (_) {
    console.warn(_)
  }

  class LSPMTTransformError extends Error {
    constructor(message, info) {
      super(message)
      this.name = "LSPMTTransformError"
      /** @member {*} info */
      this.info = info
    }
  }

  /**
   * @template {ActionType} T
   * @param {T} action
   * @param {RequestData<T>} data
   * @param {Transferable[]} transfer
   * @returns {Promise<ResponseData<T>>}
   */
  function invokeWorker(action, data, transfer) {
    return new Promise((resolve, reject) => {
      var nonce = (Date.now() >>> 0) + Math.random()
      var handleMessage = ({
        data: { nonce: _nonce, errorOccurred, data },
      }) => {
        console.log("主线程收到响应", { nonce: _nonce, errorOccurred, data })
        if (_nonce !== nonce) return
        ;(errorOccurred ? reject : resolve)(data)
        worker.removeEventListener("message", handleMessage)
      }
      worker.addEventListener("message", handleMessage)
      worker.postMessage({ nonce, action, data }, transfer)
    })
  }

  return (window.LSPMT = {
    /**
     * @param {Blob} blob
     */
    async decodeWYTK(blob) {
      // 读取图片
      var image = new Image()
      await new Promise((res, rej) => {
        image.onload = () => res(image)
        image.onerror = () => rej(new Error("读取图片失败"))
        image.src = URL.createObjectURL(blob)
      })
      if (useNewAPIs) {
        var bitmap = await createImageBitmap(image)
        return await invokeWorker("wytk-bitmap", bitmap, [bitmap])
      } else {
        var cvs = document.createElement("canvas")
        var cxt = cvs.getContext("2d")
        var width = (cvs.width = image.naturalWidth),
          height = (cvs.height = image.naturalHeight)
        cxt.drawImage(image, 0, 0)
        var imgdata = cxt.getImageData(0, 0, width, height)

        return await invokeWorker("wytk-imgdata", imgdata, [
          imgdata.data.buffer,
        ])
      }
    },

    /**
     * @param {ArrayBuffer} buffer
     */
    extractTPWJJ(buffer) {
      var view = new DataView(buffer)
      var magic1 = view.getUint32(0),
        magic2 = view.getUint32(4)
      if (magic1 !== 0x89504e47 || magic2 !== 0x0d0a1a0a)
        throw new LSPMTTransformError("decodeTPWJJ(): 图片不是 PNG", { buffer })

      /** @type {(File | LSPMTTransformError)[]} */
      var result = []

      // 遍历文件内的每个块
      for (
        let offset = 8, chunkSize = 0;
        offset < buffer.byteLength;
        offset += chunkSize + 12
      ) {
        chunkSize = view.getUint32(offset)
        let chunkType = view.getUint32(offset + 4)
        if (chunkType !== 0x7470576a) continue // "tpWj"

        let contentOffset = offset + 8
        let chunkContent = new Uint8Array(buffer, contentOffset, chunkSize)
        let metadataLength = chunkContent.indexOf(0)
        if (metadataLength === -1) {
          result.push(
            new LSPMTTransformError(
              "decodeTPWJJ(): tpWj 块内没有出现任何零字节",
              { buffer, chunkContent }
            )
          )
          continue
        }
        let metadataStr = textDecoder.decode(
          chunkContent.subarray(0, metadataLength)
        )
        /** @type {{ name: string, mime: string }} */
        let metadata = null
        try {
          metadata = JSON.parse(metadataStr)
        } catch (error) {
          result.push(
            new LSPMTTransformError("decodeTPWJJ(): 无法解码元数据", { error })
          )
          continue
        }
        let { name, mime } = metadata
        let subBuffer = buffer.slice(
          contentOffset + metadataLength + 1,
          contentOffset + chunkSize
        )
        result.push(new File([subBuffer], name, { type: mime }))
      }

      return result
    },
  })
})()
