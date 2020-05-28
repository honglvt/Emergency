import React from 'react';
import styles from '../style.less';
import {DatePicker} from 'antd';
import moment from 'moment';
import {getNowDate} from '../../../utils/DateUtil';
import echarts from 'echarts';
import {Progress} from 'antd';

const {RangePicker} = DatePicker;

const dateFormat = 'YYYY-MM-DD';
/**
 *WebStorm create by chenhong on 2020/5/28
 *
 */
export default class ReservePieChart extends React.Component {

  constructor(props) {
    super(props);
    this.today = getNowDate();

  }

  componentDidMount() {
    this.initReservePieChart();
  }

  render() {
    return (<div className={styles.reserveParent}>
      <div className={styles.selector}>
        <div className={styles.date} style={{marginLeft: 0}}>
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
      <div className={styles.pieChartParent}>
        <div className={styles.child}>
          <span style={{fontSize: '18px', fontWeight: 'bold'}}>菜品销量排行</span>
          <div id='reservePieChart' style={{width: '100%', height: '300px'}}>
          </div>
        </div>
        <div style={{
          width: '1px',
          marginLeft: '100px',
          marginRight: '100px',
          backgroundColor: '#eeeeee',
          marginTop: '20px',
          marginBottom: '20px'
        }}>

        </div>
        <div className={styles.child}>
          <div id='rankingRectChart' className={styles.ranking}>
            <span style={{fontSize: '18px', fontWeight: 'bold'}}>菜品销量排行</span>
            {this.initRankingChart()}
          </div>
        </div>
      </div>
    </div>)
  }

  initReservePieChart = () => {
    this.reservePieChart = echarts.init(document.getElementById('reservePieChart'));
    this.reservePieChart.setOption({
      animationThreshold:true,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      grid: {
        left: 0
      },
      legend: {
        itemGap: 24,
        x: 'right',
        y: 'center',
        orient: 'vertical',
        data: ['熟食', '净菜', '糕点', '其他']
      },
      series: [
        {
          name: '预定占比',
          type: 'pie',
          radius: '55%',
          data: [
            {value: 100, name: '熟食'},
            {value: 200, name: '净菜'},
            {value: 300, name: '糕点'},
            {value: 400, name: '其他'},
          ]
        },
      ],
      color: ['#81A8FF', '#C594FF', '#60CCF5', '#67EFF7'],
    })
  };

  initRankingChart = () => {
    let datas = [
      {
        name: '辣子鸡丁',
        value: 90,
      },
      {
        name: '叫花鸡',
        value: 80,
      },
      {
        name: '红烧肉',
        value: 70,
      },
      {
        name: '牛腩',
        value: 60,
      },
      {
        name: '蒸蛋',
        value: 50,
      },
    ];
    return datas.map((item, index) => {
      function cacuProgressColor(index) {
        switch (index) {
          case 0:
            return '#5F6BFF';
          case 1:
            return '#88ADFF';
          case 2:
            return '#60CCF5';
          case 3:
            return '#67EFF7';
          case 4:
            return '#C594FF';
        }
      }

      return <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{flex: 1}}>{item.name}</span>
        <Progress percent={item.value} style={{flex: 8}} strokeColor={cacuProgressColor(index)}/>
      </div>
    })
  }

}
