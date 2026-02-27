import Nav from './components/layout/Nav'

export default function App() {
  return (
    <div>
      <Nav />
      {/* Тест: высокая страница чтобы проверить scroll-эффект */}
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #3d3d3d 100%)' }}
      >
        <p className="font-display text-white text-sm tracking-widest uppercase opacity-40">
          Hero section — coming next
        </p>
      </div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="font-sans text-gray-400 text-sm">
          Scroll down — nav becomes white
        </p>
      </div>
    </div>
  )
}
