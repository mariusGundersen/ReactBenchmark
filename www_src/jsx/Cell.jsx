var Cell = React.createClass({
  shouldComponentUpdate: function(nextProps){
    if(optimizeCell){
      return nextProps.checked !== this.props.checked;
    }else{
      return true;
    }
  },
  
  render : function () {
    return (
        <input type="checkbox" readOnly={true} checked={this.props.checked} />
    );
  }
})