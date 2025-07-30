const csvUrl = 'https://corsproxy.io/?https://docs.google.com/spreadsheets/d/e/2PACX-1vRjtcxLpmmODBhZtHf9MTsJ3Qxdcn_-zPD1coyELfBhXUeJzO5ENrrtP0uu4QvPIPlHIhv2nUNFEwfg/pub?output=csv';

async function linkPublishedGoogleSheet() {
  try {
    const response = await fetch(`${csvUrl}&cachebust=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      cache: 'no-store'
    });

    const csvText = await response.text();
    console.log('Sheet linked successfully');

    const rows = csvText.trim().split('\n').map(row => row.split(','));
    const headers = rows[0];
    const dataRows = rows.slice(1);

    // Insert headers
    const thead = document.querySelector('thead tr');
    thead.innerHTML = '';
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      thead.appendChild(th);
    });

    // Insert data
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    dataRows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.textContent = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    console.log(`Updated table with ${dataRows.length} rows`);
    console.log('Fetched headers:', headers);
    console.log('First data row:', dataRows[0]);

  } catch (error) {
    console.error('Failed to link sheet:', error);
  }
}

linkPublishedGoogleSheet();