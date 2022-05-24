export function switchColor(specie) {
    const pokemonColor = specie?.color.name;
    let textColor: string = 'gray.50';
    let iconColor: string = 'white';
    let primary = `${pokemonColor}.400`;
    let secondary = `${pokemonColor}.300`;
    let colorScheme = pokemonColor;

    if (pokemonColor === 'white') {
        secondary = 'gray.50'
        textColor = 'gray.700'
        iconColor = '#101010'
        colorScheme = 'gray'
    }
    const colors = {
        primary,
        secondary,
        textColor,
        iconColor,
        colorScheme
    }

    return colors;
}