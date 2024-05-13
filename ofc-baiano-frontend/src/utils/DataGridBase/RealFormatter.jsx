
export const RealFormatter = ({row}) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(row.valor);
    return <span>{formattedValue}</span>;
};

export default RealFormatter;