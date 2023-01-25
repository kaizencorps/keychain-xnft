module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-proposal-numeric-separator'],
      [
        'module-resolver',
        {
          alias: {
            apis: './apis',
            assets: './assets',
            components: './components',
            helpers: './helpers',
            state: './_state',
            actions: './_actions',
            screens: './screens',
            models: './models',
            constants: './constants',
            utils: './utils',
            nav: './nav',
            hooks: './hooks',
            types: './types',
            programs: './programs'
          },
        },
      ],
    ]
  };
};
