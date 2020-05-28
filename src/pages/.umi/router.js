import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/chenhong/ReactProject/Emergency/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__UserLayout" */ '../../layouts/UserLayout'),
          LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/UserLayout').default,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__user__login" */ '../user/login'),
              LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                .default,
            })
          : require('../user/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/chenhong/ReactProject/Emergency/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__SecurityLayout" */ '../../layouts/SecurityLayout'),
          LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/SecurityLayout').default,
    routes: [
      {
        path: '/',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
              LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/BasicLayout').default,
        routes: [
          {
            path: '/',
            redirect: '/thumb',
            exact: true,
          },
          {
            path: '/overview',
            name: '概览',
            icon: 'icon-overview',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__overview__models__overviewModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/overview/models/overviewModel.js').then(
                      m => {
                        return { namespace: 'overviewModel', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__overview" */ '../overview'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../overview').default,
            exact: true,
          },
          {
            path: '/programme',
            name: '方案管理',
            icon: 'icon-programme',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "layouts__BlankLayout" */ '../../layouts/BlankLayout'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../../layouts/BlankLayout').default,
            routes: [
              {
                path: '/',
                redirect: '/account/list',
                exact: true,
              },
              {
                path: '/programme/list',
                name: '方案列表',
                icon: 'icon-programme',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__programme__models__programmeListModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/programme/models/programmeListModel.js').then(
                          m => {
                            return {
                              namespace: 'programmeListModel',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BlankLayout" */ '../programme/index'),
                      LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../programme/index').default,
                exact: true,
              },
              {
                path: '/programme/pages/addProgramme',
                name: '新增方案',
                icon: 'icon-programme',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__programme__models__programmeListModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/programme/models/programmeListModel.js').then(
                          m => {
                            return {
                              namespace: 'programmeListModel',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BlankLayout" */ '../programme/pages/addProgramme'),
                      LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../programme/pages/addProgramme').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('/Users/chenhong/ReactProject/Emergency/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/devices',
            name: '设备管理',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__devices" */ '../devices'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../devices').default,
            icon: 'icon-devices',
            exact: true,
          },
          {
            path: '/thumb',
            name: '概览',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__thumb" */ '../thumb'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../thumb').default,
            icon: 'icon-devices',
            exact: true,
          },
          {
            path: '/food',
            name: '菜品管理',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__foodmanagement" */ '../foodmanagement'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../foodmanagement').default,
            icon: 'icon-caipin',
            exact: true,
          },
          {
            path: '/order',
            name: '订单管理',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__ordermanagement" */ '../ordermanagement'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../ordermanagement').default,
            icon: 'icon-order',
            exact: true,
          },
          {
            path: '/settings',
            name: '系统设置',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__settings" */ '../settings'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../settings').default,
            icon: 'icon-shezhi',
            exact: true,
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ '../404'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../404').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/chenhong/ReactProject/Emergency/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/chenhong/ReactProject/Emergency/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/chenhong/ReactProject/Emergency/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
