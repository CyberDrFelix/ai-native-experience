import { cp, mkdir, rm } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const release = path.join(root, 'release')
const packageName = 'AI-Native-Experience-Offline'
const packageDir = path.join(release, packageName)
const archive = path.join(release, `${packageName}.zip`)

await rm(packageDir, { recursive: true, force: true })
await rm(archive, { force: true })
await mkdir(packageDir, { recursive: true })
await cp(path.join(root, 'dist'), path.join(packageDir, 'app'), { recursive: true })
await cp(path.join(root, 'offline', 'START_AI_NATIVE.cmd'), path.join(packageDir, 'START_AI_NATIVE.cmd'))
await cp(path.join(root, 'offline', 'serve.ps1'), path.join(packageDir, 'serve.ps1'))
await cp(path.join(root, 'offline', 'README_OFFLINE.md'), path.join(packageDir, 'README_OFFLINE.md'))

const zipped = spawnSync('zip', ['-q', '-r', archive, packageName], { cwd: release, stdio: 'inherit' })
if (zipped.error) throw zipped.error
if (zipped.status !== 0) throw new Error(`zip exited with status ${zipped.status}`)

console.log(`Offline folder: ${packageDir}`)
console.log(`Offline archive: ${archive}`)
