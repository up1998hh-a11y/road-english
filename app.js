const STORAGE_KEY = "drive-english-v1";
const SETTINGS_KEY = "drive-english-settings-v1";
const TRANSLATION_CACHE_KEY = "drive-english-translation-cache-v1";
const PHONETIC_CACHE_KEY = "drive-english-phonetic-cache-v1";
const PLAN_KEY = "drive-english-plan-v1";
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
  efficient: "/ɪˈfɪʃnt/",
  persistent: "/pərˈsɪstənt/",
  backend: "/ˈbækˌend/",
  frontend: "/ˈfrʌntˌend/",
  upload: "/ˌʌpˈloʊd/",
  download: "/ˌdaʊnˈloʊd/",
  sync: "/sɪŋk/",
  familiar: "/fəˈmɪliər/",
  translate: "/trænzˈleɪt/",
  phonetic: "/fəˈnetɪk/",
  storage: "/ˈstɔːrɪdʒ/",
  cloud: "/klaʊd/",
  deploy: "/dɪˈplɔɪ/",
};

const britishStyleVoiceLangs = ["en-gb", "en-ie", "en-au", "en-nz", "en-za"];
const americanStyleVoiceLangs = ["en-us", "en-ca"];
const preferredEnglishVoiceLangs = ["en-gb", "en-us", "en-ca", "en-ie", "en-au", "en-nz", "en-za"];
const VOICE_LIMIT = 18;
const highQualityVoicePatterns = [
  /enhanced/i,
  /premium/i,
  /neural/i,
  /natural/i,
  /siri/i,
  /优化音质/i,
  /精品/i,
  /alex/i,
  /allison/i,
  /ava/i,
  /joelle/i,
  /joey/i,
  /kendra/i,
  /kimberly/i,
  /matthew/i,
  /nicky/i,
  /samantha/i,
  /susan/i,
  /tom/i,
  /zoe/i,
];
const roboticVoicePatterns = [
  /compact/i,
  /eloquence/i,
  /novelty/i,
  /robot/i,
  /zarvox/i,
  /trinoids/i,
  /whisper/i,
  /boing/i,
  /bubbles/i,
  /cellos/i,
  /bells/i,
  /organ/i,
  /jester/i,
  /superstar/i,
  /bad news/i,
  /good news/i,
  /fred/i,
  /albert/i,
  /bahh/i,
  /hysterical/i,
  /junior/i,
  /ralph/i,
  /wobble/i,
];

const defaultSettings = {
  rate: 0.9,
  gap: 1000,
  repeat: 2,
  shadowing: false,
  shadowGap: 4000,
  shuffle: false,
  loopCurrent: false,
  speakMeaning: false,
  speakSentence: true,
  skipKnown: false,
  hardOnly: false,
  voiceName: "",
  hideKnown: false,
};

const defaultPlan = {
  date: "",
  target: 30,
};

const state = {
  words: loadWords(),
  settings: loadSettings(),
  plan: loadPlan(),
  index: 0,
  playing: false,
  speaking: false,
  playbackMode: "",
  activeSpeechToken: 0,
  voices: [],
  deferredInstallPrompt: null,
  translationCache: loadTranslationCache(),
  phoneticCache: loadPhoneticCache(),
  translatingIds: new Set(),
  shadowingNow: false,
  storageAvailable: true,
  db: null,
  durableStorage: false,
  playbackToken: 0,
  lastInterruptAt: 0,
  waiters: new Set(),
  wordListDirty: true,
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
  hardBtn: $("#hardBtn"),
  repeatBtn: $("#repeatBtn"),
  loopCurrentBtn: $("#loopCurrentBtn"),
  hardModeBtn: $("#hardModeBtn"),
  shuffleBtn: $("#shuffleBtn"),
  shadowBtn: $("#shadowBtn"),
  tabs: document.querySelectorAll(".tab"),
  tabsNav: $(".tabs"),
  panels: {
    add: $("#addPanel"),
    plan: $("#planPanel"),
    library: $("#libraryPanel"),
    settings: $("#settingsPanel"),
  },
  singleForm: $("#singleForm"),
  termInput: $("#termInput"),
  meaningInput: $("#meaningInput"),
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
  planSummary: $("#planSummary"),
  planRate: $("#planRate"),
  planDateInput: $("#planDateInput"),
  planTargetInput: $("#planTargetInput"),
  savePlanBtn: $("#savePlanBtn"),
  planProgressBar: $("#planProgressBar"),
  statTotal: $("#statTotal"),
  statKnown: $("#statKnown"),
  statLearning: $("#statLearning"),
  statHard: $("#statHard"),
  planStatus: $("#planStatus"),
  hardListCount: $("#hardListCount"),
  knownListCount: $("#knownListCount"),
  hardFocusList: $("#hardFocusList"),
  knownFocusList: $("#knownFocusList"),
  voiceSelect: $("#voiceSelect"),
  voiceNote: $("#voiceNote"),
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

function loadPhoneticCache() {
  try {
    return JSON.parse(window.localStorage.getItem(PHONETIC_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadPlan() {
  try {
    return {
      ...defaultPlan,
      ...JSON.parse(window.localStorage.getItem(PLAN_KEY) || "{}"),
    };
  } catch {
    return { ...defaultPlan };
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
    return true;
  } catch {
    state.storageAvailable = false;
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

function savePhoneticCache() {
  if (state.db) {
    saveMetaToDatabase("phoneticCache", state.phoneticCache);
  }
  try {
    window.localStorage.setItem(PHONETIC_CACHE_KEY, JSON.stringify(state.phoneticCache));
    return true;
  } catch {
    return false;
  }
}

function savePlan() {
  try {
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(state.plan));
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
    hard: false,
    createdAt: new Date().toISOString(),
    listenCount: 0,
  };
}

function normalizeWord(raw) {
  if (!raw || typeof raw !== "object") return null;
  const term = String(raw.term || raw.word || raw.english || "").trim();
  if (!term) return null;
  const word = createWord({
    term,
    meaning: String(raw.meaning || raw.chinese || raw.translation || "").trim(),
    phonetic: String(raw.phonetic || raw.ipa || raw.pronunciation || "").trim(),
    sentence: String(raw.sentence || raw.example || "").trim(),
  });
  word.known = Boolean(raw.known);
  word.hard = Boolean(raw.hard);
  return word;
}

function getPlayableWords() {
  const list = state.words.filter((word) => {
    if (state.settings.hardOnly && !word.hard) return false;
    if (state.settings.skipKnown && word.known) return false;
    return true;
  });
  return list;
}

function getCurrentWord() {
  const list = getPlayableWords();
  if (!list.length) return null;
  if (state.index >= list.length) state.index = 0;
  return list[state.index];
}

function cleanMeaningText(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const normalized = text.replace(/\s+/g, " ");
  const primary = normalized
    .split(/[;；|/、，,\n]/)
    .map((item) => item.trim())
    .find((item) => item && !/^[-–—]$/.test(item));
  if (primary && primary !== normalized) return primary;
  if (hasChineseText(normalized)) {
    return normalized.split(/\s+/).find(Boolean) || normalized;
  }
  return primary || normalized;
}

function getPhoneticLookupTerm(value) {
  const text = String(value || "").trim();
  const match = text.match(/[A-Za-z]+(?:['-][A-Za-z]+)?/);
  return match ? match[0] : text;
}

function getTermParts(value) {
  const text = String(value || "").trim();
  const match = text.match(/[A-Za-z][A-Za-z'’-]*(?:[-\s][A-Za-z][A-Za-z'’-]*)*/);
  const english = match ? match[0].replace(/\s+/g, " ").trim() : "";
  const meaning = english ? text.replace(english, " ").trim() : "";
  return { english, meaning };
}

function getDisplayTerm(word) {
  const term = String(word?.term || "").trim();
  return getTermParts(term).english || term;
}

function getEmbeddedMeaning(word) {
  const meaning = getTermParts(word?.term).meaning;
  return hasChineseText(meaning) ? cleanMeaningText(meaning) : "";
}

function getDisplayMeaning(word) {
  return cleanMeaningText(word?.meaning) || getEmbeddedMeaning(word);
}

function fitCurrentTerm() {
  const term = els.currentTerm;
  if (!term) return;
  term.style.removeProperty("font-size");

  window.requestAnimationFrame(() => {
    const available = term.clientWidth;
    const actual = term.scrollWidth;
    if (!available || !actual || actual <= available) return;

    const style = window.getComputedStyle(term);
    const currentSize = Number.parseFloat(style.fontSize);
    const fittedSize = Math.max(28, Math.floor(currentSize * (available / actual) * 0.98));
    term.style.fontSize = `${fittedSize}px`;
  });
}

function updateScreen() {
  const playable = getPlayableWords();
  const word = getCurrentWord();
  const total = state.words.length;
  const known = state.words.filter((item) => item.known).length;
  const hard = state.words.filter((item) => item.hard).length;

  els.countLabel.textContent = `${total} 个词条${known ? `，${known} 个熟悉` : ""}${hard ? `，${hard} 个难词` : ""}`;
  els.playModeLabel.textContent = state.settings.loopCurrent
    ? "单词循环"
    : state.settings.shuffle
      ? state.settings.hardOnly
        ? "难词随机"
        : "列表随机"
      : state.settings.hardOnly
        ? "难词循环"
        : "列表循环";
  els.repeatBtn.textContent = `重复 ${state.settings.repeat} 次`;
  els.loopCurrentBtn.textContent = state.settings.loopCurrent ? "正在循环" : "循环本词";
  els.hardModeBtn.textContent = state.settings.hardOnly ? "听全部词" : hard ? "只听难词" : "暂无难词";
  els.shuffleBtn.textContent = state.settings.shuffle ? "列表随机" : "列表循环";
  els.shadowBtn.textContent = state.settings.shadowing ? "跟读开启" : "跟读关闭";
  els.familiarBtn.disabled = !word;
  els.hardBtn.disabled = !word;
  els.loopCurrentBtn.disabled = !word;
  els.hardModeBtn.disabled = !hard && !state.settings.hardOnly;
  els.prevBtn.disabled = !word;
  els.nextBtn.disabled = !word;
  els.playBtn.disabled = !word;
  els.playIcon.textContent = state.playing ? "Ⅱ" : "▶";
  els.playBtn.setAttribute("aria-label", state.playing ? "暂停" : "播放");
  els.shadowStatus.hidden = !state.shadowingNow;
  const termCard = document.querySelector(".term-card");
  termCard.classList.toggle("known-current", Boolean(word?.known));
  termCard.classList.toggle("hard-current", Boolean(word?.hard));
  termCard.classList.toggle("long-term", Boolean(word && getDisplayTerm(word).length > 8));
  els.familiarBtn.classList.toggle("active-known", Boolean(word?.known));
  els.hardBtn.classList.toggle("active-hard", Boolean(word?.hard));
  els.loopCurrentBtn.classList.toggle("active-loop", Boolean(state.settings.loopCurrent));
  els.hardModeBtn.classList.toggle("active-hard", Boolean(state.settings.hardOnly));

  if (!word) {
    els.termMeta.textContent = total ? "没有待播放词条" : "未开始";
    els.currentTerm.textContent = total ? (state.settings.hardOnly ? "还没有难词" : "都熟悉了") : "先添加单词";
    els.currentPhonetic.textContent = "";
    els.currentMeaning.textContent = total
      ? state.settings.hardOnly
        ? "把不会的词标记为难词，就可以在这里循环听。"
        : "关闭“跳过熟悉词”可以继续复习。"
      : "添加后可以一键循环听。";
    els.currentSentence.textContent = "";
    els.progressBar.style.width = "0%";
  } else {
    const position = playable.findIndex((item) => item.id === word.id) + 1;
    const displayTerm = getDisplayTerm(word);
    const displayMeaning = getDisplayMeaning(word);
    const phoneticKey = getPhoneticLookupTerm(displayTerm).toLowerCase();
    const phoneticLookupId = `phonetic-${word.id}`;
    const phoneticText =
      word.phonetic ||
      (state.translatingIds.has(phoneticLookupId)
        ? "正在查音标…"
        : state.phoneticCache[phoneticKey]?.triedAt
          ? "暂无音标"
          : "等待查音标");
    els.termMeta.textContent = `${position} / ${playable.length}`;
    els.currentTerm.textContent = displayTerm;
    els.currentPhonetic.textContent = phoneticText;
    els.currentMeaning.textContent =
      displayMeaning || (state.translatingIds.has(word.id) ? "正在自动翻译…" : "可手动补充释义");
    els.currentSentence.textContent = word.sentence || "";
    els.familiarBtn.textContent = word.known ? "取消熟悉" : "标记熟悉";
    els.hardBtn.textContent = word.hard ? "取消难词" : "标记难词";
    els.progressBar.style.width = `${(position / playable.length) * 100}%`;
    autoTranslateWord(word);
    autoFillPhonetic(word);
  }

  fitCurrentTerm();

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

  if (state.wordListDirty) {
    renderWordList();
  }
  updatePlanPanel();
}

function renderWordList() {
  state.wordListDirty = false;
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
    node.classList.toggle("hard-item", word.hard);
    const main = node.querySelector(".word-main");
    const speak = node.querySelector(".speak");
    const hard = node.querySelector(".hard");
    const known = node.querySelector(".known");
    const deleteBtn = node.querySelector(".delete");
    const displayTerm = getDisplayTerm(word);
    const displayMeaning = getDisplayMeaning(word);

    main.innerHTML = `
      <strong>${escapeHtml(displayTerm)}</strong>
      ${word.phonetic ? `<em>${escapeHtml(word.phonetic)}</em>` : ""}
      <span>${escapeHtml(displayMeaning || (state.translatingIds.has(word.id) ? "正在自动翻译…" : "可手动补充释义"))}</span>
      ${word.sentence ? `<small>${escapeHtml(word.sentence)}</small>` : ""}
    `;
    hard.textContent = word.hard ? "难词中" : "难词";
    hard.classList.toggle("active", word.hard);
    known.textContent = word.known ? "已熟悉" : "熟悉";
    known.classList.toggle("active", word.known);

    main.addEventListener("click", () => {
      setCurrentWordById(word.id);
      switchTab("add");
      speakOnce(word, { interrupt: true });
    });
    speak.addEventListener("click", () => {
      setCurrentWordById(word.id);
      speakOnce(word, { interrupt: true });
    });
    hard.addEventListener("click", () => toggleHard(word.id));
    known.addEventListener("click", () => toggleKnown(word.id));
    deleteBtn.addEventListener("click", () => removeWord(word.id));
    els.wordList.append(node);
  });
}

function getPlanDateLabel() {
  if (!state.plan.date) return "未设置日期";
  const date = new Date(`${state.plan.date}T00:00:00`);
  if (Number.isNaN(date.getTime())) return state.plan.date;
  return date.toLocaleDateString("zh-CN", { month: "long", day: "numeric" });
}

function renderMiniWordList(container, words, emptyText) {
  container.textContent = "";
  if (!words.length) {
    const empty = document.createElement("p");
    empty.className = "empty-mini";
    empty.textContent = emptyText;
    container.append(empty);
    return;
  }

  words.slice(0, 12).forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mini-word";
    button.innerHTML = `
      <strong>${escapeHtml(getDisplayTerm(word))}</strong>
      <span>${escapeHtml(getDisplayMeaning(word) || "可补充释义")}</span>
    `;
    button.addEventListener("click", () => {
      setCurrentWordById(word.id);
      switchTab("add");
      speakOnce(word, { interrupt: true });
    });
    container.append(button);
  });
}

function updatePlanPanel() {
  const total = state.words.length;
  const knownWords = state.words.filter((word) => word.known);
  const hardWords = state.words.filter((word) => word.hard);
  const known = knownWords.length;
  const hard = hardWords.length;
  const learning = Math.max(0, total - known);
  const target = Math.max(1, Number(state.plan.target) || defaultPlan.target);
  const rate = Math.min(100, Math.round((known / target) * 100));

  els.planDateInput.value = state.plan.date || new Date().toISOString().slice(0, 10);
  els.planTargetInput.value = target;
  els.planRate.textContent = `${rate}%`;
  els.planSummary.textContent = `${getPlanDateLabel()} 目标 ${target} 个，已熟悉 ${known} 个，还差 ${Math.max(0, target - known)} 个。`;
  els.planProgressBar.style.width = `${rate}%`;
  els.statTotal.textContent = total;
  els.statKnown.textContent = known;
  els.statLearning.textContent = learning;
  els.statHard.textContent = hard;
  els.hardListCount.textContent = `${hard} 个`;
  els.knownListCount.textContent = `${known} 个`;
  renderMiniWordList(els.hardFocusList, hardWords, "还没有难词。遇到卡住的词，点“标记难词”。");
  renderMiniWordList(els.knownFocusList, knownWords, "还没有熟悉词。会的词可以点“标记熟悉”。");
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
  if (!word || word.meaning || getEmbeddedMeaning(word) || state.translatingIds.has(word.id)) return;
  const term = getDisplayTerm(word);
  const cacheKey = term.toLowerCase();
  if (basicTranslations[cacheKey]) {
    word.meaning = cleanMeaningText(basicTranslations[cacheKey]);
    state.wordListDirty = true;
    saveWords();
    updateScreen();
    return;
  }

  if (state.translationCache[cacheKey]) {
    word.meaning = cleanMeaningText(state.translationCache[cacheKey]);
    state.wordListDirty = true;
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
    const cleanTranslated = cleanMeaningText(translated);
    if (cleanTranslated && cleanTranslated.toLowerCase() !== term.toLowerCase()) {
      word.meaning = cleanTranslated;
      state.translationCache[cacheKey] = cleanTranslated;
      state.wordListDirty = true;
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

function fetchWithTimeout(url, timeout = 3000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  return fetch(url, { signal: controller.signal }).finally(() => window.clearTimeout(timer));
}

function shouldRetryPhonetic(cacheItem) {
  if (!cacheItem || typeof cacheItem !== "object") return true;
  if (cacheItem.value) return true;
  const lastTried = Date.parse(cacheItem.triedAt || "");
  if (!lastTried) return true;
  return Date.now() - lastTried > 10 * 60 * 1000;
}

async function autoFillPhonetic(word) {
  if (!word || word.phonetic || state.translatingIds.has(`phonetic-${word.id}`)) return;
  const term = getPhoneticLookupTerm(getDisplayTerm(word));
  if (!term) return;
  const cacheKey = term.toLowerCase();
  if (basicPhonetics[cacheKey]) {
    word.phonetic = basicPhonetics[cacheKey];
    state.phoneticCache[cacheKey] = { value: word.phonetic, triedAt: new Date().toISOString() };
    state.wordListDirty = true;
    savePhoneticCache();
    saveWords();
    updateScreen();
    return;
  }

  const cached = state.phoneticCache[cacheKey];
  if (cached?.value) {
    word.phonetic = cached.value;
    state.wordListDirty = true;
    saveWords();
    updateScreen();
    return;
  }
  if (!shouldRetryPhonetic(cached)) return;

  state.translatingIds.add(`phonetic-${word.id}`);
  try {
    const response = await fetchWithTimeout(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`,
      3000
    );
    if (!response.ok) throw new Error("Phonetic request failed");
    const data = await response.json();
    const entry = Array.isArray(data) ? data[0] : null;
    const phoneticText = entry?.phonetics?.find((item) => item.text)?.text || entry?.phonetic || "";
    const phonetic = phoneticText
      ? phoneticText.startsWith("/") || phoneticText.startsWith("[")
        ? phoneticText
        : `/${phoneticText}/`
      : "";
    if (phonetic) {
      word.phonetic = phonetic;
      state.phoneticCache[cacheKey] = { value: phonetic, triedAt: new Date().toISOString() };
      state.wordListDirty = true;
      savePhoneticCache();
      saveWords();
    } else {
      state.phoneticCache[cacheKey] = { value: "", triedAt: new Date().toISOString() };
      savePhoneticCache();
    }
  } catch {
    state.phoneticCache[cacheKey] = { value: "", triedAt: new Date().toISOString() };
    savePhoneticCache();
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
  state.wordListDirty = true;
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

window.switchRoadEnglishTab = switchTab;

function setBulkStatus(message) {
  els.bulkStatus.textContent = message;
}

function setSingleStatus(message) {
  els.singleStatus.textContent = message;
}

function setAppStatus(message) {
  els.appStatus.textContent = message;
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
  if (!els.phoneUrlText || !els.installDialog) return;
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

function setCurrentWordById(id) {
  const playableIndex = getPlayableWords().findIndex((item) => item.id === id);
  if (playableIndex >= 0) {
    state.index = playableIndex;
    updateScreen();
  }
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
  return new Promise((resolve) => {
    let timer;
    const resolveWait = () => {
      window.clearTimeout(timer);
      state.waiters.delete(resolveWait);
      resolve();
    };
    timer = window.setTimeout(resolveWait, ms);
    state.waiters.add(resolveWait);
  });
}

function interruptSpeech() {
  state.playbackToken += 1;
  state.speaking = false;
  state.activeSpeechToken = 0;
  state.shadowingNow = false;
  state.lastInterruptAt = performance.now();
  state.waiters.forEach((resolve) => resolve());
  state.waiters.clear();
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
  }
}

async function settleSpeechEngine(token) {
  const elapsed = performance.now() - state.lastInterruptAt;
  const delay = Math.max(0, 90 - elapsed);
  if (delay) await wait(delay);
  return token === state.playbackToken;
}

function getVoiceLangRank(voice) {
  const lang = voice.lang.toLowerCase();
  const rank = preferredEnglishVoiceLangs.findIndex((prefix) => lang.startsWith(prefix));
  return rank === -1 ? preferredEnglishVoiceLangs.length : rank;
}

function isNaturalEnglishVoice(voice) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  if (!lang.startsWith("en")) return false;
  if (roboticVoicePatterns.some((pattern) => pattern.test(name))) return false;
  return true;
}

function hasBritishStyleAccent(voice) {
  const lang = voice.lang.toLowerCase();
  return britishStyleVoiceLangs.some((prefix) => lang.startsWith(prefix)) || lang.includes("gbsct") || lang.includes("gbwls");
}

function hasCoreBritishAccent(voice) {
  const lang = voice.lang.toLowerCase();
  return lang.startsWith("en-gb") || lang.includes("gbsct") || lang.includes("gbwls");
}

function hasAmericanStyleAccent(voice) {
  const lang = voice.lang.toLowerCase();
  return americanStyleVoiceLangs.some((prefix) => lang.startsWith(prefix));
}

function getVoiceQualityRank(voice) {
  const name = voice.name;
  if (highQualityVoicePatterns.some((pattern) => pattern.test(name))) return 0;
  if (voice.localService) return 1;
  return 2;
}

function getLearnerVoiceRank(voice) {
  const name = voice.name.toLowerCase();
  if (/samantha|ava|allison|susan|kendra|kimberly|nicky|joelle|zoe|fiona|daniel|alex|matthew|tom/.test(name)) return 0;
  if (/moira|karen|tessa|rishi|serena|arthur|martha|oliver/.test(name)) return 1;
  return 2;
}

function sortVoices(voices) {
  return [...voices].sort(
    (a, b) =>
      getVoiceLangRank(a) - getVoiceLangRank(b) ||
      getVoiceQualityRank(a) - getVoiceQualityRank(b) ||
      getLearnerVoiceRank(a) - getLearnerVoiceRank(b) ||
      a.name.localeCompare(b.name)
  );
}

function addVoiceGroup(target, voices, limit) {
  sortVoices(voices).forEach((voice) => {
    if (target.length >= limit) return;
    if (!target.some((item) => item.name === voice.name)) target.push(voice);
  });
}

function pickVoicesByAccent(voices) {
  const british = voices.filter(hasCoreBritishAccent);
  const american = voices.filter(hasAmericanStyleAccent);
  const other = voices.filter((voice) => !hasBritishStyleAccent(voice) && !hasAmericanStyleAccent(voice));
  const nearBritish = voices.filter((voice) => hasBritishStyleAccent(voice) && !hasCoreBritishAccent(voice));
  const selected = [];

  addVoiceGroup(selected, american.filter((voice) => getVoiceQualityRank(voice) === 0), 4);
  addVoiceGroup(selected, british.filter((voice) => getVoiceQualityRank(voice) === 0), 8);
  addVoiceGroup(selected, other.filter((voice) => getVoiceQualityRank(voice) === 0), 12);
  addVoiceGroup(selected, american, 14);
  addVoiceGroup(selected, british, 16);
  addVoiceGroup(selected, nearBritish, 17);
  addVoiceGroup(selected, other, VOICE_LIMIT);
  addVoiceGroup(selected, voices, VOICE_LIMIT);

  return selected;
}

function describeVoice(voice) {
  const lang = voice.lang.toLowerCase();
  const region =
    lang.startsWith("en-gb") || lang.includes("gbsct") || lang.includes("gbwls")
      ? "英式"
      : lang.startsWith("en-ie")
        ? "爱尔兰"
        : lang.startsWith("en-au")
          ? "澳洲"
          : lang.startsWith("en-nz")
            ? "新西兰"
            : lang.startsWith("en-za")
              ? "南非"
              : lang.startsWith("en-ca")
                ? "加拿大"
                : lang.startsWith("en-us")
                  ? "美式"
                  : "英文";
  const quality = highQualityVoicePatterns.some((pattern) => pattern.test(voice.name)) ? "自然音质" : "系统语音";
  return `${voice.name} · ${region} · ${quality}`;
}

function getVoice(langPrefix = "en") {
  const selected = state.voices.find((voice) => voice.name === state.settings.voiceName);
  if (selected) return selected;
  return (
    state.voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb")) ||
    state.voices.find((voice) => voice.lang.toLowerCase().startsWith("en-ie")) ||
    state.voices.find((voice) => voice.lang.toLowerCase().startsWith(langPrefix)) ||
    null
  );
}

async function speakText(text, lang = "en-US", token = state.playbackToken) {
  const clean = String(text || "").trim();
  if (!clean || token !== state.playbackToken || !("speechSynthesis" in window)) {
    return;
  }
  if (!(await settleSpeechEngine(token))) return;

  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = lang;
    utterance.rate = Number(state.settings.rate);
    utterance.pitch = 1;
    if (lang.startsWith("en")) {
      const voice = getVoice("en");
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }
    }
    utterance.onend = resolve;
    utterance.onerror = resolve;
    window.speechSynthesis.resume();
    window.speechSynthesis.speak(utterance);
  });
}

async function speakWord(word, token = state.playbackToken) {
  if (!word || token !== state.playbackToken) return;
  if (state.speaking && state.activeSpeechToken === token) return;
  state.speaking = true;
  state.activeSpeechToken = token;

  try {
    const spokenTerm = getDisplayTerm(word);
    const repeatCount = Number(state.settings.repeat);
    for (let i = 0; i < repeatCount && state.playing && token === state.playbackToken; i += 1) {
      await speakText(spokenTerm, "en-US", token);
      if (token === state.playbackToken) await wait(state.settings.gap);
    }

    if (state.settings.shadowing && state.playing && token === state.playbackToken) {
      state.shadowingNow = true;
      updateScreen();
      await speakText("Your turn.", "en-US", token);
      if (token === state.playbackToken) await wait(state.settings.shadowGap);
      state.shadowingNow = false;
      updateScreen();
    }

    const spokenMeaning = getDisplayMeaning(word);
    if (state.settings.speakMeaning && spokenMeaning && state.playing && token === state.playbackToken) {
      await speakText(spokenMeaning, "zh-CN", token);
      if (token === state.playbackToken) await wait(state.settings.gap);
    }

    if (state.settings.speakSentence && word.sentence && state.playing && token === state.playbackToken) {
      await speakText(word.sentence, "en-US", token);
      if (token === state.playbackToken) await wait(state.settings.gap);
    }

    if (token === state.playbackToken) {
      word.listenCount = (word.listenCount || 0) + 1;
    }
  } finally {
    if (state.activeSpeechToken === token) {
      state.speaking = false;
      state.activeSpeechToken = 0;
    }
  }
}

async function playLoop() {
  if (!getCurrentWord()) {
    stopPlayback();
    return;
  }

  interruptSpeech();
  const token = state.playbackToken;
  state.playing = true;
  state.playbackMode = "loop";
  updateScreen();

  while (state.playing && getCurrentWord() && token === state.playbackToken) {
    await speakWord(getCurrentWord(), token);
    if (state.playing && token === state.playbackToken) await wait(state.settings.gap);
    if (!state.settings.loopCurrent && state.playing && token === state.playbackToken) {
      setNextIndex(1);
    }
  }

  if (token === state.playbackToken) stopPlayback();
}

function stopPlayback() {
  interruptSpeech();
  state.playing = false;
  state.playbackMode = "";
  updateScreen();
}

async function speakOnce(word, { interrupt = false } = {}) {
  if (!word) return;
  if (interrupt) {
    interruptSpeech();
    state.playing = false;
  }
  const token = state.playbackToken;
  state.playing = true;
  state.playbackMode = "once";
  updateScreen();
  await speakWord(word, token);
  if (token === state.playbackToken) {
    state.playing = false;
    state.playbackMode = "";
    updateScreen();
  }
}

function moveAndPlay(direction) {
  const keepLooping = state.playing && state.playbackMode === "loop";
  interruptSpeech();
  state.playing = false;
  state.playbackMode = "";
  setNextIndex(direction);
  if (keepLooping) {
    playLoop();
  } else {
    speakOnce(getCurrentWord(), { interrupt: true });
  }
}

function toggleKnown(id) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return;
  word.known = !word.known;
  if (word.known) {
    word.hard = false;
  }
  state.wordListDirty = true;
  saveWords();
  updateScreen();
}

function toggleHard(id) {
  const word = state.words.find((item) => item.id === id);
  if (!word) return;
  word.hard = !word.hard;
  if (word.hard) {
    word.known = false;
  }
  state.wordListDirty = true;
  saveWords();
  updateScreen();
}

function removeWord(id) {
  const index = state.words.findIndex((word) => word.id === id);
  if (index < 0) return;
  state.words.splice(index, 1);
  state.index = Math.min(state.index, Math.max(0, getPlayableWords().length - 1));
  state.wordListDirty = true;
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
    els.voiceNote.textContent = "当前浏览器没有开放朗读功能。";
    return;
  }

  const naturalVoices = window.speechSynthesis.getVoices().filter(isNaturalEnglishVoice);
  state.voices = pickVoicesByAccent(naturalVoices);

  if (!state.voices.length) {
    els.voiceSelect.innerHTML = `<option>使用默认英文语音</option>`;
    els.voiceNote.textContent = "手机没有提供可选择的英文声音，会使用浏览器默认朗读。";
    return;
  }

  if (!state.voices.some((voice) => voice.name === state.settings.voiceName)) {
    const preferred =
      state.voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb") && getVoiceQualityRank(voice) === 0) ||
      state.voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us") && getVoiceQualityRank(voice) === 0) ||
      state.voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb")) ||
      state.voices.find((voice) => voice.lang.toLowerCase().startsWith("en-us")) ||
      state.voices[0];
    state.settings.voiceName = preferred.name;
    saveSettings();
  }

  els.voiceSelect.textContent = "";
  state.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = describeVoice(voice);
    option.selected = voice.name === state.settings.voiceName;
    els.voiceSelect.append(option);
  });

  els.voiceNote.textContent = `当前手机提供 ${state.voices.length} 个可用英文声音。想更多：iPhone 设置 -> 辅助功能 -> 朗读内容 -> 声音 -> 英语，下载更多声音后再打开本页。`;
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
    moveAndPlay(-1);
  });

  els.nextBtn.addEventListener("click", () => {
    moveAndPlay(1);
  });

  els.familiarBtn.addEventListener("click", () => {
    const word = getCurrentWord();
    if (word) toggleKnown(word.id);
  });

  els.hardBtn.addEventListener("click", () => {
    const word = getCurrentWord();
    if (word) toggleHard(word.id);
  });

  els.repeatBtn.addEventListener("click", () => {
    state.settings.repeat = state.settings.repeat >= 5 ? 1 : state.settings.repeat + 1;
    saveSettings();
    updateScreen();
  });

  els.loopCurrentBtn.addEventListener("click", () => {
    state.settings.loopCurrent = !state.settings.loopCurrent;
    saveSettings();
    updateScreen();
  });

  els.hardModeBtn.addEventListener("click", () => {
    state.settings.hardOnly = !state.settings.hardOnly;
    state.index = 0;
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

  els.tabsNav.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (!tab) return;
    switchTab(tab.dataset.tab);
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

  els.searchInput.addEventListener("input", () => {
    state.wordListDirty = true;
    renderWordList();
  });
  els.exportBtn.addEventListener("click", exportWords);
  els.clearDoneBtn.addEventListener("click", () => {
    state.settings.hideKnown = !state.settings.hideKnown;
    state.wordListDirty = true;
    saveSettings();
    updateScreen();
  });
  els.clearAllBtn.addEventListener("click", () => {
    if (!state.words.length) return;
    if (confirm("确定清空所有词条吗？")) {
      stopPlayback();
      state.words = [];
      state.wordListDirty = true;
      saveWords();
      updateScreen();
    }
  });

  els.savePlanBtn.addEventListener("click", () => {
    state.plan.date = els.planDateInput.value || new Date().toISOString().slice(0, 10);
    state.plan.target = Math.max(1, Math.round(Number(els.planTargetInput.value) || defaultPlan.target));
    const saved = savePlan();
    updatePlanPanel();
    els.planStatus.textContent = saved ? "计划已保存。" : "计划没有保存成功，可以稍后再试。";
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

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstallPrompt = event;
  });

  els.installBtn?.addEventListener("click", async () => {
    if (!state.deferredInstallPrompt) {
      showInstallHelp();
      return;
    }
    state.deferredInstallPrompt.prompt();
    await state.deferredInstallPrompt.userChoice;
    state.deferredInstallPrompt = null;
  });

  window.addEventListener("resize", fitCurrentTerm);

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
    if (!state.plan.date) {
      state.plan.date = new Date().toISOString().slice(0, 10);
      savePlan();
    }
    await hydrateFromDatabase();
    bindEvents();
    renderVoices();
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = renderVoices;
    }
    registerServiceWorker();
    updateScreen();
    updateStorageStatus();
  } catch (error) {
    setAppStatus(`页面初始化遇到问题：${error.message}`);
  }
}

init();
