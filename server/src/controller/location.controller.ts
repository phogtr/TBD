import { Request, Response } from "express";
import prisma from "../db/prisma";

export const newLocationHandler = async (req: Request, res: Response) => {
  const { name }: { name: string } = req.body;

  try {
    const newLocation = await prisma.location.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.json(newLocation);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "This location has already been existed. Please enter a new location",
    });
  }
};

export const getAllLocationsHandler = async (_req: Request, res: Response) => {
  try {
    const allLocations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return res.json(allLocations);
  } catch (error) {
    console.log("unexpected error: ", error);
    return res.sendStatus(500);
  }
};

export const getAvailableLocationsHandler = async (_req: Request, res: Response) => {
  try {
    // const locationCount = await prisma.location.count({
    //   where: {
    //     ticket: {
    //       is: null,
    //     },
    //   },
    // });
    const validLocations = await prisma.location.findMany({
      where: {
        ticket: {
          is: null,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.json(validLocations);
  } catch (error) {
    console.log("error: ", error);
    return res.sendStatus(500);
  }
};
