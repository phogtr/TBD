import { Request, Response } from "express";
import prisma from "../db/prisma";

export const createLocationHandler = async (req: Request, res: Response) => {
  const {name}: {name: string} =  req.body;

  try {
    const newLocation = await prisma.location.create({
      data: {
        name
      },
      select: {
        id: true,
        name: true
      }
    })
    return res.json(newLocation);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "This location has already been existed. Please enter a new location"
    })
  }
}     