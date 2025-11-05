const platform = process.platform;


const exec: Partial<Record<typeof platform, (port: string | number, silent?: boolean) => Promise<void>>> = {
    "darwin": async (port: string | number, silent = false) => {
        const portStr = String(port)
        const result = await Bun.$`lsof -ti :${portStr}`.nothrow().quiet()
        
        // lsof returns non-zero exit code when no process is found
        if (result.exitCode !== 0) {
            if (!silent) console.log(`No process found using port ${portStr}`)
            return
        }
        
        const pids = result.text().trim().split(/[\n\r]/).filter(Boolean)
        if (pids.length === 0) {
            if (!silent) console.log(`No process found using port ${portStr}`)
            return
        }
        
        for (const pid of pids) {
            if (!silent) console.log(`Killing process ${pid} on port ${portStr}`)
            const killResult = await Bun.$`kill -9 ${pid}`.nothrow().quiet()
            if (killResult.exitCode !== 0) {
                throw new Error(`Failed to kill process ${pid}: ${killResult.stderr.toString().trim()}`)
            }
        }
    },
    "linux": async (port: string | number, silent = false) => {
        const portStr = String(port)
        const result = await Bun.$`lsof -ti :${portStr}`.nothrow().quiet()
        
        // lsof returns non-zero exit code when no process is found
        if (result.exitCode !== 0) {
            if (!silent) console.log(`No process found using port ${portStr}`)
            return
        }
        
        const pids = result.text().trim().split(/[\n\r]/).filter(Boolean)
        if (pids.length === 0) {
            if (!silent) console.log(`No process found using port ${portStr}`)
            return
        }
        
        for (const pid of pids) {
            if (!silent) console.log(`Killing process ${pid} on port ${portStr}`)
            const killResult = await Bun.$`kill -9 ${pid}`.nothrow().quiet()
            if (killResult.exitCode !== 0) {
                throw new Error(`Failed to kill process ${pid}: ${killResult.stderr.toString().trim()}`)
            }
        }
    },
    "win32": async (port: string | number, silent = false) => {
        const portStr = String(port)
        const result = await Bun.$`netstat -ano|findstr ${portStr}`.nothrow().quiet()
        
        // findstr returns non-zero exit code when no match is found
        if (result.exitCode !== 0) {
            if (!silent) console.log(`No process found using port ${portStr}`)
            return
        }
        
        const lines = result.text().trim().split(/[\n\r]/).filter(Boolean)
        const pids = [...new Set(lines.map(line => line.match(/\d+$/)?.at(0)))]
        if (pids.length === 0) {
            if (!silent) console.log(`No process found using port ${portStr}`)
            return
        }
        
        for (const pid of pids) {
            if (!silent) console.log(`Killing process ${pid} on port ${portStr}`)
            const killResult = await Bun.$`taskkill /pid ${pid} -t -f`.nothrow().quiet()
            if (killResult.exitCode !== 0) {
                throw new Error(`Failed to kill process ${pid}: ${killResult.stderr.toString().trim()}`)
            }
        }
    },
    // TODO: Add support for other platforms
}

/**
 * Kill process(es) using the specified port
 * @param port - The port number to kill processes on
 * @param options - Optional configuration
 * @param options.silent - If true, suppresses console output (default: false)
 * @returns Promise that resolves when process(es) are killed
 * @throws Error if the platform is not supported
 * 
 * @example
 * ```ts
 * import { kill } from 'kill-port-bun'
 * 
 * // Kill process on port 3000
 * await kill(3000)
 * 
 * // Kill process silently
 * await kill(8080, { silent: true })
 * ```
 */
export async function kill(port: string | number, options?: { silent?: boolean }): Promise<void> {
    const silent = options?.silent ?? false
    const run = exec[platform]
    if (!run) {
        throw new Error(`Unsupported platform: ${platform}`)
    }
    await run(port, silent)
}