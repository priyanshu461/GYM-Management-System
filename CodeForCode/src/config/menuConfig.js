import {
  LayoutDashboardIcon,
  Laptop2,
  LucideFolderCog,
  Home,
  User,
  Calendar,
  Dumbbell,
  TrendingUp,
  Settings,
  Award,
  Target,
  Activity,
  Users,
  UserCheck,
} from "lucide-react";
import {
  MdGroup,
  MdNotificationAdd,
  MdSupportAgent,
  MdCalculate,
} from "react-icons/md";
import { TfiWallet } from "react-icons/tfi";
import { BsClockHistory, BsFillBox2HeartFill } from "react-icons/bs";
import { FaBlog, FaCartPlus, FaDumbbell, FaUserTie } from "react-icons/fa";
import { TbReportAnalytics, TbReportSearch } from "react-icons/tb";
import { GiFruitBowl, GiGymBag, GiProgression } from "react-icons/gi";
import { BiDumbbell } from "react-icons/bi";
import { AiOutlineAudit } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { SlSettings } from "react-icons/sl";
import Member from "@/views/Management/MemberManagement";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Menu configuration for the sidebar navigation
 * This structure makes it easy to add, remove, or modify menu items
 */
export const menuConfig = {
  Admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
      type: "link", // 'link' or 'dropdown'
    },
    {
      id: "gyms",
      label: "Gyms",
      path: "/gyms",
      icon: FaDumbbell,
      type: "link", // 'link' or 'dropdown'
    },
    {
      id: "management",
      label: "Management",
      icon: Laptop2,
      type: "dropdown",
      children: [
        {
          id: "members",
          label: "Members Management",
          path: "/members",
          icon: MdGroup,
        },
        {
          id: "trainers",
          label: "Trainers",
          path: "/trainers",
          icon: FaUserTie,
        },
       
        {
          id: "facilities",
          label: "Facilities",
          path: "/facilities",
          icon: BsFillBox2HeartFill,
        },
      ],
    },
        {
          id: "finance",
          label: "Finance",
          icon: TfiWallet,
          type: "dropdown",
          children: [
            {
              id: "finance-salary",
              label: "Salary",
              path: "/finance/salary",
              icon: TfiWallet,
            },
            {
              id: "finance-expense",
              label: "Expense",
              path: "/finance/expense",
              icon: TfiWallet,
            },
          ],
        },
    {
      id: "workout-diet",
      label: "Workout & Diet Plans",
      icon: BiDumbbell,
      type: "dropdown",
      children: [
        {
          id: "workout-routine",
          label: "Workout Routines",
          path: "/workout/routine",
          icon: BsClockHistory,
        },
        {
          id: "diet-plan",
          label: "Diet Plans",
          path: "/diet-plan",
          icon: GiFruitBowl,
        },
        {
          id: "progress-tracking",
          label: "Progress Tracking",
          path: "/progress/tracking",
          icon: GiProgression,
        },
        {
          id: "reports-analytics",
          label: "Reports & Analytics",
          path: "/reports/analytics",
          icon: TbReportSearch,
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      icon: LucideFolderCog,
      type: "dropdown",
      children: [
        {
          id: "classes-schedule",
          label: "Classes & Schedules",
          path: "/classes/schedule",
          icon: SiGoogleclassroom,
        },
        {
          id: "courses",
          label: "Courses",
          path: "/courses",
          icon: AiOutlineAudit,
        },
        {
          id: "franchises-membership",
          label: "Membership Plans",
          path: "/franchisesandmembership",
          icon: GiGymBag,
        },
      ],
    },
    {
      id: "all-products",
      label: "All Products",
      path: "/products",
      icon: FaCartPlus,
      type: "link",
    },
    {
      id: "notifications",
      label: "Notifications",
      path: "/notificationcommunication",
      icon: MdNotificationAdd,
      type: "link",
    },
    {
      id: "blog",
      label: "Blog",
      path: "/gymblog",
      icon: FaBlog,
      type: "link",
    },
    {
      id: "support-tickets",
      label: "Support Tickets",
      path: "/support/tickets",
      icon: MdSupportAgent,
      type: "link",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: SlSettings,
      type: "link",
    },
  ],
  Gym: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
      type: "link", // 'link' or 'dropdown'
    },
    {
      id: "management",
      label: "Management",
      icon: Laptop2,
      type: "dropdown",
      children: [
        {
          id: "members",
          label: "Members Management",
          path: "/members",
          icon: MdGroup,
        },
        {
          id: "trainers",
          label: "Trainers",
          path: "/trainers",
          icon: FaUserTie,
        },
        {
          id: "finance",
          label: "Finance",
          icon: TfiWallet,
          type: "dropdown",
          children: [
            {
              id: "finance-salary",
              label: "Salary",
              path: "/finance/salary",
              icon: TfiWallet,
            },
            {
              id: "finance-expense",
              label: "Expense",
              path: "/finance/expense",
              icon: TfiWallet,
            },
          ],
        },
        {
          id: "facilities",
          label: "Facilities",
          path: "/facilities",
          icon: BsFillBox2HeartFill,
        },
      ],
    },
    {
      id: "workout-diet",
      label: "Workout & Diet Plans",
      icon: BiDumbbell,
      type: "dropdown",
      children: [
        {
          id: "workout-routine",
          label: "Workout Routines",
          path: "/workout/routine",
          icon: BsClockHistory,
        },
        {
          id: "diet-plan",
          label: "Diet Plans",
          path: "/diet/plan",
          icon: GiFruitBowl,
        },
        {
          id: "progress-tracking",
          label: "Progress Tracking",
          path: "/progress/tracking",
          icon: GiProgression,
        },
        {
          id: "reports-analytics",
          label: "Reports & Analytics",
          path: "/reports/analytics",
          icon: TbReportSearch,
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      icon: LucideFolderCog,
      type: "dropdown",
      children: [
        {
          id: "classes-schedule",
          label: "Classes & Schedules",
          path: "/classes/schedule",
          icon: SiGoogleclassroom,
        },
        {
          id: "courses",
          label: "Courses",
          path: "/courses",
          icon: AiOutlineAudit,
        },
        {
          id: "franchises-membership",
          label: "Membership Plans",
          path: "/franchisesandmembership",
          icon: GiGymBag,
        },
      ],
    },
    {
      id: "all-products",
      label: "All Products",
      path: "/products",
      icon: FaCartPlus,
      type: "link",
    },
    {
      id: "notifications",
      label: "Notifications",
      path: "/notificationcommunication",
      icon: MdNotificationAdd,
      type: "link",
    },
    {
      id: "blog",
      label: "Blog",
      path: "/gymblog",
      icon: FaBlog,
      type: "link",
    },
    {
      id: "support-tickets",
      label: "Support Tickets",
      path: "/support/tickets",
      icon: MdSupportAgent,
      type: "link",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: SlSettings,
      type: "link",
    },
  ],
  Member: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/member/dashboard",
      icon: Home,
      type: "link",
    },
    {
      id: "profile",
      label: "My Profile",
      path: "/member/profile",
      icon: User,
      type: "link",
    },
    {
      id: "classes",
      label: "My Classes",
      path: "/member/classes",
      icon: Calendar,
      type: "link",
    },
    {
      id: "workouts",
      label: "Workouts",
      path: "/member/workouts",
      icon: Dumbbell,
      type: "link",
    },
    {
      id: "progress",
      label: "Progress",
      path: "/member/progress",
      icon: TrendingUp,
      type: "link",
    },
    {
      id: "achievements",
      label: "Achievements",
      path: "/member/achievements",
      icon: Award,
      type: "link",
    },
    {
      id: "goals",
      label: "Goals",
      path: "/member/goals",
      icon: Target,
      type: "link",
    },
    {
      id: "bmi-calculator",
      label: "BMI Calculator",
      path: "/bmi/calculator",
      icon: MdCalculate,
      type: "link",
    },
    {
      id: "activity",
      label: "Activity Log",
      path: "/member/activity",
      icon: Activity,
      type: "link",
    },
    {
      id: "all-products",
      label: "All Products",
      path: "/products",
      icon: FaCartPlus,
      type: "link",
    },
    {
      id: "settings",
      label: "Settings",
      path: "/member/settings",
      icon: Settings,
      type: "link",
    },
  ],
  Trainer: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/trainer/dashboard",
      icon: Home,
      type: "link",
    },
    {
      id: "my-clients",
      label: "My Clients",
      path: "/trainer/clients",
      icon: Users,
      type: "link",
    },
    {
      id: "my-schedules",
      label: "My Schedules",
      path: "/trainer/schedules",
      icon: Calendar,
      type: "link",
    },
    {
      id: "workouts",
      label: "Workouts",
      icon: Dumbbell,
      type: "dropdown",
      children: [
        {
          id: "create-workout",
          label: "Create Workout",
          path: "/trainer/workouts/create",
          icon: Dumbbell,
        },
        {
          id: "assign-workout",
          label: "Assign to Client",
          path: "/trainer/workouts/assign",
          icon: UserCheck,
        },
      ],
    },
    {
      id: "all-products",
      label: "All Products",
      path: "/products",
      icon: FaCartPlus,
      type: "link",
    },
    {
      id: "salary",
      label: "Salary",
      path: "/trainer/salary",
      icon: TfiWallet,
      type: "link",
    },
    {
      id: "reset-password",
      label: "Reset Password",
      path: "/trainer/reset/password",
      icon: SlSettings,
      type: "link",
    },
  ],
};

/**
 * Helper function to get all paths that should expand a dropdown
 */
export const getDropdownPaths = () => {
  const paths = {};
  const { user } = useAuth();

  menuConfig[user.user_type].forEach((item) => {
    if (item.type === "dropdown" && item.children) {
      paths[item.id] = item.children.map((child) => child.path);
    }
  });

  return paths;
};
