import React from 'react';
import styles from '../style.less';
import {DatePicker} from 'antd';
import moment from 'moment';
import {getNowDate} from '../../../utils/DateUtil';

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';
/**
 *WebStorm create by chenhong on 2020/5/27
 *
 */
export default class ThumbTitle extends React.Component {

  constructor(props) {
    super(props);
    this.today = getNowDate();
  }

  render() {
    return (<div className={styles.thumbTitle}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span className={styles.title}>统计概览</span>
        <div className={styles.date}>
          <span style={{marginRight: '16px'}}>按天统计</span>
          <DatePicker defaultValue={moment(this.today, dateFormat)} format={dateFormat} onChange={this.dateOnChange}/>
        </div>
        <div className={styles.date}>
          <span style={{marginRight: '16px'}}>按天时间段统计（一个月内）</span>
          <RangePicker
            onChange={this.dateOnChange}
            defaultValue={[moment(this.today, dateFormat), moment(this.today, dateFormat)]}
            format={dateFormat}
          />
        </div>
      </div>
      <div className={styles.thumbInfo}>
        <div>
          {this.today}预定人数/人
          <div className={styles.count}>
            28
          </div>
        </div>
        <div>
          {this.today}收入金额/元
          <div className={styles.count}>
            2388
          </div>
        </div>
        <div>
          {this.today}预定餐数/单
          <div className={styles.count}>
            131
          </div>
        </div>
        <div>
          {this.today}菜品消耗/份
          <div className={styles.count}>
            1234
          </div>
        </div>
      </div>
    </div>)
  }


  dateOnChange = (date, dateString) => {
    console.log(dateString, date);
  };
  fetchDatas = (time) => {

  }
}
