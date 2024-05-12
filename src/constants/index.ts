import { HeartIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

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
  // {
  //   icon: UsersIcon,
  //   route: '/people',
  //   label: 'People',
  // },
  {
    icon: BookmarkIcon,
    route: '/saved-posts',
    label: 'Saved Posts',
  },
  {
    icon: HeartIcon,
    route: '/liked-posts',
    label: 'Liked Posts',
  },
]

export const pageTitles = [
  {
    url: '/',
    title: 'Feeds',
  },
  {
    url: '/edit-profile',
    title: 'Edit Profile',
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
    url: '/saved-posts',
    title: 'Saved Posts',
  },
  {
    url: '/liked-posts',
    title: 'Liked Posts',
  },
  {
    url: '/people',
    title: 'People',
  },
]

export const profileTabs = [
  {
    prefix: 'posts',
    name: 'Posts',
  },
  {
    prefix: 'followers',
    name: 'Followers',
  },
  {
    prefix: 'following',
    name: 'Following',
  },
]

export const searchTabs = [
  {
    prefix: 'posts',
    name: 'Posts',
  },
  {
    prefix: 'people',
    name: 'People',
  },
]
