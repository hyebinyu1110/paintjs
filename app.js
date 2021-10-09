
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // 캔버스상의 픽셀을 grab할수 있게함
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSaved");

const INITAL_COLOR ="#2c2c2c";
const CANVAS_SIZE = 550;

//css에서 canvas에 width와 height를 줘야 캔버스판의 사이즈가 나이스하게 보여짐(웹상)
canvas.width = CANVAS_SIZE; // 픽셀을 다루는 윈도우가 얼마나 큰지 canvas에게 알려주기위해서 width, height 사이즈를 주는 것
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.strokeStyle = INITAL_COLOR; // ctx상 all the line은 검은색을 가짐
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;
 // 캔버스는 차례대로 실행되기 때문에 및에 또다른 fillStyle이 있으면 fillRect할때 그 fillStyle이 적용됨


let painting = false;
let filling = false;


function stopPainting() {

    painting = false;
}

function startPainting() {

    painting = true;
}


function onMouseMove(event) { // 캔버스상에서 계속해서 마우스가 움직이는 동안 계속해서 함수가 실행된다. 

    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 클릭하기 전에 beginPath()를 시작함, path는 라인이다. 
        ctx.beginPath();
        ctx.moveTo(x, y); // Path가 시작하는 곳은 내 마우스가 캔버스상에 있는 곳이다. 움직이는 동안 많은 path가 만들어졌는데 하지만 어떤 path들도 사용되어지지 않음

    } else {
        ctx.lineTo(x, y); //painting이 false였을때 moveto한 지점으로 부터 lineTo한 지점까지 선이 그려진다. 하지만 눈에는 아직 안보임
        ctx.stroke();
    }


}


function HandleColorClick(event) {

    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {

    const size = event.target.value;
    ctx.lineWidth = size;
}


function handleModeClick(event) {

    if (filling === true){
        filling =false;
        mode.innerText= "Fill";
    }else{

        filling=true;
        mode.innerText="Paint";

    }

}

function  handleCanvasClick(){

    if(filling){
    ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}


function handleCM(event){

    event.preventDefault();

}

function handleSaveClick(){

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image; 
    link.download = "[paintJS]😜💕";
    link.click();

}

if (canvas) {

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // 마우스 클릭하면 startPainting한다 
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);


}

Array.from(colors).forEach(color =>
    color.addEventListener("click", HandleColorClick)

);

if (range) {

    range.addEventListener("input", handleRangeChange);
}



if (mode) {

    mode.addEventListener("click", handleModeClick);
}


if(saveBtn){

    saveBtn.addEventListener("click", handleSaveClick);

}









