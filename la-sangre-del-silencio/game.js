// La Sangre del Silencio - Main Game Controller

let gameState;
let dialogManager;
let storyData;

// Initialize the game
async function initGame() {
    try {
        // Load story data
        const response = await fetch('src/data/story.json');
        storyData = await response.json();
        
        // Initialize game state
        gameState = new GameState();
        
        // Initialize dialog manager
        const dialogResponse = await fetch('src/data/dialogs.json');
        const dialogData = await dialogResponse.json();
        dialogManager = new Dialog(dialogData.dialogs);
        
        // Start with introduction scene
        renderScene('introduction');
        
        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Error initializing game:', error);
    }
}


// Render a scene
function renderScene(sceneId) {
    const scene = storyData.scenes.find(s => s.id === sceneId);
    if (!scene) {
        console.error(`Scene not found: ${sceneId}`);
        return;
    }
    
    gameState.setCurrentScene(scene);
    
    // Clear previous content
    const dialogContainer = document.getElementById('dialog-container');
    const gameUI = document.getElementById('game-ui');
    dialogContainer.innerHTML = '';
    gameUI.innerHTML = '';
    
    // Display scene description
    const descriptionEl = document.createElement('div');
    descriptionEl.className = 'dialog-text';
    descriptionEl.textContent = scene.description;
    dialogContainer.appendChild(descriptionEl);
    
    // If this scene has an ending, show it
    if (scene.endings) {
        const ending = scene.endings[0];
        gameState.finalOutcome = ending.type;
        showEnding(ending);
        return;
    }
    
    // Display choices
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choice-container';
    
    scene.choices.forEach(choice => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.addEventListener('click', () => makeChoice(choice));
        choicesContainer.appendChild(button);
    });
    
    gameUI.appendChild(choicesContainer);
    
    // Update stats display
    updateStatsDisplay();
}

// Handle player choice
function makeChoice(choice) {
    // Update consciousness or hate points based on choice type
    if (choice.type === 'consciousness') {
        gameState.consciousnessPoints += choice.value || 1;
    } else if (choice.type === 'hate') {
        gameState.hatePoints += choice.value || 1;
    }
    
    // Navigate to the next scene
    renderScene(choice.nextScene);
}

// Show ending
function showEnding(ending) {
    const gameUI = document.getElementById('game-ui');
    gameUI.innerHTML = '';
    
    const endingContainer = document.createElement('div');
    endingContainer.className = 'ending-container';
    
    const endingTitle = document.createElement('h2');
    endingTitle.className = 'ending-title';
    
    if (ending.type === 'violent') {
        endingTitle.textContent = 'Final Violento';
        endingTitle.style.color = '#ff6666';
    } else if (ending.type === 'partial_consciousness' || ending.type === 'partial') {
        endingTitle.textContent = 'Final de Conciencia Parcial';
        endingTitle.style.color = '#d9a76a';
    } else if (ending.type === 'hopeful') {
        endingTitle.textContent = 'Final Esperanzador';
        endingTitle.style.color = '#80b3ff';
    }
    
    const endingDesc = document.createElement('p');
    endingDesc.className = 'ending-description';
    endingDesc.textContent = ending.description;
    
    const restartButton = document.createElement('button');
    restartButton.className = 'button';
    restartButton.textContent = 'Reiniciar Juego';
    restartButton.addEventListener('click', () => {
        gameState.resetGame();
        initGame();
    });
    
    endingContainer.appendChild(endingTitle);
    endingContainer.appendChild(endingDesc);
    endingContainer.appendChild(restartButton);
    
    gameUI.appendChild(endingContainer);
}

// Update the stats display
// Update the stats display
function updateStatsDisplay() {
    let statsContainer = document.getElementById('stats-container');
    
    if (!statsContainer) {
        statsContainer = document.createElement('div');
        statsContainer.id = 'stats-container';
        document.getElementById('game-container').appendChild(statsContainer);
    }
    
    // Clear previous content
    statsContainer.innerHTML = '';
    
    // Create consciousness stat element
    const consciousnessEl = document.createElement('div');
    consciousnessEl.className = 'stat consciousness-stat';
    consciousnessEl.innerHTML = `
        <span>Conciencia:</span>
        <span>${gameState.consciousnessPoints}</span>
    `;
    statsContainer.appendChild(consciousnessEl);
    
    // Create hatred stat element
    const hatredEl = document.createElement('div');
    hatredEl.className = 'stat hatred-stat';
    hatredEl.innerHTML = `
        <span>Odio:</span>
        <span>${gameState.hatePoints}</span>
    `;
    statsContainer.appendChild(hatredEl);
    
    console.log("Stats updated:", gameState.consciousnessPoints, gameState.hatePoints);
}

// Start the game when the window loads
window.onload = initGame;