import React from 'react';
import styles from '../style.less'
import {Row, Card, Col} from "antd";
import {connect} from 'dva';

/**
 *WebStorm create by chenhong on 2020/4/10
 *
 */

@connect(({overviewModel}) => ({...overviewModel}))
export default class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {devices, currentProgrammeCount, laterProgrammeCount} = {...this.props};
    return (<div className={styles.siteCardWrapper}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="当前执行方案" bordered={false} hoverable={true}>
            {devices}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="当前执行设备" bordered={false} hoverable={true}>
            {currentProgrammeCount}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="累计执行方案" bordered={false} hoverable={true}>
            {laterProgrammeCount}
          </Card>
        </Col>
      </Row>
    </div>)
  }
}
