const baseUrl = 'https://fdnd.directus.app/items/person/';
const othersFilter = '?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"CMD%20Minor%20Web%20Dev"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}';
const othersUrl = baseUrl + othersFilter;

const section = document.querySelector("#card-block section")

async function loadData() {
    try {
        const fetchedOthers = await fetch(othersUrl);
        const othersData = await fetchedOthers.json();

        console.log(othersData.data)

        section.innerHTML = `
            ${othersData.data.map((person, index) => `
                <article>
                    <img src="${person.avatar ? person.avatar : "./img/image.png"}" alt="avatar">
                    <div>
                        <div class="rating-${amountOfStars()}">
                            <p>★</p><p>★</p><p>★</p><p>★</p><p>★</p>
                        </div>
                        <label for="liked-${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 203.08 179.37">
                                <path class="cls-1" d="M101.5,172.29L19.64,90.44C.12,70.91.12,39.25,19.64,19.73S70.83.2,90.36,19.73l11.14,11.15,11.23-11.23C132.25.12,163.91.12,183.44,19.64c19.53,19.53,19.53,51.18,0,70.71l-81.94,81.94Z"/>
                            </svg>
                        </label>
                        <input type="checkbox" id="liked-${index}">
                    </div>
                    <h3>${person.name}</h3>
                    ${person.bio ? `<p>${shortenText(person.bio)}</p>` : `<p>geen beschrijving</p>`}
                    <h3>€ ${createPrice()}</h3>
                    <button type="submit">kopen</button>
                </article>
            `).join('')}
        `;
    } catch (error) {
        console.error('Error loading data:', error);
        document.body.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

loadData();

function createPrice() {
    const price = Math.floor(Math.random() * 1000) + 1
    return price
}

function amountOfStars() {
    const amount = Math.floor(Math.random() * 5) + 1
    return amount
}

function shortenText(text) {
    const shortenedText = text.length > 200 ? text.slice(0, 200) + "..." : text
    return shortenedText
}