export const Autocompwords = [
    { label: 'printf', kind: monaco.languages.CompletionItemKind.Function, insertText: 'printf($1);', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Print formatted output' },

    { label: 'scanf', kind: monaco.languages.CompletionItemKind.Function, insertText: 'scanf($1);', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Read formatted input' },

    { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return ', documentation: 'Return statement' },

    { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if ($1) {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'If statement' },

    { label: 'else', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'else {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Else statement' },

    { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for(int $1 = 0; $1 < $2; $1++) {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'For loop' },

    { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while($1) {\n\t$0\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'While loop' },

    { label: 'do', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'do {\n\t$0\n} while($1);', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Do-while loop' },

    { label: '#include', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '#include <$1>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Include header file' },

    { label: '#define', kind: monaco.languages.CompletionItemKind.Snippet, insertText: '#define $1 $0', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Define macro' },

    { label: 'struct', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'struct $1 {\n\t$0\n};', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Define a structure' },

    { label: 'typedef', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'typedef $1 $0;', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Typedef' },

    { label: 'enum', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'enum $1 {\n\t$0\n};', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Enumeration' },

    { label: 'switch', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'switch($1) {\n\tcase $2:\n\t\t$0\n\t\tbreak;\n}', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet, documentation: 'Switch statement' },

    { label: 'break', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'break;', documentation: 'Break from loop or switch' },

    { label: 'continue', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'continue;', documentation: 'Continue loop iteration' }
]