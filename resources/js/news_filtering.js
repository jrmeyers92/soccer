document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('newsPage__search');
    const noResults = document.getElementById('newsPage__noResults');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('.news-item');
        let visible = 0;

        items.forEach(item => {
            const title = (item.dataset.title || '').toLowerCase();
            const date = (item.dataset.date || '').toLowerCase();
            const matches = !term || title.includes(term) || date.includes(term);
            item.classList.toggle('hidden', !matches);
            if (matches) visible++;
        });

        if (noResults) {
            noResults.classList.toggle('hidden', visible > 0 || !term);
        }
    });
});
