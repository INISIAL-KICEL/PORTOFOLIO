import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion'
import {
  Moon, Sun, MapPin, Phone, Github, Instagram,
  Linkedin, ArrowRight, ArrowUpRight, Video, Shield,
  Code, Menu, X, Award, Users, GraduationCap,
} from 'lucide-react'
import fotoGue from './aset/gambar/foto-saya.png'
import logoNeokasir from './aset/logos/neokasir.png'
import logoMitsubishi from './aset/logos/mitsubishi.svg'
import logoMasjid from './aset/logos/masjid.png'
import logoSarvanet from './aset/logos/sarvanet.png'
import logoHistoris from './aset/logos/historis.png'
import logoRangkai from './aset/logos/rangkainalar.png'
import logoSbd from './aset/logos/sbd.png'
import logoRealtone from './aset/logos/realtone.png'
import logoIkaman from './aset/logos/ikaman.png'
import logoSdiu from './aset/logos/sdiu.png'
import shotNeokasir from './aset/projects/neokasir.jpg'
import shotMitsubishi from './aset/projects/mitsubishi.jpg'
import shotBloomine from './aset/projects/bloomine.jpg'
import shotHmps from './aset/projects/hmps.jpg'

// ─── Motion ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reveal: any = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

// ─── Data ──────────────────────────────────────────────────────────────────
const experiences = [
  {
    role: 'Founder & Owner', company: 'Historis Kita', type: 'Part-time', period: '2023 — Sekarang',
    desc: 'Rumah produksi visual fokus sinematografi pernikahan. Mengelola pipeline penuh dari pra-produksi hingga color grading.',
    icon: <Video size={16} />, tags: ['Premiere Pro', 'Sinematografi', 'Color Grade'],
  },
  {
    role: 'Founder & IT Consultant', company: 'SarvaNet.id', type: 'Founder', period: '2025 — Sekarang',
    desc: 'Konsultasi internet & strategi penerapan jaringan. Merancang topologi berbasis Cisco untuk klien institusi/kampus.',
    icon: <Shield size={16} />, tags: ['Cisco', 'Network Deployment', 'IT Consulting'],
  },
  {
    role: 'AI Video Editor', company: 'Dalang.io', type: 'Contract', period: '2025',
    desc: 'Pengeditan video berbasis AI dan inisiatif digital marketing untuk konten skala besar dengan efisiensi tinggi.',
    icon: <Code size={16} />, tags: ['AI Tools', 'Premiere Pro', 'Digital Marketing'],
  },
  {
    role: 'Asisten Praktikum Fisika', company: 'FST · UIN SMH Banten', type: 'Kampus', period: '2025',
    desc: 'Mendampingi praktikum Fisika Dasar mahasiswa FST — membimbing eksperimen dan analisis laboratorium.',
    icon: <Users size={16} />, tags: ['Asistensi', 'Lab', 'Fisika'],
  },
]

const certifications = [
  {
    year: '2026', items: [
      { title: 'Securing CI/CD: SAST & Secrets Scanning', issuer: 'PT ITSEC Asia Tbk' },
      { title: 'AI Solution Workshop: End-to-End AI Model', issuer: 'Microsoft' },
      { title: 'Security Gaps di Era AI-Driven', issuer: 'DomaiNesia' },
      { title: 'Badan Ekraf Digital Talent 2026', issuer: 'BEKRAF' },
      { title: 'Belajar Prinsip Pemrograman SOLID', issuer: 'Dicoding Indonesia' },
      { title: 'Memulai Pemrograman Dengan Java', issuer: 'Dicoding Indonesia' },
      { title: 'Pemrograman Dart Dasar', issuer: 'ID-Networkers (IDN.ID)' },
      { title: 'Basic Mikrotik & Computer Network', issuer: 'ID-Networkers (IDN.ID)' },
    ],
  },
  {
    year: '2025', items: [
      { title: 'X3F Cybersecurity Bootcamp', issuer: 'Institut Teknologi Indonesia' },
      { title: 'Cyber Security Bootcamp', issuer: 'ID-Networkers (IDN.ID)' },
      { title: 'Webinar Cyber Security & Ethical Hacking', issuer: 'Inst. Tek. Tangerang Selatan' },
      { title: 'Ethical Hacker For Dummies', issuer: 'Digital Talent Scholarship' },
      { title: 'Introduction to Cloud Computing', issuer: 'Digital Talent Scholarship' },
      { title: 'Basic Cisco Certificate', issuer: 'ID-Networkers (IDN.ID)' },
      { title: 'Network Simulation with PNETLab', issuer: 'ID-Networkers (IDN.ID)' },
      { title: 'Dicoding Developer Conference', issuer: 'Dicoding Indonesia' },
    ],
  },
  {
    year: '2024', items: [
      { title: 'Generative AI untuk Pendidikan (Micro Skill)', issuer: 'Digital Talent Scholarship' },
    ],
  },
]

const awards = [
  { title: 'Pramuka Garuda', issuer: 'Tanda Kecakapan · Kwarcab Pandeglang', date: '2023' },
  { title: 'Juara 1 & Favorit Fotografi', issuer: 'TGC In Action · IPB University', date: '2023' },
  { title: 'Juara 1 Fotografi', issuer: 'Communication Festival · HMPS KPI UIN', date: '2024' },
  { title: 'Favorite Winner Photography', issuer: 'ESA Festival · Untirta', date: '2022' },
]

const organizations = [
  { role: 'Bidang Ekonomi, UMKM & Startup', org: 'HIPMI PT DPD Banten', period: '2026 — Sekarang', current: true },
  { role: 'Ketua Departemen Eksternal', org: 'HMPS Informatika · UIN SMH Banten', period: '2026 — Sekarang', current: true },
  { role: 'Ketua Pelaksana', org: 'Mapansa Expo Campus 2026 · IKA-MAN', period: '2026', current: false },
  { role: 'Koordinator Multimedia', org: 'IREMA Masjid Agung Ar-Rahman', period: '2024 — Sekarang', current: true },
  { role: 'Anggota Saka Widya Budaya', org: 'Dinas Pendidikan Kab. Pandeglang', period: '2023 — 2025', current: false },
  { role: 'Ketua Dewan Ambalan Putra', org: 'KH Agus Salim · MAN 1 Pandeglang', period: '2022 — 2023', current: false },
  { role: 'Bendahara 2', org: 'Dewan Penggalang · MTsN 1 Pandeglang', period: '2019 — 2020', current: false },
]

const publications = [
  {
    title: 'Analisis Keamanan Sistem Autentikasi Biometrik Iris Menggunakan Metode Cancelable Biometrics untuk Perlindungan Template',
    venue: 'JATI — Jurnal Mahasiswa Teknik Informatika (ITN Malang)',
    detail: 'Vol. 10 No. 2 (2026)',
    date: 'Maret 2026',
    doi: '10.36040/jati.v10i2.17234',
    url: 'https://doi.org/10.36040/jati.v10i2.17234',
    authors: ['Intan Nur Janah', 'Adila Muqtashida', 'Putri Dwi Manggali', 'Muhammad Rifki Hidayatullah', 'Muhammad Fadhil Dwisaputra', 'Ibnu Mas’ud'],
    extra: '',
    license: 'e-ISSN 2598-828X',
    role: 'Co-Author',
  },
  {
    title: 'Studi Sistem Input/Output: Perangkat, Interface, dan Optimalisasi Kinerja Komputer',
    venue: 'Jurnal Riset Multidisiplin Edukasi (JURMIE)',
    detail: 'Vol. 2 No. 6 · hlm. 363–369',
    date: 'Juni 2025',
    doi: '10.71282/jurmie.v2i6.451',
    url: 'https://doi.org/10.71282/jurmie.v2i6.451',
    authors: ['Muhammad Rifki Hidayatulloh', 'Fierren Al-Hilal Saepul Bahri', 'Adila Muqtashida', 'Rio Gunawan'],
    extra: '+1 penulis',
    license: 'CC BY-SA 4.0',
    role: 'Penulis Pertama',
  },
]

const projects = [
  { id: '01', category: 'Web · POS System', title: 'NeoKasir', description: 'Aplikasi kasir pintar multi-toko — kelola penjualan, stok, hutang, hingga pengiriman dalam satu dashboard.', tags: ['Node.js', 'MySQL', 'Dashboard'], url: 'https://neokasir.realtone.id', img: shotNeokasir },
  { id: '02', category: 'Web · Company Profile', title: 'Mitsubishi Dipo Serang', description: 'Company profile & katalog dealer resmi Mitsubishi Serang–Cilegon, lengkap dengan simulasi & test drive.', tags: ['Company Profile', 'Responsive', 'SEO'], url: 'https://mitsubishiserang.web.app', img: shotMitsubishi },
  { id: '03', category: 'Web · E-Commerce', title: 'Bloomine Florist', description: 'Toko bunga & buket online premium dengan katalog, testimoni, dan pemesanan same-day delivery.', tags: ['E-Commerce', 'React', 'Tailwind'], url: 'https://bloomineflorist.web.app', img: shotBloomine },
  { id: '04', category: 'Web · System', title: 'Sistem Rekrutmen HMPS', description: 'Aplikasi rekrutmen pengurus HMPS Informatika — jadwal wawancara, cek status seleksi, dan panel admin.', tags: ['Web App', 'Auth', 'Dashboard'], url: 'https://hmps-348a3.web.app', img: shotHmps },
]

const clients = [
  { name: 'NeoKasir', logo: logoNeokasir, tag: 'Web Development' },
  { name: 'Mitsubishi Depo Serang', logo: logoMitsubishi, tag: 'Company Profile' },
  { name: 'IREMA Masjid Agung', logo: logoMasjid, tag: 'Multimedia' },
  { name: 'SarvaNet.id', logo: logoSarvanet, tag: 'Founder' },
  { name: 'Historis Kita', logo: logoHistoris, tag: 'Founder' },
  { name: 'Rangkai Nalar', logo: logoRangkai, tag: 'Kolaborasi' },
  { name: 'Sharing Bisnis Digital', logo: logoSbd, tag: 'Kolaborasi' },
  { name: 'realtone.id', logo: logoRealtone, tag: 'Kolaborasi' },
  { name: 'IKA-MAN Pandeglang', logo: logoIkaman, tag: 'Organisasi' },
  { name: 'SDIU Cahaya Al-Fatih', logo: logoSdiu, tag: 'Klien' },
]

const SOCIALS = [
  { icon: <Github size={16} />, href: 'https://github.com/INISIAL-KICEL', label: 'GitHub' },
  { icon: <Instagram size={16} />, href: 'https://www.instagram.com/mhmmdrifkih/', label: 'Instagram' },
  { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/muhammad-rifki-hidayatulloh-7250782bb/', label: 'LinkedIn' },
  { icon: <GraduationCap size={16} />, href: 'https://scholar.google.com/citations?hl=id&user=ofLBnP8AAAAJ', label: 'Google Scholar' },
]

// ─── Theme helper ─────────────────────────────────────────────────────────────
const T = (dark: boolean) => ({
  bg: dark ? 'bg-[#0B0B0B]' : 'bg-[#FAF9F6]',
  text: dark ? 'text-neutral-100' : 'text-neutral-900',
  muted: dark ? 'text-neutral-400' : 'text-neutral-500',
  faint: dark ? 'text-neutral-600' : 'text-neutral-400',
  border: dark ? 'border-white/10' : 'border-black/10',
  hover: dark ? 'hover:bg-white/[0.03]' : 'hover:bg-black/[0.02]',
})

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-lime origin-left z-[60]" />
}

function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const target = parseInt(value.replace(/\D/g, '')) || 0
  const suffix = value.replace(/[0-9]/g, '')
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = 1000, t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])
  return <span ref={ref} className={className}>{n}{suffix}</span>
}

function SectionHead({ n, label, title, dark }: { n: string; label: string; title: string; dark: boolean }) {
  const t = T(dark)
  return (
    <div className="mb-12 md:mb-16">
      <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`flex items-center gap-3 mb-5 font-mono text-xs ${t.muted}`}>
        <span className="text-lime">{n}</span>
        <span className="tracking-[0.15em] uppercase">{label}</span>
      </motion.div>
      <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className={`text-3xl md:text-[2.7rem] font-semibold tracking-tight ${t.text}`}>
        {title}
      </motion.h2>
    </div>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = T(dark)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const nav = [
    { label: 'About', href: '#about' }, { label: 'Work', href: '#experience' },
    { label: 'Certs', href: '#certifications' }, { label: 'Papers', href: '#publications' },
    { label: 'Org', href: '#organizations' }, { label: 'Projects', href: '#projects' },
  ]
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? `${dark ? 'bg-[#0B0B0B]/80' : 'bg-[#FAF9F6]/80'} backdrop-blur border-b ${t.border}` : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#home" className={`text-sm font-semibold tracking-tight ${t.text}`}>MRH<span className="text-lime">.</span></a>
        <nav className="hidden md:flex items-center gap-7">
          {nav.map((it) => (
            <a key={it.label} href={it.href} className={`group relative text-sm transition-colors hover:text-lime ${t.muted}`}>
              {it.label}
              <span className="absolute -bottom-1 left-0 h-px w-full bg-lime origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleDark} aria-label="Toggle theme" className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${dark ? 'text-neutral-300 hover:bg-white/10' : 'text-neutral-600 hover:bg-black/5'}`}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a href="#contact" className={`hidden md:inline-flex items-center gap-1.5 px-4 h-9 rounded-full text-sm font-medium transition-colors ${dark ? 'bg-white text-black hover:bg-lime' : 'bg-black text-white hover:bg-lime hover:text-black'}`}>Kontak</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden w-9 h-9 flex items-center justify-center ${t.text}`}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className={`md:hidden overflow-hidden border-t ${t.border} ${dark ? 'bg-[#0B0B0B]' : 'bg-[#FAF9F6]'}`}>
            <div className="px-5 py-4 flex flex-col gap-3">
              {nav.map((it) => <a key={it.label} href={it.href} onClick={() => setMenuOpen(false)} className={`text-sm ${t.muted}`}>{it.label}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <section id="home" className={`relative ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`inline-flex items-center gap-2 text-xs font-mono mb-8 ${t.muted}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" /> Available for work — 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className={`text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-tight ${t.text}`}>
              Muhammad Rifki<br /><span className={t.faint}>Hidayatulloh</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className={`mt-6 text-base md:text-lg leading-relaxed max-w-md ${t.muted}`}>
              Videographer, praktisi cybersecurity & jaringan, dan web developer. Mahasiswa Informatika UIN di Pandeglang, Banten.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className={`group inline-flex items-center gap-2 px-5 h-11 rounded-full text-sm font-medium transition-all hover:scale-[1.03] active:scale-95 ${dark ? 'bg-white text-black hover:bg-lime' : 'bg-black text-white hover:bg-lime hover:text-black'}`}>
                Lihat Karya <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="#contact" className={`inline-flex items-center px-5 h-11 rounded-full text-sm font-medium border transition-all hover:scale-[1.03] active:scale-95 ${t.border} ${t.text} hover:border-lime`}>Hubungi Saya</a>
              <div className="flex items-center gap-1 ml-1">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${t.muted} hover:text-lime`}>{s.icon}</a>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="justify-self-center md:justify-self-end">
            <div className={`w-44 md:w-52 rounded-2xl overflow-hidden border ${t.border}`}>
              <img src={fotoGue} alt="Muhammad Rifki Hidayatulloh" className="w-full object-cover object-top grayscale" loading="eager" />
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className={`mt-16 pt-8 border-t ${t.border} flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs ${t.faint}`}>
          <span>Wedding Film</span><span>Cybersecurity</span><span>Network Engineering</span><span>Web Development</span><span>Photography</span>
        </motion.div>
      </div>
    </section>
  )
}

// ─── About ──────────────────────────────────────────────────────────────────
function About({ dark }: { dark: boolean }) {
  const t = T(dark)
  const skills = [
    { label: 'Videography & Color', level: 90 }, { label: 'Editing / Premiere Pro', level: 87 },
    { label: 'Networking (Cisco/Mikrotik)', level: 74 }, { label: 'Web Development', level: 74 },
    { label: 'Cybersecurity / CTF', level: 68 },
  ]
  const stats = [{ v: '30+', l: 'Pernikahan' }, { v: '18+', l: 'Sertifikasi' }, { v: '7+', l: 'Organisasi' }, { v: '04', l: 'Penghargaan' }]
  return (
    <section id="about" className={`py-24 md:py-32 ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead n="01" label="About" title="Tentang saya" dark={dark} />
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`text-base leading-relaxed mb-4 ${t.muted}`}>
              Saya Muhammad Rifki Hidayatulloh — mahasiswa Informatika UIN di Pandeglang. Di satu sisi merekam momen pernikahan dengan sentuhan sinematik, di sisi lain mendalami cybersecurity & jaringan komputer.
            </motion.p>
            <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className={`text-base leading-relaxed ${t.muted}`}>
              Perpaduan ini membuat saya mendekati masalah dari banyak sudut: kreativitas filmmaker, presisi developer, dan mindset analitis security researcher.
            </motion.p>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-4 gap-4 mt-10">
              {stats.map((s) => (
                <motion.div key={s.l} variants={reveal}>
                  <CountUp value={s.v} className={`text-2xl md:text-3xl font-semibold ${t.text}`} />
                  <div className={`text-[11px] mt-1 ${t.faint}`}>{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="space-y-5">
            {skills.map((sk, i) => (
              <motion.div key={sk.label} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${t.text}`}>{sk.label}</span>
                  <span className={`text-sm ${t.faint}`}>{sk.level}%</span>
                </div>
                <div className={`h-1 rounded-full ${dark ? 'bg-white/10' : 'bg-black/10'}`}>
                  <motion.div className="h-1 rounded-full bg-lime" initial={{ width: 0 }} whileInView={{ width: `${sk.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Experience ─────────────────────────────────────────────────────────────
function WorkExperience({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <section id="experience" className={`py-24 md:py-32 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead n="02" label="Experience" title="Pengalaman" dark={dark} />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {experiences.map((exp, i) => (
            <motion.div key={exp.company} variants={reveal} className={`grid md:grid-cols-[1fr_2fr] gap-2 md:gap-10 py-7 ${i > 0 ? `border-t ${t.border}` : ''}`}>
              <div>
                <div className={`flex items-center gap-2 ${t.text}`}>
                  <span className={t.faint}>{exp.icon}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{exp.role}</h3>
                </div>
                <p className={`text-sm mt-1 ${t.muted}`}>{exp.company}</p>
                <p className={`font-mono text-xs mt-1 ${t.faint}`}>{exp.period} · {exp.type}</p>
              </div>
              <div>
                <p className={`text-sm leading-relaxed mb-3 ${t.muted}`}>{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => <span key={tag} className={`text-xs px-2.5 py-1 rounded-full ${dark ? 'bg-white/5 text-neutral-400' : 'bg-black/5 text-neutral-500'}`}>{tag}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Certifications + Awards ─────────────────────────────────────────────────
function Certifications({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <section id="certifications" className={`py-24 md:py-32 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead n="03" label="Licenses & Awards" title="Sertifikasi & penghargaan" dark={dark} />

        {/* Awards */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-x-10 gap-y-4 mb-14">
          {awards.map((a, i) => (
            <motion.div key={i} variants={reveal} className={`flex items-start gap-3 pb-4 border-b ${t.border}`}>
              <Award size={15} className="text-lime shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`text-sm font-medium ${t.text}`}>{a.title}</p>
                  <span className={`font-mono text-xs ${t.faint}`}>{a.date}</span>
                </div>
                <p className={`text-xs mt-0.5 ${t.muted}`}>{a.issuer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certs */}
        <div className="space-y-10">
          {certifications.map((group) => (
            <div key={group.year} className="grid md:grid-cols-[80px_1fr] gap-3 md:gap-8">
              <div className={`font-mono text-sm ${t.faint}`}>{group.year}</div>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-x-10 gap-y-0">
                {group.items.map((c, i) => (
                  <motion.div key={i} variants={reveal} className={`py-3 border-b ${t.border}`}>
                    <p className={`text-sm ${t.text}`}>{c.title}</p>
                    <p className={`text-xs mt-0.5 ${t.faint}`}>{c.issuer}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Publications ───────────────────────────────────────────────────────────
function Publications({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <section id="publications" className={`py-24 md:py-32 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead n="04" label="Research" title="Publikasi ilmiah" dark={dark} />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          {publications.map((p, i) => (
            <motion.a key={i} href={p.url} target="_blank" rel="noopener noreferrer" variants={reveal} className={`group block rounded-2xl border p-6 md:p-7 transition-colors ${t.border} ${t.hover}`}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-lime text-black">Jurnal Nasional</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${t.border} ${t.muted}`}>{p.role}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full border ${t.border} ${t.muted}`}>PDF tersedia</span>
              </div>
              <h3 className={`text-lg md:text-xl font-semibold tracking-tight leading-snug mb-3 transition-colors group-hover:text-lime ${t.text}`}>{p.title}</h3>
              <p className={`text-sm ${t.muted}`}>{p.venue} · {p.detail}</p>
              <p className={`font-mono text-xs mt-1 ${t.faint}`}>{p.date} · DOI {p.doi} · {p.license}</p>
              <p className={`text-sm mt-4 ${t.muted}`}>
                {p.authors.map((a, idx) => (
                  <span key={idx}>
                    <span className={a.includes('Rifki') ? `${t.text} font-medium underline decoration-lime decoration-2 underline-offset-2` : ''}>{a}</span>
                    {idx < p.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
                {p.extra && <span className={t.faint}>, {p.extra}</span>}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-lime">Baca paper <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></span>
            </motion.a>
          ))}
        </motion.div>
        <motion.a variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} href="https://scholar.google.com/citations?hl=id&user=ofLBnP8AAAAJ" target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center gap-2 mt-8 px-5 h-11 rounded-full text-sm font-medium border transition-all hover:scale-[1.03] active:scale-95 ${t.border} ${t.text} hover:border-lime`}>
          <GraduationCap size={16} className="text-lime" /> Lihat semua di Google Scholar
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </section>
  )
}

// ─── Organizations ──────────────────────────────────────────────────────────
function Organizations({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <section id="organizations" className={`py-24 md:py-32 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead n="05" label="Leadership" title="Organisasi" dark={dark} />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {organizations.map((o, i) => (
            <motion.div key={i} variants={reveal} className={`grid md:grid-cols-[130px_1fr_auto] md:items-center gap-1 md:gap-6 py-5 ${i > 0 ? `border-t ${t.border}` : ''}`}>
              <span className={`font-mono text-xs ${t.faint}`}>{o.period}</span>
              <div className="flex items-center gap-2.5">
                <h3 className={`text-base font-medium ${t.text}`}>{o.role}</h3>
                {o.current && <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />}
              </div>
              <p className={`text-sm md:text-right ${t.muted}`}>{o.org}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Projects ───────────────────────────────────────────────────────────────
function Projects({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <section id="projects" className={`py-24 md:py-32 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SectionHead n="06" label="Selected Work" title="Karya saya" dark={dark} />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-x-6 gap-y-12">
          {projects.map((p) => (
            <motion.a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" variants={reveal} className="group block">
              <div className={`relative overflow-hidden rounded-2xl border ${t.border} aspect-[16/10]`}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-sm font-medium">Kunjungi situs</span>
                  <span className="w-9 h-9 rounded-full bg-lime text-black flex items-center justify-center"><ArrowUpRight size={17} /></span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs ${t.faint}`}>{p.id} · {p.category}</span>
                  <ArrowUpRight size={15} className={`${t.faint} group-hover:text-lime group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all`} />
                </div>
                <h3 className={`text-xl font-semibold tracking-tight mt-2 mb-2 transition-colors group-hover:text-lime ${t.text}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${t.muted}`}>{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => <span key={tag} className={`text-xs px-2.5 py-1 rounded-full ${dark ? 'bg-white/5 text-neutral-400' : 'bg-black/5 text-neutral-500'}`}>{tag}</span>)}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Clients ────────────────────────────────────────────────────────────────
function Clients({ dark }: { dark: boolean }) {
  const t = T(dark)
  const fade = dark ? '#0B0B0B' : '#FAF9F6'
  return (
    <section id="clients" className={`py-12 md:py-16 border-b ${t.border} ${t.bg} overflow-hidden`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 mb-8">
        <p className={`font-mono text-xs tracking-wide ${t.muted}`}><span className="text-lime">✦</span> Klien &amp; Kolaborasi — dipercaya oleh</p>
      </div>
      <div className="group relative">
        <div className="marquee-track animate-marquee group-hover:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center shrink-0" aria-hidden={k === 1}>
              {clients.map((c) => (
                <div key={c.name} className="mx-3 w-44 shrink-0 flex flex-col items-center gap-2.5">
                  <div className="h-16 w-full rounded-xl bg-white flex items-center justify-center px-5">
                    <img src={c.logo} alt={c.name} className="max-h-9 max-w-full object-contain transition-transform duration-300 hover:scale-110" loading="lazy" />
                  </div>
                  <span className={`font-mono text-[10px] ${t.faint}`}>{c.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32" style={{ background: `linear-gradient(to right, ${fade}, transparent)` }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32" style={{ background: `linear-gradient(to left, ${fade}, transparent)` }} />
      </div>
    </section>
  )
}

// ─── Footer / Contact ────────────────────────────────────────────────────────
function Footer({ dark }: { dark: boolean }) {
  const t = T(dark)
  return (
    <footer id="contact" className={`py-24 md:py-32 border-t ${t.border} ${t.bg}`}>
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <p className={`font-mono text-xs mb-5 ${t.muted}`}><span className="text-lime">07</span> · Contact</p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`text-4xl md:text-6xl font-semibold tracking-tight mb-8 ${t.text}`}>
          Mari berkolaborasi<span className="text-lime">.</span>
        </motion.h2>
        <p className={`text-base max-w-md mb-10 ${t.muted}`}>Terbuka untuk proyek videografi, pengembangan web, diskusi keamanan siber, dan peluang kerja lainnya.</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-12 max-w-xl">
          <a href="https://wa.me/62895346038858" target="_blank" rel="noopener noreferrer" className={`group flex-1 flex items-center justify-between px-5 h-12 rounded-full text-sm transition-colors ${dark ? 'bg-white text-black hover:bg-lime' : 'bg-black text-white hover:bg-lime hover:text-black'}`}>
            <span className="flex items-center gap-2"><Phone size={14} /> +62 895-3460-38858</span>
            <ArrowUpRight size={16} />
          </a>
          <a href="mailto:rifkiorangke2@gmail.com" className={`group flex-1 flex items-center justify-between px-5 h-12 rounded-full text-sm border transition-colors ${t.border} ${t.text} hover:border-lime`}>
            <span className="truncate">rifkiorangke2@gmail.com</span>
            <ArrowUpRight size={16} className="shrink-0" />
          </a>
        </div>

        <div className={`flex items-center gap-3 mb-14 ${t.muted}`}>
          {SOCIALS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-lime transition-colors">{s.icon}</a>)}
          <span className="text-sm flex items-center gap-1.5 ml-2"><MapPin size={13} /> Pandeglang, Indonesia</span>
        </div>

        <div className={`pt-6 border-t ${t.border} flex flex-col sm:flex-row justify-between gap-2 font-mono text-xs ${t.faint}`}>
          <span>© 2026 Muhammad Rifki Hidayatulloh</span>
          <span>Built with intent.</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
  return (
    <div className={dark ? 'bg-[#0B0B0B]' : 'bg-[#FAF9F6]'}>
      <ScrollProgress />
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Hero dark={dark} />
      <Clients dark={dark} />
      <About dark={dark} />
      <WorkExperience dark={dark} />
      <Certifications dark={dark} />
      <Publications dark={dark} />
      <Organizations dark={dark} />
      <Projects dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}
