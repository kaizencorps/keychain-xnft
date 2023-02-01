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
            _actions: './_actions',
            _state: './_state',
            _helpers: './_helpers',
            apis: './apis',
            assets: './assets',
            components: './components',
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
