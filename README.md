pkill -f node
nohup node index.js > output.log 2>&1 &
disown