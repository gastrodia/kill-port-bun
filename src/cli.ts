#!/usr/bin/env bun
import packageJson from '../package.json'
import { kill } from './lib'

const version = packageJson.version;

// Legacy function name for backward compatibility
const portKill = async (port: string) => {
    await kill(port, { silent: false })
}

function logHelp(): void {
    console.log(`
  Port Killer v${version}
  
  Usage:
    kp <port>         Kill process using the port
    kp --version      Show version number
  
  Examples:
    kp 8080
    `);
}


function formatArgv() {
    const argv = Bun.argv.slice(2);
    if (argv.length === 0) {
        logHelp()
        return
    }
    const arg = argv.at(0)?.trim()
    if (!arg) {
        logHelp()
        return
    }
    if (arg === "--version") {
        console.log(`Port Killer v${version}`)
        return
    }
    // If it's a number, treat it as a port
    if (!isNaN(Number(arg))) {
        portKill(arg)
        return
    }
    console.error(`Invalid port: ${arg}`)
}

// Only run CLI logic if this file is the main entry point (not imported as a library)
if (import.meta.main) {
    formatArgv()
}


