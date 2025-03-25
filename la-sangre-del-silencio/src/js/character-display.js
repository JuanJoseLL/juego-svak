// Character display management

class CharacterDisplay {
    constructor(characters, imageAssets) {
        this.characters = characters;
        this.imageAssets = imageAssets;
        this.currentCharacter = null;
    }

    // Show a character on screen
    showCharacter(characterName) {
        // Remove any existing character
        this.removeCharacter();
        
        // Find the character data
        const character = this.characters.find(c => c.name === characterName);
        if (!character) {
            console.warn(`Character not found: ${characterName}`);
            return;
        }
        
        // Find the character image asset key (convert spaces to underscores and lowercase)
        const imageKey = characterName.replace(/\s+/g, '_').toLowerCase();
        
        // Create portrait element
        const portraitEl = document.createElement('div');
        portraitEl.className = 'character-portrait';
        portraitEl.id = 'current-character';
        
        // Set background image if available
        if (this.imageAssets[imageKey]) {
            portraitEl.style.backgroundImage = `url(${this.imageAssets[imageKey].src})`;
        } else {
            console.warn(`Character image not found: ${imageKey}`);
            // Use a generic silhouette as fallback
            portraitEl.style.backgroundImage = 'url(assets/images/characters/silhouette.png)';
        }
        
        // Add data attributes for accessibility and future reference
        portraitEl.dataset.character = characterName;
        portraitEl.dataset.role = character.role;
        
        // Add to scene container
        const sceneContainer = document.getElementById('scene-container');
        if (sceneContainer) {
            sceneContainer.appendChild(portraitEl);
            this.currentCharacter = characterName;
        }
    }
    
    // Remove the current character from display
    removeCharacter() {
        const existingPortrait = document.getElementById('current-character');
        if (existingPortrait) {
            existingPortrait.remove();
        }
        this.currentCharacter = null;
    }
    
    // Fade transition between characters
    transitionCharacter(fromCharacter, toCharacter) {
        // First fade out current character
        const existingPortrait = document.getElementById('current-character');
        
        if (existingPortrait) {
            existingPortrait.style.transition = 'opacity 0.5s';
            existingPortrait.style.opacity = '0';
            
            // After fade out, show new character
            setTimeout(() => {
                this.removeCharacter();
                this.showCharacter(toCharacter);
                
                // Fade in new character
                const newPortrait = document.getElementById('current-character');
                if (newPortrait) {
                    newPortrait.style.opacity = '0';
                    newPortrait.style.transition = 'opacity 0.5s';
                    
                    setTimeout(() => {
                        newPortrait.style.opacity = '1';
                    }, 50);
                }
            }, 500);
        } else {
            // No existing character, just show the new one
            this.showCharacter(toCharacter);
        }
    }
}

// Export the class
export default CharacterDisplay;