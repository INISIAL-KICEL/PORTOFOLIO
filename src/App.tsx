import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Moon, Sun, MapPin, Phone, Github, Instagram,
  Linkedin, ExternalLink, ArrowRight, Video, Shield,
  Code, ChevronDown, Menu, X, Award, Users,
} from 'lucide-react'
import fotoGue from './aset/gambar/foto-saya.png';

// ─── Animation Variants ────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.08 },
  }),
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stagger: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}


// ─── Data ─────────────────────────────────────────────────────────────────────
const experiences = [
  {
    role: 'Owner & Videographer',
    company: 'HISTORIS KITA',
    type: 'Part-time',
    period: '2023 — Sekarang',
    desc: 'Produksi konten visual dengan fokus pada sinematografi pernikahan. Mengelola seluruh pipeline produksi dari pra-produksi hingga color grading menggunakan Adobe Premiere Pro.',
    icon: <Video size={16} />,
    tags: ['Adobe Premiere Pro', 'Sinematografi', 'Color Grading'],
    accent: 'from-rose-500/20 to-pink-500/10',
  },
  {
    role: 'AI Video Editor',
    company: 'Dalang.io',
    type: 'Contract',
    period: 'Jun 2025 — Agt 2025',
    desc: 'Pengeditan video berbasis AI menggunakan Adobe Premiere Pro dan inisiatif Digital Marketing untuk konten skala besar dengan efisiensi tinggi.',
    icon: <Code size={16} />,
    tags: ['Adobe Premiere Pro', 'AI Tools', 'Digital Marketing'],
    accent: 'from-violet-500/20 to-indigo-500/10',
  },
]

const certifications = [
  {
    year: '2026',
    items: [
      {
        title: 'Securing the CI/CD: Effective Implementation of SAST & Secrets Scanning',
        issuer: 'PT ITSEC Asia Tbk',
        date: 'Mar 2026',
        icon: <Shield size={14} />,
        color: 'text-violet-400',
      },
      {
        title: 'AI Solution Workshop: End-to-End AI Model Solutions',
        issuer: 'Microsoft Elevate',
        date: 'Feb 2026',
        icon: <Code size={14} />,
        color: 'text-blue-400',
      },
    ],
  },
  {
    year: '2025',
    items: [
      {
        title: 'Cyber Security Bootcamp',
        issuer: 'ID-Networkers (IDN.ID)',
        date: 'Jan 2025',
        icon: <Shield size={14} />,
        color: 'text-cyan-400',
      },
      {
        title: 'Cyber Security Bootcamp',
        issuer: 'Institut Teknologi Indonesia',
        date: 'Jan 2025',
        icon: <Shield size={14} />,
        color: 'text-cyan-400',
      },
      {
        title: 'Network Simulation Learning with PNETLab',
        issuer: 'ID-Networkers (IDN.ID)',
        date: 'Jan 2025',
        icon: <Award size={14} />,
        color: 'text-green-400',
      },
      {
        title: 'Basic Cisco, Basic Mikrotik, & Basic Computer Network',
        issuer: 'ID-Networkers (IDN.ID)',
        date: 'Jan 2025',
        icon: <Award size={14} />,
        color: 'text-green-400',
      },
    ],
  },
]

const organizations = [
  {
    role: 'Koordinator Media',
    org: 'Ikatan Remaja Masjid Agung Ar-Rahman KAB Pandeglang',
    period: '2025 – Sekarang',
    current: true,
  },
  {
    role: 'Anggota',
    org: 'Satuan Karya Widya Budaya Bakti',
    period: '2023 – 2024',
    current: false,
  },
  {
    role: 'Ketua Putra',
    org: 'Dewan Ambalan KH Agus Salim MAN 1 Pandeglang',
    period: '2022 – 2023',
    current: false,
  },
  {
    role: 'Bendahara 2',
    org: 'Dewan Penggalang MTsN 1 Pandeglang',
    period: '2019 – 2020',
    current: false,
  },
]

const projects = [
  {
    id: 1,
    category: 'WEDDING FILM',
    title: 'Cinematic Wedding Stories',
    description:
      'Produksi video pernikahan full-service — dari pre-wedding shoot hingga same-day edit. Merekam momen autentik dengan pendekatan sinematik dan editorial.',
    tags: ['DJI Ronin', 'Sony FX3', 'Color Grade', 'Editorial'],
    icon: <Video size={18} />,
    accent: 'from-rose-500/20 to-pink-500/10',
  },
  {
    id: 2,
    category: 'DIGITAL SECURITY',
    title: 'CTF & Penetration Testing',
    description:
      'Kompetisi Capture the Flag dan web application penetration testing. Fokus pada OWASP Top 10 vulnerabilities dan metodologi ethical hacking.',
    tags: ['Kali Linux', 'Burp Suite', 'OWASP', 'CTF'],
    icon: <Shield size={18} />,
    accent: 'from-violet-500/20 to-indigo-500/10',
  },
  {
    id: 3,
    category: 'NETWORKING',
    title: 'Network Lab & Simulation',
    description:
      'Simulasi jaringan komputer menggunakan PNETLab. Konfigurasi Cisco dan Mikrotik untuk infrastruktur jaringan enterprise dari nol.',
    tags: ['PNETLab', 'Cisco', 'Mikrotik', 'TCP/IP'],
    icon: <Code size={18} />,
    accent: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    id: 4,
    category: 'DEVELOPMENT',
    title: 'Full-Stack Web Projects',
    description:
      'Membangun aplikasi web modern selama studi Informatika — dari sistem manajemen akademik hingga dashboard interaktif dengan use case nyata.',
    tags: ['React', 'Laravel', 'TypeScript', 'MySQL'],
    icon: <Code size={18} />,
    accent: 'from-amber-500/20 to-orange-500/10',
  },
]

// ─── Component: Navbar ────────────────────────────────────────────────────────
function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certs', href: '#certifications' },
    { label: 'Org', href: '#organizations' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const borderCol = dark ? 'border-dark-border' : 'border-light-border'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? `bg-[#0A0A0A]/90 backdrop-blur-md border-b ${borderCol}`
            : `bg-[#FAFAFA]/90 backdrop-blur-md border-b ${borderCol}`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className={`text-sm font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-gray-900'}`}>
          MRH.
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              dark ? 'bg-[#1F1F1F] text-gray-300 hover:bg-white/10 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:scale-105 transition-transform"
          >
            Inquiry / Collab <ArrowRight size={13} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-9 h-9 flex items-center justify-center rounded-full ${dark ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t px-6 py-4 flex flex-col gap-4 ${dark ? `bg-[#0A0A0A] ${borderCol}` : `bg-[#FAFAFA] ${borderCol}`}`}
          >
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── Component: Hero ──────────────────────────────────────────────────────────
function Hero({ dark }: { dark: boolean }) {
  return (
    <section id="home" className={`min-h-screen relative flex flex-col justify-center overflow-hidden ${dark ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]'}`}>
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'} 1px, transparent 1px), linear-gradient(90deg, ${dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 border ${dark ? 'border-[#1F1F1F] text-gray-400 bg-[#111111]' : 'border-[#E8E8E8] text-gray-500 bg-white'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available for Projects
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              {/* Sapaan Hi, I'm berukuran kecil */}
              <p className={`text-xl md:text-2xl font-medium mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Hi, I'm
              </p>

              {/* Nama Lengkap */}
              <h1 className={`font-black leading-[1.05] tracking-tighter`}>
                {/* Baris 1: Muhammad - Kita block biar punya baris sendiri */}
                <span className="text-4xl md:text-5xl lg:text-7xl bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent block mb-1">
                  Muhammad
                </span>

                {/* Baris 2: Rifki (Putih) & Hidayatulloh (Gradient) */}
                <div className="text-3xl md:text-4xl lg:text-6xl flex flex-wrap items-baseline gap-x-2">
                  <span className={dark ? 'text-white' : 'text-gray-900'}>
                    Rifki
                  </span>
                  {/* Gunakan whitespace-nowrap biar 'Hidayatulloh' gak kepotong di tengah */}
                  <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent whitespace-nowrap">
                    Hidayatulloh
                  </span>
                </div>
              </h1> 
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
              className={`text-base md:text-lg leading-relaxed mb-8 max-w-md ${dark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Mahasiswa Informatika UIN · Wedding Videographer · Cybersecurity &amp; Networking Enthusiast.
              <br />
              <span className="text-sm opacity-70">Membangun di persimpangan teknologi dan visual storytelling.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
              className={`flex items-center gap-2 text-sm mb-10 ${dark ? 'text-gray-500' : 'text-gray-400'}`}
            >
              <MapPin size={13} />
              Pandeglang, Indonesia · Available Worldwide
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3"
            >
              <a href="#projects" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform shadow-lg shadow-white/10">
                Lihat Karya <ArrowRight size={15} />
              </a>
              <a href="#contact" className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:scale-105 ${dark ? 'border-[#1F1F1F] text-gray-300 hover:border-gray-600' : 'border-[#E8E8E8] text-gray-700 hover:border-gray-400'}`}>
                Hubungi Saya
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 mt-8"
            >
              {[
                { icon: <Github size={16} />, href: 'https://github.com/INISIAL-KICEL', label: 'GitHub' },
                { icon: <Instagram size={16} />, href: 'https://www.instagram.com/inisial_kicel/', label: 'Instagram' },
                { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/muhammad-rifki-hidayatulloh-7250782bb/', label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:scale-110 ${dark ? 'border-[#1F1F1F] text-gray-500 hover:text-white hover:border-gray-600' : 'border-[#E8E8E8] text-gray-400 hover:text-gray-900 hover:border-gray-300'}`}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-500/20 blur-3xl" />
              <div className={`relative w-72 h-auto md:w-80 rounded-3xl overflow-hidden border shadow-2xl ${dark ? 'border-[#1F1F1F]' : 'border-[#E8E8E8]'}`}>
                <img
                  src={fotoGue}
                  alt="Muhammad Rifki Hidayatulloh"
                  className="w-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div className={`absolute -bottom-4 -left-4 px-4 py-2.5 rounded-2xl text-xs font-medium border shadow-xl ${dark ? 'bg-[#111111] border-[#1F1F1F] text-gray-300' : 'bg-white border-[#E8E8E8] text-gray-700 shadow-gray-200'}`}>
                🎬 Videographer · 🔐 Security · 💻 Dev
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }}
          className="flex justify-center mt-16"
        >
          <a href="#about" className={`flex flex-col items-center gap-1.5 text-[11px] tracking-widest uppercase ${dark ? 'text-gray-700' : 'text-gray-400'}`}>
            Scroll <ChevronDown size={14} className="animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Component: About ─────────────────────────────────────────────────────────
function About({ dark }: { dark: boolean }) {
  const skills = [
    { label: 'Wedding Videography', level: 90 },
    { label: 'Color Grading & Editing', level: 87 },
    { label: 'Cybersecurity / CTF', level: 68 },
    { label: 'Networking (Cisco/Mikrotik)', level: 72 },
    { label: 'Web Development', level: 74 },
  ]

  return (
    <section id="about" className={`py-28 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}
        >
          01 / About
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <motion.h2
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className={`text-4xl md:text-5xl font-black leading-[1.05] tracking-tight mb-8 ${dark ? 'text-white' : 'text-gray-900'}`}
            >
              Teknologi bertemu{' '}
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">visual</span>
              {' '}& keamanan{' '}
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">digital.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className={`text-sm leading-relaxed mb-5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Saya Muhammad Rifki Hidayatulloh, mahasiswa Informatika di UIN yang berbasis di Pandeglang, Banten.
              Di satu sisi saya merekam momen pernikahan paling berkesan dengan sentuhan sinematik,
              di sisi lain saya mendalami cybersecurity dan jaringan komputer sebagai fondasi karir teknologi.
            </motion.p>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
              className={`text-sm leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Perpaduan latar belakang yang unik ini memungkinkan saya mendekati setiap masalah dari berbagai
              sudut — kreativitas seorang filmmaker, presisi seorang developer, dan mindset analitis seorang
              security researcher.
            </motion.p>

            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-wrap gap-4 mt-10"
            >
              {[
                { value: '30+', label: 'Pernikahan Difilmkan' },
                { value: '5+', label: 'Sertifikasi' },
                { value: '4+', label: 'Organisasi' },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className={`flex flex-col px-5 py-4 rounded-2xl border ${dark ? 'border-[#1F1F1F] bg-[#111111]' : 'border-[#E8E8E8] bg-white shadow-sm'}`}
                >
                  <span className={`text-2xl font-black ${dark ? 'text-white' : 'text-gray-900'}`}>{s.value}</span>
                  <span className="text-xs mt-0.5 text-gray-500">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills */}
          <div>
            <motion.h3
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-8 ${dark ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Core Skills
            </motion.h3>
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-6"
            >
              {skills.map((skill) => (
                <motion.div key={skill.label} variants={fadeUp}>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{skill.label}</span>
                    <span className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>{skill.level}%</span>
                  </div>
                  <div className={`h-[3px] rounded-full ${dark ? 'bg-[#1F1F1F]' : 'bg-gray-100'}`}>
                    <motion.div
                      className="h-[3px] rounded-full bg-gradient-to-r from-violet-500 to-blue-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    />
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

// ─── Component: Experience ────────────────────────────────────────────────────
function WorkExperience({ dark }: { dark: boolean }) {
  return (
    <section id="experience" className={`py-28 ${dark ? 'bg-[#111111]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
            02 / Experience
          </p>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-16 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Pengalaman Kerja.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={fadeUp}
              className={`group relative rounded-3xl border p-7 flex flex-col gap-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${dark ? 'border-[#1F1F1F] bg-[#0A0A0A] hover:border-gray-700' : 'border-[#E8E8E8] bg-[#FAFAFA] hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${exp.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs ${dark ? 'bg-[#1F1F1F] text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {exp.icon}
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${dark ? 'bg-[#1F1F1F] text-gray-500' : 'bg-gray-100 text-gray-500'}`}>
                      {exp.type}
                    </span>
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.company}</p>
                <p className={`text-xs mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>{exp.period}</p>
                <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${dark ? 'bg-[#1F1F1F] text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Component: Certifications ────────────────────────────────────────────────
function Certifications({ dark }: { dark: boolean }) {
  return (
    <section id="certifications" className={`py-28 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
            03 / Licenses &amp; Certifications
          </p>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-16 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Sertifikasi.
          </h2>
        </motion.div>

        <div className="space-y-12">
          {certifications.map((group) => (
            <div key={group.year}>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`text-xs font-bold tracking-[0.2em] uppercase mb-5 ${dark ? 'text-gray-600' : 'text-gray-400'}`}
              >
                {group.year}
              </motion.p>
              <motion.div
                variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {group.items.map((cert, i) => (
                  <motion.div
                    key={`${cert.title}-${i}`}
                    variants={fadeUp}
                    className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-200 ${dark ? 'border-[#1F1F1F] bg-[#111111] hover:border-gray-700' : 'border-[#E8E8E8] bg-white hover:border-gray-300 hover:shadow-sm'}`}
                  >
                    <div className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${dark ? 'bg-[#1F1F1F]' : 'bg-gray-100'} ${cert.color}`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold leading-snug mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                        {cert.title}
                      </p>
                      <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {cert.issuer}
                      </p>
                      <p className={`text-[10px] mt-1 ${dark ? 'text-gray-700' : 'text-gray-400'}`}>
                        {cert.date}
                      </p>
                    </div>
                    <Award size={12} className={`flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${dark ? 'text-gray-600' : 'text-gray-400'}`} />
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

// ─── Component: Organizations ─────────────────────────────────────────────────
function Organizations({ dark }: { dark: boolean }) {
  return (
    <section id="organizations" className={`py-28 ${dark ? 'bg-[#111111]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
            04 / Organizational
          </p>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-16 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Kepemimpinan &amp; Organisasi.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-0"
        >
          {organizations.map((org, i) => (
            <motion.div
              key={`${org.org}-${i}`}
              variants={fadeUp}
              className={`group flex flex-col md:flex-row md:items-center gap-2 md:gap-12 py-7 border-b transition-all duration-200 ${
                dark
                  ? `border-[#1F1F1F] hover:bg-white/[0.02]${i === 0 ? ' border-t' : ''}`
                  : `border-[#E8E8E8] hover:bg-gray-50${i === 0 ? ' border-t' : ''}`
              }`}
            >
              <div className="flex items-center gap-3 md:min-w-[200px]">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${dark ? 'bg-[#1F1F1F] text-gray-500' : 'bg-gray-100 text-gray-500'}`}>
                  <Users size={13} />
                </div>
                <span className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>{org.period}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className={`text-base font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{org.role}</h3>
                  {org.current && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      Aktif
                    </span>
                  )}
                </div>
                <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-600'}`}>{org.org}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Component: Projects ──────────────────────────────────────────────────────
function Projects({ dark }: { dark: boolean }) {
  return (
    <section id="projects" className={`py-28 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#FAFAFA]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-4 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
            05 / Projects
          </p>
          <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Karya Saya.
          </h2>
          <p className={`text-sm mb-16 max-w-lg ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
            Koleksi proyek meliputi sinematografi pernikahan, keamanan digital, jaringan komputer, dan pengembangan web.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              className={`group relative rounded-3xl border p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${dark ? 'border-[#1F1F1F] bg-[#111111] hover:border-gray-700 hover:shadow-black/50' : 'border-[#E8E8E8] bg-white hover:border-gray-300 hover:shadow-gray-200/80'}`}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${dark ? 'bg-[#1F1F1F] text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {project.icon}
                  </div>
                  <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                    {project.category}
                  </span>
                </div>
                <h3 className={`text-xl font-bold mb-3 leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                <p className={`text-sm leading-relaxed mb-5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${dark ? 'bg-[#1F1F1F] text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${dark ? 'text-gray-700 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-700'}`}>
                  Lihat Detail <ExternalLink size={11} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Component: Footer / Contact ──────────────────────────────────────────────
function Footer({ dark }: { dark: boolean }) {
  const socials = [
    { icon: <Github size={17} />, label: 'GitHub', href: 'https://github.com/INISIAL-KICEL' },
    { icon: <Instagram size={17} />, label: 'Instagram', href: 'https://www.instagram.com/inisial_kicel/' },
    { icon: <Linkedin size={17} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-rifki-hidayatulloh-7250782bb/' },
  ]

  return (
    <footer id="contact" className={dark ? 'bg-[#111111]' : 'bg-gray-900'}>
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase mb-6 text-gray-500">06 / Contact</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            Mari Berkolaborasi<br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Bersama.</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-md leading-relaxed">
            Terbuka untuk proyek videografi pernikahan, kolaborasi pengembangan web, diskusi keamanan siber, dan peluang kerja lainnya.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-10"
        >
          {[
            { icon: <MapPin size={14} />, label: 'Pandeglang, Indonesia', href: '#' },
            { icon: <Phone size={14} />, label: 'WhatsApp: +62 895-3460-38858', href: 'https://wa.me/62895346038858' },
            { icon: <Linkedin size={14} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammad-rifki-hidayatulloh-7250782bb/' },
          ].map((c) => (
            <motion.a
              key={c.label}
              variants={fadeUp}
              href={c.href}
              target={c.href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              {c.icon} {c.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="https://wa.me/62895346038858"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform"
          >
            Let's Work Together <ArrowRight size={14} />
          </a>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all hover:scale-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <div className={`border-t border-white/5 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
          <span className="text-xs text-gray-700">
            © 2025 Muhammad Rifki Hidayatulloh — Pandeglang, Indonesia.
          </span>
          <div className="flex gap-6">
            {['About', 'Projects', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-xs text-gray-700 hover:text-gray-400 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div>
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Hero dark={dark} />
      <About dark={dark} />
      <WorkExperience dark={dark} />
      <Certifications dark={dark} />
      <Organizations dark={dark} />
      <Projects dark={dark} />
      <Footer dark={dark} />
    </div>
  )
}
