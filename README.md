# learn-nodejs
Learn nodejs

### imooc movie demo
node+mongodb建站（一期）, under `imooc-projects-basic/imooc`

node+mongodb建站（二期）, under `imooc-projects-adv/`


### Homebrew npm bug
See this [detail solution](https://gist.github.com/DanHerbert/9520689)
Basically, if node and npm are installed by homebrew, then when typing
`npm install -g npm`, there is an error.
The right way is to:
```shell
rm -rf /usr/local/lib/node_modules
brew uninstall node
brew install node --without-npm
echo prefix=~/.node >> ~/.npmrc
curl -L https://www.npmjs.com/install.sh | sh
```