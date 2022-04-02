const numberRegex = /^[0-9]+$/;

export const validateAmount = (amount) => amount.match(numberRegex);
