class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Giphy Results!</h1>
        {this.props.search.results.map(gif =>
          <p>
            <img src={gif.images.fixed_height.url} />
            }
          </p>
        )}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    search: () => Relay.QL`
      fragment on Search {
        results {
          embed_url
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
