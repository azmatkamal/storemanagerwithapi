import React from "react";

const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
const Brandslist = React.lazy(() => import("./views/brand/index"));
const ServicesList = React.lazy(() => import("./views/service/index"));
const PermissionList = React.lazy(() => import("./views/permissions/index"));
const Categorylist = React.lazy(() => import("./views/category/index"));
const PageList = React.lazy(() => import("./views/page/index"));
const ColorList = React.lazy(() => import("./views/color/index"));
const CompanyList = React.lazy(() => import("./views/company/index"));
const ProductList = React.lazy(() => import("./views/product/index"));
const NewsList = React.lazy(() => import("./views/news/index"));
const AdsList = React.lazy(() => import("./views/main_ads/index"));

const routes = [
  { path: "/", exact: true, name: "Dashboard" },
  {
    path: "/users",
    exact: true,
    name: "Manage Users",
    component: UsersList,
  },
  {
    path: "/locations",
    exact: true,
    name: "Manage Locations",
    component: CountryList,
  },
  {
    path: "/brands",
    exact: true,
    name: "Brands",
    component: Brandslist,
  },
  {
    path: "/categories",
    exact: true,
    name: "Categories",
    component: Categorylist,
  },
  {
    path: "/services",
    exact: true,
    name: "Services",
    component: ServicesList,
  },
  {
    path: "/permissions",
    exact: true,
    name: "Manage Permissions",
    component: PermissionList,
  },
  {
    path: "/page",
    exact: true,
    name: "Page",
    component: PageList,
  },
  {
    path: "/colors",
    exact: true,
    name: "Colors",
    component: ColorList,
  },
  {
    path: "/product",
    exact: true,
    name: "Manage Products",
    component: ProductList,
  },
  {
    name: "Manage News & Media",
    path: "/news",
    exact: true,
    component: NewsList,
  },
  {
    path: "/ads",
    exact: true,
    name: "Manage Ads",
    component: AdsList,
  },
  {
    path: "/company",
    exact: true,
    name: "Manage Company",
    component: CompanyList,
  },
];

export default routes;
