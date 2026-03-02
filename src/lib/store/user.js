/**
 * user.js — сессия и профиль пользователя
 *
 * Структура user:
 * {
 *   id: string,           // uuid
 *   email: string,
 *   name: string,
 *   role: 'user'|'admin',
 *   createdAt: ISO string,
 *   lastSeen: ISO string,
 *   preferences: {}       // настройки пользователя
 * }
 *
 * Структура session:
 * {
 *   token: string,        // заглушка, позже JWT
 *   userId: string,
 *   expiresAt: ISO string
 * }
 */

import { storage } from '../storage'

const KEY_USER    = 'user:current'
const KEY_SESSION = 'session:current'

export const userStore = {
  /** Получить текущего пользователя */
  getUser() {
    return storage.get(KEY_USER)
  },

  /** Сохранить / обновить пользователя */
  setUser(data) {
    const existing = this.getUser() || {}
    const user = {
      ...existing,
      ...data,
      lastSeen: new Date().toISOString(),
    }
    storage.set(KEY_USER, user)
    return user
  },

  /** Создать нового анонимного пользователя (для трекинга до регистрации) */
  initGuest() {
    if (this.getUser()) return this.getUser()
    const guest = {
      id: crypto.randomUUID(),
      role: 'guest',
      createdAt: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      preferences: {},
    }
    storage.set(KEY_USER, guest)
    return guest
  },

  /** Сохранить сессию (после логина) */
  setSession(token, userId, expiresInHours = 24) {
    const expiresAt = new Date(Date.now() + expiresInHours * 3600_000).toISOString()
    storage.set(KEY_SESSION, { token, userId, expiresAt })
  },

  /** Получить сессию */
  getSession() {
    const session = storage.get(KEY_SESSION)
    if (!session) return null
    if (new Date(session.expiresAt) < new Date()) {
      storage.remove(KEY_SESSION)
      return null
    }
    return session
  },

  /** Выйти */
  logout() {
    storage.remove(KEY_SESSION)
    storage.remove(KEY_USER)
  },

  isLoggedIn() {
    return !!this.getSession()
  },

  isAdmin() {
    const user = this.getUser()
    return user?.role === 'admin'
  },
}
