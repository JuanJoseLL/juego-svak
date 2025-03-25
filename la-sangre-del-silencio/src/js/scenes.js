// This file manages different scenes in the game, including transitions and scene-specific logic.

const scenes = {
    introduction: {
        text: "En una Boyacá fracturada por la guerra política, encarnas a un joven campesino atrapado entre las ideas de tu familia conservadora y la revolución liberal de tus amigos.",
        options: [
            { text: "Escuchar a tu familia", nextScene: "familyTalk" },
            { text: "Unirte a tus amigos", nextScene: "friendsTalk" }
        ]
    },
    familyTalk: {
        text: "Tu familia te habla sobre la importancia de la tradición y el conservadurismo.",
        options: [
            { text: "Rechazar sus ideas", nextScene: "rejectFamily" },
            { text: "Aceptar su perspectiva", nextScene: "acceptFamily" }
        ]
    },
    friendsTalk: {
        text: "Tus amigos te animan a unirte a la revolución y luchar por el cambio.",
        options: [
            { text: "Unirte a la lucha", nextScene: "joinRevolution" },
            { text: "Dudar y reflexionar", nextScene: "reflect" }
        ]
    },
    rejectFamily: {
        text: "Rechazas las ideas de tu familia, sintiendo la presión de la tradición.",
        options: [
            { text: "Buscar apoyo en tus amigos", nextScene: "friendsTalk" },
            { text: "Explorar el pueblo", nextScene: "exploreVillage" }
        ]
    },
    acceptFamily: {
        text: "Aceptas la perspectiva de tu familia, pero sientes que algo falta.",
        options: [
            { text: "Hablar con tus amigos", nextScene: "friendsTalk" },
            { text: "Leer un libro sobre la revolución", nextScene: "readBook" }
        ]
    },
    joinRevolution: {
        text: "Te unes a la lucha, pero te das cuenta de que la violencia no es la respuesta.",
        options: [
            { text: "Convocar una asamblea", nextScene: "callAssembly" },
            { text: "Reflexionar sobre tus acciones", nextScene: "reflect" }
        ]
    },
    reflect: {
        text: "Reflexionas sobre tus decisiones y el impacto que tienen en el pueblo.",
        options: [
            { text: "Buscar una solución pacífica", nextScene: "peacefulSolution" },
            { text: "Continuar con la lucha", nextScene: "joinRevolution" }
        ]
    },
    exploreVillage: {
        text: "Exploras el pueblo y te encuentras con diferentes personajes que te ofrecen sus perspectivas.",
        options: [
            { text: "Dialogar con un vecino", nextScene: "neighborTalk" },
            { text: "Leer un libro en la plaza", nextScene: "readBook" }
        ]
    },
    callAssembly: {
        text: "Convocas a una asamblea en la plaza del pueblo, donde la gente comienza a unirse.",
        options: [
            { text: "Hablar sobre la importancia de la unidad", nextScene: "unitySpeech" },
            { text: "Escuchar las preocupaciones del pueblo", nextScene: "listenToPeople" }
        ]
    },
    peacefulSolution: {
        text: "Logras evitar una masacre y el pueblo se une en una acción colectiva.",
        options: [
            { text: "Celebrar la victoria", nextScene: "celebration" },
            { text: "Reflexionar sobre el futuro", nextScene: "futureReflection" }
        ]
    },
    // Additional scenes can be added here
};

// Function to get the current scene
function getScene(sceneName) {
    return scenes[sceneName] || null;
}

// Exporting the scenes for use in other modules
export { scenes, getScene };