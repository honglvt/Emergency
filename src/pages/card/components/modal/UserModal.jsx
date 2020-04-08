import React from 'react';
import {Modal, Input} from 'antd';
import styles from './style.less';
import {connect} from 'dva';

/**
 *WebStorm create by chenhong on 2020/3/27
 *
 */
@connect(({userModel}) => ({
  title: userModel.title,
  confirmLoading: userModel.confirmLoading,
  visible: userModel.visible,
  userName: userModel.userName
}))
export default class UserModal extends React.Component {

  constructor(props) {
    super(props);
    const {name} = props;
    this.state = ({
      inputValue: name,
      childKeys: [
        '姓名',
        '手机号',
        '工号',
        '卡号',
        '部门',
      ]
    })
  }

  /**
   关闭弹窗
   */
  disMissModal() {
    this.props.dispatch({
      type: 'userModel/show',
      payload: {
        visible: false,
      }
    })
  }

  /**
   * 确认按钮
   * @param e
   */
  handleOk = e => {

    this.props.dispatch({
      type: 'userModel/confirm',
      payload: {}
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
    this.setState({
      inputValue: e.target.value
    })
  };

  render() {
    const {visible, title, confirmLoading, userName} = this.props;
    const items = this.state.childKeys.map((key) => {
      return (<div className={styles.child}>
        <div style={{width: 0, flex: 1}}>
          <a>{key}</a>
        </div>
        <div className={styles.input}>
          <Input key={'userInput'} placeholder={key} onChange={this.inputChange}/>
        </div>
      </div>)
    });
    return (
      <Modal
        centered
        title={title}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
      >
        <div className={styles.userModal}>
          {items}
        </div>
      </Modal>
    )
  }
}
