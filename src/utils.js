/* eslint-disable import/prefer-default-export */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
