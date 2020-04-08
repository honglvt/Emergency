import React from 'react';
import {connect} from 'dva';
import {Button, Modal, Form, Input, Radio, Checkbox, Switch} from 'antd';
import styles from './style.less';

/**
 *WebStorm create by chenhong on 2020/4/8
 *
 */
const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 6, span: 16},
};

@connect(({addChildEmployeeModel, constructionModel}) => ({...addChildEmployeeModel}))
export default class AddChildEmployeeModal extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   关闭弹窗
   */
  disMissModal = () => {
    this.props.dispatch({
      type: 'addChildEmployeeModel/newData',
      payload: {
        visible: false,
      }
    })
  };

  /**
   * 确认按钮
   * @param e
   */
  handleOk = e => {

    this.props.dispatch({
      type: 'addChildEmployeeModel/confirm',
      payload: {
        add: this.props.add,
        dataCode: this.props.dataCode,
        dataName: this.props.dataName,
        enable: this.props.enable,
        id: this.props.id,
        pId: this.props.id
      }
    }).then(() => {
      this.props.dispatch({
        type: 'constructionModel/getEmployeeConstructionTree',
        payload: {
          id: this.props.id
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
  codeChange = e => {
    this.props.dispatch({
      type: 'addChildEmployeeModel/newData',
      payload: {
        dataCode: e.target.value,
      }
    })
  };

  nameChange = e => {
    this.props.dispatch({
      type: 'addChildEmployeeModel/newData',
      payload: {
        dataName: e.target.value,
      }
    })
  };

  enableChange = e => {
    this.props.dispatch({
      type: 'addChildEmployeeModel/newData',
      payload: {
        enable: e,
      }
    })
  };

  render() {
    const {title, dataCode, dataName, enable, pid, visible, add} = this.props;

    return (
      <Modal
        centered={true}
        title={add ? '添加子部门' : title}
        visible={visible}
        onOk={
          this.handleOk
        }
        onCancel={this.handleCancel}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
        }}>
          <div className={styles.addChildModal}>
            <div className={styles.form}>
              编码
              <Input placeholder={'请输入数字'} className={styles.buInput} value={dataCode}
                     onChange={this.codeChange}/>
            </div>
            {
              add ? <div className={styles.infor}>
                编码用于标示部门，不可重复，且输入后不可修改！
              </div> : ''
            }

            <div className={styles.form} style={{marginTop: 16}}>
              名称
              <Input placeholder={'请输入名称'} className={styles.buInput} value={dataName}
                     onChange={this.nameChange}/>
            </div>
            {
              add ? '' : <div className={styles.form} style={{marginTop: 16}}>
                状态
                <Switch style={{marginLeft: 16}} checked={enable} onChange={this.enableChange}/>
              </div>
            }
          </div>
        </div>

      </Modal>
    )
  }
}
