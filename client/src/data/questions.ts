/**
 * questions.ts — 診断質問データ
 *
 * axis: スコアを加算する軸 ("D" | "I" | "V" | "S")
 * text: 質問文
 * reverse: true の場合、回答値を反転してスコアに加算する
 *
 * 軸の意味:
 *   D (Dominant / Receptive): 主導型 (D) か 受容型 (R) か
 *   I (Intense / Mild):       激しさ志向 (I) か 穏やか志向 (M) か
 *   V (Visual / Tactile):     視覚優位 (V) か 感覚優位 (T) か
 *   S (Standard / Adventure): 定番志向 (S) か 冒険志向 (A) か
 */

export interface Question {
  axis: "D" | "I" | "V" | "S";
  text: string;
  reverse: boolean;
}

export const masterQuestions: Question[] = [
  // ── D 軸（主導 vs 受容） ──────────────────────────────────────────────────
  { axis: "D", text: "デートや旅行のプランは、自分が主導して決めたい。", reverse: false },
  { axis: "D", text: "二人の空間では、相手を驚かせる仕掛けを自分から用意したい。", reverse: false },
  { axis: "D", text: "指示されるより、自分からリードする方が自然に振る舞える。", reverse: false },
  { axis: "D", text: "相手の反応をコントロールしている時に、深い充足感を感じる。", reverse: false },
  { axis: "D", text: "どちらかといえば、自分が「追いかける側」でありたい。", reverse: true },
  { axis: "D", text: "物語の「主人公」として、その場の空気を引っ張るのが得意だ。", reverse: false },

  // ── I 軸（激しさ vs 穏やか） ──────────────────────────────────────────────
  { axis: "I", text: "穏やかなものより、心拍数が上がるような激しい刺激を好む。", reverse: false },
  { axis: "I", text: "予定調和な平穏よりも、少し危うい緊張感がある方が燃える。", reverse: false },
  { axis: "I", text: "強い力で抱きしめられたり、強引に扱われることに魅力を感じる。", reverse: false },
  { axis: "I", text: "濃厚な短時間より、一晩中ゆっくり溶け合うような時間が理想だ。", reverse: true },
  { axis: "I", text: "精神的な繋がりと同じくらい、本能的な「激しさ」を重視したい。", reverse: false },
  { axis: "I", text: "痛みや圧迫といった強い感覚も、愛の表現として成立すると思う。", reverse: false },

  // ── V 軸（視覚 vs 感覚） ──────────────────────────────────────────────────
  { axis: "V", text: "照明や服装など「見た目」の美しさには一倍こだわりたい。", reverse: false },
  { axis: "V", text: "鏡越しに自分たちの姿を見ることに、特別な高揚感を感じる。", reverse: false },
  { axis: "V", text: "感覚に没頭するより、相手の表情をしっかり見ていたい。", reverse: false },
  { axis: "V", text: "匂いや声といった「目に見えない感覚」が一番のスイッチだ。", reverse: true },
  { axis: "V", text: "思い出は感覚よりも、映像的なシーンとして記憶に残りやすい。", reverse: false },
  { axis: "V", text: "演出された「非日常な光景」の中に身を置くことが好きだ。", reverse: false },

  // ── S 軸（定番 vs 冒険） ──────────────────────────────────────────────────
  { axis: "S", text: "馴染みのある定番のルーチンを繰り返すことに安心感を感じる。", reverse: false },
  { axis: "S", text: "まだ試したことのない新しい刺激には、好奇心が勝る。", reverse: true },
  { axis: "S", text: "世間一般では「変わっている」と言われる嗜好にも理解がある。", reverse: true },
  { axis: "S", text: "自分の知らない「新しい感覚の扉」を開けてくれる人を求めている。", reverse: true },
  { axis: "S", text: "自分ではない誰かになりきる「役割」を演じることに興味がある。", reverse: true },
  { axis: "S", text: "二人だけの秘められた遊びを、どこまでも追求したい。", reverse: true },
];

/** 回答選択肢 */
export const answerOptions = [
  { label: "非常にそう思う", value: 2 },
  { label: "そう思う", value: 1 },
  { label: "どちらでもない", value: 0 },
  { label: "あまり思わない", value: -1 },
  { label: "全く思わない", value: -2 },
] as const;

/** スコアからタイプコードを算出する */
export function calcTypeCode(scores: { D: number; I: number; V: number; S: number }): string {
  const d = scores.D > 0 ? "D" : "R";
  const i = scores.I > 0 ? "I" : "M";
  const v = scores.V > 0 ? "V" : "T";
  const s = scores.S > 0 ? "S" : "A";
  return d + i + v + s;
}
