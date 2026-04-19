import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful')
    const count = await prisma.question.count()
    console.log(`📊 Current question count: ${count}`)
  } catch (error) {
    console.error('❌ Database connection failed')
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
