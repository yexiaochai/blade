
var FOO = {
  iog : {
    info : function(){}
  }
};

function a(){
  iog.info("BAR");
  FOO.iog.info("FOOOBJ");
}

FOO.iog.info("FOOOBJ");

a();
