// Словарь с описаниями терминов
const descriptions = {
    "Сундук": "Сундук — это контейнер для хранения предметов в Minecraft. Он может быть открыт правым кликом мыши и позволяет игрокам хранить предметы для дальнейшего использования.",
    "Куб": "Куб — это основной элемент игрового мира Minecraft. Все объекты в игре представляют собой кубы, и мир состоит из этих кубических блоков.",
    "Крипер": "Крипер — это враждебный моб, который взрывается при приближении игрока. Он является одним из самых известных врагов в Minecraft.",
    "Редстоун": "Редстоун — это материал, используемый для создания различных механизмов в Minecraft. Он может быть использован для создания электрических цепей и автоматизированных систем.",
    "Алмаз": "Алмаз — один из самых ценных ресурсов в Minecraft, используемый для создания мощных инструментов и брони.",
    "Дерево": "Дерево — это основной ресурс, используемый для создания деревянных предметов, таких как инструменты, дома и мебель.",
    "Тростник": "Тростник — это растение, которое используется для создания бумаги и печатания книг, а также для производства сахара.",
    "Портал": "Портал — это структура, используемая для путешествия между различными мирами в Minecraft, например, в Нижний мир или в Край.",
    "Скелет": "Скелет — это враждебный моб, который стреляет из лука и является одним из самых распространенных врагов в Minecraft.",
    "Мифрил": "Мифрил — редкий металл, используемый для создания мощной брони и оружия. Он является частью модов в Minecraft, так как не встречается в стандартной игре."
};

// Функция для отображения описания термина
function showDescription(term) {
    const description = descriptions[term];
    const descriptionDiv = document.getElementById("term-description");
    descriptionDiv.innerHTML = `<p><strong>${term}</strong>: ${description}</p>`;
}

// Функция для поиска терминов
function searchTerm() {
    const input = document.getElementById("search").value.toLowerCase();
    const terms = document.getElementsByClassName("term");
    
    // Скрыть те термины, которые не соответствуют поисковому запросу
    for (let i = 0; i < terms.length; i++) {
        let term = terms[i];
        if (term.innerText.toLowerCase().includes(input)) {
            term.style.display = "block";
        } else {
            term.style.display = "none";
        }
    }
}
