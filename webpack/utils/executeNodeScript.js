const chalk = require('chalk');
const { spawn } = require('cross-spawn');

/**
 * Spawn process asynchronously 
 * 
 * @param {String} command required, the command 'node' 'nodemon' 'yarn'
 * @param {String} scriptPath required, the script path related current process.cwd() 
 * @param {Array<String>} args 
 */
function executeNodeScript(command, scriptPath, ...args) {
  const child = spawn(command, [scriptPath, ...args], {
    stdio: 'inherit',
  });

  child.on('close', code => {
    if (code !== 0) {
      console.log();
      console.log(chalk.cyan(scriptPath) + ' exited with code ' + code + '.');
      console.log();
      return;
    }
  })
  child.on('error', err => {
    console.log(err);
  });

  return child;
}

module.exports = executeNodeScript;