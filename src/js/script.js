// ビンゴゲームのメインスクリプト

class BingoGame {
    constructor() {
        this.availableNumbers = this.generateNumberArray(1, 75);
        this.drawnNumbers = [];
        this.currentNumber = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }

    // 1から75までの数字配列を生成
    generateNumberArray(start, end) {
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        return numbers;
    }

    // DOM要素の初期化
    initializeElements() {
        this.drawButton = document.getElementById('drawButton');
        this.numberDisplay = document.getElementById('numberDisplay');
        this.currentNumberEl = document.getElementById('currentNumber');
        this.numberBalls = document.getElementById('numberBalls');
        this.remainingCount = document.getElementById('remainingCount');
        this.emptyMessage = document.getElementById('emptyMessage');
        this.gameComplete = document.getElementById('gameComplete');
    }

    // イベントハンドラーのバインド
    bindEvents() {
        this.drawButton.addEventListener('click', () => this.drawNumber());
        
        // エンターキーでも数字を引けるようにする
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.availableNumbers.length > 0) {
                this.drawNumber();
            }
        });
    }

    // ランダムに数字を引く
    drawNumber() {
        if (this.availableNumbers.length === 0) {
            return;
        }

        // ボタンを無効化してアニメーション中の重複クリックを防ぐ
        this.drawButton.disabled = true;
        this.drawButton.classList.add('button-disabled');
        this.drawButton.textContent = '抽選中...';

        // ランダムなインデックスを選択
        const randomIndex = Math.floor(Math.random() * this.availableNumbers.length);
        const drawnNumber = this.availableNumbers[randomIndex];

        // ルーレットアニメーションを開始
        this.startRouletteAnimation(drawnNumber);
    }

    // 現在の数字表示を更新
    updateCurrentNumber() {
        this.numberDisplay.textContent = this.currentNumber;
        this.currentNumberEl.classList.add('pulse-animation');
        
        // アニメーション後にクラスを削除
        setTimeout(() => {
            this.currentNumberEl.classList.remove('pulse-animation');
        }, 800);

        // 数字に応じて背景色を変更
        const colors = this.getNumberColor(this.currentNumber);
        this.currentNumberEl.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    }

    // ルーレットアニメーションを開始
    startRouletteAnimation(finalNumber) {
        // アニメーション開始
        this.currentNumberEl.classList.add('roulette-animation', 'drum-rotation');
        
        // 数字の高速変化アニメーション
        this.startNumberFlicker(finalNumber);
    }

    // 数字の高速変化アニメーション（スムーズな減速）
    startNumberFlicker(finalNumber) {
        let flickerCount = 0;
        const totalDuration = 2800; // 総アニメーション時間（ミリ秒）
        const startTime = Date.now();
        
        this.numberDisplay.classList.add('number-flicker');
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);
            
            // イージング関数（急速に開始し、徐々に減速）
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            if (progress < 1) {
                // 進行度に応じて間隔を調整（最初は高速、徐々に遅く）
                const baseInterval = 50; // 基本間隔
                const maxInterval = 300; // 最大間隔
                const currentInterval = baseInterval + (maxInterval - baseInterval) * easeOut;
                
                // ランダムな数字を表示（1-75）
                const randomNum = Math.floor(Math.random() * 75) + 1;
                this.numberDisplay.textContent = randomNum;
                
                flickerCount++;
                
                // 次のフレームをスケジュール
                setTimeout(animate, currentInterval);
            } else {
                // アニメーション完了
                this.numberDisplay.classList.remove('number-flicker');
                this.finishRouletteAnimation(finalNumber);
            }
        };
        
        // アニメーション開始
        animate();
    }

    // ルーレットアニメーション完了
    finishRouletteAnimation(finalNumber) {
        // 回転アニメーション完了まで少し待機
        setTimeout(() => {
            // アニメーションクラスを削除
            this.currentNumberEl.classList.remove('roulette-animation', 'drum-rotation');
            
            // 最終数字を設定してゲーム状態を更新
            this.completeNumberDraw(finalNumber);
            
            // 最終結果の登場アニメーション
            this.numberDisplay.textContent = finalNumber;
            this.currentNumberEl.classList.add('final-reveal');
            
            // 最終アニメーション完了後にクラスを削除
            setTimeout(() => {
                this.currentNumberEl.classList.remove('final-reveal');
            }, 600);
            
        }, 200); // ルーレットアニメーションとの同期調整
    }

    // 数字抽選の完了処理
    completeNumberDraw(drawnNumber) {
        // 選ばれた数字を利用可能リストから削除
        const index = this.availableNumbers.indexOf(drawnNumber);
        if (index > -1) {
            this.availableNumbers.splice(index, 1);
        }
        
        // 選ばれた数字をリストに追加
        this.drawnNumbers.push(drawnNumber);
        this.currentNumber = drawnNumber;

        // UI更新
        this.updateCurrentNumberColor();
        this.addNumberBall(drawnNumber);
        this.updateUI();

        // ボタンを再度有効化
        if (this.availableNumbers.length > 0) {
            this.drawButton.disabled = false;
            this.drawButton.classList.remove('button-disabled');
            this.drawButton.textContent = '🎲 引く';
        }

        // ゲーム完了チェック
        if (this.availableNumbers.length === 0) {
            this.showGameComplete();
        }
    }

    // 現在の数字の色のみ更新
    updateCurrentNumberColor() {
        const colors = this.getNumberColor(this.currentNumber);
        this.currentNumberEl.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
    }

    // 数字に応じた色を取得
    getNumberColor(number) {
        if (number >= 1 && number <= 15) {
            return { primary: '#ef4444', secondary: '#dc2626' }; // 赤
        } else if (number >= 16 && number <= 30) {
            return { primary: '#3b82f6', secondary: '#2563eb' }; // 青
        } else if (number >= 31 && number <= 45) {
            return { primary: '#10b981', secondary: '#059669' }; // 緑
        } else if (number >= 46 && number <= 60) {
            return { primary: '#f59e0b', secondary: '#d97706' }; // オレンジ
        } else {
            return { primary: '#8b5cf6', secondary: '#7c3aed' }; // 紫
        }
    }

    // 数字ボールを追加
    addNumberBall(number) {
        const ball = document.createElement('div');
        const colors = this.getNumberColor(number);
        
        ball.className = 'number-ball w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ball-enter';
        ball.style.background = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
        ball.textContent = number;
        ball.title = `数字: ${number}`;

        // ボールをクリックしたときのエフェクト
        ball.addEventListener('click', () => {
            ball.style.transform = 'scale(1.2)';
            setTimeout(() => {
                ball.style.transform = 'scale(1)';
            }, 200);
        });

        this.numberBalls.appendChild(ball);
        
        // 空メッセージを非表示
        this.emptyMessage.style.display = 'none';

        // 最新のボールにスクロール
        setTimeout(() => {
            this.numberBalls.scrollTop = this.numberBalls.scrollHeight;
        }, 100);
    }

    // UI全体の更新
    updateUI() {
        // 残り数字カウントの更新
        this.remainingCount.textContent = this.availableNumbers.length;

        // ボタンの状態更新
        if (this.availableNumbers.length === 0) {
            this.drawButton.disabled = true;
            this.drawButton.classList.add('button-disabled');
            this.drawButton.textContent = '完了';
        }

        // 空メッセージの表示制御
        if (this.drawnNumbers.length === 0) {
            this.emptyMessage.style.display = 'block';
        }
    }

    // ゲーム完了モーダルの表示
    showGameComplete() {
        setTimeout(() => {
            this.gameComplete.classList.remove('hidden');
        }, 1000);
    }

    // ゲームの統計情報を取得
    getGameStats() {
        return {
            totalDrawn: this.drawnNumbers.length,
            remaining: this.availableNumbers.length,
            drawnNumbers: [...this.drawnNumbers],
            isComplete: this.availableNumbers.length === 0
        };
    }
}

// DOM読み込み完了時にゲームを初期化
document.addEventListener('DOMContentLoaded', () => {
    const game = new BingoGame();
    
    // デバッグ用にグローバルに公開（開発時のみ）
    window.bingoGame = game;
    
    console.log('🎯 ビンゴゲームが開始されました！');
    console.log('ゲーム統計は window.bingoGame.getGameStats() で確認できます。');
});
