// IDE.ts – Monaco editor setup (no npm, loaded from CDN)

declare function require(dependencies: string[], callback: (...modules: any[]) => void): void;
declare let monaco: any;

let theme: 'dark' | 'light' = 'dark';
function seltheme(isLight: boolean): void {
    theme = isLight ? 'light' : 'dark';
}

require(['vs/editor/editor.main'], (monacoModule: any) => {
    monaco = monacoModule;

    const editorEl = document.getElementById('editor')! as HTMLElement;
    const outputEl = document.getElementById('output')! as HTMLElement;
    const runBtn = document.getElementById('runBtn') as HTMLButtonElement;
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

    const initialCode = `#include <stdio.h>\n\nint main(){\n\t\n}`;
    const savedCode = localStorage.getItem('editorCode') || initialCode;

    const editor = monaco.editor.create(editorEl, {
        value: savedCode,
        language: 'c',
        theme: 'vs-' + theme,
        automaticLayout: true,
    });

    editor.focus();
    editor.setPosition({ lineNumber: 4, column: 5 });

    editor.onDidChangeModelContent(() => {
        localStorage.setItem('editorCode', editor.getValue());
    });

    resetBtn.addEventListener('click', () => {
        editor.setValue(initialCode);
        editor.setPosition({ lineNumber: 4, column: 5 });
        editor.focus();
        localStorage.setItem('editorCode', initialCode);
    });

    runBtn.addEventListener('click', () => {
        const code = editor.getValue();
        outputEl.textContent = 'Compiling...';
        fetch('/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        })
            .then(res => res.text())
            .then(out => (outputEl.textContent = out));
    });
});