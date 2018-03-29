export function required(value: string | number | undefined | null) {
  return value ? undefined : 'Required';
}

export function address(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value) ? undefined : 'Not an address';
}

export function isJson(value: string) {
  const errMsg = 'Invalid JSON';
  try {
    return JSON.parse(value) ? undefined : errMsg;
  } catch (e) {
    return errMsg;
  }
}