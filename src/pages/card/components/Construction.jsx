import React from 'react';
import styles from './style.less'
import {Input, Menu, Popover} from 'antd'
import IconFont from '../../../components/Icon/IconFont'
import {connect} from 'dva';
import {Link} from "umi";

const {Search} = Input;
const {SubMenu} = Menu;

/**
 *WebStorm create by chenhong on 2020/3/25
 *  左侧导航栏-组织结构
 */
@connect(({constructionModel, cardList, addChildEmployeeModel}) => ({
  menuData: constructionModel.menuData,
  currentSelectedMenu: constructionModel.currentSelectedMenu,
  content: cardList.content,
  status: cardList.status,
  typeCode: cardList.typeCode
}))
export default class Construction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moreActionsVisible: false,
      currentSelectedItem: {},
      openKeys: [],
      preOpenKeys: [],
    }
  }

  /**
   * 创建菜单
   * @type {function(*=): Array}
   */
  createMenu = (menuData) => {
    //创建菜单
    //let itemIndex = 0; //累计的每一项索引
    let submenuIndex = 0; //累计的每一项展开菜单索引
    let menu = [];
    const create = (menuData, el) => {
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].children.length > 0) {  //如果有子级菜单
          let children = [];
          create(menuData[i].children, children);
          submenuIndex++;
          el.push(
            <SubMenu
              // onTitleClick={this.subMenuClick}
              key={menuData[i].id}
              title={
                <span>{menuData[i].dataName}</span>
              }
            >
              {children}
            </SubMenu>
          )
        } else {   //如果没有子级菜单
          //itemIndex++;
          el.push(
            this.constructionItem(menuData[i])
          )
        }
      }
    };
    create(menuData.children, menu);
    return menu;
  };

  /**
   * 组织结构里的搜索框
   * @param text
   */
  search = (text) => {
  };

  /**
   *弹出部门信息框
   */
  showEmpeloyeeModal = (add) => {

    this.props.dispatch({
      type: 'addChildEmployeeModel/newData',
      payload: {
        visible: true,
        add: add,
        pId: this.props.currentSelectedMenu.pId,
        id: this.props.currentSelectedMenu.id,
        dataCode: add ? '' : this.props.currentSelectedMenu.dataCode,
        dataName: add ? '' : this.props.currentSelectedMenu.dataName,
        enable: true,
        loading: false,
        title: add ? '添加子部门' : this.props.currentSelectedMenu.dataName
      }
    });
    this.hide();
  };

  text = <span>Title</span>;
  content = () => {
    return (
      <div>
        <div onClick={() => {
          this.showEmpeloyeeModal(true)
        }}>添加子部门
        </div>
        <div onClick={() => {
          this.showEmpeloyeeModal(false)
        }}>查看
        </div>
      </div>
    );
  };
  /**
   * 最底层的菜单 Menu-Item
   * @param child
   * @returns {*}
   */
  handleVisibleChange = moreActionsVisible => {
    this.setState({moreActionsVisible: moreActionsVisible});
  };
  hide = () => {
    this.setState({moreActionsVisible: false});
  };
  constructionItem = (child) => {
    return (
      <Menu.Item key={child.id}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          {child.dataName}
          {child.showMoreAction ? <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            <Popover visible={this.state.moreActionsVisible}
                     onVisibleChange={this.handleVisibleChange}
                     placement="bottomRight"
                     content={this.content()}
                     trigger="click">
              <IconFont type="icon-gengduo"/>
            </Popover>
          </div> : <div/>}
        </div>
      </Menu.Item>)
  };

  /**
   * 子菜单选中后出现更多功能按钮
   * @param item
   */
  showSelectedItemMoreAction = (selectedItem) => {
    //解构
    let children = {...this.props.menuData};
    //遍历所有item 找出选中的那个，改变 showMoreAction状态
    const getAllMenus = (children) => {
      for (let i = 0; i < children.length; i++) {
        let deepChild = children[i].children;
        if (deepChild.length === 0) {
          if (children[i].id === selectedItem.key) {
            children[i].showMoreAction = true;
            this.setCurrentSelectedMenu(children[i]);
          } else {
            children[i].showMoreAction = false;
          }
        } else {
          getAllMenus(children[i].children)
        }
      }
    };

    console.log('getAllMenus', getAllMenus(children.children));
    //重新渲染
    this.props.dispatch({
      type: 'constructionModel/showSelectedItemMoreActionIcon',
      payload: {
        menuData: children
      }
    });
  };

  /**
   * 设置当前选中的menu
   * @param item
   */
  setCurrentSelectedMenu = (item) => {
    this.props.dispatch({
      type: 'constructionModel/newData',
      payload: {
        currentSelectedMenu: item
      }
    });
    if (item.dataCode) {
      this.searchCardListByTypeCode(item.dataCode)
    }
  };

  /**
   * 选中menu后立即搜索数据
   * @param typeCode
   */
  searchCardListByTypeCode = (typeCode) => {
    this.props.dispatch({
      type: 'cardList/nextPage',
      payload: {
        page: 1,
        typeCode: typeCode
      }
    });
  };

  /**
   * menu item的点击事件
   * @param item
   */
  handleClick = (item) => {
  };

  /**
   * 选中menu item
   * @param item
   */
  onSelect = (item) => {
    console.log('onSelect', item);
    this.showSelectedItemMoreAction(item);
  };

  /**
   * subMenu展开时 搜索
   * @param key
   * @param e
   */
  subMenuClick = (event) => {
    console.log('subMenuClick', event);
    const findItem = (children) => {
      children.forEach((item) => {
        if (item.id === event.key) {
          console.log('find the item', item);
          this.searchCardListByTypeCode(item.dataCode);
        } else if (item.children.length >= 0) {
          findItem(item.children)
        }
      })
    };

    findItem(this.props.menuData.children);
  };

  /**
   * submenu展开或者关闭
   * @param openKeys
   */
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys: openKeys
    }, () => {

      if (openKeys.length > this.state.preOpenKeys.length || this.state.preOpenKeys.length === 0) {
        console.log('open');
        this.subMenuClick({key: openKeys[openKeys.length - 1]});
      } else {
        console.log('close')
      }
      this.setState({
        preOpenKeys: this.state.openKeys
      })
    });
    console.log('openkeys', openKeys);
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'constructionModel/getEmployeeConstructionTree'
    })
  }

  render() {
    const {menuData, currentSelectedMenu} = this.props;
    return (<div className={styles.construct}>
      <div style={{width: 'max-content'}}>
        <span className={styles.title}>组织结构</span>
        <div style={{border: '1px solid #3296FA', borderRadius: 4}}/>
      </div>
      <div style={{marginTop: 20}}>
        <Search
          placeholder="搜索用户"
          onSearch={value => this.search(value)}
          style={{}}
        />
      </div>
      <a style={{color: '#333', marginTop: 16}}>{menuData.dataName}</a>
      <Menu
        selectedKeys={[currentSelectedMenu.id]}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
        style={{width: 256}}
        onSelect={this.onSelect}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {this.createMenu(menuData)}
      </Menu>
    </div>)
  }
}
