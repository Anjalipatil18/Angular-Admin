scp -o StrictHostKeyChecking=no -r dist/* ${userName}@${ipAddress}:${path} << EOF
echo '----------------------------------Done!----------------------------------'
EOF