export interface User {
  _id: string
  username: string | null
  name: string
  img?: string
}

export interface Post {
  _id: string
  user: User
  img?: string
  title: string
  category: string
  slug: string
  desc?: string
  content: string
  isFeatured: boolean
  visit: number
  createdAt: string
  updatedAt: string
}