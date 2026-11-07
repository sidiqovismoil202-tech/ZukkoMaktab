import { Lesson, ShopItem, User } from '../types';

export const INITIAL_HERO_IMAGE = '/src/assets/images/hero_kids_learning_1794032963753.jpg';
export const OWL_AVATAR = '/src/assets/images/avatar_wise_owl_1794032963718.jpg';
export const ASTRONAUT_AVATAR = '/src/assets/images/avatar_astronaut_kid_1794032964311.jpg';
export const LION_AVATAR = '/src/assets/images/avatar_lion_king_1794032964034.jpg';
export const CHAMPION_BADGE = '/src/assets/images/badge_champion_cup_1794032963986.jpg';

export const SEED_SHOP_ITEMS: ShopItem[] = [
  // Avatars
  {
    id: 'avatar_owl',
    name: "Dono Boyqush",
    type: 'avatar',
    price: 30,
    description: "Ko'zoynakli, bilimga chanqoq dono va muloyim boyqushcha surati.",
    previewUrl: OWL_AVATAR,
    value: OWL_AVATAR,
  },
  {
    id: 'avatar_astronaut',
    name: "Koinot Sayyohi",
    type: 'avatar',
    price: 60,
    description: "Yulduzlar va sayyoralar orasida erkin parvoz qiluvchi kosmonavt bolakay.",
    previewUrl: ASTRONAUT_AVATAR,
    value: ASTRONAUT_AVATAR,
  },
  {
    id: 'avatar_lion',
    name: "Jasur Arsloncha",
    type: 'avatar',
    price: 50,
    description: "Boshida oltin toji bor, dovyurak va g'olib sher bolasi.",
    previewUrl: LION_AVATAR,
    value: LION_AVATAR,
  },
  {
    id: 'avatar_default_boy',
    name: "Zukko Bola",
    type: 'avatar',
    price: 0,
    description: "Boshlang'ich profil avatari.",
    previewUrl: '👦',
    value: '👦',
    unlockedByDefault: true,
  },
  {
    id: 'avatar_default_girl',
    name: "Zukko Qizaloq",
    type: 'avatar',
    price: 0,
    description: "Boshlang'ich profil avatari.",
    previewUrl: '👧',
    value: '👧',
    unlockedByDefault: true,
  },
  // Frames (Ramkalar)
  {
    id: 'frame_gold',
    name: "Oltin Toj Ramka",
    type: 'frame',
    price: 45,
    description: "Profilingiz atrofida yaltirab turuvchi qirollik oltin chegarasi.",
    previewUrl: '👑',
    value: 'border-4 border-amber-400 ring-4 ring-amber-200/80 shadow-lg shadow-amber-500/20',
  },
  {
    id: 'frame_space_neon',
    name: "Koinot Nuri Neon",
    type: 'frame',
    price: 55,
    description: "Moviy va binafsha nur taratuvchi zamonaviy kosmik ramka.",
    previewUrl: '🌌',
    value: 'border-4 border-cyan-400 ring-4 ring-indigo-400/80 shadow-lg shadow-cyan-500/30',
  },
  {
    id: 'frame_emerald',
    name: "Zumrad Tabiat",
    type: 'frame',
    price: 35,
    description: "Yashil zumrad jiloli toza tabiat ramkasi.",
    previewUrl: '🌿',
    value: 'border-4 border-emerald-400 ring-4 ring-emerald-200 shadow-md shadow-emerald-500/20',
  },
  {
    id: 'frame_ruby',
    name: "Yaqut Olov",
    type: 'frame',
    price: 70,
    description: "Qizil yaqutdek alangali g'oliblar ramkasi.",
    previewUrl: '🔥',
    value: 'border-4 border-rose-500 ring-4 ring-orange-400/80 shadow-lg shadow-rose-500/30',
  },
  // Themes / Card Backgrounds
  {
    id: 'theme_space',
    name: "Koinot Safiri",
    type: 'theme',
    price: 40,
    description: "Tungi osmon va yulduzlar jilosidagi sirli fon.",
    previewUrl: '✨',
    value: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white',
  },
  {
    id: 'theme_sunny',
    name: "Quyoshli Zumrad",
    type: 'theme',
    price: 30,
    description: "Issiq, iliq va ilhom beruvchi sarg'ish yorug' fon.",
    previewUrl: '☀️',
    value: 'bg-gradient-to-br from-amber-50 via-yellow-100/70 to-emerald-50 text-slate-800',
  },
  {
    id: 'theme_violet',
    name: "Sehrli Binafsha",
    type: 'theme',
    price: 50,
    description: "Orzular va sehrli ertaklar dunyosi foni.",
    previewUrl: '🔮',
    value: 'bg-gradient-to-br from-purple-900 via-fuchsia-900 to-indigo-950 text-white',
  },
  // Badges (Nishonlar)
  {
    id: 'badge_cup',
    name: "Oltin Chempion Kubogi",
    type: 'badge',
    price: 80,
    description: "Har sohada eng yuqori natijalarga erishgan o'quvchi faxriy belgisi.",
    previewUrl: CHAMPION_BADGE,
    value: '🏆 Oltin Chempion',
  },
  {
    id: 'badge_math_genius',
    name: "Matematika Dahosi",
    type: 'badge',
    price: 35,
    description: "Hisob-kitob va mantiqiy masalalarni chaqqon yechuvchilarga beriladi.",
    previewUrl: '📐',
    value: '📐 Matematika Dahosi',
  },
  {
    id: 'badge_bookworm',
    name: "Zukko Kitobxon",
    type: 'badge',
    price: 25,
    description: "Ko'p kitob mutolaa qilgan bilimdon o'quvchi nishoni.",
    previewUrl: '📚',
    value: '📚 Zukko Kitobxon',
  },
  {
    id: 'badge_speedy',
    name: "Tezkor Fikrlovchi",
    type: 'badge',
    price: 40,
    description: "O'yinlarda eng tez va to'g'ri qaror qabul qiluvchi o'quvchi nishoni.",
    previewUrl: '⚡',
    value: '⚡ Tezkor Fikrlovchi',
  },
];

export const SEED_LESSONS: Lesson[] = [
  // 1-sinf
  {
    id: 'l_1_1',
    grade: 1,
    subject: 'Matematika',
    title: "1 dan 10 gacha sanash va qo'shish",
    description: "Sonlarni qiziqarli shakllar va mevalar orqali o'rganamiz.",
    coinsReward: 15,
    estimatedMinutes: 10,
    content: `
# 1 dan 10 gacha sanashni o'rganamiz! 🍎

Salom, yosh bilimdon! Matematika bu juda qiziqarli dunyo. 
Keling, mevalarni sanashdan boshlaymiz:

- 🍏 **1 dona olma**
- 🍐🍐 **2 dona nok**
- 🍊🍊🍊 **3 dona apelsin**
- 🍌🍌🍌🍌 **4 dona banan**
- 🍓🍓🍓🍓🍓 **5 dona qulupnay**

### Qo'shish amali nima?
Qo'shish — bu narsalarni bir-biriga birlashtirish demakdir.
Masalan:
Agar sizda **2 ta olma** bo'lsa va do'stingiz yana **1 ta olma** bersa:
**2 + 1 = 3 ta olma bo'ladi!** 🎉

Eslab qoling: **+** belgisi qo'shish, **=** belgisi esa natijani bildiradi.
`,
    test: [
      {
        id: 't_1_1_1',
        question: "3 ta nokka 2 ta nok qo'shilsa nechta bo'ladi?",
        options: ["4 ta", "5 ta", "6 ta", "3 ta"],
        correctIndex: 1,
        explanation: "3 + 2 = 5 bo'ladi. Barakalla!"
      },
      {
        id: 't_1_1_2',
        question: "1 dan keyin qaysi son keladi?",
        options: ["3", "2", "0", "4"],
        correctIndex: 1,
        explanation: "1 dan keyin albatta 2 soni keladi."
      },
      {
        id: 't_1_1_3',
        question: "4 + 0 amali necha bo'ladi?",
        options: ["0", "4", "5", "40"],
        correctIndex: 1,
        explanation: "Har qanday songa 0 qo'shilsa o'sha sonning o'zi chiqadi: 4 + 0 = 4."
      }
    ]
  },
  {
    id: 'l_1_2',
    grade: 1,
    subject: 'Ona tili',
    title: "Alifbo va unli tovushlar",
    description: "O'zbek alifbosidagi unli harflar va bo'g'in tuzish sirlari.",
    coinsReward: 15,
    estimatedMinutes: 12,
    content: `
# Sehirli harflar olamiga xush kelibsiz! 📖

Harflar orqali biz so'zlarni yozamiz va o'qiymiz.
O'zbek tilida **6 ta unli tovush** bor. Ular bemalol kuylanadigan, jarangdor tovushlardir:

✨ **A, O, I, U, O', E**

### Keling, so'zlar tuzamiz:
- **O-NA** (O va A unlilari)
- **O-TA** (O va A unlilari)
- **KI-TOB** (I va O unlilari)
- **MA-K-TAB** (A unlilari)

Unli harflar so'zlarni bo'g'inlarga ajratishda asosiy yordamchidir! So'zda nechta unli bo'lsa, shuncha bo'g'in bo'ladi.
`,
    test: [
      {
        id: 't_1_2_1',
        question: "O'zbek tilida nechta unli tovush bor?",
        options: ["4 ta", "5 ta", "6 ta", "10 ta"],
        correctIndex: 2,
        explanation: "O'zbek tilida 6 ta unli bor: A, O, I, U, O', E."
      },
      {
        id: 't_1_2_2',
        question: "'K-I-T-O-B' so'zida nechta unli harf bor?",
        options: ["1 ta", "2 ta", "3 ta", "5 ta"],
        correctIndex: 1,
        explanation: "'I' va 'O' — jami 2 ta unli harf bor."
      },
      {
        id: 't_1_2_3',
        question: "Quyidagilardan qaysi biri unli harf?",
        options: ["B", "K", "A", "M"],
        correctIndex: 2,
        explanation: "'A' harfi unli tovushdir."
      }
    ]
  },

  // 2-sinf
  {
    id: 'l_2_1',
    grade: 2,
    subject: 'Matematika',
    title: "20 ichida qo'shish va ayirish",
    description: "O'nlikdan o'tib hisoblash va mantiqiy misollar.",
    coinsReward: 20,
    estimatedMinutes: 12,
    content: `
# O'nlikdan o'tib hisoblash 🧮

2-sinfda biz 20 gacha bo'lgan sonlar ustida tezkor amallarni bajaramiz.

Misol: **8 + 5 = ?**
Uni qanday oson hisoblaymiz?
1. 8 ni 10 ga to'ldirish uchun 2 kerak (8 + 2 = 10).
2. 5 dan 2 ni olsak, 3 qoladi.
3. 10 + 3 = **13**! Demak, 8 + 5 = 13 bo'ladi.

### Ayirish misoli:
**15 - 7 = ?**
1. 15 dan 5 ni ayirsak 10 qoladi.
2. 7 dan qolgan 2 ni 10 dan ayirsak: 10 - 2 = **8**!
`,
    test: [
      {
        id: 't_2_1_1',
        question: "9 + 6 yig'indisi nechiga teng?",
        options: ["14", "15", "16", "13"],
        correctIndex: 1,
        explanation: "9 + 6 = 15."
      },
      {
        id: 't_2_1_2',
        question: "17 - 8 ayirmasi nechiga teng?",
        options: ["9", "8", "10", "7"],
        correctIndex: 0,
        explanation: "17 - 8 = 9 bo'ladi."
      },
      {
        id: 't_2_1_3',
        question: "Savatchada 12 ta nok bor edi. 4 tasini yeyishdi. Nechta qoldi?",
        options: ["6 ta", "7 ta", "8 ta", "9 ta"],
        correctIndex: 2,
        explanation: "12 - 4 = 8 ta nok qoldi."
      }
    ]
  },
  {
    id: 'l_2_2',
    grade: 2,
    subject: 'Tabiiy fanlar',
    title: "To'rt fasl va tabiat mo'jizalari",
    description: "Bahor, yoz, kuz va qishning o'ziga xos xususiyatlari.",
    coinsReward: 20,
    estimatedMinutes: 14,
    content: `
# Tabiatning to'rt go'zal fasli 🌸☀️🍂❄️

Bir yilda **4 ta fasl** va **12 ta oy** bor:

1. **Bahor (Mart, Aprel, May)**: Qorlar eriydi, daraxtlar gullaydi, qushlar uchib keladi.
2. **Yoz (Iyun, Iyul, Avgust)**: Kunlar eng issiq, mevalar pishadi, ta'til vaqti!
3. **Kuz (Sentabr, Oktabr, Noyabr)**: Barglar sarg'ayadi, hosil yig'iladi, maktab boshlanadi.
4. **Qish (Dekabr, Yanvar, Fevral)**: Qor yog'adi, havo soviydi, qorbobo yasash vaqti!
`,
    test: [
      {
        id: 't_2_2_1',
        question: "Bir yilda nechta fasl bor?",
        options: ["2 ta", "3 ta", "4 ta", "12 ta"],
        correctIndex: 2,
        explanation: "Bir yilda 4 ta fasl bor: Bahor, Yoz, Kuz, Qish."
      },
      {
        id: 't_2_2_2',
        question: "Qaysi faslda daraxtlar gullab tabiat uyg'onadi?",
        options: ["Qishda", "Bahorda", "Kuzda", "Yozda"],
        correctIndex: 1,
        explanation: "Bahor faslida butun tabiat jonlanadi va daraxtlar gullaydi."
      },
      {
        id: 't_2_2_3',
        question: "Sentabr oyi qaysi faslga tegishli?",
        options: ["Bahor", "Yoz", "Kuz", "Qish"],
        correctIndex: 2,
        explanation: "Sentabr — kuz faslining birinchi oyidir."
      }
    ]
  },

  // 3-sinf
  {
    id: 'l_3_1',
    grade: 3,
    subject: 'Matematika',
    title: "Ko'paytirish jadvali sirlari",
    description: "Ko'paytirish amalini oson eslab qolish yo'llari.",
    coinsReward: 25,
    estimatedMinutes: 15,
    content: `
# Ko'paytirish — bu tezkor qo'shishdir! ✖️

Agar siz 4 ta do'stingizning har biriga 3 tadan daftar bersangiz:
3 + 3 + 3 + 3 = 12 ta daftar kerak bo'ladi.
Buni qisqacha ko'paytirish bilan yozish mumkin:
**4 × 3 = 12**

### Muhim qoidalar:
- **0 ga ko'paytirish**: Har qanday sonni 0 ga ko'paytirsangiz natija 0 bo'ladi (7 × 0 = 0).
- **1 ga ko'paytirish**: Har qanday sonni 1 ga ko'paytirsangiz o'sha son chiqadi (8 × 1 = 8).
- **O'rin almashtirish**: 3 × 5 = 15 va 5 × 3 = 15. Ko'paytuvchilar o'rni almashsa ham natija o'zgarmaydi!
`,
    test: [
      {
        id: 't_3_1_1',
        question: "6 × 4 amali necha bo'ladi?",
        options: ["20", "22", "24", "26"],
        correctIndex: 2,
        explanation: "6 × 4 = 24 bo'ladi."
      },
      {
        id: 't_3_1_2',
        question: "9 × 0 natijasi qanchaga teng?",
        options: ["9", "0", "90", "1"],
        correctIndex: 1,
        explanation: "Nolga ko'paytirilgan har qanday son 0 ga teng."
      },
      {
        id: 't_3_1_3',
        question: "5 ta qutining har birida 5 tadan qalam bor. Jami qalamlar nechta?",
        options: ["10", "20", "25", "30"],
        correctIndex: 2,
        explanation: "5 × 5 = 25 ta qalam."
      }
    ]
  },
  {
    id: 'l_3_2',
    grade: 3,
    subject: 'Ingliz tili',
    title: "Colors & Animals (Ranglar va hayvonlar)",
    description: "Ingliz tilida sevimli hayvonlar va ranglarni o'rganamiz.",
    coinsReward: 25,
    estimatedMinutes: 12,
    content: `
# Welcome to English! 🦁🎨

Keling, ingliz tilida ranglar va hayvonlar nomlarini o'rganamiz:

### Colors (Ranglar):
- 🔴 **Red** — Qizil
- 🔵 **Blue** — Moviy/Ko'k
- 🟢 **Green** — Yashil
- 🟡 **Yellow** — Sariq
- ⚪ **White** — Oq

### Animals (Hayvonlar):
- 🐶 **A dog** — Kuchukcha
- 🐱 **A cat** — Mushuk
- 🦁 **A lion** — Arslon
- 🐦 **A bird** — Qushcha
- 🐎 **A horse** — Ot

**Jumla tuzamiz:**
"A green bird" — Yashil qushcha.
"A yellow cat" — Sariq mushuk.
`,
    test: [
      {
        id: 't_3_2_1',
        question: "'Red' so'zining o'zbekcha tarjimasi nima?",
        options: ["Yashil", "Qizil", "Sariq", "Qora"],
        correctIndex: 1,
        explanation: "Red — qizil rang."
      },
      {
        id: 't_3_2_2',
        question: "'Cat' so'zi qaysi hayvonni bildiradi?",
        options: ["Kuchuk", "Arslon", "Mushuk", "Quyon"],
        correctIndex: 2,
        explanation: "Cat — mushuk degani."
      },
      {
        id: 't_3_2_3',
        question: "'Moviy osmon' ingliz tilida qanday bo'ladi?",
        options: ["Green sky", "Blue sky", "Red sky", "Yellow sky"],
        correctIndex: 1,
        explanation: "Blue — moviy, sky — osmon."
      }
    ]
  },

  // 4-sinf
  {
    id: 'l_4_1',
    grade: 4,
    subject: 'Ona tili',
    title: "Gapning bosh bo'laklari: Ega va Kesim",
    description: "Gap nima haqida aytilayotgani va uning harakatini aniqlash.",
    coinsReward: 30,
    estimatedMinutes: 15,
    content: `
# Gapning asosiy tayanchi: Ega va Kesim 📝

Har qanday fikr gap orqali ifodalanadi. Gapda ikkita bosh bo'lak bo'ladi:

1. **Ega**:
   - Gapda kim yoki nima harakat qilayotganini bildiradi.
   - Savollari: **Kim? Nima? Qayer?**
   - Tagiga bitta to'g'ri chiziq chiziladi.
   - *Misol:* **Ali** kitob o'qidi. (Kim? Ali — ega).

2. **Kesim**:
   - Ega nima qilganini yoki uning holatini bildiradi.
   - Savollari: **Nima qildi? Nima qilyapti? Qanday?**
   - Tagiga ikkita to'g'ri chiziq chiziladi.
   - *Misol:* Ali kitob **o'qidi**. (Nima qildi? o'qidi — kesim).
`,
    test: [
      {
        id: 't_4_1_1',
        question: "'Bolalar stadionda futbol o'ynashdi' gapida ega qaysi so'z?",
        options: ["Stadionda", "Futbol", "Bolalar", "O'ynashdi"],
        correctIndex: 2,
        explanation: "Kimlar o'ynashdi? Bolalar — bu ega."
      },
      {
        id: 't_4_1_2',
        question: "Kesim qaysi savollarga javob bo'ladi?",
        options: ["Kim? Nima?", "Nima qildi? Qanday?", "Qayerga?", "Nechta?"],
        correctIndex: 1,
        explanation: "Kesim harakat va holatni bildirib, 'nima qildi?' savollariga javob beradi."
      },
      {
        id: 't_4_1_3',
        question: "'Quyosh charoqlab nur sochdi' gapida kesim qaysi?",
        options: ["Quyosh", "Charoqlab", "Nur", "Nur sochdi"],
        correctIndex: 3,
        explanation: "'Nur sochdi' — bu gapdagi kesimdir."
      }
    ]
  },
  {
    id: 'l_4_2',
    grade: 4,
    subject: 'Tabiiy fanlar',
    title: "Quyosh tizimi va bizning Yer sayyoramiz",
    description: "Koinotdagi sayyoralar, Quyosh va Yerning harakati.",
    coinsReward: 30,
    estimatedMinutes: 16,
    content: `
# Cheksiz koinot sirlari 🌍🚀

Quyosh tizimining markazida ulkan va issiq yulduz — **Quyosh** joylashgan.
Uning atrofida **8 ta asosiy sayyora** aylanadi:

1. **Merkuriy** (eng yaqin va kichik)
2. **Venera** (eng issiq sayyora)
3. **Yer** (hayot mavjud bo'lgan yagona ma'lum sayyora) 💙
4. **Mars** ("Qizil sayyora")
5. **Yupiter** (eng ulkan gaz giganti)
6. **Saturn** (chiroyli halqalari bor)
7. **Uran** (muzli gigant)
8. **Neptun** (eng uzoq sayyora)

Yer Quyosh atrofida to'liq bir marta aylanishi uchun **365 kun (1 yil)** ketadi. O'z o'qi atrofida esa **24 soat (1 kecha-kunduz)** da aylanadi!
`,
    test: [
      {
        id: 't_4_2_1',
        question: "Quyosh tizimida nechta asosiy sayyora bor?",
        options: ["7 ta", "8 ta", "9 ta", "10 ta"],
        correctIndex: 1,
        explanation: "Quyosh tizimida 8 ta sayyora mavjud."
      },
      {
        id: 't_4_2_2',
        question: "Qaysi sayyorada halqalar juda aniq ko'rinadi?",
        options: ["Mars", "Saturn", "Venera", "Merkuriy"],
        correctIndex: 1,
        explanation: "Saturn o'zining ajoyib halqalari bilan mashhur."
      },
      {
        id: 't_4_2_3',
        question: "Yer o'z o'qi atrofida to'liq aylanishi uchun qancha vaqt ketadi?",
        options: ["1 yil", "1 oy", "24 soat", "12 soat"],
        correctIndex: 2,
        explanation: "24 soat ichida 1 kecha-kunduz almashadi."
      }
    ]
  },

  // 5-sinf
  {
    id: 'l_5_1',
    grade: 5,
    subject: 'Matematika',
    title: "Oddiy kasrlar va ularni qo'shish",
    description: "Bir butunni bo'laklarga bo'lish, surat va maxraj qoidalari.",
    coinsReward: 35,
    estimatedMinutes: 18,
    content: `
# Kasrlar dunyosiga sayohat 🍰

Tasavvur qiling, siz bitta butun pitsani 4 ta teng bo'lakka bo'ldingiz.
Siz 1 ta bo'lakni yesangiz, pitsaning **1/4** qismini yegan bo'lasiz.

### Kasrning tuzilishi:
- **Maxraj (pastdagi son)**: Butun narsa nechta teng bo'lakka bo'linganini bildiradi.
- **Surat (yuqoridagi son)**: O'sha bo'laklardan nechta olinganini bildiradi.

### Bir xil maxrajli kasrlarni qo'shish:
Maxrajlar bir xil bo'lsa, faqat suratlari qo'shiladi, maxraj o'zgarishsiz qoladi:
**1/5 + 2/5 = (1+2)/5 = 3/5**

Oddiy va tushunarli, shunday emasmi?
`,
    test: [
      {
        id: 't_5_1_1',
        question: "3/7 kasrida maxraj qaysi son?",
        options: ["3", "7", "10", "4"],
        correctIndex: 1,
        explanation: "Pastdagi son maxraj deyiladi, bu yerda u 7 ga teng."
      },
      {
        id: 't_5_1_2',
        question: "2/9 + 4/9 yig'indisi nechiga teng?",
        options: ["6/18", "6/9", "8/9", "2/9"],
        correctIndex: 1,
        explanation: "(2+4)/9 = 6/9."
      },
      {
        id: 't_5_1_3',
        question: "Qaysi kasr butun 1 ga teng?",
        options: ["3/4", "5/5", "2/6", "7/8"],
        correctIndex: 1,
        explanation: "Surat va maxraj teng bo'lsa u 1 ga teng: 5/5 = 1."
      }
    ]
  },
  {
    id: 'l_5_2',
    grade: 5,
    subject: 'Tarix',
    title: "Buyuk Ipak Yo'li va qadimgi shaharlar",
    description: "Samarqand, Buxoro va qadimiy savdo karvonlari tarixi.",
    coinsReward: 35,
    estimatedMinutes: 20,
    content: `
# Buyuk Ipak Yo'li afsonasi 🐪🐫

Buyuk Ipak Yo'li — qadimda Xitoydan boshlanib, Markaziy Osiyo orqali Yevropagacha borgan ulkan savdo yo'lidir.
Bu yo'ldan nafaqat ipak, chinni va ziravorlar, balki bilim, madaniyat va ixtirolar ham tarqalgan.

### O'zbekistonning gavharlari:
- **Samarqand**: "Sharq gavhari", Registon maydoni bilan dunyoga mashhur.
- **Buxoro**: "Qubbat ul-islom", qadimiy minoralar va madrasalar maskani.
- **Xiva**: Ochiq osmon ostidagi muzey — Ichan Qal'a.

Karvonlar cho'llardan tuyalar karvonida oylar davomida sayohat qilib, qadimiy yurtimiz bozorlarida savdo qilishgan.
`,
    test: [
      {
        id: 't_5_2_1',
        question: "Buyuk Ipak Yo'li orqali qaysi qit'alar bog'langan?",
        options: ["Osiyo va Yevropa", "Amerika va Afrika", "Avstraliya va Osiyo", "Faqat Afrika"],
        correctIndex: 0,
        explanation: "Bu yo'l Sharqiy Osiyoni Markaziy Osiyo orqali Yevropa bilan bog'lagan."
      },
      {
        id: 't_5_2_2',
        question: "Ochiq osmon ostidagi muzey-shahar qaysi?",
        options: ["Toshkent", "Xiva (Ichan Qal'a)", "Jizzax", "Namangan"],
        correctIndex: 1,
        explanation: "Xivadagi Ichan Qal'a ochiq osmon ostidagi tarixiy muzey hisoblanadi."
      },
      {
        id: 't_5_2_3',
        question: "Buyuk Ipak Yo'lida asosiy transport vositasi nima bo'lgan?",
        options: ["Poyezd", "Tuya karvonlari", "Avtomobil", "Kema"],
        correctIndex: 1,
        explanation: "Cho'l va tog'lardan o'tishda tuyalar eng ishonchli vosita bo'lgan."
      }
    ]
  },

  // 6-sinf
  {
    id: 'l_6_1',
    grade: 6,
    subject: 'Matematika',
    title: "Manfiy va musbat sonlar ustida amallar",
    description: "Sonlar o'qi, manfiy sonlar bilan qo'shish va ayirish.",
    coinsReward: 40,
    estimatedMinutes: 20,
    content: `
# Manfiy sonlar nima? ❄️🌡️

Qishda termometrga qarasangiz: -5°C yoki -10°C ni ko'rasiz.
Noldan kichik sonlar **manfiy sonlar** deb ataladi. Ular oldiga minus (-) belgisi qo'yiladi.

### Sonlar o'qida:
... -3, -2, -1, **0**, +1, +2, +3 ...
Noldan o'ngda musbat sonlar, chapda manfiy sonlar joylashgan.

### Asosiy qoidalar:
- **(-3) + (-5) = -8** (Ikkala manfiy son qo'shilsa natija yanada manfiy bo'ladi).
- **5 + (-3) = 5 - 3 = 2**
- **(-4) × (-2) = +8** (Minusni minusga ko'paytirsak musbat bo'ladi!).
`,
    test: [
      {
        id: 't_6_1_1',
        question: "(-7) + (-3) amali necha bo'ladi?",
        options: ["-4", "-10", "+10", "+4"],
        correctIndex: 1,
        explanation: "(-7) + (-3) = -10."
      },
      {
        id: 't_6_1_2',
        question: "(-5) × 3 amali natijasi nechiga teng?",
        options: ["-15", "+15", "-8", "+8"],
        correctIndex: 0,
        explanation: "Manfiy sonni musbat songa ko'paytirganda manfiy hosil bo'ladi: -15."
      },
      {
        id: 't_6_1_3',
        question: "Sonlar o'qida 0 dan chapda qanday sonlar joylashgan?",
        options: ["Musbat", "Manfiy", "Faqat juft", "Faqat toq"],
        correctIndex: 1,
        explanation: "0 ning chap tomonida manfiy sonlar joylashgan."
      }
    ]
  },
  {
    id: 'l_6_2',
    grade: 6,
    subject: 'Informatika',
    title: "Kompyuter tuzilishi va axborot xavfsizligi",
    description: "Protsessor, xotira, kiritish-chiqarish qurilmalari va parollar.",
    coinsReward: 40,
    estimatedMinutes: 18,
    content: `
# Zamonaviy kompyuter va xavfsiz internet 💻🔒

Kompyuter insoniyatning eng buyuk yordamchilaridan biridir.

### Kompyuterning asosiy qismlari:
1. **Protsessor (CPU)**: Kompyuterning "miyasi". Barcha hisob-kitoblar shu yerda bajariladi.
2. **Tezkor xotira (RAM)**: Hozir ochilgan dasturlar vaqtinchalik saqlanadigan joy.
3. **Doimiy xotira (SSD/HDD)**: Rasm, o'yin va darslaringiz uzoq muddat saqlanadigan ombor.

### Axborot xavfsizligi qoidalari:
- Parolingizni hech kimga aytmang!
- Kuchli parol: Katta-kichik harflar, sonlar va maxsus belgilar (masalan: *Zukko_2026!*).
- Notanish havolalarni ochmang.
`,
    test: [
      {
        id: 't_6_2_1',
        question: "Kompyuterning 'miyasi' deb qaysi qurilma ataladi?",
        options: ["Monitor", "Protsessor (CPU)", "Klaviatura", "Sichqoncha"],
        correctIndex: 1,
        explanation: "CPU barcha hisoblash amallarini boshqaradi."
      },
      {
        id: 't_6_2_2',
        question: "Quyidagilardan qaysi biri kiritish qurilmasi?",
        options: ["Monitor", "Printer", "Klaviatura", "Kalonka"],
        correctIndex: 2,
        explanation: "Klaviatura orqali matn va buyruqlar kiritiladi."
      },
      {
        id: 't_6_2_3',
        question: "Xavfsiz parolda nimalar bo'lishi kerak?",
        options: ["Faqat 12345", "Katta-kichik harflar, sonlar va belgilar", "Faqat ismingiz", "Tug'ilgan kuningiz"],
        correctIndex: 1,
        explanation: "Murakkab tarkibli parollarni buzish juda qiyin bo'ladi."
      }
    ]
  },

  // 7-sinf
  {
    id: 'l_7_1',
    grade: 7,
    subject: 'Fizika',
    title: "Harakat, tezlik va vaqt formulasi",
    description: "Mexanik harakat, tezlik birligi va v = s / t formulasi.",
    coinsReward: 45,
    estimatedMinutes: 20,
    content: `
# Jism qanday harakatlanadi? 🚗⚡

Tabiatdagi barcha jismlar doim harakatda. Jismning boshqa jismlarga nisbatan o'z vaziyatini o'zgartirishi **mexanik harakat** deyiladi.

### Asosiy formula:
**v = s / t**
- **v** — Tezlik (m/s yoki km/soat)
- **s** — Bosib o'tilgan masofa (metr yoki kilometr)
- **t** — Ketgan vaqt (soniya yoki soat)

*Masala:* Avtomobil 2 soatda 140 km yo'l bosib o'tdi. Uning tezligini toping:
**v = 140 / 2 = 70 km/soat!**
`,
    test: [
      {
        id: 't_7_1_1',
        question: "Tezlikni topish formulasi qaysi?",
        options: ["v = s × t", "v = s / t", "v = t / s", "v = s + t"],
        correctIndex: 1,
        explanation: "Tezlik masofani vaqtga bo'lish orqali topiladi: v = s / t."
      },
      {
        id: 't_7_1_2',
        question: "Piyoda 15 metr masofani 5 soniyada bosib o'tsa, tezligi qancha?",
        options: ["3 m/s", "5 m/s", "75 m/s", "10 m/s"],
        correctIndex: 0,
        explanation: "v = 15 / 5 = 3 m/s."
      },
      {
        id: 't_7_1_3',
        question: "Xalqaro birliklar sistemasida (SI) vaqt birligi nima?",
        options: ["Soat", "Daqiqa", "Soniya (sekund)", "Kun"],
        correctIndex: 2,
        explanation: "SI sistemasida asosiy vaqt birligi soniyadir."
      }
    ]
  },
  {
    id: 'l_7_2',
    grade: 7,
    subject: 'Ingliz tili',
    title: "Present Simple & Daily Routines",
    description: "Kundalik odatlar va fe'llarning tuslanish qoidalari.",
    coinsReward: 45,
    estimatedMinutes: 20,
    content: `
# Master the Present Simple Tense! ⏰

Biz har kuni qiladigan doimiy ish-harakatlarimizni **Present Simple** da ifodalaymiz.

### Qoida:
- **I / You / We / They** + Verb (fe'l o'zgarmaydi)
  * *I wake up at 7 o'clock.*
  * *They read books every day.*
- **He / She / It** + Verb + **-s / -es**
  * *He plays football.*
  * *She goes to school.*

Inkor shaklida: **don't** yoki **doesn't** ishlatiladi:
* *I don't eat fast food.*
* *He doesn't watch TV late.*
`,
    test: [
      {
        id: 't_7_2_1',
        question: "'She ___ (like) ice cream' gapidagi to'g'ri fe'l shaklini toping:",
        options: ["like", "likes", "liking", "liked"],
        correctIndex: 1,
        explanation: "Uchinchi shaxs birlikda (She) fe'lga -s qo'shiladi: likes."
      },
      {
        id: 't_7_2_2',
        question: "'They ___ speak Spanish' gapidagi to'g'ri inkor so'z qaysi?",
        options: ["doesn't", "don't", "not", "isn't"],
        correctIndex: 1,
        explanation: "They olmoshi bilan 'don't' ishlatiladi."
      },
      {
        id: 't_7_2_3',
        question: "'Har kuni' ingliz tilida qanday ifodalanadi?",
        options: ["Yesterday", "Every day", "Tomorrow", "Sometimes"],
        correctIndex: 1,
        explanation: "Every day — har kuni degani."
      }
    ]
  },

  // 8-sinf
  {
    id: 'l_8_1',
    grade: 8,
    subject: 'Geometriya',
    title: "Pifagor teoremasi va uning qo'llanilishi",
    description: "To'g'ri burchakli uchburchak tomonlari orasidagi a² + b² = c² munosabati.",
    coinsReward: 50,
    estimatedMinutes: 22,
    content: `
# Geometriyaning shoh teoremasi: Pifagor! 📐

Pifagor teoremasi faqat **to'g'ri burchakli uchburchak** (bitta burchagi 90°) uchun o'rinlidir.

### Teorema ta'rifi:
Katetlar kvadratlarining yig'indisi gipotenuzaning kvadratiga tengdir:
**a² + b² = c²**

Bu yerda:
- **a va b** — To'g'ri burchakni hosil qiluvchi katetlar.
- **c** — To'g'ri burchak qarshisidagi eng uzun tomon — gipotenuza.

*Klassik Misol (Misr uchburchagi):*
a = 3, b = 4 bo'lsa:
3² + 4² = 9 + 16 = 25.
c² = 25 bo'lsa, **c = 5**!
`,
    test: [
      {
        id: 't_8_1_1',
        question: "Katetlari 6 va 8 bo'lgan to'g'ri burchakli uchburchak gipotenuzasi nechaga teng?",
        options: ["9", "10", "12", "14"],
        correctIndex: 1,
        explanation: "6² + 8² = 36 + 64 = 100. √100 = 10."
      },
      {
        id: 't_8_1_2',
        question: "Pifagor teoremasi qaysi uchburchak uchun amal qiladi?",
        options: ["Teng tomonli", "O'tkir burchakli", "To'g'ri burchakli", "Har qanday"],
        correctIndex: 2,
        explanation: "Faqat to'g'ri burchakli (90° li) uchburchaklar uchun."
      },
      {
        id: 't_8_1_3',
        question: "Uchburchakning to'g'ri burchagi qarshisidagi tomon nima deb ataladi?",
        options: ["Katet", "Gipotenuza", "Bissektrisa", "Mediana"],
        correctIndex: 1,
        explanation: "To'g'ri burchak qarshisidagi eng uzun tomon gipotenuzadir."
      }
    ]
  },
  {
    id: 'l_8_2',
    grade: 8,
    subject: 'Kimyo',
    title: "Atom tuzilishi va Mendeleyev davriy jadvali",
    description: "Protonlar, neytronlar, elektronlar va kimyoviy elementlar.",
    coinsReward: 50,
    estimatedMinutes: 20,
    content: `
# Moddalar nimalardan tashkil topgan? 🧪⚛️

Koinotdagi barcha jonsiz va jonli narsalar mikroskopik zarrachalar — **atomlar**dan iborat.

### Atomning tuzilishi:
1. **Yadro**: Atom markazida joylashgan bo'lib, **protonlar (+)** va **neytronlar (0)** dan tashkil topgan.
2. **Elektron qobig'i**: Yadro atrofida juda katta tezlikda aylanib yuruvchi **elektronlar (-)**.

### Mendeleyev jadvali:
D.I. Mendeleyev elementlarni ularning atom massasi va xossalariga qarab davriy tartibga solgan.
- **H** (Vodorod) — Eng yengil element (tartib raqami 1).
- **O** (Kislorod) — Nafas olishimiz uchun zarur gaz.
- **Au** (Oltin) — Qimmatbaho olijanob metall.
`,
    test: [
      {
        id: 't_8_2_1',
        question: "Atom yadrosi qanday zarrachalardan iborat?",
        options: ["Faqat elektronlar", "Proton va neytronlar", "Faqat neytronlar", "Elektron va protonlar"],
        correctIndex: 1,
        explanation: "Yadroda musbat zaryadli protonlar va zaryadsiz neytronlar joylashadi."
      },
      {
        id: 't_8_2_2',
        question: "Mendeleyev jadvalida 1-raqamli element qaysi?",
        options: ["Geliy (He)", "Vodorod (H)", "Kislorod (O)", "Uglerod (C)"],
        correctIndex: 1,
        explanation: "Vodorod (H) eng yengil va 1-element hisoblanadi."
      },
      {
        id: 't_8_2_3',
        question: "Elektron qanday zaryadga ega?",
        options: ["Musbat (+)", "Manfiy (-)", "Zaryadsiz (0)", "O'zgaruvchan"],
        correctIndex: 1,
        explanation: "Elektronlar manfiy (-) zaryadga egadir."
      }
    ]
  },

  // 9-sinf
  {
    id: 'l_9_1',
    grade: 9,
    subject: 'Biologiya',
    title: "Hujayra tuzilishi va irsiyat (DNK)",
    description: "Tiriklikning boshlang'ich birligi va genetik axborot uzatilishi.",
    coinsReward: 55,
    estimatedMinutes: 22,
    content: `
# Tiriklikning mikroskopik mo'jizasi: Hujayra 🔬🧬

Barcha tirik organizmlar bitta yoki trillionlab hujayralardan tashkil topgan.

### Hujayraning asosiy organoidlari:
- **Plazmatik membrana**: Hujayrani tashqi muhitdan himoya qiladi va moddalar almashinuvini ta'minlaydi.
- **Sitoplazma**: Organoidlar suzib yuradigan ichki suyuqlik muhiti.
- **Yadro**: Hujayraning genetik boshqaruv markazi. Unda **DNK (Dezoksiribonuklein kislota)** saqlanadi.
- **Mitoxondriya**: Hujayraning energiya stansiyasi (ATF ishlab chiqaradi).

DNK spiral shaklida bo'lib, ota-onadan farzandga o'tuvchi barcha irsiy belgilarni (ko'z rangi, bo'y, soch turi) kodlab saqlaydi!
`,
    test: [
      {
        id: 't_9_1_1',
        question: "Hujayraning 'energiya stansiyasi' deb qaysi organoid ataladi?",
        options: ["Yadro", "Mitoxondriya", "Ribosoma", "Vakuola"],
        correctIndex: 1,
        explanation: "Mitoxondriyalar hujayra uchun energiya (ATF) ishlab chiqaradi."
      },
      {
        id: 't_9_1_2',
        question: "Genetik ma'lumot qayerda saqlanadi?",
        options: ["Sitoplazmada", "Membranada", "DNK molekulasida (yadroda)", "Lizosomada"],
        correctIndex: 2,
        explanation: "Irsiy axborot DNK spirallarida genlar ko'rinishida saqlanadi."
      },
      {
        id: 't_9_1_3',
        question: "O'simlik hujayrasini hayvon hujayrasidan ajratib turuvchi xususiyat nima?",
        options: ["Yadroning yo'qligi", "Xloroplast va hujayra devori borligi", "DNK bo'lmasligi", "Mitoxondriya yo'qligi"],
        correctIndex: 1,
        explanation: "O'simliklarda fotosintez uchun xloroplastlar va qattiq tsellyuloza devori bo'ladi."
      }
    ]
  },
  {
    id: 'l_9_2',
    grade: 9,
    subject: 'Informatika',
    title: "Algoritmlar va Python dasturlash tili",
    description: "Chiziqli, tarmoqlanuvchi va takrorlanuvchi algoritmlar hamda kod yozish.",
    coinsReward: 55,
    estimatedMinutes: 25,
    content: `
# Dasturlashga xush kelibsiz! 🐍💻

**Algoritm** — maqsadga erishish uchun bajarilishi lozim bo'lgan aniq va ketma-ket buyruqlar to'plami.

### Python tilining mashhurligi:
Python — o'rganish juda oson, ingliz tiliga yaqin va sun'iy intellektda eng ko'p qo'llaniladigan dasturlash tilidir.

\`\`\`python
# Birinchi Python dasturi
ism = "Bilimdon"
yosh = 15
print("Salom, " + ism)

if yosh >= 15:
    print("Siz katta sinf o'quvchisisiz!")
\`\`\`

### Asosiy ma'lumot turlari:
- \`int\` — butun sonlar (5, 42)
- \`float\` — o'nli kasrlar (3.14)
- \`str\` — qator/matn ("ZukkoMaktab")
- \`bool\` — mantiqiy qiymat (True yoki False)
`,
    test: [
      {
        id: 't_9_2_1',
        question: "Pythonda ekranga xabar chiqarish funksiyasi qaysi?",
        options: ["echo()", "console.log()", "print()", "write()"],
        correctIndex: 2,
        explanation: "Pythonda print() yordamida natija konsolga chiqariladi."
      },
      {
        id: 't_9_2_2',
        question: "Pythonda 10 // 3 amali natijasi nechaga teng bo'ladi?",
        options: ["3.333", "3", "1", "30"],
        correctIndex: 1,
        explanation: "// operatori butun qismni oladi, 10 // 3 = 3."
      },
      {
        id: 't_9_2_3',
        question: "Quyidagilardan qaysi biri tarmoqlanuvchi operator?",
        options: ["for", "while", "if - else", "def"],
        correctIndex: 2,
        explanation: "if-else shartga qarab dastur yo'nalishini tarmoqlaydi."
      }
    ]
  },

  // 10-sinf
  {
    id: 'l_10_1',
    grade: 10,
    subject: 'Fizika',
    title: "Nyutonning dinamika qonunlari",
    description: "Inersiya, F = m·a formulasi va ta'sir hamda aks-ta'sir qonuni.",
    coinsReward: 60,
    estimatedMinutes: 24,
    content: `
# Klassik mexanika poydevori: Isaak Nyuton 🍎

Ser Isaak Nyuton jismlarning harakatini tushuntirib beruvchi 3 ta fundamental qonunni kashf etgan:

1. **Nyutonning 1-qonuni (Inersiya qonuni)**:
   Agar jismga boshqa kuchlar ta'sir qilmasa yoki kuchlar muvozanatlashgan bo'lsa, jism o'zining tinch holatini yoki to'g'ri chiziqli tekis harakatini saqlaydi.

2. **Nyutonning 2-qonuni**:
   Jismning tezlanishi unga ta'sir qiluvchi kuchga to'g'ri mutanosib, massasiga teskari mutanosibdir:
   **F = m · a**
   (F — kuch [Nyuton], m — massa [kg], a — tezlanish [m/s²])

3. **Nyutonning 3-qonuni**:
   Har qanday ta'sirga unga miqdor jihatdan teng va yo'nalish bo'yicha qarama-qarshi aks-ta'sir mavjud:
   **F₁ = - F₂**
`,
    test: [
      {
        id: 't_10_1_1',
        question: "Massasi 5 kg bo'lgan jismga 2 m/s² tezlanish berish uchun qancha kuch kerak?",
        options: ["2.5 N", "10 N", "7 N", "0.4 N"],
        correctIndex: 1,
        explanation: "F = m · a = 5 · 2 = 10 N."
      },
      {
        id: 't_10_1_2',
        question: "Nyutonning 3-qonuni qanday nomlanadi?",
        options: ["Inersiya qonuni", "Ta'sir va aks-ta'sir qonuni", "Butunjahon tortishish qonuni", "Energiyaning saqlanish qonuni"],
        correctIndex: 1,
        explanation: "Har qanday ta'sir kuchi teng va qarama-qarshi aks-ta'sir kuchini keltirib chiqaradi."
      },
      {
        id: 't_10_1_3',
        question: "Kuchning Xalqaro birliklar sistemasidagi (SI) birligi nima?",
        options: ["Joul (J)", "Vatt (W)", "Nyuton (N)", "Paskal (Pa)"],
        correctIndex: 2,
        explanation: "Kuch Nyuton (N) larda o'lchanadi."
      }
    ]
  },
  {
    id: 'l_10_2',
    grade: 10,
    subject: 'Tarix',
    title: "Sharq Uyg'onish davri va Buyuk Allomalar",
    description: "Al-Xorazmiy, Abu Ali ibn Sino, Abu Rayhon Beruniy va Ulug'bek merosi.",
    coinsReward: 60,
    estimatedMinutes: 25,
    content: `
# Oltin Asr: Dunyo ilm-fanini o'zgartirgan bobokalonlarimiz 📜⭐

IX-XII va XIV-XV asrlarda Markaziy Osiyo hududida dunyo sivilizatsiyasini asrlar oldinga siljitgan buyuk ilmiy uyg'onish yuz berdi.

### Dunyoga dong'i ketgan allomalar:
- **Muhammad al-Xorazmiy**:
  Algebra faniga asos solgan ("Al-jabr" asari). Zamonaviy "Algoritm" so'zi aynan uning nomidan kelib chiqqan!
- **Abu Rayhon Beruniy**:
  Kolumbdan 500 yil oldin Amerika qit'asi mavjudligini ilmiy bashorat qilgan, Yer radiusini mislsiz aniqlikda o'lchagan.
- **Abu Ali ibn Sino (Avitsenna)**:
  "Tib qonunlari" kitobi 600 yildan ortiq vaqt davomida butun Yevropa universitetlarida asosiy tibbiyot darsligi bo'lgan.
- **Mirzo Ulug'bek**:
  Samarqandda ulkan rasadxona qurib, 1018 ta yulduzning aniq koordinatalarini ("Ziji jadidi Ko'ragoniy") tuzgan.
`,
    test: [
      {
        id: 't_10_2_1',
        question: "'Algoritm' so'zi qaysi buyuk allomaning nomidan kelib chiqqan?",
        options: ["Beruniy", "Al-Xorazmiy", "Ibn Sino", "Farobiy"],
        correctIndex: 1,
        explanation: "Muhammad ibn Muso al-Xorazmiy nomining lotincha talaffuzidan 'algoritm' atamasi paydo bo'lgan."
      },
      {
        id: 't_10_2_2',
        question: "Yevropada 'Avitsenna' nomi bilan tanilgan tibbiyot dahosi kim?",
        options: ["Abu Ali ibn Sino", "Ulug'bek", "Al-Buxoriy", "Navoiy"],
        correctIndex: 0,
        explanation: "Abu Ali ibn Sino butun dunyoda tibbiyot otasi sifatida Avitsenna nomi bilan ulug'lanadi."
      },
      {
        id: 't_10_2_3',
        question: "Samarqandda yulduzlar jadvalini yaratgan astronom olim va hukmdor kim?",
        options: ["Amir Temur", "Mirzo Ulug'bek", "Bobur", "Husayn Boyqaro"],
        correctIndex: 1,
        explanation: "Mirzo Ulug'bek 1018 ta yulduz koordinatalarini o'z rasadxonasida hisoblagan."
      }
    ]
  },

  // 11-sinf
  {
    id: 'l_11_1',
    grade: 11,
    subject: 'Matematika',
    title: "Funksiya hosilasi va uning amaliy ahamiyati",
    description: "Hosilaning geometrik va fizik ma'nosi, ekstremum nuqtalarini topish.",
    coinsReward: 70,
    estimatedMinutes: 28,
    content: `
# Matematik analiz cho'qqisi: Hosila (Derivative) 📈

Funksiya hosilasi — bu funksiya qiymatining argument o'zgarishiga nisbatan o'zgarish tezligidir.

### Hosilaning ta'rifi:
**f'(x) = lim (Δx → 0) [f(x + Δx) - f(x)] / Δx**

### Asosiy hosila formulalari:
- **(C)' = 0** (O'zgarmas sonning hosilasi 0 ga teng)
- **(xⁿ)' = n · xⁿ⁻¹** (Daraja qoidasi: masalan, (x³)' = 3x²)
- **(sin x)' = cos x**
- **(eˣ)' = eˣ**

### Hosilaning fizik ma'nosi:
Masofa funksiyasining vaqt bo'yicha birinchi tartibli hosilasi — **oniy tezlik**ni beradi: **v(t) = s'(t)**.
Tezlikning hosilasi esa **tezlanish**ni beradi: **a(t) = v'(t) = s''(t)**.
`,
    test: [
      {
        id: 't_11_1_1',
        question: "f(x) = x⁴ funksiyasining hosilasi nimaga teng?",
        options: ["4x³", "3x⁴", "x³", "4x"],
        correctIndex: 0,
        explanation: "(xⁿ)' = n · xⁿ⁻¹ qoidasiga ko'ra (x⁴)' = 4x³."
      },
      {
        id: 't_11_1_2',
        question: "Hosilaning fizik ma'nosi nima?",
        options: ["Gravitatsiya", "Oniy tezlik", "Hajm", "Zichlik"],
        correctIndex: 1,
        explanation: "Harakat tenglamasining hosilasi v(t) = s'(t) oniy tezlikni ifodalaydi."
      },
      {
        id: 't_11_1_3',
        question: "f(x) = 25 o'zgarmas sonining hosilasi necha bo'ladi?",
        options: ["25", "1", "0", "5"],
        correctIndex: 2,
        explanation: "Har qanday o'zgarmas sonning hosilasi doimo 0 ga teng."
      }
    ]
  },
  {
    id: 'l_11_2',
    grade: 11,
    subject: 'Ingliz tili',
    title: "Advanced Academic Essay & Critical Thinking",
    description: "Universitetga kirish insholari, CEFR/IELTS Writing bo'yicha tavsiyalar.",
    coinsReward: 70,
    estimatedMinutes: 26,
    content: `
# Crafting a Band 7+ Academic Essay ✍️🎓

11-sinf o'quvchilari uchun oliy o'quv yurtlari va xalqaro imtihonlarga tayyorgarlik hal qiluvchi bosqichdir.

### Academic Essay tuzilishi:
1. **Introduction (Kirish)**:
   - Hook (diqqatni tortuvchi umumiy fikr)
   - Background information (Mavzu tafsiloti)
   - Thesis statement (Inshoning asosiy g'oyasi)
2. **Body Paragraph 1 & 2 (Asosiy qism)**:
   - Topic Sentence (Paragraf asosiy fikri)
   - Explanation & Evidence (Isbotlar va tahlil)
   - Real-world example (Haqiqiy misol)
3. **Conclusion (Xulosa)**:
   - Restate thesis in different words (Paraphrasing)
   - Final takeaway thought (Kelajakka bo'lgan umumiy xulosa)

### Linking words (Bog'lovchi so'zlar):
- *Furthermore, Moreover* (Bundan tashqari)
- *However, Nevertheless* (Biroq, shunga qaramay)
- *Consequently, As a result* (Natijada)
`,
    test: [
      {
        id: 't_11_2_1',
        question: "Inshoning eng asosiy g'oyasi qaysi jumlada ifodalanadi?",
        options: ["Topic Sentence", "Thesis Statement", "Linking word", "Example"],
        correctIndex: 1,
        explanation: "Thesis statement inshoning poydevori bo'lib, muallif pozitsiyasini ko'rsatadi."
      },
      {
        id: 't_11_2_2',
        question: "Qaysi bog'lovchi so'z zid fikrlarni bog'lash uchun ishlatiladi?",
        options: ["Furthermore", "However", "In addition", "Therefore"],
        correctIndex: 1,
        explanation: "'However' zidlikni (lekin, biroq) bildirish uchun xizmat qiladi."
      },
      {
        id: 't_11_2_3',
        question: "Xulosa (Conclusion) qismida nima qilinmasligi kerak?",
        options: ["Asosiy g'oyani qayta ta'kidlash", "Yangi, ochilmagan fikrni kutilmaganda qo'shish", "Xulosa chiqarish", "Parafraz qilish"],
        correctIndex: 1,
        explanation: "Xulosada yangi mavzu boshlanmaydi, faqat mavjud dalillar yakunlanadi."
      }
    ]
  }
];

export const SEED_USERS: User[] = [
  {
    id: 'u_demo_1',
    fullName: "Madinabonu Karimova",
    grade: 3,
    username: "madina_zukko",
    passwordHash: "h_demo_hash_1",
    coins: 380,
    completedLessonIds: ['l_1_1', 'l_1_2', 'l_2_1', 'l_2_2', 'l_3_1', 'l_3_2'],
    lessonScores: { 'l_1_1': 100, 'l_1_2': 100, 'l_2_1': 100, 'l_2_2': 100, 'l_3_1': 100, 'l_3_2': 100 },
    inventory: {
      avatars: [OWL_AVATAR, '👦', '👧'],
      frames: ['border-4 border-amber-400 ring-4 ring-amber-200/80 shadow-lg shadow-amber-500/20'],
      themes: [],
      badges: ['📚 Zukko Kitobxon'],
    },
    activeAvatar: OWL_AVATAR,
    activeFrame: 'border-4 border-amber-400 ring-4 ring-amber-200/80 shadow-lg shadow-amber-500/20',
    activeTheme: '',
    activeBadge: '📚 Zukko Kitobxon',
    isBlocked: false,
    createdAt: '2026-11-01',
  },
  {
    id: 'u_demo_2',
    fullName: "Jasurbek Aliyev",
    grade: 5,
    username: "jasur_chempion",
    passwordHash: "h_demo_hash_2",
    coins: 450,
    completedLessonIds: ['l_3_1', 'l_4_1', 'l_4_2', 'l_5_1', 'l_5_2'],
    lessonScores: { 'l_3_1': 100, 'l_4_1': 100, 'l_4_2': 100, 'l_5_1': 100, 'l_5_2': 100 },
    inventory: {
      avatars: [ASTRONAUT_AVATAR, '👦'],
      frames: ['border-4 border-cyan-400 ring-4 ring-indigo-400/80 shadow-lg shadow-cyan-500/30'],
      themes: ['bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white'],
      badges: ['🏆 Oltin Chempion', '📐 Matematika Dahosi'],
    },
    activeAvatar: ASTRONAUT_AVATAR,
    activeFrame: 'border-4 border-cyan-400 ring-4 ring-indigo-400/80 shadow-lg shadow-cyan-500/30',
    activeTheme: 'bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white',
    activeBadge: '🏆 Oltin Chempion',
    isBlocked: false,
    createdAt: '2026-11-02',
  },
  {
    id: 'u_demo_3',
    fullName: "Sardor Rustamov",
    grade: 8,
    username: "sardor_8",
    passwordHash: "h_demo_hash_3",
    coins: 290,
    completedLessonIds: ['l_7_1', 'l_7_2', 'l_8_1'],
    lessonScores: { 'l_7_1': 100, 'l_7_2': 100, 'l_8_1': 100 },
    inventory: {
      avatars: [LION_AVATAR, '👦'],
      frames: [],
      themes: [],
      badges: ['⚡ Tezkor Fikrlovchi'],
    },
    activeAvatar: LION_AVATAR,
    activeFrame: '',
    activeTheme: '',
    activeBadge: '⚡ Tezkor Fikrlovchi',
    isBlocked: false,
    createdAt: '2026-11-04',
  },
];
