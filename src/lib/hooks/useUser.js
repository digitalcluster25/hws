/**
 * useUser.js — React hook для работы с пользователем
 */
import { useState, useEffect } from 'react'
import { userStore } from '../store/user'

export function useUser() {
  const [user, setUser] = useState(() => userStore.getUser())
  const [session, setSession] = useState(() => userStore.getSession())

  // Инициализировать гостя если никого нет
  useEffect(() => {
    if (!user) {
      const guest = userStore.initGuest()
      setUser(guest)
    }
  }, [])

  const updateUser = (data) => {
    const updated = userStore.setUser(data)
    setUser(updated)
    return updated
  }

  const login = (token, userId, userData) => {
    userStore.setSession(token, userId)
    const updated = userStore.setUser({ ...userData, role: userData.role || 'user' })
    setUser(updated)
    setSession(userStore.getSession())
  }

  const logout = () => {
    userStore.logout()
    setUser(null)
    setSession(null)
  }

  return {
    user,
    session,
    isLoggedIn: userStore.isLoggedIn(),
    isAdmin: userStore.isAdmin(),
    updateUser,
    login,
    logout,
  }
}
