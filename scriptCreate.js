let uploadedImageURL = '';

document.getElementById('photo').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageURL = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function addExperienceEntry() {
    const experienceSection = document.getElementById('experience-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('experience-entry');
    newEntry.innerHTML = `
        <label>Job Role:</label>
        <input type="text" class="job-role" placeholder="Job Role">

        <label>Company Name:</label>
        <input type="text" class="company-name" placeholder="Company Name">

        <label>Job Description:</label>
        <textarea class="job-description" placeholder="Job Description"></textarea>

        <label>Time Period:</label>
        <input type="text" class="time-period" placeholder="e.g., Jan 2022 - Dec 2022">
    `;
    experienceSection.appendChild(newEntry);
}

function generatePortfolio() {
    const name = document.getElementById('name').value;
    const bio = document.getElementById('bio').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const bgColor = document.getElementById('bg-color').value;
    const codingLinks = document.getElementById('coding-links').value.split(',').map(link => link.trim());

    const experienceEntries = document.querySelectorAll('.experience-entry');
    const experiences = Array.from(experienceEntries).map(entry => {
        const jobRole = entry.querySelector('.job-role').value;
        const companyName = entry.querySelector('.company-name').value;
        const jobDescription = entry.querySelector('.job-description').value;
        const timePeriod = entry.querySelector('.time-period').value;
        return { jobRole, companyName, jobDescription, timePeriod };
    });

    const contactDetails = `
        <h3>Contact Details:</h3>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Address:</strong> ${address}</p>
    `;

    const codingLinksSection = `
        <h3>Coding Platforms:</h3>
        <ul>
            ${codingLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}
        </ul>
    `;

    const portfolioTemplate = `
        <div class="profile-box" style="text-align: center;">
            ${uploadedImageURL ? `<img src="${uploadedImageURL}" alt="User Photo" style="max-width: 150px; border-radius: 50%;">` : ''}
            <h2>${name}</h2>
        </div>
        <p><strong>Bio:</strong> ${bio}</p>
        <h3>Skills:</h3>
        <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
        ${experiences.length > 0 && experiences[0].jobRole ? `
            <h3>Experience:</h3>
            ${experiences.map(exp => `
                <div class="experience-entry">
                    <p><strong>${exp.jobRole} at ${exp.companyName}</strong> <span style="float:right;">${exp.timePeriod}</span></p>
                    <p>${exp.jobDescription}</p>
                </div>
            `).join('')}
        ` : ''}
        ${contactDetails}
        ${codingLinksSection}
    `;

    const previewDiv = document.getElementById('preview');
    previewDiv.innerHTML = portfolioTemplate;
    previewDiv.style.backgroundColor = bgColor;

    // Generate the downloadable HTML file
    const completeHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${name}'s Portfolio</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; background-color: ${bgColor}; color: #333; }
                .profile-box { text-align: center; }
                .experience-entry { margin-bottom: 15px; }
            </style>
        </head>
        <body>
            ${portfolioTemplate}
        </body>
        </html>
    `;
    function downloadPortfolio(content, filename) {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    

    downloadPortfolio(completeHtml, `${name}-portfolio.html`);
}
