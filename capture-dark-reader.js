// Dark Reader Color Capture Script
// Run this in your browser console while Dark Reader is enabled

function captureDarkReaderColors() {
    const colorData = {
        timestamp: new Date().toISOString(),
        website: window.location.href,
        colors: {}
    };

    // Capture main body colors
    const body = document.body;
    const bodyComputed = window.getComputedStyle(body);
    colorData.colors.body = {
        backgroundColor: bodyComputed.backgroundColor,
        color: bodyComputed.color
    };

    // Capture navbar colors
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const navComputed = window.getComputedStyle(navbar);
        colorData.colors.navbar = {
            backgroundColor: navComputed.backgroundColor,
            color: navComputed.color
        };
    }

    // Capture section backgrounds
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const sectionComputed = window.getComputedStyle(section);
        const sectionId = section.id || `section-${index}`;
        colorData.colors[sectionId] = {
            backgroundColor: sectionComputed.backgroundColor
        };
    });

    // Capture card backgrounds
    const cards = document.querySelectorAll('.timeline-content, .project-card');
    cards.forEach((card, index) => {
        const cardComputed = window.getComputedStyle(card);
        colorData.colors[`card-${index}`] = {
            backgroundColor: cardComputed.backgroundColor,
            color: cardComputed.color,
            boxShadow: cardComputed.boxShadow
        };
    });

    // Capture text colors
    const textElements = document.querySelectorAll('h1, h2, h3, p, .section-title, .company, .period');
    textElements.forEach((element, index) => {
        const textComputed = window.getComputedStyle(element);
        const tagName = element.tagName.toLowerCase();
        const className = element.className;
        const selector = className ? `${tagName}.${className}` : tagName;
        colorData.colors[`text-${index}`] = {
            selector: selector,
            color: textComputed.color
        };
    });

    // Capture button and link colors
    const buttons = document.querySelectorAll('.btn-primary, .project-link, .social-link');
    buttons.forEach((button, index) => {
        const buttonComputed = window.getComputedStyle(button);
        const className = button.className;
        colorData.colors[`button-${index}`] = {
            selector: className,
            backgroundColor: buttonComputed.backgroundColor,
            color: buttonComputed.color
        };
    });

    // Capture skill tag colors
    const skillTags = document.querySelectorAll('.skill-tag');
    if (skillTags.length > 0) {
        const skillComputed = window.getComputedStyle(skillTags[0]);
        colorData.colors.skillTags = {
            backgroundColor: skillComputed.backgroundColor,
            color: skillComputed.color
        };
    }

    // Create formatted text output
    let output = `Dark Reader Color Capture
Generated: ${colorData.timestamp}
Website: ${colorData.website}

=== MAIN COLORS ===
Body Background: ${colorData.colors.body.backgroundColor}
Body Text: ${colorData.colors.body.color}

=== NAVBAR ===
Background: ${colorData.colors.navbar?.backgroundColor || 'Not found'}
Text: ${colorData.colors.navbar?.color || 'Not found'}

=== SECTIONS ===
`;

    // Add section colors
    Object.keys(colorData.colors).forEach(key => {
        if (key.startsWith('section-')) {
            output += `${key}: ${colorData.colors[key].backgroundColor}\n`;
        }
    });

    output += `\n=== CARDS ===\n`;
    Object.keys(colorData.colors).forEach(key => {
        if (key.startsWith('card-')) {
            output += `${key}:\n`;
            output += `  Background: ${colorData.colors[key].backgroundColor}\n`;
            output += `  Text: ${colorData.colors[key].color}\n`;
            output += `  Shadow: ${colorData.colors[key].boxShadow}\n\n`;
        }
    });

    output += `=== TEXT COLORS ===\n`;
    Object.keys(colorData.colors).forEach(key => {
        if (key.startsWith('text-')) {
            output += `${colorData.colors[key].selector}: ${colorData.colors[key].color}\n`;
        }
    });

    output += `\n=== BUTTONS & LINKS ===\n`;
    Object.keys(colorData.colors).forEach(key => {
        if (key.startsWith('button-')) {
            output += `${colorData.colors[key].selector}:\n`;
            output += `  Background: ${colorData.colors[key].backgroundColor}\n`;
            output += `  Text: ${colorData.colors[key].color}\n\n`;
        }
    });

    if (colorData.colors.skillTags) {
        output += `=== SKILL TAGS ===\n`;
        output += `Background: ${colorData.colors.skillTags.backgroundColor}\n`;
        output += `Text: ${colorData.colors.skillTags.color}\n`;
    }

    output += `\n=== RAW DATA ===\n`;
    output += JSON.stringify(colorData, null, 2);

    // Create download link
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dark-reader-colors.txt';
    a.click();
    URL.revokeObjectURL(url);

    console.log('Color capture complete! File downloaded as "dark-reader-colors.txt"');
    console.log('Raw data:', colorData);
    
    return colorData;
}

// Run the capture
captureDarkReaderColors(); 