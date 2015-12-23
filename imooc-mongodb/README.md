# Mongodb
Learn from imooc.com/learn/295

### Install on Mac
```
brew intall mongodb
```

### Use
```bash
mkdir imooc-mongodb
cd imooc-mongodb/
mkdir data
mkdir conf
mkdir log
vim conf/mongod.conf   # specify port in .conf
mongod -f conf/mongod.conf
mongo 127.0.0.1:[port]/test   # use the same port as .conf
```
