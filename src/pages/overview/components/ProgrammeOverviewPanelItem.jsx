import React from 'react';
import {Form, Input} from "antd";

/**
 *WebStorm create by chenhong on 2020/4/10
 *
 */

const TimeZone = ({value = {}}) => {
  return (<div>
    <Input value={value.start} style={{width: 200, marginRight: 8}} disabled={true}/>
    至
    <Input value={value.end} style={{width: 200, marginLeft: 8}} disabled={true}/>
  </div>)
};

export default class ProgrammeOverviewPanelItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor: 'white', padding: 8}}>
        <Form
          layout={'vertical'}
          name="basic"
          initialValues={this.props.initialValues}
        >
          <Form.Item
            label="执行单位:"
            name="unit"
          >
            <Input disabled={true}/>
          </Form.Item>

          <Form.Item
            label="计划执行时间:"
            name="timeZone"
          >
            <TimeZone/>
          </Form.Item>
          <Form.Item
            label="已关联设备:"
            name="devices"
          >
            <Input style={{width: 200, marginRight: 8}} disabled={true}/>
          </Form.Item>
        </Form>
      </div>

    )
  }
}
