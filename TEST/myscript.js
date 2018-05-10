//...JSON!
/*
var Elements = '{"pc":2,\
"router":0,\
"switch":0,\
"wifi":0,\
"notebook":0}'
*/

function PC(id){
	this.Id='object'+id;
	this.IP=[0,0,0,0];
	this.Mask=[0,0,0,0];
	this.Gateway=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.AltDNS=[0,0,0,0];
	this.Mac="";
	this.LocConnection=0;
}

function Switch(id){
	this.Id='object'+id;
	this.SlotsNum=5;
	this.Connected=[0,0,0,0,0];
}

function Router(id){
	this.Id='object'+id;
	this.IP=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.DHCP=[[0,0,0,0],[0,0,0,0]];
}

function WiFiRouter(id){
	this.Id='object'+id;
	this.IP=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.DHCP=[[0,0,0,0],[0,0,0,0]];
	this.Password="";
}

function Notebook(id){
	this.Id='object'+id;
	this.IP=[0,0,0,0];
	this.Mask=[0,0,0,0];
	this.Gateway=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.AltDNS=[0,0,0,0];
	this.Mac="";
	this.WirelessConnection=0;
	this.Password="";
}

function CreateObject(name,id){
	var newobj="";
	switch(name){
		case "pc":
			newobj=pcstack.pop();
			newobj=new PC(id);
			//console.log(pcstack,', ',newobj);
			console.log('sasiruy');
		break;
		case "switch":
			newobj=switchstack.pop();
			newobj=new Switch(id);
			console.log(switchstack,', ',newobj);
		break;
		case "router":
			newobj=routerstack.pop();
			newobj=new Router(id);
			console.log(routerstack,', ',newobj);
		break;
		case "wifi":
			newobj=wifistack.pop();
			newobj=new WiFiRouter(id);
			console.log(wifistack,', ',newobj);
		break;
		case "notebook":
			newobj=notebookstack.pop();
			newobj=new Notebook(id);
			console.log(notebookstack,', ',newobj);
		break;
	}
	
}

var Elements='{"pc":["pc1","pc2"],\
"router":["router1"],\
"switch":["switch1","switch2"],\
"wifi":[],\
"notebook":[],\
"labID":"id1"}'

var labID;

var pcstack=[];
var routerstack=[];
var switchstack=[];
var wifistack=[];
var notebookstack=[];

function WorkingSpace(typeobj,x,y,width,height,color,id,mysvg){ //...Создание рабочего пространства;
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", typeobj);
    newElement.setAttribute('x',x);
    newElement.setAttribute('y',y);
    newElement.setAttribute('width',width);
    newElement.setAttribute('height',height);
    newElement.setAttribute('fill',color);
    newElement.setAttribute('id',id);
    mysvg.appendChild(newElement);
}

function LineCreate(x1,y1,x2,y2, width, stroke,id,mysvg){ //...Draw the line! Только для границ. Возможно, приспособим под изображение проводов;
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

function ImageCreate(type){ //...Это тоже про вставку иконок;
	
	switch(type) {
	case "pc":
		var y=30;
	break;
	case "switch":
		var y=130;
	break;
	case "router":
		var y=230;
	break;
	case "wifi":
		var y=330;
	break;
	case "notebook":
		var y=430;
	break;
	}
	
	var href="desing/"+type+".svg";
	console.log(href);
    var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
	img.setAttributeNS(null,"name",type);
    img.setAttributeNS(null,"x",650);
    img.setAttributeNS(null,"y",y);
    img.setAttributeNS(null,"width",100);
    img.setAttributeNS(null,"height",100);
	img.setAttributeNS(null,"visibility","visible");
    img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
	img.setAttributeNS(null,"position","absolute");
	img.setAttributeNS(null,"opacity",1);
	img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
    svg.appendChild(img);
}

function PicCreator(type,number){
	while(number>0){
		switch(type) {
		case "pc":
			var y=30;
		break;
		case "switch":
			var y=130;
		break;
		case "router":
			var y=230;
		break;
		case "wifi":
			var y=330;
		break;
		case "notebook":
			var y=430;
		break;
		}
		
		var href="design/"+type+".svg";
		console.log(href);
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"name",type);
		img.setAttributeNS(null,"x",650);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",100);
		img.setAttributeNS(null,"height",100);
		img.setAttributeNS(null,"visibility","visible");
		img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
		img.setAttributeNS(null,"position","absolute");
		img.setAttributeNS(null,"opacity",1);
		var id=type+number;
		img.setAttributeNS(null,"id",id);
		//img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
		svg.appendChild(img);
		
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"x",650);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",100);
		img.setAttributeNS(null,"height",100);
		//img.setAttributeNS(null,"visibility","hidden");
		img.setAttributeNS(null,"visibility","visible");
		img.setAttributeNS(null,"id",type+'avatar');
		img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
		img.setAttributeNS(null,"position","absolute");
		img.setAttributeNS(null,"opacity",0.3);
		img.setAttributeNS(null,"id",'avatar'+id);
		img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
		svg.appendChild(img);
		
		--number;
	}
}

function LabSettings(){
	
	function namestostack(el,stack,number){
		--number;
		while (number>=0){
			stack.push(el[number]);
			--number;
		}
	}
	
	var ElementsAvailable = JSON.parse(Elements);
	
	for (key in ElementsAvailable) {
		if (key=="labID"){
				labID=ElementsAvailable[key];
				continue;
			}
		if (ElementsAvailable[key].length>0){
			PicCreator(key,ElementsAvailable[key].length);
			switch(key){
				case "pc":
					namestostack(ElementsAvailable[key],pcstack,ElementsAvailable[key].length);
				break;
				case "switch":
					namestostack(ElementsAvailable[key],switchstack,ElementsAvailable[key].length);
				break;
				case "router":
					namestostack(ElementsAvailable[key],routerstack,ElementsAvailable[key].length);
				break;
				case "wifi":
					namestostack(ElementsAvailable[key],wifistack,ElementsAvailable[key].length);
				break;
				case "notebook":
					namestostack(ElementsAvailable[key],notebookstack,ElementsAvailable[key].length);
				break;
			}
			
		}
	}
	console.log('Lab ID: ',labID);
	console.log('pc: ',pcstack);
	console.log('switch: ',switchstack);
	console.log('pc: ',routerstack);
	console.log('pc: ',wifistack);
	console.log('pc: ',notebookstack);
}


/*
function Transfer(evt){
	console.log(evt.target.getAttributeNS(null,"id"));
}
*/

function Transfer(evt){ //...Передвижение;
	console.log(evt.target.getAttributeNS(null,"id"));
	console.log(evt.target.getAttributeNS(null,'type'));
	
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
	}
	
	evt.target.onmouseout = function() //...На случай, если иконка не успела за курсором.
	{
		console.log('onmouseout');
		FinishingTransfer(evt);
		//evt.target.onmousemove = null;
		//evt.target.onmouseup = null;
    }
	evt.target.onmouseup = function() 
	{
		console.log('onmouseup');
		FinishingTransfer(evt);
		//evt.target.onmousemove = null;
		//evt.target.onmouseup = null;
    }
	
	function FinishingTransfer(evt)
	{
		console.log('on finishing');
		finx=evt.target.getAttributeNS(null,'x');
		finy=evt.target.getAttributeNS(null,'y');
		console.log('sperva',firstx,firsty);
		console.log(finx,finy);
		
		if (finx>500 || finy>500){
			evt.target.setAttributeNS(null,"x",firstx);
			evt.target.setAttributeNS(null,"y",firsty);
			
		}
		else {
			var actID=evt.target.getAttributeNS(null,"id");
			actID=actID.replace(/avatar/,"");
			
			//console.log('koroch ',actID);
			d=document.getElementById(actID);
			d.setAttributeNS(null,"x",finx);
			d.setAttributeNS(null,"y",finy);
			evt.target.style.display='none';
			CreateObject(d.getAttributeNS(null,"name"),d.getAttributeNS(null,"id"));
			
		}
		//evt.target=null;
		evt.target.onmousemove = null;
		evt.target.onmouseup = null;
		
	}
}

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //...Создание рабочей области SVG;
document.getElementById("maindiv").appendChild(svg);

svg.setAttribute("width",800);
svg.setAttribute("height",800);
WorkingSpace('rect',0,0,800,800,"#00FA9A","WorkSpace",svg);
LineCreate(600, 0, 600, 800, 2, 'black', 7, svg); //...Вертикальная линия;
LineCreate(0, 600, 600, 600, 2, 'black', 8, svg); //...Горизонтальная линия;
LabSettings();
