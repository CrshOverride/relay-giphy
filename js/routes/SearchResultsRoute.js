export default class extends Relay.Route {
  static path = '/';
  static queries = {
    search: (Component) => Relay.QL`
      query {
        search(q: $q) {
          ${Component.getFragment('search')},
        }
      }
    `,
  };
  static paramDefinitions = {
    q: { required: true }
  }
  static routeName = 'AppHomeRoute';
}
