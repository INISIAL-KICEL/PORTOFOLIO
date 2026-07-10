import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Moon, Sun, MapPin, Phone, Github, Instagram,
  Linkedin, ArrowRight, ArrowUpRight, Video, Shield,
  Code, Menu, X, Award, Users, Star,
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

// ─── Motion ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reveal: any = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

// ─── Data ──────────────────────────────────────────────────────────────────
const experiences = [
  {
    role: 'Founder & Owner', company: 'HISTORIS KITA', type: 'PART-TIME', period: '2023 — NOW',
    desc: 'Rumah produksi visual fokus sinematografi pernikahan. Mengelola pipeline penuh dari pra-produksi hingga color grading (Adobe Premiere Pro).',
    icon: <Video size={18} />, tags: ['Premiere Pro', 'Sinematografi', 'Color Grade'],
  },
  {
    role: 'Founder & IT Consultant', company: 'SARVANET.ID', type: 'FOUNDER', period: '2025 — NOW',
    desc: 'Konsultasi internet & strategi penerapan jaringan. Merancang topologi berbasis Cisco dan analisis teknis untuk klien institusi/kampus.',
    icon: <Shield size={18} />, tags: ['Cisco', 'Network Deployment', 'IT Consulting'],
  },
  {
    role: 'AI Video Editor', company: 'DALANG.IO', type: 'CONTRACT', period: '2025',
    desc: 'Pengeditan video berbasis AI + inisiatif digital marketing untuk konten skala besar dengan efisiensi tinggi.',
    icon: <Code size={18} />, tags: ['AI Tools', 'Premiere Pro', 'Digital Marketing'],
  },
  {
    role: 'Asisten Praktikum Fisika', company: 'FST · UIN SMH BANTEN', type: 'KAMPUS', period: '2025',
    desc: 'Mendampingi praktikum Fisika Dasar mahasiswa FST — membimbing eksperimen dan analisis laboratorium.',
    icon: <Users size={18} />, tags: ['Asistensi', 'Lab', 'Fisika'],
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
  { role: 'Bidang Ekonomi, UMKM & Startup', org: 'HIPMI PT DPD Banten', period: '2026 — NOW', current: true },
  { role: 'Ketua Departemen Eksternal', org: 'HMPS Informatika · UIN SMH Banten', period: '2026 — NOW', current: true },
  { role: 'Ketua Pelaksana', org: 'Mapansa Expo Campus 2026 · IKA-MAN', period: '2026', current: false },
  { role: 'Koordinator Multimedia', org: 'IREMA Masjid Agung Ar-Rahman', period: '2024 — NOW', current: true },
  { role: 'Anggota Saka Widya Budaya', org: 'Dinas Pendidikan Kab. Pandeglang', period: '2023 — 2025', current: false },
  { role: 'Ketua Dewan Ambalan Putra', org: 'KH Agus Salim · MAN 1 Pandeglang', period: '2022 — 2023', current: false },
  { role: 'Bendahara 2', org: 'Dewan Penggalang · MTsN 1 Pandeglang', period: '2019 — 2020', current: false },
]

const projects = [
  { id: '01', category: 'WEDDING FILM', title: 'Cinematic Wedding Stories', description: 'Produksi video pernikahan full-service, dari pre-wedding hingga same-day edit dengan pendekatan sinematik & editorial.', tags: ['DJI Ronin', 'Sony FX3', 'Color Grade'], icon: <Video size={20} /> },
  { id: '02', category: 'DIGITAL SECURITY', title: 'CTF & Penetration Testing', description: 'Kompetisi Capture the Flag & web app pentesting. Fokus OWASP Top 10 dan metodologi ethical hacking.', tags: ['Kali Linux', 'Burp Suite', 'OWASP'], icon: <Shield size={20} /> },
  { id: '03', category: 'NETWORKING', title: 'Network Lab & Simulation', description: 'Simulasi jaringan dengan PNETLab. Konfigurasi Cisco & Mikrotik untuk infrastruktur enterprise dari nol.', tags: ['PNETLab', 'Cisco', 'Mikrotik'], icon: <Code size={20} /> },
  { id: '04', category: 'DEVELOPMENT', title: 'Full-Stack Web Projects', description: 'Aplikasi web modern — dari sistem manajemen akademik sampai dashboard interaktif dengan use case nyata.', tags: ['React', 'Laravel', 'TypeScript'], icon: <Code size={20} /> },
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
  { icon: <Github size={17} />, href: 'https://github.com/INISIAL-KICEL', label: 'GitHub' },
  { icon: <Instagram size={17} />, href: 'https://www.instagram.com/inisial_kicel/', label: 'Instagram' },
  { icon: <Linkedin size={17} />, href: 'https://www.linkedin.com/in/muhammad-rifki-hidayatulloh-7250782bb/', label: 'LinkedIn' },
]

// ─── Helpers ────────────────────────────────────────────────────────────────
function Marquee({ items, dark, invert = false, reverse = false }: { items: string[]; dark: boolean; invert?: boolean; reverse?: boolean }) {
  const bg = invert ? 'bg-lime text-ink' : dark ? 'bg-[#0A0A0A] text-white' : 'bg-ink text-white'
  return (
    <div className={`overflow-hidden border-y-2 ${invert ? 'border-ink' : 'border-white/20'} ${bg} py-3 md:py-4`}>
      <div className={`marquee-track ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center shrink-0" aria-hidden={k === 1}>
            {items.map((it, i) => (
              <span key={i} className="flex items-center shrink-0">
                <span className="font-display uppercase text-2xl md:text-4xl px-5 md:px-8 tracking-tight">{it}</span>
                <Star size={18} className={invert ? 'text-ink' : 'text-lime'} fill="currentColor" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionTag({ n, label, dark }: { n: string; label: string; dark: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs font-bold text-lime">({n})</span>
      <span className={`font-mono text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-white/50' : 'text-ink/50'}`}>{label}</span>
      <span className={`flex-1 h-px ${dark ? 'bg-white/15' : 'bg-ink/15'}`} />
    </div>
  )
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { label: 'ABOUT', href: '#about' }, { label: 'WORK', href: '#experience' },
    { label: 'CERTS', href: '#certifications' }, { label: 'ORG', href: '#organizations' },
    { label: 'PROJECTS', href: '#projects' }, { label: 'CLIENTS', href: '#clients' },
  ]
  const line = dark ? 'border-white/15' : 'border-ink/15'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b-2 transition-colors duration-300 ${scrolled ? (dark ? 'bg-[#0A0A0A]/95 backdrop-blur border-white/15' : 'bg-paper/95 backdrop-blur border-ink/20') : `bg-transparent ${line}`}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#home" className={`font-display text-xl tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
          MRH<span className="text-lime">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((it) => (
            <a key={it.label} href={it.href} className={`font-mono text-xs font-medium tracking-wider transition-colors hover:text-lime ${dark ? 'text-white/60' : 'text-ink/60'}`}>{it.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleDark} aria-label="Toggle theme" className={`w-9 h-9 border-2 flex items-center justify-center transition-colors hover:bg-lime hover:text-ink hover:border-lime ${dark ? 'border-white/25 text-white' : 'border-ink text-ink'}`}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a href="#contact" className="hidden md:flex items-center gap-2 px-4 h-9 bg-lime text-ink font-mono text-xs font-bold uppercase border-2 border-lime hover:bg-transparent hover:text-lime transition-colors">
            Inquiry <ArrowUpRight size={14} />
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden w-9 h-9 border-2 flex items-center justify-center ${dark ? 'border-white/25 text-white' : 'border-ink text-ink'}`}>
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className={`md:hidden overflow-hidden border-t-2 ${dark ? 'bg-[#0A0A0A] border-white/15' : 'bg-paper border-ink/20'}`}>
            <div className="px-5 py-4 flex flex-col gap-3">
              {nav.map((it) => (
                <a key={it.label} href={it.href} onClick={() => setMenuOpen(false)} className={`font-mono text-sm ${dark ? 'text-white/80' : 'text-ink/80'}`}>{it.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero({ dark }: { dark: boolean }) {
  return (
    <section id="home" className={`relative pt-24 md:pt-28 overflow-hidden ${dark ? 'bg-[#0A0A0A]' : 'bg-paper'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-8">
        {/* top meta row */}
        <div className={`flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-widest mb-8 ${dark ? 'text-white/40' : 'text-ink/50'}`}>
          <span>Pandeglang · Banten · ID</span>
          <span className="hidden sm:flex items-center gap-2"><span className="w-2 h-2 bg-lime inline-block animate-pulse" /> Open for work — 2026</span>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-6 items-end">
          {/* Left: giant name */}
          <div>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className={`font-mono text-sm mb-3 ${dark ? 'text-white/60' : 'text-ink/60'}`}>
              // Videographer · Cybersecurity · Web Developer
            </motion.p>
            <h1 className={`font-display uppercase leading-[0.82] tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="block text-[clamp(2.9rem,11vw,9rem)]">Muhammad</motion.span>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.13 }} className="block text-[clamp(2.9rem,11vw,9rem)]">
                <span className="bg-lime text-ink px-2 md:px-3 box-decoration-clone">Rifki</span>
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.21 }} className="block text-[clamp(2.4rem,9vw,7.5rem)] text-stroke">Hidayatulloh</motion.span>
            </h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap items-center gap-3 mt-8">
              <a href="#projects" className="group flex items-center gap-2 px-6 h-12 bg-lime text-ink font-mono text-sm font-bold uppercase border-2 border-lime shadow-[6px_6px_0_0_currentColor] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
                Lihat Karya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className={`flex items-center gap-2 px-6 h-12 font-mono text-sm font-bold uppercase border-2 transition-colors hover:bg-lime hover:text-ink hover:border-lime ${dark ? 'border-white/30 text-white' : 'border-ink text-ink'}`}>
                Hubungi Saya
              </a>
              <div className="flex items-center gap-2 ml-1">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`w-12 h-12 border-2 flex items-center justify-center transition-colors hover:bg-lime hover:text-ink hover:border-lime ${dark ? 'border-white/25 text-white' : 'border-ink text-ink'}`}>{s.icon}</a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: photo framed */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative w-full max-w-[320px] justify-self-center lg:justify-self-end">
            <div className={`relative border-2 ${dark ? 'border-white' : 'border-ink'} shadow-brutal-lime-lg`}>
              <img src={fotoGue} alt="Muhammad Rifki Hidayatulloh" className="w-full object-cover object-top grayscale contrast-[1.05]" loading="eager" />
              <div className="absolute -top-3 -right-3 rotate-6 bg-lime text-ink font-mono text-[10px] font-bold uppercase px-3 py-1 border-2 border-ink">Est. 2006</div>
            </div>
            <div className={`mt-3 flex items-center justify-between font-mono text-[10px] uppercase ${dark ? 'text-white/40' : 'text-ink/50'}`}>
              <span>[ MRH ]</span><span>IPK 3.75 · UIN</span>
            </div>
          </motion.div>
        </div>
      </div>

      <Marquee dark={dark} invert items={['Wedding Film', 'Cybersecurity', 'Network Engineering', 'Web Development', 'Photography', 'CTF']} />
    </section>
  )
}

// ─── About ──────────────────────────────────────────────────────────────────
function About({ dark }: { dark: boolean }) {
  const skills = [
    { label: 'Videography & Color', level: 90 },
    { label: 'Editing / Premiere Pro', level: 87 },
    { label: 'Networking (Cisco/MTk)', level: 74 },
    { label: 'Web Development', level: 74 },
    { label: 'Cybersecurity / CTF', level: 68 },
  ]
  const stats = [
    { v: '30+', l: 'Pernikahan' }, { v: '18+', l: 'Sertifikasi' },
    { v: '7+', l: 'Organisasi' }, { v: '04', l: 'Penghargaan' },
  ]
  return (
    <section id="about" className={`py-20 md:py-28 ${dark ? 'bg-[#0A0A0A] text-white' : 'bg-paper text-ink'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTag n="01" label="About" dark={dark} />
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(1.9rem,5vw,3.4rem)] leading-[0.95] tracking-tight mb-8">
              Teknologi ketemu <span className="text-lime">visual</span> & keamanan digital.
            </motion.h2>
            <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className={`text-base leading-relaxed mb-4 ${dark ? 'text-white/70' : 'text-ink/70'}`}>
              Saya Muhammad Rifki Hidayatulloh — mahasiswa Informatika UIN di Pandeglang, Banten. Di satu sisi merekam momen pernikahan dengan sentuhan sinematik, di sisi lain mendalami cybersecurity & jaringan komputer.
            </motion.p>
            <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className={`text-base leading-relaxed ${dark ? 'text-white/70' : 'text-ink/70'}`}>
              Perpaduan ini bikin saya mendekati masalah dari banyak sudut: kreativitas filmmaker, presisi developer, dan mindset analitis security researcher.
            </motion.p>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-4 gap-0 mt-10 border-2 border-current">
              {stats.map((s, i) => (
                <motion.div key={s.l} variants={reveal} className={`p-4 md:p-5 border-current ${i % 2 === 0 ? 'border-r-2' : ''} ${i < 2 ? 'border-b-2 sm:border-b-0' : ''} ${i === 2 ? 'sm:border-r-2' : ''} ${i > 0 && i !== 2 ? 'sm:border-l-0' : ''}`}>
                  <div className="font-display text-3xl md:text-4xl">{s.v}</div>
                  <div className={`font-mono text-[10px] uppercase tracking-wider mt-1 ${dark ? 'text-white/50' : 'text-ink/50'}`}>{s.l}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-6 ${dark ? 'text-white/50' : 'text-ink/50'}`}>// Core Skills</p>
            <div className="space-y-5">
              {skills.map((sk, i) => (
                <motion.div key={sk.label} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-mono text-sm font-medium">{sk.label}</span>
                    <span className="font-display text-lg">{sk.level}<span className="text-lime">%</span></span>
                  </div>
                  <div className={`h-3 border-2 border-current`}>
                    <motion.div className="h-full bg-lime" initial={{ width: 0 }} whileInView={{ width: `${sk.level}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Experience ─────────────────────────────────────────────────────────────
function WorkExperience({ dark }: { dark: boolean }) {
  return (
    <section id="experience" className={`py-20 md:py-28 border-t-2 ${dark ? 'bg-[#0A0A0A] text-white border-white/15' : 'bg-paper text-ink border-ink/15'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTag n="02" label="Experience" dark={dark} />
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] tracking-tight mb-12">
          Pengalaman<span className="text-lime">.</span>
        </motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-5">
          {experiences.map((exp) => (
            <motion.div key={exp.company} variants={reveal} className={`group border-2 border-current p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lime`}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 border-2 border-current flex items-center justify-center group-hover:bg-lime group-hover:text-ink group-hover:border-lime transition-colors">{exp.icon}</div>
                <span className={`font-mono text-[10px] font-bold uppercase px-2 py-1 border ${dark ? 'border-white/30 text-white/60' : 'border-ink/30 text-ink/60'}`}>{exp.type}</span>
              </div>
              <div className={`font-mono text-xs mb-1 ${dark ? 'text-white/50' : 'text-ink/50'}`}>{exp.period}</div>
              <h3 className="font-display uppercase text-xl tracking-tight leading-tight">{exp.role}</h3>
              <p className="font-mono text-sm text-lime mb-3">{exp.company}</p>
              <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-white/65' : 'text-ink/65'}`}>{exp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <span key={t} className={`font-mono text-[10px] uppercase px-2 py-1 border ${dark ? 'border-white/20 text-white/60' : 'border-ink/20 text-ink/60'}`}>{t}</span>
                ))}
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
  return (
    <section id="certifications" className={`py-20 md:py-28 border-t-2 ${dark ? 'bg-[#0A0A0A] text-white border-white/15' : 'bg-paper text-ink border-ink/15'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTag n="03" label="Licenses & Awards" dark={dark} />
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] tracking-tight mb-12">
          Sertifikasi & Penghargaan<span className="text-lime">.</span>
        </motion.h2>

        <div className="space-y-10">
          {certifications.map((group) => (
            <div key={group.year} className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-8">
              <div className="font-display text-4xl md:text-5xl text-lime leading-none">{group.year}</div>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-3">
                {group.items.map((c, i) => (
                  <motion.div key={i} variants={reveal} className={`group flex items-start gap-3 border-2 border-current p-4 transition-all hover:-translate-y-1 hover:shadow-brutal-sm`}>
                    <Shield size={15} className="text-lime shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold leading-snug">{c.title}</p>
                      <p className={`font-mono text-[11px] mt-1 ${dark ? 'text-white/45' : 'text-ink/45'}`}>{c.issuer}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}

          {/* Awards */}
          <div className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-8 pt-4">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-lime pt-2">★ Prestasi</div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-3">
              {awards.map((a, i) => (
                <motion.div key={i} variants={reveal} className="group flex items-start gap-3 border-2 border-lime bg-lime/10 p-4 transition-all hover:-translate-y-1 hover:shadow-brutal-lime">
                  <Award size={16} className="text-lime shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-sm font-bold leading-snug">{a.title}</p>
                      <span className="font-display text-sm text-lime">{a.date}</span>
                    </div>
                    <p className={`font-mono text-[11px] mt-1 ${dark ? 'text-white/50' : 'text-ink/50'}`}>{a.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Organizations ──────────────────────────────────────────────────────────
function Organizations({ dark }: { dark: boolean }) {
  return (
    <section id="organizations" className={`py-20 md:py-28 border-t-2 ${dark ? 'bg-[#0A0A0A] text-white border-white/15' : 'bg-paper text-ink border-ink/15'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTag n="04" label="Leadership" dark={dark} />
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] tracking-tight mb-12">
          Organisasi<span className="text-lime">.</span>
        </motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border-t-2 border-current">
          {organizations.map((o, i) => (
            <motion.div key={i} variants={reveal} className={`group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] md:items-center gap-1 md:gap-6 py-5 border-b-2 border-current transition-colors ${dark ? 'hover:bg-white/[0.03]' : 'hover:bg-ink/[0.03]'}`}>
              <span className={`font-mono text-xs ${dark ? 'text-white/50' : 'text-ink/50'}`}>{o.period}</span>
              <div className="flex items-center gap-3">
                <h3 className="font-display uppercase text-lg md:text-xl tracking-tight leading-none group-hover:text-lime transition-colors">{o.role}</h3>
                {o.current && <span className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 bg-lime text-ink">Aktif</span>}
              </div>
              <p className={`font-mono text-xs md:text-right ${dark ? 'text-white/55' : 'text-ink/55'}`}>{o.org}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Projects ───────────────────────────────────────────────────────────────
function Projects({ dark }: { dark: boolean }) {
  return (
    <section id="projects" className={`py-20 md:py-28 border-t-2 ${dark ? 'bg-[#0A0A0A] text-white border-white/15' : 'bg-paper text-ink border-ink/15'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTag n="05" label="Selected Work" dark={dark} />
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] tracking-tight mb-12">
          Karya Saya<span className="text-lime">.</span>
        </motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <motion.div key={p.id} variants={reveal} className="group border-2 border-current p-6 md:p-8 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lime-lg">
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl md:text-6xl text-lime leading-none">{p.id}</span>
                <div className="w-11 h-11 border-2 border-current flex items-center justify-center group-hover:bg-lime group-hover:text-ink group-hover:border-lime transition-colors">{p.icon}</div>
              </div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-lime mb-2">{p.category}</p>
              <h3 className="font-display uppercase text-2xl tracking-tight leading-tight mb-3">{p.title}</h3>
              <p className={`text-sm leading-relaxed mb-5 ${dark ? 'text-white/65' : 'text-ink/65'}`}>{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className={`font-mono text-[10px] uppercase px-2 py-1 border ${dark ? 'border-white/20 text-white/60' : 'border-ink/20 text-ink/60'}`}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Clients ────────────────────────────────────────────────────────────────
function Clients({ dark }: { dark: boolean }) {
  return (
    <section id="clients" className={`py-20 md:py-28 border-t-2 ${dark ? 'bg-[#0A0A0A] text-white border-white/15' : 'bg-paper text-ink border-ink/15'}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionTag n="06" label="Clients & Collab" dark={dark} />
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] tracking-tight mb-12">
          Klien & Kolaborasi<span className="text-lime">.</span>
        </motion.h2>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 border-t-2 border-l-2 border-current">
          {clients.map((c) => (
            <motion.div key={c.name} variants={reveal} className="group border-r-2 border-b-2 border-current p-4 flex flex-col items-center justify-center gap-3 transition-colors hover:bg-lime">
              <div className="h-14 w-full bg-white border-2 border-ink flex items-center justify-center px-3">
                <img src={c.logo} alt={c.name} className="max-h-9 max-w-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" loading="lazy" />
              </div>
              <div className="text-center">
                <p className="font-mono text-[11px] font-bold leading-tight group-hover:text-ink">{c.name}</p>
                <p className={`font-mono text-[9px] uppercase mt-0.5 group-hover:text-ink/70 ${dark ? 'text-white/45' : 'text-ink/45'}`}>{c.tag}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contact / Footer ────────────────────────────────────────────────────────
function Footer({ dark }: { dark: boolean }) {
  return (
    <footer id="contact" className="bg-lime text-ink">
      <Marquee dark={dark} invert reverse items={["Let's Build Something", 'Collab', 'Wedding Film', 'Web Dev', 'Security']} />
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-6">(07) — Contact</p>
        <motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display uppercase text-[clamp(2.6rem,10vw,8rem)] leading-[0.85] tracking-tight mb-10">
          Mari<br />Berkolaborasi.
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <a href="https://wa.me/62895346038858" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-2 border-ink p-5 bg-ink text-lime hover:bg-transparent hover:text-ink transition-colors">
            <span className="font-mono text-sm"><Phone size={14} className="inline mr-2" />+62 895-3460-38858</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          <a href="mailto:rifkiorangke2@gmail.com" className="group flex items-center justify-between border-2 border-ink p-5 hover:bg-ink hover:text-lime transition-colors">
            <span className="font-mono text-sm break-all">rifkiorangke2@gmail.com</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-14">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-12 h-12 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-lime transition-colors">{s.icon}</a>
          ))}
          <span className="font-mono text-xs ml-1 flex items-center gap-1.5"><MapPin size={13} /> Pandeglang, Indonesia</span>
        </div>

        <div className="border-t-2 border-ink pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <span className="font-display uppercase text-xl">MRH<span className="text-ink">©</span> 2026</span>
          <span className="font-mono text-[11px] uppercase tracking-wider">Designed & Built with intent — Not by template.</span>
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
    <div className={`grain ${dark ? 'bg-[#0A0A0A]' : 'bg-paper'}`}>
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Hero dark={dark} />
      <About dark={dark} />
      <WorkExperience dark={dark} />
      <Certifications dark={dark} />
      <Organizations dark={dark} />
      <Projects dark={dark} />
      <Clients dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}
