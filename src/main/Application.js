/**
 * Application class is handles all the commands in the terminal
 * and call respected controller to respond to the request
 * @author Shahin (shahin@uilicious.com)
 */
// 'use strict';

//------------------------------------------------------------------------------------------
//
// Dependencies
//
//------------------------------------------------------------------------------------------
const program = require('commander');

// Module Dependencies (non-npm)
const TestRunnerController = require('../controller/TestRunnerController');
const ImportExportController = require('../controller/ImportExportController');

//------------------------------------------------------------------------------
//	Main Function
//------------------------------------------------------------------------------

function CLIApp() {

	// Basic CLI parameters handling
	program
		.version('1.3.13')
		.option('-u, --user <required>', 'username')
		.option('-p, --pass <required>', 'password')
		// .option('-d, --directory <optional>', 'Output directory path to use')
		.option('-b, --browser <optional>', 'browser [Chrome/Firefox]')
		.option('-w, --width <optional>', 'width of browser')
		.option('-ht, --height <optional>', 'height of browser');

    // Import as Folder
    program
        .command('import <projname> <folder_path>')
        .description('Import a folder.')
        .action(function(projname, folder_path, options) {
        	ImportExportController.importFolderHelper(projname, folder_path);
        });

	// Export Test Folder
	program
		.command('export <projname> <folder_name> <directory>') // To:Do
		.description('Export a folder.')
		.action(ImportExportController.exportFolderHelper);

	// -----------------------------
	// 	Commands for running tests
	// -----------------------------
	program
		.command('run <projname> <scriptpath>')
		.option('-s, --save <directory>', 'Set the directory path to save test log.')
		.description('Run a test from a project.')
		.action(TestRunnerController.main);

	// end with parse to parse through the input.txt
	program.parse(process.argv);

	// If program was called with no arguments or invalid arguments, show help.
	if (!program.args.length) {
		// Show help by default
		program.parse([process.argv[0], process.argv[1], '-h']);
		process.exit(0);
	}
	//  else {
	// 	// Warn about invalid commands
	// 	let validCommands = program.commands.map(function(cmd){
	// 		return cmd.name;
	// 	});
	// 	let invalidCommands = program.args.filter(function(cmd){
	// 		// If command is executed, it will be an object and not a string
	// 		return (typeof cmd === 'string' && validCommands.indexOf(cmd) === -1);
	// 	});
	// 	if (invalidCommands.length) {
	// 		console.log('\n [ERROR] - Invalid command: "%s".\n See "--help" for a list of available commands.\n', invalidCommands.join(', '));
	// 	}
	// }
}

module.exports = CLIApp;