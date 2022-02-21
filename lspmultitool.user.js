// ==UserScript==
// @name         LNNの贴吧多功能图片解密工具
// @namespace    https://dgck81lnn.github.io/blog/
// @version      0.0.2
// @author       DGCK81LNN
// @match        https://tieba.baidu.com/p/*
// @require      https://hub.xn--p8jhe.tw/DGCK81LNN/lspmt/raw/main/lspmt-lib/index.js
// ==/UserScript==

/// <reference types="./lspmt-lib" />

window._LSPMTLoadPromise.then(/** @param {typeof LSPMT} LSPMT */function (LSPMT) {
  "use strict"

  console.log(LSPMT)

  if (!document.querySelector(".BDE_Image")) return

  document.head.appendChild(document.createElement("style")).textContent = `\
#lspmt-panel {
  background-color: #bed;
  padding: 2vh 2vh;
  font-size: 2vh;
  border-bottom: 2px solid #398;
  box-shadow: 0 -1vh 2vh 1vh rgba(0,0,0,0.5);
  position: sticky;
  z-index: 514;
  top: 0;
  width: 100%;
  box-sizing: border-box;
}
#lspmt-panel * {
  line-height: 120%;
}
#lspmt-panel summary,
#lspmt-panel button {
  all: revert;
  font-size: inherit;
}
#lspmt-panel-heading>* {
  display: inline;
}
#lspmt-panel-body>div {
  margin-top: 2vh;
}
#lspmt-panel-menu,
#lspmt-panel-menu div {
  display: flex;
  flex: auto 1;
  align-items: stretch;
  justify-content: stretch;
  flex-wrap: wrap;
}
#lspmt-panel-menu button {
  flex: auto 1;
  height: 2.5em;
  margin: 0.1em;
}
*[data-lspmt] {
  display: inline-block;
  border: 6px double transparent;
  padding: 2px;
  margin: -2px 0;
  max-width: 100%;
  box-sizing: border-box;
  cursor: pointer;
}
*[data-lspmt]:hover { border-color: #ccc }
*[data-lspmt=batch] { border-color: #3ba }
*[data-lspmt=batch]:hover { border-color: #276 }
*[data-lspmt=selected] { border-color: #f00 }
*[data-lspmt=selected]:hover { border-color: #c00 }
*[hidden] { display: none !important }
.lspmt-imgwrap {
  position: relative;
  display: inline-block;
}
.lspmt-imgwrap.lspmt-imgwrap-loading::before {
  content: " ";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  width: 5vh; height: 5vh;
  border: 1vh solid #3ba;
  border-bottom-color: transparent;
  border-radius: 5vh;
  animation: lspmt-imgwrap-spinner 1s linear infinite;
}
@keyframes lspmt-imgwrap-spinner {
  to { transform: rotate(360deg) }
}`

  const $panel = document.createElement("section")
  document.body.prepend($panel)
  $panel.id = "lspmt-panel"
  $panel.innerHTML = `\
<details>
  <summary id=lspmt-panel-heading><h2>LNN 多功能图片解密工具</h2></summary>
  <div id=lspmt-panel-body>
    <div id=lspmt-panel-hint-selected hidden
      >要对带<span data-lspmt=selected>红色边框</span
      >的图片进行什么操作？<button type=button id=lspmt-button-deselect>取消</button
      ></div>
    <div id=lspmt-panel-hint-batch hidden
      >点击带<span data-lspmt=batch>青绿色边框</span
      >的图片来<b id=lspmt-panel-hint-batch-action>解码无影坦克</b>。<!--
    --><button type=button id=lspmt-button-batchdone>完成</button
      ></div>
    <div id=lspmt-panel-menu>
      <div>
        <button type=button id=lspmt-button-wytk>解码无影坦克</button>
        <button type=button id=lspmt-button-tpwjj>提取图片文件夹</button>
      </div>
      <div>
        <div>
          <button type=button id=lspmt-button-tphxr>图片解混淆（行）</button>
          <button type=button id=lspmt-button-tphxrc>图片解混淆（行+列）</button>
        </div>
        <div>
          <button type=button id=lspmt-button-tphxrr>图片混淆（行）</button>
          <button type=button id=lspmt-button-tphxrrc>图片混淆（行+列）</button>
        </div>
      </div>
    </div>
    <div id=lspmt-panel-about>by <!--
    --><a href="https://github.com/DGCK81LNN" rel=nofollow target=_blank
      >DGCK81LNN</a></div>
  </div>
</details>`

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

  detect($thread)
  new MutationObserver(records => {
    records.forEach(record => {
      record.addedNodes.forEach($node => void detect($node))
    })
  }).observe($thread, { childList: true })

  var mode = ""
  var token = "0.666"
  var $selected = null
  var panelWasOpen = false

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

  $$$("lspmt-button-deselect").addEventListener("click", () => void deselect())

  $$$("lspmt-button-wytk").addEventListener("click", () => void chooseMode("wytk"))
  $$$("lspmt-button-tpwjj").addEventListener("click", () => void chooseMode("tpwjj"))
  $$$("lspmt-button-tphxr").addEventListener("click", () => void chooseMode("tphxr"))
  $$$("lspmt-button-tphxrc").addEventListener("click", () => void chooseMode("tphxrc"))
  $$$("lspmt-button-tphxrr").addEventListener("click", () => void chooseMode("tphxrr"))
  $$$("lspmt-button-tphxrrc").addEventListener("click", () => void chooseMode("tphxrrc"))

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
      $img.setAttribute("data-lspmt", "")
    })
  }

  function select($el) {
    deselect(true)
    $selected = $el
    $selected.setAttribute("data-lspmt", "selected")

    panelWasOpen = $panelCollapse.open
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
    $img.setAttribute("data-lspmt", "")

    try {
      var imgBlob = await (await fetch($img.src)).blob()

      switch (action) {
        case "wytk": {
          var results = [await LSPMT.decodeWYTK(imgBlob)]
          break
        }
        default: {
          return alert("Not Implemented")
        }
      }
    } catch (error) {
      alert("操作失败：" + error)
      console.error(error)
      return
    } finally {
      $wrap.classList.remove("lspmt-imgwrap-loading")
    }

    $img.hidden = true
    results.forEach(file => {
      /** @type {HTMLImageElement & { _LSPMTBlob: File }} */
      var $img = document.createElement("img")
      $img.className = "lspmt-result"
      $img.setAttribute("data-lspmt", mode)
      $img.src = URL.createObjectURL(file)
      $img._LSPMTBlob = file
      $wrap.append($img, document.createElement("br"))
    })
  }
})
