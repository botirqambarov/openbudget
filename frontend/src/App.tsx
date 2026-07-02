import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Vote, 
  Users, 
  CreditCard, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Plus, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

interface StatsData {
  totalVotes: number;
  todayVotes: number;
  activeProjects: number;
  totalUsers: number;
  pendingWithdrawals: number;
  totalReferralExpense: number;
  botBalance: number;
}

interface ProjectData {
  id: string;
  name: string;
  openBudgetUrl: string;
  telegramBotUrl: string;
  autoStopLimit: number;
  currentVotes: number;
  isActive: boolean;
}

interface UserData {
  telegramId: number;
  firstName: string;
  phone?: string;
  mainBalance: number;
  pendingBalance: number;
  referralEarned: number;
  totalEarned: number;
  joinedAt: string;
}

interface WithdrawalData {
  id: string;
  userId: number;
  cardNumber: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

interface SettingsData {
  votePrice: number;
  referralBonus: number;
  minWithdrawal: number;
  maxWithdrawal: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'users' | 'withdrawals' | 'settings'>('dashboard');
  
  const [stats, setStats] = useState<StatsData>({
    totalVotes: 1537,
    todayVotes: 931,
    activeProjects: 4,
    totalUsers: 245,
    pendingWithdrawals: 3,
    totalReferralExpense: 480000,
    botBalance: 5000000
  });

  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: 'p_shifokor',
      name: 'Shifokor (Shahzod Ochildiyev)',
      openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/1',
      telegramBotUrl: 'https://t.me/openbudget_navoiy_bot',
      autoStopLimit: 5000,
      currentVotes: 931,
      isActive: true
    },
    {
      id: 'p_ilgor',
      name: "Ilg'or (Sherzod Abdiyev)",
      openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/2',
      telegramBotUrl: 'https://t.me/openbudget_ilgor_bot',
      autoStopLimit: 5000,
      currentVotes: 429,
      isActive: true
    },
    {
      id: 'p_sebiston_1',
      name: 'Sebiston (Bohodir Jonuzoqov)',
      openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/3',
      telegramBotUrl: 'https://t.me/openbudget_sebiston1_bot',
      autoStopLimit: 5000,
      currentVotes: 57,
      isActive: true
    }
  ]);

  const [users, setUsers] = useState<UserData[]>([
    {
      telegramId: 12345678,
      firstName: 'Botir Qambarov',
      phone: '998901234567',
      mainBalance: 25000,
      pendingBalance: 10000,
      referralEarned: 12000,
      totalEarned: 37000,
      joinedAt: '2026-06-24'
    },
    {
      telegramId: 87654321,
      firstName: 'Alisher Navoiy',
      phone: '998937654321',
      mainBalance: 15000,
      pendingBalance: 0,
      referralEarned: 4000,
      totalEarned: 19000,
      joinedAt: '2026-06-25'
    }
  ]);

  const [withdrawals, setWithdrawals] = useState<WithdrawalData[]>([
    {
      id: 'w_1',
      userId: 12345678,
      cardNumber: '8600 1234 5678 9012',
      amount: 10000,
      status: 'PENDING',
      createdAt: '2026-07-02 21:05'
    }
  ]);

  const [settings, setSettings] = useState<SettingsData>({
    votePrice: 5000,
    referralBonus: 2000,
    minWithdrawal: 10000,
    maxWithdrawal: 500000
  });

  const handleApproveWithdrawal = (id: string) => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'APPROVED' } : w));
  };

  const handleRejectWithdrawal = (id: string) => {
    setWithdrawals(prev => prev.map(w => w.id === id ? { ...w, status: 'REJECTED' } : w));
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Sozlamalar saqlandi!");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <Vote size={28} />
          <div>OPEN<span>BUDGET</span></div>
        </div>

        <div className="sidebar-nav">
          <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button className={`nav-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <Vote size={20} />
            Loyihalar ({projects.length})
          </button>
          <button className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <Users size={20} />
            Foydalanuvchilar
          </button>
          <button className={`nav-btn ${activeTab === 'withdrawals' ? 'active' : ''}`} onClick={() => setActiveTab('withdrawals')}>
            <CreditCard size={20} />
            Pul Yechish ({withdrawals.filter(w => w.status === 'PENDING').length})
          </button>
          <button className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            Narx & Sozlamalar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-title">
            <h1>Open Budget Enterprise Admin Panel</h1>
            <p>O'zbekiston mahallalari o'rtasidagi ovoz yig'ish va balans boshqaruvi</p>
          </div>
          <div className="badge badge-success" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
            ● System Status: Operational (99.9%)
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid-stats">
              <div className="stat-card">
                <div className="stat-info">
                  <div className="label">Bugungi Ovozlar</div>
                  <div className="value" style={{ color: '#10b981' }}>{stats.todayVotes.toLocaleString()}</div>
                </div>
                <div className="stat-icon"><TrendingUp /></div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <div className="label">Umumiy Ovozlar</div>
                  <div className="value">{stats.totalVotes.toLocaleString()}</div>
                </div>
                <div className="stat-icon"><Vote /></div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <div className="label">Foydalanuvchilar</div>
                  <div className="value">{stats.totalUsers}</div>
                </div>
                <div className="stat-icon"><Users /></div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <div className="label">Referal Xarajatlari</div>
                  <div className="value" style={{ color: '#f59e0b' }}>{stats.totalReferralExpense.toLocaleString()} UZS</div>
                </div>
                <div className="stat-icon"><DollarSign /></div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">
                <span>Aktiv Loyihalar Holati</span>
                <button className="btn btn-primary" onClick={() => setActiveTab('projects')}>
                  <Plus size={16} /> Yangi Loyiha
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Loyiha Nomi</th>
                    <th>OpenBudget Ssilka</th>
                    <th>Yig'ilgan Ovoz</th>
                    <th>Auto Stop Limit</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 700 }}>{p.name}</td>
                      <td>
                        <a href={p.openBudgetUrl} target="_blank" rel="noreferrer" style={{ color: '#6366f1', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          OpenBudget link <ExternalLink size={14} />
                        </a>
                      </td>
                      <td style={{ color: '#10b981', fontWeight: 800 }}>{p.currentVotes} ta</td>
                      <td>{p.autoStopLimit} ta</td>
                      <td>
                        <span className={`badge ${p.isActive ? 'badge-success' : 'badge-danger'}`}>
                          {p.isActive ? 'FAOL' : 'STOPPED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="card">
            <div className="card-title">
              <span>Loyihalar Boshqaruvi</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Loyiha Nomi</th>
                  <th>Open Budget Ssilka</th>
                  <th>Telegram Bot Link</th>
                  <th>Progress</th>
                  <th>Holat</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => {
                  const percent = Math.min(100, Math.round((p.currentVotes / p.autoStopLimit) * 100));
                  return (
                    <tr key={p.id}>
                      <td><b>{p.name}</b></td>
                      <td><a href={p.openBudgetUrl} target="_blank" style={{ color: '#6366f1' }}>Havola</a></td>
                      <td><a href={p.telegramBotUrl} target="_blank" style={{ color: '#6366f1' }}>Bot Link</a></td>
                      <td style={{ width: '180px' }}>
                        <div style={{ fontSize: '0.8rem', marginBottom: '4px' }}>{p.currentVotes} / {p.autoStopLimit} ({percent}%)</div>
                        <div style={{ height: '6px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${percent}%`, background: '#10b981' }}></div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${p.isActive ? 'badge-success' : 'badge-danger'}`}>
                          {p.isActive ? 'Ovoz Qabul Qilmoqda' : 'To\'xtatilgan'}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Tahrirlash</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <div className="card-title">
              <span>Foydalanuvchilar Kartotekasi</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Telegram ID</th>
                  <th>Ism</th>
                  <th>Telefon</th>
                  <th>Asosiy Balans</th>
                  <th>Kutayotgan Balans</th>
                  <th>Referal Bonusi</th>
                  <th>Qo'shilgan Sana</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.telegramId}>
                    <td><code>{u.telegramId}</code></td>
                    <td><b>{u.firstName}</b></td>
                    <td>{u.phone || 'Kiritilmagan'}</td>
                    <td style={{ color: '#10b981', fontWeight: 700 }}>{u.mainBalance.toLocaleString()} UZS</td>
                    <td style={{ color: '#f59e0b' }}>{u.pendingBalance.toLocaleString()} UZS</td>
                    <td>{u.referralEarned.toLocaleString()} UZS</td>
                    <td>{u.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className="card">
            <div className="card-title">
              <span>Pul Yechish So'rovlari</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Karta Raqami</th>
                  <th>Summa</th>
                  <th>Sana</th>
                  <th>Holat</th>
                  <th>Tasdiqlash</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map(w => (
                  <tr key={w.id}>
                    <td><code>{w.id}</code></td>
                    <td><b>{w.cardNumber}</b></td>
                    <td style={{ color: '#10b981', fontWeight: 700 }}>{w.amount.toLocaleString()} UZS</td>
                    <td>{w.createdAt}</td>
                    <td>
                      <span className={`badge ${w.status === 'PENDING' ? 'badge-warning' : w.status === 'APPROVED' ? 'badge-success' : 'badge-danger'}`}>
                        {w.status}
                      </span>
                    </td>
                    <td>
                      {w.status === 'PENDING' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn btn-success" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }} onClick={() => handleApproveWithdrawal(w.id)}>
                            <CheckCircle size={14} /> Tasdiqlash
                          </button>
                          <button className="btn btn-danger" style={{ padding: '0.3rem 0.7rem', fontSize: '0.8rem' }} onClick={() => handleRejectWithdrawal(w.id)}>
                            <XCircle size={14} /> Rad etish
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ko'rib chiqilgan</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card" style={{ maxWidth: '600px' }}>
            <div className="card-title">
              <span>Moliya va Limit Sozlamalari</span>
            </div>
            <form onSubmit={handleSettingsSubmit}>
              <div className="form-group">
                <label>1 ta Ovoz Narxi (UZS):</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.votePrice}
                  onChange={e => setSettings({ ...settings, votePrice: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Referal Bonusi (UZS):</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.referralBonus}
                  onChange={e => setSettings({ ...settings, referralBonus: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Minimal Pul Yechish Limiti (UZS):</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.minWithdrawal}
                  onChange={e => setSettings({ ...settings, minWithdrawal: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Maksimal Pul Yechish Limiti (UZS):</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={settings.maxWithdrawal}
                  onChange={e => setSettings({ ...settings, maxWithdrawal: Number(e.target.value) })}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Sozlamalarni Saqlash
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
