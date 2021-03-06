import React from 'react';
import {connect} from 'dva';
import {PageLoading} from '@ant-design/pro-layout';
import {Redirect} from 'umi';
import {stringify} from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
  };

  constructor(props) {
    super(props);
    console.log('SecurityLayout componentWillMount');
    this.props.dispatch({
      type: 'login/login',
      payload: {
        token: 'abcd'
      },
    });
  }

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  componentWillMount() {
  }

  render() {
    const {isReady} = this.state;
    const {children, loading, currentUser, login} = this.props; // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）

    // const isLogin = currentUser && currentUser.userid;
    // let c_token = localStorage.getItem("Token");
    // const isLogin = login;
    // const queryString = stringify({
    //   redirect: window.location.href,
    // });
    //
    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading/>;
    // }
    //
    // if (!isLogin && window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`}/>;
    // }

    return children;
  }
}

export default connect(({user, loading, login}) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
  login: login.login
}))(SecurityLayout);
