require("./setting");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  getAggregateVotesInPollMessage,
  proto
} = require("@whiskeysockets/baileys");
const fs2 = require("fs");
const pino = require("pino");
const chalk = require("chalk");
const path = require("path");
const axios = require("axios");
const FileType = require("file-type");
const readline = require("readline");
const yargs = require("yargs/yargs");
const {
  HttpsProxyAgent
} = require("https-proxy-agent");
const agent = new HttpsProxyAgent("http://proxy:clph123@103.123.63.106:3128");
const lodash = require("lodash");
const {
  Boom
} = require("@hapi/boom");
const PhoneNumber = require("awesome-phonenumber");
const {
  imageToWebp,
  imageToWebp3,
  videoToWebp,
  writeExifImg,
  writeExifImgAV,
  writeExifVid
} = require("./lib/exif");
const {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  await,
  sleep
} = require("./lib/myfunc");
const question = (text) => {
  const readl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise((resolve) => {
    readl.question(text, resolve);
  });
};
var low;
try {
  low = require("lowdb");
} catch (e) {
  low = require("./lib/lowdb");
}
const {
  Low,
  JSONFile
} = low;
const mongoDB = require("./lib/mongoDB");
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(/https?:\/\//.test(opts.db || "") ? new cloudDBAdapter(opts.db) : /mongodb/.test(opts.db) ? new mongoDB(opts.db) : new JSONFile("database/database.json"));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x51cb58 => setInterval(function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x51cb58(global.db.data == null ? global.loadDatabase() : global.db.data);
      } else {
        null;
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    anonymous: {},
    ...(global.db.data || {})
  };
  global.db.chain = lodash.chain(global.db.data);
};
loadDatabase();
if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write();
    }
  }, 30000);
}
async function connectToWhatsApp() {
  const {
    state: stet,
    saveCreds: seC
  } = await useMultiFileAuthState(global.sessionName);
  const sock = makeWASocket({
    logger: pino({
      level: "silent"
    }),
    printQRInTerminal: !usePairingCode,
    auth: stet,
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  });
  if (usePairingCode && !sock.authState.creds.registered) {
    const numberpar = await question("Masukan Nomer Yang Aktif Awali Dengan 62:\n");
    const codepar = await sock.requestPairingCode(numberpar.trim());
    console.log("Pairing code: " + codepar);
  }
  sock.decodeJid = (jid) => {
    if (!jid) {
      return jid;
    }
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {};
      return decode.user && decode.server && decode.user + "@" + decode.server || jid;
    } else {
      return jid;
    }
  };
  sock.ev.on("messages.upsert", async chatUpdate => {
    try {
      mek = chatUpdate.messages[0];
      if (!mek.message) {
        return;
      }
      mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!sock.public && !mek.key.fromMe && chatUpdate.type === "notify") {
        return;
      }
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) {
        return;
      }
      m = smsg(sock, mek, store);
      require("./Tsu Cmd.js")(sock, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });
  sock.ev.on("call", async (calln) => {
    let useridd = await sock.decodeJid(sock.user.id);
    let ntcall = global.anticall;
    if (!ntcall) {
      return;
    }
    console.log(calln);
    for (let ncall of calln) {
      if (ncall.isGroup == false) {
        if (ncall.status == "offer") {
          let ntcallsendm = await sock.sendTextWithMentions(ncall.from, "*" + sock.user.name + "* tidak bisa menerima panggilan " + (ncall.isVideo ? "video" : "suara") + ". Maaf @" + ncall.from.split("@")[0] + " kamu akan diblokir. Silahkan hubungi Owner membuka blok !");
          sock.sendContact(ncall.from, owner.map(mc => mc.split("@")[0]), ntcallsendm);
          await sleep(8000);
          await sock.updateBlockStatus(ncall.from, "block");
        }
      }
    }
  });
  sock.ev.on("contacts.update", update => {
    for (let contact of update) {
      let jid = sock.decodeJid(contact.id);
      if (store && store.contacts) {
        store.contacts[jid] = {
          id: jid,
          name: contact.notify
        };
      }
    }
  });
    sock.getName = (jid, withoutContact = false) => {
      let id = sock.decodeJid(jid)
      withoutContact = sock.withoutContact || withoutContact
      let v
      if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
        v = store.contacts[id] || {}
        if (!(v.name || v.subject)) v = sock.groupMetadata(id) || {}
        resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
      })
      else v = id === '0@s.whatsapp.net' ? {
          id,
          name: 'WhatsApp'
        } : id === sock.decodeJid(sock.user.id) ?
        sock.user :
        (store.contacts[id] || {})
      return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    sock.sendContact = async (jid, kon, quoted = '', opts = {}) => {
      let list = []
      for (let i of kon) {
        list.push({
          displayName: await sock.getName(i + '@s.whatsapp.net'),
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await sock.getName(i + '@s.whatsapp.net')}\nFN:${await sock.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:AditGantengJir@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://chat.whatsapp.com/CfoZa7yhouZ51XXYM3lKY7\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
        })
      }

      sock.sendMessage(jid, {
        contacts: {
          displayName: `${list.length} Kontak`,
          contacts: list
        },
        ...opts
      }, {
        quoted
      })
    }
    
    sock.public = true
    sock.ev.on('creds.update', seC)
    sock.downloadMediaMessage = async (message) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      return buffer
    }
    sock.sendImage = async (jid, path, caption = '', quoted = '', options) => {
      let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      return await sock.sendMessage(jid, {
        image: buffer,
        caption: caption,
        ...options
      }, {
        quoted
      })
    }
    sock.sendText = (jid, text, quoted = '', options) => sock.sendMessage(jid, {
      text: text,
      ...options
    }, {
      quoted
    });
    sock.sendTextWithMentions = async (jid, text, quoted, options = {}) => sock.sendMessage(jid, {
      text: text,
      contextInfo: {
        mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net')
      },
      ...options
    }, {
      quoted
    })
    sock.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
      let buffer
      if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options)
      }
      else {
        buffer = await imageToWebp(buff)
      }
      await sock.sendMessage(jid, {
        sticker: {
          url: buffer
        },
        ...options
      }, {
        quoted
      })
      return buffer
    }
  sock.sendImageAsStickerAV = async (jid, path, quote, options = {}) => {
    let _0x1a8627 = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs2.existsSync(path) ? fs2.readFileSync(path) : Buffer.alloc(0);
    let _0x44c2b4;
    if (options && (options.packname || options.author)) {
      _0x44c2b4 = await writeExifImgAV(_0x1a8627, options);
    } else {
      _0x44c2b4 = await imageToWebp2(_0x1a8627);
    }
    await sock.sendMessage(jid, {
      sticker: {
        url: _0x44c2b4
      },
      ...options
    }, {
      quoted: quote
    });
    return _0x44c2b4;
  };
  sock.sendImageAsStickerAvatar = async (jid, path, quote, options = {}) => {
    let _0x5610f8 = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs2.existsSync(path) ? fs2.readFileSync(path) : Buffer.alloc(0);
    let _0x352711;
    if (options && (options.packname || options.author)) {
      _0x352711 = await writeExifImg(_0x5610f8, options);
    } else {
      _0x352711 = await imageToWebp3(_0x5610f8);
    }
    await sock.sendMessage(jid, {
      sticker: {
        url: _0x352711
      },
      ...options
    }, {
      quoted: quote
    });
    return _0x352711;
  };
  sock.sendVideoAsSticker = async (jid, path, quote, options = {}) => {
    let bufsti = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], "base64") : /^https?:\/\//.test(path) ? await await getBuffer(path) : fs2.existsSync(path) ? fs2.readFileSync(path) : Buffer.alloc(0);
    let urlstiker;
    if (options && (options.packname || options.author)) {
      urlstiker = await writeExifVid(bufsti, options);
    } else {
      urlstiker = await videoToWebp(bufsti);
    }
    await sock.sendMessage(jid, {
      sticker: {
        url: urlstiker
      },
      ...options
    }, {
      quoted: quote
    });
    return urlstiker;
  };
  // Button nya bisa banyak
    sock.sendButton = async (jid, text = "", footer = "", buttons = [], quoted = null) => {
    try {
        let interactiveButtons = buttons.map(button => {
            if (button.type === 'url') {
                return {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: button.text,
                        url: button.url,
                        merchant_url: button.url
                    })
                };
            } else if (button.type === 'copy') {
                return {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: button.text,
                        id: button.id,
                        copy_code: button.copy_code
                    })
                };
            } else if (button.type === 'buttons') {
                return {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: button.text,
                        id: button.id
                    })
                };
            }
        });

        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({ text }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: interactiveButtons
                        })
                    })
                }
            }
        }, { userJid: jid, quoted: quoted });

        await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
    } catch (e) {
        console.error("Error sending button message:", e);
    }
};
  // Button nya bisa banyak dengan img
    sock.sendButtonImg = async (jid, text = "", footer = "", buttons = [], imageUrl = "", quoted = null) => {
    try {
    console.log('imageUrl:', imageUrl, 'Type:', typeof imageUrl);
    if (typeof imageUrl !== 'string') {
      throw new TypeError('The "imageUrl" argument must be of type string.');
    }
        let interactiveButtons = buttons.map(button => {
            if (button.type === 'url') {
                return {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: button.text,
                        url: button.url,
                        merchant_url: button.url
                    })
                };
            } else if (button.type === 'copy') {
                return {
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: button.text,
                        id: button.id,
                        copy_code: button.copy_code
                    })
                };
            } else if (button.type === 'buttons') {
                return {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: button.text,
                        id: button.id
                    })
                };
            } /*else if (button.type === 'select') {
              let sections = buttons;
              let listMessage = {
                title: title,
                sections
                };
                return {
                    name: "single_select",
                    buttonParamsJson: JSON.stringify({
                    listMessage
                    })
                };
            }*/
        });

    let preparedMedia = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: sock.waUploadToServer });
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({ text }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: footer }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: true, ...preparedMedia }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: interactiveButtons
                        })
                    })
                }
            }
        }, { userJid: jid, quoted: quoted });

        await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
    } catch (e) {
        console.error("Error sending button message:", e);
    }
};
    /**
      * Function Send Button Biar Hemat Energi ngetik
      * Ini send Button Biasa
      */
    sock.sendButtonMsg = async (jid, text = "", footer = "", buttons = [], quoted = null) => {
    try {
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: text
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: footer
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttons.map(button => ({
                                "name": "quick_reply",
                                "buttonParamsJson": JSON.stringify({
                                    "display_text": button.text,
                                    "id": button.id
                                })
                            }))
                        })
                    })
                }
            }
        }, { userJid: jid, quoted: quoted });

        await sock.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });
    } catch (e) {
        console.error("Error sending button message:", e);
    }
};
    /**
      * Ini Function Send Button Yang Ada Gambarnya
      */
      sock.sendButtonMsgImg = async (jid, text = "", footer = "", buttons = [], imageUrl = "", quoted = null) => {
    try {
    console.log('imageUrl:', imageUrl, 'Type:', typeof imageUrl);
    if (typeof imageUrl !== 'string') {
      throw new TypeError('The "imageUrl" argument must be of type string.');
    }
    let preparedMedia = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: sock.waUploadToServer });
        let msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    "messageContextInfo": {
                        "deviceListMetadata": {},
                        "deviceListMetadataVersion": 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: text
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: footer
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: '',
                            hasMediaAttachment: true,
                            ...preparedMedia
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttons.map(button => ({
                                "name": "quick_reply",
                                "buttonParamsJson": JSON.stringify({
                                    "display_text": button.text,
                                    "id": button.id
                                })
                            }))
                        })
                    })
                }
            }
        }, { userJid: jid, quoted: quoted });

        await sock.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });
    } catch (e) {
        console.error("Error sending button message:", e);
    }
}

sock.sendButtonCard = async (jid, text, footer, cards, quoted = null) => {
  try {
    let preparedCards = await Promise.all(cards.map(async (card) => {
      let preparedMedia = await prepareWAMessageMedia({ image: { url: card.imageUrl } }, { upload: sock.waUploadToServer });
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: card.body }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: card.footer }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: card.header,
          hasMediaAttachment: true,
          ...preparedMedia
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: card.buttons.map(button => {
            if (button.type === 'url') {
              return {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                  display_text: button.text,
                  url: button.url,
                  merchant_url: button.url
                })
              };
            } else if (button.type === 'buttons') {
              return {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: button.text,
                  id: button.id
                })
              };
            }
          })
        })
      };
    }));

    let msg = generateWAMessageFromContent(jid, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.fromObject({ text }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: footer }),
            header: proto.Message.InteractiveMessage.Header.fromObject({ hasMediaAttachment: false }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: preparedCards
            })
          })
        }
      }
    }, { userJid: jid, quoted: quoted });

    await sock.relayMessage(jid, msg.message, { messageId: msg.key.id });
  } catch (e) {
    console.error("Error sending button card message:", e);
  }
};

  sock.sendListWithImage = async (jid, bodyteks, listmsg, foter, urlthum, quot = {}) => {
    let msgss = generateWAMessageFromContent(jid, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            contextInfo: {
              mentionedJid: null,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: idsaluran,
                newsletterName: "Tsumuri - Md",
                serverMessageId: -1
              },
              businessMessageForwardInfo: {
                businessOwnerJid: "62856649683709@s.whatsapp.net"
              },
              externalAdReply: {
                title: "Tsumuri - Md",
                thumbnailUrl: urlthum,
                sourceUrl: url,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            },
            body: proto.Message.InteractiveMessage.Body.create({
              text: bodyteks
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: foter
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: "Tsumuri",
              subtitle: "Tsumuri - Md",
              hasMediaAttachment: true,
              ...(await prepareWAMessageMedia({
                image: {
                  url: urlthum
                }
              }, {
                upload: sock.waUploadToServer
              }))
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [{
                name: "single_select",
                buttonParamsJson: JSON.stringify(listmsg)
              }]
            })
          })
        }
      }
    }, {
      quoted: quot || m
    });
    await sock.relayMessage(msgss.key.remoteJid, msgss.message, {
      messageId: msgss.key.id,
      quoted: quot || m
    });
  };
  sock.sendList = async (jid, bodyteks, foterteks, listmsg, quote = {}) => {
    let msgs = generateWAMessageFromContent(jid, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            ...quote,
            body: proto.Message.InteractiveMessage.Body.create({
              text: bodyteks
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: foterteks || "Powered By KayyTwelve"
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [{
                name: "single_select",
                buttonParamsJson: JSON.stringify(listmsg)
              }]
            })
          })
        }
      }
    }, {});
    return await sock.relayMessage(msgs.key.remoteJid, msgs.message, {
      messageId: msgs.key.id
    });
  };
  sock.downloadAndSaveMediaMessage = async (_0x9f110a, _0x1dd884, _0x2e49c3 = true) => {
    let _0x334196 = _0x9f110a.msg ? _0x9f110a.msg : _0x9f110a;
    let _0x3e87e2 = (_0x9f110a.msg || _0x9f110a).mimetype || "";
    let _0xed2f8 = _0x9f110a.mtype ? _0x9f110a.mtype.replace(/Message/gi, "") : _0x3e87e2.split("/")[0];
    const _0x4fa9ad = await downloadContentFromMessage(_0x334196, _0xed2f8);
    let _0x17513c = Buffer.from([]);
    for await (const _0x296031 of _0x4fa9ad) {
      _0x17513c = Buffer.concat([_0x17513c, _0x296031]);
    }
    let _0x545a1a = await FileType.fromBuffer(_0x17513c);
    trueFileName = _0x2e49c3 ? _0x1dd884 + "." + _0x545a1a.ext : _0x1dd884;
    await fs2.writeFileSync(trueFileName, _0x17513c);
    return trueFileName;
  };
  sock.cMod = (_0x3eb323, _0x2b908a, _0x2e4136 = "", _0x473b0f = sock.user.id, _0x1e49f8 = {}) => {
    let _0xc0b678 = Object.keys(_0x2b908a.message)[0];
    let _0x17f909 = _0xc0b678 === "ephemeralMessage";
    if (_0x17f909) {
      _0xc0b678 = Object.keys(_0x2b908a.message.ephemeralMessage.message)[0];
    }
    let _0x3187ae = _0x17f909 ? _0x2b908a.message.ephemeralMessage.message : _0x2b908a.message;
    let _0x5026ca = _0x3187ae[_0xc0b678];
    if (typeof _0x5026ca === "string") {
      _0x3187ae[_0xc0b678] = _0x2e4136 || _0x5026ca;
    } else if (_0x5026ca.caption) {
      _0x5026ca.caption = _0x2e4136 || _0x5026ca.caption;
    } else if (_0x5026ca.text) {
      _0x5026ca.text = _0x2e4136 || _0x5026ca.text;
    }
    if (typeof _0x5026ca !== "string") {
      _0x3187ae[_0xc0b678] = {
        ..._0x5026ca,
        ..._0x1e49f8
      };
    }
    if (_0x2b908a.key.participant) {
      _0x473b0f = _0x2b908a.key.participant = _0x473b0f || _0x2b908a.key.participant;
    } else if (_0x2b908a.key.participant) {
      _0x473b0f = _0x2b908a.key.participant = _0x473b0f || _0x2b908a.key.participant;
    }
    if (_0x2b908a.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x473b0f = _0x473b0f || _0x2b908a.key.remoteJid;
    } else if (_0x2b908a.key.remoteJid.includes("@broadcast")) {
      _0x473b0f = _0x473b0f || _0x2b908a.key.remoteJid;
    }
    _0x2b908a.key.remoteJid = _0x3eb323;
    _0x2b908a.key.fromMe = _0x473b0f === sock.user.id;
    return proto.WebMessageInfo.fromObject(_0x2b908a);
  };
  sock.sendFile2 = async (jid, file, name = "", filecap = "", quote, pttt = false, options = {}) => {
    let getfile = await sock.getFile(file, true);
    let {
      res: resp,
      data: dat,
      filename: filenam
    } = getfile;
    if (resp && resp.status !== 200 || dat.length <= 65536) {
      try {
        throw {
          json: JSON.parse(dat.toString())
        };
      } catch (_0x1dc6c8) {
        if (_0x1dc6c8.json) {
          throw _0x1dc6c8.json;
        }
      }
    }
    let file1 = {
      filename: name
    };
    if (quote) {
      file1.quoted = quote;
    }
    if (!getfile) {
      options.asDocument = true;
    }
    let type1 = "";
    let mimetyp = getfile.mime;
    let mimetyp2;
    if (/webp/.test(getfile.mime) || /image/.test(getfile.mime) && options.asSticker) {
      type1 = "sticker";
    } else if (/image/.test(getfile.mime) || /webp/.test(getfile.mime) && options.asImage) {
      type1 = "image";
    } else if (/video/.test(getfile.mime)) {
      type1 = "video";
    } else if (/audio/.test(getfile.mime)) {
      mimetyp2 = await (pttt ? toPTT : toAudio)(dat, getfile.ext);
      dat = mimetyp2.data;
      filenam = mimetyp2.filename;
      type1 = "audio";
      mimetyp = "audio/ogg; codecs=opus";
    } else {
      type1 = "document";
    }
    if (options.asDocument) {
      type1 = "document";
    }
    delete options.asSticker;
    delete options.asLocation;
    delete options.asVideo;
    delete options.asDocument;
    delete options.asImage;
    let gtfile2 = {
      ...options,
      caption: filecap,
      ptt: pttt,
      [type1]: {
        url: filenam
      },
      mimetype: mimetyp
    };
    let filed;
    try {
      filed = await sock.sendMessage(jid, gtfile2, {
        ...file1,
        ...options
      });
    } catch (_0x458af3) {
      filed = null;
    } finally {
      if (!filed) {
        filed = await sock.sendMessage(jid, {
          ...gtfile2,
          [type1]: dat
        }, {
          ...file1,
          ...options
        });
      }
      dat = null;
      return filed;
    }
  };
  sock.sendFile = async (jid, filep, name, quote = {}, options = {}) => {
    let _0x115625 = await sock.getFile(filep, true);
    let {
      filename: _0x2c8596,
      size: _0x14099e,
      ext: _0x19ab67,
      mime: _0xaffea0,
      data: _0x163b7f
    } = _0x115625;
    let _0xf823a0 = "";
    let _0x19ef20 = _0xaffea0;
    let _0x53682a = _0x2c8596;
    if (options.asDocument) {
      _0xf823a0 = "document";
    }
    if (options.asSticker || /webp/.test(_0xaffea0)) {
      let {
        writeExif: _0x3fbadd
      } = require("./lib/sticker.js");
      let _0x5e9aee = {
        mimetype: _0xaffea0,
        data: _0x163b7f
      };
      _0x53682a = await _0x3fbadd(_0x5e9aee, {
        packname: global.packname,
        author: global.packname2,
        categories: options.categories ? options.categories : []
      });
      await fs2.promises.unlink(_0x2c8596);
      _0xf823a0 = "sticker";
      _0x19ef20 = "image/webp";
    } else if (/image/.test(_0xaffea0)) {
      _0xf823a0 = "image";
    } else if (/video/.test(_0xaffea0)) {
      _0xf823a0 = "video";
    } else if (/audio/.test(_0xaffea0)) {
      _0xf823a0 = "audio";
    } else {
      _0xf823a0 = "document";
    }
    await sock.sendMessage(jid, {
      [_0xf823a0]: {
        url: _0x53682a
      },
      mimetype: _0x19ef20,
      fileName: name,
      ...options
    }, {
      quoted: quote,
      ...options
    });
    return fs2.promises.unlink(_0x53682a);
  };
  sock.parseMention = async _0x388313 => {
    return [..._0x388313.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x2431ef => _0x2431ef[1] + "@s.whatsapp.net");
  };
  sock.copyNForward = async (_0x38263d, _0x3fd1c9, _0xaab94d = false, _0x5eb5d0 = {}) => {
    let _0x389acb;
    if (_0x5eb5d0.readViewOnce) {
      _0x3fd1c9.message = _0x3fd1c9.message && _0x3fd1c9.message.ephemeralMessage && _0x3fd1c9.message.ephemeralMessage.message ? _0x3fd1c9.message.ephemeralMessage.message : _0x3fd1c9.message || undefined;
      _0x389acb = Object.keys(_0x3fd1c9.message.viewOnceMessage.message)[0];
      delete (_0x3fd1c9.message && _0x3fd1c9.message.ignore ? _0x3fd1c9.message.ignore : _0x3fd1c9.message || undefined);
      delete _0x3fd1c9.message.viewOnceMessage.message[_0x389acb].viewOnce;
      _0x3fd1c9.message = {
        ..._0x3fd1c9.message.viewOnceMessage.message
      };
    }
    let _0x37e7e9 = Object.keys(_0x3fd1c9.message)[0];
    let _0x5b559e = await generateForwardMessageContent(_0x3fd1c9, _0xaab94d);
    let _0x5b44dd = Object.keys(_0x5b559e)[0];
    let _0x297f3e = {};
    if (_0x37e7e9 != "conversation") {
      _0x297f3e = _0x3fd1c9.message[_0x37e7e9].contextInfo;
    }
    _0x5b559e[_0x5b44dd].contextInfo = {
      ..._0x297f3e,
      ..._0x5b559e[_0x5b44dd].contextInfo
    };
    const _0x37bc6c = await generateWAMessageFromContent(_0x38263d, _0x5b559e, _0x5eb5d0 ? {
      ..._0x5b559e[_0x5b44dd],
      ..._0x5eb5d0,
      ...(_0x5eb5d0.contextInfo ? {
        contextInfo: {
          ..._0x5b559e[_0x5b44dd].contextInfo,
          ..._0x5eb5d0.contextInfo
        }
      } : {})
    } : {});
    await sock.relayMessage(_0x38263d, _0x37bc6c.message, {
      messageId: _0x37bc6c.key.id
    });
    return _0x37bc6c;
  };
  sock.sendReact = async (_0x57c283, _0x4d6ee8, _0x4ec66a = {}) => {
    let _0x57eb95 = {
      react: {
        text: _0x4d6ee8,
        key: _0x4ec66a
      }
    };
    return await sock.sendMessage(_0x57c283, _0x57eb95);
  };
  sock.ev.on("group-participants.update", async getgroup => {
    if (!wlcm.includes(getgroup.id)) {
      return;
    }
    console.log(getgroup);
    try {
      let groupget = await sock.groupMetadata(getgroup.id);
      let _0x152856 = getgroup.participants;
      for (let sender of _0x152856) {
        try {
          ppuser = await sock.profilePictureUrl(sender, "image");
        } catch {
          ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
        }
        try {
          ppgroup = await sock.profilePictureUrl(getgroup.id, "image");
        } catch {
          ppgroup = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
        }
        if (getgroup.action == "add") {
          let _0x47f8c5 = "Hai @" + sender.split("@")[0] + " 👋\nSelamat datang di group " + groupget.subject +"\nSemoga betah ya 😁\n╺──────╼╾──────╸\nDeskripsi:\n" + groupget.desc + "\n━───────┄┄┈┈─━"
          sock.sendMessage(getgroup.id, {
            document: fs2.readFileSync("./package.json"),
            thumbnailUrl: ppuser,
            mimetype: "application/pdf",
            fileLength: 99999,
            pageCount: "100",
            fileName: "WELCOME",
            caption: _0x47f8c5,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: "© Welcome Message",
                body: "" + botname,
                thumbnailUrl: ppuser,
                sourceUrl: "",
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          });
        } else if (getgroup.action == "remove") {
          let _0x119869 = "Dadah @" + sender.split("@")[0] + " 👋\nKeluar dari " + groupget.subject + " \naku akan merindukanmu"
          sock.sendMessage(getgroup.id, {
            document: fs2.readFileSync("./package.json"),
            thumbnailUrl: ppuser,
            mimetype: "application/pdf",
            fileLength: 99999,
            pageCount: "100",
            fileName: "GOODBYE",
            caption: _0x119869,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: "© GoodBye Message",
                body: "" + botname,
                thumbnailUrl: ppuser,
                sourceUrl: "",
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          });
          sock.sendMessage(`${sender.split('@')[0]}@s.whatsapp.net`, {
            document: fs2.readFileSync("./package.json"),
            thumbnailUrl: ppuser,
            mimetype: "application/pdf",
            fileLength: 99999,
            pageCount: "100",
            fileName: "GOODBYE",
            caption: _0x119869,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: "© GoodBye Message",
                body: "" + botname,
                thumbnailUrl: ppuser,
                sourceUrl: "",
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          });
        } else if (getgroup.action == "promote") {
          let _0x4a83e8 = "Selamat @" + sender.split("@")[0] + ", telah dijadikan Admin di group " + groupget.subject + " 🎉";
          sock.sendMessage(getgroup.id, {
            document: fs2.readFileSync("./package.json"),
            thumbnailUrl: ppuser,
            mimetype: "application/pdf",
            fileLength: 99999,
            pageCount: "100",
            fileName: "Selamat!!!",
            caption: _0x4a83e8,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: "Promoted In " + groupget.subject,
                body: "" + botname,
                thumbnailUrl: ppuser,
                sourceUrl: "",
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          });
        } else if (getgroup.action == "demote") {
          let _0x4aa520 = "Yahh @" + sender.split("@")[0] + ", telah diunadmin di group " + groupget.subject + " 💢";
          sock.sendMessage(getgroup.id, {
            document: fs2.readFileSync("./package.json"),
            thumbnailUrl: ppuser,
            mimetype: "application/pdf",
            fileLength: 99999,
            pageCount: "100",
            fileName: "Diunadmin!!",
            caption: _0x4aa520,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                title: "Demoted In " + groupget.subject,
                body: "" + botname,
                thumbnailUrl: ppuser,
                sourceUrl: "",
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  sock.getFile = async (_0x5c5c95, _0x53fe38) => {
    let _0x3911e5;
    let _0x5e3351 = Buffer.isBuffer(_0x5c5c95) ? _0x5c5c95 : /^data:.*?\/.*?;base64,/i.test(_0x5c5c95) ? Buffer.from(_0x5c5c95.split`,`[1], "base64") : /^https?:\/\//.test(_0x5c5c95) ? await (_0x3911e5 = await getBuffer(_0x5c5c95)) : fs2.existsSync(_0x5c5c95) ? (filename = _0x5c5c95, fs2.readFileSync(_0x5c5c95)) : typeof _0x5c5c95 === "string" ? _0x5c5c95 : Buffer.alloc(0);
    let _0x1508c8 = (await FileType.fromBuffer(_0x5e3351)) || {
      mime: "application/octet-stream",
      ext: ".bin"
    };
    filename = path.join(__filename, "../src/" + new Date() * 1 + "." + _0x1508c8.ext);
    if (_0x5e3351 && _0x53fe38) {
      fs2.promises.writeFile(filename, _0x5e3351);
    }
    return {
      res: _0x3911e5,
      filename: filename,
      size: await getSizeMedia(_0x5e3351),
      ..._0x1508c8,
      data: _0x5e3351
    };
  };
  sock.serializeM = serialz => smsg(sock, serialz, store);
  sock.ev.on("connection.update", async coneup => {
    const {
      connection: cone,
      lastDisconnect: ladcon
    } = coneup;
    if (cone === "close") {
      let boomm = new Boom(ladcon?.error)?.output.statusCode;
      if (boomm === DisconnectReason.badSession) {
        console.log("Bad Session File, Please Delete Session and Scan Again");
        process.exit();
      } else if (boomm === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        connectToWhatsApp();
      } else if (boomm === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        connectToWhatsApp();
      } else if (boomm === DisconnectReason.connectionReplaced) {
        console.log("Connection Replaced, Another New Session Opened, Please Restart Bot");
        process.exit();
      } else if (boomm === DisconnectReason.loggedOut) {
        console.log("Device Logged Out, Please Delete Folder Session yusril and Scan Again.");
        process.exit();
      } else if (boomm === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        connectToWhatsApp();
      } else if (boomm === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        connectToWhatsApp();
      } else {
        console.log("Unknown DisconnectReason: " + boomm + "|" + cone);
        connectToWhatsApp();
      }
    } else if (cone === "open") {
      console.log("Tsumuri - Md\nCONNECT TO = " + JSON.stringify(sock.user, null, 2));
      if (global.db.data == null) {
        await loadDatabase();
      }
      sock.sendMessage(`${ownerno1}@s.whatsapp.net`, {
        text: "*[ Berhasil Terhubung Ke Tsumuri - Md ]*"
      });
    }
  });
  return sock;
}
connectToWhatsApp();
let file = require.resolve(__filename);
fs2.watchFile(file, () => {
  fs2.unwatchFile(file);
  console.log(chalk.redBright("Update " + __filename));
  delete require.cache[file];
  require(file);
});