import { Request, Response } from "express";
import prisma from "../db/prisma";

export const createTicketHandler = async (req: Request, res: Response) => {
  const { location }: { location: string } = req.body;

  const theDestination = await prisma.location.findUnique({
    where: {
      id: location,
    },
  });

  if (!theDestination) {
    return res.status(400).send({
      errorMessage: "The location does not exist. Please choose an available one.",
    });
  }

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        destination: {
          connect: {
            id: theDestination.id,
          },
        },
      },
      select: {
        id: true,
        locationId: true,
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
      },
    });
    return res.json(allTickets);
  } catch (error) {
    console.log("unexpected error: ", error);
    return res.sendStatus(500);
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
    return res.status(400).send({
      errorMessage: "Something is not right. Please try a different one.",
    });
  }
};
