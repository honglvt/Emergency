import React from 'react';
import {connect} from 'dva';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const GlobalHeaderRight = props => {
  const {theme, layout} = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <div style={{marginRight: 16}}>
        <Avatar/>
      </div>
    </div>
  );
};

export default connect(({settings}) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
