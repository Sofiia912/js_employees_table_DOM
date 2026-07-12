'use strict';

const tbody = document.querySelector('tbody');

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
