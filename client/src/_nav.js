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
          name: "Manage Countries",
          url: "/countries",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Cities",
          url: "/cities",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage Districts",
          url: "/districts",
          icon: "icon-options-vertical",
        },
        {
          name: "Manage User Roles",
          url: "/permissions",
          icon: "icon-options-vertical",
        },
      ],
    },
    {
      name: "Manage Users",
      url: "/users",
      icon: "icon-people",
    },
  ],
};

export default nav;
