import React from 'react';
import styles from './style.less';
import {Menu} from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
export default class Thumb extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
    this.state = {
      current: 'list',
    }
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {

    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="list">
          菜品列表
        </Menu.Item>
        <Menu.Item key="type">
          菜品分类
        </Menu.Item>
        <Menu.Item key="origin">
          菜品原料
        </Menu.Item>
      </Menu>

    );
  }
}
