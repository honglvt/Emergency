import React from 'react'
import styles from './style.less'
import {Button, Table} from 'antd'
import Modify from './components/Modify';
import {connect} from "dva";
import CanteenTable from "./components/CanteenTable";

@connect(({modifyModal}) => ({modifyModal}))
export default class CanTeenManagement extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  showModal = () => {
    this.dispatch({
      type: 'modifyModal/show',
      payload: {
        show: true,
        title: '新增餐厅',
        name: '餐厅一号',
        online: true,
        confirmLoading: false
      }
    })
  };

  render() {

    return (
      <div className={styles.main}>
        <a className={styles.title}>餐厅管理</a>
        <div className={styles.addCanteen}>
          <Button type="primary" onClick={this.showModal}>新增餐厅</Button>
          <Modify title='修改餐厅'/>
        </div>
        <CanteenTable/>
      </div>)
  }
}
