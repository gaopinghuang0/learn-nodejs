# Movie Demo
A movie demo with CRUD
http://www.imooc.com/learn/197

### Tech Stack
Node
Express
MongoDB
Jade template
underscore
body-parser
moment
Bootstrap
jQuery
bcrypt

### Install
```bash
cd imooc/
npm install  # back-end
bower install  # front-end
```

### Installation tips
When using `npm install bcrypt --save` with npm @4.0 or higher, it failed.

Based on this [solution](http://stackoverflow.com/questions/33532528/nodejs-4-5-npm-install-fail-for-bcrypt-and-db-migrate), we need to update gcc to newest version.

Follow this [post](http://www.ficksworkshop.com/blog/14-coding/65-installing-gcc-on-mac) to update gcc to gcc @4.8 via macport. Then install bcrypt: `npm install bcrypt --save`

### Run
```bash
node app.js
```
|#|module|url|
|---|---|---|
|1|home|http://localhost:3000
|2|add|http://localhost:3000/admin/movie
|3|detail|http://localhost:3000/movie/:id
|4|list|http://localhost:3000/admin/list

### Release
`bower init` and `npm init`

### TODO
after signin, we should stay in the same page
after logout, we should also stay in the same page
use angularjs and ajax to show comments or edit comments