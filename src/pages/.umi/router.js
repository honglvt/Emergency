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
    authority: ['admin', 'user'],
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
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/canteen',
            exact: true,
          },
          {
            path: '/canteen',
            name: '餐厅管理',
            icon: 'icon-zhanghuguanli',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__canteen__models__canteenManagement__canteenListModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/canteen/models/canteenManagement/canteenListModel.js').then(
                      m => {
                        return { namespace: 'canteenListModel', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__canteen__models__canteenManagement__modifyModal.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/canteen/models/canteenManagement/modifyModal.js').then(
                      m => {
                        return { namespace: 'modifyModal', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__canteen" */ '../canteen'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../canteen').default,
            exact: true,
          },
          {
            path: '/account',
            name: '账户管理',
            icon: 'icon-zhanghuguanli',
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
                path: '/account',
                redirect: '/account/list',
                exact: true,
              },
              {
                path: '/account/sub-account/:action',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__account__models__accountManagement__accountListModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/account/models/accountManagement/accountListModel.js').then(
                          m => {
                            return {
                              namespace: 'accountListModel',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__account__models__accountManagement__accountManageModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/account/models/accountManagement/accountManageModel.js').then(
                          m => {
                            return {
                              namespace: 'accountManageModel',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BlankLayout" */ '../account/ModifyAccount'),
                      LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../account/ModifyAccount').default,
                exact: true,
              },
              {
                path: '/account/list',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      app: require('@tmp/dva').getApp(),
                      models: () => [
                        import(/* webpackChunkName: 'p__account__models__accountManagement__accountListModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/account/models/accountManagement/accountListModel.js').then(
                          m => {
                            return {
                              namespace: 'accountListModel',
                              ...m.default,
                            };
                          },
                        ),
                        import(/* webpackChunkName: 'p__account__models__accountManagement__accountManageModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/account/models/accountManagement/accountManageModel.js').then(
                          m => {
                            return {
                              namespace: 'accountManageModel',
                              ...m.default,
                            };
                          },
                        ),
                      ],
                      component: () =>
                        import(/* webpackChunkName: "layouts__BlankLayout" */ '../account'),
                      LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                        .default,
                    })
                  : require('../account').default,
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
            path: '/card',
            name: '餐卡管理',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import(/* webpackChunkName: 'p__card__models__AddChildEmployeeModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/card/models/AddChildEmployeeModel.js').then(
                      m => {
                        return {
                          namespace: 'AddChildEmployeeModel',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__card__models__CardList.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/card/models/CardList.js').then(
                      m => {
                        return { namespace: 'CardList', ...m.default };
                      },
                    ),
                    import(/* webpackChunkName: 'p__card__models__ConsctructionModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/card/models/ConsctructionModel.js').then(
                      m => {
                        return {
                          namespace: 'ConsctructionModel',
                          ...m.default,
                        };
                      },
                    ),
                    import(/* webpackChunkName: 'p__card__models__userModel.js' */ '/Users/chenhong/ReactProject/Emergency/src/pages/card/models/userModel.js').then(
                      m => {
                        return { namespace: 'userModel', ...m.default };
                      },
                    ),
                  ],
                  component: () =>
                    import(/* webpackChunkName: "p__card" */ '../card'),
                  LoadingComponent: require('/Users/chenhong/ReactProject/Emergency/src/components/PageLoading/index')
                    .default,
                })
              : require('../card').default,
            icon: 'icon-cankaguanli',
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
