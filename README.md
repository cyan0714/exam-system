# 在线考试系统

基于 NestJS 微服务架构的在线考试系统，支持试卷管理、答题、成绩分析等功能。

## 项目简介

这是一个完整的在线考试系统，采用微服务架构设计，包含用户管理、试卷管理、答题系统、成绩分析等核心功能。系统支持邮箱验证、JWT认证、Redis缓存、数据导出等特性。

## 技术栈

- **后端框架**: NestJS
- **数据库**: MySQL + Prisma ORM
- **缓存**: Redis
- **认证**: JWT
- **邮件服务**: Nodemailer
- **文档导出**: ExcelJS
- **语言**: TypeScript

## 系统架构

### 微服务模块

- **exam-system** (端口: 3000) - 主服务网关
- **user** (端口: 3001) - 用户管理服务
- **exam** (端口: 3002) - 试卷管理服务
- **answer** (端口: 3003) - 答题服务
- **analyse** (端口: 3004) - 成绩分析服务

### 共享库

- **@app/common** - 通用模块（认证守卫、装饰器等）
- **@app/prisma** - 数据库服务
- **@app/redis** - Redis缓存服务
- **@app/email** - 邮件服务
- **@app/excel** - Excel导出服务

## 数据模型

### 用户表 (User)
- 用户ID、用户名、密码、邮箱
- 创建时间、更新时间

### 试卷表 (Exam)
- 试卷ID、试卷名称、试卷内容
- 发布状态、删除状态
- 创建者信息、时间戳

### 答卷表 (Answer)
- 答卷ID、答题内容、得分
- 答题者信息、关联试卷
- 创建时间、更新时间

## 核心功能

### 用户管理
- ✅ 用户注册（邮箱验证码）
- ✅ 用户登录（JWT认证）
- ✅ 密码修改（邮箱验证）
- ✅ 身份验证守卫

### 试卷管理
- ✅ 试卷创建和编辑
- ✅ 试卷发布/取消发布
- ✅ 试卷删除/恢复
- ✅ 试卷列表查询
- ✅ 回收站功能

### 答题系统
- ✅ 在线答题
- ✅ 自动评分（选择题、填空题）
- ✅ 答卷记录管理
- ✅ 答卷详情查看

### 成绩分析
- ✅ 成绩排行榜（Redis实现）
- ✅ 考试数据统计
- ✅ 成绩导出（Excel格式）

## 环境要求

- Node.js >= 20
- MySQL >= 8.0
- Redis >= 6.2

## 安装部署

### 1. 克隆项目
```bash
git clone <repository-url>
cd exam-system
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 环境配置
复制环境变量示例文件并配置：
```bash
cp .env.example .env
```

然后编辑 `.env` 文件，配置以下环境变量：
```env
# 数据库配置
DATABASE_URL="mysql://username:password@localhost:3306/exam_system"

# JWT 配置
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="30m"

# Redis 配置
REDIS_HOST="localhost"
REDIS_PORT="6379"
REDIS_PASSWORD=""

# 邮件服务配置
EMAIL_HOST="smtp.qq.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@qq.com"
EMAIL_PASS="your-email-password"
EMAIL_FROM_NAME="考试系统"
EMAIL_FROM_ADDRESS="your-email@qq.com"

# 服务端口配置（可选，使用默认值）
MAIN_SERVICE_PORT="3000"
USER_SERVICE_PORT="3001"
EXAM_SERVICE_PORT="3002"
ANSWER_SERVICE_PORT="3003"
ANALYSE_SERVICE_PORT="3004"
MICROSERVICE_PORT="8888"
```

**重要提示：**
- 请确保将 `JWT_SECRET` 设置为一个强密码
- 配置正确的邮件服务器信息用于发送验证码
- 如果使用 QQ 邮箱，需要开启 SMTP 服务并使用授权码作为密码
- 确保 MySQL 和 Redis 服务正在运行

### 4. 数据库初始化
```bash
# 生成 Prisma Client
pnpm prisma generate

# 运行数据库迁移
pnpm prisma migrate dev
```

### 5. 启动服务

#### 开发环境
```bash
# 启动所有微服务
pnpm run start:dev

# 或分别启动各个服务
pnpm run start:dev exam-system  # 主服务 (3000)
pnpm run start:dev user         # 用户服务 (3001)
pnpm run start:dev exam         # 试卷服务 (3002)
pnpm run start:dev answer       # 答题服务 (3003)
pnpm run start:dev analyse      # 分析服务 (3004)
```

## API 接口

### 用户服务 (3001)
```
POST /user/register          # 用户注册
POST /user/login             # 用户登录
GET  /user/register-captcha  # 获取注册验证码
POST /user/update_password   # 修改密码
GET  /user/update_password/captcha # 获取修改密码验证码
```

### 试卷服务 (3002)
```
POST /exam/add              # 创建试卷
GET  /exam/list             # 试卷列表
POST /exam/save             # 保存试卷
GET  /exam/publish/:id      # 发布试卷
GET  /exam/unpublish/:id    # 取消发布
DELETE /exam/delete/:id     # 删除试卷
GET  /exam/recover/:id      # 恢复试卷
GET  /exam/find/:id         # 获取试卷详情
```

### 答题服务 (3003)
```
POST /answer/add            # 提交答卷
GET  /answer/list           # 答卷列表
GET  /answer/find/:id       # 答卷详情
GET  /answer/export         # 导出答卷数据
```

### 分析服务 (3004)
```
GET  /analyse/ranking       # 成绩排行榜
```

## 开发指南

### 项目结构
```
exam-system/
├── apps/                   # 微服务应用
│   ├── exam-system/       # 主服务
│   ├── user/              # 用户服务
│   ├── exam/              # 试卷服务
│   ├── answer/            # 答题服务
│   └── analyse/           # 分析服务
├── libs/                  # 共享库
│   ├── common/            # 通用模块
│   ├── prisma/            # 数据库服务
│   ├── redis/             # Redis服务
│   ├── email/             # 邮件服务
│   └── excel/             # Excel服务
├── prisma/                # 数据库配置
└── generated/             # 生成的代码
```

## 服务端口说明
- 3000: 主服务网关
- 3001: 用户管理服务
- 3002: 试卷管理服务
- 3003: 答题服务
- 3004: 成绩分析服务
- 8888: 微服务内部通信端口

## 许可证

本项目采用 MIT 许可证。

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

