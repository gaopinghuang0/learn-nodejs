### Learn jade from imooc.com/learn/259

### Install jade
```
npm install -g jade
```

### Run
```
jade -P -w index.jade
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
