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
    
  function render(){
    stats.begin();
    mutate(model);
    window.requestAnimationFrame(render);
    stats.end();
  }
  
  grid.innerHTML = model.map(function(row){
    return '<div>' 
      + row.map(function(checked){
        return '<input type="checkbox" ' 
          + (checked ? 'checked' : '')
          + ' />';
      }).join('')
      + '</div>';
  }).join('');
  
  model = model.map(function(_, y){
    return grid.childNodes[y].childNodes;
  })
  
  render();
  
});

function mutate(array){
  var y= (Math.random()*array.length)|0;
  var x = (Math.random()*array[y].length)|0;
  array[y][x].checked = !array[y][x].checked;
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