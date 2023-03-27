#!/usr/bin/env osascript -l JavaScript

// INFO JXA-specific method -> replace if not using macOS
function writeToFile(filepath, text) {
	const str = $.NSString.alloc.initWithUTF8String(text);
	str.writeToFileAtomicallyEncodingError(
		filepath,
		true,
		$.NSUTF8StringEncoding,
		null
	);
}

// INFO JXA-specific method -> replace if not using macOS
function httpRequest(url) {
	const app = Application.currentApplication();
	app.includeStandardAdditions = true;
	return app.doShellScript(`curl -sL "${url}"`).replace(/\r/g, "\n"); // JXA returns line breaks as `\\\r`
}

//──────────────────────────────────────────────────────────────────────────────

function codePoint2Char(codepoint) {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
	try {
		const icon = String.fromCodePoint("0x" + codepoint);
		return icon;
	} catch (error) {
		errorCount++;
		return false;
	}
}

const source =
	"https://raw.githubusercontent.com/loichyan/nerdfix/main/src/cached.txt";
const outputPath = "./lua/cmp_nerdfont/items.lua";

//──────────────────────────────────────────────────────────────────────────────

let errorCount = 0;
const newLines = httpRequest(source)
	.split("\n")
	.slice(1) // first line is just heading
	.filter((line) => !line.match(/obsolete$/)) // remove obsolete nerdfont icons (see loichyan/nerdfix)
	.map((line) => {
		const name = line.split(" ")[0];
		const codepoint = line.split(" ")[1];
		if (!codepoint) return;
		const icon = codePoint2Char(codepoint);
		const newLine = `{ word = ":${name}"; label = "${icon} ${name}"; insertText = "${icon}"; filterText = ":${name}" };`;
		return newLine;
	});

// wrap in first and last line, write to file
newLines.unshift("return function() return {");
newLines.push("} end");
writeToFile(outputPath, newLines.join("\n"));

//──────────────────────────────────────────────────────────────────────────────

// ensure everything went correctly
const directReturn =
	errorCount === 0 ? "✅ No errors" : toString(errorCount) + " errors.";

directReturn;
