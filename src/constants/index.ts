import { HomeIcon, FolderPlusIcon, BellIcon } from '@heroicons/react/24/outline'

export const sidebarLinks = [
  {
    icon: HomeIcon,
    route: '/',
    label: 'Home',
  },
  {
    icon: FolderPlusIcon,
    route: '/create-post',
    label: 'Create Post',
  },
  {
    icon: BellIcon,
    route: '/notification',
    label: 'Notification',
  },
]

export const pageTitles = [
  {
    url: '/',
    title: 'Feeds',
  },
  {
    url: '/post',
    title: 'Post',
  },
  {
    url: '/create-post',
    title: 'Create Post',
  },
  {
    url: '/edit-post',
    title: 'Edit Post',
  },
  {
    url: '/search',
    title: 'Search',
  },
  {
    url: '/profile',
    title: 'Profile',
  },
  {
    url: '/notification',
    title: 'Notification',
  },
]

export const profileTabs = [
  {
    prefix: '',
    name: 'Posts',
  },
  {
    prefix: 'liked',
    name: 'Liked',
  },
  {
    prefix: 'saved',
    name: 'Saved',
  },
]
