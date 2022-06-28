
function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

function modifyMailtoLinks() {
	const links = document.querySelectorAll('a[href^="mailto:"]');
	for(const link of links) {
		link.setAttribute('mailto',link.href);
		link.href="#";
		//console.log('registered listener');
	}
}

function handleMailto(e) {
	if (	e.target.tagName === "A" && e.target.hasAttribute('mailto') ) {
		const email = e.target.getAttribute('mailto').split('mailto:')[1];
		copyToClipboard(email);
		//console.log('copied ', email, " to clipboard");
	}
}

window.addEventListener("click", handleMailto);

modifyMailtoLinks();

(new MutationObserver(modifyMailtoLinks)).observe(document.body, { attributes: false, childList: true, subtree: true });

