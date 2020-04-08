import React from 'react';
import {Table, Row, Col} from 'antd';
import styles from './style.less';
import {connect} from 'dva';

/**
 *WebStorm create by chenhong on 2020/3/25
 *
 */
@connect(({cardList,}) => ({
  data: cardList.data,
  total: cardList.total,
  loading: cardList.loading,
  pages: cardList.pages,
  content: cardList.content,
  status: cardList.status,
  typeCode: cardList.typeCode,
  pageNum: cardList.pageNum
}))
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
        page: page,
        content: this.props.content,
        status: this.props.status,
        typeCode: this.props.typeCode
      }
    })
  };

  initColumns = () => {
    return [
      {
        title: '编号',
        dataIndex: 'id',
        fixed: 'left',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '工号',
        dataIndex: 'number',
        key: 'number',

      },
      {
        title: '卡号',
        dataIndex: 'cardNum',
        key: 'cardNum',

      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',

      }, {
        title: '余额',
        dataIndex: 'balance',
        key: 'status'
      }, {
        title: '部门',
        dataIndex: 'typeName',
        key: 'typeName'
      },
      {
        title: '操作',
        dataIndex: 'action',
        fixed: 'right',
        key: 'action',
        render: (text, record) => (
          <Row justify="space-between" gutter={8} className={styles.actions}>
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
    const {data, total, loading, pages, pageNum} = this.props;
    const pagination = {
      onChange: this.paginationChange,
      total: total,
      pages: pages,
      current: pageNum
    };
    return (<div style={{marginTop: 16}}>
      <Table columns={this.initColumns()} dataSource={data} scroll={{x: 800}} pagination={pagination}
             loading={loading}/>,
    </div>)
  }
}
