### deps ###
[nodejs v4.2.1 with npm ^v3.9.0](https://nodejs.org/en/download/)

`npm grunt-cli -g`  

### some links ###
* [routing](https://github.com/rackt/react-router)
* [XHR/Ajax](https://www.npmjs.com/package/portals)
* [i18n](http://formatjs.io/react/#formatted-message)
* [cookie](https://www.npmjs.com/package/react-cookie)

### How to use ###
* checkout project
* cd project_root/
* npm i

### Build project ###
* run `grunt` in ./dir, `grunt-cli`  must be installed globaly from npm

### Live Watch ###
* run `wwb` in ./dir

### Run test ###
* run `grunt jest` in ./dir, or 'jest' with `jest-cli`

### JS code style ###
* JSCS - yandex config
* ESLint - config in ./dir

### Test debug ###
 * Idea
  Install NodeJS plugin. Create new Node.js configuration with parameters :
    Working directory : path to project dir
    java script file : node_modules/jest-cli/bin/jest.js
    App params : --runInBand
  After this put breakpoint and Debug new configuration.
