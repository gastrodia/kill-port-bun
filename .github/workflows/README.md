# GitHub Actions 自动发布配置

## 工作流说明

此工作流会在推送版本标签时自动将包发布到 NPM。

## 配置步骤

### 1. 获取 NPM Token

1. 登录 [npmjs.com](https://www.npmjs.com/)
2. 点击头像 -> Access Tokens
3. 点击 "Generate New Token" -> "Classic Token"
4. 选择 "Automation" 类型
5. 复制生成的 token

### 2. 在 GitHub 仓库中添加 Secret

1. 进入你的 GitHub 仓库
2. 点击 Settings -> Secrets and variables -> Actions
3. 点击 "New repository secret"
4. Name: `NPM_TOKEN`
5. Secret: 粘贴你的 NPM token
6. 点击 "Add secret"

## 使用方法

### 发布新版本

1. **更新版本号**
   ```bash
   # 修改 package.json 中的 version 字段
   # 例如从 0.0.1 改为 0.0.2
   ```

2. **提交更改**
   ```bash
   git add package.json
   git commit -m "chore: bump version to 0.0.2"
   ```

3. **创建并推送标签**
   ```bash
   # 创建标签（版本号要与 package.json 一致）
   git tag v0.0.2
   
   # 推送代码和标签
   git push origin main
   git push origin v0.0.2
   ```

4. **查看发布状态**
   - 进入 GitHub 仓库的 Actions 标签页
   - 查看工作流运行状态
   - 成功后可在 NPM 上看到新版本

### 自动化版本管理（可选）

你也可以使用 npm 命令来自动更新版本：

```bash
# 补丁版本（0.0.1 -> 0.0.2）
npm version patch

# 次版本（0.0.1 -> 0.1.0）
npm version minor

# 主版本（0.0.1 -> 1.0.0）
npm version major

# 推送代码和标签
git push origin main --follow-tags
```

## 工作流特性

- ✅ 自动检测版本一致性（tag 版本必须与 package.json 一致）
- ✅ 使用最新版本的 Bun
- ✅ 支持 NPM provenance（来源证明）
- ✅ 仅在推送标签时触发，避免频繁构建
- ✅ 公开发布包（--access public）

## 注意事项

1. 确保 package.json 中的 version 与 git tag 一致
2. 标签格式必须是 `v` 开头，例如 `v1.0.0`
3. 首次发布需要确保包名在 NPM 上未被占用
4. NPM_TOKEN 需要有发布权限

