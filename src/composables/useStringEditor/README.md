# useStringEditor

This is a Vue 3 composable that allows you to perform various operations on strings, including:
- Normalizing
- Replacing spaces with dashes
- Capitalizing first letters

The purpose of this composable is to provide a set of easy-to-use functions that can help you transform strings into URLs, or capitalize and normalize string data for use in your Vue.js applications.

## Table of Contents

- [Usage](#usage)
- [Functions](#functions)
  - [normalizeString(text)](#normalizestringtext)
  - [capitalizeFirstLetterAndReplaceDash(text)](#capitalizefirstletterandreplacedashtext)

<a name="usage"></a>

## Usage

To use the useStringEditor composable, import it into your Vue 3 component and call the functions as needed.

```javascript
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ normalizedTitle }}</p>
    <p>{{ capitalizedTitle }}</p>
  </div>
</template>

<script>
import { useStringEditor } from '@/composables/useStringEditor';

export default {
  setup() {
    const { normalizeString, capitalizeFirstLetterAndReplaceDash } = useStringEditor();
    
    const title = 'Tutorial de Vue.js';
    const normalizedTitle = normalizeString(title);
    const capitalizedTitle = capitalizeFirstLetterAndReplaceDash(normalizedTitle);
    
    return { title, normalizedTitle, capitalizedTitle };
  }
};
</script>
```

<a name="functions"></a>

## Functions

<a name="normalizestringtext"></a> 

### `normalizeString(text)`

Normalizes a string to make it URL-friendly by removing accents, replacing spaces with dashes, removing dots, and converting to lowercase.
Arguments

    text (string): The string to normalize.

Returns

    (string): The normalized string.

Example

```js
const { normalizeString } = useStringEditor();

const title = 'Tutorial de Vue.js';
const normalizedTitle = normalizeString(title);

console.log(normalizedTitle); // 'tutorial-de-vuejs'
```

<a name="capitalizefirstletterandreplacedashtext"></a>

### `capitalizeFirstLetterAndReplaceDash(text)`

Capitalizes the first letter of each word and replaces dashes with spaces.
Arguments

    text (string): The string to capitalize.

Returns

    (string): The capitalized string.

Example

```js
const { capitalizeFirstLetterAndReplaceDash } = useStringEditor();

const title = 'tutorial-de-vuejs';
const capitalizedTitle = capitalizeFirstLetterAndReplaceDash(title);

console.log(capitalizedTitle); // 'Tutorial De Vuejs'
```