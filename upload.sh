# 上传脚本 - 在本地运行
# 确保你有服务器的SSH访问权限

echo "=== 上传书店应用到服务器 ==="

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
    echo "❌ dist目录不存在，请先运行: npm run build"
    exit 1
fi

echo "上传文件到服务器..."
echo "命令: scp -r dist/* root@120.71.203.225:/var/www/bookstore/"

# 如果上面的命令失败，尝试其他方法
echo ""
echo "如果SCP失败，请尝试以下方法之一："
echo ""
echo "方法1 - 使用rsync:"
echo "rsync -avz dist/ root@120.71.203.225:/var/www/bookstore/"
echo ""
echo "方法2 - 使用sftp:"
echo "sftp root@120.71.203.225"
echo "然后在sftp提示符下输入:"
echo "put -r dist/* /var/www/bookstore/"
echo ""
echo "方法3 - 压缩后上传:"
echo "tar -czf dist.tar.gz dist/"
echo "scp dist.tar.gz root@120.71.203.225:~/"
echo "然后在服务器上: tar -xzf dist.tar.gz && mv dist/* /var/www/bookstore/"