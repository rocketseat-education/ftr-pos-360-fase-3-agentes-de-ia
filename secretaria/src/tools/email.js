const getEvents = {
    name: "getEmails",
    description: "Retorna todos os emails na caixa de entrada",
}

const sendEmail = {
    name: "sendEmail",
    description: "Envia um email para um contato",
    parameters: {
        type: "OBJECT",
        properties: {
            contact: {
                type: "STRING",
                description: "O nome do contato para enviar a mensagem"
            },
            message: {
                type: "STRING",
                description: "A mensagem a ser enviada",
            }
        },
        required: ["contact", "message"]
    }
}

const allFunctions = [getEvents, sendEmail];
export { allFunctions };