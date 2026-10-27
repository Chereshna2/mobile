document.addEventListener('DOMContentLoaded', () => {
  console.log('ReadetReach: расширенный функционал активирован');


  const catalogGrid = document.querySelector('.catalog-grid');
  
  let books = JSON.parse(localStorage.getItem('readetreach_books')) || [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: '📘' },
    { title: '1984', author: 'George Orwell', cover: '📙' },
    { title: 'Moby Dick', author: 'Herman Melville', cover: '📗' },
    { title: 'Hamlet', author: 'William Shakespeare', cover: '📕' }
  ];

  function renderBooks() {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';
    
    books.forEach((book, index) => {
      const card = document.createElement('article');
      card.className = 'book-card';
      card.innerHTML = `
        <div class="book-cover">${book.cover}</div>
        <h2 class="book-title">${book.title}</h2>
        <p class="book-author">${book.author}</p>
        <button class="btn-primary read-btn" data-index="${index}">Читать</button>
      `;
      catalogGrid.appendChild(card);
    });

    document.querySelectorAll('.read-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        alert(`Открываем читалку для: "${books[idx].title}"`);
      });
    });
  }

  renderBooks();


  const dictionaryList = document.querySelector('.dictionary-list');
  
  let words = JSON.parse(localStorage.getItem('readetreach_words')) || [
    { term: 'Resilient', translation: 'Устойчивый, гибкий' },
    { term: 'Ubiquitous', translation: 'Вездесущий' },
    { term: 'Ephemeral', translation: 'Эфемерный, непродолжительный' }
  ];

  function renderWords() {
    if (!dictionaryList) return;
    dictionaryList.innerHTML = '';

    words.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'word-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <span class="word-term">${item.term}</span>
        <span class="word-translation" style="filter: blur(4px); transition: filter 0.2s;" title="Нажмите, чтобы показать перевод">${item.translation}</span>
      `;
      
      card.addEventListener('click', () => {
        const transSpan = card.querySelector('.word-translation');
        if (transSpan.style.filter === 'blur(4px)') {
          transSpan.style.filter = 'none';
        } else {
          transSpan.style.filter = 'blur(4px)';
        }
      });

      dictionaryList.appendChild(card);
    });
  }

  renderWords();


  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});