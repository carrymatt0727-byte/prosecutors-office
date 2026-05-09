// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Font Size Control (Persisted)
    const fontBtns = document.querySelectorAll('.font-btn');
    const html = document.documentElement;
    const savedSize = localStorage.getItem('taidao-font-size') || 'medium';

    function setFontSize(size) {
        html.classList.remove('font-sm', 'font-lg');
        if(fontBtns.length > 0) {
            fontBtns.forEach(b => b.classList.remove('active'));
            const activeBtn = Array.from(fontBtns).find(b => b.getAttribute('data-size') === size);
            if(activeBtn) activeBtn.classList.add('active');
        }

        if (size === 'small') html.classList.add('font-sm');
        else if (size === 'large') html.classList.add('font-lg');
        
        localStorage.setItem('taidao-font-size', size);
    }

    setFontSize(savedSize);

    if(fontBtns.length > 0) {
        fontBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setFontSize(btn.getAttribute('data-size'));
            });
        });
    }

    // 2. News Tabs Control
    const tabBtns = document.querySelectorAll('.tab-btn');
    const newsItems = document.querySelectorAll('.news-item');
    
    if(tabBtns.length > 0 && newsItems.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const target = btn.getAttribute('data-target');
                
                newsItems.forEach(item => {
                    const tagEl = item.querySelector('.tag');
                    if(!tagEl) return;
                    const tag = tagEl.textContent.trim();
                    let shouldShow = false;
                    
                    if (target === 'tab-all') shouldShow = true;
                    else if (target === 'tab-news' && (tag === '新聞稿' || tag === '最新消息')) shouldShow = true;
                    else if (target === 'tab-board' && tag === '電子公布欄') shouldShow = true;
                    else if (target === 'tab-notice' && tag === '公示送達') shouldShow = true;

                    item.style.display = shouldShow ? 'flex' : 'none';
                });
            });
        });
    }

    // 3. Search Box interaction
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    function performSearch() {
        if(searchInput) {
            const query = searchInput.value.trim();
            if (query !== '') {
                window.location.href = \`search.html?q=\${encodeURIComponent(query)}\`;
            }
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // 4. Language Toggle (Demonstration)
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('taidao-lang') || 'zh';

    // Simple dictionary for demonstration
    const dict = {
        'en': {
            '回首頁': 'Home',
            '網站導覽': 'Sitemap',
            '檢察長信箱': 'Contact',
            'English': '中文',
            '字體大小：': 'Font Size: ',
            '國民法官': 'Citizen Judge',
            '線上申辦': 'Online Services',
            '查扣物拍賣': 'Auction',
            '訴訟輔導': 'Counseling',
            '電話分機': 'Directory',
            '開庭進度查詢': 'Court Status',
            '最新公告': 'Latest News',
            '目前暫無最新公告': 'No news available at the moment.',
            '相關連結': 'Related Links',
            '資訊服務': 'Services',
            '隱私權政策': 'Privacy Policy',
            '資訊安全政策': 'Security Policy',
            '政府網站資料開放宣告': 'Open Data Declaration'
        },
        'zh': {
            'Home': '回首頁',
            'Sitemap': '網站導覽',
            'Contact': '檢察長信箱',
            '中文': 'English',
            'Font Size: ': '字體大小：',
            'Citizen Judge': '國民法官',
            'Online Services': '線上申辦',
            'Auction': '查扣物拍賣',
            'Counseling': '訴訟輔導',
            'Directory': '電話分機',
            'Court Status': '開庭進度查詢',
            'Latest News': '最新公告',
            'No news available at the moment.': '目前暫無最新公告',
            'Related Links': '相關連結',
            'Services': '資訊服務',
            'Privacy Policy': '隱私權政策',
            'Security Policy': '資訊安全政策',
            'Open Data Declaration': '政府網站資料開放宣告'
        }
    };

    function applyLanguage(lang) {
        if (!dict[lang]) return;
        
        // A simple text node replacer for demonstration
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            let text = node.nodeValue.trim();
            if (dict[lang][text]) {
                node.nodeValue = node.nodeValue.replace(text, dict[lang][text]);
            }
        }
        
        if(langToggle) {
            langToggle.textContent = lang === 'en' ? '中文' : 'English';
        }
        
        localStorage.setItem('taidao-lang', lang);
        currentLang = lang;
    }

    // Apply saved language on load if it's English
    if (currentLang === 'en') {
        // Need a slight timeout to ensure DOM is fully ready for text replacement
        setTimeout(() => applyLanguage('en'), 100); 
    }

    if(langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = currentLang === 'zh' ? 'en' : 'zh';
            applyLanguage(targetLang);
        });
    }
});
