import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'
import Pino from 'pino'


/**
 * @type {import("@whiskeysockets/baileys")}
 */
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms =>
  isNumber(ms) &&
  new Promise(resolve =>
    setTimeout(function () {
      clearTimeout(this)
      resolve()
    }, ms)
  )

/**
 * Handle messages upsert
 * @param {import("@whiskeysockets/baileys").BaileysEventMap<unknown>["messages.upsert"]} groupsUpdate
 */
const { getAggregateVotesInPollMessage, makeInMemoryStore, proto } = await (
  await import('@whiskeysockets/baileys')
).default
const store = makeInMemoryStore({
  logger: Pino().child({
    level: 'fatal',
    stream: 'store',
  }),
})
export async function handler(chatUpdate) {
    this.msgqueque = this.msgqueque || []
    if (!chatUpdate)
        return
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m)
        return
    if (global.db.data == null)
        await global.loadDatabase()
    try {
        m = smsg(this, m) || m
        if (!m)
            return
            m.exp = 0
            m.credit = false
            m.bank = false
            m.chicken = false
        try {
            // TODO: use loop to insert data instead of this
            let user = global.db.data.users[m.sender]
            if (typeof user !== "object")
                global.db.data.users[m.sender] = {}
            if (user) {
                if (!isNumber(user.exp))
                    user.exp = 0
                if (!isNumber(user.credit))
                    user.credit = 10
                if (!isNumber(user.bank))
                    user.bank = 0
                if (!isNumber(user.chicken))
                    user.chicken = 0  
                if (!isNumber(user.lastclaim))
                    user.lastclaim = 0
                if (!('registered' in user))
                    user.registered = false
                    //-- user registered 
                if (!user.registered) {
                    if (!('name' in user))
                        user.name = m.name
                    if (!isNumber(user.age))
                        user.age = -1
                    if (!isNumber(user.regTime))
                        user.regTime = -1
                }
                //--user number
                if (!isNumber(user.afk))
                    user.afk = -1
                if (!('afkReason' in user))
                    user.afkReason = ''
                if (!('banned' in user))
                    user.banned = false
                if (!isNumber(user.warn))
                    user.warn = 0
                if (!isNumber(user.level))
                    user.level = 0
                if (!('role' in user))
                    user.role = 'Tadpole'
		    if (!('language' in user))
                    user.language = 'en'
                if (!('autolevelup' in user))
                    user.autolevelup = false
            } else {
                global.db.data.users[m.sender] = {
                    exp: 0,
                    credit: 0,
                    bank: 0,
                    chicken: 0,
                    lastclaim: 0,
                    registered: false,
                    name: m.name,
                    age: -1,
                    regTime: -1,
                    afk: -1,
                    afkReason: '',
                    banned: false,
                    warn: 0,
		    language: 'en',
                    level: 0,
                    role: 'Tadpole',
                    autolevelup: false,
                    
                }
                }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== "object")
                global.db.data.chats[m.chat] = {}
            if (chat) {
if (!("antiDelete" in chat)) chat.antiDelete = true
if (!("antdeletelinks" in chat)) chat.antdeletelinks = true 
if (!("antiSticker" in chat)) chat.antiSticker = false
if (!("antiToxic" in chat)) chat.antiToxic = false
if (!('antiver' in chat)) chat.antiver = false 
if (!('anticmds' in chat)) chat.anticmds = false
if (!('testf' in chat)) chat.testf = false		    
if (!('antiPorn' in chat)) chat.antiPorn = true         
if (!('antiLink2' in chat)) chat.antiLink2 = false
if (!('antiTiktok' in chat)) chat.antiTiktok = false
if (!('antiYoutube' in chat)) chat.antiYoutube = false
if (!('antiTelegram' in chat)) chat.antiTelegram = false
if (!('antiFacebook' in chat)) chat.antiFacebook = false
if (!('antiInstagram' in chat)) chat.antiInstagram = false
if (!('antiTwitter' in chat)) chat.antiTwitter = false
if (!('antiDiscord' in chat)) chat.antiDiscord = false
if (!('antiThreads' in chat)) chat.antiThreads = false 
if (!('antiTwitch' in chat)) chat.antiTwitch = false
if (!('antifake' in chat)) chat.antifake = false
if (!("detect" in chat)) chat.detect = true
if (!("autoapprove" in chat)) chat.autoapprove = false
if (!("getmsg" in chat)) chat.getmsg = true
if (!("isBanned" in chat)) chat.isBanned = false
if (!("nsfw" in chat)) chat.nsfw = false
if (!("sBye" in chat)) chat.sBye = ""
if (!("sDemote" in chat)) chat.sDemote = ""
if (!("simi" in chat)) chat.simi = false
if (!("sPromote" in chat)) chat.sPromote = ""
if (!("sWelcome" in chat)) chat.sWelcome = ""
if (!("useDocument" in chat)) chat.useDocument = false
if (!("viewOnce" in chat)) chat.viewOnce = false
if (!("viewStory" in chat)) chat.viewStory = false
if (!('antiBotClone' in chat)) chat.antiBotClone = false
if (!('antiBot' in chat)) chat.antiBot = false
if (!("welcome" in chat)) chat.welcome = false
if (!("chatbot" in chat)) chat.chatbot = false
if (!("princechat" in chat)) chat.princechat = false
if (!isNumber(chat.expired)) chat.expired = 0
		   
} else
		    
global.db.data.chats[m.chat] = {
antiDelete: true,
antdeletelinks: false, 
antiSticker: false,
antiToxic: false,
antiver: true,
antiPorn: true,
anticmds: false,
antiLink2: false,
testf: false,
antiTiktok: false,
antiYoutube: false,
antiTelegram: false,
antiFacebook: false,
antiInstagram: false,
antiTwitter: false,
antiDiscord: false,
antiThreads: false,
antiTwitch: false,
antifake: false,
antiBotClone: false,
antiBot: false,
detect: true,
autoapprove: false,
expired: 0,
getmsg: true,
isBanned: false,
nsfw: false, 
sBye: "",
sDemote: "",
simi: false,
sPromote: "",
sticker: false,
sWelcome: "",
useDocument: false,
viewOnce: false,
viewStory: false,
welcome: false,
princechat: false,                    
chatbot: false
			
                }
          
              
            var settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== "object") global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!("self" in settings)) settings.self = false
                if (!("autoread" in settings)) settings.autoread = false
                if (!("autoread2" in settings)) settings.autoread2 = false
                if (!("restrict" in settings)) settings.restrict = false
	     // if (!('antiCall' in settings)) settings.antiCall = false
                if (!("restartDB" in settings)) settings.restartDB = 0
                if (!("status" in settings)) settings.status = 0
	        if (!('pconly' in settings)) settings.pconly = false // The bot responds only for dm
                if (!('gconly' in settings)) settings.gconly = false // The bot responds only in groups

            } else global.db.data.settings[this.user.jid] = {
                self: false,
                autoread: false,
		autoread2: false,
                restrict: false,
	     // antiCall: false,
                restartDB: 0,
		solopv: false, 
                sologp: false,
                status: 0
            }
        } catch (e) {
            console.error(e)
        }
        if (opts["nyimak"]) return
	if (!m.fromMe && opts['self'])  return
        //if (opts["pconly"] && m.chat.endsWith("g.us")) return
        //if (opts["gconly"] && !m.chat.endsWith("g.us")) return 
        if (opts["swonly"] && m.chat !== "status@broadcast") return
        if (typeof m.text !== "string")
            m.text = ""
/*const Online = !(typeof process.env.AlwaysOnline === 'undefined' || process.env.AlwaysOnline.toLowerCase() === 'false'); 
if (Online) { conn.sendPresenceUpdate('available', m.chat); } else { conn.sendPresenceUpdate('unavailable', m.chat);}    
	    */

if (settings.alwaysonline) {
    conn.sendPresenceUpdate('available', m.chat);
} else {
    conn.sendPresenceUpdate('unavailable', m.chat);
}
     
	   /* const specificGroup = '120363032639627036@g.us';
const allowedSender = '923180434543@s.whatsapp.net';
if (m.chat === specificGroup && m.sender !== allowedSender) {
	return;
}*/

        if (settings.pconly && m.chat.endsWith('g.us')) return  
        if (settings.gconly && !m.chat.endsWith('g.us')) return 
        
	//if (m.chat !== '120363032639627036@g.us') return
       // if (m.chat === '120363032639627036@g.us' && m.sender !== '923180434543@s.whatsapp.net') return;


        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)

        if (opts["queque"] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque,
                time = 1000 * 5
            const previousID = queque[queque.length - 1]
            queque.push(m.id || m.key.id)
            setInterval(async function() {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                await delay(time)
            }, time)
        }
         if (process.env.MODE && process.env.MODE.toLowerCase() === 'private' && !(isROwner || isOwner))
          return;

        
        if (m.isBaileys)
            return 
	    
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
        const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == conn.user.jid) : {}) || {} // Your Data
        const isRAdmin = user?.admin == "superadmin" || false
        const isAdmin = isRAdmin || user?.admin == "admin" || false // Is User Admin?
        const isBotAdmin = bot?.admin || false // Are you Admin?

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "./plugins")
        for (let name in global.plugins) {
            let plugin = global.plugins[name]
            if (!plugin)
                continue
            if (plugin.disabled)
                continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === "function") {
                try {
                    await plugin.all.call(this, m, {
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    })
                } catch (e) {
                    // if (typeof e === "string") continue
                    console.error(e)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (await conn.onWhatsApp(jid))[0] || {}
                        if (data.exists)
                            m.reply(`*🗂️ Plugin:* ${name}\n*👤 Sender:* ${m.sender}\n*💬 Chat:* ${m.chat}\n*💻 Command:* ${m.text}\n\n\${format(e)}`.trim(), data.jid)
                    }
                }
            }
            if (!opts["restrict"])
                if (plugin.tags && plugin.tags.includes("admin")) {
                    // global.dfail("restrict", m, this)
                    continue
                }
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
            let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
            let match = (_prefix instanceof RegExp ? // RegExp Mode?
                [
                    [_prefix.exec(m.text), _prefix]
                ] :
                Array.isArray(_prefix) ? // Array?
                _prefix.map(p => {
                    let re = p instanceof RegExp ? // RegExp in Array?
                        p :
                        new RegExp(str2Regex(p))
                    return [re.exec(m.text), re]
                }) :
                typeof _prefix === "string" ? // String?
                [
                    [new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]
                ] : [
                    [
                        [], new RegExp
                    ]
                ]
            ).find(p => p[1])
            if (typeof plugin.before === "function") {
                if (await plugin.before.call(this, m, {
                        match,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isRAdmin,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                        __dirname: ___dirname,
                        __filename
                    }))
                    continue
            }
            if (typeof plugin !== "function")
                continue
            if ((usedPrefix = (match[0] || "")[0])) {
                let noPrefix = m.text.replace(usedPrefix, "")
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `
                command = (command || "").toLowerCase()
                let fail = plugin.fail || global.dfail // When failed
                let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                    plugin.command.test(command) :
                    Array.isArray(plugin.command) ? // Array?
                    plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                        cmd.test(command) :
                        cmd === command
                    ) :
                    typeof plugin.command === "string" ? // String?
                    plugin.command === command :
                    false

                if (!isAccept)
                    continue
                m.plugin = name
                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    if (!['owner-unbanchat.js'].includes(name) && chat && chat.isBanned && !isROwner) return // Except this
                    if (name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && chat?.isBanned && !isROwner) return
                    if (m.text && user.banned && !isROwner) {
		       if (user.antispam > 2) return
m.reply(`🚫 *YOU ARE BANNED, YOU CAN'T USE THE COMMANDS*\n📑 *REASON: ${user.messageSpam === 0 ? 'UNSPECIFIED' : user.messageSpam}*\n⚠️ \`\`\`IF THIS BOT IS AN OFFICIAL ACCOUNT AND HAS EVIDENCE TO SUPPORT THAT THIS MESSAGE IS AN ERROR, YOU CAN MAKE YOUR CASE AT:\`\`\`👉 ${owner}`)
user.antispam++	
return 
		    }
		}
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                    fail("owner", m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) { // Real Owner
                    fail("rowner", m, this)
                    continue
                }
                if (plugin.owner && !isOwner) { // Number Owner
                    fail("owner", m, this)
                    continue
                }
                if (plugin.mods && !isMods) { // Moderator
                    fail("mods", m, this)
                    continue
                }
                if (plugin.premium && !isPrems) { // Premium
                    fail("premium", m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) { // Group Only
                    fail("group", m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                    fail("botAdmin", m, this)
                    continue
                } else if (plugin.admin && !isAdmin) { // User Admin
                    fail("admin", m, this)
                    continue
                }
                if (plugin.private && m.isGroup) { // Private Chat Only
                    fail("private", m, this)
                    continue
                }
                if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                    fail("unreg", m, this)
                    continue
                }
                m.isCommand = true
               let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                if (xp > 200)
                    m.reply('cheater')
                else
                    m.exp += xp
                    if (!isPrems && plugin.credit && global.db.data.users[m.sender].credit < plugin.credit * 1) {
                        this.reply(m.chat, `🟥 You don't have enough gold`, m)
                        continue // Gold finished
                    }
                    if (plugin.level > _user.level) {
                        this.reply(m.chat, `🟥 Level required ${plugin.level} to use this command. \nYour level ${_user.level}`, m)
                        continue // If the level has not been reached
                    }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems)
                        m.credit = m.credit || plugin.credit || false
                } catch (e) {
                    // Error occured
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, "g"), "#HIDDEN#")
                        if (e.name)
                            for (let [ji
