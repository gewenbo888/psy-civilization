// Psy Civilization · Psy 文明
// Plain JS · template literals throughout for CJK safety

(function () {
  "use strict";

  const root = document.documentElement;
  const LANG_KEY = "pcv-lang";
  const THEME_KEY = "pcv-theme";

  function applyLang(lang) {
    root.setAttribute("data-lang", lang);
    document.querySelectorAll(".lang-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.langSet === lang);
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(el => {
      const v = el.getAttribute(`data-${lang}-placeholder`);
      if (v) el.placeholder = v;
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    document.querySelectorAll(".theme-toggle button").forEach(b => {
      b.classList.toggle("active", b.dataset.themeSet === theme);
    });
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.langSet));
  });
  document.querySelectorAll(".theme-toggle button").forEach(b => {
    b.addEventListener("click", () => applyTheme(b.dataset.themeSet));
  });
  try {
    const sl = localStorage.getItem(LANG_KEY); if (sl) applyLang(sl);
    const st = localStorage.getItem(THEME_KEY); if (st) applyTheme(st);
  } catch (_) {}

  function renderCards(hostId, items) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = items.map(c => `
      <div class="card ${c.cls || ""}">
        <div class="kicker"><span lang="en">${c.kicker[0]}</span><span lang="zh">${c.kicker[1]}</span></div>
        <h3><span lang="en">${c.titleEn}</span><span lang="zh">${c.titleZh}</span></h3>
        <p><span lang="en">${c.bodyEn}</span><span lang="zh">${c.bodyZh}</span></p>
      </div>
    `).join("");
  }

  // ─── Module 01 · Architecture cards ──────────────────────────────
  const archCards = [
    {
      kicker: ["Realms", "Realms"],
      titleEn: "Partitioned execution as civilizational primitive",
      titleZh: "作为文明基元的分区执行",
      bodyEn: `An EVM chain is one global state machine; congestion in one app raises gas for every other app. Realms partition execution so each application&apos;s throughput depends on its own demand. Civilizationally this is the same insight that municipal autonomy or sovereign domains embody: a single global polity scales worse than a federation of bounded polities that share a common substrate of validity.`,
      bodyZh: `EVM 链是单一全局状态机,某应用的拥堵抬高所有应用的 gas。realm 将执行分区,使应用的吞吐取决于自身需求。在文明层面,这与市政自治或主权域所体现的洞见相同:单一全球政体的扩展性,弱于若干在统一有效性基底之上的受界政体所组成的联邦。`,
      cls: "purple"
    },
    {
      kicker: ["Recursive validity", "递归有效性"],
      titleEn: "A million steps, one verifiable artifact",
      titleZh: "百万步骤,一份可验证的证据",
      bodyEn: `Plonky2 over Goldilocks with Poseidon hashing compresses arbitrarily many state transitions into a single succinct proof. The civilization-scale point: validity becomes free at the margin. Once a transition has happened and been proved, anyone can verify it without re-running it. Trust scales as fast as math, not as fast as institutional review boards.`,
      bodyZh: `Goldilocks 上的 Plonky2、配 Poseidon 哈希,把任意多状态转移压缩为单一简洁证明。文明级要点:验证在边际上趋于免费。一旦某转移发生并经证明,任何人都可在不重新执行的前提下验证之。信任以数学速度扩展,而非以制度复审委员会的速度扩展。`,
      cls: "blue"
    },
    {
      kicker: ["Coordinator", "协调器"],
      titleEn: "A single orderer, then prove the rest",
      titleZh: "由一个排序者完成,其余以证明承担",
      bodyEn: `The coordinator orders transactions and emits cryptographic evidence of every transition. It is a single point — but a single point that cannot lie about what happened. Civilizationally this is the same trade-off as the postmaster general or the standards bureau: one entity coordinates, but the artifacts it produces can be audited by anyone.`,
      bodyZh: `协调器排序交易,并对每次状态转移发出密码学证据。它是单点——但是无法对所发生之事撒谎的单点。在文明层面,这与邮政总局或度量衡标准局是同一权衡:一个实体进行协调,但其产物可由任何人审计。`,
      cls: "cyan"
    },
    {
      kicker: ["Persistent identity", "持久身份"],
      titleEn: "Accounts that outlive applications",
      titleZh: "比应用更长寿的账户",
      bodyEn: `psy-wallet accounts are not bound to a single application. Reputation, balances, history persist at the protocol layer. Civilizationally this is the digital equivalent of citizenship as opposed to club membership — your standing accrues to you, not to the venue.`,
      bodyZh: `psy-wallet 账户不绑定于单一应用。信誉、余额、历史在协议层持久。在文明层面,这相当于"公民身份"对"俱乐部会员资格"的差异——你的资格归属于你,而非场所。`,
      cls: "gold"
    }
  ];
  renderCards("archCards", archCards);

  // ─── Module 02 · Civilization timeline ───────────────────────────
  const timeline = [
    { when: ["~3200 BCE", "约公元前 3200 年"], what: ["Writing", "文字"],
      blurbEn: "Cuneiform tablets in Sumer turn ephemeral promises into auditable records — the first civilization-scale shared state.",
      blurbZh: "苏美尔楔形泥板让短暂的承诺变成可审计的记录——文明史上首个规模化的共享状态。" },
    { when: ["~700 BCE", "约公元前 700 年"], what: ["Coinage", "货币"],
      blurbEn: "Standardized coins in Lydia create portable, fungible value with state-attested authenticity. Markets reach beyond personal trust.",
      blurbZh: "吕底亚的标准化铸币创造了由国家背书真伪、可携带可替代的价值。市场首次超越人际信任的边界。" },
    { when: ["~1454", "约 1454 年"], what: ["Printing press", "印刷术"],
      blurbEn: "Gutenberg radically lowers the marginal cost of replicating ideas. Religion, science, and politics each reorganize within a century.",
      blurbZh: "古腾堡使思想复制的边际成本骤降。宗教、科学、政治皆在一个世纪内被重组。" },
    { when: ["~1494", "约 1494 年"], what: ["Double-entry", "复式记账"],
      blurbEn: "Pacioli formalizes double-entry bookkeeping. Capital becomes auditable across firms and centuries.",
      blurbZh: "帕乔利将复式记账规范化。资本变得可在公司之间、跨越世纪进行审计。" },
    { when: ["~1602", "约 1602 年"], what: ["Joint-stock", "股份公司"],
      blurbEn: "The Dutch East India Company organizes capital, risk, and labor at a scale no individual could. The corporation becomes a civilizational primitive.",
      blurbZh: "荷兰东印度公司以个人无法企及的规模组织资本、风险与劳动。公司成为一项文明基元。" },
    { when: ["~1837", "约 1837 年"], what: ["Telegraph", "电报"],
      blurbEn: "Information moves faster than people. Markets, news, and military command synchronize over continental distances.",
      blurbZh: "信息的传播速度超过人。市场、新闻、军事指挥在跨大陆距离上同步。" },
    { when: ["~1969", "约 1969 年"], what: ["ARPANET", "ARPANET"],
      blurbEn: "Packet-switched networking lets autonomous nodes coordinate without a central switchboard. The technical foundation of the internet.",
      blurbZh: "分组交换网络让自治节点在无中心总机的条件下协调。互联网的技术基础。" },
    { when: ["~1991", "约 1991 年"], what: ["World Wide Web", "万维网"],
      blurbEn: "Hyperlinked documents and HTTP make information not just transferable but composable across institutions.",
      blurbZh: "超链接文档与 HTTP 使信息不仅可传输,而且可跨机构组合。" },
    { when: ["2008", "2008"], what: ["Bitcoin", "比特币"],
      blurbEn: "First credibly decentralized monetary system. State-attested authenticity becomes optional, not required.",
      blurbZh: "首个可信的去中心化货币系统。国家背书的真伪从必要变为可选。" },
    { when: ["2022 →", "2022 至今"], what: ["Generative AI", "生成式 AI"],
      blurbEn: "Machines become first-class authors and analysts. The number of agents in the digital economy starts to outgrow the number of humans.",
      blurbZh: "机器成为一等作者与分析者。数字经济中智能体的数量开始超过人类。" },
    { when: ["2025 →", "2025 至今"], what: ["Psy Protocol", "Psy Protocol"],
      blurbEn: "Realms, recursive proofs, persistent identity. A candidate substrate for civilization-scale coordination among humans and agents together.",
      blurbZh: "Realm、递归证明、持久身份。一个面向人类与智能体共同协调的文明级基底候选者。",
      psy: true }
  ];

  function renderTimeline() {
    const host = document.getElementById("timeline");
    if (!host) return;
    host.innerHTML = timeline.map(t => `
      <div class="tl-node ${t.psy ? "psy" : ""}" style="--accent: ${t.psy ? "var(--purple)" : "var(--blue)"}">
        <div class="when">${t.when[0]} · ${t.when[1]}</div>
        <div class="what"><span lang="en">${t.what[0]}</span><span lang="zh">${t.what[1]}</span></div>
        <div class="blurb"><span lang="en">${t.blurbEn}</span><span lang="zh">${t.blurbZh}</span></div>
        <span class="stem"></span>
        <span class="dot"></span>
      </div>
    `).join("");
  }
  renderTimeline();

  // ─── Module 03 · Shared state table ──────────────────────────────
  const stateRows = [
    ["Who owns this asset?", "谁拥有此资产?",
      "Land registry, deed office, county clerk", "土地登记处、契约局、县办公室",
      "On-chain ownership record, queryable globally", "链上所有权记录,可全球查询"],
    ["Has this contract been executed?", "此合约是否已执行?",
      "Notary, court records, escrow agent", "公证人、法院记录、托管方",
      "State-transition proof verifiable by any party", "可由任何方验证的状态转移证明"],
    ["Who said what when?", "何时何人说了何事?",
      "Newspaper of record, archival institutions", "权威报纸、档案机构",
      "Append-only message commitments under identity", "身份下的只增不减消息承诺"],
    ["Did this study replicate?", "此研究是否复现?",
      "Peer review, post-hoc replication studies", "同行评议、事后复现研究",
      "Prediction-market resolution + receipted replication", "预测市场解析 + 收据化复现"],
    ["What is this AI agent allowed to do?", "此 AI 智能体被允许做什么?",
      "Per-platform terms of service", "各平台服务条款",
      "Identity-scoped capability tokens, on-chain", "身份范围内的能力令牌,链上"],
    ["Who is responsible if it fails?", "若失败,谁负责?",
      "Limited liability corporation, insurance", "有限责任公司、保险",
      "Staked accountability + protocol-level slashing", "押金问责 + 协议级罚没"]
  ];
  function renderStateTable() {
    const tbody = document.querySelector("#state .comp-table tbody");
    if (!tbody) return;
    tbody.innerHTML = stateRows.map(r => `
      <tr>
        <td><span lang="en">${r[0]}</span><span lang="zh">${r[1]}</span></td>
        <td><span lang="en">${r[2]}</span><span lang="zh">${r[3]}</span></td>
        <td><span lang="en">${r[4]}</span><span lang="zh">${r[5]}</span></td>
      </tr>
    `).join("");
  }
  renderStateTable();

  // ─── Module 04 · AI-native cards ─────────────────────────────────
  const aiNativeCards = [
    {
      kicker: ["Wallet, not API key", "钱包,而非 API key"],
      titleEn: "An agent that pays for its own compute",
      titleZh: "为自己算力付费的智能体",
      bodyEn: `Today, when an agent calls a paid API, the bill goes to the human owner&apos;s credit card. The credit card has identity; the agent does not. With a Psy-native account, the agent itself signs payments and accumulates a balance from work done. The economic boundary moves from the human to the agent — small in description, civilizational in consequence.`,
      bodyZh: `今日智能体调用付费 API 时,账单走向其人类所有者的信用卡——卡有身份,智能体没有。在 Psy 原生账户中,智能体自身签名付款,并由其完成的工作积累余额。经济边界从人类移至智能体——描述上微小,文明上意义重大。`,
      cls: "purple"
    },
    {
      kicker: ["Memory", "记忆"],
      titleEn: "Long-term memory that survives provider migration",
      titleZh: "在更换托管商后仍存活的长期记忆",
      bodyEn: `Agent memory anchored to a Psy realm survives when the hosting provider changes hands. A research agent that has read your library does not have to re-read it when you switch cloud vendors. This is the necessary condition for an agent to have anything resembling a continuous identity over years.`,
      bodyZh: `锚定于 Psy realm 的智能体记忆,在托管商易主时仍存活。已读完你资料库的研究智能体,在你更换云厂商时不必重读。这是智能体在年度尺度上具有"连续身份"的必要条件。`,
      cls: "cyan"
    },
    {
      kicker: ["Reputation", "信誉"],
      titleEn: "Receipts of work, portable across employers",
      titleZh: "工作收据,可跨雇主携带",
      bodyEn: `An agent that has completed 10,000 successful tasks under one platform should not have to start over when it migrates to another. A protocol-native reputation primitive makes the receipt of work portable, while still letting platforms run their own evaluation criteria on top of the same data.`,
      bodyZh: `在某一平台已完成一万项成功任务的智能体,不应在迁移到另一平台时归零。协议原生的信誉基元让"工作的收据"可携带,同时仍允许平台在同一数据之上施加各自的评价标准。`,
      cls: "blue"
    },
    {
      kicker: ["Hybrid orgs", "混合组织"],
      titleEn: "DAOs whose members are humans and agents",
      titleZh: "成员为人与智能体的 DAO",
      bodyEn: `A protocol-native organization with weighted voting, transparent treasury, and per-member reputation does not care if a member is human or agent — it just verifies the signature. New kinds of work get organized this way before they get incorporated. The civilization-scale question is whether the legal system catches up before or after these structures are widespread.`,
      bodyZh: `一个具备加权投票、透明国库、按成员信誉运作的协议原生组织,并不在意成员是人还是智能体——它只验证签名。新型工作往往在被法人化之前,先以这种方式组织起来。文明级问题是:法律体系是在这些结构普及之前赶上,还是之后。`,
      cls: "rose"
    }
  ];
  renderCards("aiCards", aiNativeCards);

  // ─── Module 05 · Civilization simulator ──────────────────────────
  const simModes = {
    centralized: { en: "Centralized state-led", zh: "中心化国家主导",
      base: { coordination: 70, freedom: 40, resilience: 65, innovation: 55, equity: 60, memory: 65 } },
    federated:   { en: "Federated platform era", zh: "联邦化平台时代",
      base: { coordination: 75, freedom: 60, resilience: 60, innovation: 75, equity: 50, memory: 55 } },
    protocol:    { en: "Protocol-native", zh: "协议原生",
      base: { coordination: 65, freedom: 80, resilience: 75, innovation: 70, equity: 55, memory: 80 } }
  };
  const simDims = [
    ["coordination", "Coordination capacity", "协调能力"],
    ["freedom",      "Freedom from gatekeepers", "免受守门人约束"],
    ["resilience",   "Long-run resilience", "长程韧性"],
    ["innovation",   "Innovation capacity",  "创新能力"],
    ["equity",       "Distributional equity", "分配公平"],
    ["memory",       "Civilization memory",  "文明记忆"]
  ];
  function fillSim() {
    const sel = document.getElementById("simMode");
    sel.innerHTML = Object.keys(simModes).map(k => `<option value="${k}">${simModes[k].en} · ${simModes[k].zh}</option>`).join("");
  }
  fillSim();
  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }
  function runSim() {
    const m = simModes[document.getElementById("simMode").value];
    const pop = +document.getElementById("simPop").value;
    const agents = +document.getElementById("simAgents").value;
    const open = +document.getElementById("simOpen").value;
    const memory = +document.getElementById("simMemory").value;

    const coordination = clamp(m.base.coordination + (open - 50) * 0.10 + (50 - agents) * 0.05);
    const freedom      = clamp(m.base.freedom + (open - 50) * 0.30 - (50 - agents) * 0.05);
    const resilience   = clamp(m.base.resilience + (memory - 50) * 0.25 + (open - 50) * 0.10);
    const innovation   = clamp(m.base.innovation + (agents - 50) * 0.20 + (open - 50) * 0.15 + (pop - 50) * 0.05);
    const equity       = clamp(m.base.equity + (open - 50) * 0.15 - (pop - 50) * 0.10);
    const memoryScore  = clamp(m.base.memory + (memory - 50) * 0.40 + (open - 50) * 0.10);

    const scores = { coordination, freedom, resilience, innovation, equity, memory: memoryScore };
    document.getElementById("simBars").innerHTML = simDims.map(d => `
      <div class="sbar">
        <span><span lang="en">${d[1]}</span><span lang="zh">${d[2]}</span></span>
        <span class="meter"><i style="width:${scores[d[0]]}%"></i></span>
        <span class="v">${scores[d[0]]}</span>
      </div>
    `).join("");

    const en = `Mode <strong>${m.en}</strong>. Population ${pop}, agents ${agents}, openness ${open}, memory ${memory}. Coordination ${coordination}, freedom ${freedom}, resilience ${resilience}, innovation ${innovation}, equity ${equity}, memory ${memoryScore}. Notice: protocol-native modes typically score higher on freedom and memory but lower on raw coordination capacity. The trade-off is real, not a flaw to be designed away.`;
    const zh = `模式 <strong>${m.zh}</strong>。人口 ${pop},智能体 ${agents},开放度 ${open},记忆 ${memory}。协调 ${coordination},自由 ${freedom},韧性 ${resilience},创新 ${innovation},公平 ${equity},记忆 ${memoryScore}。注意:协议原生模式在自由与记忆上得分通常更高,但原始协调能力较低。这一权衡真实存在,而非设计上可消除的缺陷。`;
    document.getElementById("simReadout").innerHTML = `<span lang="en">${en}</span><span lang="zh">${zh}</span>`;
  }
  ["simMode", "simPop", "simAgents", "simOpen", "simMemory"].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", runSim);
    el.addEventListener("change", runSim);
  });
  runSim();

  // ─── Module 06 · Knowledge cards ─────────────────────────────────
  const knowledgeCards = [
    {
      kicker: ["Permanence", "持久性"],
      titleEn: "What survives a century",
      titleZh: "能存续一个世纪之物"
,
      bodyEn: `A protocol whose state can be reconstructed from a recursive proof and an L1 transcript outlives any company that operates on top of it. Civilization-scale archives — long-form encyclopedias, dictionary projects, scientific records — start to make sense at this time horizon, not because they are technically possible elsewhere, but because they are politically possible only here.`,
      bodyZh: `一种"状态可由递归证明与 L1 交易记录重建"的协议,寿命超过其上运行的任何公司。文明级档案——长文百科、辞典工程、科学记录——在此时间尺度下方才合理:并非别处技术上不可能,而是仅此处政治上可行。`,
      cls: "purple"
    },
    {
      kicker: ["Citation", "引用"],
      titleEn: "Citation graphs become economic infrastructure",
      titleZh: "引用图谱成为经济基础设施",
      bodyEn: `Academic citations are already a graph; they are simply under-used as economic infrastructure. Cryptographic citation receipts let downstream uses of a research artifact compensate the original author automatically — slow royalties for foundational work. The graph already exists; its economic activation does not.`,
      bodyZh: `学术引用本身已是图,只是其经济基础设施作用被低估。密码学引用收据让对一项研究构件的下游使用,自动补偿原作者——为基础工作设立缓慢版税。图已存在;其经济激活尚未。`,
      cls: "blue"
    },
    {
      kicker: ["Honest limit", "诚实的限制"],
      titleEn: "What chain-anchored knowledge cannot do",
      titleZh: "链上锚定的知识做不到的事",
      bodyEn: `Protocol-native knowledge does not solve the hardest knowledge problems: which sources to trust, which interpretations to weight, which voices to amplify. Those are editorial questions, not infrastructure. We make some things cheaper and harder to censor — we do not make the world easier to interpret.`,
      bodyZh: `协议原生知识并不解决最难的知识问题:信任哪些来源、给哪些解读以权重、放大哪些声音。这些是编辑问题,而非基础设施。我们让部分工作更便宜、更难审查——但不会让世界更易解读。`,
      cls: "cyan"
    },
    {
      kicker: ["Curation markets", "策展市场"],
      titleEn: "Pay people to remember accurately",
      titleZh: "为准确记忆付费",
      bodyEn: `Wikipedia&apos;s editor pool is mostly volunteer. That works for breadth and fails for depth. A curation-market layer over a knowledge graph lets specialized communities pay specialists to maintain a specific subgraph — without forcing the underlying data into a single namespace or a single license.`,
      bodyZh: `维基百科的编辑队伍以志愿者为主——这对广度有效,深度则不足。在知识图谱之上加设策展市场层,让专门社区为专家维护特定子图付费,而不强迫底层数据进入单一命名空间或单一许可证。`,
      cls: "gold"
    }
  ];
  renderCards("knowledgeCards", knowledgeCards);

  // ─── Module 07 · Coordination markets cards ──────────────────────
  const coordCards = [
    {
      kicker: ["Yes", "是"],
      titleEn: "What protocols replace cleanly",
      titleZh: "协议能干净替代之事",
      bodyEn: `Escrow, payment, dispute logging, reputation tracking, public registries, scheduling rights to scarce resources, settling exchanges of fungible items. Whenever the function is essentially &quot;keep an honest ledger of who agreed to what,&quot; protocols beat firms on cost.`,
      bodyZh: `托管、支付、争议记录、信誉追踪、公开登记、稀缺资源使用权调度、可替代物品交换结算。每当某职能本质上是"保持一份诚实的账簿,记录谁与谁达成何事",协议在成本上胜过公司。`,
      cls: "purple"
    },
    {
      kicker: ["Maybe", "或许"],
      titleEn: "Where coordination moves but judgment stays",
      titleZh: "协调可移、判断仍留之处",
      bodyEn: `Software development, design, complex creative work, quality control. The coordination component can move to a protocol; the judgment component cannot. The result is firms with smaller fixed surface — fewer employees, more contracts — not the disappearance of firms entirely.`,
      bodyZh: `软件开发、设计、复杂创意、质量控制。其中的协调部分可移至协议,判断部分则不能。结果是固定表面更小的公司——更少员工、更多合约——而非公司彻底消失。`,
      cls: "cyan"
    },
    {
      kicker: ["No", "否"],
      titleEn: "What protocols cannot replace",
      titleZh: "协议无法替代之事",
      bodyEn: `Internal culture-setting, long-term hiring judgment, reputational risk-bearing, regulated relationships with end users (banking, healthcare), most R&D requiring continuous unspoken context. The boundary of the firm exists for reasons; some reasons survive the protocol layer.`,
      bodyZh: `内部文化养成、长期招聘判断、声誉风险承担、与终端用户的受监管关系(银行、医疗)、需要持续未言语境的研发。公司边界因故存在;部分理由可越过协议层而存活。`,
      cls: "rose"
    },
    {
      kicker: ["Hybrid", "混合"],
      titleEn: "The likely steady state",
      titleZh: "可能的稳态",
      bodyEn: `Most firms ten years from now keep their judgment-heavy core and outsource their coordination-heavy edges to protocols. The biggest mistake is to treat the question as binary — protocols replace firms or they do not. They will replace some functions, complement others, and leave a third set untouched.`,
      bodyZh: `十年后,绝大多数公司保留判断密集的核心,把协调密集的边缘外包至协议。最大的错误是将问题视为二元——协议要么替代公司,要么不。它将替代部分职能、补充另一部分、并保留第三部分不变。`,
      cls: "gold"
    }
  ];
  renderCards("coordCards", coordCards);

  // ─── Module 08 · Identity cards ──────────────────────────────────
  const identityCards = [
    {
      kicker: ["Self-sovereign", "自治"],
      titleEn: "An identity that is not held by any platform",
      titleZh: "不被任何平台持有的身份",
      bodyEn: `Today, your identity on the open internet is a portfolio of platform accounts, each of which can be revoked unilaterally by its operator. A self-sovereign identity inverts this: the keys are yours, the platforms are renters, and your reputation accrues to the keys regardless of which platform you happened to use to build it.`,
      bodyZh: `今日你在公开互联网上的身份,是一组平台账户,每一个都可被运营者单方面吊销。自治身份将其颠倒:密钥属于你,平台是租户,你的信誉归属于密钥,不论你恰好用哪个平台来积累它。`,
      cls: "purple"
    },
    {
      kicker: ["Portable reputation", "可携带信誉"],
      titleEn: "Receipts you can carry across systems",
      titleZh: "你可跨系统携带的收据",
      bodyEn: `Reputation that lives only inside one platform forces users to start over when they leave. Portable reputation — anchored in protocol-level identity — moves with the user. The platforms compete on judgment, not on data ownership.`,
      bodyZh: `仅存于单一平台之内的信誉,迫使用户离开时归零。可携带信誉——锚定于协议级身份——随用户迁移。平台以判断力而非数据所有权竞争。`,
      cls: "cyan"
    },
    {
      kicker: ["Agent identity", "智能体身份"],
      titleEn: "Why agents need their own identity layer",
      titleZh: "为何智能体需自带身份层",
      bodyEn: `A future internet where AI agents outnumber humans cannot route attribution by IP address or user-agent string. Identity must be cryptographically verifiable and per-agent — otherwise &quot;who did this&quot; ceases to be answerable, and accountability collapses.`,
      bodyZh: `一个 AI 智能体数量超过人类的未来互联网,无法以 IP 地址或 user-agent 字符串路由归责。身份必须可密码学验证、按智能体颗粒——否则"谁做了这件事"无法回答,问责崩塌。`,
      cls: "blue"
    },
    {
      kicker: ["Risk axis", "风险轴"],
      titleEn: "Identity infrastructure is dual-use",
      titleZh: "身份基础设施具双重用途",
      bodyEn: `The same primitives that enable self-sovereign identity also enable surveillance at scale if poorly designed. Selective disclosure, zero-knowledge attestations, and explicit revocation rights are not features — they are necessary safety constraints on any civilization-scale identity layer.`,
      bodyZh: `使自治身份成为可能的同一基元,若设计不当,也可使大规模监控成为可能。选择性披露、零知识证明、显式撤销权,并非功能特性——它们是任何文明级身份层的必要安全约束。`,
      cls: "rose"
    }
  ];
  renderCards("identityCards", identityCards);

  // ─── Module 09 · Philosophy cards ────────────────────────────────
  const philCards = [
    {
      kicker: ["Geographic", "地理"],
      titleEn: "Where the nodes physically sit",
      titleZh: "节点在物理上的位置",
      bodyEn: `A network whose nodes are spread across many jurisdictions is geographically decentralized. This makes it harder for a single state to take down — but does not, by itself, make it economically or politically decentralized. Many &quot;decentralized&quot; networks are geographically diverse but economically concentrated.`,
      bodyZh: `节点遍布多个司法辖区的网络,即地理上去中心化。这使单一国家难以将其下架——但本身并不使其在经济或政治上去中心化。许多"去中心化"网络在地理上多样,在经济上却高度集中。`,
      cls: "purple"
    },
    {
      kicker: ["Economic", "经济"],
      titleEn: "How concentrated the wealth is",
      titleZh: "财富的集中度",
      bodyEn: `A protocol whose tokens are mostly held by a few wallets is economically centralized regardless of how many nodes run its software. Economic decentralization is measured by Gini coefficients and concentration indices, not by node-count slogans. Honest analysis names both.`,
      bodyZh: `代币主要由少数钱包持有的协议,无论运行其软件的节点有多少,在经济上仍是中心化的。经济去中心化以基尼系数与集中度指标衡量,而非以节点数口号。诚实的分析两者并报。`,
      cls: "blue"
    },
    {
      kicker: ["Political", "政治"],
      titleEn: "Who can change the rules",
      titleZh: "谁能改变规则",
      bodyEn: `A network where a small group can change consensus rules without broad community consent is politically centralized. Many networks publish governance forums but reserve real decision-making to a core team. Political decentralization is the hardest dimension to verify because it is performed in slow time over many decisions.`,
      bodyZh: `规则可由小团体在缺乏广泛社区同意下更改的网络,在政治上是中心化的。许多网络公开治理论坛,但将真正决策权保留给核心团队。政治去中心化是最难验证的维度——它在多次决策的慢速时间中表现。`,
      cls: "cyan"
    },
    {
      kicker: ["Architectural", "架构"],
      titleEn: "Whether the system can keep working when key nodes fail",
      titleZh: "关键节点失效时系统能否继续运作",
      bodyEn: `A network that survives the failure or malice of any single node — coordinator, validator, indexer — is architecturally decentralized. This is the most concrete dimension and the one engineers can verify. It is also the dimension most often conflated with the others, despite being only one of four.`,
      bodyZh: `任何单一节点失效或作恶时仍能存活的网络——协调器、验证器、索引器——即架构上去中心化。这是最具体、最可由工程师验证的维度,也是最常被与其他维度混淆的维度——尽管它只是四个维度之一。`,
      cls: "gold"
    }
  ];
  renderCards("philCards", philCards);

  // ─── Module 10 · Future cards ────────────────────────────────────
  const futureCards = [
    {
      kicker: ["Science", "科学"],
      titleEn: "Autonomous research collectives",
      titleZh: "自主研究合作社",
      bodyEn: `A protocol-native research organization can hold its own grants, fund its own experiments, publish on its own terms, and outlive its founders. The question is not whether such organizations are technically possible — they are — but whether existing scientific institutions accept them as peers, and on what timeline.`,
      bodyZh: `一个协议原生的研究组织,能持有自己的经费、资助自己的实验、按自己的条款发表、并比其创立者更长寿。问题不在于此类组织技术上是否可行——它们可行——而在于现有科研机构是否、以及何时,接受它们为同侪。`,
      cls: "purple"
    },
    {
      kicker: ["Economy", "经济"],
      titleEn: "Machine economies that work while you sleep",
      titleZh: "你睡眠时仍运转的机器经济",
      bodyEn: `Persistent identity for AI agents enables economies that operate continuously, with humans participating intermittently. This is not science fiction — small-scale agent-to-agent micropayments already exist. The civilization-scale question is what fraction of GDP eventually moves through such economies, and how the legal system maps onto them.`,
      bodyZh: `AI 智能体的持久身份,使人类间歇性参与、机器持续运转的经济成为可能。这不是科幻——小规模的智能体对智能体微支付已存在。文明级问题是,最终有多少 GDP 经此类经济流转,以及法律体系如何映射其上。`,
      cls: "cyan"
    },
    {
      kicker: ["Cities", "城市"],
      titleEn: "Programmable governance, locally",
      titleZh: "本地化的可编程治理",
      bodyEn: `Cities and special economic zones may experiment with protocol-native governance for specific functions — permitting, dispute resolution, public registries — before nation-states do. This pattern (cities as institutional laboratories) is the historical norm, not the exception, and there is no obvious reason it would not repeat.`,
      bodyZh: `在民族国家之前,城市与经济特区可能率先在特定职能(许可、争议解决、公开登记)上试验协议原生治理。"城市作为制度实验室"的模式是历史常态而非例外,没有明显理由认为其不会重现。`,
      cls: "blue"
    },
    {
      kicker: ["Risk", "风险"],
      titleEn: "How this could go wrong",
      titleZh: "这一切如何走偏",
      bodyEn: `Three failure modes worth naming. Capture: a small group accumulates protocol-level reputation that mimics state authority without democratic accountability. Brittleness: a single cryptographic break propagates through every layer of the civilization stack. Exclusion: those without identity-layer access become structurally invisible to the formal economy. We design against these now, or we live with them later.`,
      bodyZh: `值得指明的三种失败模式。捕获:小团体积累起模仿国家权威而无民主问责的协议级信誉。脆弱性:一次密码学破解贯穿文明栈的每一层。排斥:无身份层接入者在结构上对正式经济不可见。我们要么现在设计以对抗,要么以后承受。`,
      cls: "rose"
    }
  ];
  renderCards("futureCards", futureCards);

  // ─── AI Theorist ─────────────────────────────────────────────────
  const aiCanned = [
    {
      qEn: "How is Psy a civilization-scale primitive, not just a chain?",
      qZh: "Psy 为何是文明级基元而不只是一条链?",
      aEn: `<p><em>Theorist · structural answer</em></p>
        <p>Civilization advances when a new coordination substrate appears that lowers the cost of organizations previously priced out. Writing made bureaucracy cheap. Coinage made markets cheap. Printing made publishing cheap. Joint-stock made large-scale capital cheap. The internet made information transport cheap.</p>
        <p>Psy&apos;s candidacy as the next such primitive rests on three claims: (a) shared state can be maintained without institutional trust, by recursive proofs; (b) identity can persist across applications without single-vendor lock-in; (c) coordination can be partitioned into realms so that scale stops being a tax on individual users.</p>
        <p>None of these alone is civilization-changing. The compound is. Whether the compound succeeds depends on engineering execution, not on whether the architectural claim is correct.</p>`,
      aZh: `<p><em>理论师 · 结构性答复</em></p>
        <p>文明在新协调基底出现、使先前被价格挤出的组织形态变得便宜时前进。文字使官僚廉价;铸币使市场廉价;印刷使出版廉价;股份公司使大规模资本廉价;互联网使信息运输廉价。</p>
        <p>Psy 作为下一基元的候选,基于三项主张:(a) 共享状态可在无制度信任的条件下经递归证明维持;(b) 身份可跨应用持久,而无须单一供应商锁定;(c) 协调可按 realm 分区,使规模不再是单个用户的税。</p>
        <p>三者单独皆不足以改变文明,合起来则可。复合是否成功,取决于工程执行,而非架构主张是否正确。</p>`
    },
    {
      qEn: "What does AI-native infrastructure actually require?",
      qZh: "AI 原生基础设施实际需要什么?",
      aEn: `<p><em>Theorist · stack answer</em></p>
        <p>Four layers, in order of urgency.</p>
        <p><strong>1. Identity for agents.</strong> An agent without its own keys is its host&apos;s pet. Persistent, agent-owned identity is the prerequisite for everything else.</p>
        <p><strong>2. Native payment.</strong> An agent that cannot pay for compute, storage, or other agents&apos; services cannot operate as an economic actor.</p>
        <p><strong>3. Verifiable receipts.</strong> An agent&apos;s reputation must accrue to portable receipts of work done, not to private platform metrics.</p>
        <p><strong>4. Memory persistence.</strong> An agent that forgets when its provider migrates has no continuous identity.</p>
        <p>Most current &quot;AI infrastructure&quot; products solve layer 0 (model serving) and ignore the four above. The interesting AI-native infrastructure starts where they leave off.</p>`,
      aZh: `<p><em>理论师 · 堆栈答复</em></p>
        <p>四层,按紧迫性排序。</p>
        <p><strong>1. 智能体身份。</strong>无自身密钥的智能体,只是其托管商的宠物。持久的、智能体自持的身份,是其余一切的前提。</p>
        <p><strong>2. 原生支付。</strong>无法为算力、存储或其他智能体服务付费的智能体,无法作为经济行为者运作。</p>
        <p><strong>3. 可验证收据。</strong>智能体信誉必须归属于其工作的可携带收据,而非私有平台指标。</p>
        <p><strong>4. 记忆持久。</strong>提供商迁移即失忆的智能体,没有连续身份可言。</p>
        <p>当今多数"AI 基础设施"产品解决的是第 0 层(模型服务),忽略上述四层。有意思的 AI 原生基础设施,从它们止步之处起步。</p>`
    },
    {
      qEn: "Why is shared state more important than computation?",
      qZh: "为何共享状态比计算更重要?",
      aEn: `<p><em>Theorist · economic answer</em></p>
        <p>Computation is a commodity. Shared state is not. Anyone with a credit card can buy compute; the cost has fallen by orders of magnitude over forty years. Shared state — a record everyone agrees on — has historically required institutions: banks for money, registries for property, legal systems for contracts.</p>
        <p>Most economic friction comes from disagreement about state, not from compute scarcity. A shopkeeper does not lose sleep over GPU prices; they lose sleep over whether a check will clear, whether a contract will be honored, whether a registry will reflect the right owner.</p>
        <p>Protocols that maintain shared state natively, with cryptographic evidence rather than institutional trust, attack the actual bottleneck. The civilizational consequence is that organizations that could not be priced before — agent-native firms, autonomous research collectives, planetary registries — become economically tractable.</p>`,
      aZh: `<p><em>理论师 · 经济性答复</em></p>
        <p>计算是大宗品,共享状态不是。任何有信用卡的人都能买计算;过去四十年其成本下降了几个数量级。共享状态——一份所有人同意的记录——在历史上需要制度:货币靠银行,产权靠登记处,合约靠法律。</p>
        <p>经济摩擦的多数来自对状态的分歧,而非计算的稀缺。店主不为 GPU 价格失眠,而为支票能否兑现、合约能否履行、登记是否反映正确所有者失眠。</p>
        <p>原生维持共享状态、以密码学证据而非制度信任的协议,直击真正瓶颈。文明级后果是:此前无法定价的组织——智能体原生公司、自主研究合作社、行星级登记——在经济上变得可行。</p>`
    },
    {
      qEn: "Are we sure decentralization is good?",
      qZh: "我们能确定去中心化是好的吗?",
      aEn: `<p><em>Theorist · honest answer</em></p>
        <p>No. &quot;Decentralization&quot; is not a value, it is an architectural property. Whether it is good in a given context depends on what you are decentralizing and why.</p>
        <p>Decentralized payments are usually good (resilience to censorship, lower trust costs). Decentralized criminal investigations are usually bad (no accountable authority). Decentralized dispute resolution is mixed (cheaper, but loses jurisprudence built up over centuries).</p>
        <p>The right question is not &quot;centralized vs decentralized&quot; but &quot;at which layer is concentration of authority an asset, and at which layer a liability?&quot; A civilization that gets this question right will run mixed-architecture institutions; one that gets it wrong will reproduce its own failure modes at every layer.</p>`,
      aZh: `<p><em>理论师 · 诚实答复</em></p>
        <p>不能。"去中心化"并非价值,而是架构属性。它在给定情境下是否好,取决于你去中心化什么、为何如此。</p>
        <p>去中心化的支付通常好(对审查的韧性、更低的信任成本);去中心化的刑事侦查通常差(无可问责权威);去中心化的争议解决利弊参半(更便宜,但丧失数百年累积的判例)。</p>
        <p>正确的问题不是"中心化对去中心化",而是"在哪一层,权威的集中是资产;在哪一层,是负债?"答好此题的文明运行混合架构的制度;答错的文明则在每一层重复其失败模式。</p>`
    },
    {
      qEn: "What would make this whole thesis fail?",
      qZh: "什么会让这整个命题失败?",
      aEn: `<p><em>Theorist · pre-mortem</em></p>
        <p>Three failure modes worth naming.</p>
        <p><strong>UX never closes the gap.</strong> A protocol whose primitives require a Ph.D. to use does not become civilizational infrastructure. If wallet UX, agent identity onboarding, and recovery flows do not reach Stripe-level smoothness within a decade, the protocol layer remains a niche developer tool.</p>
        <p><strong>Regulatory hostility.</strong> Major jurisdictions can structurally constrain protocol-native finance, identity, and AI agency. Some constraints are reasonable; some are not; either way, hostility slows or distorts adoption. Protocols that pretend regulation does not exist are designing for a world that does not exist.</p>
        <p><strong>Capture.</strong> The protocol becomes effectively centralized through accumulated reputation, validator concentration, or coordinator dependency. The architectural decentralization survives on paper while political centralization re-emerges. This is the most subtle failure mode and the one history most often produces.</p>`,
      aZh: `<p><em>理论师 · 死前剖析</em></p>
        <p>三个值得指明的失败模式。</p>
        <p><strong>UX 永远填不平鸿沟。</strong>使用其基元需要博士学位的协议,无法成为文明级基础设施。若钱包 UX、智能体身份接入与恢复流程在十年内未达到 Stripe 级的流畅度,协议层将仅为开发者小众工具。</p>
        <p><strong>监管敌意。</strong>主要辖区可在结构上约束协议原生金融、身份与 AI 代理。一些约束合理,一些则否——无论如何,敌意会拖慢或扭曲采纳。假装监管不存在的协议,是在为一个不存在的世界做设计。</p>
        <p><strong>被捕获。</strong>协议通过累积的信誉、验证者集中或对协调器的依赖,在事实上中心化。架构去中心化于纸面存活,政治中心化于现实重现。这是最微妙的失败模式,也是历史最常产出的一种。</p>`
    }
  ];

  function renderPrompts() {
    const host = document.getElementById("aiPrompts");
    if (!host) return;
    host.innerHTML = aiCanned.map((c, i) => `
      <button class="ai-prompt" data-idx="${i}">
        <span lang="en">${c.qEn}</span><span lang="zh">${c.qZh}</span>
      </button>
    `).join("");
    host.querySelectorAll(".ai-prompt").forEach(b => {
      b.addEventListener("click", () => {
        const idx = +b.dataset.idx;
        const c = aiCanned[idx];
        document.getElementById("aiOutput").innerHTML =
          `<span lang="en">${c.aEn}</span><span lang="zh">${c.aZh}</span>`;
      });
    });
  }
  renderPrompts();

  function freeTextAnswer(qRaw) {
    const q = qRaw.toLowerCase();
    const lang = root.getAttribute("data-lang") || "en";

    const matches = [];
    aiCanned.forEach(c => {
      const en = c.qEn.toLowerCase();
      const zh = c.qZh;
      let score = 0;
      en.split(/\s+/).forEach(w => { if (w.length > 3 && q.includes(w)) score++; });
      [...zh].forEach(ch => { if (q.includes(ch)) score++; });
      if (score) matches.push({ c, score });
    });
    matches.sort((a, b) => b.score - a.score);
    if (matches.length && matches[0].score >= 2) {
      return lang === "zh" ? matches[0].c.aZh : matches[0].c.aEn;
    }

    const topics = [
      { kw: ["realm", "realms"],
        en: `A realm is a sandboxed state-and-execution domain on Psy, identified by a uid (default: 0; canonical second realm: 524288). Cross-realm interactions are explicit and proof-mediated. The civilization-scale insight: a single global polity scales worse than a federation of bounded polities sharing a common substrate of validity.`,
        zh: `realm 是 Psy 上由 uid 标识的状态-执行沙箱(默认为 0;典型第二 realm 为 524288)。跨 realm 交互显式存在、经证明中介。文明级洞见:单一全球政体的扩展性,弱于若干在统一有效性基底之上的受界政体所组成的联邦。` },
      { kw: ["coordinator", "协调器"],
        en: `The coordinator orders transactions and emits cryptographic evidence of every transition. It is operationally a single point — but a single point that cannot lie about what happened. This is the same trade-off as a postmaster general or standards bureau: one entity coordinates, but the artifacts can be audited by anyone.`,
        zh: `协调器排序交易,并对每次状态转移发出密码学证据。在运营上它是单点——但是无法对所发生之事撒谎的单点。这与邮政总局或度量衡标准局是同一权衡:一个实体协调,但其产物可由任何人审计。` },
      { kw: ["identity", "身份", "psy-wallet"],
        en: `Persistent identity (psy-wallet) is the load-bearing primitive. Accounts are not bound to a single application; reputation, balances, history persist at the protocol layer. In a world where AI agents outnumber humans on the open internet, identity at this layer becomes the only way to answer &quot;who did this&quot;.`,
        zh: `持久身份(psy-wallet)是承重基元。账户不绑定于单一应用;信誉、余额、历史在协议层持久。在 AI 智能体数量超过人类的公开互联网世界中,这一层的身份成为回答"谁做了这件事"的唯一途径。` },
      { kw: ["philosophy", "哲学", "decentraliz"],
        en: `Decentralization is not a value, it is an architectural property — and there are at least four kinds: geographic, economic, political, architectural. The right question is which layer benefits from concentration of authority and which layer is endangered by it. The same protocol can be one without being the others.`,
        zh: `去中心化不是价值,而是架构属性——至少有四种:地理、经济、政治、架构。正确的问题是,哪一层从权威集中受益、哪一层被其危害。同一协议可以是其中一种,而非其余。` }
    ];
    for (const t of topics) {
      if (t.kw.some(k => q.includes(k.toLowerCase()))) {
        return lang === "zh" ? `<p><em>理论师 · 主题答复</em></p><p>${t.zh}</p>` : `<p><em>Theorist · topic answer</em></p><p>${t.en}</p>`;
      }
    }

    return lang === "zh"
      ? `<p><em>理论师 · 一般答复</em></p>
         <p>这一问题没有直接对应的预设回答。我会从基础设施、协调成本与历史类比推理,但不会输出代币营销或乌托邦确定性。</p>
         <p>把问题落实到具体协调难题、具体基元(realm/证明/身份)、或具体历史比照,我能给出更结构化的回答。</p>`
      : `<p><em>Theorist · general answer</em></p>
         <p>I do not have a directly matching canned answer. I will reason from infrastructure, coordination cost, and historical analogy — and I will not produce token marketing or utopian certainty.</p>
         <p>Ground the question in a specific coordination problem, a specific primitive (realm / proof / identity), or a specific historical comparison and I can answer more structurally.</p>`;
  }

  document.getElementById("aiSend").addEventListener("click", () => {
    const v = document.getElementById("aiInput").value.trim();
    if (!v) return;
    document.getElementById("aiOutput").innerHTML = freeTextAnswer(v);
  });
  document.getElementById("aiInput").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("aiSend").click();
  });

})();
