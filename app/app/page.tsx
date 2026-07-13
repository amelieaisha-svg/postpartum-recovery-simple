'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { mockUser, mockGroups, mockActivities, mockHelpRequests, mockBabysitters } from '@/lib/mockData'
import { Menu, X, Heart, Plus, MapPin, Users, Calendar, Sparkles, ArrowRight, MessageCircle, Baby, ChevronRight } from 'lucide-react'
import { LogoBadge } from '@/components/Logo'

type ModalType = null | 'group' | 'activity' | 'help'

export default function AppPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'community' | 'activities' | 'help' | 'babysitters'>('dashboard')

  // Interactive, user-editable data (starts from the mock seed data)
  const [groups, setGroups] = useState<any[]>(mockGroups)
  const [activities, setActivities] = useState<any[]>(mockActivities)
  const [helpRequests, setHelpRequests] = useState<any[]>(
    mockHelpRequests.map((r) => ({ mode: 'request', ...r }))
  )

  const [modal, setModal] = useState<ModalType>(null)

  // Friendly date, set on the client to avoid SSR/build hydration mismatch
  const [today, setToday] = useState('')
  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
  }, [])

  const firstName = mockUser.name?.split(' ')[0]
  const activityEmoji = (t: string) =>
    ({ yoga: '🧘‍♀️', exercise: '💪', walk: '🚶‍♀️', picnic: '🧺', social: '☕' } as Record<string, string>)[t] || '🌸'

  // ---- form state ----
  const [groupForm, setGroupForm] = useState({ name: '', topic: '', description: '' })
  const [activityForm, setActivityForm] = useState({
    title: '', type: 'yoga', date: '', time: '', location: '', distanceKm: '',
  })
  const [helpForm, setHelpForm] = useState({
    mode: 'request', title: '', type: 'meal', description: '',
  })

  const openHelpRequests = helpRequests.filter((r) => r.status === 'open')

  // ---- create handlers ----
  const createGroup = () => {
    if (!groupForm.name.trim()) return
    setGroups([
      {
        id: `g-${Date.now()}`,
        name: groupForm.name,
        topic: groupForm.topic || 'general',
        description: groupForm.description,
        members: [mockUser],
        messageCount: 0,
      },
      ...groups,
    ])
    setGroupForm({ name: '', topic: '', description: '' })
    setModal(null)
  }

  const createActivity = () => {
    if (!activityForm.title.trim()) return
    setActivities([
      {
        id: `a-${Date.now()}`,
        title: activityForm.title,
        type: activityForm.type,
        date: activityForm.date || 'TBD',
        time: activityForm.time || 'TBD',
        location: activityForm.location || 'TBD',
        distanceKm: activityForm.distanceKm ? Number(activityForm.distanceKm) : 0,
        description: '',
        capacity: 20,
        participants: [mockUser],
      },
      ...activities,
    ])
    setActivityForm({ title: '', type: 'yoga', date: '', time: '', location: '', distanceKm: '' })
    setModal(null)
  }

  const createHelp = () => {
    if (!helpForm.title.trim()) return
    setHelpRequests([
      {
        id: `h-${Date.now()}`,
        mode: helpForm.mode,
        title: helpForm.title,
        type: helpForm.type,
        description: helpForm.description,
        date: new Date().toISOString().slice(0, 10),
        status: 'open',
        requestedBy: mockUser,
        helpOffers: [],
      },
      ...helpRequests,
    ])
    setHelpForm({ mode: 'request', title: '', type: 'meal', description: '' })
    setModal(null)
  }

  const inputClass =
    'w-full border border-primary-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-400'

  return (
    <div className="min-h-screen bg-creamBg">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 font-bold">
            <LogoBadge badgeClassName="w-10 h-10" markClassName="w-7 h-7" />
            <h1 className="text-xl font-bold text-primary-800 hidden md:block">PostpartumRecovery</h1>
          </Link>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-6 items-center">
            {(['dashboard', 'community', 'activities', 'help', 'babysitters'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-semibold capitalize ${
                  activeTab === tab ? 'text-primary-700' : 'text-slate-700 hover:text-primary-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-4 space-y-4">
              {(['dashboard', 'community', 'activities', 'help', 'babysitters'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setMobileMenuOpen(false) }}
                  className="block w-full text-left text-slate-700 hover:text-primary-600 font-semibold py-2 capitalize"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-warmPink via-babyPink to-warmPeach rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="relative z-10 max-w-xl">
                <p className="text-primary-700 font-medium mb-2 h-6">{today}</p>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                  Welcome back, {firstName} 🌸
                </h2>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  You&apos;re doing beautifully. Here&apos;s what&apos;s happening in your community today.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('activities')} className="btn-primary flex items-center gap-2">
                    Browse activities <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => setModal('help')}
                    className="bg-white/70 backdrop-blur text-primary-800 font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors"
                  >
                    Ask for help
                  </button>
                </div>
              </div>
              <div className="hidden md:block absolute -right-4 -bottom-6 opacity-95">
                <LogoBadge badgeClassName="w-48 h-48 shadow-md" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Groups', value: groups.length, icon: Users, chip: 'bg-blue-100 text-blue-600', tab: 'community' as const },
                { label: 'Activities', value: activities.length, icon: Calendar, chip: 'bg-warmPeach text-primary-700', tab: 'activities' as const },
                { label: 'Open help', value: openHelpRequests.length, icon: Heart, chip: 'bg-warmPink text-primary-800', tab: 'help' as const },
                { label: 'Babysitters', value: mockBabysitters.length, icon: Baby, chip: 'bg-purple-100 text-purple-600', tab: 'babysitters' as const },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setActiveTab(s.tab)}
                  className="bg-white rounded-2xl shadow-sm p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.chip}`}>
                    <s.icon size={20} />
                  </div>
                  <div className="text-2xl font-bold text-primary-900">{s.value}</div>
                  <p className="text-sm text-slate-500">{s.label}</p>
                </button>
              ))}
            </div>

            {/* Main grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Upcoming activities */}
                <section className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-primary-900">Upcoming activities</h3>
                    <button onClick={() => setActiveTab('activities')} className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      See all <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {activities.slice(0, 3).map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setActiveTab('activities')}
                        className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-creamBg/60 transition-colors text-left"
                      >
                        <div className="w-12 h-12 rounded-xl bg-warmPeach/50 flex items-center justify-center text-2xl shrink-0">
                          {activityEmoji(a.type)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-primary-900 truncate">{a.title}</p>
                          <p className="text-sm text-slate-500 truncate">
                            {a.date} · {a.time}
                            {a.location === 'Virtual' || a.distanceKm === 0
                              ? ' · Online'
                              : ` · ${a.distanceKm} km away`}
                          </p>
                        </div>
                        <ChevronRight size={18} className="text-slate-300 shrink-0" />
                      </button>
                    ))}
                  </div>
                </section>

                {/* Community help */}
                <section className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-primary-900">Moms who need a hand</h3>
                    <button onClick={() => setActiveTab('help')} className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                      See all <ChevronRight size={16} />
                    </button>
                  </div>
                  {openHelpRequests.length === 0 ? (
                    <p className="text-slate-500 text-sm">No open requests right now — all caught up!</p>
                  ) : (
                    <div className="space-y-3">
                      {openHelpRequests.slice(0, 3).map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setActiveTab('help')}
                          className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-creamBg/60 transition-colors text-left"
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${r.mode === 'offer' ? 'bg-blue-50' : 'bg-warmPink/40'}`}>
                            {r.mode === 'offer' ? '🙌' : '🙏'}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-primary-900 truncate">{r.title}</p>
                            <p className="text-sm text-slate-500 truncate">{r.type} · by {r.requestedBy.name}</p>
                          </div>
                          <span className="text-xs font-semibold text-primary-600 shrink-0">
                            {r.mode === 'offer' ? 'Reach out' : 'Offer help'}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Quick actions */}
                <section className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-primary-900 mb-4">Quick actions</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Start a group chat', icon: MessageCircle, chip: 'bg-blue-100 text-blue-600', onClick: () => setModal('group') },
                      { label: 'Create an activity', icon: Calendar, chip: 'bg-warmPeach text-primary-700', onClick: () => setModal('activity') },
                      { label: 'Request or offer help', icon: Heart, chip: 'bg-warmPink text-primary-800', onClick: () => setModal('help') },
                      { label: 'Find a babysitter', icon: Baby, chip: 'bg-purple-100 text-purple-600', onClick: () => setActiveTab('babysitters') },
                    ].map((q) => (
                      <button
                        key={q.label}
                        onClick={q.onClick}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-creamBg/60 transition-colors text-left"
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${q.chip}`}>
                          <q.icon size={18} />
                        </div>
                        <span className="font-medium text-slate-700 flex-1">{q.label}</span>
                        <ChevronRight size={16} className="text-slate-300" />
                      </button>
                    ))}
                  </div>
                </section>

                {/* Wellness card */}
                <section className="bg-babyPink rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3 text-primary-800">
                    <Sparkles size={18} />
                    <span className="font-semibold text-sm uppercase tracking-wide">Gentle reminder</span>
                  </div>
                  <p className="text-primary-900 text-lg font-medium leading-relaxed">
                    Rest is productive too. Take a slow breath — you and your baby are exactly where you need to be. 💗
                  </p>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Community Groups */}
        {activeTab === 'community' && (
          <div>
            <div className="flex items-start justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-bold text-primary-900 mb-2">Community Groups</h1>
                <p className="text-slate-700">Connect with moms around topics that matter to you</p>
              </div>
              <button onClick={() => setModal('group')} className="btn-primary flex items-center gap-2 shrink-0">
                <Plus size={20} /> New Group
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
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
                    <button className="text-primary-600 font-semibold hover:text-primary-700">Join →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {activeTab === 'activities' && (
          <div>
            <div className="flex items-start justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-bold text-primary-900 mb-2">Activities</h1>
                <p className="text-slate-700">Join yoga, walks, exercise classes, and more</p>
              </div>
              <button onClick={() => setModal('activity')} className="btn-primary flex items-center gap-2 shrink-0">
                <Plus size={20} /> New Activity
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div key={activity.id} className="card">
                  <h3 className="text-lg font-bold text-primary-900 mb-2">{activity.title}</h3>
                  <span className="inline-block bg-warmPeach text-slate-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {activity.type}
                  </span>
                  <div className="space-y-2 mb-4 text-sm text-slate-600">
                    <div>📅 {activity.date} at {activity.time}</div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-primary-500" />
                      {activity.location === 'Virtual' || activity.distanceKm === 0
                        ? <span>{activity.location === 'Virtual' ? 'Online' : activity.location}</span>
                        : <span>{activity.location} · <span className="font-semibold text-primary-600">{activity.distanceKm} km away</span></span>}
                    </div>
                    <div>👥 {activity.participants.length} / {activity.capacity} registered</div>
                  </div>
                  {activity.description && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
                  )}
                  <button className="w-full btn-secondary mt-4">Register</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Requests */}
        {activeTab === 'help' && (
          <div>
            <div className="flex items-start justify-between mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-bold text-primary-900 mb-2">Help & Support</h1>
                <p className="text-slate-700">Request help or offer support to your community</p>
              </div>
              <button onClick={() => setModal('help')} className="btn-primary flex items-center gap-2 shrink-0">
                <Plus size={20} /> Add Post
              </button>
            </div>

            <div className="space-y-6">
              {helpRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-primary-900 mb-2">{request.title}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                          request.mode === 'offer' ? 'bg-blue-100 text-blue-700' : 'bg-warmPink text-slate-900'
                        }`}>
                          {request.mode === 'offer' ? '🙌 Offering' : '🙏 Requesting'}
                        </span>
                        <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {request.type}
                        </span>
                        <span className="text-sm text-slate-600">by {request.requestedBy.name}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {request.status === 'open' ? 'Open' : 'Claimed'}
                    </span>
                  </div>

                  {request.description && (
                    <p className="text-slate-700 mb-4">{request.description}</p>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-sm text-slate-500">{request.helpOffers.length} {request.mode === 'offer' ? 'responses' : 'offers of help'}</span>
                    {request.status === 'open' && (
                      <button className="btn-secondary flex items-center gap-2">
                        <Heart size={18} /> {request.mode === 'offer' ? 'Reach Out' : 'Offer Help'}
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
                        <div className="flex items-center gap-1 text-yellow-500 text-sm">⭐ Verified</div>
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
                      <div className="flex items-center gap-2"><span>{sitter.experience}</span></div>
                    )}
                  </div>
                  <button className="w-full btn-secondary">Contact</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Floating create button (context-aware) */}
      {['community', 'activities', 'help'].includes(activeTab) && (
        <button
          onClick={() => setModal(activeTab === 'community' ? 'group' : activeTab === 'activities' ? 'activity' : 'help')}
          className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg flex items-center justify-center hover:bg-primary-700 transition-colors z-40"
          aria-label="Create new"
        >
          <Plus size={28} />
        </button>
      )}

      {/* ---------- Modals ---------- */}
      {modal && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary-900">
                {modal === 'group' && 'New Group Chat'}
                {modal === 'activity' && 'New Activity'}
                {modal === 'help' && 'New Post'}
              </h3>
              <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-700">
                <X size={24} />
              </button>
            </div>

            {/* Group form */}
            {modal === 'group' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Group name</label>
                  <input className={inputClass} placeholder="e.g. Third Trimester & Newborns"
                    value={groupForm.name} onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Topic</label>
                  <input className={inputClass} placeholder="e.g. yoga, mental-health, feeding"
                    value={groupForm.topic} onChange={(e) => setGroupForm({ ...groupForm, topic: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                  <textarea className={inputClass} rows={3} placeholder="What is this group about?"
                    value={groupForm.description} onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })} />
                </div>
                <button onClick={createGroup} className="btn-primary w-full">Create Group</button>
              </div>
            )}

            {/* Activity form */}
            {modal === 'activity' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Activity title</label>
                  <input className={inputClass} placeholder="e.g. Sunset Stroller Walk"
                    value={activityForm.title} onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                  <select className={inputClass} value={activityForm.type}
                    onChange={(e) => setActivityForm({ ...activityForm, type: e.target.value })}>
                    <option value="yoga">Yoga</option>
                    <option value="exercise">Exercise</option>
                    <option value="walk">Walk</option>
                    <option value="picnic">Picnic</option>
                    <option value="social">Social</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                    <input type="date" className={inputClass}
                      value={activityForm.date} onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Time</label>
                    <input type="time" className={inputClass}
                      value={activityForm.time} onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                  <input className={inputClass} placeholder="e.g. Riverside Park"
                    value={activityForm.location} onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Distance from you (km)</label>
                  <input type="number" min="0" step="0.1" className={inputClass} placeholder="e.g. 2.5"
                    value={activityForm.distanceKm} onChange={(e) => setActivityForm({ ...activityForm, distanceKm: e.target.value })} />
                </div>
                <button onClick={createActivity} className="btn-primary w-full">Create Activity</button>
              </div>
            )}

            {/* Help form */}
            {modal === 'help' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">I want to…</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setHelpForm({ ...helpForm, mode: 'request' })}
                      className={`py-3 rounded-lg font-semibold border-2 transition-colors ${
                        helpForm.mode === 'request' ? 'border-warmPink bg-warmPink/30 text-primary-900' : 'border-primary-200 text-slate-600'
                      }`}>
                      🙏 Request help
                    </button>
                    <button type="button" onClick={() => setHelpForm({ ...helpForm, mode: 'offer' })}
                      className={`py-3 rounded-lg font-semibold border-2 transition-colors ${
                        helpForm.mode === 'offer' ? 'border-blue-300 bg-blue-50 text-blue-800' : 'border-primary-200 text-slate-600'
                      }`}>
                      🙌 Offer help
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                  <input className={inputClass}
                    placeholder={helpForm.mode === 'offer' ? 'e.g. Happy to cook a meal this week' : 'e.g. Need a meal on Tuesday'}
                    value={helpForm.title} onChange={(e) => setHelpForm({ ...helpForm, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                  <select className={inputClass} value={helpForm.type}
                    onChange={(e) => setHelpForm({ ...helpForm, type: e.target.value })}>
                    <option value="meal">Meal</option>
                    <option value="childcare">Childcare</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="emotional">Emotional support</option>
                    <option value="errands">Errands</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Details</label>
                  <textarea className={inputClass} rows={3} placeholder="Add a few details…"
                    value={helpForm.description} onChange={(e) => setHelpForm({ ...helpForm, description: e.target.value })} />
                </div>
                <button onClick={createHelp} className="btn-primary w-full">
                  {helpForm.mode === 'offer' ? 'Post Offer' : 'Post Request'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
