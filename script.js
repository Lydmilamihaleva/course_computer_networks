var pcstack=[];
var switchstack=[];
var routerstack=[];

var ISSHOWING;
var occupiedplaces=[];

var connectstatus=[0,,,,,];

function IdGenerator(type){
	var date=new Date();
	var v=date.getTime();
	return type+v;
}

function SetStats(but){
	var d=document.getElementsByClassName(ISSHOWING);
	//console.log(d);
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
					
					//console.log(mda);
					window[type][i][ev]=document.getElementById(mda).value;
				}
			}
		}
}

function ClickingObjects(evt){
	//console.log(evt.target.id);
	if (ISSHOWING!=undefined){
		var ToInvis=ISSHOWING;
		var rar=document.getElementsByClassName(ToInvis);
		for (var i=0; i<rar.length; i++){
			rar[i].style.visibility="hidden";
		}
	}
	var d=evt.target.id;
	d='object'+d;
	//console.log(d);
	var v=document.getElementsByClassName(d);
	//console.log(v);
	//console.log(v);
	for (var i=0; i< v.length; i++){
		//console.log(v[i]);
		v[i].style.visibility = "visible";
	}
	ISSHOWING=d;
}

function MakeTable(){
	
	function PullTable(tab1,tab2){
		console.log(tab1,tab2);
		//console.log(tab1[0],tab2[0]);
		//return 1;
		switch(tab1[0]){
			case "p":
			for (var i in pcstack){
				console.log('lol',pcstack[i].id,pcstack[i].ConnectedTo.indexOf(tab2))
				if(pcstack[i].id==tab1&&((pcstack[i].ConnectedTo).indexOf(tab2))!=-1){
					return true;
				}
				//else return 0;
			}
			return false;
			break;
			case "s":
			for (var i in switchstack){
				console.log('lol',switchstack[i].id,switchstack[i].ConnectedTo.indexOf(tab2))
				if(switchstack[i].id==tab1&&((switchstack[i].ConnectedTo).indexOf(tab2))!=-1){
					return true;
				}
				//else return 0;
			}
			return false;
			break;
			case "r":
			for (var i in routerstack){
				console.log('lol',routerstack[i].id,routerstack[i].ConnectedTo.indexOf(tab2))
				if(routerstack[i].id==tab1&&((routerstack[i].ConnectedTo).indexOf(tab2))!=-1){
					return true;
				}
				//else return 0;
			}	
			return false;
			break;
		}
	}
	
	var massive=[];
	for (el in pcstack){
		massive.push(pcstack[el].id);
	}
	for (el in switchstack){
		massive.push(switchstack[el].id);
	}
	for (el in routerstack){
		massive.push(routerstack[el].id);
	}
	//return massive;
	var table=[];
	var l=massive.length+1;
	for (var i=0; i<l; i++){
		table[i]=[];
		for (var j=0; j<l; j++){
			if (i==j){
				table[i][j]=true;
				continue;
			}
			table[i][j]=null;
		}
	}
	table[0][0]='X';
	for (var i=1; i<l; i++){
		table[0][i]=massive[i-1];
		table[i][0]=massive[i-1];
	}
	for (var i=1; i<l; i++){
		for (var j=1; j<l; j++){
			if (i==j) continue;
			//PullTable(table[0][i],table[j][0],);
			//console.log(PullTable(table[0][i],table[j][0]));
			//if (PullTable(table[0][i],table[j][0])==true){
			if (PullTable(table[i][0],table[0][j])==true){
				table[i][j]=true;
			}
			else{
				table[i][j]=false;
			}
			
		}
	}
	return table;
}
	
function Pow(matrix){
	xmatrix=matrix;
	ymatrix=matrix;
	zmatrix=matrix;
	l=matrix.length;
	for (var i=1; i<l; i++){
		for (var j=1; j<l; j++){
			
		}
	}
}

function Ping(){
	console.log(ISSHOWING.replace(/object/,""));
	console.log((document.getElementById(ISSHOWING.replace(/object/,"area"))).value); //...Как ни парадоскально это введенное в поле
	//var massive=pcstack+switchstack+routerstack;
}

function FieldsCreator(obj){
	
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
			field.name=key;
			field.style.visibility="hidden"; //...И это видимость! И это не потеряй!
			document.getElementById("LEIBL").appendChild(field);
			field.setAttribute("class",'object'+obj.id);
			leibl.setAttribute("class",'object'+obj.id);
			leibl.setAttribute("id",'label'+obj.id+key);
			field.setAttribute("id",obj.id+key);
			field.style.backgroundColor="#c3c3c3";
		y=y+30;
		}
		if (key=="Slots"){
			var sname=obj.name;
			//console.log('AHAHAHAHAHAH',obj.id);			
			field.setAttribute("readonly","readonly");
			field.value="0/5";
			}
	}
	if (obj.name=="pc"){
		var ping=document.createElement("input");
		ping.type="button";
		ping.setAttribute("class",'object'+obj.id);
		ping.setAttribute("id",'button'+obj.id);
		ping.value="Start";
		ping.style.position="absolute";
		ping.style.backgroundColor="#c4c4c4";
		ping.style.left="340px";
		ping.style.top="620px";
		ping.style.width="140px";
		ping.style.visibility="hidden";
		ping.setAttribute("onclick","Ping()");
		document.getElementById("maindiv").appendChild(ping);
		
		var stop=document.createElement("input");
		stop.type="button";
		stop.setAttribute("class",'object'+obj.id);
		stop.setAttribute("id",'button'+obj.id);
		stop.value="Clear";
		stop.style.position="absolute";
		stop.style.backgroundColor="#c4c4c4";
		stop.style.left="490px";
		stop.style.top="620px";
		stop.style.width="140px";
		stop.style.visibility="hidden";
		document.getElementById("maindiv").appendChild(stop);
		
		var pingarea=document.createElement("textarea");
		pingarea.style.position="absolute";
		pingarea.style.left="340px";
		pingarea.style.top="650px";
		pingarea.rows="8";
		pingarea.cols="40";
		pingarea.style.resize="none";
		pingarea.id='area'+obj.id;
		pingarea.style.visibility="hidden";
		pingarea.style.backgroundColor="#c3c3c3";
		pingarea.setAttribute("class",'object'+obj.id);
		document.getElementById("maindiv").appendChild(pingarea);
		
	}
	var knopka=document.createElement("input");
	knopka.type="button";
	knopka.setAttribute("class",'object'+obj.id);
	knopka.setAttribute("id",'button'+obj.id);
	knopka.value="Сохранить";
	knopka.name=obj.name;
	knopka.style.backgroundColor="#c4c4c4"
	knopka.style.position="absolute";
	knopka.style.visibility="hidden";
	knopka.setAttribute("onclick","SetStats(this)")
	knopka.style.left=110+"px";
	knopka.style.top=750+"px";
	document.getElementById("maindiv").appendChild(knopka);
}

function Connection(evt){
	if (evt.target.occup==1){
		console.log('zanyato');
		connectstatus[0]=0;
		return;
	}
	if (connectstatus[0]==0){
		evt.target
		console.log('svobodno 1');
		connectstatus[0]=1;
		connectstatus[1]=evt.target.getAttributeNS(null,'x');
		connectstatus[2]=evt.target.getAttributeNS(null,'y');	
		//evt.target.setAttributeNS(null,"width",40);
		//evt.target.setAttributeNS(null,"height",40);
		//evt.target.occup=1;
		connectstatus[3]=evt.target.id;
		return;
	}
	if (connectstatus[0]==1 && connectstatus[3]!=evt.target.id){
		console.log('2');
		LineCreate(Number(evt.target.getAttributeNS(null,'x'))+8, Number(evt.target.getAttributeNS(null,'y'))+8, Number(connectstatus[1])+8, 
		Number(connectstatus[2])+8, 2, 'black', svg);
		//LineCreate(x1, y1, x2, y2, 2, 'black', svg);
		connectstatus[0]=0;
		evt.target.occup=1;
		document.getElementById(connectstatus[3]).occup=1;
		//document.getElementById(connectstatus[3]).setAttributeNS(null,"width",35);
		//document.getElementById(connectstatus[3]).setAttributeNS(null,"height",35);
		var con=evt.target.id.replace(/cable/,"");
		//console.log(evt.target.id,connectstatus[3]);
		var id1=evt.target.id.replace(/cable/,"");
		var id2=connectstatus[3];
		console.log(id1,id2);
		stack1=evt.target.name+'stack'; //..............DA!
		stack2=document.getElementById(id2).name+'stack';//..............DA!
		id2=id2.replace(/cable/,"");
		console.log(stack1,stack2,id1,id2);
		for (ev in window[stack1]){
			if (window[stack1][ev].id==id1){
				(window[stack1][ev].ConnectedTo).push(id2);
			}
		}
		for (ev in window[stack2]){
			if (window[stack2][ev].id==id2){
				(window[stack2][ev].ConnectedTo).push(id1);
			}
		}
		return;
	}
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function connectorscreate(number,newId,x,y,name){
	for (var i=0; i<number; i++){
		var connector=document.createElementNS("http://www.w3.org/2000/svg",'image');
		connector.setAttributeNS(null,"x",Number(x)+40);
		connector.setAttributeNS(null,"y",Number(y)+100);
		console.log(y+100);
		connector.setAttributeNS(null,"width",17);
		connector.setAttributeNS(null,"height",17);
		connector.setAttributeNS(null,"visibility","visible");
		connector.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/cable.svg');
		connector.setAttributeNS(null,"position","absolute");
		connector.setAttributeNS(null,"opacity",1);
		connector.name=name;
		connector.setAttribute('onclick','Connection(evt)');
		connector.id='cable'+newId;
		connector.occup=0;
		svg.appendChild(connector);
		y=Number(y)+15;
	}
}
//....................................................................................
function PC(x,y){ //...Смысл примерно такой;
	var pcpic=document.createElementNS("http://www.w3.org/2000/svg",'image');
	pcpic.setAttributeNS(null,"x",x);
	pcpic.setAttributeNS(null,"y",y);
	pcpic.setAttributeNS(null,"width",100);
	pcpic.setAttributeNS(null,"height",100);
	pcpic.setAttributeNS(null,"visibility","visible");
	pcpic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/pcstart.svg');
	pcpic.setAttributeNS(null,"position","absolute");
	pcpic.setAttributeNS(null,"opacity",1);
	pcpic.setAttribute('onclick','ClickingObjects(evt)');
	var newId=IdGenerator("pc");
	pcpic.id=newId; //...Наверно сюда примем тип

	
	pc={
		name:"pc",
		id:newId,//...Наверно сюда генер засунем. Точнее генер выше а сюда чо-нить еще
		IP:"",
		Mask:"",
		Gateway:"",
		ConnectedTo:[],
		SlotsNum:1
	}
	//console.log(pc.SlotsNum);
	connectorscreate(pc.SlotsNum,newId,x,y,"pc");
	svg.appendChild(pcpic);
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
	switchpic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/switchstart.svg');
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
	connectorscreate(swtch.SlotsNum,newId,x,y,"switch");
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
	routpic.setAttributeNS("http://www.w3.org/1999/xlink",'href','design/routerstart.svg');
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
		Mask:"",
		DHCP:"",
		ConnectedTo:[],
		Slots:"",
		SlotsNum:5
	}
	connectorscreate(router.SlotsNum,newId,x,y,"router");
	routerstack.push(router);
	FieldsCreator(router);
}
//..............................................................................
function PicCreator(){
	var objects=["pc","switch","router"];
	for (i=0;i<objects.length;i++){
		
		switch(objects[i]) {
			case "pc":
				var y=30;
			break;
			case "switch":
				var y=150;
			break;
			case "router":
				var y=270;
			break;
		}
		var href="design/"+objects[i]+".svg";
		//console.log(href);
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"name",objects[i]);
		img.setAttributeNS(null,"x",675);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",100);
		img.setAttributeNS(null,"height",100);
		img.setAttributeNS(null,"visibility","visible");
		img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
		img.setAttributeNS(null,"position","absolute");
		img.setAttributeNS(null,"opacity",1);
		//img.setAttributeNS(null,"num",number); //....Тут у нас номер элемента. Его мы заюзаем при обращении к объектам.
		var id=objects[i];
		img.setAttributeNS(null,"id",id);
		//img.setAttribute('onclick','VisibilitySettings(evt)'); //...А еще для них предусмотрено перемещение!;
		svg.appendChild(img);
		
		href="design/"+objects[i]+"start.svg";
		var img = document.createElementNS("http://www.w3.org/2000/svg",'image');
		img.setAttributeNS(null,"x",675);
		img.setAttributeNS(null,"y",y);
		img.setAttributeNS(null,"width",100);
		img.setAttributeNS(null,"height",100);
		img.setAttributeNS(null,"visibility","visible");
		//img.setAttributeNS(null,"zalupko","red");
		img.setAttributeNS(null,"id",objects[i]+'avatar');
		img.setAttributeNS("http://www.w3.org/1999/xlink",'href',href);
		img.setAttributeNS(null,"position","absolute");
		img.setAttributeNS(null,"opacity",0.3);
		img.setAttributeNS(null,"id",'avatar'+id);
		img.setAttribute('onmousedown','Transfer(evt)'); //...А еще для них предусмотрено перемещение!;
		img.setAttribute('onclick','Connection(evt)');
		svg.appendChild(img);
	}
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

function LineCreate(x1,y1,x2,y2, width, stroke,mysvg){ //...Draw the line! Только для границ. Возможно, приспособим под изображение проводов;
	var line= document.createElementNS("http://www.w3.org/2000/svg",'line');
	line.setAttribute("x1",x1);
	line.setAttribute("y1",y1);
	line.setAttribute("x2",x2);
	line.setAttribute("y2",y2);
	line.setAttribute("stroke-width",width);
	line.setAttribute("stroke",stroke);
	mysvg.appendChild(line);
}

function Transfer(evt){ //...Передвижение;
	svg.appendChild(evt.target); //...Офигеть не встать, сработало
	
	if (evt.which != 1){ //...Не для кликов ПКМ; 
			return; 
		}
	
	var fx=evt.target.getAttributeNS(null,'x'); //...Координаты, на которых изначально расположен двигаемый элемент;
	var fy=evt.target.getAttributeNS(null,'y');
	//console.log(fx,fy);
	
	var firstx=fx;
	var firsty=fy;
	
	//console.log('first:',firstx,'firsty:',firsty);
	fx=fx-evt.offsetX; //...Координаты, на которых произведено зажатие ЛКМ;
	fy=fy-evt.offsetY;
	//console.log(fx,fy);
	
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
		//console.log('onmouseout');
		FinishingTransfer(evt);
    }
	evt.target.onmouseup = function() 
	{
		//console.log('onmouseup');
		FinishingTransfer(evt);
    }
	
	function FinishingTransfer(evt)
	{
		//console.log('on finishing');
		finx=evt.target.getAttributeNS(null,'x');
		finy=evt.target.getAttributeNS(null,'y');
		
		if (finx>550 || finy>500 || finx<0 || finy<0 || IsOccupied(finx,finy)==0){
			evt.target.setAttributeNS(null,"x",firstx);
			evt.target.setAttributeNS(null,"y",firsty);
			
		}
		else {
			var actID=evt.target.id;
			actID=actID.replace(/avatar/,"");
			//ConstructorSwitch(actID,finx-15,finy-15);
			ConstructorSwitch(actID,finx,finy);
			evt.target.setAttributeNS(null,"x",firstx);
			evt.target.setAttributeNS(null,"y",firsty);
			var occupied=[finx,finy];
			occupiedplaces.push(occupied);
			//console.log(occupiedplaces);
			
			
		}
		evt.target.onmousemove = null;
		evt.target.onmouseup = null;		
	}
}

function IsOccupied(x,y){
	for (i in occupiedplaces){
		if ((Math.abs(occupiedplaces[i][0]-x)<100)&&(Math.abs(occupiedplaces[i][1]-y)<100)){
			//console.log('too close');
			return 0;
		}
	}
	return 1;
}

function ConstructorSwitch(type,x,y){
	//console.log('i am here and ...',type);
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

var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); //...Создание рабочей области SVG;
document.getElementById("maindiv").appendChild(svg);
svg.setAttribute("width",800);
svg.setAttribute("height",800);
WorkingSpace('rect',0,0,650,600,"#ffffff","WorkSpace",svg);
WorkingSpace('rect',650,0,800,800,"#f2f2f2","WorkSpace",svg);
WorkingSpace('rect',0,600,650,800,"#f2f2f2","WorkSpace",svg);

LineCreate(650, 0, 650, 800, 2, '#a9a9a9', svg);
LineCreate(0, 600, 650, 600, 2, '#dadada', svg);
LineCreate(325, 600, 325, 800, 2, '#d5d5d5', svg);
LineCreate(650, 400, 800, 400, 2, '#d5d5d5', svg);

sas=document.getElementById("maindiv");
sas.style.position="absolute";
sas.style.left="0px"; //...Не забудь потом подвигать это всё
sas.style.top="0px";

PicCreator();