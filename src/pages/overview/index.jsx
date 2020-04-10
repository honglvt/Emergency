import React from 'react'
import styles from './style.less'
import {connect} from "dva";
import Header from "./components/Header";
import ProgrammeOverviewList from "./components/ProgrammeOverviewList";

@connect(({overviewModel}) => ({...overviewModel}))

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'overviewModel/fetchOverviewData',
      payload:{}
    })
  }

  render() {

    return (
      <div className={styles.main}>
        <Header/>
        <div style={{padding:16}}>
          <ProgrammeOverviewList/>
        </div>
      </div>)
  }
}
