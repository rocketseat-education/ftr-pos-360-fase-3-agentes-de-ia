import { ZodRawShape } from "zod";
import { z } from "zod";

interface Event {
  title: string,
  time: string,
  attendees: string[]
}

interface Calendar {
  [key: string]: Event[]
}

const calendar: Calendar = {
  "2025-04-29": [{
    "title": "Reunião de Planejamento do Projeto",
    "time": "10:00",
    "attendees": ["Ana Silva", "Carlos Mendes", "João Pereira"]
  }],
  "2025-04-30": [{
    "title": "Apresentação de Resultados do Trimestre",
    "time": "15:30",
    "attendees": ["Mariana Costa", "Eduardo Lima"]
  }],
  "2025-05-01": [
    {
      "title": "Feriado do Dia do Trabalhador",
      "time": "00:00",
      "attendees": ["Ana Silva"]
    },
    {
      "title": "Churrasco em família",
      "time": "13:00",
      "attendees": ["Rafael Oliveira", "Carla Souza", "Beatriz Rocha"]
    }
  ],
  "2025-05-02": [
    {
      "title": "Almoço com equipe",
      "time": "12:30",
      "attendees": ["Carla Souza", "Rafael Oliveira"]
    },
    {
      "title": "Reunião com cliente externo",
      "time": "17:00",
      "attendees": ["Carlos Mendes", "Mariana Costa"]
    }
  ],
  "2025-05-03": [{
    "title": "Workshop de Inovação",
    "time": "09:00",
    "attendees": ["Beatriz Rocha", "Fernando Gomes", "Lucas Almeida"]
  }],
  "2025-05-04": [
    {
      "title": "Reunião de feedback individual",
      "time": "16:00",
      "attendees": ["Ana Silva", "João Pereira"]
    },
    {
      "title": "Sessão de brainstorming para novo produto",
      "time": "18:30",
      "attendees": ["Ana Silva", "João Pereira", "Eduardo Lima"]
    }
  ],
  "2025-05-05": [{
    "title": "Apresentação para diretoria",
    "time": "14:00",
    "attendees": ["Carlos Mendes", "Mariana Costa", "Lucas Almeida"]
  }]
}

interface Tool {
  function: (args: any) => any,
  declaration: {
    name: string,
    description: string,
    parameters?: ZodRawShape
  }
}

const getTodayDate: Tool = {
  function: async () => {
    return {
      content: [{
        type: "text",
        text: "2025-05-01"
      }]
    }
  },
  declaration: {
    name: "getTodayDate",
    description: "Retorna a data de hoje no formato yyyy-mm-dd"
  }
}

const getEvents: Tool = {
  function: async ({ date }) => {
    const events = calendar[date] ?? [];

    return {
      content: [{
        type: "text",
        text: JSON.stringify(events)
      }],
      structuredContent: events
    }
  },
  declaration: {
    name: "getEvents",
    description: "Retorna os eventos do calendário para um determinado dia",
    parameters: {
      data: z.string().describe("A data para a qual queremos retornar os eventos, no formato yyyy-mm-dd"),
    }
  }
}

const scheduleEvent: Tool = {
  function: async ({ title, date, time, attendees }) => {
    const eventList = calendar[date] ?? [];
    eventList.push({
      title: title,
      time: time,
      attendees: attendees ?? []
    });

    calendar[date] = eventList;
    return {
      content: [{
        type: "text",
        text: "Evento adicionado com sucesso!"
      }]
    }
  },
  declaration: {
    name: "scheduleEvent",
    description: "Marca um novo evento na agenda",
    parameters: {
      title: z.string().describe("O título do evento"),
      date: z.string().describe("A data do evento, no formato yyyy-mm-dd"),
      time: z.string().describe("A hora do evento, no formato HH:MM"),
      attendees: z.array(z.string()).describe("Lista de nomes de convidados para o evento").optional(),
    }
  }
}

const rescheduleEvent: Tool = {
  function: async ({ title, date, newTime }) => {
    const eventList = calendar[date] ?? [];
    const eventIndex = eventList.findIndex(obj => obj.title === title);
    var res;

    if (eventIndex == -1) {
      res = "Evento não encontrado";
    } else {
      calendar[date][eventIndex].time = newTime;
      res = "Evento alterado com sucesso!";
    }

    return {
      content: [{
        type: "text",
        text: res
      }]
    }
  },
  declaration: {
    name: "rescheduleEvent",
    description: "Remarca um evento na agenda para um novo horário",
    parameters: {
      title: z.string().describe("O título do evento para remarcar"),
      date: z.string().describe("A data do evento, no formato yyyy-mm-dd"),
      newTime: z.string().describe("A hora do evento, no formato HH:MM"),
    }
  }
}

const allDefinitions = [getTodayDate, getEvents, scheduleEvent, rescheduleEvent];

export { allDefinitions };