/**
 * Single source of truth for brand, media, event and partner content.
 * Everything here is approval-driven: flip `approved` / add `logo` once the
 * Namib Rage team signs off. Do not add partners, credits or photos that
 * have not been confirmed.
 */

export const company = {
  name: "Namib Rage Events",
  founded: 2013,
  city: "Windhoek, Namibia",
  address: "22 Copper Street, Windhoek",
  email: "hello@namibrage.com",
  phone: "+264 81 207 5457",
  officialSite: "https://namibrage.com/",
  officialPrivacy: "https://namibrage.com/privacy-policy/",
  howlerHelp: "https://help.howler.co.za/",
};

export type BrandKey = "nr" | "sos" | "camp" | "barb" | "howler" | "ft";

export type Brand = {
  key: BrandKey;
  name: string;
  short: string;
  role: "Master brand" | "Owned festival" | "Service division" | "Ticketing & cashless partner";
  to: string;
  /** Approved logo file (SVG/PNG). null = typographic wordmark placeholder. */
  logo: string | null;
  accentClass: string;
  textOnAccent: string;
};

export const brands: Brand[] = [
  { key: "nr", name: "Namib Rage", short: "NR", role: "Master brand", to: "/namib-rage", logo: null, accentClass: "bg-nr", textOnAccent: "text-cream" },
  { key: "sos", name: "Sound of Summer", short: "SoS", role: "Owned festival", to: "/festivals/sound-of-summer", logo: null, accentClass: "bg-sos", textOnAccent: "text-cream" },
  { key: "camp", name: "Campout Dune Fest", short: "Campout", role: "Owned festival", to: "/festivals/campout", logo: null, accentClass: "bg-camp", textOnAccent: "text-camp-ink" },
  { key: "barb", name: "Barbarian", short: "Bar Mgmt", role: "Service division", to: "/services/bar-management", logo: null, accentClass: "bg-barb", textOnAccent: "text-cream" },
  { key: "howler", name: "Howler", short: "Ticketing", role: "Ticketing & cashless partner", to: "/services/ticketing-cashless", logo: null, accentClass: "bg-howler", textOnAccent: "text-cream" },
  { key: "ft", name: "Fast Track", short: "Permits", role: "Service division", to: "/services/fast-track", logo: null, accentClass: "bg-ft", textOnAccent: "text-night" },
];

export const brand = (k: BrandKey) => brands.find((b) => b.key === k)!;

export type Photo = {
  id: string;
  src: string;
  alt: string;
  /** What the photo is allowed to represent. Never relabel without source proof. */
  context: string;
  credit: string;
  /** Cloudinary URLs can be resized; others served as-is. */
  resizable?: boolean;
};

const cld = (path: string) =>
  `https://res.cloudinary.com/pixel-penguin/image/upload/c_scale%2Cw_1920/${path}`;

export const photos: Record<string, Photo> = {
  sosCrowd: { id: "sosCrowd", src: cld("v1660917080/websites/namib_rage/images/gallery%20images/sos/IMG_2520_cvbue3.jpg"), alt: "Crowd at a past Sound of Summer festival", context: "Sound of Summer — past edition", credit: "Namib Rage official gallery", resizable: true },
  sosStage: { id: "sosStage", src: cld("v1660917080/websites/namib_rage/images/gallery%20images/sos/IMG_0696_gtba3v.jpg"), alt: "Festival-goers at a past Sound of Summer", context: "Sound of Summer — past edition", credit: "Namib Rage official gallery", resizable: true },
  sosBeach: { id: "sosBeach", src: cld("v1660917080/websites/namib_rage/images/gallery%20images/sos/51081771_2049340501815630_1622308563307200512_n_aofoxo.jpg"), alt: "Sound of Summer festival scene from a past edition", context: "Sound of Summer — past edition", credit: "Namib Rage official gallery", resizable: true },
  nrGallery1: { id: "nrGallery1", src: "https://images.pixieset.com/784513901/87f062341d5c0b25be26dd0c5e1b043b-xxlarge.jpg", alt: "Namib Rage event crowd", context: "Namib Rage official gallery", credit: "Namib Rage official gallery" },
  nrGallery2: { id: "nrGallery2", src: "https://images.pixieset.com/784513901/2662436cf50baaa5a6647dbc58e3e8d9-xxlarge.jpg", alt: "Namib Rage event atmosphere", context: "Namib Rage official gallery", credit: "Namib Rage official gallery" },
  nrGallery3: { id: "nrGallery3", src: "https://dxf0uknvapgsn.cloudfront.net/41/01KA8D8V3EAFAJ1T16W3Z1XKHX.jpg", alt: "Namib Rage festival moment", context: "Namib Rage official gallery", credit: "Namib Rage official gallery" },
  nrGallery4: { id: "nrGallery4", src: "https://dxf0uknvapgsn.cloudfront.net/42/01KA8D8WB58ACQ8VRKTZCYZN2D.jpg", alt: "Namib Rage festival moment", context: "Namib Rage official gallery", credit: "Namib Rage official gallery" },
  campArt: { id: "campArt", src: "https://namibrage.com/events/campout-dune-fest-2026.jpg", alt: "Official Campout Dune Fest 2026 artwork", context: "Campout Dune Fest 2026 — official artwork", credit: "Namib Rage" },
};

/**
 * Homepage media is kept separate from festival media.
 * No clip is connected until a genuine, cleared, playable event montage
 * has been supplied. null keeps the image-led fallback intact.
 */
export const homepageHeroVideo: string | null = null;

export const organiserMark = {
  src: "https://howler-production.s3.eu-west-1.amazonaws.com/uploads/organiser/organiser_logo/10442/WhatsApp_Image_2026-06-17_at_11.52.02.jpeg",
  alt: "Namib Rage × Howler combined organiser mark",
  note: "Combined NR + Howler organiser mark — not a standalone Namib Rage logo.",
};

export type Festival = {
  slug: "sound-of-summer" | "campout";
  brand: BrandKey;
  name: string;
  year: number;
  dateSticker: string;
  dateLong: string;
  times: string;
  venue: string;
  area: string;
  age: string;
  ticketUrl: string;
  hero: Photo;
  /** Optional short loop. Leave null until a real clip is supplied. */
  heroVideo: string | null;
  tagline: string;
};

export const festivals: Festival[] = [
  {
    slug: "sound-of-summer", brand: "sos", name: "Sound of Summer", year: 2026,
    dateSticker: "28 DEC", dateLong: "Monday 28 December 2026", times: "12:00 – 23:00",
    venue: "Tidal Pools & Jetty Beach", area: "Langstrand", age: "18+",
    ticketUrl: "https://namibrage.howler.co.za/events/sound-of-summer-2026-8a50",
    hero: photos.sosCrowd, heroVideo: null,
    tagline: "Namibia’s beach festival, three stages on the Atlantic edge.",
  },
  {
    slug: "campout", brand: "camp", name: "Campout Dune Fest", year: 2026,
    dateSticker: "31 DEC", dateLong: "31 December 2026 – 1 January 2027", times: "Gates from 12:00 on 31 Dec · music times pending",
    venue: "Seukelduine", area: "Dorob National Park", age: "18+",
    ticketUrl: "https://namibrage.howlerapp.com/events/campout-dune-fest-2026-34b6",
    hero: photos.campArt, heroVideo: null,
    tagline: "Pitch a tent, see in the new year between the dunes.",
  },
];

export const sosStages = [
  { name: "Savanna", note: "Main stage" },
  { name: "Coke Studio", note: "Stage two" },
  { name: "Jetty", note: "Stage three" },
];
/** Only approved artists. Add names as they are confirmed. */
export const sosLineup = [{ name: "Shimza", billing: "Headliner" }];

/** Real Campout photos/video from the owner go here. Empty = artwork-only layout. */
export const campoutMedia: Photo[] = [];

export type PoweredEvent = {
  name: string;
  roles: ("Owned" | "Bar operations" | "Ticketing")[];
  by: BrandKey[];
  photo: Photo | null;
  to?: string;
};

/** Ticketing credits: only add when Howler involvement on that event is confirmed. */
export const poweredEvents: PoweredEvent[] = [
  { name: "Sound of Summer", roles: ["Owned", "Ticketing"], by: ["nr", "howler"], photo: photos.sosStage, to: "/festivals/sound-of-summer" },
  { name: "Campout Dune Fest", roles: ["Owned", "Ticketing"], by: ["nr", "howler"], photo: photos.campArt, to: "/festivals/campout" },
  { name: "Oktoberfest Namibia", roles: ["Bar operations"], by: ["barb"], photo: null },
  { name: "Balcony Mix", roles: ["Bar operations"], by: ["barb"], photo: null },
  { name: "KosFees", roles: ["Bar operations"], by: ["barb"], photo: null },
  { name: "Liefde op die Nam", roles: ["Bar operations"], by: ["barb"], photo: null },
];

export type Sponsor = { name: string; logo: string; url?: string; approved: boolean };
/** Empty until sponsor logos are approved. Never add placeholders here. */
export const sponsors: Sponsor[] = [];

export const workLinks = [
  { label: "Apply to work with Barbarian", href: "https://namibrage.com/staff/apply/barbarian", brand: "barb" as BrandKey },
  { label: "Apply to work with Howler", href: "https://namibrage.com/staff/apply/howler", brand: "howler" as BrandKey },
  { label: "Vendor application", href: "https://namibrage.com/vendor-application/", brand: "nr" as BrandKey },
];

export const fastTrackServices = [
  "Visa services", "Work permits", "Liquor licences", "Noise permits",
  "NASCAM music licences", "Flight bookings", "Artist bookings",
];

/** Approved operational photos for Howler’s three steps. None supplied yet. */
export const howlerFlowMedia: (Photo | null)[] = [null, null, null];
