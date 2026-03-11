// Хелпер: генерирует массив путей к фото по папке
// entries: массив [номер, расширение]
function ph(folder, entries) {
  return entries.map(([n, ext]) => `/cases/${folder}/${n}.${ext}`)
}

// emilyresort: 1-24 JPG
const emilyPhotos = ph('emilyresort', Array.from({length:24}, (_,i) => [i+1, 'JPG']))

// gaisin: 1-10 JPG
const gaisinPhotos = ph('gaisin', Array.from({length:10}, (_,i) => [i+1, 'JPG']))

// 4elements: 1-3 JPG
const elementsPhotos = ph('4elements', Array.from({length:3}, (_,i) => [i+1, 'JPG']))

// vosparenie: смешанные расширения
const vospaреniePhotos = ph('vosparenie', [
  [1,'WEBP'],[2,'JPG'],[3,'WEBP'],[4,'WEBP'],[5,'WEBP'],[6,'WEBP'],[7,'WEBP'],
  [8,'JPG'],[9,'WEBP'],[10,'JPG'],[11,'WEBP'],[12,'WEBP'],[13,'WEBP'],[14,'WEBP'],
  [15,'WEBP'],[16,'WEBP'],[17,'WEBP'],[18,'WEBP'],[19,'JPG'],[20,'JPG'],
  [21,'JPG'],[22,'JPG'],[23,'JPG'],[24,'WEBP'],[25,'WEBP'],[26,'JPG'],
])

export const projects = [
  {
    slug: 'emily-resort',
    title: 'Emily Resort',
    loc: 'Турция', year: '2022',
    type: 'Коммерческий СПА',
    tags: ['Хаммам', 'Сауна', 'Термальный контур'],
    desc: '12 уникальных термальных зон, аутентичный хаммам, 4 сауны, купели и полноценный wellness-маршрут для отеля 5★.',
    featured: true,
    cover: '/cases/emilyresort/cover.JPG',
    photos: emilyPhotos,
    client: 'Emily Resort Group',
    period: '2021–2022',
    area: '1 840 м²',
    quote: 'Термальный маршрут стал главным конкурентным преимуществом курорта — гости возвращаются ради него.',
    p1: 'Проект начинался с нуля: ни одной wellness-зоны в существующем корпусе. Совместно с архитекторами мы разработали планировку, которая ведёт гостя по единому термальному маршруту — от разогрева к релаксу — без лишних решений и навигации.',
    p2: 'Хаммам построен по традиционной османской технологии парообразования: мраморный нагрев пола, точный контроль влажности, аутентичная мозаика ручной работы. Рядом — четыре сауны с разными температурными режимами и купели с термальным контуром.',
    p3: 'Отель получил wellness-направление, которое сегодня формирует до 30% повторных бронирований. Гость, прошедший весь маршрут однажды, планирует следующий визит ещё до отъезда.',
  },
  {
    slug: 'gaisin',
    title: 'Gaisin',
    loc: '—', year: '—',
    type: '—',
    tags: [],
    desc: '[ТРЕБУЕТСЯ ОПИСАНИЕ]',
    featured: true,
    cover: '/cases/gaisin/cover.JPG',
    photos: gaisinPhotos,
    client: '[ТРЕБУЕТСЯ]',
    period: '[ТРЕБУЕТСЯ]',
    area: '[ТРЕБУЕТСЯ]',
    quote: '[ТРЕБУЕТСЯ ЦИТАТА]',
    p1: '[ТРЕБУЕТСЯ ТЕКСТ]',
    p2: '[ТРЕБУЕТСЯ ТЕКСТ]',
    p3: '[ТРЕБУЕТСЯ ТЕКСТ]',
  },
  {
    slug: '4elements',
    title: '4 Elements',
    loc: '—', year: '—',
    type: '—',
    tags: [],
    desc: '[ТРЕБУЕТСЯ ОПИСАНИЕ]',
    featured: true,
    cover: '/cases/4elements/cover.JPG',
    photos: elementsPhotos,
    client: '[ТРЕБУЕТСЯ]',
    period: '[ТРЕБУЕТСЯ]',
    area: '[ТРЕБУЕТСЯ]',
    quote: '[ТРЕБУЕТСЯ ЦИТАТА]',
    p1: '[ТРЕБУЕТСЯ ТЕКСТ]',
    p2: '[ТРЕБУЕТСЯ ТЕКСТ]',
    p3: '[ТРЕБУЕТСЯ ТЕКСТ]',
  },
  {
    slug: 'vosparenie',
    title: 'Восхождение',
    loc: '—', year: '—',
    type: '—',
    tags: [],
    desc: '[ТРЕБУЕТСЯ ОПИСАНИЕ]',
    featured: true,
    cover: '/cases/vosparenie/cover.WEBP',
    photos: vospaреniePhotos,
    client: '[ТРЕБУЕТСЯ]',
    period: '[ТРЕБУЕТСЯ]',
    area: '[ТРЕБУЕТСЯ]',
    quote: '[ТРЕБУЕТСЯ ЦИТАТА]',
    p1: '[ТРЕБУЕТСЯ ТЕКСТ]',
    p2: '[ТРЕБУЕТСЯ ТЕКСТ]',
    p3: '[ТРЕБУЕТСЯ ТЕКСТ]',
  },
]
