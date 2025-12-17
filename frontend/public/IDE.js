// import Autocompwords from './AutoCmp.js';

let theme="dark";

function seltheme(val){
    if(val){
        theme="light";
    }
    else{
        theme="dark";
    }
}

require(["vs/editor/editor.main"], function () {
    const initialCode = "#include <stdio.h>\n\nint main(){\n\t\n}";

    // Load saved code from localStorage if available
    const savedCode = localStorage.getItem("editorCode") || initialCode;


    const editor = monaco.editor.create(document.getElementById("editor"), {
        value: savedCode,
        language: "c",
        theme: "vs-"+theme,
        automaticLayout: true
    });

    const output = document.getElementById("output");
    const runBtn = document.getElementById("runBtn");
    const resetBtn = document.getElementById("resetBtn");

    // Focus and set initial cursor
    editor.focus();
    editor.setPosition({ lineNumber: 4, column: 10 });

    // Save code automatically on change
    editor.onDidChangeModelContent(() => {
        localStorage.setItem("editorCode", editor.getValue());
    });

    // Reset button event handler
    resetBtn.addEventListener('click', () => {
        editor.setValue(initialCode);
        editor.setPosition({ lineNumber: 4, column: 5 });
        editor.focus();
        localStorage.setItem("editorCode", initialCode);
    });

    // Run button (send code to backend)
    runBtn.onclick = () => {
        const code = editor.getValue();
        output.textContent = "Compiling...";
        fetch("/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code })
        })
            .then(res => res.text())
            .then(out => output.textContent = out);
    };

    // ----- Lightweight autocomplete for C -----
    // monaco.languages.registerCompletionItemProvider('c', {
    //     provideCompletionItems: function (model, position) {
    //         return {
    //             suggestions: 
    //         };
    //     }
    // });
});