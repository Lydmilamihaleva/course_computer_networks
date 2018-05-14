var Elements='{"pc":["pc1","pc2"],\
"router":["router1"],\
"switch":["switch1","switch2"],\
"wifi":[],\
"notebook":[],\
"labID":"id1"}'

var ISSHOWING; //...Какой набор полей отображается?

function FieldsCreate(obj){
	var x=30,y=630;
	var num=0;
	for (key in obj){ //...SlotsNumber и Connected сделать бы аутпутами... Правильность ввода остального будем проверять регулярным выражением;
		if (key=="Id") continue;
		if (key=="Mac"||key=="LocConnection"||key=="WirelessConnection"){
			 console.log('Je to osoboje pole - ',key,',delaem chtoto drugoje');
			 continue;
		}
		var leibl=document.createElement("label");
		leibl.style.left=x+"px";
		leibl.style.top=y+"px";
		leibl.innerHTML=key+':';
		leibl.style.position="absolute";
		leibl.setAttribute("id","LEIBL");
		leibl.style.visibility="hidden"; //...Видимость! Не потеряй!
		document.getElementById("maindiv").appendChild(leibl);
		
		var field=document.createElement("input");
		field.type="text";
		field.style.position="absolute";
		field.style.left=x+50+"px"; //...Попробуем подравнять. Сработало?
		field.style.visibility="hidden"; //...И это видимость! И это не потеряй!
		if (key=="SlotsNum"||key=="Connected"){
				field.setAttribute("readonly","readonly");
				field.setAttribute("placeholder","azaza");
		}
		//field.setAttribute("pattern","\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"); //или нахер этот паттерн, скриптом мб проверять?
		document.getElementById("LEIBL").appendChild(field);
		
		
		
		
		
		field.setAttribute("class",obj.Id);
		leibl.setAttribute("class",obj.Id);
		leibl.setAttribute("id",'label'+obj.Id+key);
		field.setAttribute("id",obj.Id+key);
		//field.id=obj.Id+key;
		y=y+30;
		//console.log(y);
	}
	var knopka=document.createElement("input");
	knopka.type="button";
	knopka.setAttribute("class",obj.Id);
	knopka.setAttribute("id",'button'+obj.Id);
	knopka.value="SET";
	knopka.style.position="absolute";
	knopka.style.visibility="hidden";
	knopka.setAttribute("onclick","SetStats()")
	document.getElementById("maindiv").appendChild(knopka);
	
	knopka.style.left=500+"px";
	knopka.style.top=700+"px";
}

function SetStats()
{
	console.log(ISSHOWING);
	console.log(document.getElementsByClassName(ISSHOWING));
	var d=document.getElementsByClassName(ISSHOWING);
	for (var i=0; i<d.length; i++ ){
		if (d[i].type=='button'){
			continue;
		}
		for (key in d){ //...value
			//...бля...тут отрезать надо куски от строк опять, пиздец.
		}
	}
}

function PC(id){
	this.Id='object'+id; //...Не показывает.
	this.IP=[0,0,0,0];
	this.Mask=[0,0,0,0];
	this.Gateway=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.AltDNS=[0,0,0,0];
	this.Mac=""; //...Исключение; Генерится автоматически (пожалуй что);
	this.LocConnection=0; //...Исключение; Не может вводиться пользователем; Да и, наверное, вообще не показывается...
}

function Switch(id){
	this.Id='object'+id; //...Не показывает;
	this.SlotsNum=5; //...Не показывает, пожалуй что.
	this.Connected=[0,0,0,0,0]; //...Показывается, но не может быть изменено юзером;
}

function Router(id){
	this.Id='object'+id; //...Не показывает;
	this.IP=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.Mask=[0,0,0,0];
	this.DHCP=[[0,0,0,0],[0,0,0,0]];
}

function WiFiRouter(id){
	this.Id='object'+id; //...Не показывает;
	this.IP=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.DHCP=[[0,0,0,0],[0,0,0,0]];
	this.Password="";
}

function Notebook(id){
	this.Id='object'+id; //...Не показывает;
	this.IP=[0,0,0,0];
	this.Mask=[0,0,0,0];
	this.Gateway=[0,0,0,0];
	this.DNS=[0,0,0,0];
	this.AltDNS=[0,0,0,0];
	this.Mac=""; //...Генерится автоматически;
	this.WirelessConnection=0; //...Исключение;
	this.Password="";
}

//...Итого, у нас ВСЕГДА исключен Id... Бороться с этим несложно. Со свитчом разговор особый. По 2 исключения для двух видов ЭВМ.
//...ID можно исключить If'ом навсегда...

function CreateObject(name,id){
	var newobj="";
	var bufnum; //...Храним номер последнего созданного объекта;
	function IsObject(mas){
	size=mas.length-1;
		while(size>=0){
			if ( typeof(mas[size])=="object" ){
				--size;
			}
			else{
				return size;
			}
		}			
	}
	
	switch(name){
		case "pc":
			bufnum=IsObject(pcstack);
			pcstack[bufnum]=new PC(id);
			FieldsCreate(pcstack[bufnum]);
		break;
		case "switch":
			bufnum=IsObject(switchstack);
			switchstack[bufnum]=new Switch(id);
			FieldsCreate(switchstack[bufnum]);
		break;
		case "router":
			bufnum=IsObject(routerstack);
			routerstack[bufnum]=new Router(id);
			FieldsCreate(routerstack[bufnum]);
		break;
		case "wifi":
			bufnum=IsObject(wifistack);
			wifistack[bufnum]=new WiFiRouter(id);
			FieldsCreate(wifistack[bufnum]);
		break;
		case "notebook":
			bufnum=IsObject(notebookstack);
			notebookstack[bufnum]=new Notebook(id);
			FieldsCreate(notebookstack[bufnum]);
		break;
	}
	
}

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
		img.setAttributeNS(null,"num",number); //....Тут у нас номер элемента. Его мы заюзаем при обращении к объектам.
		var id=type+number;
		img.setAttributeNS(null,"id",id);
		img.setAttribute('onclick','VisibilitySettings(evt)'); //...А еще для них предусмотрено перемещение!;
		svg.appendChild(img);
		
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"x",650);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",100);
		img.setAttributeNS(null,"height",100);
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

function VisibilitySettings(evt){ //...Сейчас придумаем другое название и замутим отображение полей
	if (ISSHOWING!=undefined){
		var ToInvis=ISSHOWING;
		var rar=document.getElementsByClassName(ToInvis);
		for (var i=0; i<rar.length; i++){
			rar[i].style.visibility="hidden";
		}
	}
	var d=evt.target.getAttributeNS(null,"id");
	d='object'+d;
	var v=document.getElementsByClassName(d);
	//console.log(v);
	for (var i=0; i< v.length; i++){
		//console.log(v[i]);
		v[i].style.visibility = "visible";
	}
	ISSHOWING=d;
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
    }
	evt.target.onmouseup = function() 
	{
		console.log('onmouseup');
		FinishingTransfer(evt);
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
			d=document.getElementById(actID);
			d.setAttributeNS(null,"x",finx);
			d.setAttributeNS(null,"y",finy);
			evt.target.style.display='none';
			CreateObject(d.getAttributeNS(null,"name"),d.getAttributeNS(null,"id"));
			evt.target.remove();
		}
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

sas=document.getElementById("maindiv");
sas.style.position="absolute";
sas.style.left="0px"; //...Не забудь потом подвигать это всё
sas.style.top="0px";

LabSettings();


