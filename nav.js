const baseUrl = 'https://fdnd.directus.app/items/person/';
const othersFilter = '?filter={"_and":[{"squads":{"squad_id":{"tribe":{"name":"CMD%20Minor%20Web%20Dev"}}}},{"squads":{"squad_id":{"cohort":"2425"}}}]}';
const othersUrl = baseUrl + othersFilter;

async function loadData() {
    try {
        const fetchedOthers = await fetch(othersUrl);
        const othersData = await fetchedOthers.json();

        document.body.innerHTML = `
            <h1>Class Information</h1>
            <h2>Total Students: ${othersData.data.filter(obj => obj.hasOwnProperty('id')).length}</h2>
            <h2>Nicknames</h2>
            <ul>
                ${othersData.data
                    .map(obj => obj.nickname)
                    .filter(nickname => nickname !== null && nickname !== "")
                    .sort(() => Math.random() - 0.5)
                    .map(nickname => `<li>${nickname}</li>`)
                    .join('')}
            </ul>
            <h2>Random Bio</h2>
            ${(() => {
                const biosWithContent = othersData.data.filter(obj => obj.bio !== null && obj.bio !== "");
                const randomPerson = biosWithContent[Math.floor(Math.random() * biosWithContent.length)];
                return `
                    <div class="person-card">
                        <h3>${randomPerson.name}</h3>
                        <p>${randomPerson.bio}</p>
                    </div>
                `;
            })()}
            <h2>All Class Members</h2>
            ${othersData.data.map(person => `
                <div class="person-card">
                    <h3>${person.name}</h3>
                    ${person.nickname ? `<p>Nickname: ${person.nickname}</p>` : ''}
                    ${person.bio ? `<p>Bio: ${person.bio}</p>` : ''}
                </div>
            `).join('')}
        `;
    } catch (error) {
        console.error('Error loading data:', error);
        document.body.innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

loadData();
 