/* eslint-disable no-param-reassign */
(function main(doc, win) {
  // Functions
  const $ = (selector) => doc.querySelectorAll(selector);

  // Dom elements
  const columns = $('.column');
  const currentText = $('[data-js="current"]')[0];
  const resetButton = $('button')[0];

  // App
  let gameOn = true;
  let current = 'X';
  let matrix = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

  const setWinGame = (line) => {
    columns[line[0]].classList.add('active');
    columns[line[1]].classList.add('active');
    columns[line[2]].classList.add('active');
    gameOn = false;
    return () => win.alert(`O jogador ${current} ganhou!`);
  };

  const checkGame = () => {
    // Linhas
    if (matrix[0] === matrix[1] && matrix[1] === matrix[2])
      return setWinGame([0, 1, 2]);
    if (matrix[3] === matrix[4] && matrix[4] === matrix[5])
      return setWinGame([3, 4, 5]);
    if (matrix[6] === matrix[7] && matrix[7] === matrix[8])
      return setWinGame([6, 7, 8]);

    // Colunas
    if (matrix[0] === matrix[3] && matrix[3] === matrix[6])
      return setWinGame([0, 3, 6]);
    if (matrix[1] === matrix[4] && matrix[4] === matrix[7])
      return setWinGame([1, 4, 7]);
    if (matrix[2] === matrix[5] && matrix[5] === matrix[8])
      return setWinGame([2, 5, 8]);

    // Diagonais
    if (matrix[0] === matrix[4] && matrix[4] === matrix[8])
      return setWinGame([0, 4, 8]);
    if (matrix[2] === matrix[4] && matrix[4] === matrix[6])
      return setWinGame([2, 4, 6]);
    return '';
  };

  const onClick = (item) => {
    const pos = +item.getAttribute('data-pos');

    if (!gameOn || matrix[pos] === 'X' || matrix[pos] === 'O') return;

    item.innerHTML = current;

    matrix[pos] = current;
    current = current === 'X' ? 'O' : 'X';
    currentText.innerText = current;

    checkGame();
  };

  // Add event to DOM
  columns.forEach((column) =>
    column.addEventListener('click', () => onClick(column), false)
  );
  resetButton.addEventListener(
    'click',
    () => {
      gameOn = true;
      current = 'X';
      matrix = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
      columns.forEach((column) => {
        column.innerText = '';
        column.classList.remove('active');
      });
    },
    false
  );
})(document, window);
