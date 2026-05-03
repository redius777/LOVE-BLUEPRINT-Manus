/**
 * LOVE BLUEPRINT — TypeLibrary Page
 * Design: Dark Academia Romance
 * 16タイプ一覧 → タップで詳細モーダル（説明・得意苦手・相性TOP3）
 */

import { useState } from "react";
import { Link } from "wouter";
import { typeImages, typeData } from "@/data/types";

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
