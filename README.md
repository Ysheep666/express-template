Express 模板
----------

github: git@github.com:sadne/express-template.git

一个程序的结构清晰，能让我们易于阅读、测试、排错和修改，使开发变得简单，并且增加了可维护性。而 Express 的简洁在有的时候也可能让我们觉得无可奈何，总是不能写出如同 Express 本身一样简洁优雅的代码。

于是根据自己的一些经验 DIY 出了一个 Express 模板。

在这里，我使用 grunt 做监听文件修改，测试，静态文件的发布等，使用了 bower 前端包管理工具，模板用的是 hogan，数据库引擎使用 mongoose，服务器端和前端测试都是使用的 mocha

##### 目录结构 ####

```
.
├── Gruntfile.js
├── README.md
├── app
│ ├── controllers
│ │ └── home.js
│ ├── index.js
│ └── models
│ └── user.js
├── bower.json
├── config
│ ├── config.js
│ ├── express.js
│ ├── mongoose.js
│ └── routes.js
├── coverage.html
├── index.js
├── package.json
├── processes.json
├── public
│ ├── favicon.ico
│ ├── images
│ ├── scripts
│ │ └── home.js
│ ├── styles
│ │ └── main.less
│ └── test
│ ├── index.html
│ └── spec
│ └── test.js
├── test
│ ├── blanket.js
│ ├── controllers
│ │ └── home.js
│ ├── models
│ │ └── user.js
│ └── test_helper.js
└── views
    ├── 404.html
    ├── home
    │ └── index.htm

```

#### 使用方法 ####

安装依赖 ```npm install $ bower install```

开发模式运行 ```grunt server```

运行测试 ``` grunt test[:front] ```

编译模板和静态文件 ``` grunt or grunt build```



