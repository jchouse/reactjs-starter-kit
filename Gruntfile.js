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
                src: ['src/blocks/**/*.less'],
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
                    transform: ['babelify', require('grunt-react').browserify]
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
                    transform: ['babelify', require('grunt-react').browserify],
                    watch: true,
                    keepAlive: true
                }
            },

            // working with grunt-watch - do NOT use with keepAlive above
            watchClient: {
                src: ['src/blocks/**/*.jsx'],
                dest: 'build/scripts/index.js',
                options: {
                    transform: ['babelify', require('grunt-react').browserify],
                    watch: true
                }
            }
        },
        exec: {
            set_path: {
                cmd: 'ln -nsf ../src/blocks node_modules;'
            },
            copy_static_content: {
                cmd: 'cp -R src/static/. build/ '
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jest');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-csscomb');

    grunt.registerTask('default', ['exec:set_path', 'concat:less', 'less:dev', 'browserify:dev', 'exec:copy_static_content']);
    grunt.registerTask('wwb', ['exec:set_path', 'browserify:watchClient', 'watch:less', 'exec:copy_static_content']);
    grunt.registerTask('formatLess', 'Sorting CSS properties in specific order.', formatLess);


    function formatLess() {
        var fs = require('fs');
        var res = [];
        getFiles('./src', 'less', res);

        var lessFiles = {};
        res.forEach(function (lessFile) {
            lessFiles[lessFile] = [lessFile];
        });

        grunt.config.set('csscomb.default.files', lessFiles);
        grunt.config.set('csscomb.options.config', 'node_modules/grunt-csscomb/node_modules/csscomb/config/yandex.json');
        grunt.task.run('csscomb');

        function getFiles(src, def, res) {
            fs.readdirSync(src).forEach(function (fileName) {
                if (fileName.indexOf('.') == -1) {
                    getFiles(src + '/' + fileName, def, res);
                } else if (fileName.indexOf('.less') != -1) {
                    res.push(src + '/' + fileName);
                }
            });

        }
    }
};
