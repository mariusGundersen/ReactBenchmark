var Grid = React.createClass({
  render : function () {
    return (
      <div>{this.props.rows.map((row, index) => 
        <Row key={index} cells={row} />
      )}</div>
    );
  }
})