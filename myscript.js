var pcstack=[];
var switchstack=[];
var routerstack=[];
var wifistack=[];
var notebookstack=[];

var ISSHOWING;
var occupiedplaces=[];
//var ror=0;
function IdGenerator(type){
	var date=new Date();
	var v=date.getTime();
	return type+v;
}

function LabSettings(){
	PicCreator();
}

function FieldsCreator(obj){
	//console.log('VOT:',obj.name)
	var x=30,y=620;
	for (key in obj){
		if (y>=800){
			x=300;
			y=620;
		}
		if (key!="id"&&key!="LocConnection"&&key!="ConnectedTo"&&key!="SlotsNum"&&key!="Mac"&&key!="WirelessConnection"&&key!="name"){
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
			//field.style.top=y+"px";
			field.name=key;
			//field.otsos="zhopka";
			field.style.visibility="hidden"; //...И это видимость! И это не потеряй!
			//field.setAttribute("pattern","\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"); //или к черту этот паттерн, скриптом мб проверять?
			document.getElementById("LEIBL").appendChild(field);
			field.setAttribute("class",'object'+obj.id);
			leibl.setAttribute("class",'object'+obj.id);
			leibl.setAttribute("id",'label'+obj.id+key);
			field.setAttribute("id",obj.id+key);
		//field.id=obj.Id+key;
		y=y+30;
		}
		if (key=="Slots"){
			var sname=obj.name;
			console.log('AHAHAHAHAHAH',obj.id);
			//var el=ISSHOWING.replace(/object/,"");
			
			field.setAttribute("readonly","readonly");
			field.value="0/5";
			}
	}
	var knopka=document.createElement("input");
	knopka.type="button";
	knopka.setAttribute("class",'object'+obj.id);
	knopka.setAttribute("id",'button'+obj.id);
	knopka.value="SET";
	knopka.name=obj.name;
	knopka.style.position="absolute";
	knopka.style.visibility="hidden";
	knopka.setAttribute("onclick","SetStats(this)")
	//knopka.addEventListener("click", SetStats);
	knopka.style.left=500+"px";
	knopka.style.top=700+"px";
	document.getElementById("maindiv").appendChild(knopka);
	
	
}

function SetStats(but){
	//console.log(ISSHOWING);
	//console.log(document.getElementsByClassName(ISSHOWING));
	var d=document.getElementsByClassName(ISSHOWING);
	console.log(d);
	//for (var i=0; i<d.length; i++ ){
		//if ((d[i].type=='button')||(d[i].tagName=='LABEL')){
		//	continue;
		//}	
		//console.log(but.name);
		var type=but.name;
		type=type+"stack"; //...Определяем, в каком стеке ковырять
		var el=ISSHOWING.replace(/object/,""); //...
		for (i in window[type]){
			//console.log(window[type][i].id,el);
			if (window[type][i].id==el){
				//console.log(window[type][i])
				for (ev in window[type][i]){
					//console.log(ev, window[type][i][ev]);
					var mda=el+ev;
					if (document.getElementById(mda)==null){ //...Работает, кажись;
						continue;
					}
					
					console.log(mda);
					window[type][i][ev]=document.getElementById(mda).value;
				}
			}
		}
		//document.getElementById("pc1527496110384Mask").value ЦЕ ВАЖНО!
		//console.log(d[i]);
		//console.log(ISSHOWING);
		//window['pcstack'][1]
		//var el=ISSHOWING.replace(/object/,"");
		//var num=el[el.length-1];
		//var type=(el.substring(0, el.length - 1));
		//var setatr=d[i].id;
		//var znach=(setatr.substring((type.length+7),(setatr.length))); //...Поле, куда данные вписывать
		//console.log('znach ',znach);
		//console.log('type ',type); 
		//var sa
		//type=type+'stack'; //...а это стек в котором шарим -- STACK
		//console.log('type ',type);
		//console.log('el ',el)
		//console.log(window[type][1]); я пока это всё делал не помню уже чо в итоге то хотел(9((99()) еще idшник потерялся где-то же
		//ISSHOWING вместо Id шника пойдет короче -- ID;
		//window[type]
		
	//}
}

function ConstructorSwitch(type,x,y){
	console.log('i am here and ...',type);
	switch(type){
		case "pc":
			PC(x,y);
		break;
		case "switch":
			Switch(x,y);
		break;
		case "router":
			Router(x,y);
		break;
		case "wifi":
			WiFiRouter(x,y);
		break;
		case "notebook":
			Notebook(x,y);
		break;
	}
}

//...........................................................................................................................................
function PC(x,y){ //...Смысл примерно такой;
	var pcpic=document.createElementNS("http://www.w3.org/2000/svg",'image');
	pcpic.setAttributeNS(null,"x",x);
	pcpic.setAttributeNS(null,"y",y);
	pcpic.setAttributeNS(null,"width",100);
	pcpic.setAttributeNS(null,"height",100);
	pcpic.setAttributeNS(null,"visibility","visible");
	pcpic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/pc.svg');
	pcpic.setAttributeNS(null,"position","absolute");
	pcpic.setAttributeNS(null,"opacity",1);
	pcpic.setAttribute('onclick','ClickingObjects(evt)');
	var newId=IdGenerator("pc");
	pcpic.id=newId; //...Наверно сюда примем тип
	svg.appendChild(pcpic);
	
	pc={
		name:"pc",
		id:newId,//...Наверно сюда генер засунем. Точнее генер выше а сюда чо-нить еще
		IP:"",
		Mask:"",
		Gateway:"",
		DNS:"",
		AltDNS:"",
		Mac:"",
		LocConnection:0, 
		ConnectedTo:[],
		Slots:1
	}
	pcstack.push(pc);
	FieldsCreator(pc);
}

function Switch(x,y){ //...Смысл примерно такой;
	var switchpic=document.createElementNS("http://www.w3.org/2000/svg",'image');
	switchpic.setAttributeNS(null,"x",x);
	switchpic.setAttributeNS(null,"y",y);
	switchpic.setAttributeNS(null,"width",100);
	switchpic.setAttributeNS(null,"height",100);
	switchpic.setAttributeNS(null,"visibility","visible");
	switchpic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/switch.svg');
	switchpic.setAttributeNS(null,"position","absolute");
	switchpic.setAttributeNS(null,"opacity",1);
	switchpic.setAttribute('onclick','ClickingObjects(evt)');
	var newId=IdGenerator("switch");
	switchpic.id=newId; //...Наверно сюда примем тип
	svg.appendChild(switchpic);
	
	swtch={
		name:"switch",
		id:newId, //...Не показывает;
		SlotsNum:5, //...Не показывает, пожалуй что.
		ConnectedTo:[], //...Показывается, но не может быть изменено юзером;
		Slots:5
	}
	switchstack.push(swtch);
	FieldsCreator(swtch);
}

function Router(x,y){ //...Смысл примерно такой;
	var routpic=document.createElementNS("http://www.w3.org/2000/svg",'image');
	routpic.setAttributeNS(null,"x",x);
	routpic.setAttributeNS(null,"y",y);
	routpic.setAttributeNS(null,"width",100);
	routpic.setAttributeNS(null,"height",100);
	routpic.setAttributeNS(null,"visibility","visible");
	routpic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/router.svg');
	routpic.setAttributeNS(null,"position","absolute");
	routpic.setAttributeNS(null,"opacity",1);
	routpic.setAttribute('onclick','ClickingObjects(evt)');
	var newId=IdGenerator("router");
	routpic.id=newId; //...Наверно сюда примем тип
	svg.appendChild(routpic);
	
	router={
		name:"router",
		id:newId, //...Не показывает;
		IP:"",
		DNS:"",
		Mask:"",
		DHCP:"",
		ConnectedTo:[],
		Slots:5
	}
	routerstack.push(router);
	FieldsCreator(router);
}

function WiFiRouter(x,y){ //...Смысл примерно такой;
	var wifipic=document.createElementNS("http://www.w3.org/2000/svg",'image');
	wifipic.setAttributeNS(null,"x",x);
	wifipic.setAttributeNS(null,"y",y);
	wifipic.setAttributeNS(null,"width",100);
	wifipic.setAttributeNS(null,"height",100);
	wifipic.setAttributeNS(null,"visibility","visible");
	wifipic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/wifi.svg');
	wifipic.setAttributeNS(null,"position","absolute");
	wifipic.setAttributeNS(null,"opacity",1);
	wifipic.setAttribute('onclick','ClickingObjects(evt)');
	var newId=IdGenerator("wifi");
	wifipic.id=newId; //...Наверно сюда примем тип
	svg.appendChild(wifipic);
	
	wifi={
		name:"wifi",
		id:newId, //...Не показывает;
		IP:"",
		DNS:"",
		DHCP:"",
		ConnectedTo:[],
		Password:"",
		Slots:1
	}
	wifistack.push(wifi);
	FieldsCreator(wifi);
}

function Notebook(x,y){
	var notepic=document.createElementNS("http://www.w3.org/2000/svg",'image');
	notepic.setAttributeNS(null,"x",x);
	notepic.setAttributeNS(null,"y",y);
	notepic.setAttributeNS(null,"width",100);
	notepic.setAttributeNS(null,"height",100);
	notepic.setAttributeNS(null,"visibility","visible");
	notepic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/notebook.svg');
	notepic.setAttributeNS(null,"position","absolute");
	notepic.setAttributeNS(null,"opacity",1);
	notepic.setAttribute('onclick','ClickingObjects(evt)');
	var newId=IdGenerator("notebook");
	notepic.id=newId; //...Наверно сюда примем тип
	svg.appendChild(notepic);
	
	notebook={
		name:"notebook",
		id:newId, //...Не показывает;
		IP:"",
		Mask:"",
		Gateway:"",
		DNS:"",
		AltDNS:"",
		Mac:"", //...Генерится автоматически;
		WirelessConnection:0, //...Исключение;
		ConnectedTo:[],
		Password:"",
		//Slots:1
	}
	notebookstack.push(notebook);
	FieldsCreator(notebook);
}
//..............................................................................................................................................

function ClickingObjects(evt){
	console.log(evt.target.id);
	if (ISSHOWING!=undefined){
		var ToInvis=ISSHOWING;
		var rar=document.getElementsByClassName(ToInvis);
		for (var i=0; i<rar.length; i++){
			rar[i].style.visibility="hidden";
		}
	}
	var d=evt.target.id;
	d='object'+d;
	console.log(d);
	var v=document.getElementsByClassName(d);
	console.log(v);
	//console.log(v);
	for (var i=0; i< v.length; i++){
		//console.log(v[i]);
		v[i].style.visibility = "visible";
	}
	ISSHOWING=d;
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

function PicCreator(){
	var objects=["pc","switch","router","wifi","notebook","cable1"];
	for (i=0;i<objects.length;i++){
		
		switch(objects[i]) {
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
			case "cable1":
				var y=530;
		}
		
		var href="design/"+objects[i]+".svg";
		console.log(href);
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"name",objects[i]);
		img.setAttributeNS(null,"x",670);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",70);
		img.setAttributeNS(null,"height",70);
		img.setAttributeNS(null,"visibility","visible");
		img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
		img.setAttributeNS(null,"position","absolute");
		img.setAttributeNS(null,"opacity",1);
		//img.setAttributeNS(null,"num",number); //....Тут у нас номер элемента. Его мы заюзаем при обращении к объектам.
		var id=objects[i];
		img.setAttributeNS(null,"id",id);
		//img.setAttribute('onclick','VisibilitySettings(evt)'); //...А еще для них предусмотрено перемещение!;
		svg.appendChild(img);
		
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"x",670);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",70);
		img.setAttributeNS(null,"height",70);
		img.setAttributeNS(null,"visibility","visible");
		//img.setAttributeNS(null,"zalupko","red");
		img.setAttributeNS(null,"id",objects[i]+'avatar');
		img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
		img.setAttributeNS(null,"position","absolute");
		img.setAttributeNS(null,"opacity",0.3);
		img.setAttributeNS(null,"id",'avatar'+id);
		if (objects[i]!="cable1"){
			img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
		}
		else{
			img.setAttribute('onclick','Connection(evt)');
		}
		svg.appendChild(img);
	}
}

function Connection(evt){
	console.log("that's true");
	while (true){
		console.log(evt.target.id);
	}
}

function Transfer(evt){ //...Передвижение;
	console.log(evt.target.getAttributeNS(null,"id"));
	console.log(evt.target.getAttributeNS(null,'type'));
	//evt.target.style.zIndex="999";
	svg.appendChild(evt.target); //...Офигеть не встать, сработало
	
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
		
		if (finx>500 || finy>500 || IsOccupied(finx,finy)==0){
			evt.target.setAttributeNS(null,"x",firstx);
			evt.target.setAttributeNS(null,"y",firsty);
			
		}
		else {
			var actID=evt.target.id;
			actID=actID.replace(/avatar/,"");
			ConstructorSwitch(actID,finx-15,finy-15);
			evt.target.setAttributeNS(null,"x",firstx);
			evt.target.setAttributeNS(null,"y",firsty);
			var occupied=[finx,finy];
			occupiedplaces.push(occupied);
			console.log(occupiedplaces);
			
			//actID=actID.replace(/avatar/,"");
			//d=document.getElementById(actID);
			//d.setAttributeNS(null,"x",finx);
			//d.setAttributeNS(null,"y",finy);
			//evt.target.style.display='none';
			//CreateObject(d.getAttributeNS(null,"name"),d.getAttributeNS(null,"id"));
			//evt.target.remove();
			
			
		}
		evt.target.onmousemove = null;
		evt.target.onmouseup = null;		
	}
}

function IsOccupied(x,y){
	for (i in occupiedplaces){
		if ((Math.abs(occupiedplaces[i][0]-x)<100)&&(Math.abs(occupiedplaces[i][1]-y)<100)){
			console.log('too close');
			return 0;
		}
	}
	return 1;
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