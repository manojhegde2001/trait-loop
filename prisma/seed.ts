import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sampleQuestions = [
    // Openness
    { text: "Have a vivid imagination.", domain: "O", facet: 1, keyed: "plus" },
    { text: "Have a rich vocabulary.", domain: "O", facet: 2, keyed: "plus" },
    { text: "Am not interested in abstract ideas.", domain: "O", facet: 3, keyed: "minus" },
    // Conscientiousness
    { text: "Am always prepared.", domain: "C", facet: 1, keyed: "plus" },
    { text: "Pay attention to details.", domain: "C", facet: 2, keyed: "plus" },
    { text: "Leave my belongings around.", domain: "C", facet: 3, keyed: "minus" },
    // Extraversion
    { text: "Am the life of the party.", domain: "E", facet: 1, keyed: "plus" },
    { text: "Don't talk a lot.", domain: "E", facet: 2, keyed: "minus" },
    { text: "Feel comfortable around people.", domain: "E", facet: 3, keyed: "plus" },
    // Agreeableness
    { text: "Feel little concern for others.", domain: "A", facet: 1, keyed: "minus" },
    { text: "Am interested in people.", domain: "A", facet: 2, keyed: "plus" },
    { text: "Insult people.", domain: "A", facet: 3, keyed: "minus" },
    // Neuroticism
    { text: "Get stressed out easily.", domain: "N", facet: 1, keyed: "plus" },
    { text: "Am relaxed most of the time.", domain: "N", facet: 2, keyed: "minus" },
    { text: "Worry about things.", domain: "N", facet: 3, keyed: "plus" },
  ];

  console.log('Seeding sample questions...');
  
  await prisma.question.deleteMany({});
  
  for (const q of sampleQuestions) {
    await prisma.question.create({ data: q });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
