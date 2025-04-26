// tailwind.utils.js
export const withOpacity = (cssVar) => {
  return ({ opacityValue } = {}) =>
    opacityValue === undefined
      ? `rgb(var(${cssVar}))`
      : `rgb(var(${cssVar}) / ${opacityValue})`;
}; 