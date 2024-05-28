import { 
  DashboardOutlined, 
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  DeleteOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

const extraNavTree = [
  
  
]

const dashBoardNavTree = [

]

const appsNavTree = [{
  key: 'apps',
  path: `${APP_PREFIX_PATH}/apps`,
  title: '',
  icon: AppstoreOutlined,
  breadcrumb: false,
  isGroupTitle: true,
  submenu: [
    {
      key: 'apps-axion',
      path: `${APP_PREFIX_PATH}/axion`,
      title: 'sidenav.apps.axion',
      icon: DeleteOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'apps-fetch',
      path: `${APP_PREFIX_PATH}/fetch`,
      title: 'sidenav.apps.fetch',
      icon: DeleteOutlined,
      breadcrumb: false,
      submenu: []
    },
   
  
  ]
}]

const componentsNavTree = [
 
]

const docsNavTree = [
 ]

// export const protectedRoutes = [
//   {
//     key: 'app.axion',
//     path:`${APP_PREFIX_PATH}/axion`,
//     component: React.lazy(() => import ('Eliminado/axion'))
//   }
// ]

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
  ...componentsNavTree,
  ...extraNavTree,
  ...docsNavTree
]

export default navigationConfig;
