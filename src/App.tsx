import { useEffect, useState, type FormEvent } from 'react'
import {
  categories,
  categoryEmoji,
  type Category,
  type GroceryItem,
} from './data/groceries'
import './App.css'

const STORAGE_KEY = 'grocery-list-items'

function loadItems(): GroceryItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  const [items, setItems] = useState<GroceryItem[]>(loadItems)
  const [name, setName] = useState('')
  const [category, setCategory] = useState<Category>('Produce')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const trimmed = name.trim()
    if (!trimmed) return

    const newItem: GroceryItem = {
      id: Date.now(),
      name: trimmed,
      category,
      done: false,
    }

    setItems((current) => [...current, newItem])
    setName('')
  }

  function handleToggle(id: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  function handleDelete(id: number) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const remaining = items.filter((item) => !item.done).length

  return (
    <div className="app">
      <h1>Grocery List</h1>
      <p className="remaining">{remaining} left to buy</p>

      <form className="add-form" onSubmit={handleAdd}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add an item..."
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryEmoji[c]} {c}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      {items.length === 0 && <p className="empty">Your list is empty.</p>}

      {categories.map((cat) => {
        const categoryItems = items.filter((item) => item.category === cat)
        if (categoryItems.length === 0) return null

        return (
          <section key={cat} className="category">
            <h2>
              {categoryEmoji[cat]} {cat}
            </h2>
            <ul>
              {categoryItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`item ${item.done ? 'done' : ''}`}
                    onClick={() => handleToggle(item.id)}
                  >
                    {item.name}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Delete ${item.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export default App