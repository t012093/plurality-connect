# プロジェクト発見ページ仕様書

## 📋 概要
プロジェクト発見ページは、ユーザーが地域の官民連携プロジェクトを発見し、参加できるマッチングプラットフォームです。AIによるスキルマッチングと透明な情報開示により、効率的な協働を促進します。

## 🎯 目的
- 地域課題解決プロジェクトの透明な情報公開
- ユーザーのスキル・関心に基づく最適マッチング
- 多様なステークホルダー間の協働促進
- プロジェクトライフサイクル全体の可視化

## 👥 対象ユーザー
- **市民**: 地域貢献したい個人、スキル提供者
- **民間企業**: 技術・資金・人材を提供したい企業
- **NPO・市民団体**: 社会課題解決に取り組む組織
- **行政**: プロジェクトを発信・管理する自治体職員
- **学術機関**: 研究・専門知識を提供する研究者

## 🏗️ システム構成

### レイアウト構造
```
┌─────────────────────────────────────────────────────────┐
│ Header: 検索バー + フィルター + ソート                        │
├─────────────────┬───────────────────────────────────────┤
│ 左サイドバー      │ メインコンテンツエリア                      │
│ - AIマッチング   │ ┌─────────────────────────────────────┐ │
│ - フィルター     │ │ プロジェクトカード一覧                  │ │
│ - 関心分野       │ │ ┌─────┐ ┌─────┐ ┌─────┐          │ │
│ - 地域選択       │ │ │Card1│ │Card2│ │Card3│          │ │
│ - 予算範囲       │ │ └─────┘ └─────┘ └─────┘          │ │
│ - ステータス     │ │ ┌─────┐ ┌─────┐ ┌─────┐          │ │
│                 │ │ │Card4│ │Card5│ │Card6│          │ │
│                 │ │ └─────┘ └─────┘ └─────┘          │ │
│                 │ └─────────────────────────────────────┘ │
├─────────────────┴───────────────────────────────────────┤
│ ページネーション + 読み込み状態                             │
└─────────────────────────────────────────────────────────┘
```

## 🔍 主要機能

### 1. インテリジェント検索・フィルタリング
#### 検索機能
- **キーワード検索**: プロジェクト名、説明、タグ、技術スタック
- **自然言語検索**: 「IoTを使った高齢者支援」「予算100万円以下のプロジェクト」
- **音声検索**: 音声入力対応（モバイル）

#### フィルター項目
- **分野・カテゴリー**
  - 健康・医療・福祉
  - 教育・子育て
  - 環境・エネルギー
  - 防災・安全
  - 産業・経済
  - 交通・インフラ
  - 文化・観光
  - その他

- **地域・エリア**
  - 都道府県選択
  - 市区町村選択
  - 対象範囲（全国、地域限定、オンライン可能）

- **予算規模**
  - ~100万円
  - 100万円~500万円
  - 500万円~1000万円
  - 1000万円~5000万円
  - 5000万円以上
  - 非金銭的貢献のみ

- **プロジェクトステータス**
  - 企画中（アイデア募集）
  - メンバー募集中
  - 実行中
  - 一時停止
  - 完了
  - 募集終了

- **参加方法**
  - プロボノ（無償）
  - 有償契約
  - 入札・コンペ
  - 資金提供
  - スキル提供
  - アドバイザー

- **求められるスキル**
  - プログラミング（言語別）
  - デザイン・UI/UX
  - データ分析
  - プロジェクト管理
  - 営業・マーケティング
  - 法務・会計
  - 専門知識（分野別）

### 2. AIマッチング機能
#### スキルマッチング
- **ユーザープロフィール分析**
  - 登録スキル・経験
  - 過去の参加履歴
  - 関心分野
  - 利用可能時間
  - 地理的制約

- **マッチング精度**
  - スキル適合度: 0-100%
  - 関心度: 0-100%
  - 参加可能性: 0-100%
  - 総合マッチ度: 0-100%

#### パーソナライゼーション
- **おすすめプロジェクト**
  - 上位5-10件を表示
  - マッチング理由の説明
  - 類似プロジェクトの提案

- **アラート機能**
  - 新規プロジェクト通知
  - マッチング閾値超過時の通知
  - 締切間近の通知

### 3. プロジェクトカード設計
#### カード情報構成
```
┌─────────────────────────────────────────────────────┐
│ [ステータスバッジ] [優先度] [マッチ度: 95%]           │
├─────────────────────────────────────────────────────┤
│ プロジェクト名（タイトル）                           │
│ 主催者名 | 地域 | 分野タグ                           │
├─────────────────────────────────────────────────────┤
│ 概要説明（2-3行）                                   │
│ 現在の状況・進捗                                    │
├─────────────────────────────────────────────────────┤
│ 💰 予算: ¥XXX万円 | ⏰ 期間: X ヶ月               │
│ 👥 メンバー: X/Y名 | 📅 締切: YYYY/MM/DD          │
├─────────────────────────────────────────────────────┤
│ 求められるスキル:                                   │
│ [React] [Python] [デザイン] [PM] ...               │
├─────────────────────────────────────────────────────┤
│ [詳細を見る] [興味あり] [問い合わせ] [共有]          │
└─────────────────────────────────────────────────────┘
```

#### ステータス表示
- **企画中**: 🟡 オレンジ
- **募集中**: 🟢 グリーン（アニメーション）
- **実行中**: 🔵 ブルー
- **一時停止**: 🟠 グレー
- **完了**: ⚪ 薄グレー
- **緊急**: 🔴 レッド（点滅）

### 4. 詳細表示・インタラクション
#### プロジェクト詳細ページ
- **基本情報**
  - プロジェクト概要
  - 目的・背景
  - 期待される成果
  - スケジュール・マイルストーン

- **参加情報**
  - 募集職種・スキル
  - 参加条件
  - 報酬・待遇
  - 勤務形態（リモート/現地）

- **主催者情報**
  - 組織概要
  - 過去の実績
  - 信頼スコア
  - レビュー・評価

- **技術・ツール**
  - 使用技術スタック
  - 開発環境
  - 必要なツール
  - 学習リソース

#### インタラクション
- **興味表示**: ハート／星マーク
- **ブックマーク**: 後で見返すための保存
- **共有**: SNS、メール、URL共有
- **問い合わせ**: 主催者への直接メッセージ
- **応募**: 正式な参加申請

### 5. ソート・表示オプション
#### ソート項目
- **マッチ度順** (デフォルト)
- **新着順**
- **締切が近い順**
- **予算規模順**
- **人気順** (興味表示数)
- **緊急度順**

#### 表示オプション
- **カード表示** (デフォルト): 3列グリッド
- **リスト表示**: 詳細情報を横並び
- **マップ表示**: 地理的位置に基づく表示
- **タイムライン表示**: スケジュール順

## 📊 データ管理

### プロジェクトデータ構造
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  
  // 基本情報
  organizer: {
    name: string;
    type: 'government' | 'business' | 'npo' | 'academic';
    trustScore: number;
    logo?: string;
  };
  
  // 分類・メタデータ
  category: ProjectCategory[];
  region: {
    prefecture: string;
    city?: string;
    scope: 'local' | 'regional' | 'national' | 'online';
  };
  tags: string[];
  
  // 予算・スケジュール
  budget: {
    amount?: number;
    currency: 'JPY';
    type: 'fixed' | 'range' | 'tbd' | 'non-monetary';
  };
  timeline: {
    startDate: Date;
    endDate: Date;
    duration: number; // months
    milestones: Milestone[];
  };
  
  // 募集情報
  recruitment: {
    status: ProjectStatus;
    totalPositions: number;
    filledPositions: number;
    requiredSkills: Skill[];
    participationType: ParticipationType[];
    deadline?: Date;
  };
  
  // マッチング関連
  matching: {
    userMatchScore?: number;
    popularity: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // 進捗・ステータス
  progress: {
    phase: ProjectPhase;
    completionRate: number;
    lastUpdated: Date;
  };
  
  // 統計・エンゲージメント
  stats: {
    viewCount: number;
    interestCount: number;
    applicationCount: number;
    bookmarkCount: number;
  };
}
```

### フィルター状態管理
```typescript
interface FilterState {
  searchQuery: string;
  categories: ProjectCategory[];
  regions: Region[];
  budgetRange: [number, number];
  status: ProjectStatus[];
  participationTypes: ParticipationType[];
  requiredSkills: Skill[];
  urgencyLevels: UrgencyLevel[];
  sortBy: SortOption;
  viewMode: 'cards' | 'list' | 'map' | 'timeline';
  page: number;
  itemsPerPage: number;
}
```

## 🎨 UI/UXデザイン指針

### カラーパレット
- **プライマリー**: グラデーション (#8b5cf6 → #06b6d4)
- **セカンダリー**: #3b82f6, #10b981, #f59e0b
- **危険**: #ef4444
- **成功**: #10b981
- **警告**: #f59e0b
- **ニュートラル**: #6b7280, #9ca3af

### レスポンシブ対応
- **デスクトップ**: 3列グリッド + サイドバー
- **タブレット**: 2列グリッド + 折りたたみサイドバー
- **モバイル**: 1列リスト + ボトムシート

### アニメーション・マイクロインタラクション
- **カードホバー**: 軽微な浮上効果
- **ローディング**: スケルトンUI
- **フィルター適用**: フェードイン・アウト
- **新着プロジェクト**: パルス効果
- **マッチング表示**: 数値カウントアップ

## 🔄 インテグレーション

### API設計
```typescript
// プロジェクト一覧取得
GET /api/projects?filters={}&sort={}&page={}

// プロジェクト詳細取得
GET /api/projects/{id}

// ユーザーマッチング取得
GET /api/users/{id}/matches?limit={}

// 興味表示
POST /api/projects/{id}/interest

// 応募・問い合わせ
POST /api/projects/{id}/apply
```

### 外部サービス連携
- **地図サービス**: Google Maps / OpenStreetMap
- **検索エンジン**: Elasticsearch
- **AI/ML**: TensorFlow.js / Hugging Face
- **通知**: Firebase Cloud Messaging
- **分析**: Google Analytics / Mixpanel

## 📈 パフォーマンス要件

### 応答時間
- **初回ページロード**: < 2秒
- **フィルター適用**: < 500ms
- **検索結果**: < 1秒
- **詳細ページ**: < 1.5秒

### スケーラビリティ
- **同時ユーザー**: 1,000人
- **プロジェクト数**: 10,000件
- **検索クエリ**: 100req/sec

## 🛡️ セキュリティ・プライバシー

### データ保護
- **個人情報**: 最小限の収集
- **GDPR準拠**: データ削除権
- **暗号化**: 通信・保存時

### アクセス制御
- **認証**: OAuth 2.0
- **認可**: ロールベース
- **監査ログ**: 全操作記録

## 🧪 テスト戦略

### ユーザビリティテスト
- **タスク完了率**: > 90%
- **検索成功率**: > 85%
- **満足度スコア**: > 4.5/5

### パフォーマンステスト
- **負荷テスト**: 最大負荷の3倍
- **ストレステスト**: 限界点測定
- **エンドランステスト**: 24時間連続

## 📊 成功指標 (KPI)

### ユーザーエンゲージメント
- **DAU/MAU比率**: > 30%
- **セッション時間**: > 5分
- **ページビュー/セッション**: > 3

### マッチング効果
- **マッチング成功率**: > 60%
- **プロジェクト応募率**: > 15%
- **参加継続率**: > 80%

### プラットフォーム成長
- **新規プロジェクト数**: 月50件以上
- **ユーザー成長率**: 月10%以上
- **プロジェクト完了率**: > 70%

---

この仕様書を基に、次のフェーズでUI実装を行います。