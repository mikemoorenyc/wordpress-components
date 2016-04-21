var PointItem = React.createClass({
  getInitialState: function() {
    return {
      hovering: false
    }
  },
  deleteClick: function() {
    this.props.deletePoint(this.props.id, true);
  },
  editClick: function(e) {

    this.props.savePoint({
      id:this.props.id,
      title: this.props.title,
      lat: this.props.lat,
      lng: this.props.lng,
      cat: this.props.cat,
      editing:true
    })
  },
  entering: function(state) {
    this.setState({hovering:true})
  },
  leaving: function() {
    this.setState({hovering:false})
  },
  render: function() {
    var handle = <div className="drag-handle" data-hover={this.state.hovering}>
                    <div className="icon">
                      <span></span>
                    </div>
                  </div>;
    if(this.props.canDrag == false) {
      handle = false;
    }

    return (
      <div className="point-item" onMouseEnter={this.entering} onMouseLeave={this.leaving}>

      <div className="title"
      dangerouslySetInnerHTML={{__html:this.props.title}}>

      </div>
      {handle}
      <button
        className="edit-button"
        data-hover={this.state.hovering}
        onClick={this.editClick}
        dangerouslySetInnerHTML={{__html:PENICON}}>
      </button>
      </div>
    )
  }
});
