const getTodayDate = {
    name: "getTodayDate",
    description: "Retorna a data de hoje no formato yyyy-mm-dd"
}

const getEvents = {
    name: "getEvents",
    description: "Retorna os eventos do calendário para um determinado dia",
    parameters: {
        type: "OBJECT",
        properties: {
            data: {
                type: "STRING",
                description: "A data para a qual queremos retornar os eventos, no formato yyyy-mm-dd"
            }
        },
        required: ["data"]
    }
}

const scheduleEvent = {
    name: "scheduleEvent",
    description: "Marca um novo evento na agenda",
    parameters: {
        type: "OBJECT",
        properties: {
            title: {
                type: "STRING",
                description: "O título do evento"
            },
            date: {
                type: "STRING",
                description: "A data do evento, no formato yyyy-mm-dd"
            },
            time: {
                type: "STRING",
                description: "A hora do evento, no formato HH:MM"
            },
            attendees: {
                type: "ARRAY",
                items: { type: "STRING"},
                description: "lista de nomes de convidados para o evento",
            } 
        },
        required: ["title", "date", "time"]
    }
}

const rescheduleEvent = {
    name: "rescheduleEvent",
    description: "Remarca um evento na agenda para um novo horário",
    parameters: {
        type: "OBJECT",
        properties: {
            title: {
                type: "STRING",
                description: "O título do evento para remarcar"
            },
            date: {
                type: "STRING",
                description: "A data do evento, no formato yyyy-mm-dd"
            },
            newTime: {
                type: "STRING",
                description: "A hora do evento, no formato HH:MM"
            },
        },
        required: ["title", "date", "newTime"]
    }
}

const allFunctions = [getTodayDate, getEvents, scheduleEvent, rescheduleEvent];

export { allFunctions };