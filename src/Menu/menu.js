
import {
  Avatar,
  Reading,
  School,
  Collection,
  UserFilled,
  Edit,
} from '@element-plus/icons-vue'
import {
  classCom,
  colleageCom,
  majorCom,
  instructorCom,
  studentCom,
  festivalCom,
} from '../config'
const menus = [
  {
    menuIndex: '1',
    name: '学院管理',
    icon: School,
    component: colleageCom,
  },
  {
    menuIndex: '2',
    name: '班级管理',
    icon: Reading,
    component: classCom,
  },
  {
    menuIndex: '3',
    name: '专业管理',
    icon: Collection,
    component: majorCom,
  },
  {
    menuIndex: '4',
    name: '辅导员管理',
    icon: Avatar,
    component: instructorCom,
  },
  {
    menuIndex: '5',
    name: '学生管理',
    icon: UserFilled,
    component: studentCom,
  },
  {
    menuIndex: '6',
    name: '节假日管理',
    icon: Edit,
    component: festivalCom,
  }
];

export default menus;