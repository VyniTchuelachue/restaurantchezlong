/* ============================================================
   Contenu du site — modifiez ce fichier pour mettre à jour
   les coordonnées, les plats et les photos.
   Chaque texte existe en français (fr), anglais (en) et chinois (zh).
   ============================================================ */

/** Language used for body text. */
export type Lang = "fr" | "en" | "zh";
/** The Latin-script language shown next to the Chinese (French or English). */
export type Latin = "fr" | "en";
export type LatinText = { fr: string; en: string };
export type Text = LatinText & { zh: string };

/** Photos d'illustration (Unsplash). Remplacez par vos propres photos :
 *  placez-les dans client/public/images/ et utilisez "/images/mon-plat.jpg". */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/* Informations issues de la fiche Google Maps « 鑫龙饭店 ». */
export const restaurant = {
  nameZh: "鑫龙饭店",
  nameFr: "Chez Long",
  city: { fr: "Bonapriso, Douala", en: "Bonapriso, Douala", zh: "杜阿拉 · Bonapriso 区" } as Text,
  plusCode: "2PF2+Q4 Douala",
  phone: "+237 6 74 56 20 67",
  phoneHref: "tel:+237674562067",
  whatsapp: "237674562067",
  googleRating: 4.4,
  mapsUrl: "https://maps.app.goo.gl/D9spho4V8yKwA5QV6",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=4.0244345,9.70026",
  mapEmbedUrl: "https://maps.google.com/maps?q=4.0244345,9.70026&z=17&output=embed",
};

export const images = {
  hero: unsplash("photo-1773196275043-8d6e367b0bca", 1900),
  chef: unsplash("photo-1654922207993-2952fec328ae", 1100),
  banquet: unsplash("photo-1755742319537-449f661a3190", 1400),
};

export type SpiceLevel = 0 | 1 | 2 | 3;

export type Dish = LatinText & {
  zh: string;
  origin?: Text;
  img: string;
  spice: SpiceLevel;
};

const hunan: Text = { fr: "Hunan", en: "Hunan", zh: "湘菜" };

export const signatures: Dish[] = [
  {
    zh: "湘式辣子鸡",
    fr: "Poulet sauté aux piments",
    en: "Hunan-style chili chicken",
    origin: hunan,
    img: unsplash("photo-1702705481217-846e30915076", 700),
    spice: 3,
  },
  {
    zh: "剁椒鱼",
    fr: "Poisson entier au piment",
    en: "Whole fish with chopped chili",
    origin: hunan,
    img: unsplash("photo-1760504526044-840cade997b2", 700),
    spice: 2,
  },
  {
    zh: "红烧牛肉",
    fr: "Bœuf braisé à la chinoise",
    en: "Chinese braised beef",
    img: unsplash("photo-1445979323117-80453f573b71", 700),
    spice: 1,
  },
  {
    zh: "干煸四季豆",
    fr: "Haricots verts sautés au porc",
    en: "Dry-fried green beans with pork",
    img: unsplash("photo-1788603913464-cc204d311c13", 700),
    spice: 1,
  },
];

export type StarterDish = Dish & {
  desc: Text;
  tag: Text & { tone: "mild" | "hot" | "share" };
};

export const starters: StarterDish[] = [
  {
    zh: "宫保鸡丁",
    fr: "Poulet kung pao",
    en: "Kung pao chicken",
    img: unsplash("photo-1767974877206-a594e0b1008e", 800),
    spice: 1,
    desc: {
      fr: "Un grand classique, savoureux et légèrement épicé, aux cacahuètes grillées.",
      en: "A great classic, flavorful and mildly spicy, with roasted peanuts.",
      zh: "经典名菜，花生香脆，鲜香微辣。",
    },
    tag: { fr: "Doux", en: "Mild", zh: "微辣", tone: "mild" },
  },
  {
    zh: "麻婆豆腐",
    fr: "Tofu mapo",
    en: "Mapo tofu",
    img: unsplash("photo-1788603930622-636954e00065", 800),
    spice: 2,
    desc: {
      fr: "Un plat emblématique du Sichuan : tofu fondant dans une sauce riche en saveurs.",
      en: "An iconic Sichuan dish: silky tofu in a rich, flavorful sauce.",
      zh: "川味名菜，豆腐嫩滑，麻辣鲜香。",
    },
    tag: { fr: "Épicé", en: "Spicy", zh: "香辣", tone: "hot" },
  },
  {
    zh: "扬州炒饭",
    fr: "Riz sauté façon Yangzhou",
    en: "Yangzhou fried rice",
    img: unsplash("photo-1630914441929-0d8ea69f95e6", 800),
    spice: 0,
    desc: {
      fr: "Crevettes, œuf et légumes : parfait pour découvrir des saveurs équilibrées.",
      en: "Shrimp, egg and vegetables: perfect for discovering balanced flavors.",
      zh: "虾仁鸡蛋，粒粒分明，老少皆宜。",
    },
    tag: { fr: "À partager", en: "To share", zh: "适合分享", tone: "share" },
  },
];

export type MenuItem = LatinText & { zh: string; spice: SpiceLevel };
export type MenuCategory = { id: string; title: Text; items: MenuItem[] };

/** Carte indicative — à compléter avec la carte réelle et les prix (XAF). */
export const menu: MenuCategory[] = [
  {
    id: "entrees",
    title: { fr: "Entrées", en: "Starters", zh: "开胃菜" },
    items: [
      { zh: "春卷", fr: "Rouleaux de printemps croustillants", en: "Crispy spring rolls", spice: 0 },
      { zh: "煎饺", fr: "Raviolis grillés au porc", en: "Pan-fried pork dumplings", spice: 0 },
      { zh: "蒸饺", fr: "Raviolis à la vapeur", en: "Steamed dumplings", spice: 0 },
      { zh: "拍黄瓜", fr: "Concombre frais à l'ail", en: "Smashed cucumber with garlic", spice: 1 },
      { zh: "酸辣汤", fr: "Soupe aigre-piquante", en: "Hot and sour soup", spice: 2 },
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats signature", en: "Signature dishes", zh: "招牌热菜" },
    items: [
      { zh: "湘式辣子鸡", fr: "Poulet sauté aux piments", en: "Hunan-style chili chicken", spice: 3 },
      { zh: "剁椒鱼", fr: "Poisson entier au piment haché", en: "Whole fish with chopped chili", spice: 2 },
      { zh: "红烧牛肉", fr: "Bœuf braisé à la chinoise", en: "Chinese braised beef", spice: 1 },
      { zh: "回锅肉", fr: "Porc deux fois cuit", en: "Twice-cooked pork", spice: 2 },
      { zh: "宫保鸡丁", fr: "Poulet kung pao", en: "Kung pao chicken", spice: 1 },
      { zh: "糖醋里脊", fr: "Porc aigre-doux", en: "Sweet and sour pork", spice: 0 },
      { zh: "鱼香肉丝", fr: "Émincé de porc sauce « yuxiang »", en: "Shredded pork in “yuxiang” sauce", spice: 1 },
    ],
  },
  {
    id: "mer",
    title: { fr: "Poissons & fruits de mer", en: "Fish & seafood", zh: "海鲜" },
    items: [
      { zh: "椒盐虾", fr: "Crevettes sel et poivre", en: "Salt and pepper shrimp", spice: 1 },
      { zh: "清蒸鱼", fr: "Poisson vapeur, gingembre et ciboule", en: "Steamed fish with ginger and scallion", spice: 0 },
      { zh: "干锅虾", fr: "Crevettes en marmite sèche", en: "Dry-pot shrimp", spice: 2 },
    ],
  },
  {
    id: "legumes",
    title: { fr: "Légumes & tofu", en: "Vegetables & tofu", zh: "素菜" },
    items: [
      { zh: "干煸四季豆", fr: "Haricots verts sautés au porc", en: "Dry-fried green beans with pork", spice: 1 },
      { zh: "麻婆豆腐", fr: "Tofu mapo", en: "Mapo tofu", spice: 2 },
      { zh: "地三鲜", fr: "Aubergine, pomme de terre et poivron", en: "Eggplant, potato and pepper", spice: 0 },
      { zh: "蒜蓉青菜", fr: "Légumes verts sautés à l'ail", en: "Stir-fried greens with garlic", spice: 0 },
    ],
  },
  {
    id: "riz",
    title: { fr: "Riz & nouilles", en: "Rice & noodles", zh: "主食" },
    items: [
      { zh: "扬州炒饭", fr: "Riz sauté façon Yangzhou", en: "Yangzhou fried rice", spice: 0 },
      { zh: "牛肉炒面", fr: "Nouilles sautées au bœuf", en: "Beef fried noodles", spice: 0 },
      { zh: "蛋炒饭", fr: "Riz sauté à l'œuf", en: "Egg fried rice", spice: 0 },
      { zh: "白米饭", fr: "Riz blanc nature", en: "Steamed white rice", spice: 0 },
    ],
  },
];

export const gallery: { img: string; caption: Text }[] = [
  { img: unsplash("photo-1759893497863-c90a6dfa7a86", 800), caption: { fr: "La salle", en: "The dining room", zh: "大厅" } },
  { img: unsplash("photo-1636895109157-689d0ed6f14b", 800), caption: { fr: "Le thé", en: "Tea", zh: "茶" } },
  { img: unsplash("photo-1780375578105-e4c938ce2c38", 800), caption: { fr: "Table à partager", en: "Sharing table", zh: "合菜" } },
  { img: unsplash("photo-1759893497816-129ce94f1b40", 800), caption: { fr: "Lanternes rouges", en: "Red lanterns", zh: "红灯笼" } },
  { img: unsplash("photo-1707013533606-62919aa3aa29", 800), caption: { fr: "Dim sum & thé", en: "Dim sum & tea", zh: "点心" } },
  { img: unsplash("photo-1789999375823-87fa75e49ff1", 800), caption: { fr: "Repas entre amis", en: "Dinner with friends", zh: "朋友聚餐" } },
  { img: unsplash("photo-1759892984793-072f8ecac014", 800), caption: { fr: "Décor traditionnel", en: "Traditional decor", zh: "中式装潢" } },
];
