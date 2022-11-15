const cBlocks = document.querySelectorAll('.colorBlock');
const genBtn = document.querySelector('.generateButton');

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if(type === 'lock') {
    const lock = event.target;
    lock.classList.toggle('fa-lock-open');
    lock.classList.toggle('fa-lock');
  } else if (type === 'copy') copyToClick(event.target.textContent);
});

function randomColorGenerator() {
  const hexColors = '1234567890ABCDEF';
  let color = '';
  for(let i = 0; i < 6; i++) {
    color += hexColors[Math.floor(Math.random() * hexColors.length)];
  }
  return '#' + color;
}

function setElsColor(els, color) {
  const luminance = chroma(color).luminance();
  els.style.color = luminance > 0.5 ? 'black' : 'white';
}

function setRandomColors() {
  cBlocks.forEach((cBlock) => {
    const isLocked = cBlock.querySelector('i').classList.contains('fa-lock');
    const hexText = cBlock.querySelector('h2');
    const button = cBlock.querySelector('button');
    const color = randomColorGenerator();
    
    if(isLocked) return;
    
    cBlock.style.background = color;
    hexText.textContent = color;
    genBtn.style.background = chroma.random();
    
    setElsColor(hexText, color);
    setElsColor(button, color);
    setElsColor(genBtn, color);
  });
}
setRandomColors();

function copyToClick(text) {
  return navigator.clipboard.writeText(text);
}

genBtn.addEventListener('click', () => {
  setRandomColors();
});
