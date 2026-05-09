document.addEventListener('DOMContentLoaded', () => {
    // Font Size Control
    const fontBtns = document.querySelectorAll('.font-btn');
    const html = document.documentElement;

    fontBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            fontBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            // Apply font size class to html
            html.classList.remove('font-sm', 'font-lg');
            const size = btn.getAttribute('data-size');
            if (size === 'small') {
                html.classList.add('font-sm');
            } else if (size === 'large') {
                html.classList.add('font-lg');
            }
        });
    });

    // News Tabs Control (Mock implementation, in a real app would filter data)
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // For visual feedback, just showing we can interact
            // In a real app, this would hide/show different content sections based on data-target
        });
    });

    // Simple Search Box interaction
    const searchInput = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            if (searchInput.value.trim() !== '') {
                alert(\`搜尋「\${searchInput.value}」功能建置中...\`);
                searchInput.value = '';
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
});
