import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'user',
    icon: 'fal fa-user',
    label: 'Quản lý người dùng',
    items: [
      {
        routeLink: 'user/list',
        label: 'Danh sách tài khoản',
      },
      {
        routeLink: 'user/role',
        label: 'Phân quyền',
      }
    ],
  },
  {
    routeLink: 'products',
    icon: 'fal fa-box-open',
    label: 'Sản phẩm',
    items: [
      {
        routeLink: 'products/create',
        label: 'Tạo sản phẩm',
      },
      {
        routeLink: 'products/list',
        label: 'Danh sách sản phẩm',
      },
    ],
  },
  {
    routeLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'Doanh Thu',
  },
  {
    routeLink: 'coupens',
    icon: 'fal fa-tags',
    label: 'Đơn Hàng',
    items: [
      {
        routeLink: 'order/list',
        label: 'Đơn hàng chờ duyệt',
      },
      {
        routeLink: 'order/custom',
        label: 'Danh sách đơn hàng',
      },

    ],
  },

 
];
