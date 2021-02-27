export function createErrorMessage(line?: number): string {
  const msg1 = `Invalid input given to macro at line ${line}. `;
  const msg2a = `Make sure you are calling the macro with proper parameter types like the following:\n`;
  const msg2b = `createTitle() or createTitle('Foo') or createTitle('Foo', true)`;

  return line ? msg1 + msg2a + msg2b : msg2a + msg2b;
}
