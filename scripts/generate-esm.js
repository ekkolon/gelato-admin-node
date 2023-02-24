const path = require('path');
const fs = require('fs/promises');

async function main() {
  const entryPoints = require('../entrypoints.json');
  for (const entryPoint in entryPoints) {
    const info = entryPoints[entryPoint];
    if (info.legacy) {
      continue;
    }

    await generateESModule(entryPoint, info.dist);
  }
}

async function generateESModule(entryPoint, source) {
  console.log(`Generating ESM wrapper for ${entryPoint}`);
  const target = getTarget(entryPoint);
  const output = getEsmOutput(source, target);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, output);
  await fs.writeFile('./lib/esm/package.json', JSON.stringify({type: 'module'}));
}

function getTarget(entryPoint) {
  const child = entryPoint.replace('gelato-admin/', '');
  return `./lib/esm/${child}/index.js`;
}

function getEsmOutput(source, target) {
  const sourcePath = path.resolve(source);
  const cjsSource = require.resolve(sourcePath);
  const keys = getExports(cjsSource);
  const targetPath = path.resolve(target);
  const importPath = getImportPath(targetPath, cjsSource);

  let output = `import mod from ${JSON.stringify(importPath)};`;
  output += '\n\n';
  for (const key of keys) {
    output += `export const ${key} = mod.${key};\n`;
  }

  return output;
}

function getImportPath(from, to) {
  const fromDir = path.dirname(from);
  return path.relative(fromDir, to).replace(/\\/g, '/');
}

function getExports(cjsSource) {
  const mod = require(cjsSource);
  const keys = new Set(Object.getOwnPropertyNames(mod));
  keys.delete('__esModule');
  return [...keys].sort();
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();