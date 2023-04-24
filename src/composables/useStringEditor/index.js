export default function useStringEditor() {
    const isString = (text) => {
      if (typeof text !== "string") { throw new Error(`${text} is not valid. Input must be a string.`); };
    };
  
    function normalizeString(text) {
      isString(text);
  
      return text
        // eliminar acentos
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        // sustituir espacios por guiones "-"
        .replace(/ /g, '-')
        // eliminar puntos
        .replace(/\./g, "")
        // poner todo a minusculas
        .toLowerCase();
    };
  
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