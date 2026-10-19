import sharp from "sharp";
const svg=(s,pad=0)=>{const c=s/2,u=s-pad*2;return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="100%" height="100%" ${pad?'':`rx="${s*0.22}"`} fill="#1a1816"/><path d="M${c-u*0.25} ${c-u*0.16}h${u*0.5}M${c} ${c-u*0.16}v${u*0.38}" fill="none" stroke="#faf8f4" stroke-width="${u*0.07}" stroke-linecap="round"/><circle cx="${c+u*0.22}" cy="${c+u*0.19}" r="${u*0.08}" fill="#d9924a"/></svg>`};
for (const [f,s,p] of [["public/icons/icon-192.png",192,0],["public/icons/icon-512.png",512,0],["public/icons/icon-maskable-512.png",512,80],["src/app/apple-icon.png",180,18]]) await sharp(Buffer.from(svg(s,p))).png().toFile(f);
console.log("icons ok");
