const nav = {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      name: "Settings",
      url: "#",
      icon: "icon-settings",
      children: [
        {
          name: "Manage Locations",
          url: "/locations",
          icon: "icon-options-vertical",
        },
        {
          name: "Brands",
          url: "/brands",
          icon: "icon-options-vertical",
        },
        {
          name: "Services",
          url: "/services",
          icon: "icon-options-vertical",
        },
        {
          name: "Shop Categories",
          url: "/categories",
          icon: "icon-options-vertical",
        },
        {
          name: "Colors",
          url: "/colors",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Shop Items",
          url: "/product",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Company",
          url: "/company",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Permissions",
          url: "/permissions",
          icon: "icon-options-vertical",
        },
      ],
    },
    {
      name: "Manage News & Media",
      url: "/news",
      icon: "icon-options-vertical",
    },
    {
      name: "Manage Ads",
      url: "/ads",
      icon: "icon-options-vertical",
    },
    {
      name: "Manage Users",
      url: "/users",
      icon: "icon-people",
    },
    {
      name: "Manage Pages",
      url: "/page",
      icon: "icon-options-vertical",
    },
  ],
};

export default nav;
