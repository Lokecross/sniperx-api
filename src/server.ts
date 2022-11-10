import express from 'express'

import * as dotenv from 'dotenv'

import { Router, Request, Response } from 'express';

dotenv.config()

const app = express();

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript' })
})

// order.created - Disparado ao criar novo pedido
route.post('/order/created', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

// order.approved - Disparado ao pedido ser pago e aprovado
route.post('/order/approved', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

// order.payment_failed - Disparado ao pedido ter um pagamento falho
route.post('/order/payment_failed', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

// subscription.past_due - Disparado quando uma assinatura está atrasada
route.post('/subscription/past_due', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

// subscription.canceled - Disparado quando a assinatura for cancelada
route.post('/subscription/canceled', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

// subscription.approved - Disparado quando a assinatura for cancelada
route.post('/subscription/approved', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

// cart.abandon - Disparado quando o carrinho for abandonado
route.post('/cart/abandon', (req: Request, res: Response) => {
  res.json({ success: true, content: req.body })
})

app.use(route)

const port = process.env.PORT || 3000;

app.listen(port, () => `server running on port ${port}`);
