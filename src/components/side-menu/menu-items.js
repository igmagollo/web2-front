import {SideMenuService} from './side-menu-service';
import User from '../../core/user-service';

export const CadastroSiteReservas = (navigate) => {
    return {
        label: 'Cadastro de Sites de Reservas',
        command: () => navigate('/sites-reservas/cadastro'),
        icon: 'pi pi-plus',
    };
};

export const CadastroHoteis = (navigate) => {
    return {
        label: 'Cadastro de Hoteis',
        command: () => navigate('/hoteis/cadastro'),
        icon: 'pi pi-plus',
    };
};

export const CadastroPromocoes = (navigate) => {
    return {
        label: 'Cadastro de Promoções',
        command: () => navigate('/promocoes/cadastro'),
        icon: 'pi pi-plus',
    };
};

export const Promocoes = (navigate) => {
    return {
        label: 'Promoções',
        command: () => navigate('/'),
        icon: 'pi pi-dollar',
    };
};

export const MinhasPromocoesSite = (navigate) => {
    return {
        label: 'Minhas Promoções',
        command: () => navigate('/'),
        icon: 'pi pi-dollar'
    };
}

export const MinhasPromocoesHotel = (navigate) => {
    return {
        label: 'Minhas Promoções',
        command: () => navigate('/'),
        icon: 'pi pi-dollar'
    };
}

export const Entrar = (navigate) => {
    return {
        label: 'Entrar',
        command: () => navigate('/login'),
        icon: 'pi pi-sign-in',
    };
};

export const Sair = (navigate) => {
    return {
        label: 'Sair',
        command: () => {
            User.getInstance().logout();
            SideMenuService.sendUpdate();
            navigate('/');
        },
        icon: 'pi pi-sign-out',
    };
};

