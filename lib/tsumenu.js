const chalk = require('chalk')
const fs = require('fs')

const steks = (text, style = 1) => {
  var abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  var xyz = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  abc.map((v, i) =>
    replacer.push({
      original: v,
      convert: xyz[style].split('')[i]
    })
  );
  var str = text.split('');
  var output = [];
  str.map((v) => {
    if (v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()) {
      // If the character is uppercase, push it unchanged
      output.push(v);
    } else {
      // If the character is lowercase or not a letter, find and convert it
      const find = replacer.find((x) => x.original == v.toLowerCase());
      find ? output.push(find.convert) : output.push(v);
    }
  });
  return output.join('');
};

global.menuall = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝘀𝗲𝗺𝘂𝗮 𝗺𝗲𝗻𝘂𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙾𝚠𝚗𝚎𝚛 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}addbalance *Ⓞ*
╎│⚡︎」დ ${prefix}addcase *Ⓞ*
╎│⚡︎」დ ${prefix}addlimit *Ⓞ*
╎│⚡︎」დ ${prefix}addprem *Ⓞ*
╎│⚡︎」დ ${prefix}bcgc *Ⓞ*
╎│⚡︎」დ ${prefix}biochange *Ⓞ*
╎│⚡︎」დ ${prefix}buatclaimprem *Ⓞ*
╎│⚡︎」დ ${prefix}buathadiah *Ⓞ*
╎│⚡︎」დ ${prefix}del *Ⓞ*
╎│⚡︎」დ ${prefix}delcase *Ⓞ*
╎│⚡︎」დ ${prefix}delppbot *Ⓞ*
╎│⚡︎」დ ${prefix}delprem *Ⓞ*
╎│⚡︎」დ ${prefix}getbio *Ⓞ*
╎│⚡︎」დ ${prefix}getcase *Ⓞ*
╎│⚡︎」დ ${prefix}getname *Ⓞ*
╎│⚡︎」დ ${prefix}listclaimprem *Ⓞ*
╎│⚡︎」დ ${prefix}listgc *Ⓞ*
╎│⚡︎」დ ${prefix}listhadiah *Ⓞ*
╎│⚡︎」დ ${prefix}listprem *Ⓞ*
╎│⚡︎」დ ${prefix}listregis *Ⓞ*
╎│⚡︎」დ ${prefix}myip *Ⓞ*
╎│⚡︎」დ ${prefix}pay *Ⓞ*
╎│⚡︎」დ ${prefix}public *Ⓞ*
╎│⚡︎」დ ${prefix}restart *Ⓞ*
╎│⚡︎」დ ${prefix}self *Ⓞ*
╎│⚡︎」დ ${prefix}setbotname *Ⓞ*
╎│⚡︎」დ ${prefix}setppbot *Ⓞ*
╎│⚡︎」დ ${prefix}setpppanjang *Ⓞ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙼𝚊𝚒𝚗 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}afk *Ⓕ*
╎│⚡︎」დ ${prefix}buylimit *Ⓕ*
╎│⚡︎」დ ${prefix}buyprem *Ⓕ*
╎│⚡︎」დ ${prefix}cekip *Ⓞ*
╎│⚡︎」დ ${prefix}cerpen *Ⓕ*
╎│⚡︎」დ ${prefix}claim *Ⓟ*
╎│⚡︎」დ ${prefix}claimprem *Ⓟ*
╎│⚡︎」დ ${prefix}jarak *Ⓛ*
╎│⚡︎」დ ${prefix}me *Ⓕ*
╎│⚡︎」დ ${prefix}pin *Ⓛ*
╎│⚡︎」დ ${prefix}qc *Ⓛ*
╎│⚡︎」დ ${prefix}qc2 *Ⓛ*
╎│⚡︎」დ ${prefix}redeemcode *Ⓟ*
╎│⚡︎」დ ${prefix}remini *Ⓛ*
╎│⚡︎」დ ${prefix}report
╎│⚡︎」დ ${prefix}request
╎│⚡︎」დ ${prefix}ssweb *Ⓛ*
╎│⚡︎」დ ${prefix}sticker *Ⓕ*
╎│⚡︎」დ ${prefix}toimg *Ⓕ*
╎│⚡︎」დ ${prefix}topglobal *Ⓕ*
╎│⚡︎」დ ${prefix}totalfitur *Ⓕ*
╎│⚡︎」დ ${prefix}tourl *Ⓛ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}gitclone *Ⓛ*
╎│⚡︎」დ ${prefix}instagram *Ⓛ*
╎│⚡︎」დ ${prefix}mediafire *Ⓛ*
╎│⚡︎」დ ${prefix}play *Ⓕ*
╎│⚡︎」დ ${prefix}tiktok *Ⓛ*
╎│⚡︎」დ ${prefix}ytmp3 *Ⓕ*
╎│⚡︎」დ ${prefix}ytmp4 *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝚂𝚎𝚊𝚛𝚌𝚑 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}cnbcnews *Ⓕ*
╎│⚡︎」დ ${prefix}cnnnews *Ⓕ*
╎│⚡︎」დ ${prefix}detiknews *Ⓕ*
╎│⚡︎」დ ${prefix}fajarnews *Ⓕ*
╎│⚡︎」დ ${prefix}google *Ⓕ*
╎│⚡︎」დ ${prefix}indozonenews *Ⓕ*
╎│⚡︎」დ ${prefix}jalantikus-meme *Ⓕ*
╎│⚡︎」დ ${prefix}kontannews *Ⓕ*
╎│⚡︎」დ ${prefix}lirik *Ⓕ*
╎│⚡︎」დ ${prefix}play *Ⓕ*
╎│⚡︎」დ ${prefix}pokemon *Ⓕ*
╎│⚡︎」დ ${prefix}ttsearch *Ⓕ*
╎│⚡︎」დ ${prefix}yts *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙶𝚛𝚘𝚞𝚙 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}add *Ⓕ*
╎│⚡︎」დ ${prefix}antilink *Ⓕ*
╎│⚡︎」დ ${prefix}closetime *Ⓕ*
╎│⚡︎」დ ${prefix}demote *Ⓕ*
╎│⚡︎」დ ${prefix}editdesk *Ⓕ*
╎│⚡︎」დ ${prefix}hidetag *Ⓕ*
╎│⚡︎」დ ${prefix}kick *Ⓕ*
╎│⚡︎」დ ${prefix}linkgc *Ⓕ*
╎│⚡︎」დ ${prefix}opentime *Ⓕ*
╎│⚡︎」დ ${prefix}promote *Ⓕ*
╎│⚡︎」დ ${prefix}resetlinkgc *Ⓕ*
╎│⚡︎」დ ${prefix}sendlinkgc *Ⓕ*
╎│⚡︎」დ ${prefix}setname *Ⓕ*
╎│⚡︎」დ ${prefix}tagall *Ⓕ*
╎│⚡︎」დ ${prefix}tagme *Ⓕ*
╎│⚡︎」დ ${prefix}totag *Ⓕ*
╎│⚡︎」დ ${prefix}welcome *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙰𝚐𝚊𝚖𝚊 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}ayatkursi *Ⓕ*
╎│⚡︎」დ ${prefix}bible *Ⓕ*
╎│⚡︎」დ ${prefix}doaharian *Ⓕ*
╎│⚡︎」დ ${prefix}jadwalsholat *Ⓕ*
╎│⚡︎」დ ${prefix}kisahnabi *Ⓕ*
╎│⚡︎」დ ${prefix}niatsholat *Ⓕ*
╎│⚡︎」დ ${prefix}quotesislam *Ⓕ*
╎╬───═╸
╎╠⊱⍤⃝⊰ɞ──『 *𝙰𝚒 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎│⚡︎」დ ${prefix}bard *Ⓛ*
╎│⚡︎」დ ${prefix}luhungchat *Ⓞ*
╎│⚡︎」დ ${prefix}luminai *Ⓛ*
╎│⚡︎」დ ${prefix}tsumuri *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝚂𝚝𝚘𝚛𝚎 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}batal *Ⓕ*
╎│⚡︎」დ ${prefix}done *Ⓞ*
╎│⚡︎」დ ${prefix}payment *Ⓕ*
╎│⚡︎」დ ${prefix}tunda *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙵𝚞𝚗 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}apakah *Ⓕ*
╎│⚡︎」დ ${prefix}benarkah *Ⓕ*
╎│⚡︎」დ ${prefix}cekaku *Ⓕ*
╎│⚡︎」დ ${prefix}cekanjing *Ⓕ*
╎│⚡︎」დ ${prefix}cekbodoh *Ⓕ*
╎│⚡︎」დ ${prefix}cekcabul *Ⓕ*
╎│⚡︎」დ ${prefix}cekcantik *Ⓕ*
╎│⚡︎」დ ${prefix}cekdingin *Ⓕ*
╎│⚡︎」დ ${prefix}cekgay *Ⓕ*
╎│⚡︎」დ ${prefix}cekhomo *Ⓕ*
╎│⚡︎」დ ${prefix}cekjelek *Ⓕ*
╎│⚡︎」დ ${prefix}cekkhodam *Ⓕ*
╎│⚡︎」დ ${prefix}cekkontol *Ⓕ*
╎│⚡︎」დ ${prefix}cekkotor *Ⓕ*
╎│⚡︎」დ ${prefix}cekkucing *Ⓕ*
╎│⚡︎」დ ${prefix}ceklesbi *Ⓕ*
╎│⚡︎」დ ${prefix}ceklucu *Ⓕ*
╎│⚡︎」დ ${prefix}cekmemek *Ⓕ*
╎│⚡︎」დ ${prefix}cekpintar *Ⓕ*
╎│⚡︎」დ ${prefix}ceksempak *Ⓕ*
╎│⚡︎」დ ${prefix}cektampan *Ⓕ*
╎│⚡︎」დ ${prefix}cekwaifu *Ⓕ*
╎│⚡︎」დ ${prefix}dare *Ⓕ*
╎│⚡︎」დ ${prefix}jodoh *Ⓕ*
╎│⚡︎」დ ${prefix}kapan *Ⓕ*
╎│⚡︎」დ ${prefix}pasangan *Ⓕ*
╎│⚡︎」დ ${prefix}truth *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙶𝚊𝚖𝚎 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}asahotak *Ⓕ*
╎│⚡︎」დ ${prefix}caklontong *Ⓕ*
╎│⚡︎」დ ${prefix}casino *Ⓕ*
╎│⚡︎」დ ${prefix}catur
╎│⚡︎」დ ${prefix}cowboy *Ⓕ*
╎│⚡︎」დ ${prefix}delpetakbom *Ⓕ*
╎│⚡︎」დ ${prefix}delttt *Ⓕ*
╎│⚡︎」დ ${prefix}family100 *Ⓕ*
╎│⚡︎」დ ${prefix}kuis *Ⓕ*
╎│⚡︎」დ ${prefix}math *Ⓕ*
╎│⚡︎」დ ${prefix}petakbom *Ⓕ*
╎│⚡︎」დ ${prefix}siapakahaku *Ⓕ*
╎│⚡︎」დ ${prefix}slot *Ⓕ*
╎│⚡︎」დ ${prefix}suit *Ⓕ*
╎│⚡︎」დ ${prefix}susunkata *Ⓕ*
╎│⚡︎」დ ${prefix}tebakanime *Ⓕ*
╎│⚡︎」დ ${prefix}tebakbendera *Ⓕ*
╎│⚡︎」დ ${prefix}tebakgambar *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkabupaten *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkalimat *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkata *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkimia *Ⓕ*
╎│⚡︎」დ ${prefix}tebaklagu *Ⓕ*
╎│⚡︎」დ ${prefix}tebaklirik *Ⓕ*
╎│⚡︎」დ ${prefix}tictactoe *Ⓕ*
╎│⚡︎」დ ${prefix}werewolf *Ⓕ*
╎╠⊱⍤⃝⊰ɞ──『 *𝙾𝚝𝚑𝚎𝚛 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╬───═╸
╎│⚡︎」დ ${prefix}asupan *Ⓛ*
╎│⚡︎」დ ${prefix}ceknik *Ⓕ*
╎│⚡︎」დ ${prefix}random *Ⓛ*
╎│⚡︎」დ ${prefix}react *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menuai = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗮𝗶𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙰𝚒 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}bard *Ⓛ*
╎│⚡︎」დ ${prefix}luhungchat *Ⓞ*
╎│⚡︎」დ ${prefix}luminai *Ⓛ*
╎│⚡︎」დ ${prefix}mora *Ⓕ*
╎│⚡︎」დ ${prefix}tsumuri *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menustore = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝘀𝘁𝗼𝗿𝗲𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝚂𝚝𝚘𝚛𝚎 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}batal *Ⓕ*
╎│⚡︎」დ ${prefix}done *Ⓞ*
╎│⚡︎」დ ${prefix}payment *Ⓕ*
╎│⚡︎」დ ${prefix}tunda *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menuagama = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗮𝗴𝗮𝗺𝗮𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙰𝚐𝚊𝚖𝚊 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}ayatkursi *Ⓕ*
╎│⚡︎」დ ${prefix}bible *Ⓕ*
╎│⚡︎」დ ${prefix}doaharian *Ⓕ*
╎│⚡︎」დ ${prefix}jadwalsholat *Ⓕ*
╎│⚡︎」დ ${prefix}kisahnabi *Ⓕ*
╎│⚡︎」დ ${prefix}niatsholat *Ⓕ*
╎│⚡︎」დ ${prefix}quotesislam *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menudownload = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}gitclone *Ⓛ*
╎│⚡︎」დ ${prefix}instagram *Ⓛ*
╎│⚡︎」დ ${prefix}mediafire *Ⓛ*
╎│⚡︎」დ ${prefix}play *Ⓕ*
╎│⚡︎」დ ${prefix}tiktok *Ⓛ*
╎│⚡︎」დ ${prefix}ytmp3 *Ⓕ*
╎│⚡︎」დ ${prefix}ytmp4 *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menugame = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗴𝗮𝗺𝗲𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙶𝚊𝚖𝚎 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}asahotak *Ⓕ*
╎│⚡︎」დ ${prefix}caklontong *Ⓕ*
╎│⚡︎」დ ${prefix}casino *Ⓕ*
╎│⚡︎」დ ${prefix}catur
╎│⚡︎」დ ${prefix}cowboy *Ⓕ*
╎│⚡︎」დ ${prefix}delpetakbom *Ⓕ*
╎│⚡︎」დ ${prefix}delttt *Ⓕ*
╎│⚡︎」დ ${prefix}family100 *Ⓕ*
╎│⚡︎」დ ${prefix}kuis *Ⓕ*
╎│⚡︎」დ ${prefix}math *Ⓕ*
╎│⚡︎」დ ${prefix}petakbom *Ⓕ*
╎│⚡︎」დ ${prefix}siapakahaku *Ⓕ*
╎│⚡︎」დ ${prefix}slot *Ⓕ*
╎│⚡︎」დ ${prefix}suit *Ⓕ*
╎│⚡︎」დ ${prefix}susunkata *Ⓕ*
╎│⚡︎」დ ${prefix}tebakanime *Ⓕ*
╎│⚡︎」დ ${prefix}tebakbendera *Ⓕ*
╎│⚡︎」დ ${prefix}tebakgambar *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkabupaten *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkalimat *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkata *Ⓕ*
╎│⚡︎」დ ${prefix}tebakkimia *Ⓕ*
╎│⚡︎」დ ${prefix}tebaklagu *Ⓕ*
╎│⚡︎」დ ${prefix}tebaklirik *Ⓕ*
╎│⚡︎」დ ${prefix}tictactoe *Ⓕ*
╎│⚡︎」დ ${prefix}werewolf *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menugroup = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗴𝗿𝗼𝘂𝗽𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙶𝚛𝚘𝚞𝚙 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}add *Ⓕ*
╎│⚡︎」დ ${prefix}antilink *Ⓕ*
╎│⚡︎」დ ${prefix}closetime *Ⓕ*
╎│⚡︎」დ ${prefix}demote *Ⓕ*
╎│⚡︎」დ ${prefix}editdesk *Ⓕ*
╎│⚡︎」დ ${prefix}hidetag *Ⓕ*
╎│⚡︎」დ ${prefix}kick *Ⓕ*
╎│⚡︎」დ ${prefix}linkgc *Ⓕ*
╎│⚡︎」დ ${prefix}opentime *Ⓕ*
╎│⚡︎」დ ${prefix}promote *Ⓕ*
╎│⚡︎」დ ${prefix}resetlinkgc *Ⓕ*
╎│⚡︎」დ ${prefix}sendlinkgc *Ⓕ*
╎│⚡︎」დ ${prefix}setname *Ⓕ*
╎│⚡︎」დ ${prefix}tagall *Ⓕ*
╎│⚡︎」დ ${prefix}tagme *Ⓕ*
╎│⚡︎」დ ${prefix}totag *Ⓕ*
╎│⚡︎」დ ${prefix}welcome *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menumain = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗺𝗮𝗶𝗻𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙼𝚊𝚒𝚗 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}afk *Ⓕ*
╎│⚡︎」დ ${prefix}buylimit *Ⓕ*
╎│⚡︎」დ ${prefix}buyprem *Ⓕ*
╎│⚡︎」დ ${prefix}cekip *Ⓞ*
╎│⚡︎」დ ${prefix}cerpen *Ⓕ*
╎│⚡︎」დ ${prefix}claim *Ⓟ*
╎│⚡︎」დ ${prefix}claimprem *Ⓟ*
╎│⚡︎」დ ${prefix}jarak *Ⓛ*
╎│⚡︎」დ ${prefix}me *Ⓕ*
╎│⚡︎」დ ${prefix}pin *Ⓛ*
╎│⚡︎」დ ${prefix}qc *Ⓛ*
╎│⚡︎」დ ${prefix}qc2 *Ⓛ*
╎│⚡︎」დ ${prefix}redeemcode *Ⓟ*
╎│⚡︎」დ ${prefix}remini *Ⓛ*
╎│⚡︎」დ ${prefix}remini *Ⓕ*
╎│⚡︎」დ ${prefix}ssweb *Ⓛ*
╎│⚡︎」დ ${prefix}sticker *Ⓕ*
╎│⚡︎」დ ${prefix}toimg *Ⓕ*
╎│⚡︎」დ ${prefix}topglobal *Ⓕ*
╎│⚡︎」დ ${prefix}totalfitur *Ⓕ*
╎│⚡︎」დ ${prefix}tourl *Ⓛ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menuowner = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗼𝘄𝗻𝗲𝗿𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙾𝚠𝚗𝚎𝚛 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}addbalance *Ⓞ*
╎│⚡︎」დ ${prefix}addcase *Ⓞ*
╎│⚡︎」დ ${prefix}addlimit *Ⓞ*
╎│⚡︎」დ ${prefix}addprem *Ⓞ*
╎│⚡︎」დ ${prefix}bcgc *Ⓞ*
╎│⚡︎」დ ${prefix}biochange *Ⓞ*
╎│⚡︎」დ ${prefix}buatclaimprem *Ⓞ*
╎│⚡︎」დ ${prefix}buathadiah *Ⓞ*
╎│⚡︎」დ ${prefix}del *Ⓞ*
╎│⚡︎」დ ${prefix}delcase *Ⓞ*
╎│⚡︎」დ ${prefix}delppbot *Ⓞ*
╎│⚡︎」დ ${prefix}delprem *Ⓞ*
╎│⚡︎」დ ${prefix}getbio *Ⓞ*
╎│⚡︎」დ ${prefix}getcase *Ⓞ*
╎│⚡︎」დ ${prefix}getname *Ⓞ*
╎│⚡︎」დ ${prefix}listclaimprem *Ⓞ*
╎│⚡︎」დ ${prefix}listgc *Ⓞ*
╎│⚡︎」დ ${prefix}listhadiah *Ⓞ*
╎│⚡︎」დ ${prefix}listprem *Ⓞ*
╎│⚡︎」დ ${prefix}listregis *Ⓞ*
╎│⚡︎」დ ${prefix}myip *Ⓞ*
╎│⚡︎」დ ${prefix}pay *Ⓞ*
╎│⚡︎」დ ${prefix}public *Ⓞ*
╎│⚡︎」დ ${prefix}restart *Ⓞ*
╎│⚡︎」დ ${prefix}self *Ⓞ*
╎│⚡︎」დ ${prefix}setbotname *Ⓞ*
╎│⚡︎」დ ${prefix}setppbot *Ⓞ*
╎│⚡︎」დ ${prefix}setpppanjang *Ⓞ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menusearch = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝘀𝗲𝗮𝗿𝗰𝗵𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝚂𝚎𝚊𝚛𝚌𝚑 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}cnbcnews *Ⓕ*
╎│⚡︎」დ ${prefix}cnnnews *Ⓕ*
╎│⚡︎」დ ${prefix}detiknews *Ⓕ*
╎│⚡︎」დ ${prefix}fajarnews *Ⓕ*
╎│⚡︎」დ ${prefix}google *Ⓕ*
╎│⚡︎」დ ${prefix}indozonenews *Ⓕ*
╎│⚡︎」დ ${prefix}jalantikus-meme *Ⓕ*
╎│⚡︎」დ ${prefix}kontannews *Ⓕ*
╎│⚡︎」დ ${prefix}lirik *Ⓕ*
╎│⚡︎」დ ${prefix}play *Ⓕ*
╎│⚡︎」დ ${prefix}pokemon *Ⓕ*
╎│⚡︎」დ ${prefix}ttsearch *Ⓕ*
╎│⚡︎」დ ${prefix}yts *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menufun = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗳𝘂𝗻𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙵𝚞𝚗 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}apakah *Ⓕ*
╎│⚡︎」დ ${prefix}benarkah *Ⓕ*
╎│⚡︎」დ ${prefix}cekaku *Ⓕ*
╎│⚡︎」დ ${prefix}cekanjing *Ⓕ*
╎│⚡︎」დ ${prefix}cekbodoh *Ⓕ*
╎│⚡︎」დ ${prefix}cekcabul *Ⓕ*
╎│⚡︎」დ ${prefix}cekcantik *Ⓕ*
╎│⚡︎」დ ${prefix}cekdingin *Ⓕ*
╎│⚡︎」დ ${prefix}cekgay *Ⓕ*
╎│⚡︎」დ ${prefix}cekhomo *Ⓕ*
╎│⚡︎」დ ${prefix}cekjelek *Ⓕ*
╎│⚡︎」დ ${prefix}cekjumlahwaifu *Ⓕ*
╎│⚡︎」დ ${prefix}cekkhodam *Ⓕ*
╎│⚡︎」დ ${prefix}cekkontol *Ⓕ*
╎│⚡︎」დ ${prefix}cekkotor *Ⓕ*
╎│⚡︎」დ ${prefix}cekkucing *Ⓕ*
╎│⚡︎」დ ${prefix}ceklesbi *Ⓕ*
╎│⚡︎」დ ${prefix}ceklucu *Ⓕ*
╎│⚡︎」დ ${prefix}cekmemek *Ⓕ*
╎│⚡︎」დ ${prefix}cekpintar *Ⓕ*
╎│⚡︎」დ ${prefix}ceksempak *Ⓕ*
╎│⚡︎」დ ${prefix}cektampan *Ⓕ*
╎│⚡︎」დ ${prefix}cekwaifu *Ⓕ*
╎│⚡︎」დ ${prefix}dare *Ⓕ*
╎│⚡︎」დ ${prefix}jodoh *Ⓕ*
╎│⚡︎」დ ${prefix}kapan *Ⓕ*
╎│⚡︎」დ ${prefix}pasangan *Ⓕ*
╎│⚡︎」დ ${prefix}truth *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

global.menuother = (prefix) => {
return steks(`> _𝗜𝗻𝗶 𝗺𝗲𝗻𝘂 𝗼𝘁𝗵𝗲𝗿𝗻𝘆𝗮 𝘆𝗮 𝗸𝗮𝗸._
╭୧⍤⃝⊰ɞ──『 *𝙾𝚝𝚑𝚎𝚛 𝙼𝚎𝚗𝚞* 』⏤͟͟͞͞ᖫ
╎╦───═╸
╎│⚡︎」დ ${prefix}asupan *Ⓛ*
╎│⚡︎」დ ${prefix}random *Ⓛ*
╎│⚡︎」დ ${prefix}react *Ⓕ*
╎ ⃟ꕥ╌╌╌╌╌╌╌⊰۝⊱╌╌╌╌╌╌╌⍨⃝   ͟͟ ͞͞ᖫ
`)}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})