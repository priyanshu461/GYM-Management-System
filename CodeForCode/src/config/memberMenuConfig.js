import {
  Home,
  User,
  Calendar,
  Dumbbell,
  TrendingUp,
  Settings,
  Award,
  Target,
  Activity
} from 'lucide-react';
import { MdCalculate } from 'react-icons/md';

/**
 * Menu configuration for the member sidebar navigation
 * This structure makes it easy to add, remove, or modify menu items
 */
export const memberMenuConfig = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/member-dashboard',
    icon: Home,
    type: 'link'
  },
  {
    id: 'profile',
    label: 'My Profile',
    path: '/member-profile',
    icon: User,
    type: 'link'
  },
  {
    id: 'classes',
    label: 'My Classes',
    path: '/member-classes',
    icon: Calendar,
    type: 'link'
  },
  {
    id: 'workouts',
    label: 'Workouts',
    path: '/member-workouts',
    icon: Dumbbell,
    type: 'link'
  },
  {
    id: 'progress',
    label: 'Progress',
    path: '/member-progress',
    icon: TrendingUp,
    type: 'link'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    path: '/member-achievements',
    icon: Award,
    type: 'link'
  },
  {
    id: 'goals',
    label: 'Goals',
    path: '/member-goals',
    icon: Target,
    type: 'link'
  },
  {
    id: 'bmi-calculator',
    label: 'BMI Calculator',
    path: '/bmi-calculator',
    icon: MdCalculate,
    type: 'link'
  },
  {
    id: 'activity',
    label: 'Activity Log',
    path: '/member-activity',
    icon: Activity,
    type: 'link'
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/member-settings',
    icon: Settings,
    type: 'link'
  }
];

/**
 * Helper function to get all member menu paths
 */
export const getMemberMenuPaths = () => {
  return memberMenuConfig.map(item => item.path);
};

/**
 * Helper function to get dropdown paths for member menu
 */
export const getMemberDropdownPaths = () => {
  const dropdownPaths = {};

  memberMenuConfig.forEach(item => {
    if (item.type === 'dropdown' && item.children) {
      dropdownPaths[item.id] = item.children.map(child => child.path);
    }
  });

  return dropdownPaths;
};
