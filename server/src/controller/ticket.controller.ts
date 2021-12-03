import { Request, Response } from "express";
import prisma from "../db/prisma";

export const createTicketHandler = async (req: Request, res: Response) => {
  const { destinationId }: { destinationId: string } = req.body;

  const existedDestination = await prisma.destination.findUnique({
    where: {
      id: destinationId,
    },
  });

  if (!existedDestination) {
    return res.status(400).send({ errorMessage: "The destination does not exist. Please choose an available one." });
  }

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        destination: {
          connect: {
            id: existedDestination.id,
          },
        },
      },
      select: {
        id: true,
        destinationId: true,
        destination: true,
      },
    });
    return res.json(newTicket);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export const getAllTicketsHandler = async (_req: Request, res: Response) => {
  try {
    const allTickets = await prisma.ticket.findMany({
      select: {
        id: true,
        destination: true,
        status: true,
      },
    });
    return res.json(allTickets);
  } catch (error) {
    console.log("unexpected error: ", error);
    return res.sendStatus(500);
  }
};

export const getAvailableTicketsHandler = async (_req: Request, res: Response) => {
  try {
    const availableTickets = await prisma.ticket.findMany({
      where: {
        status: "AVAILABLE",
      },
      select: {
        id: true,
        destination: true,
        status: true,
      },
    });
    return res.json(availableTickets);
  } catch (error) {
    console.log("unexpected error: ", error);
    return res.sendStatus(500);
  }
};

export const getUsersTicketsHandler = async (_req: Request, res: Response) => {
  const userId = res.locals.user.userId;
  try {
    const usersTickets = await prisma.user.findMany({
      where: {
        id: userId,
      },
      select: {
        tickets: {
          select: {
            id: true,
            destination: {
              select: {
                id: true,
                destination: true,
              },
            },
          },
        },
      },
    });
    return res.json(usersTickets);
  } catch (error) {
    console.log("unexpected error: ", error);
    return res.sendStatus(500);
  }
};

export const sellTicketHandler = async (req: Request, res: Response) => {
  const ticketId = req.params.ticketId;
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!ticket) {
    return res.status(400).send({ errorMessage: "The ticket does not exist. Please choose a different one." });
  }

  if (ticket.status !== "PRIVATE") {
    return res.status(400).send({ errorMessage: "The ticket is not available for sells. Please choose a different one." });
  }

  try {
    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: "AVAILABLE",
        user: {
          disconnect: true,
        },
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ errorMessage: "Something is not right during the transaction. Please try a different one." });
  }
};

export const buyTicketHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user.userId;

  const ticketId = req.params.ticketId;
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!ticket) {
    return res.status(400).send({ errorMessage: "The ticket does not exist. Please choose a different one." });
  }

  if (ticket.status !== "AVAILABLE") {
    return res.status(400).send({ errorMessage: "The ticket is not available for buys. Please choose a different one." });
  }

  try {
    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: "PRIVATE",
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ errorMessage: "Something is not right during the transaction. Please try a different one." });
  }
};

export const deleteTicketHandler = async (req: Request, res: Response) => {
  const ticketId = req.params.ticketId;
  try {
    // const ticket = await prisma.ticket.findUnique({
    //   where: {
    //     id: ticketId,
    //   },
    // });

    // if (!ticket) {
    //   return res.status(400).send({
    //     errorMessage: "Something is not right. Please try a different one.",
    //   });
    // }

    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).send({ errorMessage: "Something is not right. Please try a different one." });
  }
};
