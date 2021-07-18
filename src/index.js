/* eslint-disable no-param-reassign */
(function react(doc, win) {
  const $ = (selector) => doc.querySelectorAll(selector);

  const state = {};

  const getState = (pos) => state[pos];

  const useState = (initialValue) => {
    const { length } = Object.entries(state);

    state[`state-${length}`] = initialValue;

    const setState = (newValue) => {
      state[`state-${length}`] = newValue;
    };

    const get = () => getState(`state-${length}`);

    return [get, setState];
  };

  win.react = { $, useState, getState };
})(document, window);
(function main(doc, win, { $, useState }) {
  // Dom elements
  const columns = $('.column');
  const currentText = $('[data-js="current"]')[0];
  const resetButton = $('button')[0];

  // App
  const [getGameOn, setGameOn] = useState(true);
  const [getCurrent, setCurrent] = useState('X');
  const [getMatrix, setMatrix] = useState([
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ]);

  const setWinGame = (line) => {
    columns[line[0]].classList.add('active');
    columns[line[1]].classList.add('active');
    columns[line[2]].classList.add('active');
    setGameOn(false);
    return () => win.alert(`O jogador ${getCurrent} ganhou!`);
  };

  const checkGame = () => {
    const m = getMatrix();
    // Linhas
    if (m[0] === m[1] && m[1] === m[2]) return setWinGame([0, 1, 2]);
    if (m[3] === m[4] && m[4] === m[5]) return setWinGame([3, 4, 5]);
    if (m[6] === m[7] && m[7] === m[8]) return setWinGame([6, 7, 8]);

    // Colunas
    if (m[0] === m[3] && m[3] === m[6]) return setWinGame([0, 3, 6]);
    if (m[1] === m[4] && m[4] === m[7]) return setWinGame([1, 4, 7]);
    if (m[2] === m[5] && m[5] === m[8]) return setWinGame([2, 5, 8]);

    // Diagonais
    if (m[0] === m[4] && m[4] === m[8]) return setWinGame([0, 4, 8]);
    if (m[2] === m[4] && m[4] === m[6]) return setWinGame([2, 4, 6]);
    return '';
  };

  const onClick = (item) => {
    const m = getMatrix();
    const pos = +item.getAttribute('data-pos');

    if (!getGameOn() || m[pos] === 'X' || m[pos] === 'O') return;

    item.innerHTML = getCurrent();

    m[pos] = getCurrent();
    setCurrent(getCurrent() === 'X' ? 'O' : 'X');
    currentText.innerText = getCurrent();

    checkGame();
  };

  // Add event to DOM
  columns.forEach((column) =>
    column.addEventListener('click', () => onClick(column), false)
  );
  resetButton.addEventListener(
    'click',
    () => {
      setGameOn(true);
      setCurrent('X');
      setMatrix(['0', '1', '2', '3', '4', '5', '6', '7', '8']);
      columns.forEach((column) => {
        column.innerText = '';
        column.classList.remove('active');
      });
    },
    false
  );
})(document, window, window.react);
