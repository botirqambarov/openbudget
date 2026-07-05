import dotenv from 'dotenv';
dotenv.config();

import { Bot, InlineKeyboard, Keyboard, InputFile } from 'grammy';
import { store, ProjectData } from '../services/store';
import { UZBEKISTAN_LOCATIONS, findViloyat, findTuman, findMahalla } from '../data/uzbekistan_locations';

const rawToken = process.env.BOT_TOKEN || '7890123456:AAEH_Mock_Token_OpenBudgetUz';
const token = rawToken.replace(/['"]/g, '').trim();
export const bot = new Bot(token);

// User session state tracking in memory
interface UserSession {
  step?: 'ENTER_PHONE' | 'SELECT_VILOYAT' | 'SELECT_TUMAN' | 'SELECT_MAHALLA' | 'WITHDRAW_CARD' | 'WITHDRAW_AMOUNT' | 'ADMIN_ADD_LINK' | 'ADMIN_ADD_PRICE' | 'ADMIN_EDIT_NAME' | 'ADMIN_EDIT_AUTOSTOP' | 'ADMIN_EDIT_BOT_URL' | 'USER_ADD_CARD';
  phone?: string;
  selectedViloyatId?: string;
  selectedTumanId?: string;
  selectedMahallaId?: string;
  withdrawCard?: string;
  editingProjectId?: string;
  adminAddViloyatId?: string;
  adminAddTumanId?: string;
  adminAddMahallaId?: string;
  adminAddOpenBudgetUrl?: string;
}

const sessions = new Map<number, UserSession>();

function getSession(userId: number): UserSession {
  if (!sessions.has(userId)) {
    sessions.set(userId, {});
  }
  return sessions.get(userId)!;
}

// Helper to check if user is admin
function isAdmin(userId: number): boolean {
  if (!userId) return false;
  const targetId = String(userId).trim();
  
  // Always include user provided admin ID 8721516799
  if (targetId === '8721516799') return true;

  // Check process.env.ADMIN_IDS
  const envAdmins = process.env.ADMIN_IDS
    ? process.env.ADMIN_IDS.split(',').map(id => id.trim())
    : [];
  if (envAdmins.includes(targetId)) return true;

  // Check store.settings.adminIds
  const storeAdmins = (store.settings.adminIds || []).map(id => String(id).trim());
  if (storeAdmins.includes(targetId)) return true;

  return false;
}

function getKeyboardForUser(userId: number) {
  if (isAdmin(userId)) {
    return new Keyboard()
      .text("Loyihalar 🔗").row()
      .text("🗳 Ovoz berish").text("💰 Balans").row()
      .text("📥 Pulni yechib olish").text("🔗 Referal ssilka").row()
      .text("🎉 Aksiyalar").text("💸 To'lovlar isboti")
      .resized();
  }

  return new Keyboard()
    .text("🗳 Ovoz berish").row()
    .text("💰 Balans").text("📥 Pulni yechib olish").row()
    .text("🔗 Referal ssilka").row()
    .text("🎉 Aksiyalar").text("💸 To'lovlar isboti")
    .resized();
}

// Admin Dashboard Message (Screenshot 2 Top Message)
async function sendAdminDashboard(ctx: any) {
  const uptimeHours = Math.floor(process.uptime() / 3600);
  const uptimeMins = Math.floor((process.uptime() % 3600) / 60);
  const uptimeSecs = Math.floor(process.uptime() % 60);

  const statsText = `👥 <b>Returned users:</b> 11 (0.54%)\n` +
    `💎 <b>Premium users:</b> 74 (3.62%)\n\n` +
    `🗄 <b>Tasks:</b> 8\n` +
    `💬 <b>Minutely requests:</b> 429\n` +
    `💬 <b>Secondly requests:</b> 5\n\n` +
    `🗳 <b>Daily votes:</b> 931\n\n` +
    `📅 <b>Date:</b> ${new Date().toLocaleDateString('uz-UZ')} ${new Date().toLocaleTimeString()}\n` +
    `⏳ <b>Uptime:</b> ${uptimeHours} hours, ${uptimeMins} minutes, ${uptimeSecs} seconds`;

  const inlineAdminMenu = new InlineKeyboard()
    .text("Haftalik statistika 📊", "admin_weekly_stats");

  await ctx.reply(statsText, {
    parse_mode: 'HTML',
    reply_markup: inlineAdminMenu
  });
}

// Send Projects List (Screenshot 2 Bottom Message)
async function sendProjectsList(ctx: any) {
  const kb = new InlineKeyboard();
  store.projects.forEach((p, index) => {
    const icon = p.isActive ? '🟢' : '🔴';
    kb.text(`${index + 1}. ${p.name} ${icon}`, `admin_proj_${p.id}`).row();
  });
  kb.text("Loyiha qo'shish ➕", "admin_add_project").row();
  kb.text("Bekor qilish 🚫", "admin_cancel");

  const msgText = `🔗 <b>Loyihalar menyusi. Loyihalarni boshqarishingiz mumkin.</b>\n\n` +
    `<i>Pastdagi tugmalardan foydalaning.</i>`;

  if (ctx.callbackQuery) {
    await ctx.editMessageText(msgText, { parse_mode: 'HTML', reply_markup: kb });
  } else {
    await ctx.reply(msgText, { parse_mode: 'HTML', reply_markup: kb });
  }
}

// Handler: /start
bot.command('start', async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  // If user is Admin, immediately show Admin Dashboard & Loyihalar Keyboard (Screenshot 2)
  if (isAdmin(userId)) {
    await sendAdminDashboard(ctx);
    await ctx.reply("<i>Loyihalarni boshqarish uchun pastdagi <b>Loyihalar 🔗</b> tugmasini bosing!</i>", {
      parse_mode: 'HTML',
      reply_markup: getKeyboardForUser(userId)
    });
    return;
  }

  const text = ctx.message?.text || '';
  const args = text.split(' ');
  let referrerId: number | undefined;
  if (args.length > 1 && !isNaN(Number(args[1]))) {
    referrerId = Number(args[1]);
    if (referrerId === userId) referrerId = undefined;
  }

  const user = store.getOrCreateUser(userId, ctx.from?.first_name || 'Foydalanuvchi', ctx.from?.username, referrerId);

  const startMsg = `${user.firstName} 👋 Botga xush kelibsiz!\n\n` +
    `<b>Sport Tashabbusga ovoz bering va pul ishlang</b>\n\n` +
    `🔗 Odam chaqirganiz uchun ham pul beriladi\n\n` +
    `🤝 Nechta raqamingiz bo'lsa ham hammasidan ovoz bersa bo'ladi.\n\n` +
    `💸 <b>TO'VLAR KANALI:</b> ${store.settings.paymentChannel}\n\n` +
    `👇 <i>Ovoz berish uchun bosing!</i> 👇`;

  await ctx.reply(startMsg, {
    parse_mode: 'HTML',
    reply_markup: getKeyboardForUser(userId)
  });
});

// Handler: /admin command
bot.command('admin', async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  if (!isAdmin(userId)) {
    return ctx.reply(`⚠️ Siz administrator emassiz. Sizning Telegram ID: <code>${userId}</code>`, { parse_mode: 'HTML' });
  }

  await sendAdminDashboard(ctx);
  await sendProjectsList(ctx);
});

// Admin "Loyihalar 🔗" button listener (Screenshot 2)
bot.hears(["Loyihalar 🔗", "Loyihalar", "👑 Admin Panel"], async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  if (!isAdmin(userId)) {
    return ctx.reply(`⚠️ Siz administrator emassiz. Sizning Telegram ID: <code>${userId}</code>`, { parse_mode: 'HTML' });
  }

  await sendProjectsList(ctx);
});

// Text Button Listeners
bot.hears("🗳 Ovoz berish", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  const session = getSession(userId);
  session.step = 'ENTER_PHONE';

  await ctx.reply(
    `<b>Telefon raqamingizni kiriting:</b>\n\n` +
    `Misol: <code>998901234567</code> yoki <code>+998901234567</code>\n\n` +
    `<i>Eslatma: Har bir telefon raqamidan faqat 1 marta ovoz berish mumkin!</i>`,
    { parse_mode: 'HTML' }
  );
});

bot.hears("💰 Balans", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  const user = store.getOrCreateUser(userId, ctx.from?.first_name || 'Foydalanuvchi');

  const text = `💰 <b>Sizning balansingiz ma'lumotlari:</b>\n\n` +
    `💵 Asosiy balans: <b>${user.mainBalance.toLocaleString()} UZS</b>\n` +
    `⏳ Kutayotgan balans: <b>${user.pendingBalance.toLocaleString()} UZS</b>\n` +
    `👥 Referaldan topilgan: <b>${user.referralEarned.toLocaleString()} UZS</b>\n` +
    `🏆 Jami ishlab topilgan: <b>${user.totalEarned.toLocaleString()} UZS</b>\n\n` +
    `💳 Biriktirilgan karta: <b>${user.cardNumber ? user.cardNumber : 'Kiritilmagan'}</b>`;

  const kb = new InlineKeyboard()
    .text("💳 Karta raqamini kiritish", "user_add_card");

  await ctx.reply(text, { parse_mode: 'HTML', reply_markup: kb });
});

bot.hears("🔗 Referal ssilka", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  const botUsername = ctx.me.username;
  const refLink = `https://t.me/${botUsername}?start=${userId}`;

  const text = `🔗 <b>Sizning shaxsiy referal havolangiz:</b>\n\n` +
    `<code>${refLink}</code>\n\n` +
    `Ushbu havolani do'stlaringizga yuboring. Har bir muvaffaqiyatli ovoz bergan do'stingiz uchun <b>${store.settings.referralBonus.toLocaleString()} UZS</b> bonus olasiz!`;

  await ctx.reply(text, { parse_mode: 'HTML' });
});

bot.hears("📥 Pulni yechib olish", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) return;

  const user = store.getOrCreateUser(userId, ctx.from?.first_name || 'Foydalanuvchi');

  if (user.mainBalance < store.settings.minWithdrawal) {
    return ctx.reply(
      `⚠️ <b>Minimal yechib olish summasi: ${store.settings.minWithdrawal.toLocaleString()} UZS</b>\n\n` +
      `Sizning balansingiz: <b>${user.mainBalance.toLocaleString()} UZS</b>`,
      { parse_mode: 'HTML' }
    );
  }

  const session = getSession(userId);

  if (user.cardNumber) {
    session.step = 'WITHDRAW_AMOUNT';
    session.withdrawCard = user.cardNumber;
    return ctx.reply(
      `💳 <b>Saqlangan kartangiz: ${user.cardNumber}</b>\n\n` +
      `💵 <b>Yechib olmoqchi bo'lgan summangizni kiriting:</b>\n\n` +
      `Mavjud balans: <b>${user.mainBalance.toLocaleString()} UZS</b>\n` +
      `Min limit: <b>${store.settings.minWithdrawal.toLocaleString()} UZS</b>`,
      { parse_mode: 'HTML' }
    );
  }

  session.step = 'WITHDRAW_CARD';

  await ctx.reply(
    `💳 <b>Karta raqamingizni kiriting:</b>\n\n` +
    `Misol: <code>8600123456789012</code>`,
    { parse_mode: 'HTML' }
  );
});

bot.hears("🎉 Aksiyalar", async (ctx) => {
  await ctx.reply(
    `🎁 <b>Joriy Aksiyalar:</b>\n\n` +
    `• Eng ko'p do'st taklif qilgan 3 ta foydalanuvchiga qo'shimcha 100,000 UZS mukofot!\n` +
    `• Har 50 ta tasdiqlangan ovoz uchun +25,000 UZS bonus!`,
    { parse_mode: 'HTML' }
  );
});

bot.hears("💸 To'lovlar isboti", async (ctx) => {
  await ctx.reply(
    `🧾 Bizning to'lovlar isbotlangan rasmiy kanalimiz:\n\n${store.settings.paymentChannel}`
  );
});

// Inline Callback Queries for Region/District/Mahalla Navigation & Admin Menus
bot.on('callback_query:data', async (ctx) => {
  const data = ctx.callbackQuery.data;
  const userId = ctx.from.id;
  const session = getSession(userId);

  await ctx.answerCallbackQuery();

  // User: Add/Edit Card
  if (data === 'user_add_card') {
    session.step = 'USER_ADD_CARD';
    await ctx.reply(`💳 <b>Yangi karta raqamingizni kiriting:</b>\n\nMisol: <code>8600123456789012</code>`, { parse_mode: 'HTML' });
    return;
  }

  // Admin: View Projects List (Screenshot 2 Bottom Message)
  if (data === 'admin_projects_list') {
    await sendProjectsList(ctx);
    return;
  }

  // Admin: View Single Project Details (Screenshot 1)
  if (data.startsWith('admin_proj_')) {
    const projId = data.replace('admin_proj_', '');
    const project = store.projects.find(p => p.id === projId);
    if (!project) return;

    session.editingProjectId = projId;

    const statusText = project.isActive ? 'Yoqilgan ✅' : "O'chirilgan ❌";
    
    // Screenshot 1 exact message text
    const msgText = `<b>Loyiha haqida ma'lumotlar:</b> 👇\n\n` +
      `🔤 <b>Loyiha nomi:</b> ${project.name}\n` +
      `🔗 <b>Loyiha havolasi:</b> <a href="${project.openBudgetUrl}">havola</a>\n` +
      `🔗 <b>Loyiha havolasi (telegram bot):</b> <a href="${project.telegramBotUrl}">havola</a>\n` +
      `🗳 <b>Ovoz yig'ish:</b> ${statusText}\n` +
      `💬 <b>Auto stop:</b> ${project.autoStopLimit}\n` +
      `✅ <b>Yig'ilgan ovozlar:</b> ${project.currentVotes} ta\n\n` +
      `<i>Pastdagi tugma orqali telegram bot havolasini o'zgartirishingiz mumkin.</i>`;

    // Screenshot 1 exact inline keyboard buttons
    const kb = new InlineKeyboard()
      .text("Auto stop qo'shish 💬", `admin_autostop_${projId}`).row()
      .text("Ovozlarni yuklab olish 🗳", `admin_download_votes_${projId}`).row()
      .text("Loyiha nomini o'zgartirish 🔤", `admin_edit_name_${projId}`).row()
      .text("Telegram bot havolasini o'zgartirish 🔗", `admin_edit_boturl_${projId}`).row()
      .text(project.isActive ? "Ovoz yig'ishni o'chirish ❌" : "Ovoz yig'ishni yoqish ✅", `admin_toggle_active_${projId}`).row()
      .text("Loyihani o'chirish 🗑", `admin_delete_proj_${projId}`).row()
      .text("Bekor qilish 🚫", "admin_projects_list");

    await ctx.editMessageText(msgText, { parse_mode: 'HTML', reply_markup: kb, link_preview_options: { is_disabled: true } });
    return;
  }

  // Admin: Toggle Active State
  if (data.startsWith('admin_toggle_active_')) {
    const projId = data.replace('admin_toggle_active_', '');
    const project = store.projects.find(p => p.id === projId);
    if (project) {
      project.isActive = !project.isActive;
      store.saveState();
      await ctx.reply(`Loyiha holati o'zgardi: ${project.isActive ? 'Yoqildi ✅' : "O'chirildi ❌"}`);
      await sendProjectsList(ctx);
    }
    return;
  }

  // Admin: Edit Name Prompt
  if (data.startsWith('admin_edit_name_')) {
    const projId = data.replace('admin_edit_name_', '');
    session.editingProjectId = projId;
    session.step = 'ADMIN_EDIT_NAME';
    await ctx.reply("🔤 <b>Yangi loyiha nomini kiriting:</b>", { parse_mode: 'HTML' });
    return;
  }

  // Admin: Edit Auto Stop Prompt
  if (data.startsWith('admin_autostop_')) {
    const projId = data.replace('admin_autostop_', '');
    session.editingProjectId = projId;
    session.step = 'ADMIN_EDIT_AUTOSTOP';
    await ctx.reply("💬 <b>Yangi Auto Stop limitini kiriting (masalan: 5000):</b>", { parse_mode: 'HTML' });
    return;
  }

  // Admin: Edit Bot URL Prompt
  if (data.startsWith('admin_edit_boturl_')) {
    const projId = data.replace('admin_edit_boturl_', '');
    session.editingProjectId = projId;
    session.step = 'ADMIN_EDIT_BOT_URL';
    await ctx.reply("🔗 <b>Yangi Telegram bot havolasini kiriting:</b>", { parse_mode: 'HTML' });
    return;
  }

  // Admin: Download Votes Log
  if (data.startsWith('admin_download_votes_')) {
    const projId = data.replace('admin_download_votes_', '');
    const project = store.projects.find(p => p.id === projId);
    const projVotes = store.votes.filter(v => v.projectId === projId);
    
    let csvContent = `ID,User ID,Phone,Created At\n`;
    projVotes.forEach(v => {
      csvContent += `${v.id},${v.userId},${v.phone},${v.createdAt}\n`;
    });

    const buffer = Buffer.from(csvContent, 'utf-8');
    await ctx.replyWithDocument(new InputFile(buffer, `${project?.name || 'ovozlar'}_report.csv`), {
      caption: `🗳 <b>${project?.name}</b> loyihasi bo'yicha jami <b>${projVotes.length} ta</b> ovoz loglari.`,
      parse_mode: 'HTML'
    });
    return;
  }

  // Admin: Delete Project
  if (data.startsWith('admin_delete_proj_')) {
    const projId = data.replace('admin_delete_proj_', '');
    store.projects = store.projects.filter(p => p.id !== projId);
    store.saveState();
    await ctx.reply("🗑 <b>Loyiha muvaffaqiyatli o'chirildi!</b>", { parse_mode: 'HTML' });
    await sendProjectsList(ctx);
    return;
  }

  // Admin Add Project Wizard: Step 1 Select Viloyat
  if (data === 'admin_add_project') {
    const kb = new InlineKeyboard();
    UZBEKISTAN_LOCATIONS.forEach(v => {
      kb.text(v.name, `admin_select_v_${v.id}`).row();
    });
    kb.text("Bekor qilish 🚫", "admin_projects_list");

    await ctx.editMessageText(
      `<b>Yangi loyiha qo'shish:</b>\n\nViloyatni tanlang:`,
      { parse_mode: 'HTML', reply_markup: kb }
    );
    return;
  }

  // Admin Add Project Wizard: Step 2 Select Tuman
  if (data.startsWith('admin_select_v_')) {
    const vId = data.replace('admin_select_v_', '');
    session.adminAddViloyatId = vId;
    const viloyat = findViloyat(vId);

    const kb = new InlineKeyboard();
    viloyat?.tumans.forEach(t => {
      kb.text(t.name, `admin_select_t_${t.id}`).row();
    });
    kb.text("Orqaga 🔙", "admin_add_project");

    await ctx.editMessageText(
      `<b>Viloyat:</b> ${viloyat?.name}\n\nTuman/Shaharni tanlang:`,
      { parse_mode: 'HTML', reply_markup: kb }
    );
    return;
  }

  // Admin Add Project Wizard: Step 3 Select Mahalla
  if (data.startsWith('admin_select_t_')) {
    const tId = data.replace('admin_select_t_', '');
    session.adminAddTumanId = tId;
    const tuman = findTuman(session.adminAddViloyatId!, tId);

    const kb = new InlineKeyboard();
    tuman?.mahallas.forEach(m => {
      kb.text(m.name, `admin_select_m_${m.id}`).row();
    });

    await ctx.editMessageText(
      `<b>Tuman:</b> ${tuman?.name}\n\nMahallani tanlang:`,
      { parse_mode: 'HTML', reply_markup: kb }
    );
    return;
  }

  // Admin Add Project Wizard: Step 4 Request OpenBudget Link
  if (data.startsWith('admin_select_m_')) {
    const mId = data.replace('admin_select_m_', '');
    session.adminAddMahallaId = mId;
    session.step = 'ADMIN_ADD_LINK';

    await ctx.reply(
      `<b>Tanlangan mahalla uchun Open Budget havolasini yuboring:</b>\n\n` +
      `Misol: <code>https://openbudget.uz/boards/initiatives/initiative/12345</code>`,
      { parse_mode: 'HTML' }
    );
    return;
  }

  // User Voting Flow: Viloyat Selection
  if (data.startsWith('user_v_')) {
    const vId = data.replace('user_v_', '');
    session.selectedViloyatId = vId;
    const viloyat = findViloyat(vId);

    const kb = new InlineKeyboard();
    viloyat?.tumans.forEach(t => {
      kb.text(t.name, `user_t_${t.id}`).row();
    });

    await ctx.editMessageText(
      `📍 <b>Viloyat:</b> ${viloyat?.name}\n\n` +
      `Endi tumaningizni tanlang:`,
      { parse_mode: 'HTML', reply_markup: kb }
    );
    return;
  }

  // User Voting Flow: Tuman Selection
  if (data.startsWith('user_t_')) {
    const tId = data.replace('user_t_', '');
    session.selectedTumanId = tId;
    const tuman = findTuman(session.selectedViloyatId!, tId);

    const kb = new InlineKeyboard();
    tuman?.mahallas.forEach(m => {
      kb.text(m.name, `user_m_${m.id}`).row();
    });

    await ctx.editMessageText(
      `🏢 <b>Tuman:</b> ${tuman?.name}\n\n` +
      `Endi mahallangizni tanlang:`,
      { parse_mode: 'HTML', reply_markup: kb }
    );
    return;
  }

  // User Voting Flow: Mahalla Selection & Submission
  if (data.startsWith('user_m_')) {
    const mId = data.replace('user_m_', '');
    session.selectedMahallaId = mId;

    const mahalla = findMahalla(session.selectedViloyatId!, session.selectedTumanId!, mId);
    const project = store.getProjectByMahalla(mId);

    if (!project) {
      await ctx.editMessageText(
        `ℹ️ <b>${mahalla?.name}</b> uchun loyiha havolasi hali kiritilmagan.\n\n` +
        `<i>Havola admin tomonidan berilgach, sizga xabar beriladi!</i>`,
        { parse_mode: 'HTML' }
      );
      return;
    }

    const phone = session.phone || '998900000000';
    const result = store.recordVote(userId, phone, project.id);

    if (!result.success) {
      await ctx.editMessageText(
        `❌ <b>Xatolik:</b> ${result.message}`,
        { parse_mode: 'HTML' }
      );
      return;
    }

    const confirmText = `✅ <b>Muvaffaqiyatli!</b>\n\n` +
      `Sizning mahallangiz: <b>${mahalla?.name}</b>\n` +
      `Loyiha nomi: <b>${project.name}</b>\n\n` +
      `🔗 <b>Ovoz berish havolasi:</b>\n<a href="${project.openBudgetUrl}">${project.openBudgetUrl}</a>\n\n` +
      `💰 Sizning balansingizga <b>${(project.pricePerVote || store.settings.votePrice).toLocaleString()} UZS</b> qo'shildi!`;

    await ctx.editMessageText(confirmText, { parse_mode: 'HTML' });
    return;
  }

  if (data === 'admin_cancel') {
    await ctx.deleteMessage();
    return;
  }
});

// Text Messages Handler for Wizard steps (Phone input, Link input, Withdraw card, Edit name, Edit autostop, Edit bot url)
bot.on('message:text', async (ctx) => {
  const userId = ctx.from.id;
  const session = getSession(userId);
  const text = ctx.message.text.trim();

  if (["🗳 Ovoz berish", "💰 Balans", "📥 Pulni yechib olish", "🔗 Referal ssilka", "🎉 Aksiyalar", "💸 To'lovlar isboti", "Loyihalar 🔗", "Loyihalar", "👑 Admin Panel"].includes(text)) {
    return;
  }

  // Step: ADMIN_EDIT_NAME
  if (session.step === 'ADMIN_EDIT_NAME' && session.editingProjectId) {
    const project = store.projects.find(p => p.id === session.editingProjectId);
    if (project) {
      project.name = text;
      store.saveState();
      await ctx.reply(`✅ Loyiha nomi yangilandi: <b>${text}</b>`, { parse_mode: 'HTML' });
    }
    session.step = undefined;
    return;
  }

  // Step: ADMIN_EDIT_AUTOSTOP
  if (session.step === 'ADMIN_EDIT_AUTOSTOP' && session.editingProjectId) {
    const limit = Number(text);
    const project = store.projects.find(p => p.id === session.editingProjectId);
    if (project && !isNaN(limit)) {
      project.autoStopLimit = limit;
      store.saveState();
      await ctx.reply(`✅ Auto stop limiti yangilandi: <b>${limit}</b> ta`, { parse_mode: 'HTML' });
    }
    session.step = undefined;
    return;
  }

  // Step: ADMIN_EDIT_BOT_URL
  if (session.step === 'ADMIN_EDIT_BOT_URL' && session.editingProjectId) {
    const project = store.projects.find(p => p.id === session.editingProjectId);
    if (project) {
      project.telegramBotUrl = text;
      store.saveState();
      await ctx.reply(`✅ Telegram bot havolasi yangilandi: ${text}`);
    }
    session.step = undefined;
    return;
  }

  // Step: ENTER_PHONE
  if (session.step === 'ENTER_PHONE') {
    const cleanPhone = text.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9 || cleanPhone.length > 12) {
      return ctx.reply("⚠️ Iltimos, to'g'ri telefon raqamini kiriting! (Misol: 998901234567)");
    }

    if (store.isPhoneUsed(cleanPhone)) {
      session.step = undefined;
      return ctx.reply(
        `❌ <b>Ushbu telefon raqamidan avval ovoz berilgan!</b>\n\n` +
        `Har bir raqamdan faqat 1 marta foydalanish mumkin.`,
        { parse_mode: 'HTML' }
      );
    }

    session.phone = cleanPhone;
    session.step = 'SELECT_VILOYAT';

    const kb = new InlineKeyboard();
    UZBEKISTAN_LOCATIONS.forEach(v => {
      kb.text(v.name, `user_v_${v.id}`).row();
    });

    return ctx.reply(
      `✅ Telefon raqam qabul qilindi: <code>+${cleanPhone}</code>\n\n` +
      `📍 <b>O'z viloyatingizni tanlang:</b>`,
      { parse_mode: 'HTML', reply_markup: kb }
    );
  }

  // Step: WITHDRAW_CARD
  if (session.step === 'WITHDRAW_CARD') {
    if (text.length < 16) {
      return ctx.reply("⚠️ Karta raqami kamida 16 ta raqamdan iborat bo'lishi kerak!");
    }
    session.withdrawCard = text;
    session.step = 'WITHDRAW_AMOUNT';

    const user = store.getOrCreateUser(userId, ctx.from.first_name);
    return ctx.reply(
      `💵 <b>Yechib olmoqchi bo'lgan summangizni kiriting:</b>\n\n` +
      `Mavjud balans: <b>${user.mainBalance.toLocaleString()} UZS</b>\n` +
      `Min limit: <b>${store.settings.minWithdrawal.toLocaleString()} UZS</b>`,
      { parse_mode: 'HTML' }
    );
  }

  // Step: WITHDRAW_AMOUNT
  if (session.step === 'WITHDRAW_AMOUNT') {
    const amount = Number(text);
    const user = store.getOrCreateUser(userId, ctx.from.first_name);

    if (isNaN(amount) || amount < store.settings.minWithdrawal || amount > user.mainBalance) {
      return ctx.reply("⚠️ Noto'g'ri summa kiritildi yoki balansingizda yetarli mablag' yo'q!");
    }

    user.mainBalance -= amount;
    user.pendingBalance += amount;

    store.withdrawals.push({
      id: 'w_' + Date.now(),
      userId,
      cardNumber: session.withdrawCard!,
      amount,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });

    store.saveState();
    session.step = undefined;

    return ctx.reply(
      `✅ <b>Pul yechish so'rovi yuborildi!</b>\n\n` +
      `Karta: <code>${session.withdrawCard}</code>\n` +
      `Summa: <b>${amount.toLocaleString()} UZS</b>\n\n` +
      `<i>Operator tomonidan tasdiqlangach, mablag' kartangizga o'tkaziladi.</i>`,
      { parse_mode: 'HTML' }
    );
  }

  // Step: ADMIN_ADD_LINK
  if (session.step === 'ADMIN_ADD_LINK') {
    session.adminAddOpenBudgetUrl = text;
    session.step = 'ADMIN_ADD_PRICE';

    return ctx.reply(
      `💰 <b>Ushbu loyiha uchun 1 ta tasdiqlangan ovoz narxini kiriting:</b>\n\n` +
      `Masalan: <code>5000</code>`,
      { parse_mode: 'HTML' }
    );
  }

  // Step: ADMIN_ADD_PRICE
  if (session.step === 'ADMIN_ADD_PRICE') {
    const price = Number(text);
    if (isNaN(price) || price < 0) {
      return ctx.reply("⚠️ Iltimos, faqat raqam kiriting (masalan: 5000)!");
    }

    const mahalla = findMahalla(session.adminAddViloyatId!, session.adminAddTumanId!, session.adminAddMahallaId!);
    
    const newProj: ProjectData = {
      id: 'p_' + Date.now(),
      name: `${mahalla?.name || 'Yangi Loyiha'} (${ctx.from.first_name})`,
      viloyatId: session.adminAddViloyatId!,
      tumanId: session.adminAddTumanId!,
      mahallaId: session.adminAddMahallaId!,
      openBudgetUrl: session.adminAddOpenBudgetUrl!,
      telegramBotUrl: `https://t.me/${ctx.me.username}`,
      pricePerVote: price,
      autoStopLimit: 5000,
      currentVotes: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    store.projects.push(newProj);
    store.saveState();
    session.step = undefined;

    return ctx.reply(
      `✅ <b>Yangi loyiha muvaffaqiyatli biriktirildi!</b>\n\n` +
      `Loyiha nomi: <b>${newProj.name}</b>\n` +
      `Ovoz narxi: <b>${price.toLocaleString()} UZS</b>\n` +
      `OpenBudget Havola: ${newProj.openBudgetUrl}`,
      { parse_mode: 'HTML' }
    );
  }

  // Step: USER_ADD_CARD
  if (session.step === 'USER_ADD_CARD') {
    if (text.length < 16) {
      return ctx.reply("⚠️ Karta raqami kamida 16 ta raqamdan iborat bo'lishi kerak!");
    }
    const user = store.getOrCreateUser(userId, ctx.from.first_name);
    user.cardNumber = text;
    store.saveState();
    session.step = undefined;
    return ctx.reply(`✅ <b>Karta raqamingiz muvaffaqiyatli saqlandi:</b> <code>${text}</code>`, { parse_mode: 'HTML' });
  }
});
