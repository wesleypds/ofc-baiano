
export const RealFormatter = (valor) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
    return <span>{formattedValue}</span>;
};

export default RealFormatter;