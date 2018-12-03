const message = "default message";
export function hello(word: string = message): string {
  return `Hello ${message}! `;
}
