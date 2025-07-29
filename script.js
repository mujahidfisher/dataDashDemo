const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRo4CJp5Iey-vUWWaYez8vImsB3ZdSMUaBhS6meu2kjtz3MniyvEQUjKmPkpgUJ6KD0R1VYc1Cgkim3/pubhtml';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
}

function showInfo(data, tabletop) {
  const container = document.getElementById('dashboard');
  container.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
   <h3>${item.["Up Coming Trips"]}</h3>
  <p><strong>Number:</strong> ${item.Number}</p>
  <p><strong>Shift Ends:</strong> ${item["Shift Ends"]}</p>
  <p><strong>Address:</strong> ${item.Address}</p>
  <p><small><strong>Timestamp:</strong> ${item.Timestamp}</small></p>
    `;
    container.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', init);