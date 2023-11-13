import { Request, Response } from 'express';

const getHealth = (_req: Request, res: Response) =>
    res.status(200).send("I'm alive! :)");

export default { getHealth };
