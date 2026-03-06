sudo lsof -i :4000
sudo kill -9 1448384

nohup bash -c "node index.js" > backend.log 2>&1 &
echo $! > backend.pid
disown