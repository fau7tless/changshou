module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        amd: true,
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'vue',
    ],
    rules: {
        "consistent-return":0,
        "import/no-extraneous-dependencies":0 ,     
        "no-await-in-loop":0,                       // 循环体中可以使用await
        "class-methods-use-this":0,                 // 类方法可以不使用this
        'linebreak-style': 0,                       // 换行符
        'max-len': [1, {code : 200}],               // 单行最大长度
        'indent': [1, 4],                           // 缩进空格数量
        'id-length': [1, {'min': 1, 'max': 20}],    // 变量名长度
        'comma-dangle': [1, 'always-multiline'],    // 末尾逗号
        'semi': [1, 'never'],                       // 句末分号
        'prefer-const': 0,                          // 使用 const 声明那些声明后不再被修改的变量
        'object-shorthand': 0,                      // 要求或禁止对象字面量中方法和属性使用简写语法
        'no-restricted-syntax': 0,                  // 禁止使用特定的语法
        'eqeqeq': 0,                                // 要求使用 === 和 !==
        'eol-last': 0,                              // 要求或禁止文件末尾存在空行
        'func-names': 0,                            // 要求或禁止使用命名的 function 表达式
        'no-trailing-spaces': 0,                    // 禁用行尾空格
        'no-unused-vars': 1,                        // 禁止出现未使用过的变量
        'prefer-template': 0,                       // 要求使用模板字面量而非字符串连接
        'space-before-function-paren': 0,           // 要求或禁止函数圆括号之前有一个空格
        'no-plusplus': 0,                           // 禁用一元操作符 
        'import/no-mutable-exports': 0,             // 禁止 export 暴露可更改的数据
        'import/prefer-default-export': 0,          // 当模块只输出一个变量时，是否需要添加default
        'no-else-return': 0,                        // 禁止 if 语句中 return 语句之后有 else 块
        'no-unused-expressions': 1,                 // 禁止未使用过的表达式
        'prefer-destructuring': 1,                  // 优先使用数组和对象解构
        'no-param-reassign': 1,                     // 禁止对 function 的参数进行重新赋值
        'arrow-parens': 1,                          // 要求箭头函数的参数使用圆括号
        'dot-notation': 1,                          // 要求使用点号
        'yoda': 1,                                  // 要求或者禁止Yoda条件
        "spaced-comment": 1,                        // 注释风格要不要有空格
        'keyword-spacing': 0,                       // 确保字符前后空格的一致性
        'space-before-blocks': 0,                   // 不以新行开始的块前面要不要有空格
        'no-undef': 0,                              // 检查是否可用全局变量
        'no-caller': 0,                             //禁止使用arguments.caller 和 arguments.callee,ECMAScript 5严格模式下方法已经被禁用
        'no-useless-concat': 0,                     //禁止不必要的字符串字面量或模板字面量的连接 
        'no-shadow': 0,                             //关键字无法被重写
        'no-continue': 0,                           //不允许continue语句
        'import/no-unresolved': 0,                  //允许任意的导入组件方式
        'import/extensions': 0,                     //允许任意的导入组件方式
        'strict': 0,                                // 要求或禁止使用严格模式指令
        'guard-for-in': 1,                          // 需要约束 for-in
        'space-before-blocks': 1,                   // 要求或禁止语句块之前的空格
    },
}