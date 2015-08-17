export default class extends Relay.Route {
  static path = '/';
  static queries = {
    search: (Component) => Relay.QL`
      query {
        search {
          ${Component.getFragment('search')},
        }
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
