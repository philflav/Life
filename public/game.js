class GameOfLife {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = 10;
        this.cols = Math.floor(canvas.width / this.cellSize);
        this.rows = Math.floor(canvas.height / this.cellSize);
        this.grid = this.createGrid();
        this.isRunning = false;
        this.intervalId = null;
        this.generation = 0;
        this.livingCells = 0;
        this.populationHistory = [];
        this.selectedPattern = null;
        
        // Pattern definitions
        this.patterns = {
            glider: [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1]
            ],
            blinker: [
                [1, 1, 1]
            ],
            beacon: [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 1, 1],
                [0, 0, 1, 1]
            ],
            pulsar: [
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
            ],
            pentadecathlon: [
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
                [0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
            ],
            gliderGun: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ],
            LWSS: [
                [0, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [0, 0, 0, 0, 1],
                [1, 0, 0, 1, 0]
            ],
            loaf: [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [0, 1, 0, 1],
                [0, 0, 1, 0]
            ],
            toad: [
                [0, 1, 1, 1],
                [1, 1, 1, 0]
            ],
            diehard: [
                [0, 0, 0, 0, 0, 0, 1, 0],
                [1, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 1, 1, 1]
            ],
            acorn: [
                [0, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [1, 1, 0, 0, 1, 1, 1]
            ],
            block: [
                [1, 1],
                [1, 1]
            ],
            beehive: [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [0, 1, 1, 0]
            ],
            rpentomino: [
                [0, 1, 1],
                [1, 1, 0],
                [0, 1, 0]
            ],
            HWSS: [
                [0, 0, 1, 1, 1, 1, 1],
                [0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 1, 0],
                [1, 0, 1, 1, 0, 0, 0]
            ],
            clock: [
                [0, 1, 1, 0],
                [1, 0, 1, 0],
                [0, 1, 0, 1],
                [0, 1, 1, 0]
            ],
            octagon: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0]
            ],
            galaxy: [
                [1, 1, 1, 1, 1, 1, 0],
                [1, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 0, 0, 1, 0],
                [1, 0, 0, 0, 0, 1, 0],
                [0, 0, 1, 1, 1, 1, 1]
            ],
            queenBee: [
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [1, 0, 0, 1],
                [0, 1, 1, 0]
            ]
        };

        // Initialize the population chart
        this.chart = new Chart(document.getElementById('populationChart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Living Cells',
                    data: [],
                    borderColor: '#4CAF50',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Generation'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Population'
                        },
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });

        // Add click event listener to place patterns or toggle cells
        this.canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);
            
            if (this.selectedPattern) {
                this.placePattern(row, col, this.selectedPattern);
            } else {
                this.grid[row][col] = !this.grid[row][col];
            }
            
            this.updateCounters();
            this.draw();
        });
    }

    createGrid() {
        return Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    }

    placePattern(startRow, startCol, patternName) {
        const pattern = this.patterns[patternName];
        if (!pattern) return;

        // Calculate the center offset
        const rowOffset = Math.floor(pattern.length / 2);
        const colOffset = Math.floor(pattern[0].length / 2);

        // Place the pattern centered on the click
        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[0].length; col++) {
                const gridRow = (startRow - rowOffset + row + this.rows) % this.rows;
                const gridCol = (startCol - colOffset + col + this.cols) % this.cols;
                this.grid[gridRow][gridCol] = pattern[row][col] === 1;
            }
        }
    }

    setSelectedPattern(patternName) {
        this.selectedPattern = patternName;
    }

    randomize() {
        this.grid = this.grid.map(row => row.map(() => Math.random() > 0.7));
        this.generation = 0;
        this.populationHistory = [];
        this.updateCounters();
        this.updateChart();
        this.draw();
    }

    clear() {
        this.grid = this.createGrid();
        this.generation = 0;
        this.populationHistory = [];
        this.updateCounters();
        this.updateChart();
        this.draw();
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = (row + i + this.rows) % this.rows;
                const newCol = (col + j + this.cols) % this.cols;
                if (this.grid[newRow][newCol]) count++;
            }
        }
        return count;
    }

    countLivingCells() {
        return this.grid.reduce((sum, row) => 
            sum + row.reduce((rowSum, cell) => rowSum + (cell ? 1 : 0), 0), 0);
    }

    updateChart() {
        // Add new data point
        this.populationHistory.push(this.livingCells);
        
        // Keep only the last 50 generations for better visibility
        if (this.populationHistory.length > 50) {
            this.populationHistory.shift();
        }

        // Update chart data
        this.chart.data.labels = Array.from({ length: this.populationHistory.length }, 
            (_, i) => Math.max(0, this.generation - this.populationHistory.length + 1 + i));
        this.chart.data.datasets[0].data = this.populationHistory;
        
        // Update the chart
        this.chart.update();
    }

    updateCounters() {
        this.livingCells = this.countLivingCells();
        document.getElementById('generationCount').textContent = this.generation;
        document.getElementById('livingCount').textContent = this.livingCells;
        this.updateChart();
    }

    nextGeneration() {
        const newGrid = this.createGrid();
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col);
                if (this.grid[row][col]) {
                    newGrid[row][col] = neighbors === 2 || neighbors === 3;
                } else {
                    newGrid[row][col] = neighbors === 3;
                }
            }
        }
        this.grid = newGrid;
        this.generation++;
        this.updateCounters();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = '#ccc';
        this.ctx.fillStyle = '#000';

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;
                
                // Draw grid lines
                this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                
                // Fill living cells
                if (this.grid[row][col]) {
                    this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
            }
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.intervalId = setInterval(() => {
                this.nextGeneration();
                this.draw();
            }, 100);
        }
    }

    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.intervalId);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new GameOfLife(canvas);
    game.updateCounters();
    game.draw();

    // Add button event listeners
    document.getElementById('startBtn').addEventListener('click', () => game.start());
    document.getElementById('stopBtn').addEventListener('click', () => game.stop());
    document.getElementById('clearBtn').addEventListener('click', () => game.clear());
    document.getElementById('randomBtn').addEventListener('click', () => game.randomize());

    // Add pattern selection listeners
    const patternButtons = document.querySelectorAll('.pattern-btn');
    let activeButton = null;

    patternButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active state from previous button
            if (activeButton) {
                activeButton.style.backgroundColor = '#4CAF50';
            }

            // If clicking the same button, deselect it
            if (activeButton === button) {
                game.setSelectedPattern(null);
                activeButton = null;
            } else {
                // Set new active button
                button.style.backgroundColor = '#45a049';
                activeButton = button;
                game.setSelectedPattern(button.dataset.pattern);
            }
        });
    });

    // Add tooltip positioning
    document.querySelectorAll('.pattern-btn').forEach(btn => {
        btn.addEventListener('mouseover', (e) => {
            const tooltip = btn.querySelector('.tooltip');
            const btnRect = btn.getBoundingClientRect();
            tooltip.style.top = (btnRect.top + btnRect.height/2 - tooltip.offsetHeight/2) + 'px';
            tooltip.style.left = (btnRect.left - tooltip.offsetWidth - 10) + 'px';
        });
    });
});
