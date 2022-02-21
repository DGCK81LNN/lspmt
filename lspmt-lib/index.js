/// <reference types="./types" />

window.LSPMT = null
window._LSPMTLoadPromise = (async function () {
  const worker = (window.worker = new Worker("data:text/javascript;base64,Ly8vIDxyZWZlcmVuY2UgbGliPSJXZWJXb3JrZXIiIC8+DQovLy8gPHJlZmVyZW5jZSB0eXBlcz0iLi90eXBlcyIgLz4NCg0Kc2VsZi5vbm1lc3NhZ2UgPSBhc3luYyAoeyBkYXRhOiB7IG5vbmNlLCBhY3Rpb24sIGRhdGEgfSB9KSA9PiB7DQogIGNvbnNvbGUubG9nKCLlrZDnur/nqIvmlLbliLDor7fmsYIiLCB7IG5vbmNlLCBhY3Rpb24sIGRhdGEgfSkNCiAgdHJ5IHsNCiAgICB2YXIgcmVzdWx0ID0gcHJvY2VzcyhhY3Rpb24sIGRhdGEpDQogIH0gY2F0Y2ggKGVycikgew0KICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBub25jZSwgZXJyb3JPY2N1cnJlZDogdHJ1ZSwgZGF0YTogZXJyIH0pDQogICAgcmV0dXJuDQogIH0NCiAgc2VsZi5wb3N0TWVzc2FnZSgNCiAgICB7IG5vbmNlLCBlcnJvck9jY3VycmVkOiBmYWxzZSwgZGF0YTogcmVzdWx0LmRhdGEgfSwNCiAgICByZXN1bHQudHJhbnNmZXINCiAgKQ0KfQ0KDQovKioNCiAqIEB0ZW1wbGF0ZSB7QWN0aW9uVHlwZX0gVA0KICogQHBhcmFtIHtUfSBhY3Rpb24NCiAqIEBwYXJhbSB7UmVxdWVzdERhdGE8VD59IGRhdGENCiAqIEByZXR1cm5zIHtQcm9taXNlPHsgZGF0YTogUmVzcG9uc2VEYXRhPFQ+LCB0cmFuc2ZlcjogVHJhbnNmZXJhYmxlW10gfT59DQogKi8NCmZ1bmN0aW9uIHByb2Nlc3MoYWN0aW9uLCBkYXRhKSB7DQogIHN3aXRjaCAoYWN0aW9uKSB7DQogICAgY2FzZSAiY2hlY2stc3VwcG9ydCI6IHsNCiAgICAgIHJldHVybiB7IGRhdGE6IGNoZWNrU3VwcG9ydCgpIH0NCiAgICB9DQogICAgY2FzZSAid3l0ay1iaXRtYXAiOg0KICAgIGNhc2UgInd5dGstaW1nZGF0YSI6IHsNCiAgICAgIGxldCB7IGJ1ZmZlciwgbmFtZSwgdHlwZSB9ID0gZGVjb2RlV1lUSyhkYXRhKQ0KICAgICAgcmV0dXJuIHsgZGF0YTogbmV3IEZpbGUoW2J1ZmZlcl0sIG5hbWUsIHsgdHlwZSB9KSwgdHJhbnNmZXI6IFtidWZmZXJdIH0NCiAgICB9DQogICAgZGVmYXVsdDogew0KICAgICAgdGhyb3cgIkludmFsaWQgYWN0aW9uIg0KICAgIH0NCiAgfQ0KfQ0KDQpjb25zdCB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpDQoNCmZ1bmN0aW9uIGNoZWNrU3VwcG9ydCgpIHsNCiAgaWYgKHR5cGVvZiBjcmVhdGVJbWFnZUJpdG1hcCAhPT0gImZ1bmN0aW9uIikgcmV0dXJuIGZhbHNlDQogIGlmICh0eXBlb2YgT2Zmc2NyZWVuQ2FudmFzICE9PSAiZnVuY3Rpb24iKSByZXR1cm4gZmFsc2UNCiAgdHJ5IHsNCiAgICBsZXQgY3ZzID0gbmV3IE9mZnNjcmVlbkNhbnZhcygxLCAxKQ0KICAgIGN2cy5nZXRDb250ZXh0KCIyZCIpDQogIH0gY2F0Y2ggKF8pIHsNCiAgICByZXR1cm4gZmFsc2UNCiAgfQ0KICByZXR1cm4gdHJ1ZQ0KfQ0KDQovKioNCiAqIEBwYXJhbSB7SW1hZ2VCaXRtYXAgfCBJbWFnZURhdGF9IGRhdGENCiAqLw0KZnVuY3Rpb24gZGVjb2RlV1lUSyhkYXRhKSB7DQogIGNvbnN0IG1ldGFNYXhTaXplID0gNDA5Ng0KICBjb25zdCBtaW1lQ29ycmVjdCA9IG5ldyBNYXAoWw0KICAgIFsiLm1wNCIsICJ2aWRlby9tcDQiXSwNCiAgICBbIi53ZWJtIiwgInZpZGVvL3dlYm0iXSwNCiAgICBbIi56aXAiLCAiYXBwbGljYXRpb24vemlwIl0sDQogICAgWyIudHh0IiwgInRleHQvcGxhaW4iXSwNCiAgXSkNCg0KICAvKioNCiAgICog5q+U54m56Zif5YiXDQogICAqLw0KICBjbGFzcyBCaXRRdWV1ZTMyIHsNCiAgICBjb25zdHJ1Y3RvcigpIHsNCiAgICAgIHRoaXMuX3ZhbHVlID0gMA0KICAgICAgdGhpcy5fbGVuZ3RoID0gMA0KICAgIH0NCg0KICAgIGdldCBsZW5ndGgoKSB7DQogICAgICByZXR1cm4gdGhpcy5fbGVuZ3RoDQogICAgfQ0KDQogICAgLyoqDQogICAgICog5YWl6Zif5YiX5oyH5a6a6ZW/5bqm55qE5q+U54m55Liy77yb5pyA6auY5L2N5YWI6L+bDQogICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIOWFpemYn+WIl+eahOaVsOaNru+8m+WPquacieS9jmBsZW5g5L2N5pyJ5pWIDQogICAgICogQHBhcmFtIHtudW1iZXJ9IGxlbiDlhaXpmJ/liJfmlbDmja7nmoTmr5TnibnmlbDvvIzpu5jorqTkuLo477yb5q2k5Y+C5pWw5Y+q5pyJ5L2ONeS9jeacieaViA0KICAgICAqLw0KICAgIGVucXVldWUodmFsdWUsIGxlbiA9IDgpIHsNCiAgICAgIGxlbiAmPSAzMQ0KICAgICAgdmFsdWUgJj0gfigtMSA8PCBsZW4pDQogICAgICBpZiAodGhpcy5fbGVuZ3RoICsgbGVuID4gMzIpDQogICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCJCaXRRdWV1ZTMyLnByb3RvdHlwZS5lbnF1ZXVlKCk6IE92ZXJmbG93IikNCiAgICAgIHRoaXMuX2xlbmd0aCArPSBsZW4NCiAgICAgIHRoaXMuX3ZhbHVlIDw8PSBsZW4NCiAgICAgIHRoaXMuX3ZhbHVlIHw9IHZhbHVlDQogICAgfQ0KICAgIC8qKg0KICAgICAqIOWHuumYn+WIl+aMh+WumumVv+W6pueahOavlOeJueS4su+8m+acgOmrmOS9jeWFiOWHug0KICAgICAqIEBwYXJhbSBsZW4g5Ye66Zif5YiX5pWw5o2u55qE5q+U54m55pWw77yM6buY6K6k5Li6OO+8m+atpOWPguaVsOWPquacieS9jjXkvY3mnInmlYgNCiAgICAgKiBAcmV0dXJucyDlh7rpmJ/liJfnmoTmlbDmja4NCiAgICAgKi8NCiAgICBkZXF1ZXVlKGxlbiA9IDgpIHsNCiAgICAgIGxlbiAmPSAzMQ0KICAgICAgdmFyIG5ld0xlbmd0aCA9IHRoaXMuX2xlbmd0aCAtIGxlbg0KICAgICAgdmFyIHJlc3VsdA0KICAgICAgaWYgKG5ld0xlbmd0aCA8IDApIHsNCiAgICAgICAgcmVzdWx0ID0gdGhpcy5fdmFsdWUgPDwgLW5ld0xlbmd0aA0KICAgICAgICB0aGlzLl92YWx1ZSA9IDANCiAgICAgICAgdGhpcy5fbGVuZ3RoID0gMA0KICAgICAgfSBlbHNlIHsNCiAgICAgICAgcmVzdWx0ID0gdGhpcy5fdmFsdWUgPj4+IG5ld0xlbmd0aA0KICAgICAgICB0aGlzLl92YWx1ZSAmPSB+KC0xIDw8IG5ld0xlbmd0aCkNCiAgICAgICAgdGhpcy5fbGVuZ3RoID0gbmV3TGVuZ3RoDQogICAgICB9DQogICAgICByZXR1cm4gcmVzdWx0DQogICAgfQ0KICB9DQoNCiAgcmV0dXJuIChkZWNvZGVXWVRLID0gZnVuY3Rpb24gZGVjb2RlV1lUSyhkYXRhKSB7DQogICAgaWYgKHR5cGVvZiBJbWFnZUJpdG1hcCA9PT0gImZ1bmN0aW9uIiAmJiBkYXRhIGluc3RhbmNlb2YgSW1hZ2VCaXRtYXApIHsNCiAgICAgIGxldCBjdnMgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKGRhdGEud2lkdGgsIGRhdGEuaGVpZ2h0KQ0KICAgICAgLyoqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9ICovDQogICAgICBsZXQgY3h0ID0gY3ZzLmdldENvbnRleHQoIjJkIikNCiAgICAgIGN4dC5kcmF3SW1hZ2UoZGF0YSwgMCwgMCkNCiAgICAgIHZhciBpbWdkYXRhID0gY3h0LmdldEltYWdlRGF0YSgwLCAwLCBjdnMud2lkdGgsIGN2cy5oZWlnaHQpDQogICAgfSBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgSW1hZ2VEYXRhKSB7DQogICAgICB2YXIgaW1nZGF0YSA9IGRhdGENCiAgICB9IGVsc2UgdGhyb3cgbmV3IFR5cGVFcnJvcigiZGVjb2RlV1lUSygpOiB3cm9uZyBhcmd1bWVudCB0eXBlIikNCg0KICAgIC8vIOivhuWIq+WdpuWFiw0KICAgIHZhciBtb2RlID0gaW1nZGF0YS5kYXRhWzJdICYgNw0KICAgIGlmICgNCiAgICAgIChpbWdkYXRhLmRhdGFbMF0gJiA3KSAhPT0gMCB8fA0KICAgICAgKGltZ2RhdGEuZGF0YVsxXSAmIDcpICE9PSAzIHx8DQogICAgICBtb2RlID09PSAwDQogICAgKQ0KICAgICAgdGhyb3cgbmV3IEVycm9yKCJkZWNvZGVXWVRLKCk6IOaXoOazleivhuWIq+WdpuWFiyIpDQoNCiAgICAvLyDor7vlj5blnablhYvlhYPmlbDmja4NCiAgICB2YXIgcGl4ZWxDb3VudCA9IGltZ2RhdGEud2lkdGggKiBpbWdkYXRhLmhlaWdodA0KICAgIHZhciBiaXRCdWZmZXIgPSBuZXcgQml0UXVldWUzMigpDQogICAgdmFyIGkgPSAxLA0KICAgICAgaiA9IDAsDQogICAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KG1ldGFNYXhTaXplKQ0KICAgIHdoaWxlIChpIDwgcGl4ZWxDb3VudCkgew0KICAgICAgd2hpbGUgKGJpdEJ1ZmZlci5sZW5ndGggPCA4KSB7DQogICAgICAgIGJpdEJ1ZmZlci5lbnF1ZXVlKGltZ2RhdGEuZGF0YVtpIDw8IDJdLCBtb2RlKQ0KICAgICAgICBiaXRCdWZmZXIuZW5xdWV1ZShpbWdkYXRhLmRhdGFbKGkgPDwgMikgfCAxXSwgbW9kZSkNCiAgICAgICAgYml0QnVmZmVyLmVucXVldWUoaW1nZGF0YS5kYXRhWyhpIDw8IDIpIHwgMl0sIG1vZGUpDQogICAgICAgICsraQ0KICAgICAgfQ0KICAgICAgdmFyIGJ5dGUgPSBiaXRCdWZmZXIuZGVxdWV1ZSgpDQogICAgICBpZiAoYnl0ZSA9PT0gMCkgYnJlYWsNCiAgICAgIGJ5dGVzW2orK10gPSBieXRlDQogICAgICBpZiAoaiA+PSBtZXRhTWF4U2l6ZSkNCiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkZWNvZGVXWVRLKCk6IOWFg+aVsOaNrui/h+mVv++8iOi2hei/hyAke21ldGFNYXhTaXplfSDlrZfoioLvvIlgKQ0KICAgIH0NCiAgICB2YXIgZmlsZU1ldGFkYXRhID0gdGV4dERlY29kZXIuZGVjb2RlKGJ5dGVzLnN1YmFycmF5KDAsIGopKS5zcGxpdCgiXHgwMSIpDQogICAgdmFyIFtmaWxlU2l6ZVN0ciwgZmlsZU5hbWUsIGZpbGVUeXBlXSA9IGZpbGVNZXRhZGF0YQ0KICAgIGNvbnNvbGUubG9nKHsgZmlsZVNpemVTdHIsIGZpbGVOYW1lLCBmaWxlVHlwZSB9KQ0KICAgIHZhciBmaWxlU2l6ZSA9IE51bWJlcihmaWxlU2l6ZVN0cikNCiAgICBpZiAoDQogICAgICBmaWxlTWV0YWRhdGEubGVuZ3RoIDwgMyB8fA0KICAgICAgaXNOYU4oZmlsZVNpemUpIHx8DQogICAgICAoMCB8IGZpbGVTaXplKSAhPT0gZmlsZVNpemUgfHwgLy8g5Yik5pat5piv5ZCm5Li6MzLkvY3mlbTmlbANCiAgICAgIGZpbGVTaXplIDwgMA0KICAgICkNCiAgICAgIHRocm93IG5ldyBFcnJvcigi5Z2m5YWL5YWD5pWw5o2u5peg5pWIIikNCg0KICAgIC8vIOivu+WPlumHjOWbvg0KICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoZmlsZVNpemUpDQogICAgaiA9IDANCiAgICB3aGlsZSAoaSA8IHBpeGVsQ291bnQgJiYgaiA8IGZpbGVTaXplKSB7DQogICAgICB3aGlsZSAoYml0QnVmZmVyLmxlbmd0aCA8IDgpIHsNCiAgICAgICAgYml0QnVmZmVyLmVucXVldWUoaW1nZGF0YS5kYXRhW2kgPDwgMl0sIG1vZGUpDQogICAgICAgIGJpdEJ1ZmZlci5lbnF1ZXVlKGltZ2RhdGEuZGF0YVsoaSA8PCAyKSB8IDFdLCBtb2RlKQ0KICAgICAgICBiaXRCdWZmZXIuZW5xdWV1ZShpbWdkYXRhLmRhdGFbKGkgPDwgMikgfCAyXSwgbW9kZSkNCiAgICAgICAgKytpDQogICAgICB9DQogICAgICB2YXIgYnl0ZSA9IGJpdEJ1ZmZlci5kZXF1ZXVlKCkNCiAgICAgIGJ5dGVzW2orK10gPSBieXRlDQogICAgfQ0KDQogICAgLy8g57qg5q2jTUlNReexu+Weiw0KICAgIGZvciAobGV0IFttaW1lLCBleHRlbnNpb25dIG9mIG1pbWVDb3JyZWN0KSB7DQogICAgICBpZiAoZmlsZU5hbWUuZW5kc1dpdGgoZXh0ZW5zaW9uKSkgew0KICAgICAgICBmaWxlVHlwZSA9IG1pbWUNCiAgICAgICAgYnJlYWsNCiAgICAgIH0NCiAgICB9DQoNCiAgICByZXR1cm4gew0KICAgICAgYnVmZmVyOiBieXRlcy5idWZmZXIsDQogICAgICBuYW1lOiBmaWxlTmFtZSwNCiAgICAgIHR5cGU6IGZpbGVUeXBlLA0KICAgIH0NCiAgfSkoZGF0YSkNCn0NCg==", {
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
     * @param {string} url 坦克图URL（不能跨域）
     */
    async decodeWYTK(url) {
      // 读取图片
      var image = new Image()
      await new Promise((res, rej) => {
        image.onload = () => res(image)
        image.onerror = () => rej(new Error("读取图片失败"))
        image.src = typeof url === "string" ? url : URL.createObjectURL(url)
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
