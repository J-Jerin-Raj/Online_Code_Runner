"use strict";
let editor;
require(['vs/editor/editor.main'], () => {
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
        language: 'c',
        theme: 'vs-dark',
        automaticLayout: true
    });
});
document.getElementById('runBtn').addEventListener('click', async () => {
    const code = editor.getValue();
    const language = document.getElementById('languageSelect').value;
    const output = document.getElementById('output');
    const status = document.getElementById('runStatus');
    status.textContent = 'Running...';
    const res = await fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
    });
    output.textContent = await res.text();
    status.textContent = 'Finished';
});
