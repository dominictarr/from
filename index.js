'use strict';

var Stream = require('readable-stream')

// from
//
// a stream that reads from an source.
// source may be an array, or a function.
// from handles pause behaviour for you.

module.exports = from

function from(source) {
    if (Array.isArray(source)) {
        return from(readArray)
    }

    var stream = new Stream()
        , ended = false
        , buffer = []

    stream.readable = true
    stream.writable = false

    stream.read = read
    stream.end = end

    stream.once("end", setReadable)

    return stream

    function readArray(bytes) {
        if (source.length) {
            return source.shift()
        } else {
            this.emit("end")
        }
    }

    function read(bytes) {
        if (ended) {
            return null
        }
        var result = source.call(stream, bytes, buffer)

        return result === undefined ? null : result
    }

    function end() {
        ended = true
        stream.emit("end")
    }

    function setReadable() {
        ended = true
        stream.readable = false
    }
}