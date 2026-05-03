# LOVE BLUEPRINT — 感性の設計図

> あなたの深層に眠る「感性の設計図」を解き明かす、16タイプ診断アプリ

![LOVE BLUEPRINT](https://github.com/redius777/LOVE-BLUEPRINT-Manus/raw/main/docs/preview.png)

---

## 概要

**LOVE BLUEPRINT** は、恋愛・親密性における自分のスタイルを16タイプで診断するWebアプリです。24問の質問に答えることで、あなたの「感性の設計図」＝コアタイプが明らかになります。さらに、最も相性の良いベストパートナータイプも同時に表示されます。

Dark Academia Romance をテーマにした深みのあるビジュアルデザインで、診断体験そのものを没入感のある演出として楽しめます。

---

## 診断の仕組み

24問の質問を通じて、4つの軸それぞれのスコアを計測します。

| 軸 | 意味 | 結果 |
|---|---|---|
| **D / R** | Dominant（主導的）/ Receptive（受容的） | リードするか、受け入れるか |
| **I / M** | Intense（激しい）/ Mellow（穏やか） | 熱量・テンションのスタイル |
| **V / T** | Visual（視覚的）/ Tactile（触覚的） | 感覚の優先チャンネル |
| **S / A** | Sensory（感覚的）/ Abstract（抽象的） | 現実的か、観念的か |

4軸の組み合わせにより **16タイプ** が導き出されます。

---

## 16タイプ一覧

| コード | タイプ名 |
|---|---|
| DIVS | 王道のプロデューサー |
| DIVA | 変革のアーティスト |
| DITS | 情熱の建築家 |
| DITA | 五感の冒険家 |
| DMVS | 華やかなディレクター |
| DMVA | 幻想のストーリーテラー |
| DMTS | 慈愛のガーディアン |
| DMTA | 秘密の調香師 |
| RIVS | 輝きのミューズ |
| RIVA | 神秘のパフォーマー |
| RITS | 共鳴のソウルメイト |
| RITA | 深淵のダイバー |
| RMVS | 静寂のギャラリー |
| RMVA | 夢想の観察者 |
| RMTS | 癒やしのゆりかご |
| RMTA | たゆたう旅人 |

---

## 機能

- **24問の診断クイズ** — 質問はランダム順で出題され、毎回異なる体験になります
- **16タイプのキャラクターイラスト表示** — 診断結果に対応したオリジナルイラストカードを表示
- **プロフィール解説** — タイプごとの詳細な説明・得意な形・苦手な形を表示
- **ベストパートナー表示** — 最も相性の良い相手タイプのイラストと解説を表示
- **PC・スマートフォン対応** — 最大幅480pxのレスポンシブレイアウトで、どの端末でも快適に利用可能

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | React 19 + TypeScript |
| スタイリング | Tailwind CSS v4 |
| UIコンポーネント | shadcn/ui + Radix UI |
| ビルドツール | Vite 7 |
| アニメーション | Framer Motion |
| ルーティング | Wouter |
| フォント | Google Fonts（Cormorant Garamond / Cinzel / IM Fell English） |

---

## ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/redius777/LOVE-BLUEPRINT-Manus.git
cd LOVE-BLUEPRINT-Manus

# 依存パッケージをインストール（npm / pnpm どちらでも可）
npm install
# または
pnpm install

# 開発サーバーを起動
npm run dev
# または
pnpm dev
```

ブラウザで `http://localhost:3000` を開くと確認できます。

> **注意：** ローカル環境では `/manus-storage/` のキャラクター画像が表示されません（Manus CDN 専用 URL のため）。
> ローカルで画像を確認したい場合は、`client/public/assets/results/` に PNG ファイルを配置し、
> `client/src/data/types.ts` の `typeImages` のパスを `/assets/results/XXXX.png` に変更してください。

---

## ビルド

```bash
npm run build
# または
pnpm build
```

ビルド成果物は `dist/public/` に出力されます。

---

## ファイル構成

```
love-blueprint/
├── client/
│   ├── index.html              # エントリーHTML（OGP メタタグ）
│   ├── public/
│   │   └── assets/
│   │       ├── results/        # 16タイプ結果画像（PNG/WebP）を配置
│   │       ├── compatibility/  # 16×16 相性画像（将来用）
│   │       └── ogp/            # SNS用OGP画像を配置
│   └── src/
│       ├── config/
│       │   └── links.ts        # ★ 外部URL設定（LINE / Tally / サイトURL）
│       ├── data/
│       │   ├── types.ts        # ★ 16タイプ定義・画像パス・相性データ
│       │   ├── questions.ts    # ★ 診断質問データ（12問）
│       │   └── compatibility.ts # 相性スコア計算ロジック
│       ├── components/
│       │   └── ShareCard.tsx   # SNS シェア画像生成コンポーネント
│       ├── pages/
│       │   ├── Home.tsx        # メイン診断画面（スタート→質問→結果）
│       │   └── TypeLibrary.tsx # 全タイプ図鑑ページ（/library）
│       ├── App.tsx             # ルーティング設定
│       └── index.css           # グローバルスタイル・テーマ変数
├── vite.config.ts              # Vite 設定（Manus プラグインは自動条件分岐）
├── package.json
└── README.md
```

---

## 画像素材の配置場所

### キャラクター画像（タイプ別）

```
client/public/assets/results/
  DIVS.png  DIVA.png  DITS.png  DITA.png
  DMVS.png  DMVA.png  DMTS.png  DMTA.png
  RIVS.png  RIVA.png  RITS.png  RITA.png
  RMVS.png  RMVA.png  RMTS.png  RMTA.png
```

画像を配置したら `client/src/data/types.ts` の `typeImages` を以下のように変更：

```ts
export const typeImages: Record<string, string> = {
  DIVS: "/assets/results/DIVS.png",
  // ... 以下同様
};
```

### OGP 画像

```
client/public/assets/ogp/
  ogp.png   // 1200×630px 推奨
```

---

## URL・リンクの変更場所

**`client/src/config/links.ts`** を編集してください。

```ts
// 公式 LINE URL
export const LINE_OFFICIAL_URL = "https://lin.ee/XXXXXXX";

// Tally フォーム URL（ウェイトリスト等）
export const TALLY_FORM_URL = "https://tally.so/r/XXXXXXX";

// サイト URL（SNS シェア文・OGP で使用）
export const SITE_URL = "https://loveapp-mwrkg5cp.manus.space";
```

---

## 診断タイプデータの変更場所

**`client/src/data/types.ts`** を編集してください。

```ts
export const typeData: Record<string, TypeInfo> = {
  DIVS: {
    name: "王道のプロデューサー",   // タイプ名
    desc: "...",                    // 説明文
    plus: ["得意①", "得意②", "得意③"],
    minus: ["苦手①", "苦手②", "苦手③"],
    bestName: "共鳴のソウルメイト", // ベストパートナー名
    bestCode: "RITS",               // ベストパートナーコード
    why: "相性の理由...",
  },
  // ... 16タイプ分
};
```

---

## 診断質問データの変更場所

**`client/src/data/questions.ts`** を編集してください。

```ts
export const questions: Question[] = [
  {
    id: 1,
    text: "質問文",
    axis: "D_R",  // 軸: D_R / M_I / V_T / S_A
    aLabel: "選択肢A",
    bLabel: "選択肢B",
    aValue: "D",
    bValue: "R",
  },
  // ... 12問
];
```

---

## 相性診断データの変更場所

各タイプの `bestCode` フィールド（`client/src/data/types.ts`）を変更してください。
相性スコアの計算ロジックは **`client/src/data/compatibility.ts`** にあります。

---

## パフォーマンス設計

| 項目 | 実装方法 |
|------|----------|
| 初回ロードで大量画像を読み込まない | 診断結果が出るまで画像を `<img>` に渡さない |
| 結果画像は1枚だけ読み込む | `typeImages[typeCode]` で該当1枚のみ参照 |
| 相性画像も1枚だけ読み込む | `typeImages[result.bestCode]` で1枚のみ参照 |
| 画像を base64 で JS に埋め込まない | 全画像は URL 参照 |
| Canvas で毎回画像生成しない | シェアボタン押下時のみ html2canvas を実行 |
| 外部 DB に問い合わせない | 診断ロジックはブラウザ内で完結 |

---

## Manus ↔ ローカルの往復開発

```bash
# ローカルで変更後
git add .
git commit -m "feat: ..."
git push origin main

# Manus で最新を取得（新しいタスクで依頼）
# 「このリポジトリをcloneして続きをお願いします」
```

---

## デザインコンセプト

**Dark Academia Romance** をテーマに設計されています。

- **背景色**: 深黒（`oklch(0.08 0.012 20)`）
- **アクセントカラー**: 古金色（`oklch(0.75 0.095 75)`）
- **テキスト**: 羊皮紙クリーム（`oklch(0.93 0.020 80)`）
- **フォント**: Cormorant Garamond（見出し）× Cinzel（ラベル）× IM Fell English（本文）

キャラクターイラストの神秘的・ゴシックな世界観と調和し、診断体験全体を「封印された書物を開く」ような没入感で演出しています。

---

## ライセンス

本リポジトリのコードは MIT ライセンスのもとで公開されています。
キャラクターイラスト・タイプ名・診断コンテンツの著作権は制作者に帰属します。
