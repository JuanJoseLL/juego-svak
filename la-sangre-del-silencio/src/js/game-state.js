// Game state management

class GameState {
    constructor() {
        this.playerChoices = {};
        this.consciousnessPoints = 0;
        this.hatePoints = 0;
        this.currentScene = null;
        this.finalOutcome = null;
    }

    setPlayerChoice(choice) {
        if (!choice) return;
        
        // Store the choice
        if (choice.id) {
            this.playerChoices[choice.id] = choice;
        }
        
        // Update points based on choice type
        this.updatePoints(choice);
    }

    updatePoints(choice) {
        if (!choice) return;
        
        if (choice.type === 'consciousness') {
            this.consciousnessPoints += choice.value || 1;
            console.log("GameState: Updated consciousness points to", this.consciousnessPoints);
        } else if (choice.type === 'hate') {
            this.hatePoints += choice.value || 1;
            console.log("GameState: Updated hate points to", this.hatePoints);
        }
    }

    setCurrentScene(scene) {
        this.currentScene = scene;
    }

    determineFinalOutcome() {
        if (this.hatePoints > this.consciousnessPoints) {
            this.finalOutcome = 'violent';
        } else if (this.hatePoints === this.consciousnessPoints) {
            this.finalOutcome = 'partial';
        } else {
            this.finalOutcome = 'hopeful';
        }
        
        return this.finalOutcome;
    }

    resetGame() {
        this.playerChoices = {};
        this.consciousnessPoints = 0;
        this.hatePoints = 0;
        this.currentScene = null;
        this.finalOutcome = null;
    }
}

// Make it available to the window scope
window.GameState = GameState;