import { Request, Response } from "express";
import prisma from "../db/prisma";

export const newDestinationHandler = async (req: Request, res: Response) => {
  const { destination }: { destination: string } = req.body;

  try {
    const newDestination = await prisma.destination.create({
      data: {
        destination,
      },
      select: {
        id: true,
        destination: true,
      },
    });
    return res.json(newDestination);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "This destination has already been existed. Please enter a new destination",
    });
  }
};

export const getAllDestinationsHandler = async (_req: Request, res: Response) => {
  try {
    const allDestinations = await prisma.destination.findMany({
      select: {
        id: true,
        destination: true,
      },
    });
    return res.json(allDestinations);
  } catch (error) {
    console.log("unexpected error: ", error);
    return res.sendStatus(500);
  }
};

export const getAvailableDestinationsHandler = async (_req: Request, res: Response) => {
  try {
    // const destinationCount = await prisma.destination.count({
    //   where: {
    //     ticket: {
    //       is: null,
    //     },
    //   },
    // });
    const validDestinations = await prisma.destination.findMany({
      where: {
        ticket: {
          is: null,
        },
      },
      select: {
        id: true,
        destination: true,
      },
    });
    return res.json(validDestinations);
  } catch (error) {
    console.log("error: ", error);
    return res.sendStatus(500);
  }
};

export const removeDestinationHandler = async (req: Request, res: Response) => {
  const destinationId = req.params.destinationId;

  const ticket = await prisma.ticket.findUnique({
    where: {
      destinationId,
    },
  });

  if (ticket) {
    await prisma.ticket.delete({
      where: {
        destinationId,
      },
    });
  }

  try {
    await prisma.destination.delete({
      where: {
        id: destinationId,
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log("error: ", error);
    return res
      .status(400)
      .send({ errorMessage: "Something is not right. Please try a different one." });
  }
};
