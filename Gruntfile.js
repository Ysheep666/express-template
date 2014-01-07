'use strict';

module.exports = function(grunt) {

  // Load Grunt Tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js', 'index.js', 'app/{,*/}*.js', 'config/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/{,*/}*.js']
      },
      public: {
        options: {
          jshintrc: 'public/.jshintrc'
        },
        src: ['public/{,*/}*.js']
      }
    },
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      },
      build: {
        NODE_ENV: 'production',
        DEST: 'dist'
      }
    },
    connect: {
      test: {
        options: {
          port: 5001,
          hostname: 'localhost',
          base: [
            'public',
            'public/test'
          ]
        }
      }
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'test/blanket',
          timeout: 10000
        },
        src: ['test/**/*.js']
      },
      'html-cov': {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['test/**/*.js']
      }
    },
    clean: {
      server: '.tmp',
      dist: ['.tmp', 'dist']
    },
    develop: {
      server: {
        file: 'index.js'
      }
    },
    watch: {
      express: {
        files: [
          'index.js',
          'app/**/*.js',
          'config/**/*.js'
        ],
        tasks: ['develop'],
        options: { nospawn: true }
      },
      less: {
        files: ['public/styles/{,*/}/*.less'],
        tasks: ['less', 'autoprefixer']
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'public',
          dest: 'dist/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: 'views',
          dest: 'dist/views',
          src: [
            '{,*/}*.html'
          ]

        }]
      }
    },
    less: {
      options: {
        paths: [
          'public/components',
          'public/styles'
        ]
        // dumpLineNumbers: true
      },
      server: {
        files: [{
          expand: true,
          cwd: 'public/styles',
          src: ['{,*/}*.less'],
          dest: '.tmp/public/styles',
          ext: '.css'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'public/styles',
          src: ['{,*/}*.less'],
          dest: '.tmp/public/styles',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        files: [{
          expand: true,
          cwd: '.tmp/public/styles',
          src: '{,*/}*.css',
          dest: '.tmp/public/styles'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/public/styles',
          src: '{,*/}*.css',
          dest: 'dist/public/styles'
        }]
      }
    },
    'bower-install': {
      target: {
        src: ['views/layout.html'],
        cwd: '',
        ignorePath: 'public',
        exclude: [],
        fileTypes: {}
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            'dist/public/scripts/{,*/}*.js',
            'dist/public/styles/{,*/}*.css',
            'dist/public/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            'dist/public/styles/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: 'dist/public'
      },
      html: 'views/{,*/}*.html'
    },
    usemin: {
      options: {
        basedir: 'dist/public',
        assetsDirs: ['dist/public']
      },
      html: ['dist/views/{,*/}*.html'],
      css: ['dist/public/styles/{,*/}*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'dist/public/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'public/images',
          src: '{,*/}*.svg',
          dest: 'dist/public/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'dist/views',
          src: '{,*/}*.html',
          dest: 'dist/views'
        }]
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [{
            match: /(<[^<]*[href|src|data-main]=["']?)(\/[components|images|styles|scripts]{1}[^'">]*["']?[^>]*>)/g,
            replacement: '$1{{ static_url }}$2'
          }]
        },
        files: [{
          expand: true,
          cwd: 'dist/views',
          src: '{,*/}*.html',
          dest: 'dist/views'
        }]
      }
    }
  });

  grunt.registerTask('server', [
    'env:dev',
    'clean:server',
    'less:server',
    'autoprefixer:server',
    'develop',
    'watch'
  ]);

  grunt.registerTask('test', function (target) {
    if (target === 'front') {
      return grunt.task.run([
        'env:test',
        'jshint:public',
        'connect:test',
        'mocha'
      ]);
    }

    grunt.task.run([
      'env:test',
      'jshint:all',
      'jshint:test',
      'mochaTest'
    ]);
  });

  grunt.registerTask('build', [
    'env:build',
    'jshint',
    'clean:dist',
    'useminPrepare',
    'less:dist',
    'copy:dist',
    'imagemin',
    'svgmin',
    'autoprefixer:dist',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'replace'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
