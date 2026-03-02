/**
 * admin.js — настройки сайта, управляемые из админки
 *
 * Структура settings:
 * {
 *   heroTitle: string,
 *   heroCta: string,
 *   phone: string,
 *   email: string,
 *   announcementBar: { enabled: bool, text: string },
 *   updatedAt: ISO string
 * }
 */

import { storage } from '../storage'

const KEY_SETTINGS = 'admin:settings'
const KEY_AUTH     = 'admin:auth'

const DEFAULTS = {
  heroTitle: 'Строительство СПА и Wellness',
  heroCta:   'Записаться на консультацию',
  phone:     '+1 (678) 520-9556',
  email:     'Homewoodspa@gmail.com',
  announcementBar: { enabled: false, text: '' },
}

export const adminStore = {
  /** Получить настройки (с дефолтами) */
  getSettings() {
    return { ...DEFAULTS, ...storage.get(KEY_SETTINGS) }
  },

  /** Сохранить настройки */
  saveSettings(patch) {
    const current  = this.getSettings()
    const updated  = { ...current, ...patch, updatedAt: new Date().toISOString() }
    storage.set(KEY_SETTINGS, updated)
    return updated
  },

  /** Простая pin-авторизация для MVP (заменить на JWT позже) */
  setPin(pin) {
    // храним хэш, не сам pin
    const hash = btoa(pin + ':hws2024')
    storage.set(KEY_AUTH, { hash, setAt: new Date().toISOString() })
  },

  checkPin(pin) {
    const auth = storage.get(KEY_AUTH)
    if (!auth) return false
    return auth.hash === btoa(pin + ':hws2024')
  },

  hasPin() {
    return !!storage.get(KEY_AUTH)
  },
}
