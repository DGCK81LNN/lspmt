import * as LSPMT from "./lib.mjs"

LSPMT.loaded.then(function () {
  "use strict"

  if (!document.querySelector(".BDE_Image")) return

  document.head.appendChild(document.createElement("style"))
    .textContent = require("./inject.css")

  const $panel = document.createElement("section")
  document.body.prepend($panel)
  $panel.id = "lspmt-panel"
  $panel.innerHTML = require("./inject.html")

  function $$$(id) { return document.getElementById(id) }

  if (typeof unsafeWindow !== "object") var unsafeWindow = window

  const $panelCollapse = $panel.firstElementChild
  const $hintSelected = $$$("lspmt-panel-hint-selected")
  const $hintBatch = $$$("lspmt-panel-hint-batch")
  const $hintBatchAction = $$$("lspmt-panel-hint-batch-action")
  const $menu = $$$("lspmt-panel-menu")
  const $about = $$$("lspmt-panel-about")
  const $thread = document.querySelector(".p_postlist")

  const modesText = {
    wytk: "解码无影坦克",
    tpwjj: "提取图片文件夹",
    tphxr: "图片解混淆（兼容 PicEncrypt 行模式）",
    tphxrc: "图片解混淆（兼容 PicEncrypt 行+列模式）",
    tphxrr: "图片混淆（兼容 PicEncrypt 行模式）",
    tphxrrc: "图片混淆（兼容 PicEncrypt 行+列模式）",
  }

  var mode = ""
  var token = "0.666"
  var $selected = null
  var panelWasOpen = false

  detect($thread)
  new MutationObserver(records => {
    records.forEach(record => {
      record.addedNodes.forEach($node => { detect($node) })
    })
  }).observe($thread, { childList: true })

  $thread.addEventListener("click", ev => {
    if (!ev.target.hasAttribute("data-lspmt")) return

    ev.preventDefault()
    ev.stopPropagation()

    var state = ev.target.getAttribute("data-lspmt")
    if (state === "") {
      select(ev.target)
    } else if (state === "batch") {
      process(ev.target, mode)
    } else if (state === "selected") {
      deselect()
    }
  }, true)

  $$$("lspmt-button-deselect").addEventListener("click", () => { deselect() })

  $$$("lspmt-button-wytk").addEventListener("click", () => { chooseMode("wytk") })
  $$$("lspmt-button-tpwjj").addEventListener("click", () => { chooseMode("tpwjj") })
  $$$("lspmt-button-tphxr").addEventListener("click", () => { chooseMode("tphxr") })
  $$$("lspmt-button-tphxrc").addEventListener("click", () => { chooseMode("tphxrc") })
  $$$("lspmt-button-tphxrr").addEventListener("click", () => { chooseMode("tphxrr") })
  $$$("lspmt-button-tphxrrc").addEventListener("click", () => { chooseMode("tphxrrc") })

  $$$("lspmt-button-batchdone").addEventListener("click", () => {
    mode = ""
    setIsBatchMode()
    $thread.querySelectorAll("[data-lspmt]").forEach($img => {
      $img.setAttribute("data-lspmt", "")
    })
  })

  function detect($node) {
    if ($node.nodeType !== Node.ELEMENT_NODE) return
    $node.querySelectorAll(".BDE_Image:not([data-lspmt])").forEach($img => {
      $img.setAttribute("data-lspmt", mode && "batch")
    })
  }

  function select($el) {
    if (!$selected) panelWasOpen = $panelCollapse.open

    deselect(true)
    $selected = $el
    $el.setAttribute("data-lspmt", "selected")

    $panelCollapse.open = true
    $hintSelected.hidden = false
    $hintBatch.hidden = true
    $menu.hidden = false
    $about.hidden = true
  }

  function deselect(isSelectingAnother) {
    if ($selected) $selected.setAttribute("data-lspmt", "")
    $selected = null

    if (!isSelectingAnother) {
      setIsBatchMode()
      $panelCollapse.open = panelWasOpen
    }
  }

  function chooseMode(action) {
    if ($selected) {
      process($selected, action)
      deselect()
    } else {
      mode = action
      if (mode.startsWith("tphx")) {
        let _token = prompt("混淆密钥", token)
        if (_token === null) return false
        token = _token
      }
      $hintBatchAction.textContent = modesText[mode]
      $thread.querySelectorAll("[data-lspmt]").forEach($img => {
        $img.setAttribute("data-lspmt", "batch")
      })
    }
    setIsBatchMode()
    return true
  }

  function setIsBatchMode() {
    $hintSelected.hidden = true
    $hintBatch.hidden = !mode
    $menu.hidden = !!mode
    $about.hidden = true
  }

  /**
   * @param {HTMLImageElement} $img
   * @param {string} action
   */
  async function process($img, action) {
    if ($img.classList.contains("BDE_Image")) {
      // 加载原图
      const imgId = $img.src.match(/\/(\w+)\.[^/]*$/)?.[1]
      if (imgId) {
        try {
          if (typeof PageData !== "object")
            throw new Error("找不到 PageData 对象")
          const threadId = PageData?.thread?.thread_id
          if (threadId === undefined) throw new Error("找不到帖子 ID")

          const imgPageUrl = `//tieba.baidu.com/photo/p?tid=${threadId}&pic_id=${imgId}`
          const imgPageHtml = await (await fetch(imgPageUrl)).text()
          const imgUrl = imgPageHtml.match(
            /\/\/tiebapic\.baidu\.com\/forum\/pic\/item\/[^"]+/
          )?.[0]
          if (threadId === undefined) throw new Error("找不到原图 URL")

          $img.src = "https:" + imgUrl
        } catch (error) {
          alert("加载原图失败：" + error)
          console.error(error)
          return
        }
      }

      // 展开长图
      if ($img.parentElement.classList.contains("replace_div")) {
        $img.parentElement.parentNode.replaceChild($img, $img.parentElement)
      }
    }

    var $wrap = document.createElement("div")
    $wrap.classList.add("lspmt-imgwrap", "lspmt-imgwrap-loading")
    $img.parentNode.replaceChild($wrap, $img)
    $wrap.appendChild($img)
    $img.setAttribute("data-lspmt", "loading")

    /** @type {(File | Error)[]} */
    var results = null
    try {
      var imgBlob = $img._LSPMTBlob || await (await fetch($img.src)).blob()

      switch (action) {
        case "wytk": {
          results = [await LSPMT.decodeWYTK(imgBlob)]
          break
        }
        case "tpwjj": {
          results = await LSPMT.extractTPWJJ(imgBlob)
          if (results.length === 0) {
            throw new Error("这张图片不是图片文件夹")
          }
          break
        }
        default: return
      }
    } catch (error) {
      alert("操作失败：" + error)
      console.error(error)
      return
    } finally {
      $wrap.classList.remove("lspmt-imgwrap-loading")
      $img.setAttribute("data-lspmt", "")
    }

    $img.setAttribute("data-lspmt", "")
    $img.hidden = true
    results.forEach(file => {
      if (file instanceof Error) {
        console.warn(file)
      } else {
        /** @type {HTMLImageElement & { _LSPMTBlob: File }} */
        var $result = document.createElement("img")
        $result.className = "lspmt-result"
        $result.setAttribute("data-lspmt", "")
        $result.src = URL.createObjectURL(file)
        $result._LSPMTBlob = file
        $wrap.append($result, document.createElement("br"))
      }
    })
  }
})
