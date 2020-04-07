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
@connect(({constructionModel}) => ({}))
export default class Construction extends React.Component {

  constructor(props) {
    super(props);
  }


  bus = [
    {
      key: '部门一',
      child: [
        {
          key: '子部门1.1'
        },
        {
          key: '子部门1.2'
        }
        ,
        {
          key: '子部门1.2',
          child: [
            {
              key: '子部门1.2.1',
            }
          ]
        }
      ]
    },
    {
      key: '部门二',
      child: [
        {
          key: '子部门2.1'
        },
        {
          key: '子部门2.2'
        }
        ,
        {
          key: '子部门2.2',
          child: [
            {
              key: '子部门2.2.1',
            }, {
              key: '子部门2.2.2',
            }, {
              key: '子部门2.2.3',
            }, {
              key: '子部门2.2.4',
            },
          ]
        }
      ]
    },
  ];

  /**
   * 创建菜单
   * @type {function(*=): Array}
   */
  createMenu = ((menuData) => {  //创建菜单
    //let itemIndex = 0; //累计的每一项索引
    let submenuIndex = 0; //累计的每一项展开菜单索引
    let menu = [];
    const create = (menuData, el) => {
      for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].child) {  //如果有子级菜单
          let children = [];
          create(menuData[i].child, children);
          submenuIndex++;
          el.push(
            <SubMenu
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
    create(menuData, menu);
    return menu;
  });

  /**
   * 组织结构里的搜索框
   * @param text
   */
  search = (text) => {
    console.log(text);
  };
  text = <span>Title</span>;
  content = (
    <div>
      <p>添加子部门</p>
      <p>修改名称</p>
      <p>删除</p>
      <p>上移</p>
    </div>
  );

  constructionItem = (child) => {
    return (
      <Menu.Item key={child.id}>
        <Link>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {child.dataName}
            <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
              <Popover placement="bottomRight" content={this.content} trigger="click">
                <IconFont type="icon-gengduo"/>
              </Popover>
            </div>
          </div>
        </Link>
      </Menu.Item>)
  };

  handleClick = (item) => {
    console.log(item)
  };

  onSelect = (item) => {
    console.log("onSelect:" + item)
  };

  componentWillMount() {
    this.props.dispatch({
      type: 'constructionModel/getEmployeeList'
    })
  }

  render() {
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
      <a style={{color: '#333', marginTop: 16}}>全部</a>
      <Menu
        onClick={this.handleClick}
        style={{width: 256}}
        onSelect={this.onSelect}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Navigation One</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Item 1">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Item 2">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <span>Navigation Two</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">
              Option 8
            </Menu.Item>
            {this.constructionItem('13', 'Option13')}

          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <span>Navigation Three</span>
            </span>
          }
        >
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>)
  }
}
