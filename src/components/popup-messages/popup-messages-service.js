import { Subject } from 'rxjs';

const messages = new Subject();

export const PopupMessagesService = {
    success: (message) => messages.next({severity: 'success', summary: 'Mensagem de Sucesso', detail: message}),
    info: (message) => message.next({severity: 'info', summary: 'Mensagem Informativa', detail: message}),
    warn: (message) => message.next({severity: 'warn', summary: 'Mensagem de Aviso', detail: message}),
    error: (message) => message.next({severity: 'error', summary: 'Mensagem de Erro', detail: message}),
    asObservable: () => messages.asObservable() 
}