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
