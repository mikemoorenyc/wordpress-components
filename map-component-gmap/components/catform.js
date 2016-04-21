var CatForm =  React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name,
      id: this.props.id,
      color: this.props.color
    }
  },
  changeName: function(e) {
      this.setState({name: e.target.value});
  },
  changeColor: function(e) {

  },
  componentDidMount: function() {
    $("#color-picker").spectrum({
      preferredFormat: "hex",
      showInput: true
    });

    $("#color-picker").on('change.spectrum', function(e, tinycolor) {

      this.setState({
        color: tinycolor.toHexString(tinycolor)
      })

    }.bind(this));
  },
  componentWillUnmount: function() {
    $("#color-picker").off('change.spectrum');
    $("#color-picker").spectrum("destroy");
  },
  cancelClick: function(e) {
    e.preventDefault();

    if(this.props.newPoint) {
      this.props.deleteCat(this.props.id);
    } else {
      this.props.saveCat({
        id: this.props.id,
        name: this.props.name,
        color: this.props.color,
        editing: false
      })
    }
  },
  deleteClick: function(e) {
    e.preventDefault();
    this.props.deleteCat(this.props.id, true)
  },
  publishClick: function(e) {
    e.preventDefault();
    this.props.saveCat({
      id: this.props.id,
      name: this.state.name,
      color: this.state.color,
      editing: false,
      newCat: false
    });
  },
  render: function() {
    var disabled = true;
    if(this.state.name && this.state.color) {
      disabled = false;
    }
    var filled = true;
    if(!this.state.name) {
      filled = false;
    }
    var publishCopy = 'Save';
    var deleteBtn = false;
    if(!this.props.newPoint) {
      publishCopy = 'Update';

    }
    if(!this.props.newPoint) {
      deleteBtn = <a href="#" className="submitdelete deletion" onClick={this.deleteClick}>Delete</a>;
    }
    return (
      <div className="category-form">
        <div className="fields clearfix">
          <div data-empty={!filled} className="input-field">

            <input type="text" placeholder="Category Name" value={this.state.name} onChange={this.changeName}/>

          </div>
          <input type="text" id="color-picker" onChange={this.changeColor} value={this.state.color} />
          <br className="clear" />
        </div>


        <div className="sub-form-footer">
        {deleteBtn}
          <button className="cancel-button button button-secondary button-small" onClick={this.cancelClick}>Cancel</button>
          <button className="publish-button button button-primary button-small" onClick={this.publishClick} disabled={disabled}>{publishCopy}</button>

        </div>
      </div>
    );
  }

});
