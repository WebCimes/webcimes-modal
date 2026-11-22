import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { Features, transform } from 'lightningcss';
import { defineConfig } from 'vite';

// The .mts extension makes this config an ES module without changing the package's module type.
const source = fileURLToPath(new URL('./src/ts/webcimes-modal.ts', import.meta.url));
const stylesheet = new URL('./src/css/webcimes-modal.css', import.meta.url);
const closeIcon = new URL('./src/images/times.svg', import.meta.url);
const declaration = new URL('./src/ts/webcimes-modal.d.ts', import.meta.url);
const declarationMap = new URL('./src/ts/webcimes-modal.d.ts.map', import.meta.url);
const require = createRequire(import.meta.url);

export default defineConfig(({ command }) => ({
    resolve: {
        // Serve the TypeScript source for demo imports that normally point to the ESM bundle.
        alias:
            command === 'serve'
                ? [{ find: /^\.\.\/dist\/js\/webcimes-modal\.esm\.js$/, replacement: source }]
                : [],
    },
    plugins: [
        {
            name: 'webcimes-demo-source-styles',
            apply: 'serve',
            transformIndexHtml: {
                order: 'pre',
                handler(html, { path }) {
                    // The UMD demo tests the built script and stylesheet from dist.
                    if (path === '/demo/demo_udm.html') return html;
                    return html.replace(
                        /\.\.?\/dist\/css\/webcimes-modal\.css/,
                        '/src/css/webcimes-modal.css',
                    );
                },
            },
        },
        {
            name: 'webcimes-library-files',
            apply: 'build',
            outputOptions(options) {
                if (options.format === 'umd') {
                    // Keep the global used by existing classic-script consumers.
                    return {
                        ...options,
                        footer: 'if (globalThis.WebcimesModal) globalThis.createWebcimesModal = globalThis.WebcimesModal.createWebcimesModal;',
                    };
                }
            },
            async generateBundle({ format }) {
                // Emit shared assets once for both JavaScript formats.
                if (format !== 'es') return;

                this.addWatchFile(fileURLToPath(stylesheet));
                this.addWatchFile(fileURLToPath(closeIcon));
                // The build script runs tsc once. Watch mode needs fresh declarations on rebuild.
                if (this.meta.watchMode) {
                    execFileSync(
                        process.execPath,
                        [require.resolve('typescript/bin/tsc'), '--emitDeclarationOnly'],
                        {
                            stdio: 'inherit',
                        },
                    );
                }

                // Keep the CSS source map and the browser-compatible syntax used by the old build.
                const { code, map } = transform({
                    filename: '../../src/css/webcimes-modal.css',
                    code: await readFile(stylesheet),
                    minify: true,
                    sourceMap: true,
                    include:
                        Features.MediaRangeSyntax |
                        Features.LogicalProperties |
                        Features.HexAlphaColors,
                });
                this.emitFile({
                    type: 'asset',
                    fileName: 'css/webcimes-modal.css',
                    source: `${code.toString()}\n/*# sourceMappingURL=webcimes-modal.css.map */\n`,
                });
                this.emitFile({
                    type: 'asset',
                    fileName: 'css/webcimes-modal.css.map',
                    source: map!,
                });
                // Give direct bundle imports their own declarations and map back to the same source.
                const [types, rawMap] = await Promise.all([
                    readFile(declaration, 'utf8'),
                    readFile(declarationMap, 'utf8'),
                ]);
                const typesMap = JSON.parse(rawMap);
                for (const extension of ['esm', 'udm']) {
                    const file = `webcimes-modal.${extension}.d.ts`;
                    this.emitFile({
                        type: 'asset',
                        fileName: `js/${file}`,
                        source: types.replace(
                            'sourceMappingURL=webcimes-modal.d.ts.map',
                            `sourceMappingURL=${file}.map`,
                        ),
                    });
                    this.emitFile({
                        type: 'asset',
                        fileName: `js/${file}.map`,
                        source: JSON.stringify({
                            ...typesMap,
                            file,
                            sources: ['../../src/ts/webcimes-modal.ts'],
                        }),
                    });
                }
                this.emitFile({
                    type: 'asset',
                    fileName: 'images/times.svg',
                    source: await readFile(closeIcon),
                });
            },
        },
    ],
    build: {
        // A CSS-only rebuild updates the ESM build and leaves the UMD bundle in place.
        emptyOutDir: false,
        target: 'esnext',
        sourcemap: true,
        rolldownOptions: {
            output: {
                // Minify whitespace in ESM output as well as UMD.
                minify: true,
            },
        },
        lib: {
            entry: source,
            name: 'WebcimesModal',
            formats: ['es', 'umd'],
            // Keep the published filenames, including the legacy .udm.js suffix.
            fileName: (format) => `js/webcimes-modal.${format === 'es' ? 'esm' : 'udm'}.js`,
        },
    },
}));
