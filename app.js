// FORCE REFRESH - Always use fresh data with your images!
const defaultCompanies = [
    { id: 1, name: "Google", logo: "images/google.png", category: "Top", type: "Product", branch: "Bangalore", role: "Software Engineer", minCGPA: 9.0, maxBacklogs: 0, applicationUrl: "https://careers.google.com" },
    { id: 2, name: "Microsoft", logo: "images/microsoft.png", category: "Top", type: "Product", branch: "Hyderabad", role: "SDE", minCGPA: 8.5, maxBacklogs: 0, applicationUrl: "https://careers.microsoft.com" },
    { id: 3, name: "TCS", logo: "images/tcs.png", category: "Average", type: "Service", branch: "Mumbai", role: "System Engineer", minCGPA: 6.0, maxBacklogs: 2, applicationUrl: "https://www.tcs.com/careers" },
    { id: 4, name: "Infosys", logo: "images/infosys.png", category: "Average", type: "Service", branch: "Bangalore", role: "Software Developer", minCGPA: 6.5, maxBacklogs: 1, applicationUrl: "https://www.infosys.com/careers" },
    { id: 5, name: "Wipro", logo: "images/wipro.png", category: "Average", type: "Service", branch: "Pune", role: "Project Engineer", minCGPA: 6.0, maxBacklogs: 2, applicationUrl: "https://careers.wipro.com" },
    { id: 6, name: "Amazon", logo: "images/amazon.png", category: "Top", type: "Product", branch: "Bangalore", role: "SDE", minCGPA: 8.0, maxBacklogs: 0, applicationUrl: "https://amazon.jobs" },
    { id: 7, name: "Flipkart", logo: "images/flipkart.png", category: "Top", type: "Product", branch: "Bangalore", role: "Software Engineer", minCGPA: 8.0, maxBacklogs: 0, applicationUrl: "https://www.flipkartcareers.com" },
    { id: 8, name: "Zomato", logo: "images/zomato.png", category: "Startup", type: "Product", branch: "Gurgaon", role: "Full Stack Developer", minCGPA: 7.5, maxBacklogs: 1, applicationUrl: "https://www.zomato.com/careers" },
    { id: 9, name: "Paytm", logo: "images/paytm.png", category: "Startup", type: "Product", branch: "Noida", role: "Backend Engineer", minCGPA: 7.0, maxBacklogs: 1, applicationUrl: "https://paytm.com/careers" },
    { id: 10, name: "Cognizant", logo: "images/cognizant.png", category: "Average", type: "Service", branch: "Chennai", role: "Associate", minCGPA: 6.0, maxBacklogs: 3, applicationUrl: "https://careers.cognizant.com" }
];

// ALWAYS reset on load
localStorage.setItem('companies', JSON.stringify(defaultCompanies));

function getCompanies() {
    return JSON.parse(localStorage.getItem('companies')) || defaultCompanies;
}

function loginStudent(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email && password.length >= 6) {
        localStorage.setItem('studentEmail', email);
        window.location.href = 'student-details.html';
    } else {
        alert('Please enter valid email and password (min 6 characters)');
    }
}

function saveStudentDetails(event) {
    event.preventDefault();
    const studentData = {
        name: document.getElementById('name').value,
        branch: document.getElementById('branch').value,
        cgpa: parseFloat(document.getElementById('cgpa').value),
        backlogs: parseInt(document.getElementById('backlogs').value),
        location: document.getElementById('location').value
    };
    if (studentData.cgpa < 0 || studentData.cgpa > 10) {
        alert('CGPA must be between 0 and 10');
        return;
    }
    localStorage.setItem('studentData', JSON.stringify(studentData));
    window.location.href = 'results.html';
}

function displayEligibleCompanies() {
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    if (!studentData) {
        window.location.href = 'index.html';
        return;
    }
    const companies = getCompanies();
    const tbody = document.getElementById('resultsBody');
    const eligibleCompanies = companies.filter(company => {
        return studentData.cgpa >= company.minCGPA && studentData.backlogs <= company.maxBacklogs;
    });
    eligibleCompanies.sort((a, b) => b.placementPercentage - a.placementPercentage);
    tbody.innerHTML = '';
    if (eligibleCompanies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:30px;">No eligible companies found</td></tr>';
        return;
    }
    eligibleCompanies.forEach(company => {
        let badgeClass = company.category === 'Top' ? 'badge-top' : company.category === 'Average' ? 'badge-average' : 'badge-startup';
        let typeClass = company.type === 'Product' ? 'badge-product' : 'badge-service';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${company.logo}" alt="${company.name}" style="width:50px; height:50px; object-fit:contain; margin-right:10px; vertical-align:middle; background:#f8f9fa; border-radius:8px; padding:3px; border:1px solid #e0e0e0;" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.marginLeft='0';">
                <span style="font-weight:700; font-size:1.2em; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${company.name}</span>
            </td>
            <td><span style="display:inline-block; padding:5px 12px; border-radius:20px; font-size:0.85em; font-weight:600; color:white; background:${badgeClass === 'badge-top' ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : badgeClass === 'badge-average' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'};">${company.category}</span></td>
            <td><span style="display:inline-block; padding:5px 12px; border-radius:20px; font-size:0.85em; font-weight:600; color:white; background:${typeClass === 'badge-product' ? 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'};">${company.type}</span></td>
            <td>${company.branch}</td>
            <td>${company.role}</td>
            <td><a href="${company.applicationUrl}" target="_blank" class="btn-apply">Apply Now 🚀</a></td>
        `;
        tbody.appendChild(row);
        // SAVE VISITOR DATA TO DATABASE
    const studentEmail = localStorage.getItem('studentEmail') || 'guest';
    const companyNames = eligibleCompanies.map(c => c.name).join(',');
    
    fetch('save-visitor.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `email=${studentEmail}&cgpa=${studentData.cgpa}&backlogs=${studentData.backlogs}&companies=${companyNames}`
    });
    });
}

function addCompany(event) {
    event.preventDefault();
    const companies = getCompanies();
    const newCompany = {
        id: Date.now(),
        name: document.getElementById('compName').value,
        logo: "images/default.png",
        category: document.getElementById('compCategory').value,
        type: document.getElementById('compType').value,
        branch: document.getElementById('compBranch').value,
        role: document.getElementById('compRole').value,
        minCGPA: parseFloat(document.getElementById('compCGPA').value),
        maxBacklogs: parseInt(document.getElementById('compBacklogs').value),
        placementPercentage: parseInt(document.getElementById('compPercentage').value)
    };
    companies.push(newCompany);
    localStorage.setItem('companies', JSON.stringify(companies));
    alert('Company added successfully!');
    document.getElementById('addCompanyForm').reset();
    displayAdminCompanies();
}

function displayAdminCompanies() {
    const companies = getCompanies();
    const tbody = document.getElementById('adminCompanyList');
    if (!tbody) return;
    tbody.innerHTML = '';
    companies.forEach(company => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.minCGPA}</td>
            <td>${company.maxBacklogs}</td>
            <td>${company.category}</td>
            <td><button onclick="deleteCompany(${company.id})" style="padding:5px 10px; font-size:0.9em; background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color:white; border:none; border-radius:5px; cursor:pointer;">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

function deleteCompany(id) {
    let companies = getCompanies();
    companies = companies.filter(c => c.id !== id);
    localStorage.setItem('companies', JSON.stringify(companies));
    displayAdminCompanies();
    alert('Company deleted!');
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('resultsBody')) {
        displayEligibleCompanies();
    }
    if (document.getElementById('adminCompanyList')) {
        displayAdminCompanies();
    }
});