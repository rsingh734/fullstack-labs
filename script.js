const departments = [
    {
        name: "Administration",
        employees: [
            { firstName: "Zoë", lastName: "Robins" },
            { firstName: "Madeleine", lastName: "Madden" }
        ]
    },
    {
        name: "Audit",
        employees: [
            { firstName: "Josha", lastName: "Sadowski" },
            { firstName: "Kate", lastName: "Fleetwood" }
        ]
    },
    {
        name: "Banking Operations",
        employees: [
            { firstName: "Priyanka", lastName: "Bose" },
            { firstName: "Hammed", lastName: "Animashaun" },
            { firstName: "Álvaro", lastName: "Morte" },
            { firstName: "Taylor", lastName: "Napier" },
            { firstName: "Alan", lastName: "Simmonds" }
        ]
    },
    {
        name: "Communications",
        employees: [
            { firstName: "Gil", lastName: "Cardinal" },
            { firstName: "Richard", lastName: "J. Lewis" }
        ]
    },
    {
        name: "Corporate Services",
        employees: [
            { firstName: "Randy", lastName: "Bradshaw" },
            { firstName: "Tracey", lastName: "Cook" },
            { firstName: "Lubomir", lastName: "Mykytiuk" }
        ]
    },
    {
        name: "Facilities",
        employees: [
            { firstName: "Dakota", lastName: "House" },
            { firstName: "Lori", lastName: "Lea Okemah" },
            { firstName: "Renae", lastName: "Morrisseau" },
            { firstName: "Rick", lastName: "Belcourt" }
        ]
    },
    {
        name: "Financial Services",
        employees: [
            { firstName: "Selina", lastName: "Hanusa" },
            { firstName: "Buffy", lastName: "Gaudry" },
            { firstName: "Shaneen", lastName: "Ann Fox" },
            { firstName: "Allan", lastName: "Little" },
            { firstName: "Danny", lastName: "Rabbit" }
        ]
    },
    {
        name: "Human Resources",
        employees: [
            { firstName: "Jesse", lastName: "Ed Azure" },
            { firstName: "Stacy", lastName: "Da Silva" },
            { firstName: "Vladimír", lastName: "Valenta" },
            { firstName: "Samone", lastName: "Sayeses-Whitney" },
            { firstName: "Paul", lastName: "Coeur" }
        ]
    },
    {
        name: "Information Technology",
        employees: [
            { firstName: "Graham", lastName: "Greene" },
            { firstName: "Sandika", lastName: "Evergreen" },
            { firstName: "Jennifer", lastName: "Rodriguez" }
        ]
    },
    {
        name: "IT Technician",
        employees: [
            { firstName: "Aiyana", lastName: "Littlebear" },
            { firstName: "Inara", lastName: "Thunderbird" },
            { firstName: "Kaya", lastName: "Runningbrook" },
            { firstName: "Elara", lastName: "Firehawk" },
            { firstName: "Siona", lastName: "Moonflower" },
            { firstName: "Kaiyu", lastName: "Greywolf" },
            { firstName: "Ayawamat", lastName: "Nightwind" },
            { firstName: "Tala", lastName: "Braveheart" },
            { firstName: "Iniko", lastName: "Stonebear" },
            { firstName: "Onatah", lastName: "Redhawk" }
        ]
    }
];

// Function to display departments with employees
function displayDepartments() {
    const container = document.getElementById('departments-container');
    
    departments.forEach(department => {
        // Create department section
        const departmentSection = document.createElement('section');
        departmentSection.className = 'department';
        
        // Department header
        const header = document.createElement('h2');
        header.textContent = `${department.name} (${department.employees.length})`;
        departmentSection.appendChild(header);
        
        // Employee list
        const employeeList = document.createElement('ul');
        employeeList.className = 'employee-list';
        
        // Add each employee
        department.employees.forEach(employee => {
            const listItem = document.createElement('li');
            listItem.className = 'employee-item';
            
            const fullName = employee.lastName 
                ? `${employee.firstName} ${employee.lastName}`
                : employee.firstName;
                
            listItem.textContent = fullName;
            employeeList.appendChild(listItem);
        });
        
        departmentSection.appendChild(employeeList);
        container.appendChild(departmentSection);
    });
}

// Function to set current year in footer
function setCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayDepartments();
    setCurrentYear();
});