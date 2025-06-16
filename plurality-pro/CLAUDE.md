# Plurality Pro - プロジェクト情報

## プロジェクト概要
自治体、NPO、企業、市民がビジョンと政策を可視化して共創できる新しいプロソーシャルSNSプラットフォーム。

## 技術スタック
- **フロントエンド**: React + TypeScript
- **スタイリング**: styled-components
- **3D可視化**: Three.js
- **ルーティング**: React Router
- **状態管理**: React Hooks (useState, useEffect)

## プロジェクト構造

### 主要ページ
1. **ConnectPage** (`src/pages/ConnectPage.tsx`)
   - メインダッシュボード
   - 3列レイアウト: サイドバー、メインコンテンツ、ネットワークパネル
   - AIインサイト、プロソーシャルフィード、3Dネットワーク可視化

2. **ProjectDiscoveryPage** (`src/pages/ProjectDiscoveryPage.tsx`)
   - プロジェクト発見・検索システム
   - AI マッチング、フィルタリング機能
   - IoT高齢者ケア、子育てアプリ、スマート農業などのプロジェクト

3. **SkillMatchingPage** (`src/pages/SkillMatchingPage.tsx`)
   - スキルベース人材マッチングシステム
   - 4つのマッチングモード: 提供、学習、交換、メンター
   - 5段階スキルレベル評価システム

4. **NetworkVisualizationPage** (`src/pages/NetworkVisualizationPage.tsx`)
   - フルスクリーン3Dネットワーク可視化システム
   - インタラクティブなノード操作・詳細表示
   - リアルタイムアニメーション・データストリーム可視化
   - ステークホルダー分析・関係性マッピング

### 主要コンポーネント

#### Connect関連
- `ConnectSidebar.tsx` - サイドバーナビゲーション
- `AIInsights.tsx` - AI分析パネル
- `ProsocialFeed.tsx` - プロソーシャルフィード
- `NetworkPanel.tsx` - 3Dネットワーク可視化

#### Project Discovery関連
- `ProjectCard.tsx` - プロジェクトカード表示
- `SearchHeader.tsx` - 検索・フィルター機能
- `ProjectFilters.tsx` - プロジェクトフィルター

#### Skill Matching関連
- `UserSkillCard.tsx` - ユーザースキルカード（完成）
- `SkillFilters.tsx` - スキルフィルター（未実装）
- `SkillSearchHeader.tsx` - スキル検索ヘッダー（未実装）
- `MatchingRecommendations.tsx` - マッチング推薦（未実装）

## デザインシステム

### カラーパレット
- **背景**: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)`
- **プライマリ**: `#06b6d4` (Cyan)
- **セカンダリ**: `#3b82f6` (Blue)
- **アクセント**: `#8b5cf6` (Violet)
- **成功**: `#10b981` (Emerald)
- **警告**: `#f59e0b` (Amber)

### マッチングモード色分け
- **スキル提供**: グリーン系 `#10b981 → #34d399`
- **スキル学習**: ブルー系 `#3b82f6 → #60a5fa`
- **相互交換**: パープル系 `#8b5cf6 → #a78bfa`
- **メンタリング**: オレンジ系 `#f59e0b → #fbbf24`

### スキルレベル表示
- **初心者** (1): 🟥 レッド
- **基礎** (2): 🟧 オレンジ  
- **中級** (3): 🟨 イエロー
- **上級** (4): 🟩 グリーン
- **エキスパート** (5): 🟦 ブルー

## データモデル

### UserSkillProfile
```typescript
interface UserSkillProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  trustScore: number;
  isOnline: boolean;
  skills: Skill[];
  preferences: UserPreferences;
  performance: UserPerformance;
  recentActivity: Activity[];
}
```

### Skill
```typescript
interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  category: string;
  offering: SkillOffering;
  learning: SkillLearning;
}
```

## ルーティング設定
```typescript
Routes:
- "/" → ConnectPage
- "/connect" → ConnectPage  
- "/projects" → ProjectDiscoveryPage
- "/skills" → SkillMatchingPage
- "/network" → NetworkVisualizationPage
- "/decision" → DecisionPage
- "/guide" → GuidePage
```

## 未完了タスク

### 高優先度
- [x] スキルマッチングページの仕様書作成
- [x] スキルマッチングページのメインUI実装
- [x] ユーザースキルカードコンポーネント作成
- [ ] 残りのスキルマッチング関連コンポーネント実装

### 中優先度
- [ ] スキルマッチングページのルーティング統合
- [ ] サイドバーナビゲーションにスキルマッチングリンク追加
- [ ] TypeScript エラー修正
- [ ] レスポンシブデザイン対応改善

### 実装必要コンポーネント
1. `SkillFilters.tsx` - スキルカテゴリ、レベル、地域フィルター
2. `SkillSearchHeader.tsx` - 検索バー、ソート機能  
3. `MatchingRecommendations.tsx` - AI推薦マッチング表示

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck

# リント
npm run lint
```

## 設計思想
- **プロソーシャル**: 社会課題解決を促進する設計
- **ブリッジング**: 異なるステークホルダー間の協働促進
- **トラストスコア**: 信頼性ベースのマッチングシステム
- **AI支援**: 最適な協働機会の発見とレコメンデーション
- **地域密着**: 富山県を中心とした地域エコシステム構築

## ネットワーク可視化ページ仕様

### 概要
ConnectPageのcanvas要素をクリックすることでアクセス可能な、フルスクリーン3Dネットワーク可視化専用ページ。地域のステークホルダー間の関係性をインタラクティブに探索できる。

### 主要機能
1. **フルスクリーン3D可視化**
   - Three.jsベースのインタラクティブネットワーク
   - マウス/タッチでのズーム・回転・パン操作
   - スムーズなカメラアニメーション

2. **ノードインタラクション**
   - ホバー時の詳細情報表示
   - クリック時の詳細パネル展開
   - ノード間関係性のハイライト

3. **データストリーム可視化**
   - リアルタイムデータフローアニメーション
   - プロジェクト・資金・スキルの流れ表示
   - パルス効果による重要度表現

4. **フィルタリング・分析**
   - ステークホルダータイプ別表示切替
   - 関係性強度による表示制御
   - 時系列データの再生機能

### UI構成
```
┌─────────────────────────────────────────────────────────┐
│ ヘッダー: 戻るボタン, タイトル, コントロール           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    3D可視化エリア                       │
│                  (フルスクリーン)                       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ 下部パネル: フィルター, 統計情報, 詳細表示             │
└─────────────────────────────────────────────────────────┘
```

### ノードタイプ・色分け
- **自治体**: 🔴 レッド (`#ef4444`)
- **企業**: 🔵 ブルー (`#3b82f6`) 
- **NPO**: 🟢 グリーン (`#10b981`)
- **市民**: 🟣 パープル (`#8b5cf6`)
- **学術機関**: 🟡 アンバー (`#f59e0b`)

### アニメーション仕様
1. **ネットワーク回転**: 毎秒0.003ラジアン
2. **中央ノードパルス**: 3秒周期のスケーリング
3. **コネクション透明度**: 動的変化でデータフロー表現
4. **ノード移動**: 軽微な浮遊アニメーション

### インタラクション設計
- **マウスホバー**: ノード拡大・情報ツールチップ表示
- **クリック**: 詳細パネル・関連ノードハイライト
- **ドラッグ**: カメラ視点変更
- **スクロール**: ズームイン・アウト
- **キーボード**: ショートカット操作対応

## 最新の実装状況
- ConnectPage: 完成（3Dネットワーク可視化含む）
- ProjectDiscoveryPage: 完成（AIマッチング、フィルター機能含む）
- SkillMatchingPage: メインUI完成、詳細コンポーネント一部未実装
- スキルマッチング仕様書: 完成（380行の包括的仕様）
- NetworkVisualizationPage: 仕様設計完了、実装開始予定

最終更新: 2025-06-16