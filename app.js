(() => {
  "use strict";

  const STORAGE_KEY = "birthday-love-site:v1";
  const CONTENT_MIGRATION_KEY = "birthday-love-site:content-v2";
  const LEGACY_STORY2 = {
    storyDate2: "认真生活 · 闪闪发光",
    storyTitle2: "她认真做自己的时候，最美",
    storyText2: "她对喜欢的事总有满满的热情，会把普通的一天过得有趣，也会认真完成每一个小小的目标。",
    storyTag2: "# 独立又温柔"
  };
  const IMAGE_SLOTS = [
    "hero", "story1", "story2", "story3",
    "gallery1", "gallery2", "gallery3", "gallery4", "gallery5", "gallery6"
  ];
  const FIELD_NAMES = [
    "herName", "yourName", "birthday", "heroSubtitle",
    "heroCaption", "heroNote", "introText", "galleryQuote",
    "galleryCaption1", "galleryCaption2", "galleryCaption3",
    "galleryCaption4", "galleryCaption5", "galleryCaption6",
    "storyDate1", "storyTitle1", "storyText1", "storyTag1",
    "storyDate2", "storyTitle2", "storyText2", "storyTag2",
    "storyDate3", "storyTitle3", "storyText3", "storyTag3",
    "wishTitle1", "wishText1", "wishTitle2", "wishText2", "wishTitle3", "wishText3",
    "letterSalutation", "letterBody", "letterSignature"
  ];

  const DEFAULT_CONFIG = {
    herName: "亲爱的你",
    yourName: "一直喜欢你的人",
    birthday: "2000-11-22",
    heroSubtitle: "世界因为有你，\n多了一束永远明亮的光。",
    heroCaption: "今天的女主角，闪闪发光",
    heroNote: "今天不用做任何事，只要开开心心做自己。",
    introText: "她可以明媚，也可以安静；可以勇敢，也可以偶尔脆弱。她不需要成为某一种标准答案，只要是真实的自己，就已经足够闪闪发光。",
    galleryQuote: "她不是某一种标准答案，她就是独一无二的风景。",
    galleryCaption1: "今天也是漂亮的她",
    galleryCaption2: "镜头里最生动的她",
    galleryCaption3: "路过人间的小小闪光",
    galleryCaption4: "认真生活的样子",
    galleryCaption5: "笑起来会有好天气",
    galleryCaption6: "下一站也要闪闪发光",
    storyDate1: "镜头之外 · 她笑起来的样子",
    storyTitle1: "她一笑，周围就亮了",
    storyText1: "她笑起来的时候，眼睛会弯成小小的月牙。那种发自内心的快乐，比任何滤镜都好看。",
    storyTag1: "# 今天也被她可爱到",
    storyDate2: "江边散步 · 好天气",
    storyTitle2: "风很轻，她在发光",
    storyText2: "草坪、江风和远处的城市都刚刚好。她抬手比了个“耶”，随手一拍，就把最鲜活可爱的她留在了镜头里。",
    storyTag2: "# 她比风景更上镜",
    storyDate3: "平常日子 · 藏着小浪漫",
    storyTitle3: "她值得世间所有偏爱",
    storyText3: "她会在小事里发现浪漫，也总能温柔地照顾身边的人。愿她被爱包围，也永远拥有自由和快乐。",
    storyTag3: "# 永远做她自己",
    wishTitle1: "愿你健康，也快乐",
    wishText1: "愿你每天都能睡个好觉，醒来时心情晴朗，有精力去爱、去生活、去做所有喜欢的事。",
    wishTitle2: "愿你所求皆如愿",
    wishText2: "愿你想去的地方都能抵达，想做的事情都有回应，在每一个选择面前，都有向前走的勇气。",
    wishTitle3: "愿你被岁月温柔",
    wishText3: "愿往后的每个生日都有人认真庆祝，愿她一直自由、明亮，把喜欢的生活过成最浪漫的长篇。",
    letterSalutation: "给我最亲爱的你：",
    letterBody: "见字如面。\n今天想把所有最真诚的祝福都送给你。你认真生活、温柔待人的样子，一直都很耀眼，只是希望你也能看见自己的光。\n喜欢看你分享那些不值一提的小事，也喜欢你谈起热爱时眼睛发亮的样子。希望新的一岁，你能更常常为自己开心。\n新的一岁，愿你有数不清的快乐，也有足够的底气面对所有未知。愿你永远自在、明亮，做最真实的自己。\n愿你想去的地方都能抵达，想做的事都有回应；愿世界对你温柔，也愿你始终拥有爱自己的勇气。\n生日快乐，我的女孩。",
    letterSignature: "一直喜欢你的人",
    images: {
      hero: "assets/hero-placeholder.svg",
      story1: "assets/story-placeholder-1.svg",
      story2: "assets/story-placeholder-2.svg",
      story3: "assets/story-placeholder-3.svg",
      gallery1: "assets/gallery-placeholder-1.svg",
      gallery2: "assets/gallery-placeholder-2.svg",
      gallery3: "assets/gallery-placeholder-3.svg",
      gallery4: "assets/gallery-placeholder-4.svg",
      gallery5: "assets/gallery-placeholder-5.svg",
      gallery6: "assets/gallery-placeholder-6.svg"
    }
  };

  const IMAGE_ELEMENTS = {
    hero: "heroImage",
    story1: "storyImage1",
    story2: "storyImage2",
    story3: "storyImage3",
    gallery1: "galleryImage1",
    gallery2: "galleryImage2",
    gallery3: "galleryImage3",
    gallery4: "galleryImage4",
    gallery5: "galleryImage5",
    gallery6: "galleryImage6"
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let config = loadConfig();
  let imageTarget = null;
  let toastTimer = null;
  let musicIsPlaying = false;
  let musicHasStarted = false;
  let currentTrackId = "shortTrack";

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadConfig() {
    try {
      if (window.__SITE_DATA__ && typeof window.__SITE_DATA__ === "object") {
        return mergeConfig(window.__SITE_DATA__);
      }
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") return clone(DEFAULT_CONFIG);
      const merged = mergeConfig(saved);
      if (!localStorage.getItem(CONTENT_MIGRATION_KEY)) {
        if (
          merged.storyDate2 === LEGACY_STORY2.storyDate2 &&
          merged.storyTitle2 === LEGACY_STORY2.storyTitle2
        ) {
          merged.storyDate2 = DEFAULT_CONFIG.storyDate2;
          merged.storyTitle2 = DEFAULT_CONFIG.storyTitle2;
          merged.storyText2 = DEFAULT_CONFIG.storyText2;
          merged.storyTag2 = DEFAULT_CONFIG.storyTag2;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        localStorage.setItem(CONTENT_MIGRATION_KEY, "1");
      }
      return merged;
    } catch {
      return clone(DEFAULT_CONFIG);
    }
  }

  function mergeConfig(candidate) {
    const merged = clone(DEFAULT_CONFIG);
    FIELD_NAMES.forEach((key) => {
      if (typeof candidate[key] === "string") {
        merged[key] = candidate[key].slice(0, key === "letterBody" ? 12000 : 500);
      }
    });
    if (candidate.images && typeof candidate.images === "object") {
      IMAGE_SLOTS.forEach((key) => {
        const value = candidate.images[key];
        if (typeof value === "string" && value.length < 6_000_000 &&
          (value.startsWith("data:image/") || value.startsWith("assets/"))) {
          merged.images[key] = value;
        }
      });
    }
    return merged;
  }

  function persistConfig(showError = true) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (error) {
      if (showError) {
        showToast("浏览器存储空间不足，请换一张尺寸更小的照片");
      }
      console.warn("Could not save birthday site configuration.", error);
      return false;
    }
  }

  async function syncToMobileServer() {
    if (location.protocol !== "file:") return;
    try {
      await fetch("http://127.0.0.1:8765/__save-site-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });
    } catch {
      // Local sharing is optional; the standalone file continues to work without it.
    }
  }

  async function loadPublishedSiteData() {
    if (window.__SITE_DATA__ || !location.protocol.startsWith("http")) return false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("site-data.json?v=20261122-2", {
        cache: "no-store",
        signal: controller.signal
      });
      if (!response.ok) return false;
      const publishedData = await response.json();
      if (!publishedData || typeof publishedData !== "object") return false;
      config = mergeConfig(publishedData);
      return true;
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  function exportCurrentSiteData() {
    const blob = new Blob([JSON.stringify(config)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "site-data.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    $("#loadingScreen").classList.add("loaded");
    $("#musicGate").hidden = true;
    document.body.classList.remove("intro-locked");
    showToast("已导出 site-data.json，请把这个文件发给我上传");
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function applyImages() {
    Object.entries(IMAGE_ELEMENTS).forEach(([key, id]) => {
      const image = document.getElementById(id);
      if (image) image.src = config.images[key];
    });
    $$("[data-preview-for]").forEach((image) => {
      const key = image.dataset.previewFor;
      if (key && config.images[key]) image.src = config.images[key];
    });
  }

  function parseLocalDate(value) {
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }
    return date;
  }

  function calculateAge(birthday, today = new Date()) {
    if (!birthday) return null;
    let age = today.getFullYear() - birthday.getFullYear();
    const birthdayHasPassed =
      today.getMonth() > birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() && today.getDate() >= birthday.getDate());
    if (!birthdayHasPassed) age -= 1;
    return Math.max(age, 0);
  }

  function formatDotDate(value) {
    const date = parseLocalDate(value);
    if (!date) return value || "未完待续";
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join(".");
  }

  function formatToday() {
    const today = new Date();
    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join(".");
  }

  function applyConfig() {
    FIELD_NAMES.forEach((key) => {
      const element = document.getElementById(key);
      if (element && key !== "letterBody") element.textContent = config[key];
    });

    setText("heroName", config.herName || "亲爱的你");
    setText("finaleName", config.herName || "亲爱的你");
    setText("heroSubtitle", config.heroSubtitle);
    setText("heroCaption", config.heroCaption);
    setText("heroNote", config.heroNote);
    setText("heroSign", `Love, ${config.yourName || "我"}`);
    setText("introText", config.introText);
    setText("galleryQuote", config.galleryQuote);
    setText("letterSalutation", config.letterSalutation);
    const letterSignature = $("#letterSignature");
    if (letterSignature) {
      const dateLine = document.createElement("span");
      dateLine.id = "letterDate";
      dateLine.textContent = formatToday();
      letterSignature.replaceChildren(
        document.createTextNode(config.letterSignature),
        document.createElement("br"),
        dateLine
      );
    }

    const birthday = parseLocalDate(config.birthday);
    const age = calculateAge(birthday);
    const birthdayDay = birthday
      ? `${String(birthday.getMonth() + 1).padStart(2, "0")}.${String(birthday.getDate()).padStart(2, "0")}`
      : "今天";
    setText("heroAge", age === null ? "18" : String(age));
    setText("heroBirthdayDay", birthdayDay);
    setText("birthdayNote", birthday ? `${birthdayDay} · 她的专属日子` : "今天 · 她的专属日子");
    setText("heroDate", birthday ? `${birthday.getMonth() + 1}月${birthday.getDate()}日 · 生日快乐` : "今天 · 生日快乐");

    const salutation = config.letterSalutation.replace(/[：:]$/, "");
    setText("letterPreview", config.letterBody.split(/\n+/)[0].slice(0, 72) + (config.letterBody.length > 72 ? "……" : ""));
    setText("letterPreviewSign", config.letterSignature);
    setText("heroSign", `Love, ${config.yourName || "我"}`);
    setText("letterSalutation", salutation ? `${salutation}：` : "");

    const letterParagraphs = config.letterBody.split(/\n+/).map((text) => text.trim()).filter(Boolean);
    const letterBody = $("#letterBody");
    if (letterBody) {
      letterBody.replaceChildren();
      letterParagraphs.forEach((text) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        letterBody.appendChild(paragraph);
      });
    }

    setText("footerNames", "FOR HER · ALWAYS");
    document.title = `生日快乐，${config.herName || "亲爱的你"} | HER DAY`;

    applyImages();
  }

  function fillEditor() {
    const form = $("#editorForm");
    FIELD_NAMES.forEach((key) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = config[key] || "";
    });
    applyImages();
  }

  function collectEditor() {
    const form = $("#editorForm");
    FIELD_NAMES.forEach((key) => {
      const field = form.elements.namedItem(key);
      if (field) config[key] = field.value;
    });
  }

  function openEditor() {
    closeLightbox();
    closeLetter(false);
    fillEditor();
    const drawer = $("#editorDrawer");
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    $("#editorBackdrop").classList.add("open");
    document.body.classList.add("editor-open");
    $("#editorClose").focus({ preventScroll: true });
  }

  function closeEditor() {
    const drawer = $("#editorDrawer");
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    $("#editorBackdrop").classList.remove("open");
    document.body.classList.remove("editor-open");
    $("#editorFab").focus({ preventScroll: true });
  }

  function saveEditor() {
    collectEditor();
    const saved = persistConfig();
    applyConfig();
    if (saved) {
      showToast("已经保存好啦，只属于她的生日宇宙");
      closeEditor();
      burstConfetti(window.innerWidth / 2, window.innerHeight * 0.78, 34);
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function switchEditorTab(tabName) {
    $$(".editor-tab").forEach((tab) => {
      const active = tab.dataset.tab === tabName;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    $$(".editor-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === tabName);
    });
    $(".editor-form").scrollTop = 0;
  }

  function chooseImage(key) {
    imageTarget = key;
    const input = $("#imageInput");
    input.value = "";
    input.click();
  }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("not-an-image"));
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        reject(new Error("too-large"));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("read-error"));
      reader.onload = () => {
        const image = new Image();
        image.onerror = () => reject(new Error("decode-error"));
        image.onload = () => {
          const maxSide = 1600;
          const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
          const width = Math.max(1, Math.round(image.width * scale));
          const height = Math.max(1, Math.round(image.height * scale));
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext("2d");
          context.fillStyle = "#f8efe8";
          context.fillRect(0, 0, width, height);
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = "high";
          context.drawImage(image, 0, 0, width, height);
          resolve({
            dataUrl: canvas.toDataURL("image/jpeg", 0.82),
            width,
            height
          });
        };
        image.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }

  async function handleImageFile(file) {
    if (!imageTarget || !file) return;
    const target = imageTarget;
    showToast("正在整理这张照片…");
    try {
      const { dataUrl } = await compressImage(file);
      config.images[target] = dataUrl;
      applyImages();
      if (persistConfig(false)) {
        showToast("照片已经放进她的照片日记");
      } else {
        showToast("照片暂时显示成功，但浏览器空间不足，请换小一点的照片");
      }
    } catch (error) {
      if (error.message === "too-large") {
        showToast("这张照片超过 25MB，请先压缩一下");
      } else {
        showToast("这张图片暂时无法读取，请试试 JPG、PNG 或 WebP");
      }
    } finally {
      imageTarget = null;
    }
  }

  function openLightbox(key) {
    const image = document.getElementById(IMAGE_ELEMENTS[key]);
    if (!image) return;
    $("#lightboxImage").src = image.src;
    const figure = image.closest("figure");
    const caption = figure?.querySelector("figcaption p")?.textContent;
    $("#lightboxCaption").textContent = caption || "她的照片";
    $("#lightbox").classList.add("open");
    $("#lightbox").setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    $("#lightbox").classList.remove("open");
    $("#lightbox").setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function createStarField(container, count) {
    if (!container) return;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < count; index += 1) {
      const star = document.createElement("span");
      star.className = "tiny-star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--duration", `${2.2 + Math.random() * 3.8}s`);
      star.style.setProperty("--delay", `${Math.random() * -5}s`);
      star.style.opacity = `${0.2 + Math.random() * 0.65}`;
      if (Math.random() > 0.7) {
        star.style.width = "5px";
        star.style.height = "5px";
      }
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  }

  function setupReveal() {
    const items = $$(".reveal");
    items.forEach((item) => {
      if (item.dataset.delay) {
        item.style.setProperty("--reveal-delay", `${item.dataset.delay}ms`);
      }
    });
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.11, rootMargin: "0px 0px -40px" });
    items.forEach((item) => observer.observe(item));
  }

  function setupHeader() {
    const header = $("#siteHeader");
    const update = () => header.classList.toggle("scrolled", window.scrollY > 30);
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function setupCursorGlow() {
    const glow = $(".cursor-glow");
    if (!glow || matchMedia("(pointer: coarse)").matches) {
      if (glow) glow.style.display = "none";
      return;
    }
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    document.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    }, { passive: true });
    const loop = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  function setupCake() {
    const cake = $("#cakeButton");
    const replay = $("#wishReplay");
    const blow = () => {
      if (cake.classList.contains("extinguished")) return;
      cake.classList.add("extinguished");
      cake.setAttribute("aria-label", "蜡烛已经吹灭");
      setText("cakeTip", "愿望已经收到，一定会实现");
      replay.classList.add("visible");
      const rect = cake.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height * 0.27, 100);
      if (navigator.vibrate) navigator.vibrate([35, 40, 55]);
    };
    cake.addEventListener("click", blow);
    replay.addEventListener("click", () => {
      cake.classList.remove("extinguished");
      cake.setAttribute("aria-label", "点击吹灭蜡烛");
      setText("cakeTip", "闭上眼睛，再许一个愿吧");
      replay.classList.remove("visible");
    });
  }

  function updateMusicButton(playing) {
    const button = $("#musicButton");
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "暂停背景音乐" : "播放背景音乐");
  }

  async function playMusicTrack(trackId, restart = false) {
    const track = document.getElementById(trackId);
    if (!track) return false;
    if (restart) track.currentTime = 0;
    try {
      await track.play();
      currentTrackId = trackId;
      return true;
    } catch (error) {
      console.warn("Could not play background music.", error);
      showToast("音乐没有播放成功，请再点一下右上角的音乐按钮");
      return false;
    }
  }

  function setupMusicPlaylist() {
    const shortTrack = $("#shortTrack");
    const coralTrack = $("#coralTrack");

    shortTrack.addEventListener("ended", () => {
      if (musicIsPlaying) playMusicTrack("coralTrack", true);
    });

    coralTrack.addEventListener("ended", () => {
      if (musicIsPlaying) playMusicTrack("shortTrack", true);
    });

    [shortTrack, coralTrack].forEach((track) => {
      track.addEventListener("error", () => {
        showToast("背景音乐文件读取失败，请检查 assets 文件夹是否完整");
      });
    });
  }

  async function toggleMusic() {
    const activeTrack = document.getElementById(currentTrackId);
    if (!musicIsPlaying) {
      let started = false;
      if (musicHasStarted && activeTrack && activeTrack.currentTime > 0 &&
        activeTrack.currentTime < activeTrack.duration) {
        started = await playMusicTrack(currentTrackId, false);
      } else {
        started = await playMusicTrack("shortTrack", true);
      }
      if (!started) return;
      musicIsPlaying = true;
      musicHasStarted = true;
      updateMusicButton(true);
      showToast("播放顺序：生日语音 → 珊瑚海，循环播放");
    } else {
      musicIsPlaying = false;
      if (activeTrack) activeTrack.pause();
      updateMusicButton(false);
    }
  }

  function setupMusicGate() {
    const gate = $("#musicGate");
    const startButton = $("#musicStartButton");
    startButton.addEventListener("click", async () => {
      startButton.disabled = true;
      if (!musicIsPlaying) await toggleMusic();
      if (!musicIsPlaying) {
        startButton.disabled = false;
        return;
      }
      gate.classList.add("opened");
      gate.setAttribute("aria-hidden", "true");
      document.body.classList.remove("intro-locked");
    });
    setTimeout(() => startButton.focus({ preventScroll: true }), 800);
  }

  function setupSiteDataExportShortcut() {
    document.addEventListener("keydown", (event) => {
      if (!(event.ctrlKey && event.shiftKey) || event.key.toLowerCase() !== "e") return;
      event.preventDefault();
      exportCurrentSiteData();
    });
  }

  const confettiState = {
    particles: [],
    running: false,
    lastTime: 0
  };

  function resizeConfettiCanvas() {
    const canvas = $("#confettiCanvas");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * ratio);
    canvas.height = Math.round(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawHeart(context, size) {
    context.beginPath();
    context.moveTo(0, size * 0.3);
    context.bezierCurveTo(-size, -size * 0.45, -size * 0.4, -size, 0, -size * 0.42);
    context.bezierCurveTo(size * 0.4, -size, size, -size * 0.45, 0, size * 0.3);
    context.closePath();
  }

  function burstConfetti(originX, originY, amount = 90) {
    const colors = ["#7e3d4d", "#c87982", "#ecc8c7", "#b18a58", "#f1d7b8", "#fffaf6"];
    for (let index = 0; index < amount; index += 1) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.35;
      const speed = 3.5 + Math.random() * 9;
      confettiState.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        gravity: 0.16 + Math.random() * 0.09,
        drag: 0.992,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.28,
        size: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() > 0.78 ? "heart" : (Math.random() > 0.5 ? "rect" : "circle"),
        life: 1
      });
    }
    if (!confettiState.running) {
      confettiState.running = true;
      confettiState.lastTime = performance.now();
      requestAnimationFrame(animateConfetti);
    }
  }

  function animateConfetti(timestamp) {
    const canvas = $("#confettiCanvas");
    const context = canvas.getContext("2d");
    const delta = Math.min((timestamp - confettiState.lastTime) / 16.67, 2.2);
    confettiState.lastTime = timestamp;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confettiState.particles.forEach((particle) => {
      particle.vx *= particle.drag;
      particle.vy = particle.vy * particle.drag + particle.gravity * delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.rotationSpeed * delta;
      particle.life -= 0.0024 * delta;

      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.globalAlpha = Math.max(particle.life, 0);
      context.fillStyle = particle.color;
      if (particle.shape === "rect") {
        context.fillRect(-particle.size / 2, -particle.size / 3, particle.size, particle.size * 0.64);
      } else if (particle.shape === "heart") {
        drawHeart(context, particle.size * 0.65);
        context.fill();
      } else {
        context.beginPath();
        context.arc(0, 0, particle.size / 2.7, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    });

    confettiState.particles = confettiState.particles.filter(
      (particle) => particle.life > 0 && particle.y < window.innerHeight + 80
    );

    if (confettiState.particles.length) {
      requestAnimationFrame(animateConfetti);
    } else {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      confettiState.running = false;
    }
  }

  function spawnHeart(button) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.position = "fixed";
    heart.style.zIndex = "820";
    heart.style.left = `${button.getBoundingClientRect().left + button.offsetWidth / 2}px`;
    heart.style.top = `${button.getBoundingClientRect().top + button.offsetHeight / 2}px`;
    heart.style.color = Math.random() > 0.5 ? "#c87982" : "#ecc8c7";
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    heart.style.pointerEvents = "none";
    heart.style.animation = `catchHeart ${1.2 + Math.random() * 0.6}s ease-out forwards`;
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2100);
  }

  function openEnvelope() {
    const envelope = $("#envelopeButton");
    const stage = $("#envelopeStage");
    if (envelope.classList.contains("open")) {
      openLetter();
      return;
    }
    envelope.classList.add("open");
    envelope.setAttribute("aria-expanded", "true");
    setTimeout(() => stage.classList.add("is-opening"), 650);
    setTimeout(openLetter, 1450);
  }

  function openLetter() {
    const letter = $("#fullLetter");
    letter.classList.add("open");
    letter.setAttribute("aria-hidden", "false");
    document.body.classList.add("letter-open");
    letter.scrollTop = 0;
    $("#letterClose").focus({ preventScroll: true });
  }

  function closeLetter(resetEnvelope = true) {
    const letter = $("#fullLetter");
    if (!letter.classList.contains("open")) return;
    letter.classList.remove("open");
    letter.setAttribute("aria-hidden", "true");
    document.body.classList.remove("letter-open");
    if (resetEnvelope) {
      const envelope = $("#envelopeButton");
      const stage = $("#envelopeStage");
      stage.classList.remove("is-opening");
      envelope.classList.remove("open");
      envelope.setAttribute("aria-expanded", "false");
    }
  }

  function exportBackup() {
    const data = JSON.stringify({ ...config, exportedAt: new Date().toISOString() }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `她的生日网站备份-${formatToday().replaceAll(".", "-")}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast("备份已导出，请和网站文件夹放在一起保存");
  }

  function importBackup(file) {
    const reader = new FileReader();
    reader.onerror = () => showToast("备份文件读取失败");
    reader.onload = () => {
      try {
        const imported = JSON.parse(String(reader.result));
        config = mergeConfig(imported);
        if (!persistConfig()) return;
        applyConfig();
        fillEditor();
        showToast("备份导入成功，她的生日网站回来啦");
      } catch {
        showToast("这不是有效的网站备份文件");
      }
    };
    reader.readAsText(file);
  }

  function resetToExample() {
    const confirmed = window.confirm("确定恢复示例内容吗？当前文字和上传的照片会被替换。");
    if (!confirmed) return;
    config = clone(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The in-memory reset still works when storage is unavailable.
    }
    applyConfig();
    fillEditor();
    showToast("已恢复为示例内容");
  }

  function setupImageInteractions() {
    $$("[data-image-slot]").forEach((element) => {
      const key = element.dataset.imageSlot;
      element.setAttribute("tabindex", "0");
      element.setAttribute("role", "button");
      element.setAttribute("aria-label", "点击查看照片大图");
      element.addEventListener("click", () => openLightbox(key));
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(key);
        }
      });
    });

    $$("[data-pick-image]").forEach((button) => {
      button.addEventListener("click", () => chooseImage(button.dataset.pickImage));
    });

    $("#imageInput").addEventListener("change", (event) => {
      handleImageFile(event.target.files?.[0]);
    });

    $("#lightboxClose").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) closeLightbox();
    });
  }

  function setupEditor() {
    const editorFab = $("#editorFab");
    const quickEditButton = $("#quickEditButton");
    if (!editorFab && !quickEditButton) return;
    editorFab?.addEventListener("click", openEditor);
    quickEditButton?.addEventListener("click", openEditor);
    $("#editorClose").addEventListener("click", closeEditor);
    $("#editorBackdrop").addEventListener("click", closeEditor);
    $("#saveButton").addEventListener("click", saveEditor);
    $("#exportButton").addEventListener("click", exportBackup);
    $("#resetButton").addEventListener("click", resetToExample);
    $("#importButton").addEventListener("click", () => {
      const input = $("#importInput");
      input.value = "";
      input.click();
    });
    $("#importInput").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) importBackup(file);
    });
    $$(".editor-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchEditorTab(tab.dataset.tab));
    });
    $("#fillStoryExample").addEventListener("click", () => {
      const form = $("#editorForm");
      ["1", "2", "3"].forEach((number) => {
        ["storyDate", "storyTitle", "storyText", "storyTag"].forEach((prefix) => {
          const key = `${prefix}${number}`;
          form.elements.namedItem(key).value = DEFAULT_CONFIG[key];
        });
      });
      showToast("已填入她的示例内容，可以继续修改");
    });
    $("#editorForm").addEventListener("submit", (event) => event.preventDefault());
  }

  function setupLetter() {
    $("#envelopeButton").addEventListener("click", openEnvelope);
    $("#letterClose").addEventListener("click", () => closeLetter(true));
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if ($("#fullLetter").classList.contains("open")) closeLetter(true);
      else if ($("#lightbox").classList.contains("open")) closeLightbox();
      else if ($("#editorDrawer").classList.contains("open")) closeEditor();
    });
  }

  function setupFinale() {
    $("#finaleHeart").addEventListener("click", (event) => {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      for (let index = 0; index < 8; index += 1) {
        setTimeout(() => spawnHeart(button), index * 70);
      }
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
      showToast("收到啦，也把今天的好运送给你");
    });
  }

  function init() {
    applyConfig();
    fillEditor();
    setupImageInteractions();
    setupEditor();
    setupLetter();
    setupCake();
    setupFinale();
    setupReveal();
    setupHeader();
    setupCursorGlow();
    setupMusicPlaylist();
    setupMusicGate();
    setupSiteDataExportShortcut();
    createStarField($("#heroStarField"), 34);
    createStarField($("#finaleStars"), 44);
    syncToMobileServer();
    resizeConfettiCanvas();
    window.addEventListener("resize", resizeConfettiCanvas);
    $("#musicButton").addEventListener("click", toggleMusic);
    $("#loadingScreen").classList.add("loaded");
    $$(".hero .reveal").forEach((item) => item.classList.add("in-view"));
  }

  async function bootstrap() {
    const exportRequested = new URLSearchParams(location.search).get("export-site-data") === "1";
    if (exportRequested) {
      config = loadConfig();
      exportCurrentSiteData();
      return;
    }
    await loadPublishedSiteData();
    init();
  }

  bootstrap();
})();
