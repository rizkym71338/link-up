import { HomeIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

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
