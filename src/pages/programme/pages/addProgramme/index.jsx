import React from 'react';
import styles from '../style.less';
import {Button, Checkbox, Radio, BackTop, Form, Input, DatePicker, Row, Col} from 'antd';
import Executions from "./components/Executions";

const {RangePicker} = DatePicker;

const layout = {
  labelCol: {span: 2},
  wrapperCol: {span: 16},
};
const tailLayout = {
  labelCol: {span: 6},
};
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};
export default class ProgrammeManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
      changedFields: []
    }

  }

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  executionsChange = (values) => {
    console.log('executionsChange', values);
  };

  render() {
    const initialValues = {

      executions: [{
        type: 0,
        enable: true,
        typeName: '临时登记',
        devicesNum: 243,
        caseType: {
          type: 0,
          typeName: '扫码登记'
        }
      }]
    };


    return (
      <div className={styles.main}>

        <div className={styles.title}>
          新建方案
        </div>
        <div className={styles.list}>
          <Form
            initialValues={initialValues}
            name="form_new"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            onFieldsChange={(changedFields, allFields) => {
              console.log('changedFields', changedFields);
              console.log('allFields', allFields);
              this.setState({
                changedFields: allFields
              })
            }}
          >
            <Form.Item
              name="name"
              label="方案名称"
              rules={[
                {
                  required: true,
                  message: '请输入员工姓名',
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item name="range-picker" label="执行时间" {...rangeConfig}>
              <RangePicker/>
            </Form.Item>
            <Form.Item name="number"
                       label="执行单位"
                       rules={[
                         {
                           required: true,
                           message: '请选择执行单位',
                         },
                       ]}>
              <Input/>
            </Form.Item>

            <Form.Item name="executions"
                       label="执行方式"
            >
              <Executions/>
            </Form.Item>

            <Form.Item>
              <div className={styles.confirm}>
                <Button type="primary">
                  保存草稿
                </Button>
                <Button type="primary" htmlType="submit" style={{marginLeft: 32}}>
                  完成设置
                </Button>
              </div>
            </Form.Item>
          </Form>

        </div>
        <BackTop/>
      </div>)
  }
}
