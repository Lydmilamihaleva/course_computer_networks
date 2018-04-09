function IdCreator(type){ 	//...Функция для формирования ID для перетаскиваемых элементов. Возможно, будет пересмотрена.
	var num=(Math.floor(Math.random() * (1000 - 0)) + 0);  //...Как и многое здесь;
	return type+num;
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
	ImageCreate(650, 30, 100, 100, '#11111', "router", svg, "design/routerr.svg");
    ImageCreate(650, 130, 100, 100, '#00000', "switch", svg, "design/sw.svg");
    ImageCreate(650, 230, 100, 100, '#00000', "pc", svg, "design/pc.svg");
    ImageCreate(650, 330, 100, 100, '#00000', "wifi", svg, "design/wi-fi.svg");
}

function ImageCreate(x,y,width,height,color,type,mysvg,href) //...Это тоже про вставку иконок;
{
    var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
    img.setAttributeNS(null,"x",x);
    img.setAttributeNS(null,"y",y);
    img.setAttributeNS(null,"width",width);
    img.setAttributeNS(null,"height",height);
    img.setAttributeNS(null,"visibility","visible");
    img.setAttributeNS(null,"color",color);
    img.setAttributeNS(null,"id",IdCreator(type));
    img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
	img.setAttributeNS("null","position","absolute");
	//img.setAttribute('onmousedown','Sas(evt)');
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
	
	if (evt.which != 1) //...Не для кликов ПКМ;
		{ 
			return; 
		}

	function Moving(evt){
		console.log('ima moving...');
		evt.target.setAttributeNS(null,"x",evt.offsetX-50);
		evt.target.setAttributeNS(null,"y",evt.offsetY-50);
	}
	
	document.onmousemove = function(evt)
	{
		console.log('heeey im here');
		Moving(evt);
	}
	document.onmouseout = function() //...На случай, если иконка не успела за курсором.
	{
		console.log('Leaving New York');
		document.onmousemove = null;
		evt.target.onmouseout = null;
    }
	document.onmouseup = function() 
	{
		console.log('STOP IT!');
		document.onmousemove = null;
		evt.target.onmouseup = null;
    }
}
//...Двигается пока, конечно, так себе. Но всё будет исправлено.
function Start(){
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //...Создание рабочей области SVG;
	svg.setAttribute("width",800);
	svg.setAttribute("height",800);
	WorkingSpace('rect',0,0,800,800,"#00FA9A","WorkSpace",svg);
	LineCreate(600, 0, 600, 800, 2, 'black', 7, svg); 
    LineCreate(0, 600, 600, 600, 2, 'black', 8, svg);
	PicCreator(svg);
}


Start();
