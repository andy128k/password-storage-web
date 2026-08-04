import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

const title = "PasswordStorage Web";

const __dirname = import.meta.dirname;

export default {
  entry: "./src/index.tsx",
  output: {
    path: __dirname + "/public/",
    publicPath: "/",
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                exportLocalsConvention: "dashesOnly",
              },
            },
          },
        ],
      },
      {
        test: /\.(j|t)s(x?)$/,
        loader: "swc-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: title,
      template: __dirname + "/template.html",
    }),
    new FaviconsWebpackPlugin({
      logo: __dirname + "/password-storage.svg",
      prefix: "icons-[fullhash]/",
      inject: true,
      background: "#fff",
      title: title,
      display: "standalone",
      online: false,
      logging: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        firefox: true,
        windows: { background: "#da532c" },
        yandex: true,
      },
    }),
  ],
  performance: {
    maxAssetSize: 1_000_000,
    maxEntrypointSize: 1_000_000,
  },
  devServer: {
    static: {
      directory: __dirname + "/public/",
    },
  },
};
