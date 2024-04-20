export const replaceChar = (text = "", char) => {
    const myArray = text.split(`${char}`);
    const cleanedArray = myArray.join('');
    return cleanedArray
}