import React from 'react';
import styles from './style.less';
import ModifyAccountFormList from "./components/ModifyAccountFormList";

/**
 *WebStorm create by chenhong on 2020/4/7
 *
 */
export default class ModifyAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      action: ''
    }
  }

  componentDidMount() {
    console.log('action', this.props.match.params.action);
    this.setState({
      action: this.props.match.params.action
    })
  }

  render() {
    return (
      <div className={styles.main}>
        <a className={styles.title}>{`账户管理 > ${this.state.action === 'add' ? '新增' : '修改'}子账户`}</a>
        <div style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-start', paddingTop: 32, marginTop: 16}}>
          <ModifyAccountFormList action={this.props.match.params.action}/>
        </div>
      </div>)
  }
}
