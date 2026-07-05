import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { bot } from './bot/telegram_bot';
import { store } from './services/store';

const app = express();
app.use(cors());
app.use(express.json());

// API: Dashboard Statistics
app.get('/api/stats', (req, res) => {
  const totalVotes = store.votes.length;
  const todayVotes = store.votes.filter(v => new Date(v.createdAt).toDateString() === new Date().toDateString()).length;
  const activeProjects = store.projects.filter(p => p.isActive).length;
  const totalUsers = store.users.size;
  const pendingWithdrawals = store.withdrawals.filter(w => w.status === 'PENDING').length;
  const totalReferralExpense = Array.from(store.users.values()).reduce((sum, u) => sum + u.referralEarned, 0);

  res.json({
    totalVotes,
    todayVotes,
    activeProjects,
    totalUsers,
    pendingWithdrawals,
    totalReferralExpense,
    botBalance: 5000000 // Mock bot reserve balance in UZS
  });
});

// API: Projects Management
app.get('/api/projects', (req, res) => {
  res.json(store.projects);
});

app.post('/api/projects', (req, res) => {
  const { id, name, viloyatId, tumanId, mahallaId, openBudgetUrl, autoStopLimit, pricePerVote } = req.body;
  
  let project = store.projects.find(p => p.id === id);
  if (project) {
    if (name) project.name = name;
    if (openBudgetUrl) project.openBudgetUrl = openBudgetUrl;
    if (autoStopLimit) project.autoStopLimit = Number(autoStopLimit);
    if (pricePerVote) project.pricePerVote = Number(pricePerVote);
  } else {
    project = {
      id: 'p_' + Date.now(),
      name: name || 'Yangi Loyiha',
      viloyatId: viloyatId || 'v_navoiy',
      tumanId: tumanId || 't_karmana',
      mahallaId: mahallaId || 'm_karmana_1',
      openBudgetUrl: openBudgetUrl || 'https://openbudget.uz',
      telegramBotUrl: 'https://t.me/openbudget_bot',
      pricePerVote: Number(pricePerVote) || 5000,
      autoStopLimit: Number(autoStopLimit) || 5000,
      currentVotes: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    store.projects.push(project);
  }

  store.saveState();
  res.json({ success: true, project });
});

app.delete('/api/projects/:id', (req, res) => {
  store.projects = store.projects.filter(p => p.id !== req.params.id);
  store.saveState();
  res.json({ success: true });
});

// API: Users List
app.get('/api/users', (req, res) => {
  const usersList = Array.from(store.users.values());
  res.json(usersList);
});

// API: Withdrawals
app.get('/api/withdrawals', (req, res) => {
  res.json(store.withdrawals);
});

app.post('/api/withdrawals/:id/approve', (req, res) => {
  const withdrawal = store.withdrawals.find(w => w.id === req.params.id);
  if (!withdrawal) return res.status(404).json({ error: 'Topilmadi' });

  withdrawal.status = 'APPROVED';
  const user = store.users.get(withdrawal.userId);
  if (user) {
    user.pendingBalance -= withdrawal.amount;
  }

  store.saveState();
  res.json({ success: true, withdrawal });
});

app.post('/api/withdrawals/:id/reject', (req, res) => {
  const withdrawal = store.withdrawals.find(w => w.id === req.params.id);
  if (!withdrawal) return res.status(404).json({ error: 'Topilmadi' });

  withdrawal.status = 'REJECTED';
  const user = store.users.get(withdrawal.userId);
  if (user) {
    user.pendingBalance -= withdrawal.amount;
    user.mainBalance += withdrawal.amount; // Refund
  }

  store.saveState();
  res.json({ success: true, withdrawal });
});

// API: Settings Management
app.get('/api/settings', (req, res) => {
  res.json(store.settings);
});

app.post('/api/settings', (req, res) => {
  const { votePrice, referralBonus, minWithdrawal, maxWithdrawal } = req.body;
  if (votePrice) store.settings.votePrice = Number(votePrice);
  if (referralBonus) store.settings.referralBonus = Number(referralBonus);
  if (minWithdrawal) store.settings.minWithdrawal = Number(minWithdrawal);
  if (maxWithdrawal) store.settings.maxWithdrawal = Number(maxWithdrawal);

  store.saveState();
  res.json({ success: true, settings: store.settings });
});

// Start Express Server & Telegram Bot
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 REST API running on http://localhost:${PORT}`);
  
  // Start bot in long-polling mode (or webhook if configured)
  if (process.env.BOT_TOKEN) {
    bot.start({
      onStart: (info) => console.log(`🤖 Telegram Bot started as @${info.username}`)
    }).catch((err) => {
      console.error(`❌ Telegram Bot ulanishda xatolik (401 Unauthorized / Bekor qilingan Token):`);
      console.error(`Iltimos, backend/.env faylidagi BOT_TOKEN o'rniga Telegram @BotFather dan olingan YANGI faol tokeningizni kiriting!`);
    });
  } else {
    console.log('ℹ️ BOT_TOKEN kiritilmagan. Faqat REST API rejimida ishlamoqda.');
  }
});
