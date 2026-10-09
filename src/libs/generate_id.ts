let id = 1;

export function generateId() {
  return (id++).toString(36);
}
