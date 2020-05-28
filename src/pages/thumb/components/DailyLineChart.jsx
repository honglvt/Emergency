import React from 'react';
import styles from '../style.less';

let echarts = require('echarts');

/**
 *WebStorm create by chenhong on 2020/5/27
 *
 */
export default class DailyLineChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let dailyChart = echarts.init(document.getElementById('daily-chart'));
    let x = [];
    for (let i = 0; i <= 24; i++) {
      x.push(i);
    }

    /**
     * 下单数据
     * @type {Array}
     */
    let orderDatas = [];
    for (let i = 0; i <= 24; i++) {

      let randomInt = Math.floor(Math.random() * (1000));
      orderDatas.push(
        {
          value: randomInt,
          emphasis: {
            label: {
              color: 'black',
              show: true,
              // 高亮时标签的文字。
              formatter: `${randomInt}人`
            }
          },
        }
      )
    }

    /**
     * 取走的数据
     * @type {Array}
     */
    let getDatas = [];
    for (let i = 0; i <= 24; i++) {

      let randomInt = Math.floor(Math.random() * (1000));
      getDatas.push(
        {
          value: randomInt,
          emphasis: {
            label: {
              color: 'black',
              show: true,
              // 高亮时标签的文字。
              formatter: `${randomInt}人`
            }
          },
        }
      )
    }

    /**
     * 折线图
     */
    dailyChart.setOption({
      legend:{
        data:['预定','取餐']
      },
      grid: {
        left: 50,
      },
      xAxis: {
        boundaryGap: false,
        type: 'category',
        data: x,
      },
      yAxis: {},
      series: [{
        // 普通样式。
        itemStyle: {
          // 点的颜色。
          color: '#5F6BFF'
        },
        name: '预定',
        type: 'line',
        data: orderDatas
      },
        {
          itemStyle: {
            // 点的颜色。
            color: '#60CCF5'
          },
          name: '取餐',
          type: 'line',
          data: getDatas
        }
      ]
    })
  }

  render() {
    return (
      <div className={styles.chartParent}>
        <div style={{color:'#333333',fontSize:'20px',fontWeight:'bold'}}>预定取餐曲线图</div>
        <div id='daily-chart' style={{width: '100%', height: '350px'}}>
        </div>
      </div>
    )
  }
}
