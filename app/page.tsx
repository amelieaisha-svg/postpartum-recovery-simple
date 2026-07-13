'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, ArrowRight, Menu, X, MessageCircle, Calendar, Baby } from 'lucide-react'
import { LogoBadge } from '@/components/Logo'
import { Sprig } from '@/components/Decor'

const features = [
  { icon: MessageCircle, title: 'Group Chats', text: 'Join topic-based groups and connect with moms on the same journey.', chip: 'bg-babyPink text-[#9d5468]' },
  { icon: Calendar, title: 'Activities', text: 'Yoga, walks, exercise classes, and picnics — together with other moms.', chip: 'bg-warmPeach text-primary-700' },
  { icon: Heart, title: 'Peer Support', text: 'Request meals or childcare, and offer a hand when you can.', chip: 'bg-warmPink text-[#9d5468]' },
  { icon: Baby, title: 'Babysitters', text: 'Find trusted, verified babysitters right in your community.', chip: 'bg-babyPinkSoft text-[#9d5468] ring-1 ring-black/5' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-creamBg text-slate-700">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-black/5 sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoBadge badgeClassName="w-11 h-11" markClassName="w-7 h-7" />
            <h1 className="font-display text-xl font-bold text-primary-800">Postpartum<span className="text-[#a85c6e]">Recovery</span></h1>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-primary-800">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-2 items-center">
            <Link href="/app" className="px-4 py-2 text-primary-700 font-semibold hover:text-primary-900">
              Enter App
            </Link>
            <Link href="/app" className="btn-primary">Get Started</Link>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-black/5 px-6 py-4">
            <Link href="/app" className="block py-2 text-primary-700 font-semibold">Enter App</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* botanical accents */}
        <Sprig className="hidden md:block absolute -left-10 bottom-0 w-40 text-[#adbb9f] opacity-60 -rotate-12 pointer-events-none" />
        <Sprig className="hidden lg:block absolute left-24 -top-6 w-24 text-[#d9aeb2] opacity-50 rotate-6 pointer-events-none" />

        <div className="relative grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-babyPink text-[#9d5468] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Heart size={14} /> A gentle community for new moms
            </span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-900 mb-6 leading-[1.05]">
              Your postpartum
              <br />
              <span className="italic text-[#a85c6e]">journey, together</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-md">
              Connect with other moms, join activities, request support, and build a community that carries you through recovery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/app" className="btn-primary flex items-center gap-2">
                Explore Now <ArrowRight size={20} />
              </Link>
              <a href="#features" className="px-6 py-3 rounded-full font-semibold text-primary-800 bg-white hover:bg-babyPinkSoft transition-colors ring-1 ring-black/5 flex items-center gap-2">
                See how it works <ArrowRight size={18} />
              </a>
            </div>

            <div className="flex items-center gap-6 mt-10 text-sm text-slate-500">
              <div><span className="block text-2xl font-bold text-primary-900">4</span>Support groups</div>
              <div className="h-8 w-px bg-black/10" />
              <div><span className="block text-2xl font-bold text-primary-900">10+</span>Weekly activities</div>
              <div className="h-8 w-px bg-black/10" />
              <div><span className="block text-2xl font-bold text-primary-900">24/7</span>Community care</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -m-4 bg-warmPink/30 rounded-[2.5rem] blur-2xl" aria-hidden />
            <div className="relative bg-blush rounded-[2rem] aspect-square max-w-md mx-auto flex items-center justify-center shadow-sm ring-1 ring-black/5">
              <div className="text-center px-6">
                <LogoBadge badgeClassName="w-44 h-44 mx-auto mb-5" markClassName="w-28 h-28" />
                <p className="font-display text-3xl md:text-4xl text-[#894257]">Moms Supporting Moms</p>
                <div className="flex items-center justify-center gap-3 mt-4 text-[#b9808c]">
                  <span className="h-px w-10 bg-current opacity-50" />
                  <Heart size={16} fill="currentColor" />
                  <span className="h-px w-10 bg-current opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20 md:py-28 border-y border-black/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#9d5468] font-semibold text-sm uppercase tracking-wider">Everything in one place</span>
            <h3 className="font-display text-4xl md:text-5xl text-primary-900 mt-3">How PostpartumRecovery helps</h3>
            <p className="text-slate-500 mt-4 text-lg">Simple, warm tools to help you feel supported — never alone.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-creamBg/50 rounded-2xl p-7 ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${f.chip}`}>
                  <f.icon size={26} />
                </div>
                <h4 className="font-bold text-lg text-primary-900 mb-2">{f.title}</h4>
                <p className="text-slate-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-babyPink to-warmPeach rounded-[2rem] px-8 py-14 md:py-20 text-center shadow-sm">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="font-display text-4xl md:text-5xl text-primary-900 mb-4">Ready to join your community?</h3>
            <p className="text-slate-700 text-lg mb-8">Start connecting with moms today and get the support you deserve.</p>
            <Link href="/app" className="inline-flex items-center gap-2 bg-primary-800 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-900 transition-colors">
              Enter the App <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-babyPinkSoft border-t border-black/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <LogoBadge badgeClassName="w-9 h-9" markClassName="w-5 h-5" />
            <span className="font-display font-bold text-primary-800">Postpartum<span className="text-[#a85c6e]">Recovery</span></span>
          </div>
          <p className="text-slate-500 text-sm">Supporting moms through their postpartum journey.</p>
          <p className="text-slate-400 text-sm">&copy; 2026 PostpartumRecovery</p>
        </div>
      </footer>
    </div>
  )
}
