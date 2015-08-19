class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <div className='ui inverted container segment center aligned'>
          <h1 className='ui header'>Here's those TPS Reports you asked for...</h1>
        </div>
        <div className='ui three giphy cards'>
          {this.props.search.results.map(gif =>
            <div className='ui card'>
              <div className='image'>
                <img src={gif.images.fixed_height.url} />
              </div>
              <div className='content'>
                <form className='ui form'>
                  <div className='field'>
                    <div className='ui small fluid labeled input'>
                      <div className='ui label'>Image Type</div>
                      <input type='text' value={gif.type} />
                    </div>
                  </div>
                  <div className='field'>
                    <div className='ui small fluid labeled input'>
                      <div className='ui label'>URL</div>
                      <input type='text' value={gif.url} />
                    </div>
                  </div>
                  <div className='field'>
                    <div className='ui small fluid labeled input'>
                      <div className='ui label'>Embed URL</div>
                      <input type='text' value={gif.embed_url} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(SearchResults, {
  fragments: {
    search: () => Relay.QL`
      fragment on Search {
        results {
          type
          embed_url
          url
          images {
            fixed_height {
              url
            }
          }
        }
      }
    `,
  },
});

/*

<div>
  <h1>Giphy Results!</h1>
  {this.props.search.results.map(gif =>
    <p>
      <img src={gif.images.fixed_height.url} />
    </p>
  )}
</div>

<div className='ui grey inverted middle aligned giffy container segment'>
  <div className='ui grid'>
    <div className='row'>
      <div className='six wide column center aligned middle aligned'>
        <img className='giffy' src={gif.images.fixed_height.url} />
      </div>
      <div className='ten wide column left aligned'>
        <div className='ui large fluid labeled input'>
          <div className='ui label'>Embed URL</div>
          <input type='text' value={gif.embed_url} />
        </div>
      </div>
    </div>
  </div>
</div>

*/
