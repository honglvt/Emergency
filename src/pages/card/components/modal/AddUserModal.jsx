import React from 'react';
import {Button, Modal, Form, Input, Select, Radio} from 'antd';
import styles from './style.less';
import {connect} from 'dva';

const {Option} = Select;
const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 6, span: 16},
};
const CollectionCreateForm = ({visible, handleOk, onCancel, initialValues}) => {
  const [form] = Form.useForm();
  let options = initialValues.options.map((item) => {
    return (<Option value={[item.typeName, item.typeCode]} key={item.typeCode}>{item.typeName}</Option>)
  });
  console.log('options,', options);
  if (initialValues && initialValues.options.length > 0) {
    initialValues.type = [initialValues.options[0].typeName, initialValues.options[0].typeCode];
  }

  return (
    <Modal
      visible={visible}
      title={initialValues.title}
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            handleOk(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        {...layout}
        form={form}
        name="form_in_modal"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入员工姓名',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            {
              required: true,
              message: '请输入员工手机号',
            },
          ]}>
          <Input/>
        </Form.Item>
        <Form.Item name="number" label="工号">
          <Input/>
        </Form.Item>
        <Form.Item name="cardNumber" label="卡号">
          <Input/>
        </Form.Item>
        <Form.Item name="type" label="部门">
          <Select>
            {options}
          </Select>
        </Form.Item>
        <Form.Item
          {...tailLayout}
          name="status"
          label="状态"
          rules={[
            {
              required: true,
              message: '请选择是否启用',
            },
          ]}>
          <Radio.Group>
            <Radio value="enable">启用</Radio>
            <Radio value="disable">禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

/**
 *WebStorm create by chenhong on 2020/3/27
 *
 */
@connect(({userModel}) => ({
  ...userModel
}))
export default class AddUserModal extends React.Component {

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
  handleOk = (values) => {

    console.log(values);
    this.props.dispatch({
      type: 'userModel/confirm',
      payload: values
    });
  };

  render() {
    const {visible, title, name, phone, status, number, cardNumber, options} = this.props;
    return (
      <CollectionCreateForm
        visible={visible}
        handleOk={this.handleOk}
        onCancel={() => {
          this.disMissModal()
        }}
        initialValues={{
          title: title,
          name: name,
          phone: phone,
          status: status,
          number: number,
          cardNumber: cardNumber,
          options: options
        }}
      />
    )
  }
}
