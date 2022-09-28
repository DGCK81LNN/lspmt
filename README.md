2022-09-28：由于现在贴吧**只提供压缩过的 JPEG 图片**，**本工具已失效**，之前残留的图片均无法解码（[#3](https://github.com/DGCK81LNN/lspmt/issues/3)），寄。即日起本仓库将存档。

# LNNの贴吧多功能图片解密工具

[![查看构建状态][workflow_badge]][workflow_link] [![下载/安装][download_badge]][download_link]

[workflow_badge]: https://img.shields.io/github/workflow/status/DGCK81LNN/lspmt/Build?label=%E6%9E%84%E5%BB%BA%E7%8A%B6%E6%80%81&logo=githubactions&logoColor=white
[workflow_link]: https://github.com/DGCK81LNN/lspmt/actions/workflows/build.yml
[download_badge]: https://img.shields.io/github/v/release/DGCK81LNN/lspmt?label=%E4%B8%8B%E8%BD%BD%2F%E5%AE%89%E8%A3%85&sort=semver
[download_link]: https://github.com/DGCK81LNN/lspmt/releases/latest/download/lspmultitool.user.js

这是一个可以让 [lsp]<sup id='a1'>[[警告]][f1]</sup> 的生活更便利的油猴脚本。

[lsp]: https://zh.moegirl.org.cn/Lsp "萌娘百科条目：lsp"
[f1]: #f1 "不适合 15 岁以下的人群"

## 功能

- [X] 解码无影坦克
- [X] 解码嵌套的图片
- [ ] 支持图片以外的的里件
- [X] 提取图片文件夹
- [ ] 还原表图
- [ ] PicEncrypt 图片混淆与解混淆<sup id='a2'>[[注]](#f2)</sup>

## 安装

**电脑用户**可选择恰当渠道安装 Tampermonkey 等用户脚本管理器；**安卓用户**目前可以安装火狐浏览器的 Nightly 版，通过开发者菜单<span id='a3'>[更换推荐插件列表][f3]</span>，即可安装用户脚本管理器。安装好后，**点击上方的“下载/安装”徽标**即可安装本脚本。

**iOS 用户**可从 App Store 下载 Userscript 用户脚本管理器。安装好后，需要在 Userscript App 中选择一个合适的位置来存储脚本。然后，点击上方的“下载/安装”徽标，将脚本下载到所选的文件夹，即可使用本脚本。

[f3]: #f3 "LNN 的博客：安卓火狐浏览器 Nightly 版如何更换推荐插件列表"

## 使用

打开百度贴吧中有图片的主题帖页面（手机用户需要选择查看电脑版网页），页面会出现一个“▶ LNN 多功能图片解密工具”悬浮窗，说明脚本安装成功。

  * **批量操作**：点击左上角小窗可以选择一个操作（如解码无影坦克）来进行批量操作。

    选择后，帖子中的图片会显示青绿色边框，点击图片即可对图片进行所选的操作。点击小窗标题可以折叠小窗，点击“完成”退出批量操作模式。

  * **单独操作**：您也可以直接点击帖子中的图片，此时这张图片会被选中（用红色边框表示）。

    选中图片后，左上角的小窗会展开，您可以选择要对这张图片进行哪种操作。点击小窗内的“取消”或再次点击这张图片可以取消选中。

## 脚注

<span id='f1'>〖警告〗</span>此链接的内容不适合 15 岁以下的人群。 [↩](#a1)

<span id='f2'>〖图片混淆与解混淆〗</span>因为有时会有人在加密图片的时候把混淆和解混淆弄反。 [↩](#a2)

<span id='f3'>〖《安卓火狐浏览器 Nightly 版如何更换推荐插件列表》〗</span>：啦啦啦，这篇文章我还没写。[↩](#a3)
