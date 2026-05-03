/**
 * compatibility.ts — 相性診断データ
 *
 * 相性スコアの算出ロジック:
 *   1. bestCode が一致する場合 → rank 1 (Best Match)
 *   2. 軸の一致数が多い順に rank 2, rank 3 を決定
 *
 * 将来的に 16×16 の相性画像を用意する場合:
 *   - public/assets/compatibility/{CODE1}_{CODE2}.webp に配置
 *   - getCompatibilityImagePath() でパスを取得
 *
 * 注意: 相性画像は該当する1枚だけを動的に読み込む設計のため、
 *       初回ロード時に256枚全部を読み込むことはありません。
 */

import { typeData } from "./types";

export interface CompatibilityEntry {
  code: string;
  rank: 1 | 2 | 3;
}

/**
 * 指定タイプコードの相性TOP3を返す
 * @param code 自分のタイプコード (例: "DIVS")
 */
export function getCompatibilityTop3(code: string): CompatibilityEntry[] {
  const myData = typeData[code];
  if (!myData) return [];

  const allCodes = Object.keys(typeData).filter((c) => c !== code);

  // 軸一致数を計算
  const scored = allCodes.map((c) => {
    const matchCount = c.split("").filter((ch, i) => ch === code[i]).length;
    const isBest = c === myData.bestCode;
    return { code: c, matchCount, isBest };
  });

  // Best Match を1位に固定、残りは軸一致数降順
  const best = scored.find((s) => s.isBest);
  const rest = scored
    .filter((s) => !s.isBest)
    .sort((a, b) => b.matchCount - a.matchCount);

  const top3: CompatibilityEntry[] = [];
  if (best) top3.push({ code: best.code, rank: 1 });
  if (rest[0]) top3.push({ code: rest[0].code, rank: 2 });
  if (rest[1]) top3.push({ code: rest[1].code, rank: 3 });

  return top3;
}

/**
 * 相性画像のパスを返す（画像が存在する場合のみ使用）
 * 画像は public/assets/compatibility/{CODE1}_{CODE2}.webp に配置してください
 *
 * @param myCode    自分のタイプコード
 * @param partnerCode パートナーのタイプコード
 */
export function getCompatibilityImagePath(myCode: string, partnerCode: string): string {
  // コードをアルファベット順に並べて一意のファイル名を生成
  const [a, b] = [myCode, partnerCode].sort();
  return `/assets/compatibility/${a}_${b}.webp`;
}
