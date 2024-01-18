const quotesContainer = document.querySelector('#quotes')

// on itère sur chaque propriétés de l'objet quotes (en clé/valeur : author/quote)
// on créé et affiche tous les éléments
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

// pour chaque coeur,
favHearts.forEach((favHeart) => {
    // on récupère le texte de citation du blockquote correspondant au coeur cliqué
    const quoteText = favHeart.parentNode.querySelector('p').innerText.trim()
    // si en local storage, une donnée est stocké avec comme clé: la citation et la valeur: "liked", alors la citation est liked
    const isLiked = localStorage.getItem(quoteText) === 'liked'

    // si la citation est liked, on ajoute la classe pour mettre le coeur rempli
    if(isLiked) {
        favHeart.classList.remove('fa-regular')
        favHeart.classList.add('fa-solid')
        localStorage.setItem(quoteText, 'liked')
    // et si la citation n'est pas like, on ajoute la classe pour avoir le coeur vide
    } else {
        favHeart.classList.remove('fa-solid')
        favHeart.classList.add('fa-regular')
        localStorage.removeItem(quoteText)
    }

    // appelle la fonction like() à chaque clic sur un coeur avec en paramètre le texte de la citation déclaré plus haut, et le coeur cliqué
    favHeart.addEventListener('click', () => {
        like(quoteText, favHeart)
    })
})

// remplir et vider le coeur en fonction de son état (fa-solid = coeur plein, fa-regular = coeur vide)
// et stocker en local storage une donnée sous forme de clé => valeur, la clé = le texte de la citation, la valeur = "liked"
// de cette manière, si la citation est liké, il y aura en local storage une donnée 'texte de la citation' => 'liked'
// et si la citation n'est pas liké, il n'y aura rien en local storage la concernant
function like(quoteText, favHeart) {
    if(favHeart.classList.contains('fa-solid')) {
        favHeart.classList.remove('fa-solid')
        favHeart.classList.add('fa-regular')

        localStorage.removeItem(quoteText)
    } else {
        favHeart.classList.add('fa-solid')
        favHeart.classList.remove('fa-regular')
        
        localStorage.setItem(quoteText, 'liked')
    }
}

