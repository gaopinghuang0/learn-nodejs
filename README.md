# learn-nodejs
Learn nodejs

### imooc movie demo
node+mongodb建站（一期）, under `imooc-movie-basic/imooc`

node+mongodb建站（二期）, under `imooc-movie-adv/`


### Homebrew npm bug
If node and npm are installed by homebrew, then when typing
`npm install -g npm`, there is an error.
See this [solution](https://gist.github.com/DanHerbert/9520689):
```shell
rm -rf /usr/local/lib/node_modules
brew uninstall node
brew install node --without-npm
echo prefix=~/.node >> ~/.npmrc
curl -L https://www.npmjs.com/install.sh | sh
```
Then add code below to ~/.bash_profile
```shell
export PATH="$HOME/.node/bin:$PATH"
```