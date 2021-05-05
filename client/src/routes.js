import React from "react";

const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
// const CityList = React.lazy(() => import("./views/city/index"));
// const DistrictList = React.lazy(() => import("./views/district/index"));
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
    path: "/locations",
    exact: true,
    name: "Manage Locations",
    component: CountryList,
  },
  {
    path: "/permissions",
    exact: true,
    name: "Manage Permissions",
    component: PermissionList,
  },
];

export default routes;
