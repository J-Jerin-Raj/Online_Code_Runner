"use strict";
// IDE.ts – Monaco editor setup (no npm, loaded from CDN)
require(['vs/editor/editor.main'], (monacoModule) => {
    monaco = monacoModule;
    const editorEl = document.getElementById('editor');
    const outputEl = document.getElementById('output');
    const runBtn = document.getElementById('runBtn');
    const resetBtn = document.getElementById('resetBtn');
    const initialCode = `#include <stdio.h>\n\nint main(){\n\t\n}`;
    const savedCode = localStorage.getItem('editorCode') || initialCode;
    const editor = monaco.editor.create(editorEl, {
        value: savedCode,
        language: 'c',
        theme: 'vs-dark',
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
