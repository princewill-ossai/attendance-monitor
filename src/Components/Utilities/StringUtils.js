export const toSentenceCase = (str) => {
    if (!str) return "";
    str = str.trim();
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
