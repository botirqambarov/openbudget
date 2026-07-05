import fs from 'fs';
import path from 'path';
import { ViloyatItem, TumanItem, MahallaItem, UZBEKISTAN_LOCATIONS } from '../data/uzbekistan_locations';

export interface ProjectData {
  id: string;
  name: string;
  viloyatId: string;
  tumanId: string;
  mahallaId: string;
  openBudgetUrl: string;
  telegramBotUrl: string;
  pricePerVote: number;
  autoStopLimit: number;
  currentVotes: number;
  isActive: boolean;
  createdAt: string;
}

export interface UserData {
  telegramId: number;
  firstName: string;
  username?: string;
  phone?: string;
  cardNumber?: string;
  mainBalance: number;
  pendingBalance: number;
  referralEarned: number;
  totalEarned: number;
  referrerId?: number;
  joinedAt: string;
}

export interface VoteRecord {
  id: string;
  userId: number;
  phone: string;
  projectId: string;
  createdAt: string;
}

export interface WithdrawalRecord {
  id: string;
  userId: number;
  cardNumber: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface SystemSettings {
  votePrice: number;
  referralBonus: number;
  minWithdrawal: number;
  maxWithdrawal: number;
  paymentChannel: string;
  adminIds: number[];
  referralText: string;
}

const DATA_FILE = path.join(__dirname, '../../database_state.json');

class StoreService {
  public projects: ProjectData[] = [];
  public users: Map<number, UserData> = new Map();
  public votes: VoteRecord[] = [];
  public usedPhones: Set<string> = new Set();
  public withdrawals: WithdrawalRecord[] = [];
  public settings: SystemSettings = {
    votePrice: 5000,
    referralBonus: 2000,
    minWithdrawal: 10000,
    maxWithdrawal: 500000,
    paymentChannel: '@openbudgettolovlari',
    adminIds: process.env.ADMIN_IDS 
      ? process.env.ADMIN_IDS.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id))
      : [123456789],
    referralText: "Sizning shaxsiy referal havolangiz"
  };
  public locations: ViloyatItem[] = [...UZBEKISTAN_LOCATIONS];

  constructor() {
    this.initDefaultProjects();
    this.loadState();
  }

  private initDefaultProjects() {
    this.projects = [
      {
        id: 'p_shifokor',
        name: 'Shifokor (Shahzod Ochildiyev)',
        viloyatId: 'v_navoiy',
        tumanId: 't_navoiy_sh',
        mahallaId: 'm_navoiy_sh_1',
        openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/1',
        telegramBotUrl: 'https://t.me/openbudget_navoiy_bot',
        pricePerVote: 5000,
        autoStopLimit: 5000,
        currentVotes: 0,
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'p_ilgor',
        name: "Ilg'or (Sherzod Abdiyev)",
        viloyatId: 'v_navoiy',
        tumanId: 't_navoiy_sh',
        mahallaId: 'm_navoiy_sh_2',
        openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/2',
        telegramBotUrl: 'https://t.me/openbudget_ilgor_bot',
        pricePerVote: 5000,
        autoStopLimit: 5000,
        currentVotes: 0,
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'p_sebiston_1',
        name: 'Sebiston (Bohodir Jonuzoqov)',
        viloyatId: 'v_navoiy',
        tumanId: 't_karmana',
        mahallaId: 'm_karmana_1',
        openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/3',
        telegramBotUrl: 'https://t.me/openbudget_sebiston1_bot',
        pricePerVote: 5000,
        autoStopLimit: 5000,
        currentVotes: 0,
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'p_sebiston_2',
        name: 'Sebiston (Abdukarim Abulqosimov)',
        viloyatId: 'v_navoiy',
        tumanId: 't_karmana',
        mahallaId: 'm_karmana_2',
        openBudgetUrl: 'https://openbudget.uz/boards/initiatives/initiative/4',
        telegramBotUrl: 'https://t.me/openbudget_sebiston2_bot',
        pricePerVote: 5000,
        autoStopLimit: 5000,
        currentVotes: 0,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  public saveState() {
    try {
      const data = {
        projects: this.projects,
        users: Array.from(this.users.entries()),
        votes: this.votes,
        usedPhones: Array.from(this.usedPhones),
        withdrawals: this.withdrawals,
        settings: this.settings,
        locations: this.locations
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Save state error:', e);
    }
  }

  public loadState() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (data.projects) this.projects = data.projects;
        if (data.users) this.users = new Map(data.users);
        if (data.votes) this.votes = data.votes;
        if (data.usedPhones) this.usedPhones = new Set(data.usedPhones);
        if (data.withdrawals) this.withdrawals = data.withdrawals;
        if (data.settings) this.settings = { ...this.settings, ...data.settings };
        if (data.locations) this.locations = data.locations;
      }
    } catch (e) {
      console.error('Load state error:', e);
    }
  }

  public getOrCreateUser(telegramId: number, firstName: string, username?: string, referrerId?: number): UserData {
    let user = this.users.get(telegramId);
    if (!user) {
      user = {
        telegramId,
        firstName,
        username,
        mainBalance: 0,
        pendingBalance: 0,
        referralEarned: 0,
        totalEarned: 0,
        referrerId,
        joinedAt: new Date().toISOString()
      };
      this.users.set(telegramId, user);
      this.saveState();
    }
    return user;
  }

  public isPhoneUsed(phone: string): boolean {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return this.usedPhones.has(cleanPhone);
  }

  public recordVote(userId: number, phone: string, projectId: string): { success: boolean; message: string; project?: ProjectData } {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (this.usedPhones.has(cleanPhone)) {
      return { success: false, message: 'Ushbu telefon raqamidan avval ovoz berilgan!' };
    }

    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      return { success: false, message: 'Loyiha topilmadi!' };
    }

    if (!project.isActive) {
      return { success: false, message: "Ushbu loyiha uchun ovoz yig'ish to'xtatilgan!" };
    }

    if (project.currentVotes >= project.autoStopLimit) {
      project.isActive = false;
      this.saveState();
      return { success: false, message: "Loyiha limitiga yetdi va ovoz yig'ish to'xtatildi!" };
    }

    this.usedPhones.add(cleanPhone);
    project.currentVotes += 1;

    // Record vote log
    const vote: VoteRecord = {
      id: 'v_' + Date.now(),
      userId,
      phone: cleanPhone,
      projectId,
      createdAt: new Date().toISOString()
    };
    this.votes.push(vote);

    // Reward user for voting
    const user = this.users.get(userId);
    if (user) {
      user.phone = cleanPhone;
      user.mainBalance += project.pricePerVote || this.settings.votePrice;
      user.totalEarned += project.pricePerVote || this.settings.votePrice;

      // Handle referral bonus
      if (user.referrerId) {
        const referrer = this.users.get(user.referrerId);
        if (referrer) {
          referrer.mainBalance += this.settings.referralBonus;
          referrer.referralEarned += this.settings.referralBonus;
          referrer.totalEarned += this.settings.referralBonus;
        }
      }
    }

    // Auto stop check
    if (project.currentVotes >= project.autoStopLimit) {
      project.isActive = false;
    }

    this.saveState();
    return { success: true, message: 'Ovoz muvaffaqiyatli qabul qilindi!', project };
  }

  public getProjectByMahalla(mahallaId: string): ProjectData | undefined {
    return this.projects.find(p => p.mahallaId === mahallaId);
  }

  public findViloyat(viloyatId: string) {
    return this.locations.find(v => v.id === viloyatId);
  }

  public findTuman(viloyatId: string, tumanId: string) {
    const viloyat = this.findViloyat(viloyatId);
    return viloyat?.tumans.find(t => t.id === tumanId);
  }

  public findMahalla(viloyatId: string, tumanId: string, mahallaId: string) {
    const tuman = this.findTuman(viloyatId, tumanId);
    return tuman?.mahallas.find(m => m.id === mahallaId);
  }

  public addMahalla(viloyatId: string, tumanId: string, name: string) {
    const tuman = this.findTuman(viloyatId, tumanId);
    if (tuman) {
      const id = 'm_' + Date.now();
      tuman.mahallas.push({ id, name });
      this.saveState();
    }
  }

  public deleteMahalla(viloyatId: string, tumanId: string, mahallaId: string) {
    const tuman = this.findTuman(viloyatId, tumanId);
    if (tuman) {
      tuman.mahallas = tuman.mahallas.filter(m => m.id !== mahallaId);
      this.saveState();
    }
  }

  public editMahalla(viloyatId: string, tumanId: string, mahallaId: string, newName: string) {
    const tuman = this.findTuman(viloyatId, tumanId);
    if (tuman) {
      const m = tuman.mahallas.find(m => m.id === mahallaId);
      if (m) {
        m.name = newName;
        this.saveState();
      }
    }
  }
}

export const store = new StoreService();
