import React from "react";

const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
// const CityList = React.lazy(() => import("./views/city/index"));
// const DistrictList = React.lazy(() => import("./views/district/index"));
const PermissionList = React.lazy(() => import("./views/permissions/index"));

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
    path: "/permissions",
    exact: true,
    name: "ادارة صلاحيات المستخدمين",
    component: PermissionList,
  },
];

export default routes;
