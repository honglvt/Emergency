import React from 'react';
import styles from './style.less';
import ThumbTitle from "./components/ThumbTitle";
import DailyLineChart from "./components/DailyLineChart";

export default class Thumb extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  render() {

    return (
      <div className={styles.main}>
        <ThumbTitle/>
        <DailyLineChart/>
      </div>)
  }
}
