/**
 * LOVE BLUEPRINT — ShareCard Component
 * Design: Dark Academia Romance
 * シェア用画像を Canvas に描画して PNG として保存・SNS シェアする
 */

import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { SITE_URL, buildShareText } from "@/config/links";

interface ShareCardProps {
  typeCode: string;
  typeName: string;
  imgSrc: string;
  bestCode: string;
  bestName: string;
  partnerImgSrc: string;
  siteUrl?: string;
}

// ─── シェアカード本体（非表示でDOMに保持してキャプチャ） ────────────────────
export function ShareCardCanvas({
  typeCode,
  typeName,
  imgSrc,
  bestCode,
  bestName,
  partnerImgSrc,
}: ShareCardProps) {
  return (
    <div
      style={{
        width: "1080px",
        height: "1080px",
        background: "linear-gradient(160deg, #0D0A0B 0%, #1a1208 50%, #0D0A0B 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "'Noto Serif JP', serif",
        overflow: "hidden",
      }}
    >
      {/* ドットグリッド背景 */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* 外枠装飾 */}
      <div style={{
        position: "absolute", inset: "24px",
        border: "1px solid rgba(201,168,76,0.30)",
        borderRadius: "4px",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: "30px",
        border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: "2px",
        pointerEvents: "none",
      }} />

      {/* 四隅の装飾 ✦ */}
      {[
        { top: "36px", left: "36px" },
        { top: "36px", right: "36px" },
        { bottom: "36px", left: "36px" },
        { bottom: "36px", right: "36px" },
      ].map((pos, i) => (
        <span key={i} style={{
          position: "absolute", ...pos,
          color: "rgba(201,168,76,0.55)",
          fontSize: "18px",
          lineHeight: 1,
        }}>✦</span>
      ))}

      {/* ヘッダーラベル */}
      <p style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "13px",
        letterSpacing: "0.45em",
        color: "rgba(201,168,76,0.65)",
        textTransform: "uppercase",
        marginBottom: "20px",
        marginTop: "0",
      }}>
        — Love Blueprint Analysis —
      </p>

      {/* 2枚のカード横並び */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "40px",
        marginBottom: "36px",
      }}>
        {/* 自分のカード */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <p style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "11px",
            letterSpacing: "0.35em",
            color: "rgba(201,168,76,0.55)",
            textTransform: "uppercase",
            margin: 0,
          }}>My Type</p>
          <div style={{
            width: "360px",
            border: "1.5px solid rgba(201,168,76,0.45)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.7)",
          }}>
            <img
              src={imgSrc}
              alt={typeName}
              crossOrigin="anonymous"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* 中央ハート */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{ fontSize: "48px", lineHeight: 1 }}>❤</span>
          <div style={{ width: "1px", height: "40px", background: "rgba(201,168,76,0.30)" }} />
          <span style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "rgba(201,168,76,0.50)",
          }}>×</span>
          <div style={{ width: "1px", height: "40px", background: "rgba(201,168,76,0.30)" }} />
        </div>

        {/* ベストパートナーのカード */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
          <p style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "11px",
            letterSpacing: "0.35em",
            color: "rgba(201,168,76,0.55)",
            textTransform: "uppercase",
            margin: 0,
          }}>Best Partner</p>
          <div style={{
            width: "360px",
            border: "1.5px solid rgba(201,168,76,0.45)",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(201,168,76,0.15), 0 8px 32px rgba(0,0,0,0.7)",
          }}>
            <img
              src={partnerImgSrc}
              alt={bestName}
              crossOrigin="anonymous"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* タイプ名 */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "48px",
        marginBottom: "28px",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "13px",
            letterSpacing: "0.4em",
            color: "rgba(201,168,76,0.80)",
            margin: "0 0 6px",
          }}>{typeCode}</p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#F5ECD7",
            margin: 0,
          }}>{typeName}</p>
        </div>

        <span style={{ color: "rgba(201,168,76,0.35)", fontSize: "20px" }}>✦</span>

        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "13px",
            letterSpacing: "0.4em",
            color: "rgba(201,168,76,0.80)",
            margin: "0 0 6px",
          }}>{bestCode}</p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#F5ECD7",
            margin: 0,
          }}>{bestName}</p>
        </div>
      </div>

      {/* 区切り線 */}
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        width: "600px", marginBottom: "28px",
      }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.40))" }} />
        <span style={{ color: "rgba(201,168,76,0.55)", fontSize: "14px" }}>✦</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(201,168,76,0.40))" }} />
      </div>

      {/* フッター */}
      <p style={{
        fontFamily: "'Cinzel Decorative', serif",
        fontSize: "11px",
        letterSpacing: "0.4em",
        color: "rgba(201,168,76,0.30)",
        textTransform: "uppercase",
        margin: 0,
      }}>
        Love Blueprint Analysis v1.0
      </p>
    </div>
  );
}

// ─── シェアボタン UI ────────────────────────────────────────────────────────────
export function ShareButton(props: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const generateImage = useCallback(async () => {
    if (!cardRef.current) return null;
    setGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 1,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#0D0A0B",
        logging: false,
        width: 1080,
        height: 1080,
        windowWidth: 1080,
        windowHeight: 1080,
      });
      const url = canvas.toDataURL("image/png");
      setImageUrl(url);
      return url;
    } catch (e) {
      console.error("Share image generation failed:", e);
      return null;
    } finally {
      setGenerating(false);
    }
  }, []);

  const handleShare = async () => {
    const url = await generateImage();
    if (url) setShowModal(true);
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `love-blueprint-${props.typeCode}.png`;
    a.click();
  };

  const shareText = `私のLOVE BLUEPRINTは「${props.typeName}（${props.typeCode}）」でした！\nベストパートナーは「${props.bestName}（${props.bestCode}）」✦\n#LOVEBLUEPRINT #感性の設計図`;
  const siteUrl = props.siteUrl || SITE_URL;

  const handleXShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer");
  };

  const handleLineShare = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(lineUrl, "_blank", "noopener,noreferrer");
  };

  const handleInstagramHint = () => {
    handleDownload();
    alert("画像を保存しました。Instagramアプリで投稿してください。");
  };

  return (
    <>
      {/* 非表示のシェアカード（キャプチャ用） */}
      <div
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1080px",
          height: "1080px",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <div ref={cardRef}>
          <ShareCardCanvas {...props} />
        </div>
      </div>

      {/* シェアボタン */}
      <button
        onClick={handleShare}
        disabled={generating}
        style={{
          width: "100%",
          padding: "16px",
          background: "linear-gradient(135deg, #8B6914, #C9A84C, #8B6914)",
          border: "1px solid rgba(201,168,76,0.60)",
          borderRadius: "4px",
          color: "#0D0A0B",
          fontFamily: "'Cinzel Decorative', serif",
          fontSize: "13px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          cursor: generating ? "wait" : "pointer",
          opacity: generating ? 0.7 : 1,
          transition: "opacity 0.2s",
          boxShadow: "0 0 24px rgba(201,168,76,0.20)",
        }}
      >
        {generating ? "生成中..." : "シェア画像を作る"}
      </button>

      {/* モーダル */}
      {showModal && imageUrl && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            overflowY: "auto",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            width: "100%",
            maxWidth: "480px",
            background: "#13100E",
            border: "1px solid rgba(201,168,76,0.30)",
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}>
            {/* プレビュー */}
            <p style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "rgba(201,168,76,0.65)",
              textAlign: "center",
              margin: 0,
              textTransform: "uppercase",
            }}>— Share Image —</p>

            <img
              src={imageUrl}
              alt="share preview"
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            />

            {/* SNSボタン群 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* X (Twitter) */}
              <button
                onClick={handleXShare}
                style={{
                  width: "100%", padding: "14px",
                  background: "#000",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter) でシェア
              </button>

              {/* LINE */}
              <button
                onClick={handleLineShare}
                style={{
                  width: "100%", padding: "14px",
                  background: "#06C755",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINE でシェア
              </button>

              {/* Instagram（画像保存） */}
              <button
                onClick={handleInstagramHint}
                style={{
                  width: "100%", padding: "14px",
                  background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  border: "none",
                  borderRadius: "6px",
                  color: "#fff",
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "12px",
                  letterSpacing: "0.25em",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram 用に保存
              </button>

              {/* 画像をダウンロード */}
              <button
                onClick={handleDownload}
                style={{
                  width: "100%", padding: "12px",
                  background: "transparent",
                  border: "1px solid rgba(201,168,76,0.35)",
                  borderRadius: "6px",
                  color: "rgba(201,168,76,0.80)",
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  cursor: "pointer",
                }}
              >
                画像をダウンロード
              </button>
            </div>

            {/* 閉じるボタン */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: "100%", padding: "12px",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "6px",
                color: "rgba(255,255,255,0.40)",
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                cursor: "pointer",
              }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
