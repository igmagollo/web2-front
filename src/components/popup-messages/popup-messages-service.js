import { Subject } from 'rxjs';

const messages = new Subject();

export const PopupMessagesService = {
    success: (message) => messages.next({severity: 'success', summary: 'Mensagem de Sucesso', detail: message}),
    info: (message) => messages.next({severity: 'info', summary: 'Mensagem Informativa', detail: message}),
    warn: (message) => messages.next({severity: 'warn', summary: 'Mensagem de Aviso', detail: message}),
    error: (message) => messages.next({severity: 'error', summary: 'Mensagem de Erro', detail: message}),
    asObservable: () => messages.asObservable() 
}