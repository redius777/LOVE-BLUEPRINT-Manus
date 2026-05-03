/**
 * LOVE BLUEPRINT — TypeLibrary Page
 * Design: Dark Academia Romance
 * 16タイプ一覧 → タップで詳細モーダル（説明・得意苦手・相性TOP3）
 */

import { useState } from "react";
import { Link } from "wouter";

// ─── 型定義 ────────────────────────────────────────────────────────────────────
interface TypeInfo {
  name: string;
  desc: string;
  plus: string[];
  minus: string[];
  bestName: string;
  bestCode: string;
  why: string;
}

// ─── タイプ別画像URL ────────────────────────────────────────────────────────────
const typeImages: Record<string, string> = {
  DIVS: "/manus-storage/DIVS_3f10a61e.png",
  DIVA: "/manus-storage/DIVA_6b831b04.png",
  DITS: "/manus-storage/DITS_3445d03a.png",
  DITA: "/manus-storage/DITA_f1114239.png",
  DMVS: "/manus-storage/DMVS_bb1405e0.png",
  DMVA: "/manus-storage/DMVA_60bd2494.png",
  DMTS: "/manus-storage/DMTS_c3fbecd6.png",
  DMTA: "/manus-storage/DMTA_6ebc4334.png",
  RIVS: "/manus-storage/RIVS_90c26005.png",
  RIVA: "/manus-storage/RIVA_cecd653b.png",
  RITS: "/manus-storage/RITS_d366b353.png",
  RITA: "/manus-storage/RITA_ba45cc26.png",
  RMVS: "/manus-storage/RMVS_b6892e41.png",
  RMVA: "/manus-storage/RMVA_4b36ba5d.png",
  RMTS: "/manus-storage/RMTS_bf1063c0.png",
  RMTA: "/manus-storage/RMTA_b47c43ab.png",
};

// ─── 16タイプデータ ────────────────────────────────────────────────────────────
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

// ─── 相性スコアマップ（bestCode = 100点、軸の一致数で残り2位・3位を算出） ────
function getCompatibilityTop3(myCode: string): { code: string; score: number; rank: number }[] {
  const best = typeData[myCode]?.bestCode;
  if (!best) return [];

  // 軸ごとの一致度でスコアを算出（bestCodeは除外）
  const scores = Object.keys(typeData)
    .filter((code) => code !== myCode && code !== best)
    .map((code) => {
      let match = 0;
      for (let i = 0; i < 4; i++) {
        if (myCode[i] === code[i]) match++;
      }
      return { code, score: match * 20 };
    })
    .sort((a, b) => b.score - a.score);

  return [
    { code: best, score: 100, rank: 1 },
    { code: scores[0]?.code ?? "", score: scores[0]?.score ?? 0, rank: 2 },
    { code: scores[1]?.code ?? "", score: scores[1]?.score ?? 0, rank: 3 },
  ].filter((x) => x.code);
}

// ─── タイプコードのカテゴリラベル ──────────────────────────────────────────────
function getAxisLabel(code: string) {
  const d = code[0] === "D" ? "主導型" : "受容型";
  const i = code[1] === "I" ? "激しさ" : "穏やか";
  const v = code[2] === "V" ? "視覚" : "感覚";
  const s = code[3] === "S" ? "定番" : "冒険";
  return `${d} / ${i} / ${v} / ${s}`;
}

// ─── メインコンポーネント ──────────────────────────────────────────────────────
export default function TypeLibrary() {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "D" | "R">("all");

  const allCodes = Object.keys(typeData);
  const filtered = filter === "all" ? allCodes : allCodes.filter((c) => c[0] === filter);

  const selectedData = selected ? typeData[selected] : null;
  const top3 = selected ? getCompatibilityTop3(selected) : [];

  // スタイル定数
  const gold = "rgba(201,168,76,1)";
  const goldFaint = "rgba(201,168,76,0.35)";
  const goldMid = "rgba(201,168,76,0.60)";
  const bg = "#0D0A0B";
  const cardBg = "rgba(20,16,14,0.95)";
  const textMain = "#F5ECD7";
  const textSub = "rgba(245,236,215,0.70)";

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: `linear-gradient(160deg, ${bg} 0%, #1a1208 50%, ${bg} 100%)`,
        color: textMain,
        fontFamily: "'Noto Serif JP', serif",
        overflowX: "hidden",
      }}
    >
      {/* ドットグリッド背景 */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.03, pointerEvents: "none", zIndex: 0,
        backgroundImage: `radial-gradient(circle, ${gold} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto", padding: "0 16px 80px" }}>

        {/* ヘッダー */}
        <div style={{ textAlign: "center", padding: "40px 0 24px" }}>
          <p style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "10px",
            letterSpacing: "0.5em",
            color: goldMid,
            textTransform: "uppercase",
            marginBottom: "12px",
          }}>— Love Blueprint —</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            fontWeight: 700,
            color: gold,
            margin: "0 0 8px",
            textShadow: `0 0 30px ${goldFaint}`,
          }}>全タイプ図鑑</h1>
          <p style={{ fontSize: "12px", color: textSub, margin: 0 }}>
            16種類の感性の設計図を探索する
          </p>
        </div>

        {/* 区切り線 */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${goldFaint})` }} />
          <span style={{ color: goldMid, fontSize: "12px" }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${goldFaint})` }} />
        </div>

        {/* フィルタータブ */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {(["all", "D", "R"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flex: 1,
                padding: "10px 0",
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                border: `1px solid ${filter === f ? gold : goldFaint}`,
                borderRadius: "4px",
                background: filter === f ? `rgba(201,168,76,0.12)` : "transparent",
                color: filter === f ? gold : textSub,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {f === "all" ? "全タイプ" : f === "D" ? "主導型 (D)" : "受容型 (R)"}
            </button>
          ))}
        </div>

        {/* タイプグリッド */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          marginBottom: "32px",
        }}>
          {filtered.map((code) => (
            <button
              key={code}
              onClick={() => setSelected(code)}
              style={{
                background: cardBg,
                border: `1px solid ${selected === code ? gold : goldFaint}`,
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: selected === code
                  ? `0 0 20px rgba(201,168,76,0.20), 0 4px 16px rgba(0,0,0,0.5)`
                  : `0 2px 8px rgba(0,0,0,0.4)`,
              }}
            >
              <img
                src={typeImages[code]}
                alt={typeData[code].name}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </button>
          ))}
        </div>

        {/* 戻るボタン */}
        <div style={{ textAlign: "center" }}>
          <Link href="/">
            <button style={{
              padding: "14px 40px",
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              border: `1px solid ${goldFaint}`,
              borderRadius: "4px",
              background: "transparent",
              color: goldMid,
              cursor: "pointer",
            }}>
              ← 診断に戻る
            </button>
          </Link>
        </div>
      </div>

      {/* ─── 詳細モーダル ─────────────────────────────────────────────────────── */}
      {selected && selectedData && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
            overflowY: "auto",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div
            style={{
              width: "100%", maxWidth: "600px",
              background: `linear-gradient(180deg, #1a1208 0%, ${bg} 100%)`,
              border: `1px solid ${goldFaint}`,
              borderRadius: "16px 16px 0 0",
              padding: "0 0 48px",
              maxHeight: "92dvh",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* カード画像 */}
            <div style={{ position: "relative" }}>
              <img
                src={typeImages[selected]}
                alt={selectedData.name}
                style={{ display: "block", width: "100%", height: "auto", borderRadius: "16px 16px 0 0" }}
              />
              {/* 閉じるボタン */}
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute", top: "12px", right: "12px",
                  width: "36px", height: "36px",
                  background: "rgba(0,0,0,0.65)",
                  border: `1px solid ${goldFaint}`,
                  borderRadius: "50%",
                  color: gold,
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "sans-serif",
                }}
              >✕</button>
            </div>

            <div style={{ padding: "24px 20px 0" }}>
              {/* タイプコード＋名前 */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "11px",
                  letterSpacing: "0.4em",
                  color: goldMid,
                  margin: "0 0 6px",
                }}>{selected}</p>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: textMain,
                  margin: "0 0 4px",
                  textShadow: `0 0 20px ${goldFaint}`,
                }}>{selectedData.name}</h2>
                <p style={{
                  fontSize: "10px",
                  color: textSub,
                  fontFamily: "'Cinzel Decorative', serif",
                  letterSpacing: "0.2em",
                }}>{getAxisLabel(selected)}</p>
              </div>

              {/* 区切り */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${goldFaint})` }} />
                <span style={{ color: goldMid, fontSize: "10px" }}>✦</span>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${goldFaint})` }} />
              </div>

              {/* 説明文 */}
              <div style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${goldFaint}`,
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
              }}>
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "9px",
                  letterSpacing: "0.3em",
                  color: goldMid,
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}>— Profile —</p>
                <p style={{ fontSize: "13px", lineHeight: 1.8, color: textSub, margin: 0 }}>
                  {selectedData.desc}
                </p>
              </div>

              {/* 得意・苦手 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${goldFaint}`,
                  borderRadius: "8px",
                  padding: "14px",
                }}>
                  <p style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: goldMid,
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}>得意な形</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {selectedData.plus.map((p) => (
                      <li key={p} style={{ fontSize: "11px", color: textSub, marginBottom: "6px", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                        <span style={{ color: goldMid, flexShrink: 0 }}>✦</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(180,80,80,0.30)`,
                  borderRadius: "8px",
                  padding: "14px",
                }}>
                  <p style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    color: "rgba(200,100,100,0.70)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}>苦手な形</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {selectedData.minus.map((m) => (
                      <li key={m} style={{ fontSize: "11px", color: textSub, marginBottom: "6px", display: "flex", gap: "6px", alignItems: "flex-start" }}>
                        <span style={{ color: "rgba(200,100,100,0.60)", flexShrink: 0 }}>✦</span>{m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 相性TOP3 */}
              <div style={{ marginBottom: "8px" }}>
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  color: goldMid,
                  textTransform: "uppercase",
                  marginBottom: "14px",
                  textAlign: "center",
                }}>— 相性ランキング TOP 3 —</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {top3.map(({ code, rank }) => {
                    const partner = typeData[code];
                    if (!partner) return null;
                    const rankColors = ["#C9A84C", "#A0A0A0", "#CD7F32"];
                    const rankLabels = ["Best Match", "2nd Match", "3rd Match"];
                    return (
                      <div
                        key={code}
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${rank === 1 ? goldFaint : "rgba(255,255,255,0.08)"}`,
                          borderRadius: "10px",
                          padding: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelected(code)}
                      >
                        {/* ランク番号 */}
                        <div style={{
                          width: "32px", height: "32px", flexShrink: 0,
                          border: `1px solid ${rankColors[rank - 1]}`,
                          borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'Cinzel Decorative', serif",
                          fontSize: "11px",
                          color: rankColors[rank - 1],
                        }}>{rank}</div>

                        {/* パートナー画像 */}
                        <div style={{
                          width: "64px", flexShrink: 0,
                          border: `1px solid ${rank === 1 ? goldFaint : "rgba(255,255,255,0.10)"}`,
                          borderRadius: "6px",
                          overflow: "hidden",
                        }}>
                          <img
                            src={typeImages[code]}
                            alt={partner.name}
                            style={{ display: "block", width: "100%", height: "auto" }}
                          />
                        </div>

                        {/* テキスト */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontFamily: "'Cinzel Decorative', serif",
                            fontSize: "8px",
                            letterSpacing: "0.25em",
                            color: rankColors[rank - 1],
                            margin: "0 0 3px",
                            textTransform: "uppercase",
                          }}>{rankLabels[rank - 1]}</p>
                          <p style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: textMain,
                            margin: "0 0 2px",
                            fontFamily: "'Playfair Display', serif",
                          }}>{partner.name}</p>
                          <p style={{
                            fontFamily: "'Cinzel Decorative', serif",
                            fontSize: "9px",
                            letterSpacing: "0.2em",
                            color: textSub,
                            margin: 0,
                          }}>{code}</p>
                        </div>

                        {/* 矢印 */}
                        <span style={{ color: goldFaint, fontSize: "14px", flexShrink: 0 }}>›</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best Partnerのコメント */}
              {top3[0] && (
                <div style={{
                  marginTop: "16px",
                  background: `linear-gradient(135deg, rgba(201,168,76,0.06), rgba(201,168,76,0.02))`,
                  border: `1px solid ${goldFaint}`,
                  borderRadius: "8px",
                  padding: "16px",
                }}>
                  <p style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "9px",
                    letterSpacing: "0.3em",
                    color: goldMid,
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}>— Why They Match —</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.8, color: textSub, margin: 0, fontStyle: "italic" }}>
                    {selectedData.why}
                  </p>
                </div>
              )}

              {/* 一覧に戻るボタン */}
              <div style={{ marginTop: "28px", paddingBottom: "8px" }}>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    width: "100%",
                    padding: "16px 0",
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    border: `1px solid ${goldFaint}`,
                    borderRadius: "6px",
                    background: "rgba(201,168,76,0.08)",
                    color: gold,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.16)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.65)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.35)";
                  }}
                >
                  <span style={{ fontSize: "14px", lineHeight: 1 }}>‹‹</span>
                  一覧に戻る
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
