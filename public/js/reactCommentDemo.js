
//This is a the parent component that contains all other child components in this app.
class CommentBox extends React.Component {

  constructor() {
    super(); //this must be called first inside a custructor.

    this.state = {
      showComments: true, //show comments as an initial state.
      btnText: "Hide Comments",
      comments: []
      //  { _id: 1, author: 'Morgan McCircuit', body: 'Great picture!'},
      //  { _id: 2, author: 'Bending Bender', body: 'Execellent stuff'}
      //]
    };
  }

  componentWillMount() {
    this._fetchComments(); //Fetch comments from server before component is rendered.
  }

  render() {
    var comments = this._getComments();
    var commentsTitle = this._getCommentsTitle(comments.length);

    var commentNodes;
    if(this.state.showComments) {
      commentNodes = <div className="row">{comments}</div>;
    }

    return(
      <div className="container well">
        <CommentForm addComment={this._addComment.bind(this)} />
        <hr className="myhr" />
        <div className="row">
          <div className="col-sm-6">
            <h3>User Comments</h3>
          </div>
          <div className="col-sm-6 text-right">
            <h4 className="">
              {commentsTitle}
              <span className="spacer"></span>
              <button className="btn btn-primary" onClick={this._showCommentsBtnClick.bind(this)}>{this.state.btnText}</button>
            </h4>
          </div>
        </div>
        {commentNodes}
      </div>
    ); 
  }

  componentDidMount() {
    this._timer = setInterval(() => this._fetchComments(), 10000); //Polls the server every 10 seconds.
  }

  componentWillUnmount() {			//Runs when component is about to be removed from the DOM.
    clearInterval(this._timer);	//Remove the timer
  }

  //This function retrieves comments from the server.
  _getComments() {

    return this.state.comments.map((comment) => { //Each element of commentList is passed as an argument.
      return (
        //The delete event handler is defined in the parent component, so a handle is passed as a prop to the child component.
        //<Comment author={comment.author} body={comment.body} dateStamp={comment.dateStamp} key={comment._id} onDelete={this._deleteComment.bind(this)} />
        <Comment key={comment._id} comment={comment} onDelete={this._deleteComment.bind(this)} />
      );
    });
  }

  //This function formats the title displaying how many comments exit.
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  //Toggles the showComments state when the button is clicked.
  _showCommentsBtnClick() {

    if(this.state.showComments) {
      this.setState({
        showComments: !this.state.showComments,
        btnText: "Show Comments"
      });
    } else {
      this.setState({
        showComments: !this.state.showComments,
        btnText: "Hide Comments"
      });
    }
  }

  //Gets triggered by CommentForm when a new comment is added.
  _addComment(author, body) {	

    var now = new Date();
    var dateStamp = now.toLocaleString();

    const comment = { //New comment object
      _id: this.state.comments.length +1,
      author,
      body,
      dateStamp
    };

    //Updates state when function is called by adding a new comment.
    //New array references help React stay fast, so 'concat' works better than 'push' here.
    this.setState({ comments: this.state.comments.concat([comment]) }); 

    //Create a new post on the server.
    $.post('/api/reactcomments/create', comment, (data) => {
      //debugger;
    })
    //If sending the data to the server fails:
    .fail(function( jqxhr, textStatus, error ) {
      debugger;

      var err = textStatus + ", " + error;

      try {
        console.log( "Request Failed: " + error );
        console.error('Error message: '+jqxhr.responseText);
      } catch(err) {
        console.error('Error trying to add comment to server.');
      }            
    });
  }

  //Fetch comments from the server, then populate the DOM with the data.
  _fetchComments() {
    $.get('/api/reactcomments/list', '', (comments) => {
      this.setState({ comments: comments.comments });
    })
    //If sending the data to the server fails:
    .fail(function( jqxhr, textStatus, error ) {
      debugger;

      var err = textStatus + ", " + error;

      try {
        console.log( "Request Failed: " + error );
        console.error('Error message: '+jqxhr.responseText);
      } catch(err) {
        console.error('Error trying to get comments from server.');
      }            
    });
  }

  //This function is responsible for deleting comments from the server.
  //It's called when a user clicks the delete button in one of the Comment components.
  _deleteComment(comment) {

    //Remove the comment from the server
    $.get('/api/reactcomments/'+comment._id+'/remove', '', function(data) {
      //debugger;

      if(!data.success) {
        console.warn('Server reported that deletion of comment was not successful!');
      }
    })
    //If sending the data to the server fails:
    .fail(function( jqxhr, textStatus, error ) {
      debugger;

      var err = textStatus + ", " + error;

      try {
        console.log( "Request Failed: " + error );
        console.error('Error message: '+jqxhr.responseText);
      } catch(err) {
        console.error('Error trying to delete comment from server.');
      }            
    });

    //We will not wait for the API request to be finished before updating the component's state. 
    //We will give our user immediate visual feedback, which is known as an *optimistic update*.	
    const comments = [...this.state.comments]; //Use spread operator to clone existing array.
    const commentIndex = comments.indexOf(comment);
    comments.splice(commentIndex, 1);	//Removes comment from array

    this.setState({ comments }); //Update the state.
  }
}

//The Comment component is replicated for each comment.
class Comment extends React.Component {
  render() {
    return(
      <div className="col-sm-6">
        <div className="row">
          <div className="col-sm-2">
            <div className="thumbnail">
              <img className="img-responsive user-photo" src="images/avatar_2x.png" />
            </div>
          </div>

          <div className="col-sm-10">
            <div className="panel panel-default">
              <div className="panel-heading">
                <strong>{this.props.comment.author}</strong> <span className="text-muted">commented {this.props.comment.dateStamp}</span>
              </div>
              <div className="panel-body">
                <p>
                  {this.props.comment.body}
                </p>
                <button className="btn btn-sm btn-danger pull-right" onClick={this._handleDelete.bind(this)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //Wraper for this component. Passes control to the _deleteComment function in the CommentBox component.
  _handleDelete(event) {
    event.preventDefault();	//Prevent page scrolling
    if(confirm('Are you sure?')) {
      this.props.onDelete(this.props.comment);	//Pass the current comment as an argument to the onDelete prop, which invokes the _handleDelete() function.
    }
  }
}

//This comment form allows users to add a comment.
class CommentForm extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col-sm-12">
          <h3>Add Your Comment</h3>
          <form onSubmit={this._handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input type="text" className="form-control" id="commentName" placeholder="Name" ref={(input) => this._author = input} />
            </div>
            <div className="form-group">
              <label htmlFor="commentMessage">Message</label>
              <textarea type="text" rows="2" className="form-control" id="commentMessage" placeholder="Message" ref={(textarea) => this._body = textarea}></textarea>
            </div>

            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>        
    );
  }

  //Get the form data and pass them on to the _addComment function in the parent component.
  _handleSubmit(event) {
    event.preventDefault(); //Prevent page from reloading.

    var author = this._author; //Populated from refs in JSX
    var body = this._body;

    this.props.addComment(author.value, body.value); 
  }
}

ReactDOM.render(
  <CommentBox />, document.getElementById('commentarea')
);
