var CatItem = React.createClass({
  getInitialState: function() {
    return {
      hovering: false
    }
  },

  deleteClick: function() {
    this.props.deleteCat(this.props.id, true);
  },
  editClick: function() {
    this.props.saveCat({
      id:this.props.id,
      name: this.props.name,
      color: this.props.color,
      editing:true
    })
  },
  hexToRgb: function(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  },
  luma: function(hex) {
    var c = hex.substring(1);      // strip #
var rgb = parseInt(c, 16);   // convert rrggbb to decimal
var r = (rgb >> 16) & 0xff;  // extract red
var g = (rgb >>  8) & 0xff;  // extract green
var b = (rgb >>  0) & 0xff;  // extract blue

var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  return luma;
  },
  entering: function(state) {
    this.setState({hovering:true})
  },
  leaving: function() {
    this.setState({hovering:false})
  },
  render: function() {
    /*
    var rgb = this.hexToRgb(this.props.color);
    var style = {
      'backgroundColor': 'rgba('+rgb.r+','+rgb.g+','+rgb.b+',.3)'
    }*/
    var handle = <div className="drag-handle" data-hover={this.state.hovering}>
                    <div className="icon">
                      <span></span>
                    </div>
                  </div>;
    if(this.props.canDrag == false) {
      handle = false;
    }
    var iconClass = 'icon';
    if(this.luma(this.props.color) > 210) {
      iconClass = 'icon dark';
    }
    return (
      <div className="category-item" onMouseEnter={this.entering} onMouseLeave={this.leaving}>
      <div className="category-title">{this.props.name}</div>
      {handle}
      <button onClick={this.editClick} className="edit-bubble" style={{backgroundColor: this.props.color}}>
        <span className={iconClass} data-hover={this.state.hovering} dangerouslySetInnerHTML={{__html:PENICON}}>

        </span>

      </button>


      </div>
    )
  }
});
