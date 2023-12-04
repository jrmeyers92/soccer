document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('newsPage')) {
        let newsRows = document.querySelectorAll('.news-row');

        let searchInput = document.getElementById('newsPage__search');

        searchInput.addEventListener('input', (e) => {
            let newsRow = document.querySelectorAll('.newsPage__row');
            
            newsRow.forEach(row => {
                let searchterm = e.target.value.toLocaleLowerCase();
                row.classList.remove('hidden');

                let date = row.querySelector('.newsPage__row-date').textContent.toLocaleLowerCase();
                let category = row.querySelector('.newsPage__row-category').textContent.toLocaleLowerCase()
                let title = row.querySelector('.newsPage__row-title').textContent.toLocaleLowerCase()

                if (date.includes(searchterm) || title.includes(searchterm) || category.includes(searchterm)) {

                } else {
                    row.classList.add('hidden');
                }
                
                
            })

        })

    }
})