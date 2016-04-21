var UserList = React.createClass({
  getInitialState: function() {
    return {
      selectedUserList: this.selectedUserListCreate(this.props.selectedUsers)
    }
  },
  selectedUserListCreate: function(ids) {
    var selectedUserList = [];
    $(this.props.userList).each(function(index,e){
        if(jQuery.inArray( parseFloat(e.id),ids ) > -1) {
          selectedUserList.push(e);
        }
    });
    return selectedUserList;
  },
   componentWillReceiveProps: function(nextProps) {

     this.setState({
       selectedUserList: this.selectedUserListCreate(nextProps.selectedUsers)
     });
   },
  checkboxClicked: function(e) {
    e.preventDefault(e);
    this.props.checkToggle(e.target.value);
  },
  render: function() {
    var userArray = this.props.userList;

    userArray.sort(function(a, b) {
    var textA = a.lastName.toUpperCase();
    var textB = b.lastName.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
    var userBlock = userArray.map(function(user){
      var displayName,
          inGroup,
          selected = '',
          checkState = '',
          checkBox,
          userChecked = false,
          checkDisabled = false;


      //IF IN GROUP
      var groups = user.groups;
      $(groups).each(function(index, e){
        if(jQuery.inArray( parseFloat(e),this.props.selectedGroups ) > -1) {
          inGroup = <span className="group-span">in selected group</span>;
          checkState = 'disabled';
          checkDisabled = true;
        }
      }.bind(this));

      //IF SELECTED
      if(inGroup || jQuery.inArray( parseFloat(user.id),this.props.selectedUsers ) > -1) {
        selected = 'selected';
      }

      //IF
      if(jQuery.inArray( parseFloat(user.id),this.props.selectedUsers ) > -1) {
        userChecked = true;
      }

      return (
        <div className={"user "+checkState+' '+selected} key={user.id}>
          <input style={{display:'none'}} type="checkbox" value={user.id} id={'input-user-'+user.id} data-checked={userChecked} disabled={checkDisabled} onChange={this.checkboxClicked}  />

          <label htmlFor={'input-user-'+user.id}>
            <span className="checkbox" data-checked={userChecked}>
              <span className="dashicons dashicons-yes"></span>
            </span>
            {user.displayName} {inGroup}
          </label>
        </div>
      );
    }.bind(this));

    //IF SELECTED USERS EXIST
    var selectedUsers = false;
    if(this.state.selectedUserList.length > 0) {
      selectedUsers = <SelectedUserList
      users={this.state.selectedUserList}
      checkToggle={this.props.checkToggle}

      />
    }

    return (
      <div className="user-list box-styler">
      <UserSearch
      selectedUsers = {this.state.selectedUserList}
      allUsers = {userArray}
      selectedGroups= {this.props.selectedGroups}
      checkToggle={this.props.checkToggle}

      />
        {selectedUsers}
      </div>
    )
  }
});
