import { Request, Response } from 'express';

import OrderCreatedService from '../services/OrderCreatedService';

export default class OrderCreatedController {
  public async create(req: Request, res: Response): Promise<Response> {
    const orderCreated = new OrderCreatedService();

    await orderCreated.execute(req.body);

    return res.json({ success: true });
  }
}
