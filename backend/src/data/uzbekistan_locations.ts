export interface MahallaItem {
  id: string;
  name: string;
}

export interface TumanItem {
  id: string;
  name: string;
  mahallas: MahallaItem[];
}

export interface ViloyatItem {
  id: string;
  name: string;
  tumans: TumanItem[];
}

export const UZBEKISTAN_LOCATIONS: ViloyatItem[] = [
  {
    id: "v_toshkent_sh",
    name: "Toshkent shahri",
    tumans: [
      {
        id: "t_yunusobod",
        name: "Yunusobod tumani",
        mahallas: [
          { id: "m_yunus_1", name: "1-mavze MFY" },
          { id: "m_yunus_2", name: "Bodomzor MFY" },
          { id: "m_yunus_3", name: "Mingchinor MFY" },
          { id: "m_yunus_4", name: "Shahriston MFY" },
          { id: "m_yunus_5", name: "Posira MFY" },
          { id: "m_yunus_6", name: "Hasanboy MFY" },
          { id: "m_yunus_7", name: "Matbuotchilar MFY" },
          { id: "m_yunus_8", name: "Sobir Rahimov MFY" },
          { id: "m_yunus_9", name: "Tiklanish MFY" }
        ]
      },
      {
        id: "t_chilonzor",
        name: "Chilonzor tumani",
        mahallas: [
          { id: "m_chilon_1", name: "Gagarin MFY" },
          { id: "m_chilon_2", name: "Qatortol MFY" },
          { id: "m_chilon_3", name: "Novza MFY" },
          { id: "m_chilon_4", name: "Oqtepa MFY" },
          { id: "m_chilon_5", name: "Zaruriyat MFY" },
          { id: "m_chilon_6", name: "Lutfiy MFY" },
          { id: "m_chilon_7", name: "Beshagach MFY" }
        ]
      },
      {
        id: "t_mirzo_ulugbek",
        name: "Mirzo Ulug'bek tumani",
        mahallas: [
          { id: "m_mu_1", name: "Buyuk Ipak Yo'li MFY" },
          { id: "m_mu_2", name: "Olimlar MFY" },
          { id: "m_mu_3", name: "Fergana MFY" },
          { id: "m_mu_4", name: "TTZ MFY" },
          { id: "m_mu_5", name: "Yuzrabod MFY" },
          { id: "m_mu_6", name: "Alisher Navoiy MFY" }
        ]
      },
      {
        id: "t_yashnobod",
        name: "Yashnobod tumani",
        mahallas: [
          { id: "m_yashn_1", name: "Katta Qorasuv MFY" },
          { id: "m_yashn_2", name: "Tuzel MFY" },
          { id: "m_yashn_3", name: "Do'stlik MFY" },
          { id: "m_yashn_4", name: "Jarqo'rg'on MFY" },
          { id: "m_yashn_5", name: "Aviasozlar MFY" }
        ]
      },
      {
        id: "t_shayxontohur",
        name: "Shayxontohur tumani",
        mahallas: [
          { id: "m_shayx_1", name: "Chorsu MFY" },
          { id: "m_shayx_2", name: "Jangoh MFY" },
          { id: "m_shayx_3", name: "G'ofur G'ulom MFY" },
          { id: "m_shayx_4", name: "Labzak MFY" },
          { id: "m_shayx_5", name: "O'zbekiston MFY" }
        ]
      },
      {
        id: "t_olmazor",
        name: "Olmazor tumani",
        mahallas: [
          { id: "m_olmaz_1", name: "Qoraqamish MFY" },
          { id: "m_olmaz_2", name: "Sebzor MFY" },
          { id: "m_olmaz_3", name: "Toshkent Yulduzi MFY" }
        ]
      },
      {
        id: "t_sergeli",
        name: "Sergeli tumani",
        mahallas: [
          { id: "m_serg_1", name: "Qipchoq MFY" },
          { id: "m_serg_2", name: "Quyoshli MFY" },
          { id: "m_serg_3", name: "Nogayqo'g'on MFY" }
        ]
      },
      {
        id: "t_yakkasaroy",
        name: "Yakkasaroy tumani",
        mahallas: [
          { id: "m_yak_1", name: "Boshliq MFY" },
          { id: "m_yak_2", name: "Rakat MFY" },
          { id: "m_yak_3", name: "Muqimiy MFY" }
        ]
      },
      {
        id: "t_mirobod",
        name: "Mirobod tumani",
        mahallas: [
          { id: "m_mir_1", name: "Oybek MFY" },
          { id: "m_mir_2", name: "Fayziyabad MFY" },
          { id: "m_mir_3", name: "Tong Yulduzi MFY" }
        ]
      },
      {
        id: "t_uchtepa",
        name: "Uchtepa tumani",
        mahallas: [
          { id: "m_uch_1", name: "O'rikzor MFY" },
          { id: "m_uch_2", name: "Vatan MFY" },
          { id: "m_uch_3", name: "Taqachi MFY" }
        ]
      }
    ]
  },
  {
    id: "v_navoiy",
    name: "Navoiy viloyati",
    tumans: [
      {
        id: "t_karmana",
        name: "Karmana tumani",
        mahallas: [
          { id: "m_karmana_1", name: "Sebiston MFY (Bohodir Jonuzoqov)" },
          { id: "m_karmana_2", name: "Sebiston MFY (Abdukarim Abulqosimov)" },
          { id: "m_karmana_3", name: "Malikrabot MFY" },
          { id: "m_karmana_4", name: "Varq MFY" },
          { id: "m_karmana_5", name: "Ziyakor MFY" },
          { id: "m_karmana_6", name: "Jaloyir MFY" },
          { id: "m_karmana_7", name: "Uyrot MFY" }
        ]
      },
      {
        id: "t_navoiy_sh",
        name: "Navoiy shahri",
        mahallas: [
          { id: "m_navoiy_sh_1", name: "Shifokor MFY (Shahzod Ochildiyev)" },
          { id: "m_navoiy_sh_2", name: "Ilg'or MFY (Sherzod Abdiyev)" },
          { id: "m_navoiy_sh_3", name: "Tinchlik MFY" },
          { id: "m_navoiy_sh_4", name: "G'alaba MFY" },
          { id: "m_navoiy_sh_5", name: "Kimyogar MFY" }
        ]
      },
      {
        id: "t_xatirchi",
        name: "Xatirchi tumani",
        mahallas: [
          { id: "m_xatirchi_1", name: "Yangirabod MFY" },
          { id: "m_xatirchi_2", name: "Qoraqo'sh MFY" },
          { id: "m_xatirchi_3", name: "Zarafshon MFY" },
          { id: "m_xatirchi_4", name: "Polvontepa MFY" }
        ]
      },
      {
        id: "t_nurota",
        name: "Nurota tumani",
        mahallas: [
          { id: "m_nurota_1", name: "Chashma MFY" },
          { id: "m_nurota_2", name: "Qizilcha MFY" },
          { id: "m_nurota_3", name: "Sensob MFY" }
        ]
      },
      {
        id: "t_zarafshon_sh",
        name: "Zarafshon shahri",
        mahallas: [
          { id: "m_zar_1", name: "Alisher Navoiy MFY" },
          { id: "m_zar_2", name: "Oltin Vadiy MFY" },
          { id: "m_zar_3", name: "Nurchi MFY" }
        ]
      },
      {
        id: "t_qiziltepa",
        name: "Qiziltepa tumani",
        mahallas: [
          { id: "m_qizil_1", name: "Vangazi MFY" },
          { id: "m_qizil_2", name: "Bustan MFY" },
          { id: "m_qizil_3", name: "G'ajdum MFY" }
        ]
      },
      {
        id: "t_navbahor",
        name: "Navbahor tumani",
        mahallas: [
          { id: "m_navb_1", name: "Beshrabot MFY" },
          { id: "m_navb_2", name: "Qalacha MFY" }
        ]
      },
      {
        id: "t_konimex",
        name: "Konimex tumani",
        mahallas: [
          { id: "m_koni_1", name: "Utegen MFY" },
          { id: "m_koni_2", name: "Konimex MFY" }
        ]
      },
      {
        id: "t_uchquduq",
        name: "Uchquduq tumani",
        mahallas: [
          { id: "m_uchq_1", name: "Mustaqillik MFY" },
          { id: "m_uchq_2", name: "Do'stlik MFY" }
        ]
      }
    ]
  },
  {
    id: "v_buxoro",
    name: "Buxoro viloyati",
    tumans: [
      {
        id: "t_buxoro_sh",
        name: "Buxoro shahri",
        mahallas: [
          { id: "m_bux_sh_1", name: "Sitora MFY" },
          { id: "m_bux_sh_2", name: "G'ijduvon MFY" },
          { id: "m_bux_sh_3", name: "Somoniy MFY" },
          { id: "m_bux_sh_4", name: "Navro'z MFY" },
          { id: "m_bux_sh_5", name: "Labi Hovuz MFY" }
        ]
      },
      {
        id: "t_gijduvon",
        name: "G'ijduvon tumani",
        mahallas: [
          { id: "m_gijd_1", name: "Chorsu MFY" },
          { id: "m_gijd_2", name: "Zarafshon MFY" },
          { id: "m_gijd_3", name: "Varazoni MFY" },
          { id: "m_gijd_4", name: "Abadi MFY" }
        ]
      },
      {
        id: "t_kogon",
        name: "Kogon tumani",
        mahallas: [
          { id: "m_kogon_1", name: "Bahovuddin Naqshband MFY" },
          { id: "m_kogon_2", name: "Yangi Hayot MFY" },
          { id: "m_kogon_3", name: "Kogon MFY" }
        ]
      },
      {
        id: "t_romitan",
        name: "Romitan tumani",
        mahallas: [
          { id: "m_rom_1", name: "Quyi Romitan MFY" },
          { id: "m_rom_2", name: "Afshona MFY" }
        ]
      },
      {
        id: "t_shofirkon",
        name: "Shofirkon tumani",
        mahallas: [
          { id: "m_shof_1", name: "Vardanzi MFY" },
          { id: "m_shof_2", name: "Tezguzar MFY" }
        ]
      },
      {
        id: "t_vobkent",
        name: "Vobkent tumani",
        mahallas: [
          { id: "m_vob_1", name: "Pirmast MFY" },
          { id: "m_vob_2", name: "Xalach MFY" }
        ]
      },
      {
        id: "t_qorakol",
        name: "Qorako'l tumani",
        mahallas: [
          { id: "m_qor_1", name: "Sayyod MFY" },
          { id: "m_qor_2", name: "Chala MFY" }
        ]
      },
      {
        id: "t_olot",
        name: "Olot tumani",
        mahallas: [
          { id: "m_olot_1", name: "Keshti MFY" },
          { id: "m_olot_2", name: "Olot MFY" }
        ]
      }
    ]
  },
  {
    id: "v_samarqand",
    name: "Samarqand viloyati",
    tumans: [
      {
        id: "t_samarqand_sh",
        name: "Samarqand shahri",
        mahallas: [
          { id: "m_sam_sh_1", name: "Registon MFY" },
          { id: "m_sam_sh_2", name: "Bog'ishamol MFY" },
          { id: "m_sam_sh_3", name: "Siab MFY" },
          { id: "m_sam_sh_4", name: "So'gdiyona MFY" },
          { id: "m_sam_sh_5", name: "Shohizinda MFY" }
        ]
      },
      {
        id: "t_pastdargom",
        name: "Pastdarg'om tumani",
        mahallas: [
          { id: "m_pastd_1", name: "Juma MFY" },
          { id: "m_pastd_2", name: "Gozalkent MFY" },
          { id: "m_pastd_3", name: "Chimboy MFY" }
        ]
      },
      {
        id: "t_urgut",
        name: "Urgut tumani",
        mahallas: [
          { id: "m_urgut_1", name: "Kamongaron MFY" },
          { id: "m_urgut_2", name: "G'ishtmasjid MFY" },
          { id: "m_urgut_3", name: "Pochvon MFY" }
        ]
      },
      {
        id: "t_kattaqorgon_sh",
        name: "Kattaqo'rg'on shahri",
        mahallas: [
          { id: "m_kat_1", name: "Ziyokor MFY" },
          { id: "m_kat_2", name: "Nurbuloq MFY" }
        ]
      },
      {
        id: "t_jomboy",
        name: "Jomboy tumani",
        mahallas: [
          { id: "m_jom_1", name: "Noshir MFY" },
          { id: "m_jom_2", name: "Dehqonobod MFY" }
        ]
      },
      {
        id: "t_ishtixon",
        name: "Ishtixon tumani",
        mahallas: [
          { id: "m_ish_1", name: "Mitan MFY" },
          { id: "m_ish_2", name: "Zarband MFY" }
        ]
      },
      {
        id: "t_bulungur",
        name: "Bulung'ur tumani",
        mahallas: [
          { id: "m_bul_1", name: "Kildon MFY" },
          { id: "m_bul_2", name: "Fozil Yuldash MFY" }
        ]
      },
      {
        id: "t_toyloq",
        name: "Toyloq tumani",
        mahallas: [
          { id: "m_toy_1", name: "Adas MFY" },
          { id: "m_toy_2", name: "Boshdarxon MFY" }
        ]
      }
    ]
  },
  {
    id: "v_andijon",
    name: "Andijon viloyati",
    tumans: [
      {
        id: "t_andijon_sh",
        name: "Andijon shahri",
        mahallas: [
          { id: "m_and_sh_1", name: "Bobur MFY" },
          { id: "m_and_sh_2", name: "Navro'z MFY" },
          { id: "m_and_sh_3", name: "Maydashar MFY" },
          { id: "m_and_sh_4", name: "O'zbegim MFY" }
        ]
      },
      {
        id: "t_asaka",
        name: "Asaka tumani",
        mahallas: [
          { id: "m_asaka_1", name: "Kujgan MFY" },
          { id: "m_asaka_2", name: "Fayziobod MFY" },
          { id: "m_asaka_3", name: "Asaka MFY" }
        ]
      },
      {
        id: "t_shahrixon",
        name: "Shahrixon tumani",
        mahallas: [
          { id: "m_shahrix_1", name: "Mustaqillik MFY" },
          { id: "m_shahrix_2", name: "Oltin Vadiy MFY" },
          { id: "m_shahrix_3", name: "Nazarmahalla MFY" }
        ]
      },
      {
        id: "t_marhamat",
        name: "Marhamat tumani",
        mahallas: [
          { id: "m_marh_1", name: "Mingtepa MFY" },
          { id: "m_marh_2", name: "Qoratepa MFY" }
        ]
      },
      {
        id: "t_baliqchi",
        name: "Baliqchi tumani",
        mahallas: [
          { id: "m_bal_1", name: "Chunabos MFY" },
          { id: "m_bal_2", name: "Olmachi MFY" }
        ]
      },
      {
        id: "t_izboskan",
        name: "Izboskan tumani",
        mahallas: [
          { id: "m_izb_1", name: "Poytug' MFY" },
          { id: "m_izb_2", name: "To'ramahalla MFY" }
        ]
      },
      {
        id: "t_paxtaobod",
        name: "Paxtaobod tumani",
        mahallas: [
          { id: "m_pax_1", name: "Uyg'ur MFY" },
          { id: "m_pax_2", name: "Madaniy Yul MFY" }
        ]
      }
    ]
  },
  {
    id: "v_fargona",
    name: "Farg'ona viloyati",
    tumans: [
      {
        id: "t_fargona_sh",
        name: "Farg'ona shahri",
        mahallas: [
          { id: "m_far_sh_1", name: "Al-Farg'oniy MFY" },
          { id: "m_far_sh_2", name: "Kirgili MFY" },
          { id: "m_far_sh_3", name: "Mustaqillik MFY" }
        ]
      },
      {
        id: "t_qoqon_sh",
        name: "Qo'qon shahri",
        mahallas: [
          { id: "m_qoq_1", name: "Oqtepa MFY" },
          { id: "m_qoq_2", name: "Muqimiy MFY" },
          { id: "m_qoq_3", name: "Xudoyorxon MFY" }
        ]
      },
      {
        id: "t_margilon_sh",
        name: "Marg'ilon shahri",
        mahallas: [
          { id: "m_marg_1", name: "Ipakchi MFY" },
          { id: "m_marg_2", name: "Burhanuddin MFY" },
          { id: "m_marg_3", name: "Atlas MFY" }
        ]
      },
      {
        id: "t_rishton",
        name: "Rishton tumani",
        mahallas: [
          { id: "m_rish_1", name: "Kuzatuvchilar MFY" },
          { id: "m_rish_2", name: "Chilingar MFY" }
        ]
      },
      {
        id: "t_quva",
        name: "Quva tumani",
        mahallas: [
          { id: "m_quva_1", name: "Akbarabad MFY" },
          { id: "m_quva_2", name: "Qayragach MFY" }
        ]
      },
      {
        id: "t_beshariq",
        name: "Beshariq tumani",
        mahallas: [
          { id: "m_besh_1", name: "Rapsan MFY" }
        ]
      },
      {
        id: "t_bogdod",
        name: "Bog'dod tumani",
        mahallas: [
          { id: "m_bog_1", name: "Matkul MFY" }
        ]
      }
    ]
  },
  {
    id: "v_namangan",
    name: "Namangan viloyati",
    tumans: [
      {
        id: "t_namangan_sh",
        name: "Namangan shahri",
        mahallas: [
          { id: "m_nam_sh_1", name: "Zahiriddin Bobur MFY" },
          { id: "m_nam_sh_2", name: "Doshloq MFY" },
          { id: "m_nam_sh_3", name: "Pahlavon MFY" }
        ]
      },
      {
        id: "t_chust",
        name: "Chust tumani",
        mahallas: [
          { id: "m_chust_1", name: "Parcha MFY" },
          { id: "m_chust_2", name: "Karakala MFY" },
          { id: "m_chust_3", name: "Gova MFY" }
        ]
      },
      {
        id: "t_kosonsoy",
        name: "Kosonsoy tumani",
        mahallas: [
          { id: "m_koson_1", name: "Chindovul MFY" },
          { id: "m_koson_2", name: "Kusan MFY" }
        ]
      },
      {
        id: "t_tooraqorgon",
        name: "To'raqo'rg'on tumani",
        mahallas: [
          { id: "m_toor_1", name: "Shahand MFY" }
        ]
      },
      {
        id: "t_uychi",
        name: "Uychi tumani",
        mahallas: [
          { id: "m_uychi_1", name: "Jiydakapa MFY" }
        ]
      },
      {
        id: "t_pop",
        name: "Pop tumani",
        mahallas: [
          { id: "m_pop_1", name: "Chodak MFY" }
        ]
      }
    ]
  },
  {
    id: "v_qashqadaryo",
    name: "Qashqadaryo viloyati",
    tumans: [
      {
        id: "t_qarshi_sh",
        name: "Qarshi shahri",
        mahallas: [
          { id: "m_qarshi_1", name: "Nasaf MFY" },
          { id: "m_qarshi_2", name: "Batosh MFY" },
          { id: "m_qarshi_3", name: "Geolog MFY" }
        ]
      },
      {
        id: "t_shahrisabz",
        name: "Shahrisabz tumani",
        mahallas: [
          { id: "m_shaxris_1", name: "Amir Temur MFY" },
          { id: "m_shaxris_2", name: "Kesh MFY" }
        ]
      },
      {
        id: "t_chiroqchi",
        name: "Chiroqchi tumani",
        mahallas: [
          { id: "m_chir_1", name: "Langar MFY" },
          { id: "m_chir_2", name: "Tarag'ay MFY" }
        ]
      },
      {
        id: "t_yakkabog",
        name: "Yakkabog' tumani",
        mahallas: [
          { id: "m_yakka_1", name: "Qaynarguzar MFY" }
        ]
      },
      {
        id: "t_guzor",
        name: "G'uzor tumani",
        mahallas: [
          { id: "m_guz_1", name: "Pachkamar MFY" }
        ]
      },
      {
        id: "t_koson",
        name: "Koson tumani",
        mahallas: [
          { id: "m_kos_1", name: "Surxon MFY" }
        ]
      },
      {
        id: "t_muborak",
        name: "Muborak tumani",
        mahallas: [
          { id: "m_mub_1", name: "Geolog MFY" }
        ]
      }
    ]
  },
  {
    id: "v_surxondaryo",
    name: "Surxondaryo viloyati",
    tumans: [
      {
        id: "t_termiz_sh",
        name: "Termiz shahri",
        mahallas: [
          { id: "m_termiz_1", name: "Jayxun MFY" },
          { id: "m_termiz_2", name: "Al-Hakim MFY" },
          { id: "m_termiz_3", name: "Surxon MFY" }
        ]
      },
      {
        id: "t_denov",
        name: "Denov tumani",
        mahallas: [
          { id: "m_denov_1", name: "Sina MFY" },
          { id: "m_denov_2", name: "Yurchi MFY" },
          { id: "m_denov_3", name: "Hazorbog' MFY" }
        ]
      },
      {
        id: "t_sherobod",
        name: "Sherobod tumani",
        mahallas: [
          { id: "m_sher_1", name: "Pashxurt MFY" }
        ]
      },
      {
        id: "t_shorchi",
        name: "Sho'rchi tumani",
        mahallas: [
          { id: "m_shor_1", name: "Elti MFY" }
        ]
      },
      {
        id: "t_jarqorgon",
        name: "Jarqo'rg'on tumani",
        mahallas: [
          { id: "m_jar_1", name: "Kakaydi MFY" }
        ]
      },
      {
        id: "t_sariosiyo",
        name: "Sariosiyo tumani",
        mahallas: [
          { id: "m_sari_1", name: "Sangardak MFY" }
        ]
      }
    ]
  },
  {
    id: "v_jizzax",
    name: "Jizzax viloyati",
    tumans: [
      {
        id: "t_jizzax_sh",
        name: "Jizzax shahri",
        mahallas: [
          { id: "m_jiz_1", name: "Uchtepa MFY" },
          { id: "m_jiz_2", name: "Zarbdor MFY" },
          { id: "m_jiz_3", name: "Sangzor MFY" }
        ]
      },
      {
        id: "t_zaamin",
        name: "Zomin tumani",
        mahallas: [
          { id: "m_zamin_1", name: "Duoba MFY" },
          { id: "m_zamin_2", name: "Zomin MFY" }
        ]
      },
      {
        id: "t_gallaorol",
        name: "G'allaorol tumani",
        mahallas: [
          { id: "m_gall_1", name: "Lalmikor MFY" }
        ]
      },
      {
        id: "t_baxmal",
        name: "Baxmal tumani",
        mahallas: [
          { id: "m_baxm_1", name: "Usmat MFY" }
        ]
      },
      {
        id: "t_dostlik",
        name: "Do'stlik tumani",
        mahallas: [
          { id: "m_dost_1", name: "Manas MFY" }
        ]
      },
      {
        id: "t_paxtakor",
        name: "Paxtakor tumani",
        mahallas: [
          { id: "m_pax_1", name: "Mingchinar MFY" }
        ]
      }
    ]
  },
  {
    id: "v_sirdaryo",
    name: "Sirdaryo viloyati",
    tumans: [
      {
        id: "t_guliston_sh",
        name: "Guliston shahri",
        mahallas: [
          { id: "m_gul_1", name: "Ulug'bek MFY" },
          { id: "m_gul_2", name: "Baxor MFY" }
        ]
      },
      {
        id: "t_yangiyer",
        name: "Yangiyer shahri",
        mahallas: [
          { id: "m_yangiyer_1", name: "Shodlik MFY" }
        ]
      },
      {
        id: "t_shirin_sh",
        name: "Shirin shahri",
        mahallas: [
          { id: "m_shirin_1", name: "Farxod MFY" }
        ]
      },
      {
        id: "t_sirdaryo_t",
        name: "Sirdaryo tumani",
        mahallas: [
          { id: "m_sird_1", name: "Baxt MFY" }
        ]
      },
      {
        id: "t_xovos",
        name: "Xovos tumani",
        mahallas: [
          { id: "m_xovos_1", name: "Turkeston MFY" }
        ]
      },
      {
        id: "t_boyovut",
        name: "Boyovut tumani",
        mahallas: [
          { id: "m_boy_1", name: "Galaba MFY" }
        ]
      }
    ]
  },
  {
    id: "v_xorazm",
    name: "Xorazm viloyati",
    tumans: [
      {
        id: "t_urganch_sh",
        name: "Urganch shahri",
        mahallas: [
          { id: "m_urg_1", name: "Al-Xorazmiy MFY" },
          { id: "m_urg_2", name: "Jaloliddin MFY" }
        ]
      },
      {
        id: "t_xiva_sh",
        name: "Xiva shahri",
        mahallas: [
          { id: "m_xiva_1", name: "Ichan Qala MFY" },
          { id: "m_xiva_2", name: "Dishan Qala MFY" }
        ]
      },
      {
        id: "t_xonqa",
        name: "Xonqa tumani",
        mahallas: [
          { id: "m_xonq_1", name: "Kattabog' MFY" }
        ]
      },
      {
        id: "t_hazorasp",
        name: "Hazorasp tumani",
        mahallas: [
          { id: "m_haz_1", name: "Pachtachi MFY" }
        ]
      },
      {
        id: "t_bogot",
        name: "Bog'ot tumani",
        mahallas: [
          { id: "m_bogot_1", name: "Dehqon MFY" }
        ]
      },
      {
        id: "t_shovot",
        name: "Shovot tumani",
        mahallas: [
          { id: "m_shov_1", name: "Manak MFY" }
        ]
      },
      {
        id: "t_gurlan",
        name: "Gurlan tumani",
        mahallas: [
          { id: "m_gur_1", name: "Vazir MFY" }
        ]
      }
    ]
  },
  {
    id: "v_qoraqalpogiston",
    name: "Qoraqalpog'iston Res.",
    tumans: [
      {
        id: "t_nukus_sh",
        name: "Nukus shahri",
        mahallas: [
          { id: "m_nukus_1", name: "Beruniy MFY" },
          { id: "m_nukus_2", name: "G'arezsizlik MFY" }
        ]
      },
      {
        id: "t_toortkol",
        name: "To'rtko'l tumani",
        mahallas: [
          { id: "m_toort_1", name: "Amu Darya MFY" }
        ]
      },
      {
        id: "t_beruniy",
        name: "Beruniy tumani",
        mahallas: [
          { id: "m_berun_1", name: "Shabbaz MFY" }
        ]
      },
      {
        id: "t_qongirot",
        name: "Qo'ng'irot tumani",
        mahallas: [
          { id: "m_qong_1", name: "Jasliq MFY" }
        ]
      },
      {
        id: "t_xodjeyli",
        name: "Xo'jayli tumani",
        mahallas: [
          { id: "m_xodj_1", name: "Taza Jol MFY" }
        ]
      },
      {
        id: "t_ellikqala",
        name: "Ellikqal'a tumani",
        mahallas: [
          { id: "m_ellik_1", name: "Bustan MFY" }
        ]
      },
      {
        id: "t_moynoq",
        name: "Mo'ynoq tumani",
        mahallas: [
          { id: "m_moy_1", name: "Orol MFY" }
        ]
      }
    ]
  },
  {
    id: "v_toshkent_vil",
    name: "Toshkent viloyati",
    tumans: [
      {
        id: "t_chirchiq_sh",
        name: "Chirchiq shahri",
        mahallas: [
          { id: "m_chir_1", name: "Lola MFY" },
          { id: "m_chir_2", name: "Kimyogar MFY" }
        ]
      },
      {
        id: "t_olmalik_sh",
        name: "Olmalik shahri",
        mahallas: [
          { id: "m_olm_1", name: "Metallurg MFY" }
        ]
      },
      {
        id: "t_angren_sh",
        name: "Angren shahri",
        mahallas: [
          { id: "m_ang_1", name: "Duken MFY" }
        ]
      },
      {
        id: "t_yangiyol_sh",
        name: "Yangiyo'l shahri",
        mahallas: [
          { id: "m_yangiy_1", name: "Fayzli MFY" }
        ]
      },
      {
        id: "t_zangiota",
        name: "Zangiota tumani",
        mahallas: [
          { id: "m_zangi_1", name: "Eshanguzar MFY" }
        ]
      },
      {
        id: "t_qibray",
        name: "Qibray tumani",
        mahallas: [
          { id: "m_qib_1", name: "Bayqo'rg'on MFY" }
        ]
      },
      {
        id: "t_bostanliq",
        name: "Bo'stonliq tumani",
        mahallas: [
          { id: "m_bost_1", name: "Gazalkent MFY" },
          { id: "m_bost_2", name: "Chorvoq MFY" }
        ]
      },
      {
        id: "t_parkent",
        name: "Parkent tumani",
        mahallas: [
          { id: "m_par_1", name: "Sukok MFY" }
        ]
      }
    ]
  }
];

export function findViloyat(id: string) {
  return UZBEKISTAN_LOCATIONS.find(v => v.id === id);
}

export function findTuman(viloyatId: string, tumanId: string) {
  const viloyat = findViloyat(viloyatId);
  return viloyat?.tumans.find(t => t.id === tumanId);
}

export function findMahalla(viloyatId: string, tumanId: string, mahallaId: string) {
  const tuman = findTuman(viloyatId, tumanId);
  return tuman?.mahallas.find(m => m.id === mahallaId);
}
