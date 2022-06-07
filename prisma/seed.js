const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  const createdContact = await prisma.contact.create({
    data: {
      phone: "079410000111",
      email: "alice@alice.com",
      customerId: createdCustomer.id,
    },
  });

  console.log("Contact created", createdContact);

  const createdMovie = await prisma.movie.create({
    data: {
      title: "The Title of The Movie",
      runtimeMins: 150,
    },
  });

  const createdScreen = await prisma.screen.create({
    data: {
      number: 5,
    },
  });

  const createdScreening = await prisma.screening.create({
    data: {
      movieId: createdMovie.id,
      screenId: createdScreen.id,
      startsAt: "1997-07-16T19:20:30.451Z",
    },
  });

  const createdTicket = await prisma.ticket.create({
    data: {
      customerId: createdCustomer.id,
      screeningId: createdScreening.id,
    },
  });

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
