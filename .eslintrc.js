module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
   "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "chrome": "readonly",
        "postmanAppId": "readonly",
        "_": "readonly",
        "Deque": "readonly",
        "ArrayBufferEncoderDecoder": "readonly",
        "CryptoJS": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "valid-typeof": "error",
        "no-undef": "off",
        "require-jsdoc": "warn",
    }
}
