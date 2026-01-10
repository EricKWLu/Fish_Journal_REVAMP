export interface Post {
  _id: string
  user: string
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