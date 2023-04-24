export default function useStringEditor() {
  /**
  * The function checks if the input is a string and throws an error if it is not.
  * @param text - The `text` parameter is a variable that represents the input value that needs to be
  * checked if it is a string or not.
  */
  const isString = (text) => {
    if (typeof text !== "string") { throw new Error(`${text} is not valid. Input must be a string.`); };
  };

  /**
  * Normalize a string by removing accents and dots, replacing spaces with dashes, and converting to lowercase.
  * @param {string} text - The string to normalize.
  * @returns {string} The normalized string.
  */
  function normalizeString(text) {
    isString(text);

    return text
      // remove accents
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

      // replace spaces with dashes
      .replace(/ /g, '-')

      // remove dots
      .replace(/\./g, "")

      // conver to lowercase
      .toLowerCase();
  };

  /**
  * The function capitalizes the first letter of a string and replaces any dashes with spaces.
  * @param text - a string that may contain dashes (-)
  * @returns There are three functions defined here. The first function
  */
  function capitalizeFirstLetterAndReplaceDash(text) {
    isString(text);

    text = replaceDashWithSpace(text);
    text = capitalizeFirstLetter(text);
    return text;
  };
  function replaceDashWithSpace(text) {
    return text.replace(/-/g, ' ');
  };
  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return {
    normalizeString,
    capitalizeFirstLetterAndReplaceDash
  };
};