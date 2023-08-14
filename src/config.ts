import { Icons } from "./components/icons";

export const menuList = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Icons.grid,
    children: [
      { id: "default", label: "Default", icon: Icons.layout, url: "/default" },
      {
        id: "analytics",
        label: "Analytics",
        icon: Icons.barChart,
        url: "/analytics",
      },
    ],
  },
  {
    id: "",
    label: "Schedules",
    url: "/schedule",
    icon: Icons.calendar,
  },
  {
    id: "audience",
    label: "Audience",
    icon: Icons.user,
    url: "/audience",
  },
  {
    id: "posts",
    label: "Posts",
    icon: Icons.file,
    url: "/posts",
  },
  {
    id: "income",
    label: "Income",
    icon: Icons.pieChart,
    children: [
      {
        id: "earnings",
        label: "Earnings",
        icon: Icons.pieChart,
      },
      {
        id: "refunds",
        label: "Refunds",
        icon: Icons.pieChart,
      },
      {
        id: "declines",
        label: "Declines",
        icon: Icons.pieChart,
      },
      {
        id: "payouts",
        label: "Payouts",
        icon: Icons.pieChart,
      },
    ],
  },
];
