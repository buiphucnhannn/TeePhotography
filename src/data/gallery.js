// Kho ảnh — mọi ảnh trong /public/images đều được dùng, gom theo bộ sưu tập.
// Kích thước & blur placeholder lấy từ images.generated.js (chạy `npm run images` khi thêm ảnh).
import { imageMeta } from "./images.generated";

function photo(src, collection, alt) {
  const meta = imageMeta[src];
  if (!meta) throw new Error(`Thiếu metadata cho ${src} — chạy \`npm run images\``);
  return { src, collection, alt, ...meta, portrait: meta.height > meta.width };
}

export const photos = [
  // Phố cổ Hội An
  photo("/images/old-town/yellow-house-kiss.jpg", "old-town", {
    vi: "Nụ hôn trước căn nhà vàng treo đèn lồng đỏ",
    en: "A kiss in front of a yellow house strung with red lanterns",
  }),
  photo("/images/old-town/ao-dai-umbrella.jpg", "old-town", {
    vi: "Cặp đôi áo dài đỏ – xanh với ô giấy bên hiên phố cổ",
    en: "Couple in red and blue áo dài with a paper umbrella on an old-town porch",
  }),
  photo("/images/old-town/ao-dai-stroll.jpg", "old-town", {
    vi: "Dạo bước dưới giàn hoa giấy và đèn lồng",
    en: "Strolling beneath bougainvillea and lanterns",
  }),
  photo("/images/old-town/lantern-facade.jpg", "old-town", {
    vi: "Đứng giữa mặt tiền vàng rực và đèn lồng cam",
    en: "Standing before a golden façade and orange lanterns",
  }),
  photo("/images/old-town/lantern-shop.jpg", "old-town", {
    vi: "Chân dung giữa cửa hàng đèn lồng rực rỡ",
    en: "Portrait inside a vivid lantern shop",
  }),
  photo("/images/old-town/alley-walk.jpg", "old-town", {
    vi: "Nắm tay chạy qua con hẻm tường vàng",
    en: "Hand in hand through a sunlit yellow alley",
  }),
  photo("/images/old-town/yellow-wall.jpg", "old-town", {
    vi: "Khoảnh khắc đời thường bên bức tường vàng loang màu thời gian",
    en: "A candid moment against a weathered yellow wall",
  }),
  photo("/images/old-town/quan-cong-temple.jpg", "old-town", {
    vi: "Sân hội quán xanh cổ kính dưới trời trong",
    en: "An ancient blue assembly hall courtyard under clear skies",
  }),
  photo("/images/old-town/rooftop-view.jpg", "old-town", {
    vi: "Ngắm mái ngói phố cổ từ sân thượng",
    en: "Overlooking the old town's tiled roofs from a rooftop",
  }),

  // Đồng quê & biển
  photo("/images/countryside/rice-field-embrace.jpg", "countryside", {
    vi: "Ôm nhau cười giữa cánh đồng lúa xanh",
    en: "Laughing embrace in a green rice paddy",
  }),
  photo("/images/countryside/rice-field-wide.jpg", "countryside", {
    vi: "Hai người nhỏ bé giữa đồng lúa và hàng cau",
    en: "Two figures amid rice fields and areca palms",
  }),
  photo("/images/countryside/beach-dance.jpg", "countryside", {
    vi: "Khiêu vũ trên bãi biển lúc hoàng hôn",
    en: "Dancing on the beach at sunset",
  }),
  photo("/images/countryside/river-boat.jpg", "countryside", {
    vi: "Thuyền gỗ trên sông Thu Bồn buổi sớm",
    en: "A wooden boat on the Thu Bon River in the morning",
  }),
  photo("/images/countryside/meadow-sky.jpg", "countryside", {
    vi: "Ngồi bên nhau trên đồng cỏ dưới bầu trời rộng",
    en: "Sitting together in a meadow under a wide sky",
  }),

  // Khoảnh khắc
  photo("/images/moments/ring.jpg", "moments", {
    vi: "Cận cảnh chiếc nhẫn đính hôn trong tay nhau",
    en: "Close-up of the engagement ring, hands intertwined",
  }),
];

export const byCollection = (id) => photos.filter((p) => p.collection === id);
export const find = (src) => photos.find((p) => p.src === src);

// Ảnh dùng cho các vị trí nổi bật
export const featured = {
  hero: [
    "/images/old-town/yellow-house-kiss.jpg",
    "/images/countryside/beach-dance.jpg",
    "/images/old-town/ao-dai-stroll.jpg",
    "/images/countryside/river-boat.jpg",
  ].map(find),
  about: [find("/images/moments/ring.jpg"), find("/images/old-town/rooftop-view.jpg")],
  // position: điểm lấy nét (object-position) để card dù mở rộng hay thu hẹp vẫn thấy chủ thể
  collections: {
    "old-town": { ...find("/images/old-town/lantern-facade.jpg"), position: "object-[center_60%]" },
    countryside: { ...find("/images/countryside/rice-field-embrace.jpg"), position: "object-[center_22%]" },
    moments: { ...find("/images/moments/ring.jpg"), position: "object-[62%_center]" },
  },
  services: [
    find("/images/old-town/alley-walk.jpg"),
    find("/images/countryside/meadow-sky.jpg"),
    find("/images/countryside/beach-dance.jpg"),
    find("/images/old-town/rooftop-view.jpg"),
  ],
  // 4 bước quy trình — ảnh dọc/cận cảnh, position giữ chủ thể trong khung 4/5
  process: [
    { ...find("/images/old-town/lantern-shop.jpg"), position: "object-[62%_center]" },
    { ...find("/images/old-town/quan-cong-temple.jpg"), position: "object-center" },
    { ...find("/images/old-town/ao-dai-umbrella.jpg"), position: "object-[center_70%]" },
    { ...find("/images/old-town/yellow-wall.jpg"), position: "object-[55%_center]" },
  ],
  cta: find("/images/countryside/rice-field-wide.jpg"),
  booking: find("/images/old-town/lantern-shop.jpg"),
};
