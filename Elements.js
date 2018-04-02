function Cable() {
	this.Title="Прямой кабель";
	this.TypeId="PatchC";
	this.Settings=[
		{
			Title: "Соединение, сторона 1",
			Default: 0,
			False: 0,
			True: 1,
		},
		{
			Title: "Соединение, сторона 2",
			Default: 0,
			False: 0,
			True: 1,
		}
		
	];
};

function CrossCable() {
	this.Title = "Кроссовый кабель";
	this.TypeId= "CrossC";
	this.Settings=[
		{
			Title: "Соединение, сторона 1",
			Default: 0,
			False: 0,
			True: 1,
		},
		{
			Title: "Соединение, сторона 2",
			Default: 0,
			False: 0,
			True: 1,
		}
	];
};

function Computer() {
	this.Title="Компьютер";
	this.TypeId="PC";
	this.Settings=[
		{
			Title: "Wi-Fi модуль";
			Default: 0,
			False: 0,
			True: 1
		},
		{
			Title: "IP-адрес",
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "Маска (беспроводное подключение)",
			Default: [0,0,0,0],
			Min:0,
			Max:255			
		},
		{
			Title: "Маска (локальное подключение)",
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "Основной шлюз",
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "Предпочитаемый DNS",
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "Альтернативный DNS";
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "Соединение с интернетом",
			Default:0,
			False:0,
			True:1
		},
		{
			Title: "MAC-адрес",
			Default: ""
		},
		{
			Title: "Локальное соединение",
			Default:0,
			False:0,
			True:1
		},
		{
			Title: "Беспроводное соединение",
			Default:0,
			False:0,
			True:1
		}
		
	];
	
};

function Switch() {
	this.Title="Коммутатор";
	this.TypeId="NS"; //network switch
	this.Settings=[
		{
			Title: "Количество слотов",
			Default: 3,
			Min: 3,
			Max: 15
		}
	];
}

function Router() {
	this.Title="Маршрутизатор";
	this.TypeId="R";
	this.Settings=[
		{
			Title: "Количество слотов",
			Default: 3,
			Min: 3,
			Max: 25
		},
		{
			Title: "IP-адрес",
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "DNS";
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "DHCP",
			Default: [[0,0,0,0],[0,0,0,0]],
			Min: 0,
			Max: 255
		},
	];	
}

function WiFiRouter() {
	this.Title="Wi-Fi роутер";
	this.TypeId="WF";
	this.Settings=[
		{
			Title: "Количество слотов",
			Default: 3,
			Min: 3,
			Max: 3
		},
		{
			Title: "DHCP",
			Default: [[0,0,0,0],[0,0,0,0]],
			Min: 0,
			Max: 255
		},
		{
			Title: "Статический IP",
			Default: [0,0,0,0];
			Min: 0,
			Max: 255
		},
		{
			Title: "IP-адрес",
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
		{
			Title: "DNS";
			Default: [0,0,0,0],
			Min:0,
			Max:255
		},
	];	
}
