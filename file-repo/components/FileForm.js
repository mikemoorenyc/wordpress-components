var FileForm = React.createClass({

  formClick: function(e) {
    e.preventDefault();
    $(this.refs.fileinput).click();
  },
  deleteClick: function(e) {
    e.preventDefault();
    var confirmed = confirm('Delete file?');
    if(confirmed == true) {
      this.props.setFile({
        state: 'empty'
      });
      this.setState({
        state:'empty'
      });
    }

  },
  fileChanged: function(e) {
      if(!e.target) {
        return false;
      }
      /*
        this.props.setFile({
          state: 'processing'
        });
        */
        this.setState({state: 'processing'});
        var file = e.target.files[0] || e.dataTransfer.files[0];

        var formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('id', APP.fileID);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', APP.siteDir+'/file-repo/file-uploader.php', true);
        xhr.onload = function (data) {
          if (xhr.status === 200) {
            var fileData = jQuery.parseJSON(data.srcElement.responseText);
            this.props.setFile({
              state: 'uploaded',
              filename: fileData.filename,
              color: fileData.color,
              id: fileData.id
            });
            this.setState({
              state: 'uploaded',
              filename: fileData.filename,
              color: fileData.color,
              id: fileData.id
            });

          } else {
            //ERROR STATE
            console.log(data);
            $(this.refs.fileinput).val('');
            this.setState({
              state: 'error'
            });

          }
        }.bind(this);


        xhr.send(formData);



  },
  getInitialState: function() {
    return {
      state: this.props.file.state,
      filename: this.props.file.filename,
      color: this.props.file.color,
      id: this.props.file.id
    }
  },
  render: function(){
    var headline,
        iconColor,
        iconState = 'media-text',
        interiorCopy,
        buttonText,
        progressBar,
        buttonState ='button-large',
        deleteLink = false;
    if(this.state.state == 'empty') {
      headline = 'Upload a File';
      iconColor = '#efefef';
      interiorCopy = 'Choose a file for investors to download.<br/>Accepted formats: .jpg, .png, .pdf, .doc, .ppt, .xls';
      buttonText = 'Choose a file';
      buttonState = "button-hero"
    }
    if(this.state.state == 'error') {
      headline = 'File not uploaded';
      iconColor = 'transparent';
      interiorCopy = 'There was a problem uploading your file. ';
      buttonText = 'Try again';
      iconState = 'warning';
    }
    if(this.state.state == 'processing') {
      headline = "Processing..."
      iconColor = '#efefef';
      interiorCopy = 'Your file is being uploaded to our servers.';
      progressBar = <div className="progress-bar"></div>;
    }
    if(this.state.state == 'uploaded') {
      headline = 'File Uploaded';
      iconColor = this.state.color;
      interiorCopy = this.state.filename;
      buttonText = 'Change the file';
      deleteLink = <a className="delete" href="#" onClick={this.deleteClick}>Delete this file</a>;
    }
    return (
      <div className={"file-form box-styler state-"+this.state.state}>
        <input type="file"
        ref="fileinput"
        style={{display:'none'}}
        onChange={this.fileChanged}
        />
        <div className={"icon state-"+this.state.state} style={{backgroundColor: iconColor}}>
          <span className={"dashicons dashicons-"+iconState}></span>
        </div>
        <div className="copy">
          <h1>{headline}</h1>
          <p className="sm-copy" dangerouslySetInnerHTML={{__html: interiorCopy}}></p>
          <button onClick={this.formClick} className={"button button-primary "+buttonState} >{buttonText}</button><br/> {deleteLink}
          {progressBar}
        </div>
      </div>
    )
  }
});
