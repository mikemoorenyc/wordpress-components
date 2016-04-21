var MainFileComponent = React.createClass({
  getInitialState: function(){
    return {
      file: APP.file,
      width: 'wide',
      userList: APP.userList,
      selectedGroups: APP.selectedGroups,
      selectedUsers: APP.selectedUsers
    }
  },
  setFile: function(fileData) {
    this.setState({
      file: fileData
    });
  },
  checkToggle: function(id) {
      Array.prototype.remove = function(value) {
       this.splice(this.indexOf(value), 1);
       return true;
     };
    var users = this.state.selectedUsers;
    if(jQuery.inArray( parseFloat(id), users ) > -1) {
      users.remove(parseFloat(id));
    } else {
      users.push(parseFloat(id))
    }

    this.setState({selectedUsers: users})
  },
  componentDidMount: function() {
    this.sizeSet();
    $(window).on('resize',function(){
      this.sizeSet();
    }.bind(this));

    $('#pgroupchecklist input[type="checkbox"]').on('change',function(){
      var groupArray = [];
      $('#pgroupchecklist input[type="checkbox"]:checked').each(function(index,e){
        groupArray.push(parseFloat($(e).val()));
      });
      this.setState({
        selectedGroups: groupArray
      });
    }.bind(this));
  },
  sizeSet: function(){
    if($(this.refs.sizer).width() < 700){
      this.setState({width:'thin'});
    } else {
      this.setState({width:'wide'});
    }
  },
  componentWillUnmount: function() {
    $(window).off('resize');
    $('#pgroupchecklist input[type="checkbox"]').off('change');
  },
  render: function(){
    
    return(

      <div className={this.state.width} ref="sizer">
      <input type="hidden" name="file_info" id="file_info" value={JSON.stringify(this.state.file)} />
      <input type="hidden" name="selected_user_group" id="selected_user_group" value={JSON.stringify(this.state.selectedUsers)} />
      <UserList
        userList={this.state.userList}
        selectedGroups={this.state.selectedGroups}
        selectedUsers={this.state.selectedUsers}
        checkToggle={this.checkToggle}
      />
      <FileForm file={this.state.file} setFile={this.setFile}/>
      </div>
    )
  }
});
