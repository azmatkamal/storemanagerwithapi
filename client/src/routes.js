import React from "react";

const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
const CityList = React.lazy(() => import("./views/city/index"));
const DistrictList = React.lazy(() => import("./views/district/index"));
const PermissionList = React.lazy(() => import("./views/permissions/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/users",
    exact: true,
    name: "Manage Users",
    component: UsersList,
  },
  {
    path: "/countries",
    exact: true,
    name: "Manage Countires",
    component: CountryList,
  },
  {
    path: "/cities",
    exact: true,
    name: "Manage Cities",
    component: CityList,
  },
  {
    path: "/districts",
    exact: true,
    name: "Manage District",
    component: DistrictList,
  },
  {
    path: "/permissions",
    exact: true,
    name: "Manage Permissions",
    component: PermissionList,
  },
];

export default routes;
