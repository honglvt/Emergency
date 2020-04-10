import React from 'react';
import {Select,Input,Button} from 'antd';

const {Option} = Select;
/**
 *WebStorm create by chenhong on 2020/4/10
 *
 */
export default class SearchHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  handleStatusChange = (value) => {
    console.log(`selected ${value}`);
  };

  render() {
    return (<div>
      <Select defaultValue="online" style={{width: 120}} onChange={this.handleStatusChange}>
        <Option value="ready">未开始</Option>
        <Option value="online">执行中</Option>
        <Option value="pause">暂停中</Option>
        <Option value="end">已结束</Option>
        <Option value="close">已关闭</Option>
      </Select>
      <Select defaultValue="online" style={{width: 120,marginLeft:16}} onChange={this.handleStatusChange}>
        <Option value="ready">未开始</Option>
        <Option value="online">执行中</Option>
        <Option value="pause">暂停中</Option>
        <Option value="end">已结束</Option>
        <Option value="close">已关闭</Option>
      </Select>
      <Input style={{width:200,marginLeft:16}} placeholder='方案名称/编号'/>
      <Button type="primary" style={{marginLeft:16}}>搜索</Button>
    </div>)
  }
}
