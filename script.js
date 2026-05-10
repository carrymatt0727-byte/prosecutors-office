// 通用字體大小調整邏輯
document.addEventListener('DOMContentLoaded', () => {
    const fontBtns = document.querySelectorAll('.font-btn');
    const mainContent = document.getElementById('main-content');

    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fontBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const size = btn.dataset.size;
            if(size === 'small') mainContent.style.fontSize = '0.9rem';
            else if(size === 'medium') mainContent.style.fontSize = '1rem';
            else if(size === 'large') mainContent.style.fontSize = '1.2rem';
        });
    });

    // 初始化訪客統計
    initStats();
});

// 訪客統計功能
function initStats() {
    const statsContainer = document.querySelector('.footer-stats');
    if (!statsContainer) return;

    // 設定累計人次 (固定一個基礎數字 + 隨機增長)
    const baseCount = 1250432;
    const totalElement = document.getElementById('total-visitors');
    if (totalElement) {
        totalElement.textContent = baseCount.toLocaleString();
    }

    // 設定線上人數跳動
    const onlineElement = document.getElementById('online-users');
    if (onlineElement) {
        let currentOnline = Math.floor(Math.random() * (55 - 38 + 1)) + 38; // 38-55 之間
        onlineElement.textContent = currentOnline;

        setInterval(() => {
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
            currentOnline += change;
            if (currentOnline < 30) currentOnline = 30;
            if (currentOnline > 80) currentOnline = 80;
            onlineElement.textContent = currentOnline;
        }, 5000);
    }

    // 設定更新日期 (今天)
    const dateElement = document.getElementById('last-update');
    if (dateElement) {
        const now = new Date();
        dateElement.textContent = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }
}
