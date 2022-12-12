import { Request, Response } from 'express';

import OrderApprovedService from '../services/OrderApprovedService';

export default class OrderApprovedController {
  public async create(req: Request, res: Response): Promise<Response> {
    const orderApproved = new OrderApprovedService();

    await orderApproved.execute(req.body);

    return res.json({ success: true });
  }
}
