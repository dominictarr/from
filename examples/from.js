var from = require("..")
    , Stream = require("stream")
    , output = new Stream()

output.write = function (chunk) {
    console.log(chunk)
    return true
}

output.end = function () {
    console.log("ended")
}

var one = from([1,2,3,4])

one.pipe(output)

var two = from(function (bytes, buffer) {
    var item = buffer.push(0)
    if (item < 5) {
        return item
    }
    this.emit("end")
})

two.pipe(output)

var three = from(function (bytes, buffer) {
    var chunk = buffer.shift()
        , stream = this

    if (chunk !== undefined && chunk < 5) {
        return chunk
    } else if (chunk >= 5) {
        this.emit("end")
    } else {
        setTimeout(function () {
            // We need to generate a new number on each setTimeout
            // Do this by keeping a running counter on the buffer
            var count = buffer.count = ++buffer.count || 1
            buffer.push(count)
            stream.emit("readable")
        }, 500)
    }
})

three.pipe(output)