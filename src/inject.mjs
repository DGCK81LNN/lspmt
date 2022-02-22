/*!
// ==UserScript==
// @name         LNNの贴吧多功能图片解密工具
// @namespace    https://github.com/DGCK81LNN/lspmt
// @version      [update in package.json]
// @match        https://tieba.baidu.com/p/*
// ==/UserScript==
*/

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
      $img.src = $img.src
        .replace("http://", "https://")
        .replace(/w%3D[^\/]+\/sign=[^\/]+/, "pic/item")

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

    try {
      var imgBlob = $img._LSPMTBlob || await (await fetch($img.src)).blob()

      switch (action) {
        case "wytk": {
          var results = [await LSPMT.decodeWYTK(imgBlob)]
          break
        }
        default: {
          return alert("该功能尚未制作完成，敬请期待")
        }
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
      /** @type {HTMLImageElement & { _LSPMTBlob: File }} */
      var $img = document.createElement("img")
      $img.className = "lspmt-result"
      $img.setAttribute("data-lspmt", "")
      $img.src = URL.createObjectURL(file)
      $img._LSPMTBlob = file
      $wrap.append($img, document.createElement("br"))
    })
  }
})
