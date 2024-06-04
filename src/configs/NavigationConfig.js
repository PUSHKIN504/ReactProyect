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
  SwitcherFilled,
  DeleteOutlined,
  CreditCardFilled,
  HeartFilled,
  HddFilled,
  DeleteFilled,
  SmileFilled,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  BookFilled,
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
    // {
    //   key: 'apps-axion',
    //   path: `${APP_PREFIX_PATH}/axion`,
    //   title: 'sidenav.apps.axion',
    //   icon: DeleteOutlined,
    //   breadcrumb: false,
    //   submenu: []
    // },
    // {
    //   key: 'apps-fetch',
    //   path: `${APP_PREFIX_PATH}/fetch`,
    //   title: 'sidenav.apps.fetch',
    //   icon: DeleteOutlined,
    //   breadcrumb: false,
    //   submenu: []
    // },
   
    {
      key: 'apps-tarea1',
      path: `${APP_PREFIX_PATH}/components/data-display`,
      title: 'sidenav.apps.tarea1',
      icon: BookFilled,
      breadcrumb: true,
      submenu: [
        {
          key: 'apss-tarea1-axion',
          path: `${APP_PREFIX_PATH}/axion`,
          title: 'sidenav.apps.tarea1.axion',
          icon: DeleteFilled,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apss-tarea1-fetch',
          path: `${APP_PREFIX_PATH}/fetch`,
          title: 'sidenav.apps.tarea1.fetch',
          icon: DeleteFilled,
          breadcrumb: true,
          submenu: []
        },
      ]
    },


    {
      key: 'apps-tarea2',
      path: `${APP_PREFIX_PATH}/components/data-display`,
      title: 'sidenav.apps.tarea2',
      icon: BookFilled,
      breadcrumb: true,
      submenu: [
        {
          key: 'apss-tarea2-EstadoCivil',
          path: `${APP_PREFIX_PATH}/EstadoCivil`,
          title: 'sidenav.apps.tarea2.EstadoCivil',
          icon: HeartFilled,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apss-tarea2-FormasPagos',
          path: `${APP_PREFIX_PATH}/FormaPago`,
          title: 'sidenav.apps.tarea2.FormasPagos',
          icon: CreditCardFilled,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apss-tarea2-SubCategorias',
          path: `${APP_PREFIX_PATH}/SubCategoria`,
          title: 'sidenav.apps.tarea2.SubCategorias',
          icon: SwitcherFilled,
          breadcrumb: true,
          submenu: []
        },
      ]
    },



    {
      key: 'apps-tarea3',
      path: `${APP_PREFIX_PATH}/components/data-display`,
      title: 'sidenav.apps.tarea3',
      icon: BookFilled,
      breadcrumb: true,
      submenu: [
        {
          key: 'apss-tarea3-PersonaNatura',
          path: `${APP_PREFIX_PATH}/PersonaNatural`,
          title: 'sidenav.apps.tarea3.PersonaNatural',
          icon: SmileFilled,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apss-tarea3-DucaInde',
          path: `${APP_PREFIX_PATH}/DucaIndex`,
          title: 'sidenav.apps.tarea3.DucaIndex',
          icon: HddFilled,
          breadcrumb: true,
          submenu: []
        },
        {
          key: 'apss-tarea3-DucaCreate',
          path: `${APP_PREFIX_PATH}/DucaCreate`,
          title: 'sidenav.apps.tarea3.DucaCreate',
          icon: HddFilled,
          breadcrumb: true,
          submenu: []
        },
      ]
    }

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
