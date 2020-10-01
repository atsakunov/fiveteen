const ROWS = 3;

const container = document.querySelector('.board');

const getRandom = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const printMatrix = (matrix) => {
  for(let i = 0; i < matrix.length; i++) {
    console.log(matrix[i])
  }
}

const generateMatrix = (rows) => {
  const result = [];
  const randomArray = [];
  for(let i = 0; i < rows; i++) {
    const tempArray = []
    for (let j = 0; j < rows; j++) {
      while(randomArray.length !== rows*rows && tempArray.length !== rows) {
        const random = getRandom(1, rows*rows) -  1
        if (!randomArray.includes(random)) {
          tempArray.push(random)
          randomArray.push(random)
        }
      }
    }
    result.push(tempArray);
  }
  return result
}

const modifyMatrix = (x, y) => {
  const current = matrix[y][x];
  if ((matrix[y - 1] && matrix[y - 1][x] !== undefined &&  matrix[y - 1][x] === 0) ) {
    matrix[y - 1][x] = current;
    matrix[y][x] = 0;
    console.log('top')
  }
  if (matrix[y + 1] && matrix[y + 1][x] === 0) {
    console.log('bottom')
    matrix[y + 1][x] = current;
    matrix[y][x] = 0;
  }
  
  if (matrix[y] !== undefined && matrix[y][x + 1] === 0) {
    console.log('right')
    matrix[y][x + 1] = current;
    matrix[y][x] = 0;
  }
  if (matrix[y][x - 1] !== undefined && matrix[y][x - 1] === 0) {
    console.log('left')
    matrix[y][x] = 0;
    matrix[y][x - 1] = current;
  }
  printMatrix(matrix)
  
  renderItems();
}

const handleClick = (e) => {
  const x = Number(e.target.dataset.x);
  const y = Number(e.target.dataset.y);
  modifyMatrix(x, y)
}


const renderItems = () => {
  container.innerHTML = '';
  for(let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      const item = document.createElement('div');
      const number = matrix[y][x];

      if (number) {
        item.classList.add('item');
        item.addEventListener('click', handleClick, true)
        item.setAttribute('data-x', x)
        item.setAttribute('data-y', y)
        item.setAttribute('style', `grid-column-start: ${x + 1};grid-row-start: ${y + 1}`)
       
        item.innerText = matrix[y][x];
      } else {
        continue;
      }
      
      container.appendChild(item);
    }
  }
}

const start = () => {
  matrix = generateMatrix(ROWS)
  container.setAttribute('style', `grid-template-columns: repeat(${ROWS}, auto)`)
  renderItems();
  // printMatrix(matrix)
}

start();
