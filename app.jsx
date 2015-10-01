var Header = React.createClass({
  render: function() {
    return <header>
        <div className='overlay'>
          <div className='container'>
            <h1 className='text-center title'>Image Search</h1>
            <h5 className='text-center subtitle'>Search For Pictures Uploaded By Flickr Users</h5>
          </div>
        </div>
      </header>;
  }
});
var Footer = React.createClass({
  render: function() {
    return <footer>
      <div className='overlay'>
        <div className='container'>
          <h4 className='text-center title'>&copy; 2015 Luckycode.org | by Son Truong</h4>
        </div>
      </div>
    </footer>;
  }
});
var Search = React.createClass({
  getInitialState: function() {
    return {
      text: null
    };
  },
  render: function() {
    return <form onSubmit={this.handleSubmit}>
      <div className='input-group'>
        <input className='form-control' id='search' onChange={this.handleChange} placeholder='Search Image' value={this.state.text}/>
        <span className='input-group-btn'>
          <button className='btn btn=default'>Search</button>
        </span>
      </div>
    </form>;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(flickerAPI, {
      tags: this.state.text,
      tagmode: "any",
      format: "json"
    })
      .done(this.handleData);
    this.setState({
      text: ""
    });
  },
  handleData: function(data) {
    this.props.onSuccess(data.items);
  },
  handleChange: function(e) {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  }
});

var Gallery = React.createClass({
  render: function() {
    return <div className='row'>{this.props.data.map(function (pic) {
      return <div className='col-sm-4'>
        <div className='photo-wrapper'>
          <img className='img-responsive center-block' src={pic.media.m}/>
          <h5>{pic.title}</h5>
          <cite>{pic.author}</cite>
        </div>
      </div>;
     })}
   </div>;
  }
});
var App = React.createClass({
  getInitialState: function() {
    return { data: [] };
  },
  updatePics: function(data) {
    this.setState({
      data: data
    });
  },
  render: function() {
    return <div><Header/><section><div className='container'><Search onSuccess={this.updatePics} /><Gallery data={this.state.data} /></div></section><Footer/></div>;
  }
});

React.render(<App/>, document.getElementById('root'));
