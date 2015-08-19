import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';

let doSomething = () => {
  window.history.pushState({}, 'Home', '/');
  router.run();
}

let router = new LightRouter({
  type: 'path',
  pathRoot: '',
  routes: {
    '': () => {
      React.render(
        <Relay.RootContainer
          Component={App}
          route={new AppHomeRoute()}
        />,
        document.getElementById('root')
      );
    },
    '{q}': (params) => {
      React.render(
        <div onClick={doSomething}>Searching for: {params.q}</div>, document.getElementById('root')
      );
    }
  }
});

router.run();

window.addEventListener('popstate', () => {
  router.run();
});

/*

'': () => {
      React.render(
        <Relay.RootContainer
          Component={App}
          route={new AppHomeRoute()}
        />,
        document.getElementById('root')
      );
    },
    '{q}': (params) => {
      React.render(
        <div>Searching for: {params.id}</div>
      )
    }

*/
