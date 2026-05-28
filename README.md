# 路上英语

一个适合通勤时循环听单词、音标、释义和例句的手机网页 App。

## 发布到 GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `road-english`。
2. 把本文件夹里的代码推送到仓库。
3. 打开仓库的 `Settings` -> `Pages`。
4. `Source` 选择 `GitHub Actions`。
5. 每次推送到 `main` 分支后，GitHub 会自动发布。

发布完成后，用手机打开 GitHub Pages 网址，再通过浏览器“添加到主屏幕”。

## 数据保存

词库会先保存在当前手机浏览器的本地数据库中。为了防止换手机、清理浏览器数据后丢失，可以在“设置 -> 云端词库”填写后端地址和同步码，把词库保存到云端。

## 云端词库

本项目带了一个简单后端，代码在 `backend/`。

本地试用：

```bash
cd backend
npm install
npm start
```

然后在 App 的后端地址填：

```text
http://localhost:8787
```

长期使用建议部署到 Vercel，并绑定 Upstash Redis。部署后，把 Vercel 的网址填到 App 里，生成一个同步码并保存好。换手机时填同一个后端地址和同步码，点“恢复”。
