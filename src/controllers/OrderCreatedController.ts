import { Request, Response } from 'express';

import OrderCreatedService from '../services/OrderCreatedService';

export default class OrderCreatedController {
  public async create(req: Request, res: Response): Promise<Response> {
    const indexDefaultFields = new OrderCreatedService();

    await indexDefaultFields.execute(req.body);

    return res.json({ success: true });
  }
}
