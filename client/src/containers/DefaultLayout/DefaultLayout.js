import React, { Component, Suspense } from "react";
import { Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  // AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import defaultNavigation from "../../_nav";
import { logoutUser } from "../../redux/auth/action";
import PrivateRoute from "../../utils/privateRoute";
// routes config
import routes from "../../routes";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
// const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      permissions: [],
      navigation: { items: [] },
    };
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  componentDidMount() {
    if (this.props.auth) {
      if (!this.props.auth.isAuthenticated) {
        this.props.history.push("/login");
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.auth) {
      if (!nextProps.auth.isAuthenticated) {
        this.props.history.push("/login");
      }

      let permissions = [];

      if (
        nextProps.auth.user.permissions &&
        nextProps.auth.user.permissions.length
      ) {
        permissions = nextProps.auth.user.permissions.map((i) => {
          return i.id.link.toLowerCase().trim();
        });
      }

      permissions.push("#");

      const navigation = this.filterByProperty(
        defaultNavigation.items,
        "url",
        permissions
      );

      this.setState({
        permissions,
        navigation: navigation ? { items: navigation } : { items: [] },
      });
    }
  }

  signOut(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  filterByProperty = (array, key, value) => {
    var i,
      j,
      hash = [],
      item;

    for (i = 0, j = array.length; i < j; i++) {
      item = array[i];
      if (
        typeof item[key] !== "undefined" &&
        value.includes(item[key].trim().toLowerCase())
      ) {
        hash.push(item);
      }
      if (item && typeof item["children"] !== "undefined") {
        item["children"] = this.filterByProperty(
          item["children"],
          "url",
          value
        );
      }
    }

    return hash;
  };

  render() {
    let { permissions, navigation } = this.state;

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader
              onLogout={(e) => this.signOut(e)}
              user={this.props.auth.isAuthenticated ? this.props.auth.user : {}}
            />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    if (
                      route.path &&
                      permissions.includes(route.path.toLowerCase().trim())
                    ) {
                      return route.component ? (
                        <PrivateRoute
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          component={(props) => <route.component {...props} />}
                        />
                      ) : null;
                    } else {
                      return null;
                    }
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logoutUser })(
  withRouter(DefaultLayout)
);
