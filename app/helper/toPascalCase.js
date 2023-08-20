export function toPascalCase(str) {
    const word = str.split('-').join(' ')
    return word.replace(/\b\w/g, (match) => match.toUpperCase());
}