import React from 'react';
import {Table, Row, Col} from 'antd';
import styles from './style.less';
import {connect} from 'dva';

/**
 *WebStorm create by chenhong on 2020/3/25
 *
 */
@connect(({cardList}) => ({data: cardList.data, total: cardList.total, loading: cardList.loading}))
export default class CardTables extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.total)
  }

  componentWillMount() {
    this.getDatasByPage(1);
  }

  getDatasByPage = (page) => {
    this.props.dispatch({
      type: 'cardList/nextPage',
      payload: {
        page: page
      }
    })
  };

  initColumns = () => {
    return [
      {
        title: '编号',
        dataIndex: 'index',
        fixed: 'left',
      },
      {
        title: '姓名',
        dataIndex: 'name',

      },
      {
        title: '手机号',
        dataIndex: 'phone',

        render: (text, record) => (
          <a style={{color: 'red'}}>{record.phone}</a>
        )
      },
      {
        title: '工号',
        dataIndex: 'memberNum',

      },
      {
        title: '卡号',
        dataIndex: 'cardNum',
        key: 'cardNum',

      }, {
        title: '状态',
        dataIndex: 'status',

      }, {
        title: '余额',
        dataIndex: 'money',

      }, {
        title: '部门',
        dataIndex: 'bu',
      },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        render: (text, record) => (
          <Row justify="space-between" gutter={8}>
            <Col><a>停用</a></Col>
            <Col><a>充值</a></Col>
            <Col><a>编辑</a></Col>
            <Col><a>详情</a></Col>
            <Col><a>充值记录</a></Col>
          </Row>
        ),
      }
    ]
  };

  paginationChange = (pageNum) => {
    console.log('paginationChange' + pageNum);
    this.getDatasByPage(pageNum);
  };


  render() {
    const {data, total, loading} = this.props;
    const pagination = {
      onChange: this.paginationChange,
      total: total,
      pageSize: 10,
    };
    return (<div style={{marginTop: 16}}>
      <Table columns={this.initColumns()} dataSource={data} scroll={{x: 800}} pagination={pagination}
             loading={loading}/>,
    </div>)
  }
}
