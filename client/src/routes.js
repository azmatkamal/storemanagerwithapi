import React from "react";

const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
const Brandslist = React.lazy(() => import("./views/brand/index"));
const ServicesList = React.lazy(() => import("./views/service/index"));
const PermissionList = React.lazy(() => import("./views/permissions/index"));
const Categorylist = React.lazy(() => import("./views/category/index"));

const routes = [
  { path: "/", exact: true, name: "الرئيسية" },
  {
    path: "/users",
    exact: true,
    name: "ادارة المستخدمين",
    component: UsersList,
  },
  {
    path: "/locations",
    exact: true,
    name: "ادارة المواقع",
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
    name: "ادارة صلاحيات المستخدمين",
    component: PermissionList,
  },
];

export default routes;
