const STORAGE_KEY = "drive-english-v1";
const SETTINGS_KEY = "drive-english-settings-v1";
const TRANSLATION_CACHE_KEY = "drive-english-translation-cache-v1";
const CLOUD_SETTINGS_KEY = "drive-english-cloud-settings-v1";
const DB_NAME = "drive-english-db";
const DB_VERSION = 1;
const WORDS_STORE = "words";
const META_STORE = "meta";

const sampleWords = [
  {
    term: "necessary",
    meaning: "必要的",
    sentence: "It is necessary to practice every day.",
  },
  {
    term: "commute",
    meaning: "通勤",
    sentence: "I listen to English during my commute.",
  },
  {
    term: "recognize",
    meaning: "认出，识别",
    sentence: "I can recognize the word when I hear it.",
  },
  {
    term: "confident",
    meaning: "有信心的",
    sentence: "Speaking out loud helps me feel confident.",
  },
];

const basicTranslations = {
  good: "好的；优秀的",
  bad: "坏的；糟糕的",
  great: "很好的；伟大的",
  important: "重要的",
  necessary: "必要的",
  difficult: "困难的",
  easy: "容易的",
  practice: "练习",
  commute: "通勤",
  recognize: "认出；识别",
  confident: "有信心的",
  improve: "提高；改善",
  remember: "记住",
  forget: "忘记",
  repeat: "重复",
  listen: "听",
  speak: "说；讲话",
  sentence: "句子",
  word: "单词",
  meaning: "意思；含义",
};

const chineseToEnglish = {
  好的: "good",
  优秀的: "good",
  坏的: "bad",
  糟糕的: "bad",
  很好的: "great",
  伟大的: "great",
  重要的: "important",
  必要的: "necessary",
  必需的: "necessary",
  困难的: "difficult",
  容易的: "easy",
  简单的: "easy",
  练习: "practice",
  通勤: "commute",
  认出: "recognize",
  识别: "recognize",
  有信心的: "confident",
  自信的: "confident",
  提高: "improve",
  改善: "improve",
  记住: "remember",
  忘记: "forget",
  重复: "repeat",
  听: "listen",
  说: "speak",
  讲话: "speak",
  句子: "sentence",
  单词: "word",
  意思: "meaning",
  含义: "meaning",
  操作: "operate",
  运行: "operate",
  高效地: "efficiently",
  有效地: "efficiently",
  干净利落: "efficiently",
};

const basicPhonetics = {
  good: "/ɡʊd/",
  bad: "/bæd/",
  great: "/ɡreɪt/",
  important: "/ɪmˈpɔːrtənt/",
  necessary: "/ˈnesəseri/",
  difficult: "/ˈdɪfɪkəlt/",
  easy: "/ˈiːzi/",
  practice: "/ˈpræktɪs/",
  commute: "/kəˈmjuːt/",
  recognize: "/ˈrekəɡnaɪz/",
  confident: "/ˈkɑːnfɪdənt/",
  improve: "/ɪmˈpruːv/",
  remember: "/rɪˈmembər/",
  forget: "/fərˈɡet/",
  repeat: "/rɪˈpiːt/",
  listen: "/ˈlɪsən/",
  speak: "/spiːk/",
  sentence: "/ˈsentəns/",
  word: "/wɜːrd/",
  meaning: "/ˈmiːnɪŋ/",
  operate: "/ˈɑːpəreɪt/",
  efficiently: "/ɪˈfɪʃəntli/",
};

const defaultSettings = {
  rate: 0.9,
  gap: 1000,
  repeat: 2,
  shadowing: false,
  shadowGap: 4000,
  shuffle: false,
  speakMeaning: false,
  speakSentence: true,
  skipKnown: false,
  voiceName: "",
  hideKnown: false,
};

const defaultCloudSettings = {
  apiUrl: "",
  syncCode: "",
  autoSync: false,
};

const state = {
  words: loadWords(),
  settings: loadSettings(),
  cloud: loadCloudSettings(),
  index: 0,
  playing: false,
  speaking: false,
  voices: [],
  deferredInstallPrompt: null,
  translationCache: loadTranslationCache(),
  translatingIds: new Set(),
  shadowingNow: false,
  storageAvailable: true,
  db: null,
  durableStorage: false,
  syncTimer: null,
  syncing: false,
};

const $ = (selector) => document.querySelector(selector);

const els = {
  appStatus: $("#appStatus"),
  installBtn: $("#installBtn"),
  installDialog: $("#installDialog"),
  phoneUrlText: $("#phoneUrlText"),
  countLabel: $("#countLabel"),
  playModeLabel: $("#playModeLabel"),
  termMeta: $("#termMeta"),
  currentTerm: $("#currentTerm"),
  currentPhonetic: $("#currentPhonetic"),
  currentMeaning: $("#currentMeaning"),
  currentSentence: $("#currentSentence"),
  shadowStatus: $("#shadowStatus"),
  progressBar: $("#progressBar"),
  prevBtn: $("#prevBtn"),
  playBtn: $("#playBtn"),
  playIcon: $("#playIcon"),
  nextBtn: $("#nextBtn"),
  familiarBtn: $("#familiarBtn"),
  repeatBtn: $("#repeatBtn"),
  shuffleBtn: $("#shuffleBtn"),
  shadowBtn: $("#shadowBtn"),
  tabs: document.querySelectorAll(".tab"),
  panels: {
    add: $("#addPanel"),
    library: $("#libraryPanel"),
    settings: $("#settingsPanel"),
  },
  singleForm: $("#singleForm"),
  termInput: $("#termInput"),
  meaningInput: $("#meaningInput"),
  phoneticInput: $("#phoneticInput"),
  sentenceInput: $("#sentenceInput"),
  moreFieldsBtn: $("#moreFieldsBtn"),
  extraFields: $("#extraFields"),
  sentenceVoiceBtn: $("#sentenceVoiceBtn"),
  singleStatus: $("#singleStatus"),
  sampleBtn: $("#sampleBtn"),
  bulkToggleBtn: $("#bulkToggleBtn"),
  bulkBody: $("#bulkBody"),
  bulkInput: $("#bulkInput"),
  bulkAddBtn: $("#bulkAddBtn"),
  bulkStatus: $("#bulkStatus"),
  fileInput: $("#fileInput"),
  searchInput: $("#searchInput"),
  exportBtn: $("#exportBtn"),
  clearDoneBtn: $("#clearDoneBtn"),
  clearAllBtn: $("#clearAllBtn"),
  wordList: $("#wordList"),
  template: $("#wordItemTemplate"),
  voiceSelect: $("#voiceSelect"),
  rateInput: $("#rateInput"),
  rateValue: $("#rateValue"),
  gapInput: $("#gapInput"),
  gapValue: $("#gapValue"),
  shadowGapInput: $("#shadowGapInput"),
  shadowGapValue: $("#shadowGapValue"),
  meaningToggle: $("#meaningToggle"),
  sentenceToggle: $("#sentenceToggle"),
  skipKnownToggle: $("#skipKnownToggle"),
  shadowToggle: $("#shadowToggle"),
  storageStatus: $("#storageStatus"),
  protectStorageBtn: $("#protectStorageBtn"),
  cloudStatus: $("#cloudStatus"),
  cloudUrlInput: $("#cloudUrlInput"),
  syncCodeInput: $("#syncCodeInput"),
  generateSyncCodeBtn: $("#generateSyncCodeBtn"),
  autoSyncToggle: $("#autoSyncToggle"),
  saveCloudSettingsBtn: $("#saveCloudSettingsBtn"),
  uploadCloudBtn: $("#uploadCloudBtn"),
  downloadCloudBtn: $("#downloadCloudBtn"),
};

function loadWords() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadSettings() {
  try {
    return {
      ...defaultSettings,
      ...JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || "{}"),
    };
  } catch {
    return { ...defaultSettings };
  }
}

function loadTranslationCache() {
  try {
    return JSON.parse(window.localStorage.getItem(TRANSLATION_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadCloudSettings() {
  try {
    return {
      ...defaultCloudSettings,
      ...JSON.parse(window.localStorage.getItem(CLOUD_SETTINGS_KEY) || "{}"),
    };
  } catch {
    return { ...defaultCloudSettings };
  }
}

function openDatabase() {
  return new Promise((resolve) => {
    if (!("indexedDB" in window)) {
      resolve(null);
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(WORDS_STORE)) {
        db.createObjectStore(WORDS_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
}

function readAllFromStore(storeName) {
  return new Promise((resolve, reject) => {
    if (!state.db) {
      resolve([]);
      return;
    }
    const transaction = state.db.transaction(storeName, "readonly");
    const request = transaction.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function writeWordsToDatabase(words) {
  return new Promise((resolve, reject) => {
    if (!state.db) {
      resolve(false);
      return;
    }
    const transaction = state.db.transaction(WORDS_STORE, "readwrite");
    const store = transaction.objectStore(WORDS_STORE);
    store.clear();
    words.forEach((word) => store.put(word));
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
}

function saveMetaToDatabase(key, value) {
  return new Promise((resolve) => {
    if (!state.db) {
      resolve(false);
      return;
    }
    const transaction = state.db.transaction(META_STORE, "readwrite");
    transaction.objectStore(META_STORE).put({ key, value });
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => resolve(false);
  });
}

function saveWords() {
  if (state.db) {
    writeWordsToDatabase(state.words)
      .then((saved) => {
        state.durableStorage = Boolean(saved);
      })
      .catch(() => {
        state.durableStorage = false;
      });
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.words));
    state.storageAvailable = true;
    scheduleCloudSync();
    return true;
  } catch {
    state.storageAvailable = false;
    scheduleCloudSync();
    return Boolean(state.db);
  }
}

function saveSettings() {
  if (state.db) {
    saveMetaToDatabase("settings", state.settings);
  }
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
    state.storageAvailable = true;
    return true;
  } catch {
    state.storageAvailable = false;
    return false;
  }
}

function saveTranslationCache() {
  if (state.db) {
    saveMetaToDatabase("translationCache", state.translationCache);
  }
  try {
    window.localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(state.translationCache));
    return true;
  } catch {
    return false;
  }
}

function saveCloudSettings() {
  try {
    window.localStorage.setItem(CLOUD_SETTINGS_KEY, JSON.stringify(state.cloud));
    return true;
  } catch {
    return false;
  }
}

async function hydrateFromDatabase() {
  state.db = await openDatabase();
  if (!state.db) return;
  try {
    const dbWords = await readAllFromStore(WORDS_STORE);
    if (dbWords.length) {
      state.words = dbWords.sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
      state.durableStorage = true;
      saveWords();
      return;
    }
    if (state.words.length) {
      state.durableStorage = await writeWordsToDatabase(state.words);
    }
  } catch {
    state.durableStorage = false;
  }
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createWord({ term, meaning = "", phonetic = "", sentence = "" }) {
  return {
    id: createId(),
    term: String(term || "").trim(),
    meaning: String(meaning || "").trim(),
    phonetic: String(phonetic || "").trim(),
    sentence: String(sentence || "").trim(),
    known: false,
    createdAt: new Date().toISOString(),
    listenCount: 0,
  };
}

function normalizeWord(raw) {
  if (!raw || typeof raw !== "object") return null;
  const term = String(raw.term || raw.word || raw.english || "").trim();
  if (!term) return null;
  return createWord({
    term,
    meaning: String(raw.meaning || raw.chinese || raw.translation || "").trim(),
    phonetic: String(raw.phonetic || raw.ipa || raw.pronunciation || "").trim(),
    sentence: String(raw.sentence || raw.example || "").trim(),
  });
}

function getPlayableWords() {
  const list = state.settings.skipKnown ? state.words.filter((word) => !word.known) : state.words;
  return list;
}

function getCurrentWord() {
  const list = getPlayableWords();
  if (!list.length) return null;
  if (state.index >= list.length) state.index = 0;
  return list[state.index];
}

function updateScreen() {
  const playable = getPlayableWords();
  const word = getCurrentWord();
  const total = state.words.length;
  const known = state.words.filter((item) => item.known).length;

  els.countLabel.textContent = `${total} 个词条${known ? `，${known} 个熟悉` : ""}`;
  els.playModeLabel.textContent = state.settings.shuffle ? "随机" : "顺序";
  els.repeatBtn.textContent = `重复 ${state.settings.repeat} 次`;
  els.shuffleBtn.textContent = state.settings.shuffle ? "随机播放" : "顺序播放";
  els.shadowBtn.textContent = state.settings.shadowing ? "跟读开启" : "跟读关闭";
  els.familiarBtn.disabled = !word;
  els.prevBtn.disabled = !word;
  els.nextBtn.disabled = !word;
  els.playBtn.disabled = !word;
  els.playIcon.textContent = state.playing ? "Ⅱ" : "▶";
  els.playBtn.setAttribute("aria-label", state.playing ? "暂停" : "播放");
  els.shadowStatus.hidden = !state.shadowingNow;
  document.querySelector(".term-card").classList.toggle("known-current", Boolean(word?.known));
  els.familiarBtn.classList.toggle("active-known", Boolean(word?.known));

  if (!word) {
    els.termMeta.textContent = total ? "没有待播放词条" : "未开始";
    els.currentTerm.textContent = total ? "都熟悉了" : "先添加单词";
    els.currentPhonetic.textContent = "";
    els.currentMeaning.textContent = total ? "关闭“跳过熟悉词”可以继续复习。" : "添加后可以一键循环听。";
    els.currentSentence.textContent = "";
    els.progressBar.style.width = "0%";
  } else {
    const position = playable.findIndex((item) => item.id === word.id) + 1;
    els.termMeta.textContent = `${position} / ${playable.length}`;
    els.currentTerm.textContent = word.term;
    els.currentPhonetic.textContent = word.phonetic || "正在查音标…";
    els.currentMeaning.textContent =
      word.meaning || (state.translatingIds.has(word.id) ? "正在自动翻译…" : "可手动补充释义");
    els.currentSentence.textContent = word.sentence || "";
    els.familiarBtn.textContent = word.known ? "取消熟悉" : "标记熟悉";
    els.progressBar.style.width = `${(position / playable.length) * 100}%`;
    autoTranslateWord(word);
    autoFillPhonetic(word);
  }

  els.rateInput.value = state.settings.rate;
  els.rateValue.textContent = `${Number(state.settings.rate).toFixed(2).replace(/0$/, "")}x`;
  els.gapInput.value = state.settings.gap / 1000;
  els.gapValue.textContent = `${(state.settings.gap / 1000).toFixed(1)} 秒`;
  els.shadowGapInput.value = state.settings.shadowGap / 1000;
  els.shadowGapValue.textContent = `${(state.settings.shadowGap / 1000).toFixed(1)} 秒`;
  els.meaningToggle.checked = state.settings.speakMeaning;
  els.sentenceToggle.checked = state.settings.speakSentence;
  els.skipKnownToggle.checked = state.settings.skipKnown;
  els.shadowToggle.checked = state.settings.shadowing;
  els.clearDoneBtn.textContent = state.settings.hideKnown ? "显示熟悉" : "隐藏熟悉";

  renderWordList();
}

function renderWordList() {
  const query = els.searchInput.value.trim().toLowerCase();
  const visibleWords = state.words.filter((word) => {
    if (state.settings.hideKnown && word.known) return false;
    if (!query) return true;
    return [word.term, word.phonetic, word.meaning, word.sentence].join(" ").toLowerCase().includes(query);
  });

  els.wordList.textContent = "";

  if (!visibleWords.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = state.words.length ? "没有匹配的词条。" : "词库还是空的，先添加几个常用词。";
    els.wordList.append(empty);
    return;
  }

  visibleWords.forEach((word) => {
    const node = els.template.content.firstElementChild.cloneNode(true);
    node.classList.toggle("known-item", word.known);
    const main = node.querySelector(".word-main");
    const speak = node.querySelector(".speak");
    const known = node.querySelector(".known");
    const deleteBtn = node.querySelector(".delete");

    main.innerHTML = `
      <strong>${escapeHtml(word.term)}</strong>
      ${word.phonetic ? `<em>${escapeHtml(word.phonetic)}</em>` : ""}
      <span>${escapeHtml(word.meaning || (state.translatingIds.has(word.id) ? "正在自动翻译…" : "可手动补充释义"))}</span>
      ${word.sentence ? `<small>${escapeHtml(word.sentence)}</small>` : ""}
    `;
    known.textContent = word.known ? "已熟悉" : "熟悉";
    known.classList.toggle("active", word.known);

    main.addEventListener("click", () => {
      const playableIndex = getPlayableWords().findIndex((item) => item.id === word.id);
      state.index = Math.max(0, playableIndex);
      updateScreen();
      switchTab("add");
      speakOnce(word);
    });
    speak.addEventListener("click", () => speakOnce(word));
    known.addEventListener("click", () => toggleKnown(word.id));
    deleteBtn.addEventListener("click", () => removeWord(word.id));
    els.wordList.append(node);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function autoTranslateWord(word) {
  if (!word || word.meaning || state.translatingIds.has(word.id)) return;
  const term = word.term.trim();
  const cacheKey = term.toLowerCase();
  if (basicTranslations[cacheKey]) {
    word.meaning = basicTranslations[cacheKey];
    saveWords();
    updateScreen();
    return;
  }

  if (state.translationCache[cacheKey]) {
    word.meaning = state.translationCache[cacheKey];
    saveWords();
    updateScreen();
    return;
  }

  state.translatingIds.add(word.id);
  updateScreen();

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(term)}&langpair=en|zh-CN`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Translation request failed");
    const data = await response.json();
    const translated = String(data?.responseData?.translatedText || "").trim();
    if (translated && translated.toLowerCase() !== term.toLowerCase()) {
      word.meaning = translated;
      state.translationCache[cacheKey] = translated;
      saveTranslationCache();
      saveWords();
    }
  } catch {
    // Keep the word usable even when the network translation service is unavailable.
  } finally {
    state.translatingIds.delete(word.id);
    updateScreen();
  }
}

function autoTranslateMissing(words) {
  words
    .filter((word) => !word.meaning)
    .slice(0, 3)
    .forEach((word) => autoTranslateWord(word));
}

function hasChineseText(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function normalizeChineseKey(value) {
  return String(value || "")
    .trim()
    .replace(/[，。！？、；：,.!?;:\s]/g, "");
}

async function translateChineseToEnglish(meaning) {
  const clean = String(meaning || "").trim();
  const direct = chineseToEnglish[normalizeChineseKey(clean)];
  if (direct) return direct;

  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=zh-CN|en`
  );
  if (!response.ok) throw new Error("Chinese to English translation failed");
  const data = await response.json();
  const translated = String(data?.responseData?.translatedText || "").trim();
  if (!translated || hasChineseText(translated)) throw new Error("No useful English translation");
  return translated
    .replace(/\.$/, "")
    .split(/[;,]/)[0]
    .trim();
}

async function autoFillPhonetic(word) {
  if (!word || word.phonetic || state.translatingIds.has(`phonetic-${word.id}`)) return;
  const term = word.term.trim();
  const cacheKey = term.toLowerCase();
  if (basicPhonetics[cacheKey]) {
    word.phonetic = basicPhonetics[cacheKey];
    saveWords();
    updateScreen();
    return;
  }

  state.translatingIds.add(`phonetic-${word.id}`);
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`);
    if (!response.ok) throw new Error("Phonetic request failed");
    const data = await response.json();
    const entry = Array.isArray(data) ? data[0] : null;
    const phonetic =
      entry?.phonetics?.find((item) => item.text && item.text.includes("/"))?.text ||
      entry?.phonetic ||
      "";
    if (phonetic) {
      word.phonetic = phonetic;
      saveWords();
    }
  } catch {
    // A missing network phonetic should not block saving or playback.
  } finally {
    state.translatingIds.delete(`phonetic-${word.id}`);
    updateScreen();
  }
}

function autoFillMissingPhonetics(words) {
  words
    .filter((word) => !word.phonetic)
    .slice(0, 3)
    .forEach((word) => autoFillPhonetic(word));
}

function addWords(words) {
  const validWords = words.filter((word) => word && word.term);
  const existing = new Set(state.words.map((word) => word.term.toLowerCase()));
  const fresh = validWords.filter((word) => word.term && !existing.has(word.term.toLowerCase()));
  state.words.push(...fresh);
  const saved = saveWords();
  if (!getCurrentWord()) state.index = 0;
  updateScreen();
  autoTranslateMissing(fresh);
  autoFillMissingPhonetics(fresh);
  return {
    added: fresh.length,
    duplicates: validWords.length - fresh.length,
    saved: saved || state.durableStorage,
    total: validWords.length,
  };
}

function parseBulkText(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.includes("|") ? line.split(/\s*\|\s*/) : line.split(/\t+/);
      const hasPhonetic = parts[1] && /[\/\[\]ˈˌəɪʊɑɔæɛɜθðʃʒŋ]/.test(parts[1]);
      return createWord({
        term: parts[0] || "",
        phonetic: hasPhonetic ? parts[1] || "" : "",
        meaning: hasPhonetic ? parts[2] || "" : parts[1] || "",
        sentence: hasPhonetic ? parts.slice(3).join(" ") || "" : parts.slice(2).join(" ") || "",
      });
    })
    .filter((word) => word.term);
}

async function parseFile(file) {
  const text = await file.text();
  if (file.name.toLowerCase().endsWith(".json")) {
    const data = JSON.parse(text);
    const rows = Array.isArray(data) ? data : data.words || data.items || [];
    return rows.map(normalizeWord).filter(Boolean);
  }
  return parseBulkText(text);
}

function switchTab(tabName) {
  els.tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  Object.entries(els.panels).forEach(([name, panel]) => {
    const active = name === tabName;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}

function setBulkStatus(message) {
  els.bulkStatus.textContent = message;
}

function setSingleStatus(message) {
  els.singleStatus.textContent = message;
}

function setAppStatus(message) {
  els.appStatus.textContent = message;
}

function setCloudStatus(message) {
  els.cloudStatus.textContent = message;
}

function normalizeApiUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getCloudEndpoint() {
  const apiUrl = normalizeApiUrl(state.cloud.apiUrl);
  if (!apiUrl) throw new Error("先填写后端地址。");
  if (!state.cloud.syncCode.trim()) throw new Error("先填写同步码。");
  return `${apiUrl}/api/words/${encodeURIComponent(state.cloud.syncCode.trim())}`;
}

function createSyncCode() {
  const bytes = new Uint8Array(6);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    bytes.forEach((_, index) => {
      bytes[index] = Math.floor(Math.random() * 256);
    });
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function applyCloudSettingsFromInputs() {
  state.cloud.apiUrl = normalizeApiUrl(els.cloudUrlInput.value);
  state.cloud.syncCode = els.syncCodeInput.value.trim();
  state.cloud.autoSync = els.autoSyncToggle.checked;
  saveCloudSettings();
  updateCloudUi();
}

function updateCloudUi() {
  els.cloudUrlInput.value = state.cloud.apiUrl;
  els.syncCodeInput.value = state.cloud.syncCode;
  els.autoSyncToggle.checked = state.cloud.autoSync;
  const ready = Boolean(state.cloud.apiUrl && state.cloud.syncCode);
  if (!ready) {
    setCloudStatus("填写后端地址和同步码后，可以把词库保存到云端。");
  } else if (!els.cloudStatus.textContent || els.cloudStatus.textContent === "还没有连接云端。") {
    setCloudStatus(state.cloud.autoSync ? "云端已配置，保存后会自动上传。" : "云端已配置，可以手动上传或恢复。");
  }
}

function scheduleCloudSync() {
  if (!state.cloud.autoSync || !state.cloud.apiUrl || !state.cloud.syncCode) return;
  window.clearTimeout(state.syncTimer);
  state.syncTimer = window.setTimeout(() => {
    uploadToCloud({ quiet: true });
  }, 900);
}

async function uploadToCloud({ quiet = false } = {}) {
  if (state.syncing) return;
  applyCloudSettingsFromInputs();
  const endpoint = getCloudEndpoint();
  state.syncing = true;
  if (!quiet) setCloudStatus("正在上传词库…");
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        words: state.words,
        settings: state.settings,
        updatedAt: new Date().toISOString(),
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "上传失败。");
    setCloudStatus(`已上传 ${state.words.length} 个词条到云端。`);
  } finally {
    state.syncing = false;
  }
}

function mergeWords(localWords, remoteWords) {
  const byKey = new Map();
  [...remoteWords, ...localWords].forEach((word) => {
    if (!word || !word.term) return;
    const key = String(word.id || word.term).toLowerCase();
    byKey.set(key, {
      ...word,
      id: word.id || createId(),
      createdAt: word.createdAt || new Date().toISOString(),
    });
  });
  return Array.from(byKey.values()).sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
}

async function downloadFromCloud() {
  applyCloudSettingsFromInputs();
  const endpoint = getCloudEndpoint();
  setCloudStatus("正在从云端恢复…");
  const response = await fetch(endpoint);
  const data = await response.json().catch(() => ({}));
  if (response.status === 404) {
    setCloudStatus("云端还没有这个同步码的数据，可以先点“上传”。");
    return;
  }
  if (!response.ok) throw new Error(data.error || "恢复失败。");
  const remoteWords = Array.isArray(data.words) ? data.words : [];
  state.words = mergeWords(state.words, remoteWords);
  saveWords();
  updateScreen();
  setCloudStatus(`已从云端恢复 ${remoteWords.length} 个词条，本机现在共 ${state.words.length} 个。`);
}

function setMoreFields(open) {
  els.extraFields.hidden = !open;
  els.moreFieldsBtn.textContent = open ? "收起" : "更多";
  els.moreFieldsBtn.setAttribute("aria-expanded", String(open));
}

function setBulkOpen(open) {
  els.bulkBody.hidden = !open;
  els.bulkToggleBtn.textContent = open ? "收起" : "展开";
  els.bulkToggleBtn.setAttribute("aria-expanded", String(open));
}

function startSentenceVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    setSingleStatus("当前浏览器不支持语音输入，可以先用手机键盘自带的语音输入。");
    return;
  }
  setMoreFields(true);
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  els.sentenceVoiceBtn.classList.add("listening");
  els.sentenceVoiceBtn.textContent = "听取中";
  setSingleStatus("请说一句英文例句。");
  recognition.onresult = (event) => {
    const text = event.results?.[0]?.[0]?.transcript || "";
    if (text) {
      els.sentenceInput.value = text;
      setSingleStatus("例句已填入。");
    }
  };
  recognition.onerror = () => {
    setSingleStatus("语音没有识别成功，可以再试一次或用键盘语音输入。");
  };
  recognition.onend = () => {
    els.sentenceVoiceBtn.classList.remove("listening");
    els.sentenceVoiceBtn.textContent = "语音";
  };
  recognition.start();
}

function getPhoneUrl() {
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return window.location.href;
  }
  return "http://电脑IP地址:5173";
}

function showInstallHelp() {
  const phoneUrl = getPhoneUrl();
  els.phoneUrlText.textContent =
    phoneUrl.includes("电脑IP地址")
      ? "你现在是用本地文件打开的。手机使用时，请用电脑启动本地网页服务，再在手机打开：http://电脑IP地址:5173。"
      : `电脑和手机连同一个 Wi-Fi 后，用手机浏览器打开：${phoneUrl}`;
  if (typeof els.installDialog.showModal === "function") {
    els.installDialog.showModal();
  } else {
    alert(els.phoneUrlText.textContent);
  }
}

async function checkStoragePersistence() {
  if (state.durableStorage) {
    return "词库已写入浏览器数据库，比普通页面缓存更稳定。";
  }
  if (!("storage" in navigator) || typeof navigator.storage.persisted !== "function") {
    return "当前浏览器可以保存词库，但不支持主动保护数据。建议定期导出备份。";
  }
  const persisted = await navigator.storage.persisted();
  return persisted
    ? "当前词库已受到浏览器保护，长期保存更稳。"
    : "当前词库会保存在这个浏览器里，但系统空间紧张时仍可能清理。";
}

async function updateStorageStatus() {
  const prefix =
    window.location.protocol === "file:"
      ? "现在是本地文件试用模式。"
      : "现在是网页 App 模式。";
  try {
    els.storageStatus.textContent = `${prefix}${await checkStoragePersistence()}`;
  } catch {
    els.storageStatus.textContent = `${prefix}词库会尽量保存在这个浏览器里，建议定期导出备份。`;
  }
}

async function protectStorage() {
  if (!("storage" in navigator) || typeof navigator.storage.persist !== "function") {
    els.storageStatus.textContent = state.durableStorage
      ? "词库已写入浏览器数据库。当前浏览器不支持额外保护，建议定期导出备份。"
      : "当前浏览器不支持主动保护数据。可以用“导出”定期备份词库。";
    return;
  }
  const granted = await navigator.storage.persist();
  els.storageStatus.textContent = granted
    ? "已请求保护成功，词库长期保存更稳。"
    : "浏览器暂时没有允许保护。继续使用没问题，但建议定期导出备份。";
}

function setNextIndex(direction = 1) {
  const playable = getPlayableWords();
  if (!playable.length) return;
  if (state.settings.shuffle && direction > 0 && playable.length > 1) {
    let next = state.index;
    while (next === state.index) {
      next = Math.floor(Math.random() * playable.length);
    }
    state.index = next;
  } else {
    state.index = (state.index + direction + playable.length) % playable.length;
  }
  updateScreen();
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getVoice(langPrefix = "en") {
  const selected = state.voices.find((voice) => voice.name === state.settings.voiceName);
  if (selected) return selected;
  return (
    state.voices.find((voice) => voice.lang.toLowerCase().startsWith(`${langPrefix}-`)) ||
    state.voices.find((voice) => voice.lang.toLowerCase().startsWith(langPrefix)) ||
    null
  );
}

function speakText(text, lang = "en-US") {
  return new Promise((resolve) => {
    const clean = String(text || "").trim();
    if (!clean || !("speechSynthesis" in window)) {
      resolve();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang;
    utterance.rate = Number(state.settings.rate);
    utterance.pitch = 1;
    if (lang.startsWith("en")) {
      const voice = getVoice("en");
      if (voice) utterance.voice = voice;
    }
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.speak(utterance);
  });
}

async function speakWord(word) {
  if (!word || state.speaking) return;
  state.speaking = true;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  const repeatCount = Number(state.settings.repeat);
  for (let i = 0; i < repeatCount && state.playing; i += 1) {
    await speakText(word.term, "en-US");
    await wait(state.settings.gap);
  }

  if (state.settings.shadowing && state.playing) {
    state.shadowingNow = true;
    updateScreen();
    await speakText("Your turn.", "en-US");
    await wait(state.settings.shadowGap);
    state.shadowingNow = false;
    updateScreen();
  }

  if (state.settings.speakMeaning && word.meaning && state.playing) {
    await speakText(word.meaning, "zh-CN");
    await wait(state.settings.gap);
  }

  if (state.settings.speakSentence && word.sentence && state.playing) {
    await speakText(word.sentence, "en-US");
    await wait(state.settings.gap);
  }

  word.listenCount = (word.listenCount || 0) + 1;
  saveWords();
  state.speaking = false;
}

async function playLoop() {
  if (!getCurrentWord()) {
    stopPlayback();
    return;
  }

  state.playing = true;
  updateScreen();

  while (state.playing && getCurrentWord()) {
    await speakWord(getCurrentWord());
    if (!state.playing) break;
    setNextIndex(1);
  }

  stopPlayback();
}

function stopPlayback() {
  state.playing = false;
  state.speaking = false;
  state.shadowingNow = false;
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  updateScreen();
}

async function speakOnce(word) {
  const wasPlaying = state.playing;
  state.playing = true;
  updateScreen();
  await speakWord(word);
  state.playing = wasPlaying;
  updateScreen();
}

function toggleKnown(id) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return;
  word.known = !word.known;
  saveWords();
  updateScreen();
}

function removeWord(id) {
  const index = state.words.findIndex((word) => word.id === id);
  if (index < 0) return;
  state.words.splice(index, 1);
  state.index = Math.min(state.index, Math.max(0, getPlayableWords().length - 1));
  saveWords();
  updateScreen();
}

function exportWords() {
  const data = JSON.stringify({ words: state.words }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `drive-english-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function renderVoices() {
  if (!("speechSynthesis" in window)) {
    els.voiceSelect.innerHTML = `<option>当前浏览器不支持朗读</option>`;
    return;
  }

  state.voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("en"))
    .sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));

  if (!state.voices.length) {
    els.voiceSelect.innerHTML = `<option>使用默认英文语音</option>`;
    return;
  }

  els.voiceSelect.textContent = "";
  state.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} · ${voice.lang}`;
    option.selected = voice.name === state.settings.voiceName;
    els.voiceSelect.append(option);
  });
}

function bindEvents() {
  els.playBtn.addEventListener("click", () => {
    if (state.playing) {
      stopPlayback();
    } else {
      playLoop();
    }
  });

  els.prevBtn.addEventListener("click", () => {
    stopPlayback();
    setNextIndex(-1);
    speakOnce(getCurrentWord());
  });

  els.nextBtn.addEventListener("click", () => {
    stopPlayback();
    setNextIndex(1);
    speakOnce(getCurrentWord());
  });

  els.familiarBtn.addEventListener("click", () => {
    const word = getCurrentWord();
    if (word) toggleKnown(word.id);
  });

  els.repeatBtn.addEventListener("click", () => {
    state.settings.repeat = state.settings.repeat >= 5 ? 1 : state.settings.repeat + 1;
    saveSettings();
    updateScreen();
  });

  els.shadowBtn.addEventListener("click", () => {
    state.settings.shadowing = !state.settings.shadowing;
    saveSettings();
    updateScreen();
  });

  els.shuffleBtn.addEventListener("click", () => {
    state.settings.shuffle = !state.settings.shuffle;
    saveSettings();
    updateScreen();
  });

  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  els.moreFieldsBtn.addEventListener("click", () => {
    setMoreFields(els.extraFields.hidden);
  });

  els.sentenceVoiceBtn.addEventListener("click", startSentenceVoiceInput);

  els.bulkToggleBtn.addEventListener("click", () => {
    setBulkOpen(els.bulkBody.hidden);
  });

  els.singleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      let term = els.termInput.value.trim();
      const meaning = els.meaningInput.value.trim();
      if (!term && !meaning) {
        setSingleStatus("先输入英文，或者只输入中文意思也可以。");
        return;
      }
      if (!term && meaning) {
        setSingleStatus("正在把中文翻译成英文…");
        term = await translateChineseToEnglish(meaning);
        els.termInput.value = term;
      }
      const word = createWord({
        term,
        meaning,
        phonetic: els.phoneticInput.value,
        sentence: els.sentenceInput.value,
      });
      const result = addWords([word]);
      if (result.added) {
        els.singleForm.reset();
        setMoreFields(false);
        els.termInput.focus();
        setSingleStatus(
          result.saved
            ? `已保存：${word.term}`
            : `已加入：${word.term}。当前打开方式不适合长期保存，建议发布成网页 App 后使用。`
        );
        setBulkStatus("");
        switchTab("library");
      } else {
        setSingleStatus(`“${word.term}”已经在词库里了。`);
      }
    } catch {
      setSingleStatus("没有自动找到英文。可以先手动填英文，再保存。");
    }
  });

  els.sampleBtn.addEventListener("click", () => {
    setBulkOpen(true);
    els.bulkInput.value = sampleWords
      .map((word) => `${word.term} | ${basicPhonetics[word.term] || ""} | ${word.meaning} | ${word.sentence}`)
      .join("\n");
    setBulkStatus("示例已填入，可以点“加入词库”。");
  });

  els.bulkAddBtn.addEventListener("click", () => {
    try {
      const parsed = parseBulkText(els.bulkInput.value);
      const result = addWords(parsed);
      if (!result.total) {
        setBulkStatus("先输入要添加的单词。每行可以写：英文 | 中文 | 例句。");
        return;
      }
      if (result.added) {
        els.bulkInput.value = "";
        const savedText = result.saved ? "" : " 当前打开方式不适合长期保存，建议发布成网页 App 后使用。";
        setBulkStatus(`已加入 ${result.added} 个词条${result.duplicates ? `，${result.duplicates} 个已存在` : ""}。${savedText}`);
        setSingleStatus("");
        switchTab("library");
      } else {
        setBulkStatus(`这些词已经都在词库里了，可以到“词库”查看。`);
        switchTab("library");
      }
    } catch {
      setBulkStatus("加入词库没有成功，检查格式后再试一次。");
    }
  });

  els.fileInput.addEventListener("change", async () => {
    const file = els.fileInput.files[0];
    if (!file) return;
    try {
      const result = addWords(await parseFile(file));
      const savedText = result.saved ? "" : " 当前打开方式不适合长期保存，建议发布成网页 App 后使用。";
      setBulkStatus(`已从文件加入 ${result.added} 个词条${result.duplicates ? `，${result.duplicates} 个已存在` : ""}。${savedText}`);
      if (result.added || result.duplicates) switchTab("library");
      els.fileInput.value = "";
    } catch {
      alert("文件没有读成功。可以先用 txt/csv，每行：英文 | 中文 | 例句。");
    }
  });

  els.searchInput.addEventListener("input", renderWordList);
  els.exportBtn.addEventListener("click", exportWords);
  els.clearDoneBtn.addEventListener("click", () => {
    state.settings.hideKnown = !state.settings.hideKnown;
    saveSettings();
    updateScreen();
  });
  els.clearAllBtn.addEventListener("click", () => {
    if (!state.words.length) return;
    if (confirm("确定清空所有词条吗？")) {
      stopPlayback();
      state.words = [];
      saveWords();
      updateScreen();
    }
  });

  els.voiceSelect.addEventListener("change", () => {
    state.settings.voiceName = els.voiceSelect.value;
    saveSettings();
  });

  els.rateInput.addEventListener("input", () => {
    state.settings.rate = Number(els.rateInput.value);
    saveSettings();
    updateScreen();
  });

  els.gapInput.addEventListener("input", () => {
    state.settings.gap = Math.round(Number(els.gapInput.value) * 1000);
    saveSettings();
    updateScreen();
  });

  els.shadowGapInput.addEventListener("input", () => {
    state.settings.shadowGap = Math.round(Number(els.shadowGapInput.value) * 1000);
    saveSettings();
    updateScreen();
  });

  els.shadowToggle.addEventListener("change", () => {
    state.settings.shadowing = els.shadowToggle.checked;
    saveSettings();
    updateScreen();
  });

  els.meaningToggle.addEventListener("change", () => {
    state.settings.speakMeaning = els.meaningToggle.checked;
    saveSettings();
    updateScreen();
  });

  els.sentenceToggle.addEventListener("change", () => {
    state.settings.speakSentence = els.sentenceToggle.checked;
    saveSettings();
    updateScreen();
  });

  els.skipKnownToggle.addEventListener("change", () => {
    state.settings.skipKnown = els.skipKnownToggle.checked;
    state.index = 0;
    saveSettings();
    updateScreen();
  });

  els.protectStorageBtn.addEventListener("click", protectStorage);

  els.generateSyncCodeBtn.addEventListener("click", () => {
    els.syncCodeInput.value = createSyncCode();
    applyCloudSettingsFromInputs();
    setCloudStatus("已生成同步码，请自己保存好。换手机时用同一个同步码恢复。");
  });

  els.saveCloudSettingsBtn.addEventListener("click", () => {
    applyCloudSettingsFromInputs();
    setCloudStatus(state.cloud.apiUrl && state.cloud.syncCode ? "云端设置已保存。" : "请填写后端地址和同步码。");
  });

  els.uploadCloudBtn.addEventListener("click", async () => {
    try {
      await uploadToCloud();
    } catch (error) {
      setCloudStatus(error.message || "上传失败，请检查后端地址。");
    }
  });

  els.downloadCloudBtn.addEventListener("click", async () => {
    try {
      await downloadFromCloud();
    } catch (error) {
      setCloudStatus(error.message || "恢复失败，请检查后端地址。");
    }
  });

  els.autoSyncToggle.addEventListener("change", () => {
    applyCloudSettingsFromInputs();
    setCloudStatus(state.cloud.autoSync ? "已开启自动上传。" : "已关闭自动上传。");
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
  });

  els.installBtn.addEventListener("click", async () => {
    if (!state.deferredInstallPrompt) {
      showInstallHelp();
      return;
    }
    state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
    state.deferredInstallPrompt = null;
  });

  document.addEventListener("visibilitychange", () => {
    if (!("speechSynthesis" in window)) return;
    if (document.hidden) window.speechSynthesis.pause();
    else window.speechSynthesis.resume();
  });
}

function registerServiceWorker() {
  if (window.location.protocol === "file:" || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}

async function init() {
  try {
    await hydrateFromDatabase();
    bindEvents();
    renderVoices();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = renderVoices;
    }
    registerServiceWorker();
    updateScreen();
    updateStorageStatus();
    updateCloudUi();
  } catch (error) {
    setAppStatus(`页面初始化遇到问题：${error.message}`);
  }
}

init();
