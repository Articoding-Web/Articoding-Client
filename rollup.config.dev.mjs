import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json';
import express from 'express';
import mysql from 'mysql'; // Import the mysql2 library

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '',
  database: 'articoding',
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  else{
    console.log('Connected to database');
  }


  // Use the connection for database operations

  // Release the connection back to the pool
  connection.release();
});

export default [
  // Phaser
  {
    //  Our game entry point (edit as required)
    input: ["./src/client.ts"],

    //  Where the build file is to be generated.
    //  Most games being built for distribution can use iife as the module type.
    //  You can also use 'umd' if you need to ingest your game into another system.
    //  If using Phaser 3.21 or **below**, add: `intro: 'var global = window;'` to the output object.
    output: {
      file: "./public/client.js",
      name: "client",
      format: "iife",
      sourcemap: true,
    },

    plugins: [
      //  Toggle the booleans here to enable / disable Phaser 3 features:
      replace({
        preventAssignment: true,
        "typeof CANVAS_RENDERER": JSON.stringify(true),
        "typeof WEBGL_RENDERER": JSON.stringify(true),
        "typeof WEBGL_DEBUG": JSON.stringify(true),
        "typeof EXPERIMENTAL": JSON.stringify(true),
        "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
        "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
        "typeof FEATURE_SOUND": JSON.stringify(true),
      }),

      // Resolve for Blockly
      nodeResolve({
        browser: true,
      }),

      //  Resolve for Phaser
      nodeResolve({
        extensions: [".ts", ".tsx"],
      }),

      //  We need to convert the CJS modules into a format Rollup can use:
      commonjs(),

      json(),

      //  See https://github.com/rollup/plugins/tree/master/packages/typescript for config options
      typescript(),
    ],
  },
];

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/level/:id', (req, res) => {
  console.log('Request received: ', req.params.id);
  getLevel(req.params.id, (level) => {
    if(level){
      console.log('Level found: ', level);
      res.json(level);
    }
    else{
      res.sendStatus(404);
    }
  });
});

function getLevel(id, callback){
  pool.query('SELECT * FROM level WHERE id = ?', [id], (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    else{
      console.log('Query successful');
      if(rows.length === 1){
        callback(rows[0]);
      }
      else{
        callback(null);
      }
    }

  });
}

