import './styles.scss';
import _ from 'lodash';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchTerm: null };
  }

  handleSubmit() {
    if(!this.state.searchTerm) return false;
    let parts = _.filter(this.state.searchTerm.split(/[^\w]/gi), (t) => !(t === ''));
    let cleanTerm = parts.join('_').toLowerCase();
    window.history.pushState({}, `Search: ${cleanTerm}`, `/${cleanTerm}`);
    this.props.router.run();
    return false;
  }

  handleChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleClick() {
    this.handleSubmit();
  }

  render() {
    return (
      <div className='ui middle aligned center aligned grid'>
        <div className='column'>
          <h1 className='ui inverted header'>Giphy Search - Relay Style</h1>
          <form className='ui large form' onSubmit={this.handleSubmit.bind(this)}>
            <div className='ui inverted stacked segment'>
              <div className='field'>
                <div className='ui massive icon input'>
                  <input type='text'
                       value={this.state.searchTerm}
                       onChange={this.handleChange.bind(this)}
                       placeholder='I can haz Giphy???'></input>
                </div>
              </div>
              <div className='ui massive inverted green submit animated fade button'
                 onClick={this.handleClick.bind(this)}>
                 <div className='visible content'>Do I Feel Lucky?</div>
                 <div className='hidden content'>Well, do ya, punk?</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  router: React.PropTypes.object.isRequired
};
