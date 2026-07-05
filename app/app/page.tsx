'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockUser, mockGroups, mockActivities, mockHelpRequests, mockBabysitters } from '@/lib/mockData'
import { Menu, X, Users, Activity as ActivityIcon, Heart, Baby } from 'lucide-react'

export default function AppPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'activities' | 'help' | 'babysitters'>('dashboard')

  const openHelpRequests = mockHelpRequests.filter(r => r.status === 'open')

  return (
    <div className="min-h-screen bg-creamBg">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 font-bold">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-warmPink rounded-full flex items-center justify-center text-white text-lg">
              👭
            </div>
            <h1 className="text-xl font-bold text-primary-800 hidden md:block">PostpartumRecovery</h1>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-6 items-center">
            <button onClick={() => setActiveTab('dashboard')} className="text-slate-700 hover:text-primary-600 font-semibold">
              Dashboard
            </button>
            <button onClick={() => setActiveTab('community')} className="text-slate-700 hover:text-primary-600 font-semibold">
              Community
            </button>
            <button onClick={() => setActiveTab('activities')} className="text-slate-700 hover:text-primary-600 font-semibold">
              Activities
            </button>
            <button onClick={() => setActiveTab('help')} className="text-slate-700 hover:text-primary-600 font-semibold">
              Help
            </button>
            <button onClick={() => setActiveTab('babysitters')} className="text-slate-700 hover:text-primary-600 font-semibold">
              Babysitters
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-700 hover:text-primary-600 font-semibold py-2">
                Dashboard
              </button>
              <button onClick={() => { setActiveTab('community'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-700 hover:text-primary-600 font-semibold py-2">
                Community
              </button>
              <button onClick={() => { setActiveTab('activities'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-700 hover:text-primary-600 font-semibold py-2">
                Activities
              </button>
              <button onClick={() => { setActiveTab('help'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-700 hover:text-primary-600 font-semibold py-2">
                Help
              </button>
              <button onClick={() => { setActiveTab('babysitters'); setMobileMenuOpen(false); }} className="block w-full text-left text-slate-700 hover:text-primary-600 font-semibold py-2">
                Babysitters
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-warmPink to-warmPeach rounded-2xl p-8 shadow-md">
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Welcome back, {mockUser.name?.split(' ')[0]}! 👋</h2>
              <p className="text-slate-700">How can we support you today?</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{mockGroups.length}</div>
                <p className="text-slate-600">Groups</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-warmPeach mb-2">{mockActivities.length}</div>
                <p className="text-slate-600">Activities</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-warmPink mb-2">{openHelpRequests.length}</div>
                <p className="text-slate-600">Help Requests</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-primary-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setActiveTab('community')} className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <h5 className="font-semibold text-slate-900">Community</h5>
                </button>

                <button onClick={() => setActiveTab('activities')} className="bg-gradient-to-br from-warmPeach to-warmPeach/50 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-3">🧘</div>
                  <h5 className="font-semibold text-slate-900">Activities</h5>
                </button>

                <button onClick={() => setActiveTab('help')} className="bg-gradient-to-br from-warmPink to-warmPink/50 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h5 className="font-semibold text-slate-900">Help</h5>
                </button>

                <button onClick={() => setActiveTab('babysitters')} className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow text-center">
                  <div className="text-4xl mb-3">👶</div>
                  <h5 className="font-semibold text-slate-900">Babysitters</h5>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Community Groups */}
        {activeTab === 'community' && (
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-2">Community Groups</h1>
            <p className="text-slate-700 mb-8">Connect with moms around topics that matter to you</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGroups.map((group) => (
                <div key={group.id} className="card cursor-pointer hover:shadow-lg transition-all">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">{group.name}</h3>
                  <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {group.topic}
                  </span>
                  {group.description && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-slate-500">{group.members.length} members</span>
                    <button className="text-primary-600 font-semibold hover:text-primary-700">
                      Join →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {activeTab === 'activities' && (
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-2">Activities</h1>
            <p className="text-slate-700 mb-8">Join yoga, walks, exercise classes, and more</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="card">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">{activity.title}</h3>
                  <span className="inline-block bg-warmPeach text-slate-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {activity.type}
                  </span>
                  <div className="space-y-2 mb-4 text-sm text-slate-600">
                    <div>📅 {activity.date} at {activity.time}</div>
                    <div>📍 {activity.location}</div>
                    <div>👥 {activity.participants.length} / {activity.capacity} registered</div>
                  </div>
                  {activity.description && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
                  )}
                  <button className="w-full btn-secondary mt-4">
                    Register
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Requests */}
        {activeTab === 'help' && (
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-2">Help & Support</h1>
            <p className="text-slate-700 mb-8">Request help or support your community</p>

            <div className="space-y-6">
              {mockHelpRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary-900 mb-2">{request.title}</h3>
                      <div className="flex items-center gap-4">
                        <span className="inline-block bg-warmPink text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                          {request.type}
                        </span>
                        <span className="text-sm text-slate-600">Requested by {request.requestedBy.name}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'open'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {request.status === 'open' ? 'Open' : 'Claimed'}
                    </span>
                  </div>

                  {request.description && (
                    <p className="text-slate-700 mb-4">{request.description}</p>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-slate-500">{request.helpOffers.length} offers of help</span>
                    {request.status === 'open' && (
                      <button className="btn-secondary flex items-center gap-2">
                        <Heart size={18} /> Offer Help
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Babysitters */}
        {activeTab === 'babysitters' && (
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-2">Babysitters</h1>
            <p className="text-slate-700 mb-8">Find trusted childcare in your community</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBabysitters.map((sitter) => (
                <div key={sitter.id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary-900 mb-1">{sitter.name}</h3>
                      {sitter.verified && (
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                          ⭐ Verified
                        </div>
                      )}
                    </div>
                  </div>

                  {sitter.bio && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{sitter.bio}</p>
                  )}

                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    {sitter.rate && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-primary-600">${sitter.rate.toFixed(2)}/hr</span>
                      </div>
                    )}
                    {sitter.experience && (
                      <div className="flex items-center gap-2">
                        <span>{sitter.experience}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full btn-secondary">
                    Contact
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
