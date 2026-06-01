const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 4000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');
const JWT_SECRET = 'denki-tools-secret-2026';

// ─── JSON Database ──────────────────────────────────────────
let _db = null;

function loadDb() {
  try {
    _db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    _db = null;
  }
}

function getDb() {
  if (_db) return _db;
  loadDb();
  if (!_db) {
    _db = {
      products: [],
      settings: {
        storeName: '電動工具の匠', email: 'info@denki-takumi.jp', phone: '03-1234-5678',
        shippingFee: 800, freeShippingThreshold: 10000,
        enabledPayments: ['credit', 'bank', 'cod', 'convenience', 'paypal']
      },
      orders: [],
      admin: null
    };
    // Set default admin password hash (admin123)
    _db.admin = { username: 'admin', password: hashPassword('admin123') };
    seedDefaults();
    saveDb();
    console.log('Database created with defaults');
  }
  return _db;
}

function saveDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(_db, null, 2), 'utf8');
}

function hashPassword(pwd) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, 'sha512').toString('hex');
  return salt + ':' + hash;
}

function verifyPassword(pwd, stored) {
  const [salt, key] = stored.split(':');
  const hash = crypto.pbkdf2Sync(pwd, salt, 1000, 64, 'sha512').toString('hex');
  return key === hash;
}

function seedDefaults() {
  if (_db.products.length > 0) return;
  _db.products = [
    { id:1, name:'コードレスインパクトドライバー', nameEn:'ID-1800PRO', category:'drill', catLabel:'電動ドリル', emoji:'🔧', price:12800, badge:'人気No.1', desc:'18Vリチウムイオンバッテリー搭載。最大トルク180N·m。', specs:{'電圧':'18V','最大トルク':'180N·m','重量':'1.5kg'} },
    { id:2, name:'電動ドリルセット', nameEn:'DR-700Pro', category:'drill', catLabel:'電動ドリル', emoji:'🛠️', price:9800, badge:'おすすめ', desc:'31点のビットセット付き。DIYからプロまで。', specs:{'電圧':'12V','回転数':'0-1500rpm','重量':'1.2kg'} },
    { id:3, name:'アングルグラインダー', nameEn:'AG-125PRO', category:'grinder', catLabel:'グラインダー', emoji:'⚙️', price:6800, badge:'', desc:'125mmディスク対応。スリムグリップ。', specs:{'ディスク径':'125mm','回転数':'11000rpm','重量':'1.9kg'} },
    { id:4, name:'電動丸ノコ', nameEn:'CS-185PRO', category:'saw', catLabel:'切断機', emoji:'🔪', price:14200, badge:'新発売', desc:'165mmブレード搭載。レーザーガイドライン。', specs:{'ブレード径':'165mm','回転数':'5000rpm','重量':'3.8kg'} },
    { id:5, name:'電動ジグソー', nameEn:'JS-65PRO', category:'saw', catLabel:'切断機', emoji:'🪚', price:7600, badge:'', desc:'無段変速トリガー搭載。曲線切りもスムーズ。', specs:{'切断能力(木)':'65mm','回転数':'500-3100rpm'} },
    { id:6, name:'オービタルサンダー', nameEn:'OS-125PRO', category:'sander', catLabel:'サンダー', emoji:'✨', price:5900, badge:'', desc:'125mmペーパー対応。防振設計。', specs:{'ペーパーサイズ':'125mm','重量':'1.3kg'} },
    { id:7, name:'エアコンプレッサー', nameEn:'AC-24PRO', category:'outdoor', catLabel:'アウトドア', emoji:'💨', price:22400, badge:'送料無料', desc:'24Lタンク搭載の静音設計。', specs:{'タンク容量':'24L','吐出圧力':'0.8MPa'} },
    { id:8, name:'充電式草刈り機', nameEn:'BC-36PRO', category:'outdoor', catLabel:'アウトドア', emoji:'🌿', price:16800, badge:'', desc:'36Vハイパワー。環境に優しい。', specs:{'電圧':'36V','刃長':'300mm','重量':'3.8kg'} },
    { id:9, name:'レーザー距離計', nameEn:'LM-50PRO', category:'drill', catLabel:'電動ドリル', emoji:'📏', price:4800, badge:'割引中', desc:'最長50m計測可能。精度±1.5mm。', specs:{'測定範囲':'0.05-50m','精度':'±1.5mm'} },
    { id:10, name:'ベンチグラインダー', nameEn:'BG-150PRO', category:'grinder', catLabel:'グラインダー', emoji:'⚡', price:9200, badge:'', desc:'150mm両刃砥石の定番工具。', specs:{'砥石径':'150mm','出力':'370W','重量':'7.5kg'} },
    { id:11, name:'振動ドリル', nameEn:'VD-13PRO', category:'drill', catLabel:'電動ドリル', emoji:'🔨', price:8200, badge:'', desc:'ハンマー機能搭載でコンクリートも穿孔。', specs:{'回転数':'0-2800rpm','出力':'700W'} },
    { id:12, name:'マルチツール', nameEn:'MT-35PRO', category:'saw', catLabel:'切断機', emoji:'🔩', price:5500, badge:'限定特価', desc:'1台6役。切断・研磨・スクレイピング。', specs:{'発振数':'11000-20000回/分','出力':'350W'} }
  ];
}

// ─── JWT Helpers ──────────────────────────────────────────
function base64url(str) {
  return Buffer.from(str).toString('base64url');
}

function base64urlDecode(str) {
  return Buffer.from(str, 'base64url').toString('utf8');
}

function signJWT(payload) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 86400 }));
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(header + '.' + body).digest('base64url');
  return header + '.' + body + '.' + signature;
}

function verifyJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const expected = crypto.createHmac('sha256', JWT_SECRET).update(parts[0] + '.' + parts[1]).digest('base64url');
    if (expected !== parts[2]) return null;
    const payload = JSON.parse(base64urlDecode(parts[1]));
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

// ─── Request Helpers ──────────────────────────────────────────
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch { resolve({}); }
    });
  });
}

function getAuthUser(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return verifyJWT(auth.slice(7));
}

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath);
  const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}

// ─── Router ──────────────────────────────────────────────────
function route(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/').filter(Boolean);

  // ── API Routes ──
  if (pathParts[0] === 'api') {
    handleAPI(req, res, pathParts, url).catch(err => {
      console.error('API Error:', err);
      if (!res.headersSent) json(res, { error: 'Internal server error: ' + err.message }, 500);
    });
    return;
  }

  // ── Static Files ──
  let filePath = path.join(__dirname, url.pathname === '/' ? 'index.html' : url.pathname);
  sendFile(res, filePath);
}

// ─── API Handler ─────────────────────────────────────────────
async function handleAPI(req, res, parts, url) {
  const db = getDb();
  const method = req.method;

  // Health
  if (parts[1] === 'health') return json(res, { status: 'ok', time: new Date().toISOString() });

  // Auth
  if (parts[1] === 'auth') {
    if (method === 'POST' && parts[2] === 'login') {
      const body = await parseBody(req);
      if (body.username === db.admin.username && verifyPassword(body.password, db.admin.password)) {
        const token = signJWT({ id: 1, username: db.admin.username });
        return json(res, { token, username: db.admin.username });
      }
      return json(res, { error: 'ユーザー名またはパスワードが違います' }, 401);
    }
    if (method === 'GET' && parts[2] === 'verify') {
      const user = getAuthUser(req);
      if (!user) return json(res, { error: '認証が必要です' }, 401);
      return json(res, { valid: true, username: user.username });
    }
    if (method === 'POST' && parts[2] === 'change-password') {
      const user = getAuthUser(req);
      if (!user) return json(res, { error: '認証が必要です' }, 401);
      const body = await parseBody(req);
      if (!verifyPassword(body.currentPassword, db.admin.password)) {
        return json(res, { error: '現在のパスワードが違います' }, 401);
      }
      if (!body.newPassword || body.newPassword.length < 4) {
        return json(res, { error: 'パスワードは4文字以上必要です' }, 400);
      }
      db.admin.password = hashPassword(body.newPassword);
      saveDb();
      return json(res, { message: 'パスワードを変更しました' });
    }
    return json(res, { error: 'Not found' }, 404);
  }

  // Products
  if (parts[1] === 'products') {
    const id = parts[2] ? parseInt(parts[2]) : null;

    if (method === 'GET') {
      if (id) {
        const p = db.products.find(p => p.id === id);
        if (!p) return json(res, { error: '商品が見つかりません' }, 404);
        return json(res, p);
      }
      return json(res, db.products);
    }

    const user = getAuthUser(req);
    if (!user) return json(res, { error: '認証が必要です' }, 401);

    if (method === 'POST') {
      if (parts[2] === 'seed') {
        seedDefaults();
        saveDb();
        return json(res, { message: 'デフォルト商品を追加しました', count: db.products.length });
      }
      const body = await parseBody(req);
      if (!body.name || !body.nameEn || !body.price) {
        return json(res, { error: '商品名・品番・価格は必須です' }, 400);
      }
      const maxId = db.products.reduce((m, p) => Math.max(m, p.id), 0);
      const product = { id: maxId + 1, name: body.name, nameEn: body.nameEn, category: body.category || 'other', catLabel: body.catLabel || '', emoji: body.emoji || '🔧', price: body.price, badge: body.badge || '', desc: body.desc || '', specs: body.specs || {} };
      db.products.push(product);
      saveDb();
      return json(res, product, 201);
    }

    if (method === 'PUT' && id) {
      const idx = db.products.findIndex(p => p.id === id);
      if (idx === -1) return json(res, { error: '商品が見つかりません' }, 404);
      const body = await parseBody(req);
      db.products[idx] = { ...db.products[idx], ...body, id };
      saveDb();
      return json(res, db.products[idx]);
    }

    if (method === 'DELETE' && id) {
      const idx = db.products.findIndex(p => p.id === id);
      if (idx === -1) return json(res, { error: '商品が見つかりません' }, 404);
      db.products.splice(idx, 1);
      saveDb();
      return json(res, { message: '削除しました', id });
    }

    return json(res, { error: 'Not found' }, 404);
  }

  // Settings
  if (parts[1] === 'settings') {
    if (method === 'GET') return json(res, db.settings);

    const user = getAuthUser(req);
    if (!user) return json(res, { error: '認証が必要です' }, 401);

    if (method === 'PUT') {
      const body = await parseBody(req);
      ['storeName', 'email', 'phone'].forEach(k => { if (body[k] !== undefined) db.settings[k] = body[k]; });
      ['shippingFee', 'freeShippingThreshold'].forEach(k => { if (body[k] !== undefined) db.settings[k] = Number(body[k]); });
      if (body.enabledPayments !== undefined) db.settings.enabledPayments = body.enabledPayments;
      saveDb();
      return json(res, { message: '設定を保存しました' });
    }
  }

  // Orders
  if (parts[1] === 'orders') {
    const id = parts[2];

    if (method === 'POST' && !id) {
      const body = await parseBody(req);
      if (!body.id || !body.items || !body.customer) {
        return json(res, { error: '注文情報が不足しています' }, 400);
      }
      db.orders.push({ id: body.id, items: body.items, subtotal: body.subtotal, shipping: body.shipping, total: body.total, payment: body.payment, customer_name: body.customer.name, customer_email: body.customer.email, customer_address: body.customer.address, customer_phone: body.customer.phone, status: 'confirmed', created_at: new Date().toLocaleString('ja-JP') });
      saveDb();
      return json(res, { message: '注文を受け付けました', orderId: body.id }, 201);
    }

    const user = getAuthUser(req);
    if (!user) return json(res, { error: '認証が必要です' }, 401);

    if (method === 'GET') {
      if (id) {
        const order = db.orders.find(o => o.id === id);
        if (!order) return json(res, { error: '注文が見つかりません' }, 404);
        return json(res, order);
      }
      return json(res, db.orders.slice().reverse());
    }

    if (method === 'PUT' && id && parts[3] === 'status') {
      const body = await parseBody(req);
      const order = db.orders.find(o => o.id === id);
      if (!order) return json(res, { error: '注文が見つかりません' }, 404);
      order.status = body.status || order.status;
      saveDb();
      return json(res, { message: 'ステータスを更新しました' });
    }
  }

  json(res, { error: 'Not found' }, 404);
}

// ─── Start ───────────────────────────────────────────────────
getDb();

if (process.argv.includes('--seed')) {
  seedDefaults();
  saveDb();
  console.log('Seed complete:', _db.products.length, 'products');
  process.exit(0);
}

const server = http.createServer(route);
server.listen(PORT, () => {
  console.log(`\n  🛠️  電動工具の匠 Server`);
  console.log(`  ──────────────────────`);
  console.log(`  🌐  http://localhost:${PORT}`);
  console.log(`  🔑  Default admin: admin / admin123`);
  console.log(`  📁  DB: ${DB_FILE}\n`);
});
