import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Button from '../components/ui/Button'

const C = { dark:'#323625', mid:'#A2AC89', light:'#B5BD9A', terra:'#CB8268', muted:'#6b7057' }
const wrap = { maxWidth:'1344px', margin:'0 auto' }
const px   = { paddingLeft:'max(1.5vw,16px)', paddingRight:'max(1.5vw,16px)' }

const fadeUp = { hidden:{ opacity:0, y:32 }, show:{ opacity:1, y:0, transition:{ duration:0.6, ease:[0.16,1,0.3,1] } } }
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } }

const IcoPhone = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.13 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
)
const IcoMail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IcoPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const IcoWhatsapp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const contacts = [
  { Icon: IcoPhone,    label: 'Телефон',  value: '+1 (678) 520-9556',     href: 'tel:+16785209556',              note: 'Пн–Пт, 9:00–18:00 EST' },
  { Icon: IcoWhatsapp, label: 'WhatsApp', value: '+1 (678) 520-9556',     href: 'https://wa.me/16785209556',     note: 'Ответим в течение часа' },
  { Icon: IcoMail,     label: 'Email',    value: 'homewoodspa@gmail.com', href: 'mailto:homewoodspa@gmail.com',  note: 'Для проектных запросов' },
  { Icon: IcoPin,      label: 'Офис',     value: 'Atlanta, Georgia, USA', href: null,                            note: 'Работаем по всему миру' },
]

function ContactCard({ Icon, label, value, href, note }) {
  const inner = (
    <motion.div variants={fadeUp} className="contact-card">
      <div className="contact-card__icon"><Icon /></div>
      <div>
        <p className="contact-card__label">{label}</p>
        <p className="contact-card__value">{value}</p>
        <p className="contact-card__note">{note}</p>
      </div>
      {href && <div className="contact-card__arrow">→</div>}
    </motion.div>
  )
  return href
    ? <a href={href} style={{ textDecoration:'none', display:'block' }} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{inner}</a>
    : inner
}

function ContactForm() {
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm()
  const [sent, setSent] = useState(false)

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 800))
    console.log('Contact form:', data)
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }} noValidate>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.1rem' }} className="grid-cols-1 sm:grid-cols-2">
        <div>
          <label className="hws-field-label">Имя *</label>
          <input
            {...register('name', { required: true })}
            placeholder="Ваше имя"
            className={`hws-field${errors.name ? ' hws-field--error' : ''}`}
          />
        </div>
        <div>
          <label className="hws-field-label">Email *</label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
            type="email"
            placeholder="your@email.com"
            className={`hws-field${errors.email ? ' hws-field--error' : ''}`}
          />
        </div>
      </div>

      <div>
        <label className="hws-field-label">Телефон</label>
        <input {...register('phone')} type="tel" placeholder="+1 (___) ___-____" className="hws-field" />
      </div>

      <div>
        <label className="hws-field-label">Тип объекта</label>
        <select {...register('subject')} className="hws-field" style={{ appearance:'none' }}>
          <option value="">— Выберите —</option>
          <option>СПА-комплекс для отеля</option>
          <option>Хаммам</option>
          <option>Финская сауна</option>
          <option>Частная резиденция</option>
          <option>Консалтинг / Концепция</option>
          <option>Другое</option>
        </select>
      </div>

      <div>
        <label className="hws-field-label">Сообщение *</label>
        <textarea
          {...register('message', { required: true })}
          rows={5}
          placeholder="Расскажите о вашем проекте: локация, масштаб, сроки..."
          className={`hws-field${errors.message ? ' hws-field--error' : ''}`}
          style={{ resize:'vertical' }}
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Button type="submit" disabled={isSubmitting} variant="filled" shadow={false}>
          {isSubmitting ? 'Отправляем...' : 'Отправить запрос'}
        </Button>
        {sent && <p className="hws-small tc-mid font-medium">✓ Запрос отправлен — свяжемся в течение 24 часов</p>}
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <div className="min-h-screen tc-dark">

      {/* HERO */}
      <section style={{ background: C.light, ...px, paddingTop:'10rem', paddingBottom:'5rem' }}>
        <div style={wrap}>
          <Link to="/" className="hws-back-link">← Главная</Link>
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="hws-label hws-label-muted mb-5">Контакты</motion.p>
            <motion.h1 variants={fadeUp} className="hws-page-h1 mb-6">
              Давайте<br/>обсудим проект
            </motion.h1>
            <motion.p variants={fadeUp} className="hws-body tc-subtle" style={{ maxWidth:'520px' }}>
              Оставьте заявку — мы свяжемся в течение 24 часов и предложим предварительную концепцию бесплатно.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background:'#f8f8f5', ...px, paddingTop:'5rem', paddingBottom:'6rem' }}>
        <div style={{ ...wrap, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' }}
          className="grid-cols-1 lg:grid-cols-2">

          {/* LEFT */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}>
            <motion.p variants={fadeUp} className="hws-label hws-label-muted mb-4">Как связаться</motion.p>
            <motion.h2 variants={fadeUp} className="hws-contact-h2 mb-8">
              Мы на связи<br/>для вашего проекта
            </motion.h2>
            <motion.p variants={fadeUp} className="hws-body tc-subtle mb-10" style={{ maxWidth:'400px' }}>
              17 лет опыта в wellness-строительстве. Работаем с отелями, курортами и частными заказчиками по всему миру.
            </motion.p>
            <div style={{ display:'flex', flexDirection:'column', gap:'1px', background:'#e5e7e0' }}>
              {contacts.map((c) => <ContactCard key={c.label} {...c} />)}
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.65, ease:[0.16,1,0.3,1], delay:0.15 }}
            style={{ background:'#fff', padding:'clamp(1.5rem,4vw,3rem)', boxShadow:'0 0 0 1px #e5e7e0, 0 8px 40px rgba(50,54,37,0.07)' }}
          >
            <h3 className="hws-h3 tc-dark mb-2">Запрос на консультацию</h3>
            <p className="hws-small tc-subtle mb-8">Заполните форму — это займёт 2 минуты</p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* BOTTOM STRIP */}
      <section style={{ background: C.dark, ...px, paddingTop:'3rem', paddingBottom:'3rem' }}>
        <div style={{ ...wrap, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1.5rem' }}>
          <div>
            <p className="bottom-strip-label">Время ответа</p>
            <p className="bottom-strip-value">В течение 24 часов в рабочие дни</p>
          </div>
          <div>
            <p className="bottom-strip-label">Языки</p>
            <p className="bottom-strip-value">Русский · English · Türkçe</p>
          </div>
          <div>
            <p className="bottom-strip-label">Первый шаг</p>
            <p className="bottom-strip-value">Бесплатная консультация</p>
          </div>
          <Button href="mailto:homewoodspa@gmail.com" variant="outlined-light" shadow={false}>
            homewoodspa@gmail.com
          </Button>
        </div>
      </section>
    </div>
  )
}
