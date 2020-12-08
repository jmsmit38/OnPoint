export default function() {
  return [
    {
      title: "Sales Dashboard",
      to: "/overview",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      htmlAfter: ""
    },
    {
      title: "Reviews",
      htmlBefore: '<i class="material-icons">edit</i>',
      to: "/reviews",
    },
    {
      title: "Create Announcement",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/announcements",
    },
//    {
//      title: "Forms & Components",
//      htmlBefore: '<i class="material-icons">view_module</i>',
//      to: "/components-overview",
//    },
    {
      title: "Customer Lookup",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/customers",
    },
    {
      title: "My Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    }
//    {
//      title: "Errors",
//      htmlBefore: '<i class="material-icons">error</i>',
//      to: "/errors",
//    }
  ];
}
