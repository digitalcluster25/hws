// WIREFRAME — Home Wood Spa
// Только структура. Без цвета, теней, типографики.

export default function Wireframe() {
  return (
    <div className="bg-white font-mono text-gray-800 min-h-screen">

      {/* NAV */}
      <nav className="border-b border-gray-300 px-8 py-4 flex items-center justify-between">
        <div className="bg-gray-300 h-6 w-40 rounded" />
        <div className="hidden md:flex gap-8">
          {['Услуги','Проекты','Процесс','О нас','Контакты'].map(i => (
            <div key={i} className="bg-gray-200 h-4 w-16 rounded" />
          ))}
        </div>
        <div className="bg-gray-400 h-9 w-44 rounded" />
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 border-b border-gray-300 relative overflow-hidden">
        <div className="bg-gray-200 absolute inset-0 z-0" />
        <div className="relative z-10 max-w-4xl">
          <div className="bg-gray-300 h-3 w-32 rounded mb-6" />
          <div className="space-y-4 mb-8">
            <div className="bg-gray-500 h-10 w-full max-w-3xl rounded" />
            <div className="bg-gray-500 h-10 w-2/3 rounded" />
          </div>
          <div className="space-y-2 mb-10">
            <div className="bg-gray-300 h-4 w-full max-w-2xl rounded" />
            <div className="bg-gray-300 h-4 w-5/6 rounded" />
            <div className="bg-gray-300 h-4 w-3/4 rounded" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="bg-gray-700 h-12 w-64 rounded flex items-center justify-center">
              <span className="text-white text-sm">Записаться на консультацию</span>
            </div>
          </div>
          <div className="bg-gray-300 h-4 w-72 rounded" />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <div className="bg-gray-300 w-full h-full flex items-end justify-start p-4">
            <span className="text-gray-500 text-xs">[IMAGE: Emily Resort главный СПА-зал]</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="border-b border-gray-300 px-8 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '17+', label: 'лет опыта' },
            { num: '300+', label: 'проектов' },
            { num: '4', label: 'страны' },
            { num: 'Под ключ', label: 'доставка' },
          ].map(({ num, label }) => (
            <div key={num} className="flex flex-col items-center gap-2 border border-gray-200 p-6">
              <div className="bg-gray-500 h-8 w-24 rounded" />
              <div className="bg-gray-200 h-3 w-16 rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* КТО МЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
            <div className="space-y-3 mb-6">
              <div className="bg-gray-500 h-8 w-full rounded" />
              <div className="bg-gray-500 h-8 w-4/5 rounded" />
            </div>
            <div className="space-y-2 mb-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-4 w-full rounded" />
              ))}
              <div className="bg-gray-200 h-4 w-3/4 rounded" />
            </div>
            <div className="mt-4 space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-4 w-5/6 rounded" />
              ))}
            </div>
          </div>
          <div className="bg-gray-200 aspect-[4/3] rounded flex items-end p-4">
            <span className="text-gray-400 text-xs">[IMAGE: Emily Resort главный СПА-зал]</span>
          </div>
        </div>
      </section>

      {/* ЭКСПЕРТИЗА */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="space-y-3 mb-4">
            <div className="bg-gray-500 h-8 w-2/3 rounded" />
          </div>
          <div className="bg-gray-300 h-4 w-96 rounded mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Коммерческие СПА-комплексы',
              'Традиционные хаммамы',
              'Термальные впечатления',
            ].map((title) => (
              <div key={title} className="border border-gray-300 p-8 bg-white">
                <div className="bg-gray-300 h-10 w-10 rounded mb-6" />
                <div className="bg-gray-500 h-5 w-4/5 rounded mb-4" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-3 w-full rounded" />
                  ))}
                  <div className="bg-gray-200 h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <div className="border border-gray-400 h-10 w-48 rounded flex items-center justify-center">
              <span className="text-gray-500 text-sm">Изучить наши услуги →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ПРОЕКТЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-4" />
          <div className="space-y-2 mb-12">
            <div className="bg-gray-300 h-4 w-full max-w-xl rounded" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Emily Resort & Spa', loc: 'Львов, Украина | 5★' },
              { title: 'Sadu Hotel & SOP Spa', loc: 'Алматы, Казахстан | Radisson' },
              { title: 'Taze Bay', loc: 'Баку, Азербайджан' },
            ].map(({ title, loc }) => (
              <div key={title} className="border border-gray-200">
                <div className="bg-gray-300 aspect-[4/3] w-full flex items-end p-3">
                  <span className="text-gray-400 text-xs">[IMAGE: {title}]</span>
                </div>
                <div className="p-6">
                  <div className="bg-gray-200 h-3 w-32 rounded mb-3" />
                  <div className="bg-gray-500 h-5 w-4/5 rounded mb-2" />
                  <div className="space-y-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-gray-200 h-3 w-full rounded" />
                    ))}
                  </div>
                  <div className="bg-gray-300 h-4 w-32 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <div className="bg-gray-700 h-10 w-56 rounded flex items-center justify-center">
              <span className="text-white text-sm">Посмотреть портфолио →</span>
            </div>
          </div>
        </div>
      </section>

      {/* ПОД КЛЮЧ — 4 ЭТАПА */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-4" />
          <div className="space-y-2 mb-12">
            <div className="bg-gray-300 h-4 w-full max-w-2xl rounded" />
            <div className="bg-gray-300 h-4 w-3/4 rounded" />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              '1. Исследование и планирование',
              '2. Концепция и дизайн',
              '3. Строительство и установка',
              '4. Запуск и поддержка',
            ].map((step) => (
              <div key={step} className="bg-white border border-gray-200 p-6">
                <div className="bg-gray-400 h-8 w-8 rounded-full mb-4" />
                <div className="bg-gray-500 h-4 w-full rounded mb-4" />
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-gray-300 h-2 w-2 rounded-full shrink-0" />
                      <div className="bg-gray-200 h-3 w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 border border-gray-300 p-6 max-w-2xl mx-auto text-center">
            <div className="space-y-2 mb-4">
              <div className="bg-gray-300 h-4 w-full rounded mx-auto" />
              <div className="bg-gray-300 h-4 w-4/5 rounded mx-auto" />
            </div>
            <div className="border border-gray-400 h-10 w-48 rounded mx-auto flex items-center justify-center">
              <span className="text-gray-500 text-sm">Узнать о нашем процессе</span>
            </div>
          </div>
        </div>
      </section>

      {/* МАТЕРИАЛЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { mat: 'Канадский кедр', img: '[IMAGE: кедровые доски]' },
              { mat: 'Гималайская соль', img: '[IMAGE: соляные блоки]' },
              { mat: 'Мрамор Calacatta', img: '[IMAGE: мраморные плиты]' },
            ].map(({ mat, img }) => (
              <div key={mat} className="border border-gray-200">
                <div className="bg-gray-300 aspect-square w-full flex items-end p-3">
                  <span className="text-gray-400 text-xs">{img}</span>
                </div>
                <div className="p-6">
                  <div className="bg-gray-500 h-5 w-3/4 rounded mb-3" />
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="bg-gray-200 h-3 w-full rounded" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-2 max-w-2xl">
            <div className="bg-gray-200 h-4 w-full rounded" />
            <div className="bg-gray-200 h-4 w-4/5 rounded" />
          </div>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-12" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Отели и курорты',
              'Wellness-центры',
              'Luxury резиденции',
              'Корпоративные объекты',
            ].map((segment) => (
              <div key={segment} className="border border-gray-200 p-8 bg-white flex gap-6 items-start">
                <div className="bg-gray-300 h-12 w-12 rounded shrink-0" />
                <div className="flex-1">
                  <div className="bg-gray-500 h-5 w-3/5 rounded mb-3" />
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="bg-gray-200 h-3 w-full rounded" />
                    ))}
                    <div className="bg-gray-200 h-3 w-2/3 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ HWS */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-12" />
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-gray-400 h-5 w-5 rounded shrink-0" />
                <div className="bg-gray-200 h-4 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КАРТА / МЕЖДУНАРОДНОЕ ПОРТФОЛИО */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-4" />
          <div className="bg-gray-300 h-4 w-96 rounded mb-12" />
          <div className="bg-gray-200 w-full aspect-[16/7] rounded flex items-center justify-center relative">
            <span className="text-gray-400 text-sm">[MAP: интерактивная карта с метками — UA / AZ / KZ / PT / расширение: USA]</span>
            {[
              { label: 'Украина', x: '38%', y: '30%' },
              { label: 'Азербайджан', x: '55%', y: '38%' },
              { label: 'Казахстан', x: '68%', y: '30%' },
              { label: 'Португалия', x: '18%', y: '35%' },
            ].map(({ label, x, y }) => (
              <div
                key={label}
                className="absolute"
                style={{ left: x, top: y }}
              >
                <div className="bg-gray-500 h-3 w-3 rounded-full" />
                <span className="text-gray-500 text-xs whitespace-nowrap">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-2 max-w-xl">
            <div className="bg-gray-200 h-4 w-full rounded" />
            <div className="bg-gray-200 h-4 w-4/5 rounded" />
          </div>
        </div>
      </section>

      {/* ОТЗЫВЫ */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 h-3 w-24 rounded mb-6" />
          <div className="bg-gray-500 h-8 w-2/3 rounded mb-12" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Управление Emily Resort',
              'Taze Bay Historic Baths, Баку',
              'Sadu Hotel & Radisson Individuals',
            ].map((author) => (
              <div key={author} className="border border-gray-200 p-8">
                <div className="bg-gray-300 h-4 w-6 rounded mb-4" />
                <div className="space-y-2 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-3 w-full rounded" />
                  ))}
                  <div className="bg-gray-200 h-3 w-3/4 rounded" />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="bg-gray-400 h-3 w-40 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФИНАЛЬНЫЙ CTA */}
      <section className="border-b border-gray-300 px-8 md:px-16 py-24 bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gray-600 h-3 w-24 rounded mx-auto mb-6" />
          <div className="space-y-3 mb-6">
            <div className="bg-gray-400 h-8 w-full rounded mx-auto" />
            <div className="bg-gray-400 h-8 w-4/5 rounded mx-auto" />
          </div>
          <div className="space-y-2 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-600 h-4 w-full rounded mx-auto" />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-gray-200 h-12 w-64 rounded flex items-center justify-center">
              <span className="text-gray-800 text-sm">Записаться на консультацию</span>
            </div>
            <div className="border border-gray-500 h-12 w-52 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">Скачать портфолио [PDF]</span>
            </div>
          </div>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="px-8 md:px-16 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="bg-gray-400 h-6 w-36 rounded mb-4" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-3 w-full rounded" />
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {['Homewoodspa@gmail.com', '+1 (678) 520-9556', '+1 (470) 760-9323'].map((c) => (
                <div key={c} className="bg-gray-200 h-3 w-40 rounded" />
              ))}
            </div>
          </div>
          {['Услуги', 'Проекты', 'Портфолио'].map((col) => (
            <div key={col}>
              <div className="bg-gray-400 h-4 w-24 rounded mb-4" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-3 w-32 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 flex justify-between">
          <div className="bg-gray-200 h-3 w-48 rounded" />
          <div className="bg-gray-200 h-3 w-32 rounded" />
        </div>
      </footer>

    </div>
  )
}
