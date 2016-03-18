var dataStore = require('./DataStore').store;

function Model(schema) {
  this.schema = schema;
  this.id = null;


  for(var key in schema) {
    this[key] = null;
  }

  if(!dataStore[this.constructor.name]){
    dataStore[this.constructor.name] = [];
  }

}

Model.getNextId = function(){
  return dataStore[this.name].length + 1;
}

Model.find = function(id){
  return dataStore[this.name][id - 1];
}

Model.extend = function(klass){
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      klass[key] = this[key];
    }
  }

  for (var pkey in this.prototype) {
    if (this.prototype.hasOwnProperty(pkey)) {
      klass.prototype[pkey] = this.prototype[pkey];
    }
  }
  return klass;

}

Model.prototype.save = function() {
  if(!this.id) {
    this.id = this.constructor.getNextId();
    dataStore[this.constructor.name][this.id - 1] = this;
  }
}

Model.prototype.destroy = function() {
  dataStore[this.constructor.name][this.id - 1] = null;
}


//Model.prototype.getNextId = function() {}

module.exports = Model;