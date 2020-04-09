import {getCardList, getEmployeeConstructionTree} from "../service";

/**
 *WebStorm create by chenhong on 2020/3/25
 *
 */
function traverse(obj) {
  for (var a in obj) {
    if (typeof(obj[a]) == "object") {
      traverse(obj[a]); //递归遍历
    } else {
      console.log(a + "=" + obj[a]); //如果是值就显示
    }
  }
}

export default {
  namespace: 'constructionModel',
  state: {
    menuData: {
      children: [],
      dataName: '',
      dataCode: '',
      id: 0,
      pId: 0,
      isEnable: 'Y'
    },
    currentSelectedMenu: {}
  },
  reducers: {
    'newData'(state, {payload}) {
      return {
        ...state, ...payload
      }
    }
  },
  effects: {
    * getEmployeeConstructionTree({payload}, {call, put}) {
      const response = yield call(getEmployeeConstructionTree);
      if (payload) {

        const getAllMenus = (children) => {
          for (let i = 0; i < children.length; i++) {
            let deepChild = children[i].children;
            if (deepChild.length === 0) {
              if (children[i].id === payload.id) {
                children[i].showMoreAction = true;
              } else {
                children[i].showMoreAction = false
              }
            } else {
              getAllMenus(children[i].children)
            }
          }
        };
        getAllMenus(response.data.children);
      }
      if (response.code === 200) {
        yield put({
          type: 'newData',
          payload: {
            menuData: response.data
          }
        })
      }
    },
    * showSelectedItemMoreActionIcon({payload}, {call, put}) {
      yield put({
        type: 'newData',
        payload: {
          menuData: payload.menuData
        }
      })
    }

  }

}
