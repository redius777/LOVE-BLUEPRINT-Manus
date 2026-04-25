/**
 * LOVE BLUEPRINT — Home Page
 * Design: Dark Academia Romance
 * - 深みのある暗色背景 (#0D0A0B) に古金色 (#C9A84C) の装飾
 * - Playfair Display (見出し) + Noto Serif JP (本文) + Cinzel Decorative (ラベル)
 * - 羊皮紙テクスチャ・魔法陣モチーフ・金色装飾ライン
 */

import { useState } from "react";

// ─── タイプ別画像URL（余白トリム済み精密切り出し版） ────────────────────
const typeImages: Record<string, string> = {
  DIVS: "/manus-storage/DIVS_925cd0b3.png",
  DIVA: "/manus-storage/DIVA_758c287f.png",
  DITS: "/manus-storage/DITS_4329f60f.png",
  DITA: "/manus-storage/DITA_12fa2d94.png",
  DMVS: "/manus-storage/DMVS_3eec1d95.png",
  DMVA: "/manus-storage/DMVA_c73381b9.png",
  DMTS: "/manus-storage/DMTS_af787904.png",
  DMTA: "/manus-storage/DMTA_104569ff.png",
  RIVS: "/manus-storage/RIVS_11d32117.png",
  RIVA: "/manus-storage/RIVA_ee297b00.png",
  RITS: "/manus-storage/RITS_0791d4d0.png",
  RITA: "/manus-storage/RITA_24615f60.png",
  RMVS: "/manus-storage/RMVS_97da7ef3.png",
  RMVA: "/manus-storage/RMVA_d359af3c.png",
  RMTS: "/manus-storage/RMTS_56bc247e.png",
  RMTA: "/manus-storage/RMTA_9c050b25.png",
};

// ─── 質問データ ────────────────────────────────────────────────────────────────
const masterQuestions = [
  { axis: "D", text: "デートや旅行のプランは、自分が主導して決めたい。", reverse: false },
  { axis: "D", text: "二人の空間では、相手を驚かせる仕掛けを自分から用意したい。", reverse: false },
  { axis: "D", text: "指示されるより、自分からリードする方が自然に振る舞える。", reverse: false },
  { axis: "D", text: "相手の反応をコントロールしている時に、深い充足感を感じる。", reverse: false },
  { axis: "D", text: "どちらかといえば、自分が「追いかける側」でありたい。", reverse: true },
  { axis: "D", text: "物語の「主人公」として、その場の空気を引っ張るのが得意だ。", reverse: false },
  { axis: "I", text: "穏やかなものより、心拍数が上がるような激しい刺激を好む。", reverse: false },
  { axis: "I", text: "予定調和な平穏よりも、少し危うい緊張感がある方が燃える。", reverse: false },
  { axis: "I", text: "強い力で抱きしめられたり、強引に扱われることに魅力を感じる。", reverse: false },
  { axis: "I", text: "濃厚な短時間より、一晩中ゆっくり溶け合うような時間が理想だ。", reverse: true },
  { axis: "I", text: "精神的な繋がりと同じくらい、本能的な「激しさ」を重視したい。", reverse: false },
  { axis: "I", text: "痛みや圧迫といった強い感覚も、愛の表現として成立すると思う。", reverse: false },
  { axis: "V", text: "照明や服装など「見た目」の美しさには一倍こだわりたい。", reverse: false },
  { axis: "V", text: "鏡越しに自分たちの姿を見ることに、特別な高揚感を感じる。", reverse: false },
  { axis: "V", text: "感覚に没頭するより、相手の表情をしっかり見ていたい。", reverse: false },
  { axis: "V", text: "匂いや声といった「目に見えない感覚」が一番のスイッチだ。", reverse: true },
  { axis: "V", text: "思い出は感覚よりも、映像的なシーンとして記憶に残りやすい。", reverse: false },
  { axis: "V", text: "演出された「非日常な光景」の中に身を置くことが好きだ。", reverse: false },
  { axis: "S", text: "馴染みのある定番のルーチンを繰り返すことに安心感を感じる。", reverse: false },
  { axis: "S", text: "まだ試したことのない新しい刺激には、好奇心が勝る。", reverse: true },
  { axis: "S", text: "世間一般では「変わっている」と言われる嗜好にも理解がある。", reverse: true },
  { axis: "S", text: "自分の知らない「新しい感覚の扉」を開けてくれる人を求めている。", reverse: true },
  { axis: "S", text: "自分ではない誰かになりきる「役割」を演じることに興味がある。", reverse: true },
  { axis: "S", text: "二人だけの秘められた遊びを、どこまでも追求したい。", reverse: true },
];

// ─── 16タイプ詳細データ ────────────────────────────────────────────────────────
interface TypeInfo {
  name: string;
  desc: string;
  plus: string[];
  minus: string[];
  bestName: string;
  bestCode: string;
  why: string;
}

const typeData: Record<string, TypeInfo> = {
  DIVS: {
    name: "王道のプロデューサー",
    desc: "あなたは華やかな舞台を自ら演出し、相手をリードすることに喜びを感じる情熱的な主導者です。視覚的な美しさと正統派の盛り上がりを重視し、相手の最高の反応を引き出すプロデュース能力に長けています。",
    plus: ["場のムード作り", "相手の魅力を引き出す演出", "緩急のある展開"],
    minus: ["すべてを相手に委ねること", "変化のない平坦な時間", "無反応な状態"],
    bestName: "共鳴のソウルメイト", bestCode: "RITS",
    why: "あなたの華やかな演出を、RITSは全身の感度で受け止めてくれます。演出と共鳴がパズルのように噛み合う組み合わせです。",
  },
  DIVA: {
    name: "変革のアーティスト",
    desc: "あなたは日常から切り離されたドラマチックな世界観を創り出す表現者です。独自の役割や特殊なシチュエーションを好み、攻めの姿勢で「見たことのない景色」をパートナーと共に開拓していくタイプです。",
    plus: ["非日常の演出", "新しい役割の提案", "大胆なアプローチ"],
    minus: ["「いつも通り」の繰り返し", "型にはまった振る舞い", "現実的な会話"],
    bestName: "深淵のダイバー", bestCode: "RITA",
    why: "あなたの突飛なアイデアや探求心を、RITAは好奇心を持ってすべて受け入れます。未知の領域を二人で開拓できる関係です。",
  },
  DITS: {
    name: "情熱の建築家",
    desc: "あなたは確かな身体的接触を通じて相手の熱量を確かめ、積み上げていく実力派です。力強いリードで物理的な密度を高め、言葉以上のリアリティで相手を圧倒し、支配することを得意とします。",
    plus: ["物理的な距離を詰める", "力強いアクション", "リアルな繋がりの構築"],
    minus: ["精神的な駆け引き", "遠回しな演出", "距離がある状態"],
    bestName: "輝きのミューズ", bestCode: "RIVS",
    why: "あなたの確かなリードに対し、RIVSは最高に鮮やかな反応を返します。触れ合いと視覚的な悦びが融合し、濃厚な時間が生まれます。",
  },
  DITA: {
    name: "五感の冒険家",
    desc: "あなたはあらゆる感覚をハックする実験者です。主導権を握りながら、新しい道具や未知の感覚を積極的に取り入れ、相手がこれまでに見せたことのない反応を引き出すことに快感を覚えます。",
    plus: ["道具や場所の活用", "特殊な状況の創出", "反応の観察"],
    minus: ["保守的な考え方", "決まりきった手順", "驚きのない時間"],
    bestName: "神秘のパフォーマー", bestCode: "RIVA",
    why: "あなたの実験的な試みに対し、RIVAは柔軟に変幻自在に応じます。お互いに新しい自分を解放し合える、最も刺激的なペアです。",
  },
  DMVS: {
    name: "華やかなディレクター",
    desc: "あなたは激しさよりも様式美や品位を重んじる主導者です。優雅に相手をエスコートし、精神的な優位性を保ちながら、まるで映画のワンシーンのように二人の時間を美しくコントロールします。",
    plus: ["品位のある演出", "美しい空間作り", "優雅なエスコート"],
    minus: ["野性的な激しさ", "乱暴な扱い", "ムードのない場所"],
    bestName: "癒やしのゆりかご", bestCode: "RMTS",
    why: "あなたの優雅なリードに、RMTSは絶対的な安心感を持って身を委ねます。静かで美しい調和が生まれる、大人の関係です。",
  },
  DMVA: {
    name: "幻想のストーリーテラー",
    desc: "あなたは自身の空想を現実へと塗り替えるプランナーです。穏やかなリードの中に独自のフェティシズムや物語性を忍ばせ、相手に自分の描いた理想を演じてもらうことで深い満足を得るタイプです。",
    plus: ["世界観の構築", "密やかなルール作り", "精神的な没入感"],
    minus: ["空気を読まない行動", "過度な積極性", "現実的な要求"],
    bestName: "たゆたう旅人", bestCode: "RMTA",
    why: "あなたが創る物語の世界に、RMTAは波に揺られるように同調してくれます。お互いのこだわりが静かに共鳴する組み合わせです。",
  },
  DMTS: {
    name: "慈愛のガーディアン",
    desc: "あなたは相手を深い安心感と逃げ場のない温もりで包み込む支配者です。強引さよりも、圧倒的な包容力によって相手を自分なしではいられない状態へ導き、優しくも確かな主導権を握ります。",
    plus: ["長時間の触れ合い", "ペースの管理", "安心感の提供"],
    minus: ["短時間での終了", "冷たい突き放し", "性急な展開"],
    bestName: "静寂のギャラリー", bestCode: "RMVS",
    why: "あなたの深い包容力を、RMVSは静かに見守り受け入れます。温かな支配と、それを享受する静寂が心地よく噛み合います。",
  },
  DMTA: {
    name: "秘密の調香師",
    desc: "あなたは繊細でニッチなこだわりを静かに施す職人タイプです。大きな変化よりも細部への執着を大切にし、相手が気づかないうちに自分色に染めていくような、ミステリアスなリードを好みます。",
    plus: ["一点の鋭いこだわり", "繊細なアクション", "時間をかけた変化"],
    minus: ["大雑把な振る舞い", "分かりやすすぎる刺激", "コピペのような時間"],
    bestName: "夢想の観察者", bestCode: "RMVA",
    why: "あなたの細やかなこだわりを、RMVAは好奇心を持って細部まで愛でてくれます。マニアックな感性が響き合うペアです。",
  },
  RIVS: {
    name: "輝きのミューズ",
    desc: "あなたは相手の情熱的なリードに対し、最高に鮮やかな反応で応える受容のプロです。「見られている」ことがエネルギーとなり、相手が求める姿を直感的に察知して演じきる才能があります。",
    plus: ["期待に応える演技", "ドラマチックな反応", "視覚的なアピール"],
    minus: ["放置されること", "視線を向けられないこと", "暗闇での無言"],
    bestName: "情熱の建築家", bestCode: "DITS",
    why: "DITSの確かな物理的リードは、あなたの反応を最大限に引き出します。互いの欲求が最もストレートに満たされる関係です。",
  },
  RIVA: {
    name: "神秘のパフォーマー",
    desc: "あなたは相手の意外な要求や刺激的な提案に対して、驚くべき柔軟性を見せるタイプです。相手の色に染まる過程そのものを楽しみ、日常では見せない別の自分を解放することに喜びを感じます。",
    plus: ["意外な要求への対応", "別の自分の解放", "刺激の享受"],
    minus: ["固定された役割", "平凡なルーチン", "自分を制限されること"],
    bestName: "五感の冒険家", bestCode: "DITA",
    why: "DITAの実験的な提案は、あなたの好奇心を常に刺激します。飽きることのない、変幻自在な遊びが続く二人になります。",
  },
  RITS: {
    name: "共鳴のソウルメイト",
    desc: "あなたは相手の熱量をダイレクトに全身で受け止め、境界線がなくなるような一体感を求めるタイプです。激しいアクションに対しても深い受容力を発揮し、魂の鼓動を分かち合うような時間を望みます。",
    plus: ["全身での応答", "高い感度", "激しい感情の受容"],
    minus: ["表面的な接触", "よそよそしい態度", "物理的な距離感"],
    bestName: "王道のプロデューサー", bestCode: "DIVS",
    why: "DIVSの華やかな演出を、あなたは最も深く感じ取ることができます。互いのエネルギーが循環し、最高潮へ導かれます。",
  },
  RITA: {
    name: "深淵のダイバー",
    desc: "あなたは相手の探究心にどこまでも寄り添う、圧倒的な包容力を持った理解者です。どんなに特殊な要求であっても「それをもっと知りたい」と受け入れ、自分を委ねて未知の深みへ沈んでいきます。",
    plus: ["高い許容力", "未知の体験の受容", "深い没入感"],
    minus: ["否定されること", "浅い関係", "好奇心のない相手"],
    bestName: "変革のアーティスト", bestCode: "DIVA",
    why: "DIVAの突飛な世界観に、あなたは誰よりも深くダイブできます。二人にしか分からない、深淵の悦びを共有できます。",
  },
  RMVS: {
    name: "静寂のギャラリー",
    desc: "あなたは穏やかな流れの中で、相手の所作や自身の姿がどう映るかを見守ることを好みます。受容的ながらも静かな緊張感を楽しみ、美しく演出された空間に身を置くことに心地よさを感じます。",
    plus: ["視線の受容", "静止した美しさ", "空間への調和"],
    minus: ["騒がしい場所", "過度な干渉", "美意識のない行動"],
    bestName: "慈愛のガーディアン", bestCode: "DMTS",
    why: "DMTSの包み込むような支配は、あなたに最高の安心感と緊張感を与えます。静かで深い、安定した関係を築けます。",
  },
  RMVA: {
    name: "夢想の観察者",
    desc: "あなたは相手が作り出す独自の世界観やこだわりを、好奇心を持って受容するタイプです。相手の特殊な嗜好を「面白い景色」として眺め、その物語の一部として機能することに充足感を覚えます。",
    plus: ["多様な嗜好への理解", "物語の一部になる", "細部の観察"],
    minus: ["常識の押し付け", "強い主導権争い", "無難な展開"],
    bestName: "秘密の調香師", bestCode: "DMTA",
    why: "DMTAの細かすぎるこだわりを、あなたは誰よりも面白がり、慈しむことができます。ニッチな愛が成立する二人です。",
  },
  RMTS: {
    name: "癒やしのゆりかご",
    desc: "あなたは相手の導きにすべてを任せ、絶対的な安心感の中で心身を解放するタイプです。激しさよりも優しく長い触れ合いを好み、相手の存在を呼吸するように全身で受け入れ、享受します。",
    plus: ["脱力すること", "長時間の寄り添い", "リラックスした受容"],
    minus: ["急な刺激", "痛みを伴うアクション", "自分からの積極性"],
    bestName: "華やかなディレクター", bestCode: "DMVS",
    why: "DMVSの洗練されたリードは、あなたを最も心地よい夢心地へと誘います。互いのペースが美しく調和する組み合わせです。",
  },
  RMTA: {
    name: "たゆたう旅人",
    desc: "あなたは相手の繊細なこだわりやニッチな好みに静かに同調するタイプです。自分の知らない感覚の扉を相手に開けてもらうことを待ち望んでおり、波に揺られるように自分の感性を相手へ委ねます。",
    plus: ["繊細な感覚への同調", "受動的な変化", "静かな没入"],
    minus: ["押し付けがましい熱量", "単純すぎる刺激", "孤独感"],
    bestName: "幻想のストーリーテラー", bestCode: "DMVA",
    why: "DMVAの創る繊細な物語に、あなたは美しく同調できます。言葉のいらない、精神的な旅を楽しめるペアです。",
  },
};

// ─── 装飾コンポーネント ────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[oklch(0.75_0.095_75/40%)]" />
      <span className="text-[oklch(0.75_0.095_75/60%)] text-xs">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[oklch(0.75_0.095_75/40%)]" />
    </div>
  );
}

function OrnamentCorners({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative ${className}`} style={style}>
      <span className="absolute top-2 left-2 text-[oklch(0.75_0.095_75/35%)] text-[10px] leading-none">✦</span>
      <span className="absolute top-2 right-2 text-[oklch(0.75_0.095_75/35%)] text-[10px] leading-none">✦</span>
      <span className="absolute bottom-2 left-2 text-[oklch(0.75_0.095_75/35%)] text-[10px] leading-none">✦</span>
      <span className="absolute bottom-2 right-2 text-[oklch(0.75_0.095_75/35%)] text-[10px] leading-none">✦</span>
      {children}
    </div>
  );
}

// ─── スタート画面 ──────────────────────────────────────────────────────────────
function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center fade-in-up relative" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {/* 背景装飾 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, oklch(0.75 0.095 75) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.095 75 / 30%) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-xs w-full relative z-10">
        {/* ロゴ */}
        <div className="mb-10">
          <p className="font-label text-[10px] tracking-[0.4em] text-[oklch(0.75_0.095_75/70%)] mb-4 uppercase">
            — Sensory Design —
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight mb-2"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.095 75), oklch(0.85 0.095 75), oklch(0.65 0.095 75))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}>
            LOVE<br />BLUEPRINT
          </h1>
          <GoldDivider />
          <p className="text-[oklch(0.93_0.020_80/60%)] text-sm leading-relaxed font-body-serif italic">
            あなたの深層に眠る<br />「感性の設計図」を解き明かす。
          </p>
        </div>

        {/* 開始ボタン */}
        <OrnamentCorners className="p-1">
          <button
            onClick={onStart}
            className="w-full py-5 font-label text-sm tracking-[0.3em] uppercase transition-all duration-300 active:scale-95"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.095 75), oklch(0.78 0.095 75), oklch(0.65 0.095 75))",
              color: "oklch(0.10 0.015 20)",
              border: "1px solid oklch(0.75 0.095 75 / 50%)",
              borderRadius: "0.25rem",
              boxShadow: "0 0 30px oklch(0.75 0.095 75 / 20%), inset 0 1px 0 oklch(0.85 0.095 75 / 30%)",
            }}>
            診断を始める
          </button>
        </OrnamentCorners>

        <p className="mt-8 font-label text-[9px] tracking-[0.3em] text-[oklch(0.75_0.095_75/30%)] uppercase">
          Love Blueprint Analysis v1.0
        </p>
      </div>
    </div>
  );
}

// ─── 質問画面 ──────────────────────────────────────────────────────────────────
const answerOptions = [
  { label: "非常にそう思う", value: 2 },
  { label: "そう思う", value: 1 },
  { label: "どちらでもない", value: 0 },
  { label: "あまり思わない", value: -1 },
  { label: "全く思わない", value: -2 },
];

function QuizScreen({
  question,
  currentIdx,
  total,
  onAnswer,
}: {
  question: (typeof masterQuestions)[0];
  currentIdx: number;
  total: number;
  onAnswer: (val: number) => void;
}) {
  const progress = ((currentIdx + 1) / total) * 100;

  return (
    <div className="fade-in-up" style={{ width: "100%", height: "100dvh", display: "flex", flexDirection: "column", padding: "16px 20px 20px", boxSizing: "border-box" }} key={currentIdx}>
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-label text-[9px] tracking-[0.3em] text-[oklch(0.75_0.095_75/50%)] uppercase">
          Phase {currentIdx + 1} / {total}
        </span>
        <div className="w-28 h-[2px] rounded-full overflow-hidden"
          style={{ background: "oklch(0.75 0.095 75 / 15%)" }}>
          <div
            className="h-full transition-all duration-500 progress-gold"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問エリア */}
      <div style={{ paddingTop: "8px", marginBottom: "12px" }}>
        <p className="font-label text-[9px] tracking-[0.3em] text-[oklch(0.75_0.095_75/50%)] uppercase mb-3">
          — Question —
        </p>
        <h2 className="font-display text-lg font-bold leading-snug text-[oklch(0.93_0.020_80)]">
          {question.text}
        </h2>
      </div>

      {/* 回答ボタンエリア: flex-1で残り全体を埋める */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
        <GoldDivider />
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "8px" }}>
          {answerOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onAnswer(opt.value)}
              className="w-full px-5 text-left font-serif text-sm transition-all duration-200 active:scale-[0.98]"
              style={{
                flex: "1",
                background: "oklch(0.14 0.018 20 / 80%)",
                border: "1px solid oklch(0.75 0.095 75 / 15%)",
                borderRadius: "0.375rem",
                color: "oklch(0.85 0.020 80 / 80%)",
                minHeight: "44px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.75 0.095 75 / 50%)";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.93 0.020 80)";
                (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.18 0.025 20)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.75 0.095 75 / 15%)";
                (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.85 0.020 80 / 80%)";
                (e.currentTarget as HTMLButtonElement).style.background = "oklch(0.14 0.018 20 / 80%)";
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 結果画面 ──────────────────────────────────────────────────────────────────
function ResultScreen({
  typeCode,
  result,
  onRestart,
}: {
  typeCode: string;
  result: TypeInfo;
  onRestart: () => void;
}) {
  const imgSrc = typeImages[typeCode];
  const partnerImgSrc = typeImages[result.bestCode];

  return (
    <div className="flex flex-col items-center p-6 fade-in-up" style={{ width: "100%", height: "100%", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
      <div className="w-full py-10">

        {/* タイプコード */}
        <div className="text-center mb-8">
          <p className="font-label text-[9px] tracking-[0.5em] text-[oklch(0.75_0.095_75/60%)] uppercase mb-3">
            Core Blueprint
          </p>
          <div className="inline-block px-4 py-1 mb-4"
            style={{
              border: "1px solid oklch(0.75 0.095 75 / 40%)",
              borderRadius: "0.25rem",
            }}>
            <span className="font-label text-lg tracking-[0.4em] text-[oklch(0.75_0.095_75)]">
              {typeCode}
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[oklch(0.93_0.020_80)] gold-glow">
            {result.name}
          </h1>
        </div>

        {/* キャラクター画像（イラスト＋名前テキストが完全に入るように表示） */}
        <div className="mb-8 relative"
          style={{
            background: "oklch(0.12 0.018 20)",
            border: "1px solid oklch(0.75 0.095 75 / 35%)",
            borderRadius: "0.75rem",
            padding: "10px",
            boxShadow: "0 0 40px oklch(0.75 0.095 75 / 12%), 0 8px 32px rgba(0,0,0,0.6)",
          }}>
          {/* 角装飾 */}
          <span className="absolute top-2 left-2 text-[oklch(0.75_0.095_75/40%)] text-[10px] leading-none z-10">✦</span>
          <span className="absolute top-2 right-2 text-[oklch(0.75_0.095_75/40%)] text-[10px] leading-none z-10">✦</span>
          <span className="absolute bottom-2 left-2 text-[oklch(0.75_0.095_75/40%)] text-[10px] leading-none z-10">✦</span>
          <span className="absolute bottom-2 right-2 text-[oklch(0.75_0.095_75/40%)] text-[10px] leading-none z-10">✦</span>
          {/* 画像：object-containで全体を切れずに表示 */}
          <img
            src={imgSrc}
            alt={result.name}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: "0.5rem",
              objectFit: "contain",
            }}
          />
        </div>

        {/* プロファイル */}
        <div className="mb-6 p-6 relative"
          style={{
            background: "oklch(0.14 0.018 20 / 90%)",
            border: "1px solid oklch(0.75 0.095 75 / 20%)",
            borderRadius: "0.5rem",
          }}>
          <p className="font-label text-[9px] tracking-[0.3em] text-[oklch(0.75_0.095_75/60%)] uppercase mb-4">
            — Your Profile —
          </p>
          <p className="font-body-serif italic text-sm leading-relaxed text-[oklch(0.85_0.020_80/90%)]">
            {result.desc}
          </p>
        </div>

        {/* 得意・苦手 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-5"
            style={{
              background: "oklch(0.14 0.018 20 / 80%)",
              border: "1px solid oklch(0.75 0.095 75 / 20%)",
              borderRadius: "0.5rem",
            }}>
            <p className="font-label text-[9px] tracking-[0.2em] text-[oklch(0.75_0.095_75/70%)] uppercase mb-3">
              得意な形
            </p>
            <ul className="space-y-2">
              {result.plus.map((p) => (
                <li key={p} className="text-[11px] text-[oklch(0.80_0.020_80/80%)] flex items-start gap-1">
                  <span className="text-[oklch(0.75_0.095_75/60%)] mt-0.5">✦</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5"
            style={{
              background: "oklch(0.14 0.018 20 / 80%)",
              border: "1px solid oklch(0.75 0.095 75 / 20%)",
              borderRadius: "0.5rem",
            }}>
            <p className="font-label text-[9px] tracking-[0.2em] text-[oklch(0.60_0.060_20/80%)] uppercase mb-3">
              苦手な形
            </p>
            <ul className="space-y-2">
              {result.minus.map((m) => (
                <li key={m} className="text-[11px] text-[oklch(0.80_0.020_80/80%)] flex items-start gap-1">
                  <span className="text-[oklch(0.60_0.060_20/60%)] mt-0.5">✦</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ベストパートナー */}
        <div className="mb-10 p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, oklch(0.18 0.025 20), oklch(0.14 0.018 20))",
            border: "1px solid oklch(0.75 0.095 75 / 35%)",
            borderRadius: "0.75rem",
            boxShadow: "0 0 40px oklch(0.75 0.095 75 / 10%)",
          }}>
          {/* 背景グロー */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, oklch(0.75 0.095 75) 0%, transparent 70%)" }} />

          <p className="font-label text-[9px] tracking-[0.3em] text-[oklch(0.75_0.095_75/60%)] uppercase mb-5">
            — Best Partner —
          </p>

          {/* パートナー画像：タイトル直下に画像、その下に名前 */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-full overflow-hidden mb-3"
              style={{
                border: "1px solid oklch(0.75 0.095 75 / 40%)",
                borderRadius: "0.5rem",
                maxWidth: "280px",
              }}>
              <img
                src={partnerImgSrc}
                alt={result.bestName}
                style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
            <p className="font-display text-xl font-bold text-[oklch(0.93_0.020_80)] leading-tight text-center">
              {result.bestName}
            </p>
            <p className="font-label text-[10px] tracking-[0.3em] text-[oklch(0.75_0.095_75/70%)] mt-1 text-center">
              {result.bestCode}
            </p>
          </div>

          <GoldDivider />

          <p className="font-body-serif italic text-sm leading-relaxed text-[oklch(0.85_0.020_80/85%)]">
            {result.why}
          </p>
        </div>

        {/* リスタートボタン */}
        <div className="space-y-4 px-2">
          <button
            onClick={onRestart}
            className="w-full py-4 font-label text-sm tracking-[0.3em] uppercase transition-all duration-300 active:scale-95"
            style={{
              background: "transparent",
              border: "1px solid oklch(0.75 0.095 75 / 50%)",
              borderRadius: "0.25rem",
              color: "oklch(0.75 0.095 75)",
            }}>
            もう一度診断する
          </button>
          <p className="text-center font-label text-[9px] tracking-[0.3em] text-[oklch(0.75_0.095_75/25%)] uppercase">
            Love Blueprint Analysis v1.0
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── メインアプリ ──────────────────────────────────────────────────────────────
type Step = "start" | "quiz" | "result";

// ─── PC対応：中央コンパクトラッパー ──────────────────────────────────────────
function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      height: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "oklch(0.08 0.012 20)",
      overflow: "hidden",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = useState<Step>("start");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState<typeof masterQuestions>([]);
  const [scores, setScores] = useState({ D: 0, I: 0, V: 0, S: 0 });
  const [typeCode, setTypeCode] = useState("");

  const startQuiz = () => {
    const shuffled = [...masterQuestions].sort(() => Math.random() - 0.5);
    setRandomQuestions(shuffled);
    setScores({ D: 0, I: 0, V: 0, S: 0 });
    setCurrentIdx(0);
    setStep("quiz");
    window.scrollTo(0, 0);
  };

  const handleAnswer = (val: number) => {
    const q = randomQuestions[currentIdx];
    const multiplier = q.reverse ? -1 : 1;
    const newScores = { ...scores, [q.axis]: scores[q.axis as keyof typeof scores] + val * multiplier };
    setScores(newScores);

    if (currentIdx < randomQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      window.scrollTo(0, 0);
    } else {
      // 結果算出
      const d = newScores.D > 0 ? "D" : "R";
      const i = newScores.I > 0 ? "I" : "M";
      const v = newScores.V > 0 ? "V" : "T";
      const s = newScores.S > 0 ? "S" : "A";
      setTypeCode(d + i + v + s);
      setStep("result");
      window.scrollTo(0, 0);
    }
  };

  const handleRestart = () => {
    setStep("start");
    window.scrollTo(0, 0);
  };

  if (step === "start") {
    return <AppShell><StartScreen onStart={startQuiz} /></AppShell>;
  }

  if (step === "quiz") {
    return (
      <AppShell>
        <QuizScreen
          question={randomQuestions[currentIdx]}
          currentIdx={currentIdx}
          total={randomQuestions.length}
          onAnswer={handleAnswer}
        />
      </AppShell>
    );
  }

  const result = typeData[typeCode];
  return (
    <AppShell>
      <ResultScreen
        typeCode={typeCode}
        result={result}
        onRestart={handleRestart}
      />
    </AppShell>
  );
}
