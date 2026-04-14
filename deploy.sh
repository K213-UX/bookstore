#!/bin/bash

# 部署脚本 - 在服务器上运行

echo "=== 书店应用部署脚本 ==="
echo "服务器: $(hostname)"
echo "时间: $(date)"
echo ""

# 检查是否为root用户
if [[ $EUID -ne 0 ]]; then
   echo "请使用root用户运行此脚本: sudo bash deploy.sh"
   exit 1
fi

# 安装nginx（如果还没安装）
echo "检查nginx..."
if ! command -v nginx &> /dev/null; then
    echo "安装nginx..."
    apt update && apt install -y nginx
else
    echo "nginx已安装"
fi

# 创建网站目录
echo "创建网站目录..."
mkdir -p /var/www/bookstore
chown -R www-data:www-data /var/www/bookstore

# 创建nginx配置
echo "配置nginx..."
cat > /etc/nginx/sites-available/bookstore << 'EOF'
server {
    listen 80;
    server_name www.zhichuangkeji.online zhichuangkeji.online 120.71.203.225;

    root /var/www/bookstore;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF

# 启用网站
ln -sf /etc/nginx/sites-available/bookstore /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# 测试nginx配置
echo "测试nginx配置..."
nginx -t

if [ $? -eq 0 ]; then
    echo "nginx配置正确，正在重启服务..."
    systemctl restart nginx
    systemctl enable nginx
    echo "✅ 部署完成！"
    echo "网站地址: http://www.zhichuangkeji.online"
    echo "或访问: http://120.71.203.225"
else
    echo "❌ nginx配置错误，请检查配置"
    exit 1
fi

echo ""
echo "=== 下一步 ==="
echo "1. 将本地 dist 目录上传到服务器 /var/www/bookstore/"
echo "2. 设置正确的文件权限: chown -R www-data:www-data /var/www/bookstore/"
echo "3. 访问网站检查是否正常工作"