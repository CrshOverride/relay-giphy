import SearchResults from './components/SearchResults/component';
import SearchResultsRoute from './routes/SearchResultsRoute';
import Search from './components/Search/component';

let doSomething = () => {
  window.history.pushState({}, 'Home', '/');
  router.run();
}

let router = new LightRouter({
  type: 'path',
  pathRoot: '',
  routes: {
    '': () => {
      React.render(<Search router={router} />, document.getElementById('root'));
    },
    '{q}': (params) => {
      React.render(
        <Relay.RootContainer
          Component={SearchResults}
          route={new SearchResultsRoute({q: params.q.replace(/-/g,' ')})} />,
        document.getElementById('root')
      )
    }
  }
});

router.run();

window.addEventListener('popstate', () => {
  router.run();
});
