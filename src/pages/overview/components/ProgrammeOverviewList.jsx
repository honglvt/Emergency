import React from 'react';
import {Collapse, Form} from 'antd';
import ProgrammeOverviewPanelItem from "./ProgrammeOverviewPanelItem";
import {connect} from "dva";

const {Panel} = Collapse;

/**
 *WebStorm create by chenhong on 2020/4/10
 *
 */
@connect(({overviewModel}) => ({...overviewModel}))
export default class ProgrammeOverviewList extends React.Component {

  constructor(props) {
    super(props);
  }

  callback = (key) => {

  };
  genExtra = (content) => (
    <span style={{fontSize:12}}>{`${content.start}--${content.end}`}</span>
  );

  render() {
    const {data} = this.props;

    const Panels = data.map((item) => {
      return (
        <Panel header={item.name} style={{backgroundColor: '#cecece', marginTop: 32}} key={item.id} extra={this.genExtra(item.timeZone)}>
          <ProgrammeOverviewPanelItem initialValues={item}/>
        </Panel>
      )
    });

    return (
      <Collapse onChange={this.callback} expandIconPosition={'right'} style={{backgroundColor: 'white'}}
                bordered={false}>
        {Panels}
      </Collapse>)
  }
}
