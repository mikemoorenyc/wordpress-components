var SelectedUserList = React.createClass({

  pillClicked: function(e) {
    e.preventDefault(e);
    this.props.checkToggle(e.target.value);
  },
  render: function() {

    var theList = this.props.users.map(function(user){
      return (
        <div className="selected-pill" key={user.id}>
        <input
          type="checkbox"
          value={user.id}
          style={{display:'none'}}
          id={'selected-pill-'+user.id}
          onChange={this.pillClicked}
        />
        <label
          htmlFor={'selected-pill-'+user.id}
        >
          <span className="dashicons dashicons-dismiss"></span>
          {user.displayName}
        </label>
        </div>
      )


    }.bind(this));
    return(
      <div className="currently-selected-users" id="currently-selected-users">
      <h2>Selected people</h2>
      {theList}
      </div>
    )
  }
});
