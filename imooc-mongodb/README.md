# Mongodb
Learn from imooc.com/learn/295

### Install on Mac
```
brew intall mongodb
```

### Use
Under customized path
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
Under default path
```bash
mkdir -p /data/db
sudo chown -R $USER /data/db    # change ownership to user, not root
mongod
mongo
```