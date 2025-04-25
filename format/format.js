window.storyFormat({
	name: 'My Story Format',
	version: '1.4.0',
	source: '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\t\t<meta charset=\"utf-8\"/>\n\t\t<title>{{STORY_NAME}}</title>\n\t</head>\n\t<body>\n\t\t{{STORY_DATA}}\n\t\t<page>\n\t\t</page>\n\t</body>\n</html>',
 	editorExtensions: {
		twine: {
			'^2.4.0-alpha1': {
				codeMirror: {
					mode() {
						return {
							startState() {
								return {};
							},
							token(stream, state) {
								if (stream.match(/\[[^\]]+\]/g)) {
									return 'variable-2';
								}
								if (stream.match(/^-[^:]*(:.*)$/)) {
									return 'variable-2';
								}
								if (/^\/\//.test(stream)) {
									return 'bracket';
								}

								stream.skipToEnd();
								return 'text';
							}
						};
					}
				},
				references: {
					parsePassageText(text) {
						const results = [];

						const move = text.match(/\[move\s*(.+?)\s*]/);
						if (move) {
						  results.push(move[1]);
						}
						
						const route = text.match(/^-.*?:\s*([^\s:].*?)(?=\s*:|$)/);
						if (route) {
						  const action = route[1].match(/(=|\+|-|\*|\/| is | roll | chance )/);
						
						  if (!action) {
							results.push(route[1]); 
						  }
						}

						return results;
					}
				}
			}
		}
	}
});