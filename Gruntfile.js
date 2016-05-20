'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            react: {
                files: 'src/blocks/**/*.jsx',
                tasks: ['browserify:dev']
            },
            less: {
                files: 'src/blocks/**/*.less',
                tasks: ['concat:less', 'less:dev']
            }
        },
        concat: {
            less: {
                src: ['node_modules/materialize-css/bin/materialize.css', 'src/blocks/**/*.less'],
                dest: 'build/index.less'
            }
        },
        less: {
            dev: {
                files: {
                    'build/index.css': 'build/index.less'
                }
            }
        },
        browserify: {
            dev: {
                options: {
                    transform: [
                        ['babelify', {presets: ['react', 'es2015']}],
                        require('grunt-react').browserify
                    ]
                },
                files: {
                    'build/scripts/index.js': ['src/blocks/**/*.jsx']
                }
            },

            // standalone browserify watch
            client: {
                src: ['src/blocks/**/*.jsx'],
                dest: 'build/scripts/index.js',
                options: {
                    transform: [
                        ['babelify', {presets: ['react', 'es2015']}],
                        require('grunt-react').browserify],
                    watch: true,
                    keepAlive: true
                }
            },

            // working with grunt-watch - do NOT use with keepAlive above
            watchClient: {
                src: ['src/blocks/**/*.jsx'],
                dest: 'build/scripts/index.js',
                options: {
                    transform: [
                        ['babelify', {presets: ['react', 'es2015']}],
                        require('grunt-react').browserify],
                    watch: true
                }
            }
        },
        copy: {
            staticContent: {
                files: [
                    // Static
                    {
                        expand: true,
                        cwd: 'src/static',
                        src: ['**'],
                        dest: 'build/'
                    },
                    // Materialize
                    {
                        expand: true,
                        cwd: 'node_modules/materialize-css/bin/',
                        src: ['materialize.js'],
                        dest: 'build/scripts/'
                    },
                    // cp -R ./node_modules/materialize-css/bin/materialize.js build/scripts/materialize.js
                    // Images
                    {
                        src: ['src/**/img/*'],
                        dest: 'build/img/',
                        filter: 'isFile',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },
        exec: {
            set_config_dev: {
                cmd: 'ln -nsf ' + __dirname + '/src/config/dev/iconfig.js src/blocks/i/iconfig/'
            },
            set_config_qa: {
                cmd: 'ln -nsf ' + __dirname + '/src/config/qa/iconfig.js src/blocks/i/iconfig/'
            },
            set_path: {
                cmd: 'ln -nsf ' + __dirname + '/src/blocks node_modules;'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('collectIntlMessages', 'Collect intl messages from components.', collectI18nMessages);

    grunt.registerTask('default', ['collectIntlMessages', 'exec:set_config_dev', 'exec:set_path', 'concat:less', 'less:dev', 'browserify:dev', 'copy:staticContent']);
    grunt.registerTask('qa', ['collectIntlMessages', 'exec:set_config_qa', 'exec:set_path', 'concat:less', 'less:dev', 'browserify:dev', 'copy:staticContent']);
    grunt.registerTask('wwb', ['collectIntlMessages', 'exec:set_config_dev', 'exec:set_path', 'copy:staticContent', 'browserify:watchClient', 'watch:less']);

    // by @dmitropustovit
    function collectI18nMessages () {
        var files = [],
            messages = {};
        getFiles('./src', 'i18n', files);

        files.forEach(function (intlFile) {
            var intl = require(intlFile);
            for (var locale in intl) {
                if (!intl.hasOwnProperty(locale)) {
                    continue;
                }
                if (messages[locale]) {
                    Object.assign(messages[locale], intl[locale]);
                } else {
                    messages[locale] = intl[locale];
                }
            }
        });

        var fs = require('fs');

        try {
            fs.mkdirSync('./src/static/intl');
        } catch (e) {
            if (e.code != 'EEXIST') {
                throw e;
            }
        }

        for (var locale in messages) {
            if (!messages.hasOwnProperty(locale)) {
                continue;
            }
            var res = {
                locales: [locale],
                messages: messages[locale]
            };
            fs.writeFileSync('./src/static/intl/' + locale + '.js',
                'var intlData =  ' + JSON.stringify(res) + ';');
        }
    }

    function getFiles (src, def, res) {
        var fs = require('fs'),
            path = require('path');

        fs.readdirSync(src).forEach(function (fileName) {
            let file = path.resolve(src, fileName);

            if (fs.lstatSync(file).isDirectory()) {
                getFiles(src + '/' + fileName, def, res);
            } else if (fileName.indexOf(def) != -1) {
                res.push(src + '/' + fileName);
            }
        });
    }
};
