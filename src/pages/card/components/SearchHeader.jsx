import React from 'react';

;
import styles from './style.less';
import {Button, Select, Input} from 'antd';
import {connect} from 'dva';

const {Option} = Select;

/**
 *WebStorm create by chenhong on 2020/3/25
 * 顶部搜索栏
 */
@connect(({cardList, constructionModel}) => ({
  data: cardList.data,
  currentSelectedMenu: constructionModel.currentSelectedMenu
}))
export default class SearchHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      status: ''
    }
  }


  getDatasByPage = () => {
    let typeCode = '';
    this.props.dispatch({
      type: 'cardList/nextPage',
      payload: {
        page: 1,

        content: this.state.content,
        status: this.state.status,
        typeCode: this.props.currentSelectedMenu ? this.props.currentSelectedMenu.dataCode : ''
      }
    })
  };

  onChange = (value) => {
    this.setState({
      status: value
    });
    console.log(`selected ${value}`);
  };

  onBlur = () => {
    console.log('blur');
  };

  onFocus = () => {
    console.log('focus');
  };

  onSearch = (val) => {
    this.getDatasByPage();
  };

  onEmpty = () => {
    this.setState({
      content: '',
      status: ''
    })
  };

  onInputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      content: e.target.value
    })
  };

  render() {
    return (<div className={styles.searchHeader}>
      <Input
        placeholder="输入姓名、手机号、工号、卡号"
        style={{width: 305}}
        value={this.state.content}
        onChange={this.onInputChange}
      />
      <a style={{marginLeft: 32}}>状态</a>
      <Select
        showSearch
        style={{width: 150, marginLeft: 24}}
        placeholder="请选择状态"
        optionFilterProp="children"
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="">全部</Option>
        <Option value="enable">启用</Option>
        <Option value="disable">禁用</Option>
      </Select>
      <div className={styles.buttonParent}>
        <Button type="primary" onClick={() => {
          this.onSearch(1)
        }}>搜索</Button>
        <Button type="primary" style={{marginLeft: 16}} onClick={() => {
          this.onEmpty()
        }}>清空</Button>
      </div>
    </div>)
  }
}
