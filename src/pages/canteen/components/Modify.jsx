import React from 'react';
import {Modal, Input, Switch} from 'antd';
import {connect} from 'dva';
import styles from './style.less'

/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
@connect(({modifyModal,canteenListModel}) => ({
  visible: modifyModal.show,
  title: modifyModal.title,
  name: modifyModal.name,
  online: modifyModal.online,
  confirmLoading: modifyModal.confirmLoading,
  id: modifyModal.id,
  currentPage: canteenListModel.currentPage
}))
export default class Modify extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   关闭弹窗
   */
  disMissModal() {
    this.props.dispatch({
      type: 'modifyModal/show',
      payload: {
        show: false,
      }
    })
  }

  /**
   * 确认按钮
   * @param e
   */
  handleOk = e => {
    this.props.dispatch({
      type: 'modifyModal/confirm',
      payload: {
        name: this.props.name,
        online: this.props.online,
        title: this.props.title,
        id: this.props.id
      }
    }).then(() => {
      this.props.dispatch({
        type: 'canteenListModel/nextPage',
        payload: {
          page: this.props.currentPage
        }
      })
    });


  };

  /**
   * 取消按钮
   * @param e
   */
  handleCancel = e => {
    console.log(e);
    this.disMissModal();
  };

  /**
   * 输入餐厅名字
   * @param e
   */
  inputChange = (e) => {
    this.props.dispatch({
      type: 'modifyModal/show',
      payload: {
        name: e.target.value
      }
    })
  };

  /**
   * 是否上线
   * @returns {*}
   */
  checked = (checked) => {
    this.props.dispatch({
      type: 'modifyModal/show',
      payload: {
        online: checked,
      }
    })
  };

  render() {
    const {visible, title, name, online, confirmLoading} = this.props;
    console.log('online?:' + online);
    return (
      <Modal
        centered
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
      >
        <div className={styles.modalChild}>
          <div className={styles.name}>
            <a>餐厅名称</a>
            <div className={styles.input}>
              <Input value={name} onChange={this.inputChange}/>
            </div>
          </div>
          <div className={styles.switch}>
            <a style={{marginRight: 24}}>是否上线</a>
            <Switch checked={online} onChange={this.checked}/>
          </div>
        </div>
      </Modal>
    )
  }
}
