import React from 'react';
import styles from './style.less';

export default class Thumb extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  render() {

    return (
      <div className={styles.main}>
        订单管理
      </div>)
  }
}
