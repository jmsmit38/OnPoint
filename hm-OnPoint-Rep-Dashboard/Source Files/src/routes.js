import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import SalesDashboard from "./views/SalesDashboard";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ServiceOverview from "./views/ServiceOverview";
import UserTables from "./views/UserTable";
import ReviewPosts from "./views/ReviewPosts";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/overview" />
  },
  {
    path: "/overview",
    layout: DefaultLayout,
    component: SalesDashboard
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/announcements",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/service-overview",
    layout: DefaultLayout,
    component: ServiceOverview
  },
  {
    path: "/customers",
    layout: DefaultLayout,
    component: UserTables
  },
  {
    path: "/reviews",
    layout: DefaultLayout,
    component: ReviewPosts
  }
];
