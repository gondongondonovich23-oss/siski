(function () {
  const products = [
    {
      id: "airpods-max",
      name: "AirPods Max",
      brand: "Apple",
      category: "Аудио",
      price: 62990,
      oldPrice: 69990,
      rating: 4.9,
      reviews: 128,
      badge: "Выбор редакции",
      tagline: "Тишина, которую слышно",
      popularity: 99,
      photos: [
        "images/products/airpods-max/1.jpg",
        "images/products/airpods-max/2.jpg",
        "images/products/airpods-max/3.jpg"
      ],
      description: "Накладные наушники с активным шумоподавлением, пространственным звуком и алюминиевыми чашками. Редкий случай, когда техника выглядит как мебель, а звучит как студия.",
      highlights: ["Активное шумоподавление", "Пространственный звук", "До 20 часов"],
      specs: [
        ["Тип", "Накладные, беспроводные"],
        ["Чип", "Apple H2"],
        ["Шумоподавление", "Активное, адаптивное"],
        ["Автономность", "До 20 часов"],
        ["Подключение", "Bluetooth 5.3"],
        ["Разъём", "USB-C"],
        ["Вес", "385 г"]
      ]
    },
    {
      id: "airpods-pro-3",
      name: "AirPods Pro 3",
      brand: "Apple",
      category: "Аудио",
      price: 24990,
      oldPrice: null,
      rating: 4.8,
      reviews: 214,
      badge: "Хит",
      tagline: "Маленькие. Умные. Точные.",
      popularity: 97,
      photos: [
        "images/products/airpods-pro-3/1.jpg",
        "images/products/airpods-pro-3/2.jpg",
        "images/products/airpods-pro-3/3.jpg"
      ],
      description: "Компактные TWS-наушники с адаптивным шумоподавлением и прозрачным режимом. Держатся уверенно, заряжаются в кейсе и звучат на удивление взросло.",
      highlights: ["Адаптивный ANC", "До 30 ч с кейсом", "Защита IP54"],
      specs: [
        ["Тип", "TWS, внутриканальные"],
        ["Чип", "Apple H3"],
        ["Шумоподавление", "Адаптивное ANC"],
        ["Автономность", "До 8 ч, до 30 ч с кейсом"],
        ["Защита", "IP54"],
        ["Зарядка", "USB-C, MagSafe"],
        ["Вес кейса", "44 г"]
      ]
    },
    {
      id: "iphone-18-pro-max",
      name: "iPhone 18 Pro Max",
      brand: "Apple",
      category: "Смартфоны",
      price: 129990,
      oldPrice: 139990,
      rating: 4.9,
      reviews: 86,
      badge: "Новинка",
      tagline: "Максимум во всём",
      popularity: 98,
      photos: [
        "images/products/iphone-18-pro-max/1.jpg",
        "images/products/iphone-18-pro-max/2.jpg",
        "images/products/iphone-18-pro-max/3.jpg"
      ],
      description: "Флагман с титановым корпусом, дисплеем ProMotion и камерой, которая снимает почти в темноте. Для тех, кто хочет максимум и не готов идти на компромиссы.",
      highlights: ["Титан", "ProMotion 120 Гц", "Камера 48 Мп"],
      specs: [
        ["Экран", "6.9″ OLED, 120 Гц"],
        ["Чип", "A20 Pro"],
        ["Камера", "48 + 48 + 12 Мп"],
        ["Память", "256 ГБ"],
        ["Материал", "Титан"],
        ["Автономность", "До 33 часов видео"],
        ["Разъём", "USB-C"],
        ["Вес", "221 г"]
      ]
    },
    {
      id: "nova-x-pro",
      name: "Nova X Pro",
      brand: "Nova",
      category: "Смартфоны",
      price: 54990,
      oldPrice: 59990,
      rating: 4.7,
      reviews: 64,
      badge: "Выгодно",
      tagline: "Флагман без переплаты",
      popularity: 86,
      photos: [
        "images/products/nova-x-pro/1.jpg",
        "images/products/nova-x-pro/2.jpg",
        "images/products/nova-x-pro/3.jpg"
      ],
      art: { type: "phone", bg: "#d9ff57", ink: "#111110", accent: "#ff5a2b" },
      description: "Смартфон с ярким AMOLED-экраном, быстрой зарядкой и камерой с оптической стабилизацией. Уверенный выбор без переплаты за логотип.",
      highlights: ["AMOLED 120 Гц", "Зарядка 67 Вт", "5000 мА·ч"],
      specs: [
        ["Экран", "6.7″ AMOLED, 120 Гц"],
        ["Чип", "Snapdragon 8 Gen 3"],
        ["Камера", "50 + 12 + 8 Мп"],
        ["Память", "12 + 256 ГБ"],
        ["Батарея", "5000 мА·ч"],
        ["Зарядка", "67 Вт"],
        ["Вес", "198 г"]
      ]
    },
    {
      id: "iphone-15-pro",
      name: "iPhone 15 Pro",
      brand: "Apple",
      category: "Смартфоны",
      price: 89990,
      oldPrice: 99990,
      rating: 4.8,
      reviews: 152,
      badge: "−10%",
      tagline: "Титан. Чип. Камера.",
      popularity: 91,
      photos: [
        "images/products/iphone-15-pro/1.jpg",
        "images/products/iphone-15-pro/2.jpg",
        "images/products/iphone-15-pro/3.jpg"
      ],
      art: { type: "phone", bg: "#b9d9ff", ink: "#111110", accent: "#ff5a2b" },
      description: "Компактный флагман с титановым корпусом, чипом A17 Pro и кнопкой действия. Всё ещё один из самых сбалансированных смартфонов на рынке.",
      highlights: ["Чип A17 Pro", "Титан", "USB-C"],
      specs: [
        ["Экран", "6.1″ OLED, 120 Гц"],
        ["Чип", "A17 Pro"],
        ["Камера", "48 + 12 + 12 Мп"],
        ["Память", "128 ГБ"],
        ["Материал", "Титан"],
        ["Разъём", "USB-C"],
        ["Вес", "187 г"]
      ]
    },
    {
      id: "iphone-14",
      name: "iPhone 14",
      brand: "Apple",
      category: "Смартфоны",
      price: 59990,
      oldPrice: null,
      rating: 4.6,
      reviews: 203,
      badge: null,
      tagline: "Проверенная классика",
      popularity: 78,
      photos: [
        "images/products/iphone-14/1.jpg",
        "images/products/iphone-14/2.jpg",
        "images/products/iphone-14/3.jpg"
      ],
      art: { type: "phone", bg: "#d6ccff", ink: "#111110", accent: "#ff5a2b" },
      description: "Надёжный iPhone с качественным OLED-дисплеем, стабильной автономностью и отличной поддержкой обновлений. Разумный выбор на каждый день.",
      highlights: ["A15 Bionic", "Двойная камера", "Компактный"],
      specs: [
        ["Экран", "6.1″ OLED"],
        ["Чип", "A15 Bionic"],
        ["Камера", "12 + 12 Мп"],
        ["Память", "128 ГБ"],
        ["Разъём", "Lightning"],
        ["Автономность", "До 20 часов видео"],
        ["Вес", "172 г"]
      ]
    },
    {
      id: "atlas-book-15",
      name: "Atlas Book 15",
      brand: "Atlas",
      category: "Ноутбуки",
      price: 119990,
      oldPrice: 129990,
      rating: 4.8,
      reviews: 47,
      badge: "Для работы",
      tagline: "Ноутбук для больших задач",
      popularity: 92,
      photos: [
        "images/products/atlas-book-15/1.jpg",
        "images/products/atlas-book-15/2.jpg",
        "images/products/atlas-book-15/3.jpg"
      ],
      art: { type: "laptop", bg: "#ffcdb3", ink: "#111110", accent: "#ff5a2b" },
      description: "Тонкий и производительный ноутбук для монтажа, 3D и многозадачности. Экран 2.8K на 120 Гц и видеокарта RTX 4070 в корпусе весом 1.8 кг.",
      highlights: ["2.8K 120 Гц", "RTX 4070", "32 ГБ RAM"],
      specs: [
        ["Экран", "15.6″ IPS, 2.8K, 120 Гц"],
        ["Процессор", "Intel Core Ultra 9"],
        ["Память", "32 ГБ RAM / 1 ТБ SSD"],
        ["Графика", "NVIDIA RTX 4070"],
        ["Автономность", "До 12 часов"],
        ["Разъёмы", "2×USB-C, 2×USB-A, HDMI"],
        ["Вес", "1.8 кг"]
      ]
    },
    {
      id: "atlas-book-air-13",
      name: "Atlas Book Air 13",
      brand: "Atlas",
      category: "Ноутбуки",
      price: 94990,
      oldPrice: null,
      rating: 4.6,
      reviews: 38,
      badge: "Лёгкий",
      tagline: "Легко носить, приятно работать",
      popularity: 80,
      photos: [
        "images/products/atlas-book-air-13/1.jpg",
        "images/products/atlas-book-air-13/2.jpg",
        "images/products/atlas-book-air-13/3.jpg"
      ],
      art: { type: "laptop", bg: "#d9ff57", ink: "#111110", accent: "#2c4bff" },
      description: "Ноутбук для тех, кто живёт между встречами. Весит 1.1 кг, работает до 16 часов и не шумит под нагрузкой. Идеален для текста, кода и таблиц.",
      highlights: ["Вес 1.1 кг", "До 16 часов", "Экран 2.5K"],
      specs: [
        ["Экран", "13.3″ IPS, 2.5K"],
        ["Процессор", "Intel Core Ultra 7"],
        ["Память", "16 ГБ RAM / 512 ГБ SSD"],
        ["Графика", "Intel Arc"],
        ["Автономность", "До 16 часов"],
        ["Разъёмы", "2×USB-C, USB-A, HDMI"],
        ["Вес", "1.1 кг"]
      ]
    },
    {
      id: "pulse-air",
      name: "Pulse Air",
      brand: "Pulse",
      category: "Аудио",
      price: 12990,
      oldPrice: null,
      rating: 4.5,
      reviews: 176,
      badge: "Хит",
      tagline: "Звук без проводов и шума",
      popularity: 88,
      photos: [
        "images/products/pulse-air/1.jpg",
        "images/products/pulse-air/2.jpg",
        "images/products/pulse-air/3.jpg"
      ],
      art: { type: "earbuds", bg: "#ffe083", ink: "#111110", accent: "#ff5a2b" },
      description: "Беспроводные наушники с активным шумоподавлением, чистым звуком и удобной посадкой. До 30 часов работы с кейсом и защита от брызг.",
      highlights: ["ANC", "Bluetooth 5.3", "Защита IPX4"],
      specs: [
        ["Тип", "TWS, внутриканальные"],
        ["Шумоподавление", "Активное"],
        ["Автономность", "До 8 ч, до 30 ч с кейсом"],
        ["Bluetooth", "5.3"],
        ["Защита", "IPX4"],
        ["Зарядка", "USB-C"]
      ]
    },
    {
      id: "pulse-studio",
      name: "Pulse Studio",
      brand: "Pulse",
      category: "Аудио",
      price: 34990,
      oldPrice: 38990,
      rating: 4.7,
      reviews: 59,
      badge: "−10%",
      tagline: "Студия у вас дома",
      popularity: 82,
      photos: [
        "images/products/pulse-studio/1.jpg",
        "images/products/pulse-studio/2.jpg",
        "images/products/pulse-studio/3.jpg"
      ],
      art: { type: "headphones", bg: "#d6ccff", ink: "#111110", accent: "#ff5a2b" },
      description: "Накладные наушники для работы и музыки. Мягкие амбушюры, честная середина и до 40 часов автономности — их не хочется снимать.",
      highlights: ["40 часов", "ANC", "USB-C + 3.5 мм"],
      specs: [
        ["Тип", "Накладные, беспроводные"],
        ["Шумоподавление", "Активное"],
        ["Автономность", "До 40 часов"],
        ["Bluetooth", "5.3"],
        ["Разъёмы", "USB-C, 3.5 мм"],
        ["Вес", "260 г"]
      ]
    },
    {
      id: "lunacy-k1",
      name: "Lunacy K1 Mechanical",
      brand: "Lunacy",
      category: "Клавиатуры",
      price: 14990,
      oldPrice: null,
      rating: 4.7,
      reviews: 91,
      badge: "Хит",
      tagline: "Механика, к которой возвращаются",
      popularity: 84,
      photos: [
        "images/products/lunacy-k1/1.jpg",
        "images/products/lunacy-k1/2.jpg",
        "images/products/lunacy-k1/3.jpg"
      ],
      art: { type: "keyboard", bg: "#b9d9ff", ink: "#111110", accent: "#ff5a2b" },
      description: "Механическая клавиатура формата TKL с тактильными переключателями и RGB-подсветкой. Алюминиевый корпус и hot-swap — можно менять свитчи без паяльника.",
      highlights: ["Hot-swap", "TKL", "Алюминий"],
      specs: [
        ["Формат", "TKL"],
        ["Переключатели", "Тактильные, hot-swap"],
        ["Подключение", "USB-C"],
        ["Подсветка", "RGB"],
        ["Материал", "Алюминий"],
        ["Вес", "890 г"]
      ]
    },
    {
      id: "lunacy-k5",
      name: "Lunacy K5 Pro",
      brand: "Lunacy",
      category: "Клавиатуры",
      price: 19990,
      oldPrice: null,
      rating: 4.9,
      reviews: 67,
      badge: "Pro",
      tagline: "Для тех, кто много печатает",
      popularity: 83,
      photos: [
        "images/products/lunacy-k5/1.jpg",
        "images/products/lunacy-k5/2.jpg",
        "images/products/lunacy-k5/3.jpg"
      ],
      art: { type: "keyboard", bg: "#d9ff57", ink: "#111110", accent: "#ff5a2b" },
      description: "Полноразмерная клавиатура с программируемыми клавишами, макросами и переключателями с линейным ходом. Для кода, текстов и игр без компромиссов.",
      highlights: ["Full-size", "Макросы", "2.4 ГГц"],
      specs: [
        ["Формат", "Full-size"],
        ["Переключатели", "Линейные, hot-swap"],
        ["Подключение", "USB-C / 2.4 ГГц"],
        ["Подсветка", "RGB"],
        ["Макросы", "Да, через ПО"],
        ["Вес", "1.1 кг"]
      ]
    },
    {
      id: "watch-ultra-2",
      name: "Apple Watch Ultra 2",
      brand: "Apple",
      category: "Часы",
      price: 74990,
      oldPrice: null,
      rating: 4.9,
      reviews: 73,
      badge: "Для спорта",
      tagline: "Создан для приключений",
      popularity: 90,
      photos: [
        "images/products/watch-ultra-2/1.jpg",
        "images/products/watch-ultra-2/2.jpg",
        "images/products/watch-ultra-2/3.jpg"
      ],
      art: { type: "watch", bg: "#111110", ink: "#f4f1e8", accent: "#ff5a2b" },
      description: "Прочные часы для спорта, походов и активного образа жизни. Титановый корпус, экран на 3000 нит и автономность до 72 часов в экономном режиме.",
      highlights: ["Титан", "3000 нит", "До 72 часов"],
      specs: [
        ["Корпус", "49 мм, титан"],
        ["Экран", "OLED, 3000 нит"],
        ["Чип", "S9 SiP"],
        ["Автономность", "До 36 ч, до 72 ч в экономном режиме"],
        ["Защита", "WR100, IP6X"],
        ["Связь", "LTE, GPS"],
        ["Вес", "61 г"]
      ]
    },
    {
      id: "watch-series-9",
      name: "Apple Watch Series 9",
      brand: "Apple",
      category: "Часы",
      price: 39990,
      oldPrice: 44990,
      rating: 4.8,
      reviews: 119,
      badge: "−11%",
      tagline: "Здоровье на запястье",
      popularity: 87,
      photos: [
        "images/products/watch-series-9/1.jpg",
        "images/products/watch-series-9/2.jpg",
        "images/products/watch-series-9/3.jpg"
      ],
      art: { type: "watch", bg: "#ffcdb3", ink: "#111110", accent: "#ff5a2b" },
      description: "Универсальные смарт-часы с удобным управлением жестами, датчиками здоровья и ярким экраном. Хороший способ начать следить за сном и активностью.",
      highlights: ["Double Tap", "2000 нит", "До 18 часов"],
      specs: [
        ["Корпус", "41 или 45 мм, алюминий"],
        ["Экран", "OLED, 2000 нит"],
        ["Чип", "S9 SiP"],
        ["Автономность", "До 18 часов"],
        ["Защита", "WR50"],
        ["Связь", "GPS"],
        ["Вес", "32 г"]
      ]
    },
    {
      id: "orbita-home-mini",
      name: "Orbita Home Mini",
      brand: "Orbita",
      category: "Умный дом",
      price: 8990,
      oldPrice: null,
      rating: 4.6,
      reviews: 54,
      badge: "Новинка",
      tagline: "Умный дом начинается здесь",
      popularity: 76,
      photos: [
        "images/products/orbita-home-mini/1.jpg",
        "images/products/orbita-home-mini/2.jpg",
        "images/products/orbita-home-mini/3.jpg"
      ],
      art: { type: "speaker", bg: "#b9d9ff", ink: "#111110", accent: "#d9ff57" },
      description: "Компактная умная колонка с чистым звуком на 360°, голосовым ассистентом и четырьмя микрофонами дальнего поля. Управляет светом, музыкой и климатом.",
      highlights: ["Звук 360°", "Orbita AI", "Wi-Fi 6"],
      specs: [
        ["Тип", "Умная колонка"],
        ["Звук", "360°, 20 Вт"],
        ["Ассистент", "Orbita AI"],
        ["Связь", "Wi-Fi 6, Bluetooth 5.2"],
        ["Микрофоны", "4, дальнее поле"],
        ["Питание", "USB-C"],
        ["Вес", "420 г"]
      ]
    },
    {
      id: "luce-smart-lamp",
      name: "Luce Smart Lamp",
      brand: "Luce",
      category: "Умный дом",
      price: 6490,
      oldPrice: null,
      rating: 4.5,
      reviews: 31,
      badge: "Для дома",
      tagline: "Свет под ваш ритм",
      popularity: 70,
      photos: [
        "images/products/luce-smart-lamp/1.jpg",
        "images/products/luce-smart-lamp/2.jpg",
        "images/products/luce-smart-lamp/3.jpg"
      ],
      art: { type: "lamp", bg: "#ffe083", ink: "#111110", accent: "#ff5a2b" },
      description: "Умная настольная лампа с тёплым и холодным светом, регулировкой яркости и поддержкой Matter. Меняет температуру света в течение дня — глаза говорят спасибо.",
      highlights: ["Matter", "800 лм", "2700–6500 K"],
      specs: [
        ["Тип", "Умная настольная лампа"],
        ["Свет", "2700–6500 K, 800 лм"],
        ["Управление", "Приложение, голос"],
        ["Связь", "Wi-Fi, Matter"],
        ["Материал", "Алюминий, пластик"],
        ["Высота", "42 см"]
      ]
    }
  ];

  const categories = ["Все", "Смартфоны", "Ноутбуки", "Аудио", "Клавиатуры", "Часы", "Умный дом"];

  const art = {
    phone: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="315" cy="70" r="39" fill="var(--art-accent)"/>
        <g transform="rotate(-8 200 150)">
          <rect x="151" y="18" width="98" height="264" rx="27" fill="var(--art-ink)"/>
          <rect x="158" y="25" width="84" height="250" rx="20" fill="var(--art-bg)"/>
          <rect x="190" y="31" width="20" height="6" rx="3" fill="var(--art-ink)"/>
          <rect x="158" y="47" width="84" height="206" fill="var(--art-accent)"/>
          <path d="M172 210c15-33 31-4 45-28s27-3 26 23" stroke="var(--art-bg)" stroke-width="3" stroke-linecap="round" opacity=".55"/>
          <circle cx="200" cy="266" r="4" fill="var(--art-ink)"/>
        </g>
        <path d="M84 207l13 13m0-13-13 13" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round"/>
        <circle cx="74" cy="98" r="9" stroke="var(--art-ink)" stroke-width="2"/>
      </svg>`,
    laptop: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="74" cy="84" r="29" fill="var(--art-accent)"/>
        <rect x="89" y="54" width="222" height="146" rx="10" fill="var(--art-ink)"/>
        <rect x="98" y="63" width="204" height="128" rx="4" fill="var(--art-bg)"/>
        <rect x="110" y="110" width="180" height="68" rx="3" fill="var(--art-accent)"/>
        <path d="M110 80h64M110 90h40" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round" opacity=".45"/>
        <path d="M68 200h264l-18 32H86l-18-32Z" fill="var(--art-ink)"/>
        <path d="M177 211h46" stroke="var(--art-bg)" stroke-width="5" stroke-linecap="round"/>
        <path d="M326 96l12 12m0-12-12 12" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    earbuds: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="79" cy="201" r="33" fill="var(--art-accent)"/>
        <g transform="rotate(-9 200 150)">
          <rect x="142" y="62" width="118" height="176" rx="36" fill="var(--art-ink)"/>
          <rect x="151" y="71" width="100" height="158" rx="28" fill="var(--art-bg)"/>
          <rect x="185" y="170" width="32" height="4" rx="2" fill="var(--art-ink)" opacity=".35"/>
          <circle cx="200" cy="90" r="3" fill="var(--art-ink)" opacity=".35"/>
        </g>
        <g transform="rotate(16 289 112)">
          <circle cx="289" cy="95" r="21" fill="var(--art-ink)"/>
          <rect x="281" y="104" width="16" height="59" rx="8" fill="var(--art-ink)"/>
          <circle cx="289" cy="95" r="8" fill="var(--art-accent)"/>
        </g>
        <g transform="rotate(-16 107 104)">
          <circle cx="107" cy="87" r="21" fill="var(--art-ink)"/>
          <rect x="99" y="96" width="16" height="59" rx="8" fill="var(--art-ink)"/>
          <circle cx="107" cy="87" r="8" fill="var(--art-accent)"/>
        </g>
      </svg>`,
    headphones: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="318" cy="70" r="34" fill="var(--art-accent)"/>
        <path d="M110 178v-36c0-50 40-90 90-90s90 40 90 90v36" stroke="var(--art-ink)" stroke-width="18" stroke-linecap="round"/>
        <path d="M110 178v-36c0-50 40-90 90-90s90 40 90 90v36" stroke="var(--art-bg)" stroke-width="5" stroke-linecap="round" opacity=".4"/>
        <rect x="85" y="163" width="59" height="104" rx="29" fill="var(--art-ink)"/>
        <rect x="256" y="163" width="59" height="104" rx="29" fill="var(--art-ink)"/>
        <rect x="96" y="175" width="37" height="80" rx="18" fill="var(--art-bg)"/>
        <rect x="267" y="175" width="37" height="80" rx="18" fill="var(--art-bg)"/>
        <path d="M95 235h38M267 235h38" stroke="var(--art-ink)" stroke-width="3" opacity=".28"/>
      </svg>`,
    keyboard: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="327" cy="85" r="30" fill="var(--art-accent)"/>
        <g transform="rotate(-5 200 160)">
          <rect x="57" y="91" width="286" height="138" rx="16" fill="var(--art-ink)"/>
          <g fill="var(--art-bg)">
            <rect x="74" y="108" width="26" height="16" rx="4"/><rect x="104" y="108" width="26" height="16" rx="4"/><rect x="134" y="108" width="26" height="16" rx="4"/><rect x="164" y="108" width="26" height="16" rx="4"/><rect x="194" y="108" width="26" height="16" rx="4"/><rect x="224" y="108" width="26" height="16" rx="4"/><rect x="254" y="108" width="26" height="16" rx="4"/><rect x="284" y="108" width="26" height="16" rx="4"/><rect x="314" y="108" width="26" height="16" rx="4"/>
            <rect x="74" y="130" width="26" height="16" rx="4"/><rect x="104" y="130" width="26" height="16" rx="4"/><rect x="134" y="130" width="26" height="16" rx="4"/><rect x="164" y="130" width="26" height="16" rx="4"/><rect x="194" y="130" width="26" height="16" rx="4"/><rect x="224" y="130" width="26" height="16" rx="4"/><rect x="254" y="130" width="26" height="16" rx="4"/><rect x="284" y="130" width="26" height="16" rx="4"/><rect x="314" y="130" width="26" height="16" rx="4"/>
            <rect x="74" y="152" width="26" height="16" rx="4"/><rect x="104" y="152" width="26" height="16" rx="4"/><rect x="134" y="152" width="26" height="16" rx="4"/><rect x="164" y="152" width="26" height="16" rx="4"/><rect x="194" y="152" width="26" height="16" rx="4"/><rect x="224" y="152" width="26" height="16" rx="4"/><rect x="254" y="152" width="26" height="16" rx="4"/><rect x="284" y="152" width="26" height="16" rx="4"/><rect x="314" y="152" width="26" height="16" rx="4"/>
            <rect x="74" y="174" width="66" height="18" rx="5"/><rect x="144" y="174" width="112" height="18" rx="5"/><rect x="260" y="174" width="80" height="18" rx="5"/>
          </g>
          <rect x="190" y="197" width="20" height="4" rx="2" fill="var(--art-accent)"/>
        </g>
      </svg>`,
    watch: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="77" cy="88" r="29" fill="var(--art-accent)"/>
        <rect x="170" y="16" width="60" height="80" rx="13" fill="var(--art-ink)"/>
        <rect x="170" y="204" width="60" height="80" rx="13" fill="var(--art-ink)"/>
        <rect x="145" y="85" width="110" height="130" rx="29" fill="var(--art-ink)"/>
        <rect x="155" y="95" width="90" height="110" rx="21" fill="var(--art-bg)"/>
        <circle cx="200" cy="150" r="32" stroke="var(--art-accent)" stroke-width="6" fill="none"/>
        <path d="M200 127v23l14 10" stroke="var(--art-ink)" stroke-width="5" stroke-linecap="round" fill="none"/>
        <rect x="255" y="132" width="8" height="24" rx="4" fill="var(--art-ink)"/>
        <path d="M296 196l12 12m0-12-12 12" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    speaker: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="319" cy="78" r="32" fill="var(--art-accent)"/>
        <rect x="136" y="46" width="128" height="208" rx="42" fill="var(--art-ink)"/>
        <rect x="148" y="58" width="104" height="184" rx="32" fill="var(--art-bg)"/>
        <g fill="var(--art-ink)" opacity=".3">
          <circle cx="161" cy="82" r="1.6"/><circle cx="175" cy="82" r="1.6"/><circle cx="189" cy="82" r="1.6"/><circle cx="203" cy="82" r="1.6"/><circle cx="217" cy="82" r="1.6"/><circle cx="231" cy="82" r="1.6"/><circle cx="245" cy="82" r="1.6"/>
          <circle cx="161" cy="96" r="1.6"/><circle cx="175" cy="96" r="1.6"/><circle cx="189" cy="96" r="1.6"/><circle cx="203" cy="96" r="1.6"/><circle cx="217" cy="96" r="1.6"/><circle cx="231" cy="96" r="1.6"/><circle cx="245" cy="96" r="1.6"/>
          <circle cx="161" cy="174" r="1.6"/><circle cx="175" cy="174" r="1.6"/><circle cx="189" cy="174" r="1.6"/><circle cx="203" cy="174" r="1.6"/><circle cx="217" cy="174" r="1.6"/><circle cx="231" cy="174" r="1.6"/><circle cx="245" cy="174" r="1.6"/>
          <circle cx="161" cy="188" r="1.6"/><circle cx="175" cy="188" r="1.6"/><circle cx="189" cy="188" r="1.6"/><circle cx="203" cy="188" r="1.6"/><circle cx="217" cy="188" r="1.6"/><circle cx="231" cy="188" r="1.6"/><circle cx="245" cy="188" r="1.6"/>
          <circle cx="161" cy="202" r="1.6"/><circle cx="175" cy="202" r="1.6"/><circle cx="189" cy="202" r="1.6"/><circle cx="203" cy="202" r="1.6"/><circle cx="217" cy="202" r="1.6"/><circle cx="231" cy="202" r="1.6"/><circle cx="245" cy="202" r="1.6"/>
        </g>
        <circle cx="200" cy="135" r="20" fill="var(--art-accent)"/>
        <circle cx="200" cy="135" r="8" fill="var(--art-ink)"/>
        <path d="M188 222h24" stroke="var(--art-ink)" stroke-width="4" stroke-linecap="round" opacity=".35"/>
      </svg>`,
    lamp: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="82" cy="88" r="29" fill="var(--art-accent)"/>
        <path d="M158 74h84l34 106H124L158 74Z" fill="var(--art-ink)"/>
        <path d="M160 84h80l25 86H135l25-86Z" fill="var(--art-accent)" opacity=".92"/>
        <rect x="197" y="180" width="6" height="74" fill="var(--art-ink)"/>
        <ellipse cx="200" cy="258" rx="53" ry="8" fill="var(--art-ink)"/>
        <path d="M302 198l13 13m0-13-13 13" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round"/>
        <circle cx="318" cy="118" r="5" stroke="var(--art-ink)" stroke-width="2"/>
      </svg>`
  };

  function deviceArt(type) {
    return art[type] || "";
  }

  window.TECHNOVA_DATA = { products, categories, deviceArt };
})();
