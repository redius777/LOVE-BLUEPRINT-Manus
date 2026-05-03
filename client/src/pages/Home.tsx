/**
 * LOVE BLUEPRINT — Home Page
 * Design: Dark Academia Romance
 * - 深みのある暗色背景 (#0D0A0B) に古金色 (#C9A84C) の装飾
 * - Playfair Display (見出し) + Noto Serif JP (本文) + Cinzel Decorative (ラベル)
 * - 羊皮紙テクスチャ・魔法陣モチーフ・金色装飾ライン
 */

import { useState } from "react";
import { Link } from "wouter";
import { ShareButton } from "@/components/ShareCard";
import { typeImages, typeData, TypeInfo } from "@/data/types";
import { masterQuestions, calcTypeCode } from "@/data/questions";
import { LINE_OFFICIAL_URL } from "@/config/links";

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
    <div className="flex flex-col items-center justify-center p-8 text-center fade-in-up relative" style={{ width: "100%", height: "100%", overflowX: "hidden" }}>
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
    <div className="flex flex-col items-center p-6 fade-in-up" style={{ width: "100%" }}>
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

        {/* シェア & リスタートボタン */}
        <div className="space-y-4 px-2">
          {/* シェア画像生成ボタン */}
          <ShareButton
            typeCode={typeCode}
            typeName={result.name}
            imgSrc={imgSrc}
            bestCode={result.bestCode}
            bestName={result.bestName}
            partnerImgSrc={partnerImgSrc}
          />
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
          {/* 全タイプ図鑑ボタン */}
          <Link href="/library">
            <button
              className="w-full py-4 font-label text-sm tracking-[0.3em] uppercase transition-all duration-300 active:scale-95"
              style={{
                background: "linear-gradient(135deg, oklch(0.18 0.025 20), oklch(0.14 0.018 20))",
                border: "1px solid oklch(0.75 0.095 75 / 40%)",
                borderRadius: "0.25rem",
                color: "oklch(0.75 0.095 75)",
              }}>
              ✨ 全タイプ図鑑を見る
            </button>
          </Link>

          {/* 公式LINE誘導ボタン */}
          <a
            href={LINE_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", textDecoration: "none" }}
          >
            <button
              className="w-full font-label tracking-[0.15em] transition-all duration-300 active:scale-95"
              style={{
                padding: "0",
                border: "none",
                borderRadius: "0.375rem",
                background: "transparent",
                cursor: "pointer",
                width: "100%",
              }}
            >
              {/* 光る枠付きカードデザイン */}
              <div
                style={{
                  position: "relative",
                  padding: "20px 24px",
                  borderRadius: "0.375rem",
                  background: "linear-gradient(135deg, rgba(6,199,85,0.12) 0%, rgba(6,199,85,0.06) 50%, rgba(6,199,85,0.10) 100%)",
                  border: "1px solid rgba(6,199,85,0.45)",
                  overflow: "hidden",
                }}
              >
                {/* 光泊効果 */}
                <div style={{
                  position: "absolute",
                  top: "-30px", left: "-30px",
                  width: "120px", height: "120px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(6,199,85,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute",
                  bottom: "-20px", right: "-20px",
                  width: "80px", height: "80px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(6,199,85,0.10) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* ラベル */}
                <p style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "8px",
                  letterSpacing: "0.4em",
                  color: "rgba(6,199,85,0.70)",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                  textAlign: "center",
                }}>— Official LINE —</p>

                {/* メインテキスト */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  {/* LINEアイコン */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.03 2 11c0 3.07 1.64 5.78 4.17 7.5-.18.64-.65 2.3-.75 2.66-.12.44.16.44.34.32.14-.09 1.85-1.22 2.6-1.72.5.07 1.01.1 1.54.1 5.52 0 10-4.03 10-9S17.52 2 12 2z" fill="rgba(6,199,85,0.90)"/>
                  </svg>
                  <span style={{
                    fontFamily: "'Noto Serif JP', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "rgba(230,255,235,0.95)",
                    letterSpacing: "0.05em",
                  }}>この診断の本当の意味を知る</span>
                </div>

                {/* サブテキスト */}
                <p style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontSize: "11px",
                  color: "rgba(180,240,195,0.65)",
                  margin: "10px 0 0",
                  textAlign: "center",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}>診断結果の裏側にある、本当のあなたへ</p>
              </div>
            </button>
          </a>

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
function AppShell({ children, scrollable = false }: { children: React.ReactNode; scrollable?: boolean }) {
  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "oklch(0.08 0.012 20)",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "480px",
        minHeight: scrollable ? "auto" : "100dvh",
        height: scrollable ? "auto" : "100dvh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: scrollable ? "auto" : "hidden",
        WebkitOverflowScrolling: "touch",
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
      // 結果算出（data/questions.ts の calcTypeCode を使用）
      setTypeCode(calcTypeCode(newScores));
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
    <AppShell scrollable>
      <ResultScreen
        typeCode={typeCode}
        result={result}
        onRestart={handleRestart}
      />
    </AppShell>
  );
}
