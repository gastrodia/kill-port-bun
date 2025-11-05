# kill-port-bun

A cross-platform CLI tool to kill processes using specific ports, powered by Bun ⚡

## Features

✨ **Cross-platform**: Works on macOS, Linux, and Windows  
⚡ **Fast**: Powered by Bun for lightning-fast execution  
🎯 **Simple**: Single command to free up any port  
📦 **Dual Usage**: Use as CLI tool or import as a library  
🔧 **No dependencies**: Lightweight and efficient  
🔇 **Silent Mode**: Optional silent execution for library usage  

## Installation

Make sure you have [Bun](https://bun.sh) installed first.

### Global Installation (CLI)

```bash
bun install -g kill-port-bun
```

### Local Installation (Library)

```bash
bun add kill-port-bun
```

Or with npm:

```bash
npm install kill-port-bun
```

## Usage

### As a CLI Tool

Kill a process using a specific port:

```bash
kp 8080
```

Show version:

```bash
kp --version
```

### As a Library

Import and use in your code:

```typescript
import { kill } from 'kill-port-bun'

// Kill process on port 3000
await kill(3000)

// Kill process on port 8080 (accepts number or string)
await kill('8080')

// Kill process silently (no console output)
await kill(5173, { silent: true })
```

## Examples

### CLI Examples

```bash
# Kill process on port 3000
kp 3000

# Kill process on port 8080
kp 8080

# Kill process on port 5173 (Vite default)
kp 5173
```

### Library Examples

```typescript
import { kill } from 'kill-port-bun'

// In a cleanup script
async function cleanup() {
  await kill(3000)
  await kill(8080)
  console.log('Ports cleaned up!')
}

// In error handling
try {
  await kill(5000)
} catch (error) {
  console.error('Failed to kill process:', error)
}

// Silent mode (no console output)
await kill(3000, { silent: true })
```

## How it works

- **macOS/Linux**: Uses `lsof` to find processes and `kill` to terminate them
- **Windows**: Uses `netstat` to find processes and `taskkill` to terminate them

## Requirements

- Bun >= 1.0.0

## Platform Support

| Platform | Supported | Command Used |
|----------|-----------|--------------|
| macOS    | ✅        | `lsof` + `kill` |
| Linux    | ✅        | `lsof` + `kill` |
| Windows  | ✅        | `netstat` + `taskkill` |

## Development

Clone the repository:

```bash
git clone https://github.com/yourusername/kill-port-bun.git
cd kill-port-bun
```

Install dependencies:

```bash
bun install
```

Run locally:

```bash
bun run dev 8080
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

