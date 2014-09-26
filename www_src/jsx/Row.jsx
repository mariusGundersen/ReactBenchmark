var Row = React.createClass({
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
      <div>{this.props.cells.map((checked, index) => 
        <Cell key={index} checked={checked} />
      )}</div>
    );
  }
})