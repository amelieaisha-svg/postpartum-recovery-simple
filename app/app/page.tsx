'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockUser, mockGroups, mockActivities, mockHelpRequests, mockBabysitters } from '@/lib/mockData'
import { Menu, X, Heart, Plus, MapPin } from 'lucide-react'
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
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-warmPink to-warmPeach rounded-2xl p-8 shadow-md">
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Welcome back, {mockUser.name?.split(' ')[0]}! 👋</h2>
              <p className="text-slate-700">How can we support you today?</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{groups.length}</div>
                <p className="text-slate-600">Groups</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-3xl font-bold text-warmPeach mb-2">{activities.length}</div>
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
