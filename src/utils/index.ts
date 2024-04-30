type StyleClass = string | undefined | null;
export const joinClass = (...classList: StyleClass[]) =>
  classList.filter((cs) => !!cs).join(' ');
