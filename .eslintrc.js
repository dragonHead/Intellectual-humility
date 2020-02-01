module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["standard", "plugin:prettier/recommended"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module"
    },
    "rules": {
        'require-jsdoc': 'off',
    }
};
