import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const questions = [
  { text: 'Worry about things', keyed: 'plus', domain: 'N', facet: 1, isQuick: true },
  { text: 'Make friends easily', keyed: 'plus', domain: 'E', facet: 1, isQuick: true },
  { text: 'Have a vivid imagination', keyed: 'plus', domain: 'O', facet: 1, isQuick: true },
  { text: 'Trust others', keyed: 'plus', domain: 'A', facet: 1, isQuick: true },
  { text: 'Complete tasks successfully', keyed: 'plus', domain: 'C', facet: 1, isQuick: true },
  { text: 'Get angry easily', keyed: 'plus', domain: 'N', facet: 2, isQuick: true },
  { text: 'Love large parties', keyed: 'plus', domain: 'E', facet: 2, isQuick: true },
  { text: 'Believe in the importance of art', keyed: 'plus', domain: 'O', facet: 2, isQuick: true },
  { text: 'Use others for my own ends', keyed: 'minus', domain: 'A', facet: 2, isQuick: true },
  { text: 'Like to tidy up', keyed: 'plus', domain: 'C', facet: 2, isQuick: true },
  { text: 'Often feel blue', keyed: 'plus', domain: 'N', facet: 3, isQuick: true },
  { text: 'Take charge', keyed: 'plus', domain: 'E', facet: 3, isQuick: true },
  { text: 'Experience my emotions intensely', keyed: 'plus', domain: 'O', facet: 3, isQuick: true },
  { text: 'Love to help others', keyed: 'plus', domain: 'A', facet: 3, isQuick: true },
  { text: 'Keep my promises', keyed: 'plus', domain: 'C', facet: 3, isQuick: true },
  { text: 'Find it difficult to approach others', keyed: 'plus', domain: 'N', facet: 4, isQuick: true },
  { text: 'Am always busy', keyed: 'plus', domain: 'E', facet: 4, isQuick: true },
  { text: 'Prefer variety to routine', keyed: 'plus', domain: 'O', facet: 4, isQuick: true },
  { text: 'Love a good fight', keyed: 'minus', domain: 'A', facet: 4, isQuick: true },
  { text: 'Work hard', keyed: 'plus', domain: 'C', facet: 4, isQuick: true },
  { text: 'Go on binges', keyed: 'plus', domain: 'N', facet: 5, isQuick: true },
  { text: 'Love excitement', keyed: 'plus', domain: 'E', facet: 5, isQuick: true },
  { text: 'Love to read challenging material', keyed: 'plus', domain: 'O', facet: 5, isQuick: true },
  { text: 'Believe that I am better than others', keyed: 'minus', domain: 'A', facet: 5, isQuick: true },
  { text: 'Am always prepared', keyed: 'plus', domain: 'C', facet: 5, isQuick: true },
  { text: 'Panic easily', keyed: 'plus', domain: 'N', facet: 6, isQuick: true },
  { text: 'Radiate joy', keyed: 'plus', domain: 'E', facet: 6, isQuick: true },
  { text: 'Tend to vote for liberal political candidates', keyed: 'plus', domain: 'O', facet: 6, isQuick: true },
  { text: 'Sympathize with the homeless', keyed: 'plus', domain: 'A', facet: 6, isQuick: true },
  { text: 'Jump into things without thinking', keyed: 'minus', domain: 'C', facet: 6, isQuick: true },
  
  // Remaining 90 questions for the full 120-item version
  { text: 'Fear for the worst', keyed: 'plus', domain: 'N', facet: 1 },
  { text: 'Feel comfortable around people', keyed: 'plus', domain: 'E', facet: 1 },
  { text: 'Enjoy wild flights of fantasy', keyed: 'plus', domain: 'O', facet: 1 },
  { text: 'Believe that others have good intentions', keyed: 'plus', domain: 'A', facet: 1 },
  { text: 'Excel in what I do', keyed: 'plus', domain: 'C', facet: 1 },
  { text: 'Get irritated easily', keyed: 'plus', domain: 'N', facet: 2 },
  { text: 'Talk to a lot of different people at parties', keyed: 'plus', domain: 'E', facet: 2 },
  { text: 'See beauty in things that others might not notice', keyed: 'plus', domain: 'O', facet: 2 },
  { text: 'Cheat to get ahead', keyed: 'minus', domain: 'A', facet: 2 },
  { text: 'Often forget to put things back in their proper place', keyed: 'minus', domain: 'C', facet: 2 },
  { text: 'Dislike myself', keyed: 'plus', domain: 'N', facet: 3 },
  { text: 'Try to lead others', keyed: 'plus', domain: 'E', facet: 3 },
  { text: "Feel others' emotions", keyed: 'plus', domain: 'O', facet: 3 },
  { text: 'Am concerned about others', keyed: 'plus', domain: 'A', facet: 3 },
  { text: 'Tell the truth', keyed: 'plus', domain: 'C', facet: 3 },
  { text: 'Am afraid to draw attention to myself', keyed: 'plus', domain: 'N', facet: 4 },
  { text: 'Am always on the go', keyed: 'plus', domain: 'E', facet: 4 },
  { text: 'Prefer to stick with things that I know', keyed: 'minus', domain: 'O', facet: 4 },
  { text: 'Yell at people', keyed: 'minus', domain: 'A', facet: 4 },
  { text: "Do more than what's expected of me", keyed: 'plus', domain: 'C', facet: 4 },
  { text: 'Rarely overindulge', keyed: 'minus', domain: 'N', facet: 5 },
  { text: 'Seek adventure', keyed: 'plus', domain: 'E', facet: 5 },
  { text: 'Avoid philosophical discussions', keyed: 'minus', domain: 'O', facet: 5 },
  { text: 'Think highly of myself', keyed: 'minus', domain: 'A', facet: 5 },
  { text: 'Carry out my plans', keyed: 'plus', domain: 'C', facet: 5 },
  { text: 'Become overwhelmed by events', keyed: 'plus', domain: 'N', facet: 6 },
  { text: 'Have a lot of fun', keyed: 'plus', domain: 'E', facet: 6 },
  { text: 'Believe that there is no absolute right and wrong', keyed: 'plus', domain: 'O', facet: 6 },
  { text: 'Feel sympathy for those who are worse off than myself', keyed: 'plus', domain: 'A', facet: 6 },
  { text: 'Make rash decisions', keyed: 'minus', domain: 'C', facet: 6 },
  { text: 'Am afraid of many things', keyed: 'plus', domain: 'N', facet: 1 },
  { text: 'Avoid contacts with others', keyed: 'minus', domain: 'E', facet: 1 },
  { text: 'Love to daydream', keyed: 'plus', domain: 'O', facet: 1 },
  { text: 'Trust what people say', keyed: 'plus', domain: 'A', facet: 1 },
  { text: 'Handle tasks smoothly', keyed: 'plus', domain: 'C', facet: 1 },
  { text: 'Lose my temper', keyed: 'plus', domain: 'N', facet: 2 },
  { text: 'Prefer to be alone', keyed: 'minus', domain: 'E', facet: 2 },
  { text: 'Do not like poetry', keyed: 'minus', domain: 'O', facet: 2 },
  { text: 'Take advantage of others', keyed: 'minus', domain: 'A', facet: 2 },
  { text: 'Leave a mess in my room', keyed: 'minus', domain: 'C', facet: 2 },
  { text: 'Am often down in the dumps', keyed: 'plus', domain: 'N', facet: 3 },
  { text: 'Take control of things', keyed: 'plus', domain: 'E', facet: 3 },
  { text: 'Rarely notice my emotional reactions', keyed: 'minus', domain: 'O', facet: 3 },
  { text: 'Am indifferent to the feelings of others', keyed: 'minus', domain: 'A', facet: 3 },
  { text: 'Break rules', keyed: 'minus', domain: 'C', facet: 3 },
  { text: 'Only feel comfortable with friends', keyed: 'plus', domain: 'N', facet: 4 },
  { text: 'Do a lot in my spare time', keyed: 'plus', domain: 'E', facet: 4 },
  { text: 'Dislike changes', keyed: 'minus', domain: 'O', facet: 4 },
  { text: 'Insult people', keyed: 'minus', domain: 'A', facet: 4 },
  { text: 'Do just enough work to get by', keyed: 'minus', domain: 'C', facet: 4 },
  { text: 'Easily resist temptations', keyed: 'minus', domain: 'N', facet: 5 },
  { text: 'Enjoy being reckless', keyed: 'plus', domain: 'E', facet: 5 },
  { text: 'Have difficulty understanding abstract ideas', keyed: 'minus', domain: 'O', facet: 5 },
  { text: 'Have a high opinion of myself', keyed: 'minus', domain: 'A', facet: 5 },
  { text: 'Waste my time', keyed: 'minus', domain: 'C', facet: 5 },
  { text: "Feel that I'm unable to deal with things", keyed: 'plus', domain: 'N', facet: 6 },
  { text: 'Love life', keyed: 'plus', domain: 'E', facet: 6 },
  { text: 'Tend to vote for conservative political candidates', keyed: 'minus', domain: 'O', facet: 6 },
  { text: "Am not interested in other people's problems", keyed: 'minus', domain: 'A', facet: 6 },
  { text: 'Rush into things', keyed: 'minus', domain: 'C', facet: 6 },
  { text: 'Get stressed out easily', keyed: 'plus', domain: 'N', facet: 1 },
  { text: 'Keep others at a distance', keyed: 'minus', domain: 'E', facet: 1 },
  { text: 'Like to get lost in thought', keyed: 'plus', domain: 'O', facet: 1 },
  { text: 'Distrust people', keyed: 'minus', domain: 'A', facet: 1 },
  { text: 'Know how to get things done', keyed: 'plus', domain: 'C', facet: 1 },
  { text: 'Am not easily annoyed', keyed: 'minus', domain: 'N', facet: 2 },
  { text: 'Avoid crowds', keyed: 'minus', domain: 'E', facet: 2 },
  { text: 'Do not enjoy going to art museums', keyed: 'minus', domain: 'O', facet: 2 },
  { text: "Obstruct others' plans", keyed: 'minus', domain: 'A', facet: 2 },
  { text: 'Leave my belongings around', keyed: 'minus', domain: 'C', facet: 2 },
  { text: 'Feel comfortable with myself', keyed: 'minus', domain: 'N', facet: 3 },
  { text: 'Wait for others to lead the way', keyed: 'minus', domain: 'E', facet: 3 },
  { text: "Don't understand people who get emotional", keyed: 'minus', domain: 'O', facet: 3 },
  { text: 'Take no time for others', keyed: 'minus', domain: 'A', facet: 3 },
  { text: 'Break my promises', keyed: 'minus', domain: 'C', facet: 3 },
  { text: 'Am not bothered by difficult social situations', keyed: 'minus', domain: 'N', facet: 4 },
  { text: 'Like to take it easy', keyed: 'minus', domain: 'E', facet: 4 },
  { text: 'Am attached to conventional ways', keyed: 'minus', domain: 'O', facet: 4 },
  { text: 'Get back at others', keyed: 'minus', domain: 'A', facet: 4 },
  { text: 'Put little time and effort into my work', keyed: 'minus', domain: 'C', facet: 4 },
  { text: 'Am able to control my cravings', keyed: 'minus', domain: 'N', facet: 5 },
  { text: 'Act wild and crazy', keyed: 'plus', domain: 'E', facet: 5 },
  { text: 'Am not interested in theoretical discussions', keyed: 'minus', domain: 'O', facet: 5 },
  { text: 'Boast about my virtues', keyed: 'minus', domain: 'A', facet: 5 },
  { text: 'Waste my time', keyed: 'minus', domain: 'C', facet: 5 },
  { text: 'Feel that I am a failure', keyed: 'plus', domain: 'N', facet: 6 },
  { text: 'Look at the bright side of life', keyed: 'plus', domain: 'E', facet: 6 },
  { text: 'Believe in the importance of tradition', keyed: 'minus', domain: 'O', facet: 6 },
  { text: 'Believe that everyone should have a say', keyed: 'plus', domain: 'A', facet: 6 },
  { text: 'Am always on time', keyed: 'plus', domain: 'C', facet: 6 }
]

async function main() {
  console.log('🌱 Starting seeding...')
  
  // Clear existing questions
  await prisma.question.deleteMany()
  console.log('🗑️ Cleared existing questions')

  // Import all 120 questions
  await prisma.question.createMany({
    data: questions
  })
  
  const count = await prisma.question.count()
  const quickCount = await prisma.question.count({ where: { isQuick: true } })
  
  console.log(`✅ Seeded ${count} questions successfully.`)
  console.log(`📊 Quick mode items: ${quickCount}`)
  console.log('🌲 Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
