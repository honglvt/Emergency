import React from 'react';
import styles from './style.less';
import {connect} from "dva";
import {Button} from 'antd';
import AccountTable from './components/AccountTable';
import router from 'umi/router';

@connect(({modifyModal, accountManageModel}) => ({modifyModal}))
export default class AccountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  jump2AddAccount = () => {
    this.props.dispatch({
      type: 'accountManageModel/jump2AddAccount',
      payload: {
        ids: [],
        name: '',
        note: '',
        userName: '',
        targetKeys: [],
        sourceKeys: [],
        action: 'add'
      }
    })
  };

  render() {

    return (
      <div className={styles.main}>
        <a className={styles.title}>账户管理</a>
        <div className={styles.addCanteen}>
          <Button type="primary" onClick={() => {
            this.jump2AddAccount()
          }}>添加子账号</Button>
        </div>
        <AccountTable/>
      </div>)
  }
}
