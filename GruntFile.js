/**
 * @fileoverview Gruntfile.js
 * @author ryosuke.tsuji
 * @version 1.0.0
 */

'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        path: {
            'src':   'src',
            'js':    'src/js',
            'views': 'src/_views',
            'css':   'src/_styl',
            'data':  'src/_data',
            'bower': 'bower_components',
            'dist':  'dist',
            'demo':  'demo'
        },
        esteWatch: {
            options: {
                dirs: ['<%= path.src %>/**'],
                livereload: {
                    enabled: true,
                    extensions: [
                        'jade',
                        'json',
                        'styl',
                        'js'
                    ],
                    port: 35741
                }
            },
            js: function() {
                return ['jshint', 'copy'];
            },
            jade: function() {
                return ['jade'];
            },
            json: function() {
                return ['jade'];
            },
            styl: function() {
                return ['stylus', 'autoprefixer'];
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            },
            src: [
                '<%= path.js %>/jquery-input-helper.js'
            ]
        },
        uglify: {
            options: {
                ascii_only: true,
                preserveComments: 'some',
                banner: '/**' + '\n' +
                     '* @fileOverview jquery-input-helper' + '\n' +
                     '* @description depend on jQuery' + '\n' +
                     '* @name jquery-input-helper.js' + '\n' +
                     '* @author thujikun' + '\n' +
                     '* @version 1.0.0' + '\n' +
                     '* Copyright (c) 2015 "thujikun" Ryosuke Tsuji' + '\n' +
                     '* Licensed under the MIT license.' + '\n' +
                    '*/'
            },
            core: {
                files: {
                    '<%= path.dist %>/jquery-input-helper.min.js': [
                        '<%= path.js %>/jquery-input-helper.js'
                    ]
                }
            },
        },
        jade: {
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= path.views %>',
                    src: ['{,**/}*.jade', '!**/_*'],
                    dest: '<%= path.demo %>',
                    ext: '.html'
                }],
                options: {
                    client: false,
                    pretty: true,
                    basedir: '<%= path.views %>',
                    data: function(dest, src) {
                        var page = src[0].replace(/drc\/_views\/(.*)\/index.jade/, '$1');
                        var inputHelperConfig = require('./' + grunt.config.data.path.data + '/form.json');

                        if (page == src[0]) {
                            page = 'index';
                        }

                        return {
                            page: page,
                            inputHelperConfig: inputHelperConfig
                        };
                    }
                }
            }
        },
        stylus: {
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= path.css %>',
                    src: ['{,**/}*.styl', '!**/_*'],
                    dest: '<%= path.demo %>/css',
                    ext: '.css'
                }],
                options: {
                    compress: false,
                    urlfunc: 'url'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            src: {
                src: [
                    '<%= path.demo %>/css/{,**/}*.css'
                ]
            },
        },
        copy: {
            demo: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.src %>',
                    src: ['{,**/}*.*', '!**/_*/{,**/}*.*'],
                    dest: '<%= path.demo %>'
                }]
            },
            jquery: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.bower %>/jquery/dist/',
                    src: ['jquery.min.js'],
                    dest: '<%= path.demo %>/js/vendor/jquery'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.js %>',
                    src: ['jquery-input-helper.js'],
                    dest: '<%= path.dist %>'
                }]
            }
        },
        clean: {
            dist: '<%= path.dist %>',
            demo: '<%= path.demo %>'
        },
        connect: {
            options: {
                port: 9191,
                hostname: '0.0.0.0',
                livereload: 35741,
            },
            demo: {
                options: {
                    open: 'http://localhost:9191/',
                    base: '<%= path.demo %>'
                }
            }
        },
        karma: {
            unit: {
                options: {
                    configFile: 'karma.conf.js'
                }
            }
        },
        jsdoc: {
            dist: {
                src: [
                    'src/js/jquery-input-helper.js'
                ],
                options: {
                    destination: 'docs/jquery-input-helper',
                    configure: 'docs/template/jquery-input-helper.conf.json',
                    template: 'docs/template'
                },
            },
        }
    });

    grunt.registerTask('serve', [
        'clean:demo',
        'stylus',
        'autoprefixer',
        'jade',
        'copy',
        'connect',
        'esteWatch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'uglify',
        'copy:dist',
        'jsdoc'
    ]);
};
