import React from 'react'
import styles from './style.less'
import {Row, Col} from 'antd';
import SearchHeader from "./components/SearchHeader";
import Construction from "./components/Construction";
import CardTables from "./components/CardTables";
import UserModal from "./components/modal/UserModal";
import {connect} from 'dva';

@connect(({userModel}) => ({userModel}))
export default class CardManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: [
        {
          key: 'addUser',
          name: '新增用户'
        },
        {
          key: 'addUserWithGroup',
          name: '批量添加'
        },
        {
          key: 'addMoney',
          name: '批量充值'
        },
        {
          key: 'addMoneyRecords',
          name: '批量充值记录'
        },
      ]
    }
  }

  componentDidMount() {
  }


  handleActionClick = (target) => {
    console.log(target);
    this.props.dispatch({
      type: 'userModel/show',
      payload: {
        visible: true,
        title: target
      }
    })
  };

  render() {
    let actions = this.state.actions.map((item) => {
      return (<Col key={item.key}> <a onClick={() => {
        this.handleActionClick(item.name)
      }}>{item.name}</a></Col>)
    });
    return (
      <div className={styles.main}>
        <Construction/>
        <div className={styles.table}>
          <SearchHeader/>
          <Row className={styles.headActions} gutter={40}>
            {actions}
          </Row>
          <CardTables/>
        </div>
        <UserModal/>
      </div>)
  }
}
