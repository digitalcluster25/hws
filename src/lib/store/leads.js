/**
 * leads.js — заявки с формы консультации
 *
 * Структура lead:
 * {
 *   id: string,
 *   name: string,
 *   email: string,
 *   phone: string,
 *   message: string,
 *   source: string,       // utm_source или название секции
 *   status: 'new'|'contacted'|'qualified'|'closed',
 *   createdAt: ISO string,
 *   updatedAt: ISO string,
 *   notes: string         // комментарий менеджера
 * }
 */

import { storage } from '../storage'

const KEY_PREFIX = 'leads:'
const KEY_COUNT  = 'leads:_count'

export const leadsStore = {
  /** Получить все заявки (отсортированы по дате, новые сверху) */
  getAll() {
    const data = storage.getAll(KEY_PREFIX)
    return Object.values(data)
      .filter(v => v && v.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  /** Получить одну заявку */
  get(id) {
    return storage.get(KEY_PREFIX + id)
  },

  /** Добавить новую заявку */
  add(data) {
    const id  = crypto.randomUUID()
    const now = new Date().toISOString()
    const lead = {
      id,
      name:      data.name      || '',
      email:     data.email     || '',
      phone:     data.phone     || '',
      message:   data.message   || '',
      source:    data.source    || 'website',
      status:    'new',
      createdAt: now,
      updatedAt: now,
      notes:     '',
    }
    storage.set(KEY_PREFIX + id, lead)
    // счётчик для бейджа в админке
    const count = (storage.get(KEY_COUNT) || 0) + 1
    storage.set(KEY_COUNT, count)
    return lead
  },

  /** Обновить заявку (статус, заметки) */
  update(id, patch) {
    const lead = this.get(id)
    if (!lead) return null
    const updated = { ...lead, ...patch, updatedAt: new Date().toISOString() }
    storage.set(KEY_PREFIX + id, updated)
    return updated
  },

  /** Удалить заявку */
  remove(id) {
    return storage.remove(KEY_PREFIX + id)
  },

  /** Кол-во новых (непросмотренных) */
  getNewCount() {
    return this.getAll().filter(l => l.status === 'new').length
  },

  /** Сбросить счётчик бейджа */
  resetBadge() {
    storage.set(KEY_COUNT, 0)
  },
}
