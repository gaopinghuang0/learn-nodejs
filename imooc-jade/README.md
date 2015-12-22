### Learn jade from imooc.com/learn/259

### Install jade
```
npm install -g jade
```

### Run
```
jade -P -w index.jade
// pass variable via command line
jade -P -w index.jade --obj '{"course": "jade"}'
// pass variable via json file
jade -P -w index.jade -O imooc.json
```

### Rules
A long paragraph can use a dot(.) after tag and then write chunk text after indentation
For example, 
```jade
p.
  1. aa <strong>11</strong>
  2. bb
  3. cc
```
Or use a vertical line before each new line, for example
```jade
p
  | 1. aa
  strong 11
  | 2. bb
  span 12
  | 3. cc
```
Define and use a variable
```jade
- var course = 'jade'
title #{course.toUpperCase()}
```
Safe text and raw text
```jade
p #{data}
p !{data}
input(value=data)

// or
p= data
p!= data
```
Escape '{' and '}'
```jade
p \!{data}
```

### Use Jade API
```
npm install jade
// require jade in server.js
node server
```

### Use filters
install plugin to global
```
npm install sass coffee-script markdown -g
// after Jade@2.0.0
npm install jstransformer-sass jstransformer-coffee-script jstransformer-markdown -g
```

### Runtime pre-compile
```
jade --client --no-debug runtime.jade
// generate runtime.js-
```

### Re-compile html to jade
```
npm install html2jade -g
html2jade http://www.imooc.com > imooc.jade
```
