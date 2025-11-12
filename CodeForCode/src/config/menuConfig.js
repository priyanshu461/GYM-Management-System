import { LayoutDashboardIcon, Laptop2, LucideFolderCog } from "lucide-react";
import { MdGroup, MdNotificationAdd, MdSupportAgent } from 'react-icons/md';
import { TfiWallet } from 'react-icons/tfi';
import { BsClockHistory, BsFillBox2HeartFill } from 'react-icons/bs';
import { FaBlog, FaCartPlus, FaDumbbell, FaUserTie } from 'react-icons/fa';
import { TbReportAnalytics, TbReportSearch } from 'react-icons/tb';
import { GiFruitBowl, GiGymBag, GiProgression } from 'react-icons/gi';
import { BiDumbbell } from 'react-icons/bi';
import { AiOutlineAudit } from 'react-icons/ai';
import { SiGoogleclassroom } from 'react-icons/si';
import { SlSettings } from 'react-icons/sl';

/**
 * Menu configuration for the sidebar navigation
 * This structure makes it easy to add, remove, or modify menu items
 */
export const menuConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboardIcon,
    type: 'link', // 'link' or 'dropdown'
  },
   {
    id: 'gyms',
    label: 'Gyms',
    path: '/gyms',
    icon: FaDumbbell,
    type: 'link', // 'link' or 'dropdown'
  },
  {
    id: 'management',
    label: 'Management',
    icon: Laptop2,
    type: 'dropdown',
    children: [
      {
        id: 'members',
        label: 'Members Management',
        path: '/members',
        icon: MdGroup,
      },
      {
        id: 'trainers',
        label: 'Trainers',
        path: '/trainers',
        icon: FaUserTie,
      },
      {
        id: 'finance',
        label: 'Finance',
        path: '/finance',
        icon: TfiWallet,
      },
      {
        id: 'facilities',
        label: 'Facilities',
        path: '/facilities',
        icon: BsFillBox2HeartFill,
      },
    ],
  },
  {
    id: 'workout-diet',
    label: 'Workout & Diet Plans',
    icon: BiDumbbell,
    type: 'dropdown',
    children: [
      {
        id: 'workout-routine',
        label: 'Workout Routines',
        path: '/workout-routine',
        icon: BsClockHistory,
      },
      {
        id: 'diet-plan',
        label: 'Diet Plans',
        path: '/diet-plan',
        icon: GiFruitBowl,
      },
      {
        id: 'progress-tracking',
        label: 'Progress Tracking',
        path: '/progress-tracking',
        icon: GiProgression,
      },
      {
        id: 'reports-analytics',
        label: 'Reports & Analytics',
        path: '/reports-analytics',
        icon: TbReportSearch,
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: LucideFolderCog,
    type: 'dropdown',
    children: [
      {
        id: 'classes-schedule',
        label: 'Classes & Schedules',
        path: '/classes-schedule',
        icon: SiGoogleclassroom,
      },
      {
        id: 'courses',
        label: 'Courses',
        path: '/courses',
        icon: AiOutlineAudit,
      },
      {
        id: 'franchises-membership',
        label: 'Membership Plans',
        path: '/franchises-and-membership',
        icon: GiGymBag,
      },
    ],
  },
  {
    id: 'all-products',
    label: 'All Products',
    path: '/products',
    icon: FaCartPlus,
    type: 'link',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    path: '/notificationcommunication',
    icon: MdNotificationAdd,
    type: 'link',
  },
  {
    id: 'blog',
    label: 'Blog',
    path: '/gymblog',
    icon: FaBlog,
    type: 'link',
  },
  {
    id: 'support-tickets',
    label: 'Support Tickets',
    path: '/supporttickets',
    icon: MdSupportAgent,
    type: 'link',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: SlSettings,
    type: 'link',
  },
];

/**
 * Helper function to get all paths that should expand a dropdown
 */
export const getDropdownPaths = () => {
  const paths = {};
  
  menuConfig.forEach(item => {
    if (item.type === 'dropdown' && item.children) {
      paths[item.id] = item.children.map(child => child.path);
    }
  });
  
  return paths;
};

