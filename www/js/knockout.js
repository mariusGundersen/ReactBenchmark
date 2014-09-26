window.addEventListener('load', function(){
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild( stats.domElement );
  
  var grid = document.getElementById('grid');
  
  var model = createModel(50, 50);
  
  var viewModel = {
    rows: ko.observableArray(model.map(function(row){
      return ko.observableArray(row.map(function(cell){
        return ko.observable(cell);
      }))
    }))
  };
                             
  function render(){
    stats.begin();
    mutate(viewModel.rows);
    window.requestAnimationFrame(render);
    stats.end();
  }
  
  ko.applyBindings(viewModel, grid);
  render();
  
});

function mutate(array){
  var y= (Math.random()*array().length)|0;
  var x = (Math.random()*array()[y]().length)|0;
  array()[y]()[x](!array()[y]()[x]());
}

function createModel(rows, cols){
  var model = [];
  for(var y=0; y<rows; y++){
    model[y] = [];
    for(var x=0; x<cols; x++){
      model[y][x] = Math.random() > 0.5;
    }
  }
  return model;
}