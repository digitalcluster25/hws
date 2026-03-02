/**
 * storage.js — базовый сервис для работы с localStorage
 * Все данные хранятся под namespace 'hws:'
 */

const NS = 'hws:'

export const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(NS + key)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  },

  set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value))
      return true
    } catch { return false }
  },

  remove(key) {
    try {
      localStorage.removeItem(NS + key)
      return true
    } catch { return false }
  },

  clear(prefix = '') {
    Object.keys(localStorage)
      .filter(k => k.startsWith(NS + prefix))
      .forEach(k => localStorage.removeItem(k))
  },

  /** Читает все ключи с заданным префиксом */
  getAll(prefix) {
    const result = {}
    Object.keys(localStorage)
      .filter(k => k.startsWith(NS + prefix))
      .forEach(k => {
        try { result[k.replace(NS, '')] = JSON.parse(localStorage.getItem(k)) }
        catch { /* skip */ }
      })
    return result
  },
}
