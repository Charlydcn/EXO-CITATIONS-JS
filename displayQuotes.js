const quotesContainer = document.querySelector('#quotes')

// on itère sur chaque propriétés de l'objet quotes (en clé/valeur : author/quote)
for (const [author, quote] of Object.entries(quotes)) {
    const blockquote = document.createElement('blockquote')

    const text = document.createElement('p')
    text.innerHTML = `"${quote}"`
    blockquote.appendChild(text)

    const footer = document.createElement('footer')
    footer.innerHTML = author
    blockquote.appendChild(footer)

    const favHeart = document.createElement('i')
    favHeart.classList.add('fa-heart')
    blockquote.appendChild(favHeart)

    quotesContainer.appendChild(blockquote)
}

const favHearts = document.querySelectorAll('blockquote i')

favHearts.forEach((favHeart) => {
    // on récupère le texte du parent du bouton coeur (c'est-à-dire la citation)
    const quoteText = favHeart.parentNode.querySelector('p').innerText.trim()
    const isLiked = localStorage.getItem(quoteText) === 'liked'
    console.log(quoteText)

    if(isLiked) {
        favHeart.classList.add('fa-regular')
        favHeart.classList.remove('fa-solid')
        localStorage.setItem(quoteText, 'liked')
    } else {
        favHeart.classList.add('fa-solid')
        favHeart.classList.remove('fa-regular')
        localStorage.setItem(quoteText, 'not liked')
    }

    favHeart.addEventListener('click', () => {
        like(quoteText, favHeart)
    })
})

function like(quoteText, favHeart) {

    if(favHeart.classList.contains('fa-solid')) {
        favHeart.classList.remove('fa-solid')
        favHeart.classList.add('fa-regular')

        localStorage.setItem(quoteText, 'not liked')
    } else {
        favHeart.classList.add('fa-solid')
        favHeart.classList.remove('fa-regular')
        
        localStorage.setItem(quoteText, 'liked')
    }
}

/* 
    ce qui nous donne:    

    <blockquote>
        <p>la citation</p>
        <footer>l'auteur</footer>
    </blockquote>
*/

