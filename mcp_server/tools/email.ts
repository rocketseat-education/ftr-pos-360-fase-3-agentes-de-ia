import { z } from "zod";
import { type Tool } from "./interfaces.js";

interface Email {
  sender: string,
  message: string
}

const inbox: Email[] = [
  {
    sender: "ana.silva@example.com",
    message: "Olá! Poderíamos remarcar nossa reunião para amanhã às 10h?"
  },
  {
    sender: "carlos.mendes@empresa.com",
    message: "Segue o relatório de desempenho do último trimestre em anexo."
  },
  {
    sender: "mariana.costa@example.com",
    message: "Lembrete: apresentação para o cliente marcada para sexta-feira às 14h."
  },
  {
    sender: "eduardo.lima@empresa.com",
    message: "Bom dia! Há alguma atualização sobre o projeto de inovação?"
  },
  {
    sender: "beatriz.rocha@example.com",
    message: "Convite: Workshop sobre metodologias ágeis no próximo sábado."
  },
  {
    sender: "lucas.almeida@empresa.com",
    message: "Reunião de alinhamento confirmada para segunda-feira às 9h."
  },
  {
    sender: "carla.souza@example.com",
    message: "Ei! Vai participar do churrasco do Dia do Trabalhador?"
  },
  {
    sender: "fernando.gomes@empresa.com",
    message: "Enviei os documentos solicitados para revisão. Confirma o recebimento?"
  }
];


const getEmails: Tool = {
  function: async () => {
    return {
      content: [{
        type: "text",
        text: JSON.stringify(inbox)
      }],
      structuredContent: inbox
    };
  },
  declaration: {
    name: "getEmails",
    description: "Retorna todos os emails na caixa de entrada",
  }
}

const sendEmail: Tool = {
  function: async ({ contact, message }) => {
    console.log();

    return {
      content: [{
        type: "text",
        text: `**Email enviado para ${contact}: ${message}`
      }]
    };
  },
  declaration: {
    name: "sendEmail",
    description: "Envia um email para um contato",
    parameters: {
      contact: z
        .string()
        .describe("O nome do contato para enviar a mensagem"),
      message: z
        .string()
        .describe("A mensagem a ser enviada"),
    }
  }
}

const allDefinitions = [getEmails, sendEmail];
export { allDefinitions };