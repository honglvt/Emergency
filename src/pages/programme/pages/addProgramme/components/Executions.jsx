import React from 'react';
import {Button, Checkbox} from "antd";
import styles from './style.less'

/**
 *WebStorm create by chenhong on 2020/4/15
 *
 */
export default class Executions extends React.Component {

  constructor(props) {
    super(props);
    this.value = this.props.value;
    this.onChange = this.props.onChange;

  }

  triggerChange = changedValue => {
    if (this.onChange) {
      this.onChange(
        [...changedValue]
      );
    }
  };

  /**
   * 每项方案选择时改变状态
   * @param value
   */
  checkedChange = value => {
    console.log(value);
    const newValue = [];
    this.props.value.forEach((item) => {
      if (item.type === value.target.id) {
        item.enable = value.target.checked
      }
      newValue.push(item);
    });
    console.log('value', this.props.value);
    this.triggerChange(newValue);
  };

  /**
   * 标题颜色
   * @returns {*}
   */
  setColorByType = type => {
    switch (type) {
      case 0:
        return 'green';
      case 1:
        return '';
      case 2:
        return '';
      case 3:
        return '';
      case 4:
        return '';
      case 5:
        return '';
      case 6:
        return '';
    }
  };

  render() {
    const datas = this.props.value || [];
    console.log('this.props.value', this.props.value);
    const checkItems = datas.map((item, index) => {
      return <div className={styles.executionsParent}>
        <div style={{flex: 3, width: 0}}>
          <Checkbox id={item.type} onChange={this.checkedChange}><span
            className={styles.name} style={{backgroundColor:item.type}}>{item.typeName}</span></Checkbox>
        </div>
        <div className={styles.actions}>
          <Button>指定设备</Button>
          <Button>方案设置</Button>
          <a>已关联{item.devicesNum}台设备</a>
          <a>方案设置 {item.caseType.typeName}</a>
        </div>
      </div>
    });

    return (<Checkbox.Group style={{width: '100%'}}>
      {checkItems}
    </Checkbox.Group>)
  }
}
