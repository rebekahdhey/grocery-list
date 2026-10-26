export type Category = 'Produce' | 'Dairy' | 'Pantry' | 'Snacks' | 'Other'

export const categories: Category[] = ['Produce', 'Dairy', 'Pantry', 'Snacks', 'Other']

export const categoryEmoji: Record<Category, string> = {
  Produce: '🥬',
  Dairy: '🥛',
  Pantry: '🥫',
  Snacks: '🍪',
  Other: '🛒',
}

export interface GroceryItem {
  id: number
  name: string
  category: Category
  done: boolean
}