
// first demo
var titleCanv = document.getElementById('title-canvas');
var titleSquare = new SquareLetters(titleCanv, 5, 2);
titleSquare.setLetters('사각글자', '30px Arial');
titleSquare.render(30, 30, 10, 5, {vertical : 'left'});

// second demo
var initOption;
var renderOptions = document.getElementsByName('render-options');
for (var i = 0; i < renderOptions.length; i++) {
    if (renderOptions[i].checked) initOption = renderOptions[i].value;
    renderOptions[i].onclick = function() {
        if (this.checked) {
        // do whatever you want with the checked radio
            var opt = this.value === 'false' ? false : this.value;
            setLettersRenderSquare.render(30, 30, 10, 5, {vertical : opt});
        // only one radio can be logically checked, don't check the rest    
        }
    }
}

var setLettersRenderCanv = document.getElementById('demo-set-letters-render-canvas');
var setLettersRenderSquare = new SquareLetters(setLettersRenderCanv, 5, 2);
setLettersRenderSquare.setLetters('꽃피는', '30px Arial', 0, 0);
setLettersRenderSquare.setLetters('봄이오면', '30px Arial', 1, 1);
setLettersRenderSquare.render(30, 30, 10, 5, {vertical : initOption});

// third demo
var defaultLettersCanv = document.getElementById('demo-default-letters-canvas');
var defaultLettersSquare = new SquareLetters(defaultLettersCanv, 5, 5);

// forth demo

// var leeSangOGamDo4Canv = document.getElementById('leeSang-OGamDo4-canvas');
// var leeSangOGamDo4Square = new SquareLetters(leeSangOGamDo4Canv, 11, 11);
// leeSangOGamDo4Square.setLetters(
//     '01234567890ㆍ' +
//     '0123456789ㆍ0' +
//     '012345678ㆍ90' +
//     '01234567ㆍ890' +
//     '01234567890ㆍ' +
//     '01234567890ㆍ' +
//     '01234567890ㆍ' +
//     '01234567890ㆍ' +
//     '01234567890ㆍ' +
//     '01234567890ㆍ')
var simpleDemo = document.getElementById('simple-demo-canvas');
var square = new SquareLetters(simpleDemo, 3, 5);
square.setDefaultLetters(
    "가나다라마" + 
    "바사아자차" + 
    "카타파하가" + 
    "나다라마바" +
    "사아자차카", '30px Arial');
square.render(30, 30, 10, 5);