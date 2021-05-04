import React from "react";

const VideosList = React.lazy(() => import("./views/videos/index"));
const UsersList = React.lazy(() => import("./views/users/index"));
const CountryList = React.lazy(() => import("./views/country/index"));
const CityList = React.lazy(() => import("./views/city/index"));
const DistrictList = React.lazy(() => import("./views/district/index"));
const NationalityList = React.lazy(() => import("./views/nationality/index"));
const GameList = React.lazy(() => import("./views/game_types/index"));
const FieldList = React.lazy(() => import("./views/field_types/index"));
const PlayList = React.lazy(() => import("./views/playing_positions/index"));
const SpecialList = React.lazy(() => import("./views/special_requests/index"));
const MainAdList = React.lazy(() => import("./views/main_ads/index"));
const ServiceList = React.lazy(() => import("./views/provided_services/index"));
const StadiumList = React.lazy(() => import("./views/stadium/index"));
const PageList = React.lazy(() => import("./views/page/index"));
const PermissionList = React.lazy(() => import("./views/permissions/index"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/videos",
    exact: true,
    name: "Manage Intro Videos",
    component: VideosList,
  },
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
    path: "/stadiums",
    exact: true,
    name: "Manage Stadium",
    component: StadiumList,
  },
  {
    path: "/nationalities",
    exact: true,
    name: "Manage Nationality",
    component: NationalityList,
  },
  {
    path: "/playing-position",
    exact: true,
    name: "Manage Playing Positions",
    component: PlayList,
  },
  {
    path: "/provided-services",
    exact: true,
    name: "Manage Provided Services",
    component: ServiceList,
  },
  {
    path: "/fields",
    exact: true,
    name: "Manage Fields",
    component: FieldList,
  },
  {
    path: "/games",
    exact: true,
    name: "Manage Games",
    component: GameList,
  },
  {
    path: "/requests",
    exact: true,
    name: "Manage Special Requests",
    component: SpecialList,
  },
  {
    path: "/main-ads",
    exact: true,
    name: "Manage Main Ads",
    component: MainAdList,
  },
  {
    path: "/page",
    exact: true,
    name: "Manage Pages",
    component: PageList,
  },
  {
    path: "/permissions",
    exact: true,
    name: "Manage Permissions",
    component: PermissionList,
  },
];

export default routes;
