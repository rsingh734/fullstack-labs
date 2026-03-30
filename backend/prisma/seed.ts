import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear old data first
  await prisma.employee.deleteMany();
  await prisma.role.deleteMany();
  await prisma.department.deleteMany();

  // Departments + employees
  const departmentsData = [
    {
      name: "Administration",
      employees: [
        { firstName: "Zoë", lastName: "Robins" },
        { firstName: "Madeleine", lastName: "Madden" },
      ],
    },
    {
      name: "Audit",
      employees: [
        { firstName: "Josha", lastName: "Sadowski" },
        { firstName: "Kate", lastName: "Fleetwood" },
      ],
    },
    {
      name: "Banking Operations",
      employees: [
        { firstName: "Priyanka", lastName: "Bose" },
        { firstName: "Hammed", lastName: "Animashaun" },
        { firstName: "Álvaro", lastName: "Morte" },
        { firstName: "Taylor", lastName: "Napier" },
        { firstName: "Alan", lastName: "Simmonds" },
      ],
    },
    {
      name: "Communications",
      employees: [
        { firstName: "Gil", lastName: "Cardinal" },
        { firstName: "Richard", lastName: "J. Lewis" },
      ],
    },
    {
      name: "Corporate Services",
      employees: [
        { firstName: "Randy", lastName: "Bradshaw" },
        { firstName: "Tracey", lastName: "Cook" },
        { firstName: "Lubomir", lastName: "Mykytiuk" },
      ],
    },
    {
      name: "Facilities",
      employees: [
        { firstName: "Dakota", lastName: "House" },
        { firstName: "Lori", lastName: "Lea Okemah" },
        { firstName: "Renae", lastName: "Morrisseau" },
        { firstName: "Rick", lastName: "Belcourt" },
      ],
    },
    {
      name: "Financial Services",
      employees: [
        { firstName: "Selina", lastName: "Hanusa" },
        { firstName: "Buffy", lastName: "Gaudry" },
        { firstName: "Shaneen", lastName: "Ann Fox" },
        { firstName: "Allan", lastName: "Little" },
        { firstName: "Danny", lastName: "Rabbit" },
      ],
    },
    {
      name: "Human Resources",
      employees: [
        { firstName: "Jesse", lastName: "Ed Azure" },
        { firstName: "Stacy", lastName: "Da Silva" },
        { firstName: "Vladimír", lastName: "Valenta" },
        { firstName: "Samone", lastName: "Sayeses-Whitney" },
        { firstName: "Paul", lastName: "Coeur" },
      ],
    },
    {
      name: "Information Technology",
      employees: [
        { firstName: "Graham", lastName: "Greene" },
        { firstName: "Sandika", lastName: "Evergreen" },
        { firstName: "Jennifer", lastName: "Rodriguez (Software Developer)" },
      ],
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
        { firstName: "Onatah", lastName: "Redhawk" },
      ],
    },
  ];

  for (const department of departmentsData) {
    await prisma.department.create({
      data: {
        name: department.name,
        employees: {
          create: department.employees,
        },
      },
    });
  }

  // Roles
  const rolesData = [
    { firstName: "Jo-Anne", lastName: "Sinclair", role: "CEO/Chair of Board" },
    { firstName: "Jackson", lastName: "Smith", role: "COO/VP Operations" },
    { firstName: "Susan", lastName: "Thomas", role: "CFO/VP Administration" },
    { firstName: "Richa", lastName: "Kaur", role: "VP Client Services" },
    { firstName: "Josee", lastName: "Benjamin", role: "CIO" },
    { firstName: "Vincent", lastName: "Grey", role: "VP Sales & Marketing" },
    { firstName: "Rupa", lastName: "Kharki", role: "Director Financial and Audit Svcs" },
    { firstName: "Xun", lastName: "Kuang", role: "Director Human Resources" },
    { firstName: "Stien", lastName: "Pedersen", role: "Director Legal Services/General Counsel" },
    { firstName: "Sandra", lastName: "Bear", role: "Director Information Technology" },
    { firstName: "Gus", lastName: "Blue", role: "Director Information Security and CISSO" },
    { firstName: "Sam", lastName: "Kong", role: "Director Accounting" },
    { firstName: "Valentine", lastName: "Smith", role: "Director Physical Security" },
    { firstName: "Mariya", lastName: "Kaperski", role: "Director Facilities" },
    { firstName: "Abd al-Hamid", lastName: "Alami", role: "Manager, Business Continuity and Disaster Recovery" },
    { firstName: "Victoria", lastName: "Gray", role: "Manager, Internal Audit" },
    { firstName: "Cheryl", lastName: "Guru", role: "Chief Architect" },
    { firstName: "Jean", lastName: "Ngoy", role: "Manager, Security Architecture" },
    { firstName: "Kris", lastName: "Gold", role: "Solution Architect, Online Banking" },
    { firstName: "Isaac", lastName: "Smith", role: "Manager, Application Solutions" },
    { firstName: "Payton", lastName: "Frost", role: "Lead Developer, Online Banking" },
    { firstName: "Samantha", lastName: "Nettle", role: "Manager, Operational Risk" },
    { firstName: "Yolanda", lastName: "Ferreira", role: "Manager, Vendor Relations" },
    { firstName: "Samir", lastName: "Hassan", role: "Manager, Purchasing" },
    { firstName: "Yuna", lastName: "Aikawa", role: "Manager, Communications" },
    { firstName: "Jonathan", lastName: "Carberry", role: "Manager Customer Experience and Community Eng." },
    { firstName: "Roland", lastName: "Wei", role: "Manager of Sales" },
    { firstName: "Pran", lastName: "Singh", role: "Manager, Marketing" },
    { firstName: "Linda", lastName: "Analyst", role: "Business Analyst, Online Banking" },
    { firstName: "Esra", lastName: "Sedge", role: "Manager, Contract Management" },
    { firstName: "Pranee", lastName: "Tan", role: "Manager, Compliance Management" },
    { firstName: "Karmen", lastName: "Spruce", role: "Manager IT End User Service Desk" },
    { firstName: "Haydar", lastName: "Katirci", role: "Manager IT End User Computing" },
    { firstName: "Jill", lastName: "Harkness", role: "Manager IT Telecom and Infrastructure" },
    { firstName: "Tim", lastName: "Morrison", role: "Manager, Data Center and Hosting Services" },
    { firstName: "Aleksandr", lastName: "Milosevic", role: "Manager of IT Risk Management" },
    { firstName: "Jim", lastName: "Wingnut", role: "Manager IT, project management office" },
    { firstName: "Vacant", role: "Left Vacant" },
    { firstName: "Vacant", role: "Left Vacant" },
    { firstName: "Vacant", role: "Left Vacant" },
    { firstName: "Vacant", role: "Left Vacant" },
    { firstName: "Vacant", role: "Left Vacant" },
    { firstName: "Vacant", role: "Left Vacant" },
  ];

  for (const role of rolesData) {
    await prisma.role.create({
      data: role,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });