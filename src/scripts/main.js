'use strict';

const tbody = document.querySelector('tbody');
const th = document.querySelector('thead tr');

// When the user clicks on a row, it should become selected
tbody.addEventListener('click', (e) => {
  const rowClicked = e.target.closest('tr');

  if (!rowClicked) {
    return;
  }

  const previousActive = tbody.querySelector('tr.active');

  if (previousActive && previousActive !== rowClicked) {
    previousActive.classList.remove('active');
  }

  rowClicked.classList.add('active');
});

let sortDirection = 'asc';
let currentColumn = -1;

th.addEventListener('click', (e) => {
  if (e.target.tagName !== 'TH') {
    return;
  }

  const rows = [...tbody.querySelectorAll('tr')];
  const index = e.target.cellIndex;

  if (currentColumn === index) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    currentColumn = index;
    sortDirection = 'asc';
  }

  rows.sort((a, b) => {
    const first = a.cells[index].textContent;
    const second = b.cells[index].textContent;

    const fn = first.replace('$', '').replaceAll(',', '');
    const sn = second.replace('$', '').replaceAll(',', '');

    if (!isNaN(fn) && !isNaN(sn)) {
      return sortDirection === 'asc'
        ? Number(fn) - Number(sn)
        : Number(sn) - Number(fn);
    }

    return sortDirection === 'asc'
      ? first.localeCompare(second)
      : second.localeCompare(first);
  });

  tbody.append(...rows);
});
