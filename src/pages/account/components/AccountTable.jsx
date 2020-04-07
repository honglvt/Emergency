import React from 'react';
import {connect} from 'dva';
import {Table, Checkbox, message, Modal, List} from 'antd';
import styles from './style.less'

const {confirm} = Modal;
/**
 *WebStorm create by chenhong on 2020/4/7
 *
 */


@connect(({accountListModel}) => ({
  data: accountListModel.data,
  total: accountListModel.total,
  pages: accountListModel.pages,
  loading: accountListModel.loading,
  currentPage: accountListModel.currentPage
}))
export default class CanteenTable extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.fetchCanteenList(1)
  }

  fetchCanteenList = (page) => {
    this.props.dispatch({
      type: 'accountListModel/nextPage',
      payload: {
        page: page
      }
    })
  };

  /**
   * 修改或者新增账户
   */
  jump2AddAccount = (record) => {
    const targetKeys = [];
    const ids = [];
    //遍历已选中餐厅列表 加入到数据源中
    record.canteenList.forEach((item, index) => {
      item.key = item.id;
      item.title = item.name;
      record.unSelectedList.push(item);
      targetKeys.push(item.key);
      ids.push(parseInt(item.key));
    });
    //遍历数据源
    record.unSelectedList.forEach((item, index) => {
      item.key = item.id;
      item.title = item.name;
    });
    this.props.dispatch({
      type: 'accountManageModel/jump2AddAccount',
      payload: {
        id: record.id,
        ids: ids,
        name: record.name,
        note: record.note,
        userName: record.userName,
        targetKeys: targetKeys,
        sourceKeys: record.unSelectedList,
        action:'update'
      }
    })
  };

  /**
   * 禁用账户
   */
  disableAccount = (id) => {
    this.props.dispatch({
      type: 'accountListModel/disableAccount',
      payload: {
        id: id
      }
    }).then(() => {
      this.fetchCanteenList(this.props.currentPage)
    })
  };


  /**
   * 删除账户
   */
  removeAccount = (id) => {
    this.props.dispatch({
      type: 'accountListModel/removeAccount',
      payload: {
        id: id
      }
    }).then(() => {
      this.fetchCanteenList(this.props.currentPage)
    })
  };
  /**
   * 下线
   * @param id
   */
  showConfirm = (remove, id) => {
    confirm({
      title: '温馨提示',
      content: `确定${remove ? '删除' : '禁用'}该账号？`,
      onOk: () => {
        if (remove) {
          this.removeAccount(id)
        } else {
          this.disableAccount(id);
        }
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

  modify = (record) => {
    console.log(record);
  };

  /**
   * 表头 标题
   * @returns {*[]}
   */
  initColumns = () => {

    return [
      {
        title: '账号名称',
        dataIndex: 'name',
        key: 'age',
        fixed: 'left'
      },
      {
        title: '管理餐厅',
        dataIndex: 'canteenList',
        key: '1',
        render: (text, record) => (
          <span style={{whiteSpace: 'pre'}}>{record.canteenListString}</span>
        )
      },
      {
        title: '状态',
        dataIndex: 'isEnable',
        key: '2',
        render: (text, record) => (
          <a style={{color: this.getStatusColor(record.isEnable)}}>{record.isEnable === 'Y' ? '已上线' : '已下线'}</a>
        )
      },
      {
        title: '账号说明',
        dataIndex: 'note',
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
              this.jump2AddAccount(record)
            }}>修改</a>
            <a style={{marginRight: 16}} onClick={() => {
              this.showConfirm(true, record.id)
            }}>删除</a>
            <a onClick={() => {
              this.showConfirm(false, record.id)
            }}>禁用</a>
          </div>
        ),
      }
    ]
  };

  onPageChange = (page) => {
    this.props.dispatch({
      type: 'accountListModel/currentPage',
      payload: {
        currentPage: page
      }
    });
    this.fetchCanteenList(page);
  };

  render() {
    const {data, total, pages, loading} = this.props;
    return (<div className={styles.canteenList}>
      <Table pagination={{total: total, pages: pages, pageSize: 10, onChange: this.onPageChange}}
             columns={this.initColumns()}
             dataSource={data}
             loading={loading}
             scroll={{x: 1500}}/>,
    </div>)
  }
}
