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
@connect(({cardList}) => ({data: cardList.data}))
export default class SearchHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (value) => {
    console.log(`selected ${value}`);
  };

  onBlur = () => {
    console.log('blur');
  };

  onFocus = () => {
    console.log('focus');
  };

  onSearch = (val) => {
    console.log('search:', val);
    this.props.dispatch({
      type: 'cardList/nextPage',
      payload: {
        page: val
      }
    })
  };

  onEmpty = () => {
    this.props.dispatch({
      type: 'cardList/newData',
      payload: {
        data:[],
        total:0
      }
    })
  };

  render() {
    return (<div className={styles.searchHeader}>
      <Input
        placeholder="输入姓名、手机号、工号、卡号"
        style={{width: 305}}
      />
      <a style={{marginLeft: 32}}>状态</a>
      <Select
        showSearch
        style={{width: 150, marginLeft: 24}}
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onSearch={this.onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
      <div className={styles.buttonParent}>
        <Button type="primary" onClick={()=>{this.onSearch(1)}}>搜索</Button>
        <Button type="primary" style={{marginLeft: 16}} onClick={()=>{this.onEmpty()}}>清空</Button>
      </div>
    </div>)
  }
}
