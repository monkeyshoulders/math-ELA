function createDivisionTable() {
  const container = document.getElementById('division-tables');

  for (let i = 1; i <= 12; i++) {
      const section = document.createElement('div');
      section.className = 'section';

      const header = document.createElement('h2');
      header.textContent = `Division by ${i}'s`;
      section.appendChild(header);

      const table = document.createElement('div');
      table.className = 'table';

      for (let j = 1; j <= 12; j++) {
          const cell = document.createElement('div');
          cell.className = 'cell';

          const dividend = i * j;
          const label = document.createElement('label');
          label.textContent = `${dividend} ÷ ${i} = `;

          const input = document.createElement('input');
          input.type = 'number';
          input.dataset.correctAnswer = j;

          cell.appendChild(label);
          cell.appendChild(input);
          table.appendChild(cell);
      }

      const checkButton = document.createElement('button');
      checkButton.textContent = 'Check Answers';  
      checkButton.className = 'check-button';              
      checkButton.addEventListener('click', () => {
          const inputs = section.querySelectorAll('input');
          inputs.forEach(input => {
              const isCorrect = parseInt(input.value) === parseInt(input.dataset.correctAnswer);
              input.style.backgroundColor = isCorrect ? 'lightgreen' : 'lightcoral';
          });
      });

      const clearButton = document.createElement('button');
      clearButton.textContent = 'Clear Answers';
      clearButton.className = 'clear-button';
      clearButton.addEventListener('click', () => {
          const inputs = section.querySelectorAll('input');
          inputs.forEach(input => {
              input.value = '';
              input.style.backgroundColor = '';
          });
      });

      section.appendChild(table);
      section.appendChild(checkButton);
      section.appendChild(clearButton);
      container.appendChild(section);
  }
}

createDivisionTable();