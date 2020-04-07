import React from 'react';
import {Form, Input, Button, Checkbox, Transfer, Switch} from 'antd';
import {connect} from 'dva';
import router from 'umi/router';

/**
 *WebStorm create by chenhong on 2020/4/7
 *
 */
const layout = {
  labelCol: {span: 2},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 2, span: 16},
};
@connect(({accountManageModel}) => ({
  id: accountManageModel.id, //账户id
  sourceKeys: accountManageModel.sourceKeys,//待选餐厅
  targetKeys: accountManageModel.targetKeys, //已选中的餐厅列表
  name: accountManageModel.name, //账户名称
  note: accountManageModel.note, //备注
  userName: accountManageModel.userName, //手机号
  ids: accountManageModel.ids//已选中的餐厅列表
}))
export default class ModifyAccountFormList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
    };
  }

  /**
   * 当数据改变时
   * @param nextTargetKeys
   * @param direction
   * @param moveKeys
   */
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.props.dispatch({
      type: 'accountManageModel/targetKeys',
      payload: {
        targetKeys: nextTargetKeys,
        ids: nextTargetKeys
      }
    });
    // this.setState({targetKeys: nextTargetKeys});
    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  /**
   * 选中时，此时数据还未改变
   * @param sourceSelectedKeys
   * @param targetSelectedKeys
   */
  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]});

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  /**
   * 提交按钮
   * @param values
   */
  onFinish = values => {
    console.log('Success:', values);
    this.props.dispatch({
      type: `accountListModel/${this.props.action === 'add' ? 'add' : 'update'}Account`,
      payload: {...values, id: this.props.id}
    })
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  render() {
    const {sourceKeys, targetKeys, name, note, userName, ids} = this.props;
    console.log('targetKeys', targetKeys);
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{...this.props}}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="账户名称"
          name="name"
          rules={[{required: true, message: '请输入账户名称!'}]}
        >
          <Input value='11111' style={{width: '240px'}}/>
        </Form.Item>

        <Form.Item
          label="绑定手机"
          name="userName"
          rules={[{required: true, message: '请输入手机号!'}]}
        >
          <Input style={{width: '240px'}}/>
        </Form.Item>
        <Form.Item
          label="子账户说明"
          name="note"
          rules={[{required: false, message: '请输入手机号!'}]}
        >
          <Input style={{width: '240px'}}/>
        </Form.Item>

        <Form.Item
          label="授权餐厅"
          name="ids"
          rules={[{required: false, message: '请选择授权餐厅!'}]}
        >
          <Transfer
            dataSource={sourceKeys}
            titles={['待选餐厅', '已选餐厅']}
            targetKeys={targetKeys}
            selectedKeys={this.state.selectedKeys}
            onChange={this.handleChange}
            onSelectChange={this.handleSelectChange}
            onScroll={this.handleScroll}
            render={item => item.title}
            locale={{itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'}}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button style={{marginLeft: 64}} htmlType="button" onClick={() => {
            router.goBack()
          }}>
            返回
          </Button>
        </Form.Item>
      </Form>
    );
  };
}
