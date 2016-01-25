(function(factory){
    'use strict'
    // commonjs
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.export = factory();
    // amd
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    // <script>    
    } else {
        var root;
        if (typeof window !== "undefined") {
          root = window;
        } else if (typeof global !== "undefined") {
          root = global;
        } else if (typeof self !== "undefined") {
          root = self;
        } else {
          // works providing we're not in "use strict";
          // needed for Java 8 Nashorn
          // see https://github.com/facebook/react/issues/3037
          root = this;
        }
        root.SquareLetters = factory();
    }
}(function(){
    // http://blog.soulserv.net/understanding-object-cloning-in-javascript-part-i/
    function shallowCopy( original )  
    {
        // First create an empty object with
        // same prototype of our original source
        var clone = Object.create( Object.getPrototypeOf( original ) ) ;

        var i , keys = Object.getOwnPropertyNames( original ) ;

        for ( i = 0 ; i < keys.length ; i ++ )
        {
            // copy each property into the clone
            Object.defineProperty( clone , keys[ i ] ,
                Object.getOwnPropertyDescriptor( original , keys[ i ] )
            ) ;
        }

        return clone;
    }

    function isNumber(obj) {
        return Object.prototype.toString.call(obj) === '[object Number]';
    }

    function joinValue(obj, sequentialKeys) {

    }

    function createCanvas(width, height) {
        var c = document.createElement('canvas');
        c.width = width;
        c.height = height;
        return c;
    }

    function isCanvas(obj) {
        return obj.toString() === "[object HTMLCanvasElement]";
    }
    function parseLetters(letters) {
        if (typeof letters === "string") {
            return letters.split("");
        }
        return letters;
    }

    var SquareLetters = function SquareLetters(canvas, colSize, rowSize, option) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.colSize = colSize;
        this.rowSize = rowSize;
        this.defaultLetters = new Array(rowSize * colSize);
        this.letters = new Array(rowSize * colSize);
    };

    SquareLetters.prototype.setColSize = function (colSize) {

    }

    SquareLetters.prototype.setRowSize = function (rowSize) {

    }

    function _setLetters(prevLetters, lettersInput, font, x, y, colSize, rowSize, isClear) {
        x = isNumber(x) ? x : 0;
        y = isNumber(y) ? y : 0;
        var letters = isClear || !prevLetters ? new Array(colSize * rowSize) : prevLetters;
        var idx = y * colSize + x;

        var lettersArray = typeof lettersInput === 'string' ? lettersInput.split('') : lettersInput;
        var newLetters = lettersArray.map(function (letterItem) {
            if (typeof letterItem === 'string') {
                return {
                    letter : letterItem,
                    font : font
                }
            } else if (typeof letterItem === 'object') {
                return letterItem;
            } else {
                throw new Error("wrong letters format");
            }
        })
        lettersArgs = [idx, newLetters.length].concat(newLetters);
        Array.prototype.splice.apply(letters, lettersArgs);
        return letters;
    }

    SquareLetters.prototype.setDefaultLetters = function (defaultLettersInput, font, x, y, option) {
        option = arguments.length > 2 && typeof arguments[arguments.length - 1] === 'object' ? 
                arguments[arguments.length - 1] : {};
        this.defaultLetters = _setLetters(
            this.defaultLetters, 
            defaultLettersInput,  
            font, 
            x, 
            y, 
            this.colSize, 
            this.rowSize,
            option.clear);
    };

    SquareLetters.prototype.setLetters = function (lettersInput, font, x, y, option) {
        option = arguments.length > 2 && typeof arguments[arguments.length - 1] === 'object' ? 
                arguments[arguments.length - 1] : {};
        this.letters = _setLetters(this.letters, lettersInput, font, x, y, this.colSize, this.rowSize, option.clear);
    };

    SquareLetters.prototype.randomSetLetters = function () {

    };

    SquareLetters.prototype.render = function (letterWidth, letterHeight, gutter, padding, option) {
        option = typeof arguments[arguments.length - 1] === 'object' ? 
                arguments[arguments.length - 1] : {};
        letterHeight = isNumber(letterHeight) ? letterHeight : letterWidth;
        gutter = isNumber(gutter) ? gutter : 0;
        padding = isNumber(padding) ? padding : 0;

        var ctx = this.ctx;
        var colSize, rowSize;

        if (option.vertical) {
            rowSize = this.colSize;
            colSize = this.rowSize;
        } else {
            colSize = this.colSize;
            rowSize = this.rowSize;
        }
        
        // undefined => null
        var renderLetters = JSON.parse(JSON.stringify(this.defaultLetters));
        this.letters.map(function (letter, i) {
            renderLetters[i] = JSON.parse(JSON.stringify(letter));
        })

        this.canvas.width = colSize > 0 ? colSize * letterWidth + (colSize - 1) * gutter : 0;
        this.canvas.width += padding * 2;
        this.canvas.height = rowSize > 0 ? rowSize * letterHeight + (rowSize - 1) * gutter : 0;
        this.canvas.height += padding * 2;

        renderLetters.map(function (item, idx) {
            if (!item) return;

            var x, y, xPos, yPos;
            if (option.vertical) {
                x = idx / rowSize | 0; // float to int;
                y = idx % rowSize;
            } else {
                x = idx % colSize;
                y = idx / colSize | 0; // float to int;
            }

            xPos = x;  
            yPos = y;
            if (option.vertical === 'right') {
                xPos = colSize - x - 1;
            }

            xPos = padding + xPos * (letterWidth + gutter);
            yPos = padding + yPos * (letterHeight + gutter);

            var letter = typeof item === 'string' ? item : item.letter;
            var letterCanv = createCanvas(letterWidth, letterHeight);
            var letterCtx = letterCanv.getContext('2d');
            if (option.beforeRenderLetter) {
                option.beforeRenderLetter(letterCtx, x, y, item);
            }
            // letterCtx.fillStyle = "#A83F70";
            // letterCtx.fillRect(0,0, letterWidth, letterHeight);
            // letterCtx.fillStyle = "#333333";
            setText(letterCtx, letter, letterWidth/2, letterHeight/2, 'center', 'middle', item.font);
            if (option.afterRenderLetter) {
                option.afterRenderLetter(letterCtx, x, y, item);
            }

            ctx.drawImage(letterCanv, xPos, yPos);
        })
    }
    function setText(ctx, text, x, y, textAlign, verticalAlign, fontData) {
        if (isCanvas(ctx)) {
            ctx = ctx.getContext('2d');
        }

        var font;
        if (typeof fontData === 'string') {
            font = fontData;
        } else {
            font = joinValue(fontData, []);
        }
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.textBaseline = verticalAlign;
        ctx.fillText(text, x, y);
    }
    SquareLetters.setText = setText
    return SquareLetters;
}));