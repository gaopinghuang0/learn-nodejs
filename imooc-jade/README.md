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
