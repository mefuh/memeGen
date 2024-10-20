document.addEventListener('DOMContentLoaded', () => {
    const memeImage = document.getElementById('memeImage');
    const newMemeButton = document.getElementById('newMemeButton');
    const loadingContainer = document.querySelector('.loading-container');
    const themeToggleButton = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const lightThemeClass = 'light-theme';
    const body = document.body;

    if (screen.orientation) {
        screen.orientation.lock('portrait').catch(function(error) {
            console.log('Orientation lock error: ', error);
        });
    }
    
    // Переключение темы
    function updateThemeIcon() {
        if (document.body.classList.contains(lightThemeClass)) {
            themeIcon.src = 'https://cdn-icons-png.flaticon.com/512/116/116254.png';
        } else {
            themeIcon.src = 'https://cdn-icons-png.flaticon.com/512/116/116274.png';
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        body.classList.add('light-theme');
    }

    updateThemeIcon();

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const currentTheme = body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
        localStorage.setItem('theme', currentTheme);
        updateThemeIcon();
    });

    newMemeButton.addEventListener('click', async () => {
        // Скрываем кнопку и показываем индикатор загрузки
        themeToggleButton.style.display = 'none';
        newMemeButton.style.display = 'none'; // Скрываем кнопку
        loadingContainer.style.display = 'flex'; // Показываем индикатор загрузки
        memeImage.style.display = 'none';

        try {
            const memeUrl = await fetchMeme();
            memeImage.src = memeUrl;
            memeImage.style.display = 'block'; // Показываем изображение
        } catch (error) {
            console.error('Ошибка загрузки мема:', error);
        } finally {
            // Прячем индикатор загрузки и показываем кнопку после загрузки изображения
            loadingContainer.style.display = 'none'; // Скрываем индикатор загрузки
            newMemeButton.style.display = 'block'; // Показываем кнопку
            themeToggleButton.style.display = 'flex';
        }
    });

    async function fetchMeme() {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();
        return data.url; // Возвращаем URL мема
    }
});

