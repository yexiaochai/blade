define(['View', getViewTemplatePath('toast'), 'UIToast'], function (View, viewhtml, UIToast) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo04': 'demo04'
            });

        },

         addEvent: function ($super) {
            $super();

            //在页面显示后做的事情
            this.on('onShow', function () {
                this._init();

            });

        },
        
        _init: function() {
            
		setTimeout(function () {
			$('.header-wrapper').hide();
		}, 1000)
		
		this.$('#allmap').css({
			'position': 'absolute'
			
		});
		
		
		this.$('#allmap').width('100%');
         this.$('#allmap').height('100%');
		
		
            
            // 百度地图API功能	
	map = new BMap.Map("allmap");
	map.centerAndZoom(new BMap.Point(113.941106,22.528306), 14);
	var data_info = [
      
        [113.941186,22.528366, "腾讯滨海大厦", '腾讯'],
		[113.941954,22.526, "滨海之窗", 'A'],
		[113.947881,22.507496, "曦湾华府", 'A'],
		[113.935203,22.533216, "荟芳园", 'A'],
		[113.93401,22.523669, "海典居", 'A'],
		
		
        [113.899632,22.500471, "泛海城市广场", 'B'],
        [113.930818,22.528974, "光彩新世纪", 'B'],
		
        [113.942148,22.52376, "天利名城", 'C']
      
					];
		
		var _p = new BMap.Point(113.941186,22.528366);
		
	var opts = {
				width : 250,     // 信息窗口宽度
				height: 80,     // 信息窗口高度
				title : "信息窗口" , // 信息窗口标题
				enableMessage:true//设置允许信息窗发送短息
			   };
	for(var i=0;i<data_info.length;i++){
		var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
		var content = data_info[i][2];
		map.addOverlay(marker);               // 将标注添加到地图中
		addClickHandler(content,marker);
		var label = new BMap.Label(data_info[i][3] + '-' + data_info[i][2], {offset:new BMap.Size(10,10)});
	marker.setLabel(label);
		
		if(i === 0) {
// 			var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
// 			map.openInfoWindow(infoWindow,_p); //开启信息窗口
			
			var circle = new BMap.Circle(_p,1500,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
    map.addOverlay(circle);
		 
		}
		
	}
	function addClickHandler(content,marker){
		marker.addEventListener("click",function(e){
			openInfo(content,e)}
		);
	}
	function openInfo(content,e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	}
        },
                          
        demo04: function () {
            if (!this.toast01) {
                this.toast01 = new UIToast({
                    content: 'two second close',
                    hideSec: 2000
                });
            }
            this.toast01.show();
        }


    });

});
