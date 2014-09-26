/** @jsx React.DOM */
var Cell = React.createClass({displayName: 'Cell',
  shouldComponentUpdate: function(nextProps){
    if(optimizeCell){
      return nextProps.checked !== this.props.checked;
    }else{
      return true;
    }
  },
  
  render : function () {
    return (
        React.DOM.input({type: "checkbox", readOnly: true, checked: this.props.checked})
    );
  }
})
/** @jsx React.DOM */
var Grid = React.createClass({displayName: 'Grid',
  render : function () {
    return (
      React.DOM.div(null, this.props.rows.map(function(row, index)  
        {return Row({key: index, cells: row});}
      ))
    );
  }
})
/** @jsx React.DOM */
var Row = React.createClass({displayName: 'Row',
  shouldComponentUpdate: function(nextProps){
    if(optimizeRow){
      return nextProps.cells.join('') != this.hash;
    }else{
      return true;
    }
  },
  componentDidUpdate: function(newProps){
    this.hash = newProps.cells.join('');
  },
  render : function () {
    return (
      React.DOM.div(null, this.props.cells.map(function(checked, index)  
        {return Cell({key: index, checked: checked});}
      ))
    );
  }
})
/** @jsx React.DOM */
window.addEventListener('load', function(){
  window.optimizeRow = false;
  window.optimizeCell = false;

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
    React.renderComponent(Grid({rows: model}), grid);
    window.requestAnimationFrame(render);
    stats.end();
  }
  
  render();
  
});

function mutate(array){
  var y= (Math.random()*array.length)|0;
  var x = (Math.random()*array[y].length)|0;
  array[y][x] = !array[y][x];
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