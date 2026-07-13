'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, Users, Activity, ArrowRight, Menu, X } from 'lucide-react'
import { LogoBadge } from '@/components/Logo'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-creamBg via-white to-warmPeach">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoBadge badgeClassName="w-12 h-12" markClassName="w-7 h-7" />
            <h1 className="text-2xl font-bold text-primary-800">PostpartumRecovery</h1>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-4">
            <Link href="/app" className="text-primary-700 font-semibold hover:text-primary-900">
              Enter App
            </Link>
            <Link href="/app" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4">
            <Link href="/app" className="block py-2 text-primary-700 font-semibold">
              Enter App
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-primary-900 mb-6 leading-tight">
              Your postpartum journey, together
            </h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Connect with other moms, join activities, request support, and build a supportive community during your postpartum recovery.
            </p>
            <div className="flex gap-4">
              <Link href="/app" className="btn-primary flex items-center gap-2">
                Explore Now <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-warmPink to-warmPeach rounded-3xl h-96 flex items-center justify-center shadow-xl">
            <div className="text-center">
              <LogoBadge badgeClassName="w-40 h-40 mx-auto mb-4" markClassName="w-28 h-28" />
              <p className="text-primary-900 font-semibold text-lg">Moms Supporting Moms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-bold text-primary-900 mb-16 text-center">How PostpartumRecovery Helps</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                💬
              </div>
              <h4 className="font-bold text-lg text-primary-900 mb-2">Group Chats</h4>
              <p className="text-slate-700">Join topic-based groups and connect with moms on your journey</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warmPeach rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🧘
              </div>
              <h4 className="font-bold text-lg text-primary-900 mb-2">Activities</h4>
              <p className="text-slate-700">Yoga, walks, exercise classes, and more with other moms</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                🤝
              </div>
              <h4 className="font-bold text-lg text-primary-900 mb-2">Peer Support</h4>
              <p className="text-slate-700">Request meals, childcare, or offer help to neighbors</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                👶
              </div>
              <h4 className="font-bold text-lg text-primary-900 mb-2">Babysitters</h4>
              <p className="text-slate-700">Find trusted, verified babysitters in your community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-warmPink py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Join Your Community?</h3>
          <p className="text-white text-lg mb-8">Start connecting with moms today and get the support you deserve</p>
          <Link href="/app" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all">
            Enter the App →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="mb-4">Supporting moms through their postpartum journey</p>
          <p className="text-primary-200">&copy; 2024 PostpartumRecovery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
