/* ============================================================
   Contenu du site — modifiez ce fichier pour mettre à jour
   les coordonnées, les plats et les photos.
   ============================================================ */

export type Lang = "fr" | "zh";
export type Text = { fr: string; zh: string };

/** Photos d'illustration (Unsplash). Remplacez par vos propres photos :
 *  placez-les dans client/public/images/ et utilisez "/images/mon-plat.jpg". */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/* Informations issues de la fiche Google Maps « 鑫龙饭店 ». */
export const restaurant = {
  nameZh: "鑫龙饭店",
  nameFr: "Chez Long",
  kind: { fr: "Restaurant chinois", zh: "中餐馆" } as Text,
  city: { fr: "Bonapriso, Douala", zh: "杜阿拉 · Bonapriso 区" } as Text,
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

export type Dish = {
  zh: string;
  fr: string;
  origin?: Text;
  img: string;
  spice: SpiceLevel;
};

export const signatures: Dish[] = [
  {
    zh: "湘式辣子鸡",
    fr: "Poulet sauté aux piments",
    origin: { fr: "Hunan", zh: "湘菜" },
    img: unsplash("photo-1702705481217-846e30915076", 700),
    spice: 3,
  },
  {
    zh: "剁椒鱼",
    fr: "Poisson entier au piment",
    origin: { fr: "Hunan", zh: "湘菜" },
    img: unsplash("photo-1760504526044-840cade997b2", 700),
    spice: 2,
  },
  {
    zh: "红烧牛肉",
    fr: "Bœuf braisé à la chinoise",
    img: unsplash("photo-1445979323117-80453f573b71", 700),
    spice: 1,
  },
  {
    zh: "干煸四季豆",
    fr: "Haricots verts sautés au porc",
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
    img: unsplash("photo-1767974877206-a594e0b1008e", 800),
    spice: 1,
    desc: {
      fr: "Un grand classique, savoureux et légèrement épicé, aux cacahuètes grillées.",
      zh: "经典名菜，花生香脆，鲜香微辣。",
    },
    tag: { fr: "Doux", zh: "微辣", tone: "mild" },
  },
  {
    zh: "麻婆豆腐",
    fr: "Tofu mapo",
    img: unsplash("photo-1788603930622-636954e00065", 800),
    spice: 2,
    desc: {
      fr: "Un plat emblématique du Sichuan : tofu fondant dans une sauce riche en saveurs.",
      zh: "川味名菜，豆腐嫩滑，麻辣鲜香。",
    },
    tag: { fr: "Épicé", zh: "香辣", tone: "hot" },
  },
  {
    zh: "扬州炒饭",
    fr: "Riz sauté façon Yangzhou",
    img: unsplash("photo-1630914441929-0d8ea69f95e6", 800),
    spice: 0,
    desc: {
      fr: "Crevettes, œuf et légumes : parfait pour découvrir des saveurs équilibrées.",
      zh: "虾仁鸡蛋，粒粒分明，老少皆宜。",
    },
    tag: { fr: "À partager", zh: "适合分享", tone: "share" },
  },
];

export type MenuItem = { zh: string; fr: string; spice: SpiceLevel };
export type MenuCategory = { id: string; title: Text; items: MenuItem[] };

/** Carte indicative — à compléter avec la carte réelle et les prix (XAF). */
export const menu: MenuCategory[] = [
  {
    id: "entrees",
    title: { fr: "Entrées", zh: "开胃菜" },
    items: [
      { zh: "春卷", fr: "Rouleaux de printemps croustillants", spice: 0 },
      { zh: "煎饺", fr: "Raviolis grillés au porc", spice: 0 },
      { zh: "蒸饺", fr: "Raviolis à la vapeur", spice: 0 },
      { zh: "拍黄瓜", fr: "Concombre frais à l'ail", spice: 1 },
      { zh: "酸辣汤", fr: "Soupe aigre-piquante", spice: 2 },
    ],
  },
  {
    id: "plats",
    title: { fr: "Plats signature", zh: "招牌热菜" },
    items: [
      { zh: "湘式辣子鸡", fr: "Poulet sauté aux piments", spice: 3 },
      { zh: "剁椒鱼", fr: "Poisson entier au piment haché", spice: 2 },
      { zh: "红烧牛肉", fr: "Bœuf braisé à la chinoise", spice: 1 },
      { zh: "回锅肉", fr: "Porc deux fois cuit", spice: 2 },
      { zh: "宫保鸡丁", fr: "Poulet kung pao", spice: 1 },
      { zh: "糖醋里脊", fr: "Porc aigre-doux", spice: 0 },
      { zh: "鱼香肉丝", fr: "Émincé de porc sauce « yuxiang »", spice: 1 },
    ],
  },
  {
    id: "mer",
    title: { fr: "Poissons & fruits de mer", zh: "海鲜" },
    items: [
      { zh: "椒盐虾", fr: "Crevettes sel et poivre", spice: 1 },
      { zh: "清蒸鱼", fr: "Poisson vapeur, gingembre et ciboule", spice: 0 },
      { zh: "干锅虾", fr: "Crevettes en marmite sèche", spice: 2 },
    ],
  },
  {
    id: "legumes",
    title: { fr: "Légumes & tofu", zh: "素菜" },
    items: [
      { zh: "干煸四季豆", fr: "Haricots verts sautés au porc", spice: 1 },
      { zh: "麻婆豆腐", fr: "Tofu mapo", spice: 2 },
      { zh: "地三鲜", fr: "Aubergine, pomme de terre et poivron", spice: 0 },
      { zh: "蒜蓉青菜", fr: "Légumes verts sautés à l'ail", spice: 0 },
    ],
  },
  {
    id: "riz",
    title: { fr: "Riz & nouilles", zh: "主食" },
    items: [
      { zh: "扬州炒饭", fr: "Riz sauté façon Yangzhou", spice: 0 },
      { zh: "牛肉炒面", fr: "Nouilles sautées au bœuf", spice: 0 },
      { zh: "蛋炒饭", fr: "Riz sauté à l'œuf", spice: 0 },
      { zh: "白米饭", fr: "Riz blanc nature", spice: 0 },
    ],
  },
];

export const gallery: { img: string; caption: Text }[] = [
  { img: unsplash("photo-1759893497863-c90a6dfa7a86", 800), caption: { fr: "La salle", zh: "大厅" } },
  { img: unsplash("photo-1636895109157-689d0ed6f14b", 800), caption: { fr: "Le thé", zh: "茶" } },
  { img: unsplash("photo-1780375578105-e4c938ce2c38", 800), caption: { fr: "Table à partager", zh: "合菜" } },
  { img: unsplash("photo-1759893497816-129ce94f1b40", 800), caption: { fr: "Lanternes rouges", zh: "红灯笼" } },
  { img: unsplash("photo-1707013533606-62919aa3aa29", 800), caption: { fr: "Dim sum & thé", zh: "点心" } },
  { img: unsplash("photo-1789999375823-87fa75e49ff1", 800), caption: { fr: "Repas entre amis", zh: "朋友聚餐" } },
  { img: unsplash("photo-1759892984793-072f8ecac014", 800), caption: { fr: "Décor traditionnel", zh: "中式装潢" } },
];
