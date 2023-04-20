export default function useStringEditor() {

  function normalizeString(text) {
    return text
      // eliminar acentos
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      // sustituir espacios por guiones "-"
      .replace(/ /g, '-')
      // poner todo a minusculas
      .toLowerCase();
  };

  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  function replaceDashWithSpace(text) {
    return text.replace(/-/g, ' ');
  };

  function capitalizeFirstLetterAndReplaceDash(text) {
    text = replaceDashWithSpace(text);
    text = capitalizeFirstLetter(text);
    return text;
  };

  return {
    normalizeString,
    capitalizeFirstLetterAndReplaceDash
  };
};