import { useState, useMemo } from 'react'
import { saveAdminOverride, exportTranslation } from '../i18n/index.js'
import i18n from '../i18n/index.js'

import ruLabels  from '../i18n/locales/ru/labels.json'
import enLabels  from '../i18n/locales/en/labels.json'
import deLabels  from '../i18n/locales/de/labels.json'
import elLabels  from '../i18n/locales/el/labels.json'
import ruContent from '../i18n/locales/ru/content.json'
import enContent from '../i18n/locales/en/content.json'
import deContent from '../i18n/locales/de/content.json'
import elContent from '../i18n/locales/el/content.json'

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD || 'hws2026'
const LANGS = ['ru', 'en', 'de', 'el']

// Flatten nested object to dot-key paths, excluding array branches (stored as-is)
function flattenObject(obj, prefix = '') {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenObject(v, key))
    } else {
      out[key] = v
    }
  }
  return out
}

function getLoadedOverrides() {
  try { return JSON.parse(localStorage.getItem('hws-i18n-overrides') || '{}') }
  catch { return {} }
}

function getNestedValue(obj, dotKey) {
  return dotKey.split('.').reduce((cur, k) => (cur && cur[k] !== undefined ? cur[k] : undefined), obj)
}

const SOURCES = {
  labels:  { ru: ruLabels,  en: enLabels,  de: deLabels,  el: elLabels  },
  content: { ru: ruContent, en: enContent, de: deContent, el: elContent },
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [passInput, setPassInput] = useState('')
  const [passErr, setPassErr] = useState(false)
  const [ns, setNs] = useState('labels')
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState({}) // { 'lang:ns:key': value }
  const [saved, setSaved] = useState(false)

  // Build flat key list from RU as canonical source
  const allKeys = useMemo(() => {
    const src = SOURCES[ns]['ru']
    return Object.keys(flattenObject(src)).filter(k => {
      // Skip array values (complex content)
      const v = getNestedValue(src, k)
      return !Array.isArray(v)
    })
  }, [ns])

  const filteredKeys = useMemo(() => {
    if (!search.trim()) return allKeys
    const q = search.toLowerCase()
    return allKeys.filter(k => k.toLowerCase().includes(q))
  }, [allKeys, search])

  function getCurrentValue(lang, key) {
    const pendingKey = `${lang}:${ns}:${key}`
    if (pending[pendingKey] !== undefined) return pending[pendingKey]
    const overrides = getLoadedOverrides()
    const ovVal = getNestedValue(overrides?.[lang]?.[ns] || {}, key)
    if (ovVal !== undefined) return String(ovVal)
    const baseVal = getNestedValue(SOURCES[ns][lang] || {}, key)
    return baseVal !== undefined ? String(baseVal) : ''
  }

  function handleChange(lang, key, value) {
    const pendingKey = `${lang}:${ns}:${key}`
    setPending(p => ({ ...p, [pendingKey]: value }))
    setSaved(false)
  }

  function handleSaveAll() {
    for (const [pKey, value] of Object.entries(pending)) {
      const [lang, pNs, ...keyParts] = pKey.split(':')
      const key = keyParts.join(':')
      saveAdminOverride(lang, pNs, key, value)
    }
    setPending({})
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleExport(lang) {
    const data = exportTranslation(lang, ns)
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${lang}-${ns}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleResetAll() {
    if (!window.confirm('Сбросить все переопределения? Вернуться к исходным переводам?')) return
    localStorage.removeItem('hws-i18n-overrides')
    setPending({})
    window.location.reload()
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f0' }}>
        <div style={{ background: '#fff', padding: '2.5rem 3rem', borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.1)', minWidth: 340 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#323625' }}>HWS Admin</h1>
          <p style={{ fontSize: 13, color: '#6b7057', marginBottom: 24 }}>Управление переводами / Translation manager</p>
          <input
            type="password"
            placeholder="Пароль / Password"
            value={passInput}
            onChange={e => { setPassInput(e.target.value); setPassErr(false) }}
            onKeyDown={e => e.key === 'Enter' && (passInput === ADMIN_PASS ? setAuthed(true) : setPassErr(true))}
            style={{ width: '100%', padding: '10px 14px', border: `1.5px solid ${passErr ? '#e55' : '#ddd'}`, borderRadius: 8, fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
          />
          {passErr && <p style={{ color: '#e55', fontSize: 12, marginTop: 6 }}>Неверный пароль / Wrong password</p>}
          <button
            onClick={() => passInput === ADMIN_PASS ? setAuthed(true) : setPassErr(true)}
            style={{ marginTop: 14, width: '100%', padding: '11px', background: '#323625', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            Войти / Enter
          </button>
        </div>
      </div>
    )
  }

  const hasPending = Object.keys(pending).length > 0

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ background: '#323625', color: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>HWS Translation Admin</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {LANGS.map(lang => (
            <button key={lang} onClick={() => handleExport(lang)} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
              ↓ {lang.toUpperCase()} {ns}
            </button>
          ))}
          <button onClick={handleResetAll} style={{ padding: '6px 12px', background: 'rgba(255,80,80,0.3)', color: '#fff', border: '1px solid rgba(255,80,80,0.5)', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>
            Сбросить всё
          </button>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '16px 24px', background: '#fff', borderBottom: '1px solid #e5e5e0', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['labels', 'content'].map(n => (
            <button key={n} onClick={() => { setNs(n); setSearch('') }} style={{ padding: '7px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: ns === n ? '#323625' : '#f0f0eb', color: ns === n ? '#fff' : '#323625' }}>
              {n}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск ключей / Search keys…"
          style={{ flex: 1, minWidth: 200, padding: '7px 12px', border: '1.5px solid #ddd', borderRadius: 6, fontSize: 13 }}
        />
        <span style={{ fontSize: 12, color: '#888' }}>{filteredKeys.length} ключей</span>
        {hasPending && (
          <button onClick={handleSaveAll} style={{ padding: '8px 18px', background: '#4a7c40', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
            💾 Сохранить ({Object.keys(pending).length})
          </button>
        )}
        {saved && <span style={{ color: '#4a7c40', fontWeight: 600, fontSize: 13 }}>✓ Сохранено!</span>}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', padding: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <thead>
            <tr style={{ background: '#f0f0eb' }}>
              <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#323625', width: 220, borderBottom: '1px solid #e5e5e0' }}>Ключ / Key</th>
              {LANGS.map(lang => (
                <th key={lang} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#323625', borderBottom: '1px solid #e5e5e0', minWidth: 200 }}>
                  {lang.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map((key, ri) => {
              const isArray = Array.isArray(getNestedValue(SOURCES[ns]['ru'], key))
              return (
                <tr key={key} style={{ background: ri % 2 === 0 ? '#fff' : '#fafaf8' }}>
                  <td style={{ padding: '8px 12px', color: '#6b7057', fontFamily: 'monospace', fontSize: 11, borderBottom: '1px solid #f0f0eb', verticalAlign: 'top' }}>
                    {key}
                    {isArray && <span style={{ marginLeft: 4, color: '#aaa', fontSize: 10 }}>[array]</span>}
                  </td>
                  {LANGS.map(lang => {
                    const pKey = `${lang}:${ns}:${key}`
                    const val = getCurrentValue(lang, key)
                    const isOverridden = getLoadedOverrides()?.[lang]?.[ns] && getNestedValue(getLoadedOverrides()[lang][ns], key) !== undefined
                    const isPending = pending[pKey] !== undefined
                    return (
                      <td key={lang} style={{ padding: '6px 8px', borderBottom: '1px solid #f0f0eb', verticalAlign: 'top' }}>
                        <textarea
                          value={isPending ? pending[pKey] : val}
                          onChange={e => handleChange(lang, key, e.target.value)}
                          rows={String(val).length > 80 ? 3 : 1}
                          style={{
                            width: '100%',
                            resize: 'vertical',
                            border: `1px solid ${isPending ? '#f0a030' : isOverridden ? '#4a7c40' : '#e0e0db'}`,
                            borderRadius: 4,
                            padding: '5px 7px',
                            fontSize: 12,
                            fontFamily: 'inherit',
                            boxSizing: 'border-box',
                            background: isPending ? '#fffbf0' : isOverridden ? '#f0fff4' : '#fff',
                          }}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ padding: '0 24px 24px', display: 'flex', gap: 16, fontSize: 11, color: '#888' }}>
        <span><span style={{ color: '#f0a030' }}>■</span> Несохранённые изменения</span>
        <span><span style={{ color: '#4a7c40' }}>■</span> Переопределено (сохранено)</span>
        <span>Белый = исходное значение из файла</span>
      </div>
    </div>
  )
}
