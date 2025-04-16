const quoteKey = (k) => (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `"${k}"`);

export default quoteKey;
