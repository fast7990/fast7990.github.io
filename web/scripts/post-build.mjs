import fs from 'node:fs'
import path from 'node:path'

const scriptUrl = new URL(import.meta.url)
const scriptPath = scriptUrl.pathname.replace(/^\/([A-Za-z]):\//, '$1:/')
const __dirname = path.dirname(scriptPath)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const targetDir = path.resolve(projectRoot, '..')

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath)
      }
      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: ${entry.name}`)
    }
  }
}

function main() {
  console.log('distDir:', distDir)
  console.log('projectRoot:', projectRoot)
  
  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory not found!')
    process.exit(1)
  }

  console.log('Copying build output to project root...')
  copyDirectory(distDir, targetDir)
  console.log('Done!')
}

main()
