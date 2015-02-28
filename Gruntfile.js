(function() {'use strict';

    module.exports = function (grunt) {

        require('jit-grunt')(grunt);

        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            // This should be the name of your apps angular module
            appModule: 'myApp',
            // configurable paths
            paths: {
                client: require('./bower.json').appPath || 'client',
                dist: 'dist',
            },
            // Empties folders to start fresh
            clean: {
                dist: {
                    files: [{
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= paths.dist %>/*',
                            '!<%= paths.dist %>/.git*',
                            '!<%= paths.dist %>/Procfile',
                            '!<%= paths.dist %>/app.json'
                        ]
                    }]
                },
                server: '.tmp'
            },
            uglify: {
                static_mappings: {
                    files: [{
                        src: '<%= paths.client %>/src/app.js',
                        dest: '<%= paths.dist %>/public/app.min.js'
                    }],
                }
            },
            // Copies remaining files to places other tasks can use
            copy: {
                dist: {
                    files: [{
                        expand: true,
                        dot: true,
                        cwd: '<%= paths.client %>',
                        dest: '<%= paths.dist %>/public/',
                        src: [
                            'images/*',
                            'partials/*',
                            'styles/*',
                            '*'
                        ]
                    }, {
                        expand: true,
                        cwd: 'server/',
                        dest: '<%= paths.dist %>',
                        src: [
                            '**/*'
                        ]
                    }, {
                        dest: '<%= paths.dist %>/',
                        src: ['package.json']
                    }, {
                        expand: true,
                        flatten: true,
                        cwd: 'bower_components/',
                        dest: '<%= paths.dist %>/public/libs/',
                        src: [
                            'angular/angular.min.js',
                            'angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'angular-route/angular-route.min.js',
                        ]
                    }]
                }
            }

        });

        grunt.registerTask('dist', ['clean:dist', 'uglify', 'copy:dist']);
    };

})();