Utils =
{ s4: function() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
, guid: function() {
   return (Utils.s4()+Utils.s4()+"-"+Utils.s4()+"-"+Utils.s4()+"-"+Utils.s4()+"-"+Utils.s4()+Utils.s4()+Utils.s4());
  }
};
