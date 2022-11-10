"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
app.use(express_1.default.json());
route.get('/', (req, res) => {
    res.json({ message: 'hello world with Typescript' });
});
// order.created - Disparado ao criar novo pedido
route.post('/order/created', (req, res) => {
    res.json({ success: true, content: req.body });
});
// order.approved - Disparado ao pedido ser pago e aprovado
route.post('/order/approved', (req, res) => {
    res.json({ success: true, content: req.body });
});
// order.payment_failed - Disparado ao pedido ter um pagamento falho
route.post('/order/payment_failed', (req, res) => {
    res.json({ success: true, content: req.body });
});
// subscription.past_due - Disparado quando uma assinatura está atrasada
route.post('/subscription/past_due', (req, res) => {
    res.json({ success: true, content: req.body });
});
// subscription.canceled - Disparado quando a assinatura for cancelada
route.post('/subscription/canceled', (req, res) => {
    res.json({ success: true, content: req.body });
});
// cart.abandon - Disparado quando o carrinho for abandonado
route.post('/cart/abandon', (req, res) => {
    res.json({ success: true, content: req.body });
});
app.use(route);
app.listen(3333, () => 'server running on port 3333');
