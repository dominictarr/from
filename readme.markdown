# from

An easy way to create a `readable Stream`.

## from(function getChunk(bytes, buffer))

from takes a `getChunk` function and returns a stream.

`getChunk` is called each time read is called on the readable stream.

``` js
var from = require('from')

var stream = from(function getChunk(bytes, buffer) {
    //do some sort of data
    buffer.push(whatever)
    
    if(itsOver)
      this.emit('end')

    // return a chunk 
    return buffer.shift()
  })
```

## License
MIT / Apache2
