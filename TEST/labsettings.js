//var Elements = '{"pc":2,"routers":0,"switches":0}';

var Elements = '{"pc":2,\
"routers":0,\
"switches":0,\
"notebooks":0}'

function Kreator(name,id){
    var lal={};
    lal.name=name;
    lal.id=id;
    return lal;}

	
gavno={
    "pc":{
        "number":1,
        "name":"zalupka"},
    "switch":{
        "number":0,
        "name":"eldec"}
}

hujec={
    "pc":["pc1","pc2"],
    "router":[],
    "switch":["switch1"]
}

var Elements='{"pc":["pc1","pc2"],\
"router":[],\
"switch":[],\
"wifi":[],\
"notebook":[]}'

//...TRANSFER!!!!!!!
//...Отдельная функция для неаватаров

for (kek in gavno){
    console.log(gavno[kek].number)}
	//Неплохо. Строки из JSON можно превращать в обжекты. Заебись.

	for (el in hujec){
    if (hujec[el].length>0){
        console.log(el)}
} //...Эта хуерга для названия поля как раз таки...
//...проблема практически решена
	
/*
<КАРОЧИ>
JSON отныне представляет собой массив. С именами или пустой.
Если с именами, они (вместе с названием группы) отдаются в соответствующий стэк с ними.
Оттуда кароч уже в конструктор object'a...
</КАРОЧИ>
План на завтра.
Когда ты это прочтёшь, це будет уже сегодня.
1. Прикрутить Kreator в основной скрипт и наладить его работу.
Вызов, вероятно, будет осуществляться по окончанию перетаскивания аватарки.
Так что, нужно перенести в новый основной код Transfer(evt);
2. Вероятно, нужно пофиксить создание id для картинок.
Айдишку можно будет передавать в функцию создания объектов, как варик.
Лучше, конечно, запилить новую пикчу привязанную уже к конкретному объекту с конкретным id.
Вся эта хуерта только по ходу работы раскрывают свою сущность и дает понять - хуерта оно или нет.
Разберемся.
3. Счётчики еще наверно нужно присверлить к картинкам.
С количеством осташихся элементов.
4. ...И как только оно будет нормально функционировать, нужно будет сделать, бля, уже наконец то ебучие инпуты.
И тоже проверить, корректно ли это всё работает.
5. Как только со всей этой хуергой будет покончено, нужно будет сделать шнуры и соединения.
Как варик, матрица смежности. Ебу, однако, как ее потом передавать и проверять. Просто ебу.
Ну главное сделать.
.....................................................................................................................
Вроде пока нет особых преград на пути прогресса.
Это всё хорошо. Это всё можно сделать за завтра(сегодня).
Скажу более - это нужно сделать в идеале.
Будет просто охуенно.
Работы практически не останется.
*/