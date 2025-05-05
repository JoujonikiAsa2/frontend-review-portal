import { IconDashboard, IconListDetails } from "@tabler/icons-react";
import {
  BadgeDollarSign,
  ChartColumnStacked,
  ListCollapse,
} from "lucide-react";

const adminBar = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: IconDashboard,
  },
  {
    title: "Create Review",
    url: "/dashboard/admin/create-review",
    icon: IconListDetails,
  },
  {
    title: "Create Category",
    url: "#",
    icon: ChartColumnStacked,
  },
];
export const userBar = [
  {
    title: "Dashboard",
    url: "/dashboard/user/profile",
    icon: IconDashboard,
  },
  {
    title: "My Reviews",
    url: "/dashboard/user/my-reviews",
    icon: IconListDetails,
  },
  {
    title: "Create Review",
    url: "/dashboard/user/create-review",
    icon: ListCollapse,
  },
  {
    title: "Payment History",
    url: "/dashboard/user/payment-history",
    icon: BadgeDollarSign,
  },
];
