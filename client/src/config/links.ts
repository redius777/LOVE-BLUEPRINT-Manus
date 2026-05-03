/**
 * links.ts — 外部リンクURL設定
 *
 * ここを変更するだけでアプリ全体のURLが切り替わります。
 * ローカル開発・本番デプロイで共通して使用します。
 */

// ─── 公式LINE ─────────────────────────────────────────────────────────────────
// TODO: 公式LINEのURLが決まったら以下に設定してください
export const LINE_OFFICIAL_URL = "https://lin.ee/XXXXXXX";

// ─── Tally フォーム（ウェイトリスト等） ──────────────────────────────────────
// TODO: Tally フォームのURLが決まったら以下に設定してください
export const TALLY_FORM_URL = "https://tally.so/r/XXXXXXX";

// ─── サイトURL（SNSシェア用OGP・X投稿文で使用） ──────────────────────────────
// TODO: 本番公開URLに変更してください
export const SITE_URL = "https://loveapp-mwrkg5cp.manus.space";

// ─── SNS シェアテキスト生成 ───────────────────────────────────────────────────
export function buildShareText(typeCode: string, typeName: string): string {
  return `私のLOVE BLUEPRINTタイプは「${typeCode}：${typeName}」でした。\nあなたの感性の設計図を解き明かそう。\n${SITE_URL}\n#LOVEBLUEPRINT #恋愛診断`;
}
