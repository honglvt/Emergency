import React from 'react';
import {connect} from 'dva';
import {Table, Checkbox, message, Modal} from 'antd';
import styles from './style.less'

const {confirm} = Modal;
/**
 *WebStorm create by chenhong on 2020/3/24
 *
 */
import {getAuthority} from '../../../utils/authority';


@connect(({canteenListModel}, {modifyModal}) => ({
  data: canteenListModel.data,
  total: canteenListModel.total,
  pages: canteenListModel.pages,
  loading: canteenListModel.loading,
  currentPage: canteenListModel.currentPage
}))
export default class CanteenTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    }
  }

  componentWillMount() {
    this.fetchCanteenList(1)
  }

  fetchCanteenList = (page) => {
    this.props.dispatch({
      type: 'canteenListModel/nextPage',
      payload: {
        page: page
      }
    })
  };

  /**
   * 根据id下线
   */
  updateCanteenStatus2UnVailable(id) {
    this.props.dispatch({
      type: 'modifyModal/confirm',
      payload: {
        online: false,
        id: id
      }
    }).then(() => {
      this.props.dispatch({
        type: 'canteenListModel/nextPage',
        payload: {
          page: this.props.currentPage
        }
      })
    });
  };

  /**
   * 下线
   * @param id
   */
  showConfirm = (id) => {
    confirm({
      title: '温馨提示',
      content: '上线后餐厅将在前台展示，你可手动操作下线',
      onOk: () => {
        this.updateCanteenStatus2UnVailable(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  /**
   * 列表选择变化
   * @param selectedRowKeys，被选中的item的key
   */
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({selectedRowKeys});
  };

  /**
   * 根据餐厅状态展示不同颜色
   * @param status 餐厅状态
   * @returns {string} 颜色 16进制
   */
  getStatusColor = (isAvailable) => {
    return isAvailable === 'Y' ? '#3296FA' : '#FA8C16'
  };

  modify = (record) => {
    console.log(record);
    this.props.dispatch({
      type: 'modifyModal/show',
      payload: {
        id: record.id,
        title: '修改餐厅',
        show: true,
        name: record.name,
        online: record.isAvailable === 'Y'
      }
    })
  };
  hasPermission = () => {
    console.log('getAuthority' + getAuthority());
    console.log(typeof getAuthority());
    console.log(getAuthority().toString());
    return getAuthority().toString() === 'admin';
  };
  /**
   * 表头 标题
   * @returns {*[]}
   */
  initColumns = () => {

    return [
      {
        title: '序号',
        dataIndex: 'id',
        key: '0',
        fixed: 'left'
      },
      {
        title: '餐厅名称',
        dataIndex: 'name',
        key: '1',
      },
      {
        title: '状态',
        dataIndex: 'isAvailable',
        key: '2',
        render: (text, record) => (
          <a style={{color: this.getStatusColor(record.isAvailable)}}>{record.isAvailable === 'Y' ? '已上线' : '已下线'}</a>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: '3',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: '4',
        fixed: 'right',
        render: (text, record) => (
          <div className={styles.action}>
            <a style={{marginRight: 16}} onClick={() => {
              this.hasPermission() ? message.success('1') : message.error('2')
            }}>进入餐厅</a>
            <a style={{marginRight: 16}} onClick={() => this.modify(record)}>修改</a>
            <a onClick={() => {
              this.showConfirm(record.id)
            }}>下线</a>
          </div>
        ),
      }
    ]
  };

  onPageChange = (page) => {
    this.props.dispatch({
      type: 'canteenListModel/currentPage',
      payload: {
        currentPage: page
      }
    });
    this.fetchCanteenList(page);
  };

  render() {
    const {data, total, pages, loading} = this.props;
    return (<div className={styles.canteenList}>
      <Table pagination={{total: total, pages: pages, showSizeChanger: false, onChange: this.onPageChange}}
             columns={this.initColumns()}
             dataSource={data}
             loading={loading}
             scroll={{x: 1500}}/>,
    </div>)
  }
}
