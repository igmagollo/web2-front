export const required = {
    check: (value) => {
        return !!value;
    },
    message: 'Este campo é obrigatório.'
}

export const minLength = (length) => {
    return {
        check: (value) => {
            return !(value.length < length);
        },
        message: `Quantidade mínima de ${length} caracteres.`
    };
}

export const maxLength = (length) => {
    return {
        check: (value) => {
            return !(value.length > length);
        },
        message: `Quantidade máxima de ${length} caracteres.`
    };
}

