import React from 'react';
import styles from './style.less';
import {Button, Divider,BackTop} from 'antd';
import SearchHeader from "./components/SearchHeader";
import ProgrammeTable from "./components/ProgrammeTable";

export default class ProgrammeManagement extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  render() {

    return (
      <div className={styles.main}>

        <div className={styles.title}>
          方案管理
          <Button type="primary">新建方案</Button>
        </div>
        <div className={styles.list}>
          <SearchHeader/>
          <ProgrammeTable/>
        </div>
        <BackTop />
      </div>)
  }
}
