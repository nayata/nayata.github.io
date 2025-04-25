window.storyFormat({
	name: 'My Story Format',
	version: '1.0.0',
	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				codeMirror: {
					commands: {
						upperCase(editor) {
							const doc = editor.getDoc();

							doc.replaceSelection(doc.getSelection().toUpperCase());
						}
					},
					mode() {
						return {
							startState() {
								return {};
							},
							token(stream, state) {
								stream.skipToEnd();
								return 'keyword';
							}
						};
					},
					toolbar(editor, environment) {
						return [
							{
								type: 'button',
								command: 'upperCase',
								icon: 'data:image/svg+xml,...',
								label: 'Uppercase Text'
							}
						];
					}
				},
				references: {
					parsePassageText(text) {
						const match = text.match(/\[move\s*(.+?)\s*]/);
						if (match) {
							return match[1];
						}
						return text;
					}
				}
			}
		}
	}
});