// Dialog system for character interactions

class Dialog {
    constructor(dialogData) {
        this.dialogData = dialogData;
        this.currentDialog = null;
        this.dialogIndex = 0;
    }

    startDialog(dialogId) {
        this.currentDialog = this.dialogData.find(d => d.id === dialogId);
        
        if (!this.currentDialog) {
            console.error(`Dialog not found: ${dialogId}`);
            return;
        }
        
        this.dialogIndex = 0;
        this.displayDialog();
    }

    displayDialog() {
        if (!this.currentDialog) return;
        
        const dialogContainer = document.getElementById('dialog-container');
        dialogContainer.innerHTML = '';
        
        // Show character name if available
        if (this.currentDialog.character) {
            const characterName = document.createElement('div');
            characterName.className = 'character-name';
            characterName.textContent = this.currentDialog.character;
            dialogContainer.appendChild(characterName);
        }
        
        // Show current line
        if (this.dialogIndex < this.currentDialog.lines.length) {
            const line = this.currentDialog.lines[this.dialogIndex];
            const dialogText = document.createElement('p');
            dialogText.className = 'dialog-text typewriter';
            dialogText.textContent = line;
            dialogContainer.appendChild(dialogText);
            
            // If there are more lines, show continue button
            if (this.dialogIndex < this.currentDialog.lines.length - 1) {
                const continueBtn = document.createElement('button');
                continueBtn.className = 'continue-btn';
                continueBtn.textContent = '▶';
                continueBtn.addEventListener('click', () => this.next());
                dialogContainer.appendChild(continueBtn);
            } 
            // If this is the last line and there are choices, show them
            else if (this.currentDialog.choices) {
                this.showChoices();
            }
        }
    }

    showChoices() {
        const gameUI = document.getElementById('game-ui');
        gameUI.innerHTML = '';
        
        const choicesContainer = document.createElement('div');
        choicesContainer.className = 'choice-container';
        
        this.currentDialog.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                this.selectChoice(choice);
            });
            choicesContainer.appendChild(button);
        });
        
        gameUI.appendChild(choicesContainer);
    }

    selectChoice(choice) {
        // Logic for what happens when a choice is selected
        if (choice.nextDialog) {
            this.startDialog(choice.nextDialog);
        } else if (choice.nextScene) {
            // If scene change is needed, call the game's renderScene function
            window.renderScene(choice.nextScene);
        }
    }

    next() {
        this.dialogIndex++;
        this.displayDialog();
    }
}