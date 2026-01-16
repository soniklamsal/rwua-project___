# 📝 Useful NPM Scripts

Add these to your `package.json` for easier development:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    
    "clean": "rimraf .next node_modules/.cache",
    "clean:all": "rimraf .next node_modules/.cache node_modules package-lock.json",
    "fresh": "npm run clean && npm run dev",
    "fresh:all": "npm run clean:all && npm install && npm run dev"
  }
}
```

## Usage

```bash
# Clean cache and restart
npm run fresh

# Complete clean reinstall
npm run fresh:all
```

## Install rimraf (Optional)
```bash
npm install -D rimraf
```

Or use the batch files provided:
- `CLEAR_CACHE.bat` - Quick cache clear
- `RESTART_DEV.bat` - Stop, clear, and restart
