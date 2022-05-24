export function formattedIDPokemon(id: number) {
    let idFormatted = '';
    if (id < 10) {
        idFormatted = `#00${id}`
    } else if (id < 100 && id >= 10) {
        idFormatted = `#0${id}`
    } else {
        idFormatted = `#${id}`
    }

    return idFormatted;
}