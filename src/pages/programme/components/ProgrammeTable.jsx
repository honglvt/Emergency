import React from 'react';
import {connect} from 'dva';
import {Table, Checkbox, message, Modal, Tag} from 'antd';
import styles from './style.less'

const {confirm} = Modal;
/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */

@connect(({programmeListModel}) => ({
  ...programmeListModel
}))
export default class ProgrammeTable extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.fetchCanteenList(1)
  }

  fetchCanteenList = (page) => {
    this.props.dispatch({
      type: 'programmeListModel/nextPage',
      payload: {
        page: page
      }
    })
  };


  /**
   * 下线
   * @param id
   */
  showConfirm = (title, id) => {
    confirm({
      title: '温馨提示',
      content: `是否确定${title}`,
      onOk: () => {
        message.success(`${title}成功`)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  /**
   * 根据餐厅状态展示不同颜色
   * @param status 餐厅状态
   * @returns {string} 颜色 16进制
   */
  getStatusColor = (isAvailable) => {
    return isAvailable === 'Y' ? '#3296FA' : '#FA8C16'
  };
  /**
   * 表头 标题
   * @returns {*[]}
   */
  initColumns = () => {
    const moreActions = [
      {
        key: 'pause',
        value: '暂停'
      },
      {
        key: 'stop',
        value: '停止'
      },
      {
        key: 'delete',
        value: '删除'
      }
    ];

    const actions = () => {
      return moreActions.map((item) => {
        return <a onClick={() => {
          this.showConfirm(item.value, item.key)
        }}>{item.value}</a>
      })
    };

    const types = (tags) => {
      return tags.map((item) => {
        return <Tag
          color={item.indexOf('出入') !== -1 ? 'magenta' : item.indexOf('车流') !== -1 ? 'gold' : item.indexOf('行为') !== -1 ? 'red' : '#f50'}>{item}</Tag>
      })
    };
    return [
      {
        title: '方案简介',
        dataIndex: 'details',
        key: 'details',
        render: (text, record) => (
          <div className={styles.summery}>
            <a>{record.name}</a>
            <div>
              <a>{`方案编号: ${record.id}`}</a>
              <span style={{marginLeft: 32}}>{`执行时间: ${record.timeZone.start}    至    ${record.timeZone.end}`}</span>
              <a style={{marginLeft: 32,}}>{`执行单位: ${record.unit}`}</a>
            </div>
            <div>
              <a>{`方案类型:`} {types(record.type)}
              </a>
              <a style={{marginLeft: 32}}>{`执行设备数量: ${record.devices}`}</a>
            </div>
          </div>
        )
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        fixed: 'right',
        width: 200
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 200,
        fixed: 'right',
        render: (text, record) => (
          <div className={styles.action}>
            <a>查看</a>
            {actions()}
            <a>修改</a>
          </div>
        ),
      }
    ]
  };

  onPageChange = (page) => {
    this.props.dispatch({
      type: 'programmeListModel/currentPage',
      payload: {
        currentPage: page
      }
    });
    this.fetchCanteenList(page);
  };

  render() {
    const {data, total, pages, loading} = this.props;
    return (<div className={styles.programmeTable}>
      <Table pagination={{total: total, pages: pages, showSizeChanger: false, onChange: this.onPageChange}}
             columns={this.initColumns()}
             dataSource={data}
             loading={loading}
             scroll={{x: 1500}}/>,
    </div>)
  }
}
