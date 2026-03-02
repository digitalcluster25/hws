/**
 * useLeads.js — React hook для работы с заявками
 */
import { useState, useCallback } from 'react'
import { leadsStore } from '../store/leads'

export function useLeads() {
  const [leads, setLeads] = useState(() => leadsStore.getAll())

  const refresh = useCallback(() => {
    setLeads(leadsStore.getAll())
  }, [])

  const submit = useCallback((formData) => {
    const lead = leadsStore.add(formData)
    refresh()
    return lead
  }, [refresh])

  const updateStatus = useCallback((id, status, notes) => {
    leadsStore.update(id, { status, ...(notes !== undefined && { notes }) })
    refresh()
  }, [refresh])

  const remove = useCallback((id) => {
    leadsStore.remove(id)
    refresh()
  }, [refresh])

  return {
    leads,
    newCount: leads.filter(l => l.status === 'new').length,
    submit,
    updateStatus,
    remove,
    refresh,
  }
}
