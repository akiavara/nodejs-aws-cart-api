// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function (options, webpack) {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  options.output.path = path.resolve(__dirname, './dist');

  return {
    ...options,
    entry: ['./src/mainlambda.ts'],
    externals: [],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }

          return false;
        },
      }),
    ],
  };
};
