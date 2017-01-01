# compile resource file
echo '\033[0;32;1mcompiling resource ...\033[0m'
npm run build

# watch resource file

echo '\033[0;32;1mfinished compiling, now start server and watching ...\033[0m'

npm run watch &

npm run server
