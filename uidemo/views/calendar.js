define(['View', getViewTemplatePath('calendar'), 'UICalendar'], function (View, viewhtml, UICalendar) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1Action',
      'click .demo2': 'demo2Action'
    },

    demo1Action: function() {
      console.log('go')
      //简单初始化
      if(!this.calendar) {
        this.calendar = new UICalendar({
          datamodel: {

          },
          wrapper: this.$el.find('.wrapper')
        });
      }
      this.calendar.show();
    },

    demo2Action: function() {



      var dataPrice =  [
          {
            "airline": "HU",
            "dDate": "2014/7/5 0:00:00",
            "discount": 0.61,
            "flightNo": "HU7603",
            "lowest": false,
            "price": 693
          },
          {
            "airline": "HO",
            "dDate": "2014/7/6 0:00:00",
            "discount": 0.46,
            "flightNo": "HO1252",
            "lowest": false,
            "price": 520
          },
          {
            "airline": "HU",
            "dDate": "2014/7/7 0:00:00",
            "discount": 0.54,
            "flightNo": "HU7605",
            "lowest": false,
            "price": 581
          },
          {
            "airline": "HO",
            "dDate": "2014/7/8 0:00:00",
            "discount": 0.46,
            "flightNo": "HO1252",
            "lowest": false,
            "price": 520
          },
          {
            "airline": "CZ",
            "dDate": "2014/7/9 0:00:00",
            "discount": 0.47,
            "flightNo": "CZ6412",
            "lowest": false,
            "price": 502
          },
          {
            "airline": "HO",
            "dDate": "2014/7/10 0:00:00",
            "discount": 0.46,
            "flightNo": "HO1252",
            "lowest": false,
            "price": 520
          },
          {
            "airline": "HO",
            "dDate": "2014/7/11 0:00:00",
            "discount": 0.46,
            "flightNo": "HO1252",
            "lowest": false,
            "price": 520
          },
          {
            "airline": "HO",
            "dDate": "2014/7/12 0:00:00",
            "discount": 0.46,
            "flightNo": "HO1252",
            "lowest": false,
            "price": 520
          },
          {
            "airline": "HU",
            "dDate": "2014/7/13 0:00:00",
            "discount": 0.43,
            "flightNo": "HU7605",
            "lowest": false,
            "price": 469
          },
          {
            "airline": "MU",
            "dDate": "2014/7/14 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5122",
            "lowest": false,
            "price": 423
          },
          {
            "airline": "CA",
            "dDate": "2014/7/15 0:00:00",
            "discount": 0.36,
            "flightNo": "CA9631",
            "lowest": false,
            "price": 410
          },
          {
            "airline": "FM",
            "dDate": "2014/7/16 0:00:00",
            "discount": 0.45,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 509
          },
          {
            "airline": "FM",
            "dDate": "2014/7/17 0:00:00",
            "discount": 0.45,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 509
          },
          {
            "airline": "MU",
            "dDate": "2014/7/18 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "CA",
            "dDate": "2014/7/19 0:00:00",
            "discount": 0.36,
            "flightNo": "CA1855",
            "lowest": false,
            "price": 410
          },
          {
            "airline": "MU",
            "dDate": "2014/7/20 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 426
          },
          {
            "airline": "MU",
            "dDate": "2014/7/21 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5104",
            "lowest": false,
            "price": 423
          },
          {
            "airline": "MU",
            "dDate": "2014/7/22 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 394
          },
          {
            "airline": "MU",
            "dDate": "2014/7/23 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "CA",
            "dDate": "2014/7/24 0:00:00",
            "discount": 0.44,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 499
          },
          {
            "airline": "CA",
            "dDate": "2014/7/25 0:00:00",
            "discount": 0.44,
            "flightNo": "CA1831",
            "lowest": false,
            "price": 499
          },
          {
            "airline": "MU",
            "dDate": "2014/7/26 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5104",
            "lowest": false,
            "price": 423
          },
          {
            "airline": "MU",
            "dDate": "2014/7/27 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 426
          },
          {
            "airline": "MU",
            "dDate": "2014/7/28 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5138",
            "lowest": true,
            "price": 390
          },
          {
            "airline": "MU",
            "dDate": "2014/7/29 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5138",
            "lowest": true,
            "price": 390
          },
          {
            "airline": "MU",
            "dDate": "2014/7/30 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 436
          },
          {
            "airline": "MU",
            "dDate": "2014/7/31 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "CA",
            "dDate": "2014/8/1 0:00:00",
            "discount": 0.44,
            "flightNo": "CA1831",
            "lowest": false,
            "price": 499
          },
          {
            "airline": "CA",
            "dDate": "2014/8/2 0:00:00",
            "discount": 0.35,
            "flightNo": "CA1855",
            "lowest": false,
            "price": 401
          },
          {
            "airline": "CA",
            "dDate": "2014/8/3 0:00:00",
            "discount": 0.36,
            "flightNo": "CA1831",
            "lowest": false,
            "price": 405
          },
          {
            "airline": "CA",
            "dDate": "2014/8/4 0:00:00",
            "discount": 0.34,
            "flightNo": "CA1883",
            "lowest": false,
            "price": 382
          },
          {
            "airline": "MU",
            "dDate": "2014/8/5 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 390
          },
          {
            "airline": "MU",
            "dDate": "2014/8/6 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 436
          },
          {
            "airline": "MU",
            "dDate": "2014/8/7 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "MU",
            "dDate": "2014/8/8 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 426
          },
          {
            "airline": "CA",
            "dDate": "2014/8/9 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1855",
            "lowest": true,
            "price": 375
          },
          {
            "airline": "CA",
            "dDate": "2014/8/10 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1831",
            "lowest": true,
            "price": 375
          },
          {
            "airline": "CA",
            "dDate": "2014/8/11 0:00:00",
            "discount": 0.34,
            "flightNo": "CA1883",
            "lowest": false,
            "price": 382
          },
          {
            "airline": "MU",
            "dDate": "2014/8/12 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 394
          },
          {
            "airline": "MU",
            "dDate": "2014/8/13 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 436
          },
          {
            "airline": "MU",
            "dDate": "2014/8/14 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "MU",
            "dDate": "2014/8/15 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 436
          },
          {
            "airline": "CA",
            "dDate": "2014/8/16 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 376
          },
          {
            "airline": "CA",
            "dDate": "2014/8/17 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1831",
            "lowest": false,
            "price": 376
          },
          {
            "airline": "CA",
            "dDate": "2014/8/18 0:00:00",
            "discount": 0.34,
            "flightNo": "CA1883",
            "lowest": false,
            "price": 382
          },
          {
            "airline": "MU",
            "dDate": "2014/8/19 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 394
          },
          {
            "airline": "MU",
            "dDate": "2014/8/20 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 436
          },
          {
            "airline": "MU",
            "dDate": "2014/8/21 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "MU",
            "dDate": "2014/8/22 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 436
          },
          {
            "airline": "CA",
            "dDate": "2014/8/23 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 376
          },
          {
            "airline": "CA",
            "dDate": "2014/8/24 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1831",
            "lowest": false,
            "price": 376
          },
          {
            "airline": "CA",
            "dDate": "2014/8/25 0:00:00",
            "discount": 0.34,
            "flightNo": "CA1883",
            "lowest": false,
            "price": 382
          },
          {
            "airline": "MU",
            "dDate": "2014/8/26 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 394
          },
          {
            "airline": "MU",
            "dDate": "2014/8/27 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "MU",
            "dDate": "2014/8/28 0:00:00",
            "discount": 0.42,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 467
          },
          {
            "airline": "MU",
            "dDate": "2014/8/29 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "CA",
            "dDate": "2014/8/30 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 376
          },
          {
            "airline": "CA",
            "dDate": "2014/8/31 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1831",
            "lowest": false,
            "price": 376
          },
          {
            "airline": "MU",
            "dDate": "2014/9/1 0:00:00",
            "discount": 0.35,
            "flightNo": "MU5183",
            "lowest": false,
            "price": 394
          },
          {
            "airline": "MU",
            "dDate": "2014/9/2 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "CA",
            "dDate": "2014/9/3 0:00:00",
            "discount": 0.42,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 476
          },
          {
            "airline": "CA",
            "dDate": "2014/9/4 0:00:00",
            "discount": 0.42,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 476
          },
          {
            "airline": "CA",
            "dDate": "2014/9/5 0:00:00",
            "discount": 0.42,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 476
          },
          {
            "airline": "CA",
            "dDate": "2014/9/6 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1835",
            "lowest": true,
            "price": 376
          },
          {
            "airline": "FM",
            "dDate": "2014/9/7 0:00:00",
            "discount": 0.35,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 391
          },
          {
            "airline": "FM",
            "dDate": "2014/9/8 0:00:00",
            "discount": 0.35,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 391
          },
          {
            "airline": "MU",
            "dDate": "2014/9/9 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "CA",
            "dDate": "2014/9/10 0:00:00",
            "discount": 0.42,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 476
          },
          {
            "airline": "CA",
            "dDate": "2014/9/11 0:00:00",
            "discount": 0.42,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 476
          },
          {
            "airline": "CA",
            "dDate": "2014/9/12 0:00:00",
            "discount": 0.42,
            "flightNo": "CA1835",
            "lowest": false,
            "price": 476
          },
          {
            "airline": "CA",
            "dDate": "2014/9/13 0:00:00",
            "discount": 0.33,
            "flightNo": "CA1835",
            "lowest": true,
            "price": 376
          },
          {
            "airline": "HU",
            "dDate": "2014/9/14 0:00:00",
            "discount": 0.45,
            "flightNo": "HU7605",
            "lowest": false,
            "price": 509
          },
          {
            "airline": "MU",
            "dDate": "2014/9/15 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "MU",
            "dDate": "2014/9/16 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "KN",
            "dDate": "2014/9/17 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "KN",
            "dDate": "2014/9/18 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "FM",
            "dDate": "2014/9/19 0:00:00",
            "discount": 0.46,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 519
          },
          {
            "airline": "FM",
            "dDate": "2014/9/20 0:00:00",
            "discount": 0.38,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "KN",
            "dDate": "2014/9/21 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "MU",
            "dDate": "2014/9/22 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "MU",
            "dDate": "2014/9/23 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "KN",
            "dDate": "2014/9/24 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "KN",
            "dDate": "2014/9/25 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "FM",
            "dDate": "2014/9/26 0:00:00",
            "discount": 0.46,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 519
          },
          {
            "airline": "FM",
            "dDate": "2014/9/27 0:00:00",
            "discount": 0.38,
            "flightNo": "FM9108",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "KN",
            "dDate": "2014/9/28 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "MU",
            "dDate": "2014/9/29 0:00:00",
            "discount": 0.38,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 429
          },
          {
            "airline": "MU",
            "dDate": "2014/9/30 0:00:00",
            "discount": 0.49,
            "flightNo": "MU5138",
            "lowest": false,
            "price": 554
          },
          {
            "airline": "KN",
            "dDate": "2014/10/1 0:00:00",
            "discount": 0.45,
            "flightNo": "KN5955",
            "lowest": false,
            "price": 512
          },
          {
            "airline": "MU",
            "dDate": "2014/10/2 0:00:00",
            "discount": 0.39,
            "flightNo": "MU5130",
            "lowest": true,
            "price": 441
          }
        ]

      //简单初始化
      if(!this.calendar2) {
        this.calendar2 = new UICalendar({
          datamodel: {
            displayMonthNum: 3,
            dayItemFn: function(year, month, day) {
              var str = year+ '/' + (month+1) + '/' + day + ' 0:00:00';
              var i = 0, len = dataPrice.length, tmpObj;
              for(i = 0; i <  len; i++ ) {
                tmpObj = dataPrice[i];

                if(tmpObj.dDate == str) {     console.log(tmpObj.dDate, str);
                  return '<em>' + day + '</em>' + '<i>￥' + tmpObj.price + '</i>' ;
                }
              }
              return  '<em class="gray">' + day + '</em>';
            }
          },
          onItemClick: function (date, oldDay, e) {
            var el = $(e.target);

            if(el.hasClass('gray')) {
              console.log('invalidate date');
              return;
            }
            console.log(arguments)
          },
          wrapper: this.$el.find('.wrapper')
        });
      }
      this.calendar2.show();
    },

    onPreShow: function () {

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
