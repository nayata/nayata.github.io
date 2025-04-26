window.storyFormat({
	name: 'My Story Format',
	version: '1.6.9',
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
								// Event and Choice
								if (stream.sol() && stream.match(/^\[[^[].*\]$/)) {
									return 'keyword';
								}
								if (stream.sol() && stream.next("-")) {
									if (stream.skipTo(":")) {
										return 'keyword';
									}
								}
					
								// Are we at an insert?
								if (stream.match(/^\[.+?\]/)) {
									return 'keyword';
								}
					
								// Try scanning forward to an insert or link.
								if (stream.eatWhile(/[^[{]/)) {
									return 'text';
								}

								stream.skipToEnd();
								return 'text';
							}
						};
					}
				},
				references: {
					parsePassageText(text) {
						const matchers = [/\[move\s*(.+?)\s*]/g, /^-[^:\n]*:\s*([^\n:]*)(?=\s*:|\n|$)/gm];
						const results = [];

						for (const matcher of matchers) {
							let match;
							while ((match = matcher.exec(text))) {
								const action = match[1].match(/(=|\+|-|\*|\/| is | roll | chance )/);
								if (!action) {
									results.push(match[1].trim());
								}
							}
						}

						return results;
					}
				}
			}
		}
	}
});