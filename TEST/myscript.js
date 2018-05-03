

function IdCreator(type){ 	//...Функция для формирования ID для перетаскиваемых элементов. Возможно, будет пересмотрена.
	var num=(Math.floor(Math.random() * (1000 - 0)) + 0);  //...Как и многое здесь;
	return type+num;
}

var routernumber=3;
var switchnumber=3;
var pcnumber=3;
var wifinumber=3;

var routerstack = [];
var switchstack = [];
var pcstack = [];
var wifistack = [];

function ObjectsAvailable(type){
	switch(type) {
		case "router":
			if (routernumber>=1) {
				ImageCreate(650, 30, 100, 100, "router", svg, "design/routerr.svg");
				--routernumber;
			}
		break;
		case "switch":
			if (switchnumber>=1) {
				ImageCreate(650, 130, 100, 100, "switch", svg, "design/sw.svg");
				--switchnumber;
			}
		case "pcstack":
			if (pcnumber>=1) {
				 ImageCreate(650, 230, 100, 100, "pc", svg, "design/pc.svg");
				--pcnumber;
			}
		break;
		case "wifistack":
			if (wifinumber>=1) {
				ImageCreate(650, 330, 100, 100, "wifi", svg, "design/wi-fi.svg");
				--wifinumber;
			}
		break;	
	}
}

function ObjectsStack(id,type){
	switch(type) {
		case "router":
			routerstack.push(id);
		break;
		case "switch":
			switchstack.push(id);
			return 0;
		break;
		case "pc":
			pcstack.push(id);
			return 0;
		break;
		case "wifi":
			wifistack.push(id);
			return 0;
		break;
		
		case "routeravatar":
			return routerstack.pop();
			break;
		case "switchavatar":
			return switchstack.pop();
			break;
		case "pcavatar":
			return pcstack.pop();
			break;
		case "wifiavatar":
			return wifistack.pop();
			break;
			
	}
}


function WorkingSpace(typeobj,x,y,width,height,color,id,mysvg) //...Создание рабочего пространства;
{
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", typeobj);
    newElement.setAttribute('x',x);
    newElement.setAttribute('y',y);
    newElement.setAttribute('width',width);
    newElement.setAttribute('height',height);
    newElement.setAttribute('fill',color);
    newElement.setAttribute('id',id);
    mysvg.appendChild(newElement);
	
	
}

function PicCreator(svg){ //...Вставка иконок элементов;
	document.getElementById("maindiv").appendChild(svg);
	ImageCreate(650, 30, 100, 100, "router", svg, "design/routerr.svg");
    ImageCreate(650, 130, 100, 100, "switch", svg, "design/sw.svg");
    ImageCreate(650, 230, 100, 100, "pc", svg, "design/pc.svg");
    ImageCreate(650, 330, 100, 100, "wifi", svg, "design/wi-fi.svg");
	/*
	ImageCreate(650, 30, 100, 100, "router", svg, "design/routerr.svg");
    ImageCreate(650, 130, 100, 100, "switch", svg, "design/sw.svg");
    ImageCreate(650, 230, 100, 100, "pc", svg, "design/pc.svg");
    ImageCreate(650, 330, 100, 100, "wifi", svg, "design/wi-fi.svg");
	*/
	AvatarCreate(650,30,100,100,"router",svg,"design/routerr.svg");
	AvatarCreate(650,130,100,100,"switch",svg,"design/sw.svg");
	AvatarCreate(650,230,100,100,"pc",svg,"design/pc.svg");
	AvatarCreate(650,330,100,100,"wifi",svg,"design/wi-fi.svg");
}

function AvatarCreate(x,y,width,height,type,mysvg,href){
	var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
    img.setAttributeNS(null,"x",x);
    img.setAttributeNS(null,"y",y);
    img.setAttributeNS(null,"width",width);
    img.setAttributeNS(null,"height",height);
    //img.setAttributeNS(null,"visibility","hidden");
	img.setAttributeNS(null,"visibility","visible");
    img.setAttributeNS(null,"id",type+'avatar');
    img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
	img.setAttributeNS(null,"position","absolute");
	img.setAttributeNS(null,"opacity",0.3);
	img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
    mysvg.appendChild(img);
}

function ImageCreate(x,y,width,height,type,mysvg,href) //...Это тоже про вставку иконок;
{
    var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
	img.setAttributeNS(null,"name",type);
    img.setAttributeNS(null,"x",x);
    img.setAttributeNS(null,"y",y);
    img.setAttributeNS(null,"width",width);
    img.setAttributeNS(null,"height",height);
    //img.setAttributeNS(null,"visibility","hidden");
	img.setAttributeNS(null,"visibility","visible");
	ObID=IdCreator(type);
    img.setAttributeNS(null,"id",ObID);
	
	ObjectsStack(ObID,type);
	
    img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
	img.setAttributeNS(null,"position","absolute");
	img.setAttributeNS(null,"opacity",1);
	img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
    mysvg.appendChild(img);
}

function LineCreate(x1,y1,x2,y2, width, stroke,id,mysvg) //...Draw the line! Только для границ. Возможно, приспособим под изображение проводов;
{
	var line= document.createElementNS("http://www.w3.org/2000/svg",'line');
	line.setAttribute("x1",x1);
	line.setAttribute("y1",y1);
	line.setAttribute("x2",x2);
	line.setAttribute("y2",y2);
	line.setAttribute("stroke-width",width);
	line.setAttribute("stroke",stroke);
	line.setAttribute("id",id);
	mysvg.appendChild(line);

}


function Transfer(evt){ //...Передвижение;
	
	console.log('you clicked me)))');
	console.log(evt.target.getAttributeNS(null,'type'));
	movingpic=document.getElementById(evt.target.getAttributeNS(null,'name')+'avatar');
	//console.log(movingpic);
	//movingpic.setAttributeNS(null,"visibility","visible");
	//movingpic.setAttributeNS(null,"x",30);
	//movingpic.setAttributeNS(null,"y",30);
	//console.log(evt.target.getAttributeNS(null,'name'));
	//ВОТ! ЭТО НУЖНО ЗАПОМНИТЬ!;
	//console.log(evt.target.getAttributeNS(null,'x'));
	//ВОТ! ЭТО НУЖНО ЗАПОМНИТЬ!;
	
	if (evt.which != 1){ //...Не для кликов ПКМ; 
			return; 
		}
	
	var fx=evt.target.getAttributeNS(null,'x'); //...Координаты, на которых изначально расположен двигаемый элемент;
	var fy=evt.target.getAttributeNS(null,'y');
	console.log(fx,fy);
	
	var firstx=fx;
	var firsty=fy;
	
	console.log('first:',firstx,'firsty:',firsty);
	fx=fx-evt.offsetX; //...Координаты, на которых произведено зажатие ЛКМ;
	fy=fy-evt.offsetY;
	console.log(fx,fy);
	
	
	evt.target.onmousemove = function(evt)
	{
		Moving(evt);
	}
	
	function Moving(evt){
		evt.target.setAttributeNS(null,"x",evt.offsetX+fx);
		evt.target.setAttributeNS(null,"y",evt.offsetY+fy);
		//console.log(evt.target.getAttributeNS(null,'x'));
		
	}
	
	evt.target.onmouseout = function() //...На случай, если иконка не успела за курсором.
	{
		console.log('Leaving New York');
		FinishingTransfer(evt);
		//evt.target.onmousemove = null;
		//evt.target.onmouseout = null;
    }
	evt.target.onmouseup = function() 
	{
		console.log('STOP IT!');
		FinishingTransfer(evt);
		//evt.target.onmousemove = null;
		//evt.target.onmouseup = null;
    }
	
	function FinishingTransfer(evt)
	{
		//console.log(evt);
		finx=evt.target.getAttributeNS(null,'x');
		finy=evt.target.getAttributeNS(null,'y');
		console.log('sperva',firstx,firsty);
		console.log(finx,finy);
		
		if (finx>500 || finy>500){
			evt.target.setAttributeNS(null,"x",firstx);
			evt.target.setAttributeNS(null,"y",firsty);
		}
		else {
			var d=document.getElementById(ObjectsStack(null,evt.target.getAttributeNS(null,"id")));
			//console.log(d.getAttributeNS(null,"name"));
			d.setAttributeNS(null,"x",finx);
			d.setAttributeNS(null, "y", finy);
			ObjectsAvailable(d.getAttributeNS(null,"name"));
			//ImageCreate(650, 30, 100, 100, "router", svg, "design/routerr.svg");
			//evt.target.onmousemove = null;
			//evt.target.onmouseup = null;
		}
		evt.target.onmousemove = null;
		evt.target.onmouseup = null;
	}
}
//...Двигается пока, конечно, так себе. Но всё будет исправлено.
function Start(){
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //...Создание рабочей области SVG;
	svg.setAttribute("width",800);
	svg.setAttribute("height",800);
	WorkingSpace('rect',0,0,800,800,"#00FA9A","WorkSpace",svg);
	LineCreate(600, 0, 600, 800, 2, 'black', 7, svg); //...Вертикальная линия;
    LineCreate(0, 600, 600, 600, 2, 'black', 8, svg); //...Горизонтальная линия;
	PicCreator(svg);
}


Start();
