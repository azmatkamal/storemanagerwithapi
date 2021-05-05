const nav = {
  items: [
    {
      name: "لوحة تحكم",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      name: "اعدادات",
      url: "#",
      icon: "icon-settings",
      children: [
        {
          name: "ادارة المواقع",
          url: "/locations",
          icon: "icon-options-vertical",
        },
        {
          name: "ادارة صلاحيات المستخدمين",
          url: "/permissions",
          icon: "icon-options-vertical",
        },
      ],
    },
    {
      name: "ادارة المستخدمين",
      url: "/users",
      icon: "icon-people",
    },
  ],
};

export default nav;
