# 🎯 ビンゴゲーム

会社のイベントや懇親会で使える、リアルタイム数字抽選システムです。  
ルーレット風のアニメーション演出で盛り上がること間違いなし！

![ビンゴゲーム](https://img.shields.io/badge/Game-Bingo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 🎮 ゲームの特徴

### 🎲 **基本機能**

- **1-75 の数字抽選**: ビンゴ標準の数字範囲をカバー
- **重複防止**: 一度出た数字は二度と選ばれない
- **大きな数字表示**: 画面左側に見やすく表示
- **履歴表示**: 右側に過去の数字をボール形式で一覧表示

### 🎪 **ルーレット演出**

- **3 秒間のルーレットアニメーション**: 期待感を最大限に演出
- **スムーズな減速**: 自然な動きで最終数字まで導く
- **背景色変化**: 数字範囲に応じた 5 色のグラデーション
- **最終結果エフェクト**: 決定時の華やかな登場アニメーション

### 🎨 **デザイン特徴**

- **色分けシステム**: 数字範囲別に直感的な色分け
  - 🔴 **1-15**: 赤色
  - 🔵 **16-30**: 青色
  - 🟢 **31-45**: 緑色
  - 🟠 **46-60**: オレンジ色
  - � **61-75**: 紫色
- **レスポンシブデザイン**: スマホ・タブレット・PC 対応
- **アニメーション**: 滑らかな動きと視覚効果

## 🛠️ 技術スタック

### **フロントエンド**

- **HTML5**: セマンティックな構造とアクセシビリティ
- **CSS3**: モダンなアニメーションとレスポンシブデザイン
- **JavaScript (ES6)**: クラスベースの設計とモダン構文
- **Tailwind CSS**: ユーティリティファーストのスタイリング

### **技術的特徴**

- **純粋な Web 技術**: 外部依存なしで動作
- **モダン CSS**: CSS Grid、Flexbox、カスタムアニメーション
- **ES6 クラス**: オブジェクト指向設計
- **イベント駆動**: インタラクティブなユーザー体験

## 📁 プロジェクト構成

```
src/
├── index.html          # メインHTMLファイル
├── css/
│   └── styles.css      # カスタムスタイルとアニメーション
└── js/
    └── script.js       # ゲームロジックとアニメーション制御
```

## 🚀 使い方

### **ローカル実行**

1. リポジトリをクローンまたはダウンロード
2. `src/index.html` をブラウザで開く
3. 「引く」ボタンを押してゲーム開始！

### **GitHub Pages での公開**

1. GitHub リポジトリの Settings > Pages にアクセス
2. Source を「Deploy from a branch」に設定
3. Branch を「main」、フォルダを「/ (root)」に設定
4. `https://username.github.io/repository-name/src/` でアクセス

## 🎯 実装詳細

### **ゲームロジック**

```javascript
class BingoGame {
  constructor() {
    this.availableNumbers = this.generateNumberArray(1, 75);
    this.drawnNumbers = [];
    this.currentNumber = null;
  }

  drawNumber() {
    // ルーレットアニメーション付きの数字抽選
  }
}
```

### **アニメーション仕様**

- **ルーレット回転**: 6 回転（2160 度）の滑らかな回転
- **数字変化**: 2.8 秒間の動的フリッカー効果
- **減速カーブ**: `1 - Math.pow(1 - progress, 3)` による自然な減速
- **最終演出**: スケール＋回転＋フェードの複合エフェクト

### **レスポンシブ仕様**

```css
/* デスクトップ */
.number-ball {
  width: 4rem;
  height: 4rem;
  font-size: 1.125rem;
}

/* タブレット (768px以下) */
.number-ball {
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1rem;
}

/* スマホ (480px以下) */
.number-ball {
  width: 3rem;
  height: 3rem;
  font-size: 0.9rem;
}
```

## ⚡ パフォーマンス

- **軽量**: 外部ライブラリ依存なし
- **高速**: ピュア JavaScript による最適化
- **滑らか**: 60FPS アニメーション
- **メモリ効率**: 効率的な DOM 操作

## � カスタマイズ

### **数字範囲の変更**

```javascript
// 1-90のヨーロピアンビンゴの場合
this.availableNumbers = this.generateNumberArray(1, 90);
```

### **アニメーション時間の調整**

```javascript
// ルーレット時間を変更（ミリ秒）
const totalDuration = 3500; // 3.5秒に延長
```

### **色テーマのカスタマイズ**

```javascript
getNumberColor(number) {
    // 独自の色分けロジックを実装
}
```

## 🎉 使用シーン

- **会社イベント**: 懇親会、歓送迎会、忘年会
- **学校行事**: 文化祭、体育祭、クラス会
- **地域イベント**: 町内会、お祭り、集会
- **家族パーティー**: 誕生日会、記念日

## 📱 動作環境

- **ブラウザ**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **デバイス**: PC、タブレット、スマートフォン
- **解像度**: 320px〜 (レスポンシブ対応)

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！  
改善提案やバグ報告は GitHub Issues までお願いします。

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。  
詳細は [LICENSE](LICENSE) ファイルをご確認ください。

---

**🎯 楽しいビンゴゲームをお楽しみください！** 🎉
