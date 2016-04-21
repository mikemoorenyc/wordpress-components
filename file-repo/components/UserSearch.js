var UserSearch = React.createClass({
  getInitialState: function() {
    return {
      searchValue: '',
      focused: false,
      currentlyHighlighted: null,
      mouseOver: false
    }
  },
  checkToggle: function(e) {

    e.preventDefault(e);
    this.props.checkToggle(e.target.value);
    this.setState({
      focused: false,
      currentlyHighlighted: null,
      searchValue: ''
    });
  },
  focusSet: function(){
    this.setState({
      focused: true,
      currentlyHighlighted: null,
      searchValue: ''
    })
  },
  blurSet: function() {
    if(this.state.mouseOver) {
      return false;
    }
    this.setState({
      focused: false,
      currentlyHighlighted: null,
      searchValue: ''
    });
  },
  mouseIn: function() {
    this.setState({mouseOver:true})
  },
  mouseOut: function() {
    this.setState({mouseOver:false})
  },
  searchChange: function(e) {
    this.setState({
      searchValue: e.target.value
    })
  },

  render: function() {

    //SELECTED IDS
    var selectedIDs = [];
    $(this.props.selectedUsers).each(function(index,e){
      selectedIDs.push(parseFloat(e.id));
    });
    console.log()
    var nameList
    var results = [];
    nameList = this.props.allUsers.map(function(user){
      //SET IF SEARCHABLE
      var haystack = user.displayName.toUpperCase();
      var needle = this.state.searchValue.toUpperCase();
      var start = haystack.indexOf(needle);

      //DISMISS IF NOT FOUND
      if(start < 0 && this.state.searchValue.length > 1) {
        return false;
      }
      var firstSec = user.displayName.slice(0,start);
      var highlight = <b>{user.displayName.slice(start, start+this.state.searchValue.length)}</b>;
      var endSec = user.displayName.slice(start+this.state.searchValue.length, user.displayName.length)

      var name = <span>
                  {firstSec}
                  {highlight}
                  {endSec}
                </span>
      if(this.state.searchValue.length < 2) {
        name = user.displayName;
      }
      var inGroup = false;
      var highlighted = false;
      if(user.id == this.state.currentlyHighlighted) {
        highlighted = true;
      }

      var userChecked=false;
      //CHECK IF SELECTED
      if(jQuery.inArray( parseFloat(user.id),selectedIDs ) > -1) {
        userChecked = true;
      }

      results.push(user.id);
      return (
        <div key={user.id} data-highlight={highlighted} className="search-item">
          <input type="checkbox" value={user.id}  onChange={this.checkToggle} style={{display:'none'}} id={"user-search-item-"+user.id}/>
          <label htmlFor={"user-search-item-"+user.id}>
          <span className="checkMark" data-checked={userChecked}>
            <span className="dashicons dashicons-yes"></span>
          </span>

          {name}
          {inGroup}
          </label>
        </div>
      )
    }.bind(this));

    if(this.state.focused == false) {
      nameList = false;
    }
    if(results.length < 1 && this.state.searchValue.length > 1) {
      nameList = <div className="no-matches">No matches</div>
    }

    return(
      <div id="user-search-form" onMouseOver={this.mouseIn} onMouseOut={this.mouseOut}>
        <input
          type="text"
          placeholder="Pick who can see the file"
          onFocus={this.focusSet}
          onBlur={this.blurSet}
          onChange={this.searchChange}
          value={this.state.searchValue}
          data-activated={this.state.focused}
          />
        <div className="list-holder">
          <div className="positioner">
          {nameList}
          </div>
        </div>
      </div>
    )
  }
});
