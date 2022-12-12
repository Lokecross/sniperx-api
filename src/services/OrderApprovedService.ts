import astronmembers from '../apis/astronmembers';
import sniperx from '../apis/sniperx';

type IAstronPaymantType = 'billet'| 'credit_card'| 'debit_card'| 'bank_transfer'|
'moip_balance'| 'bcash_balance'|
'paypal'|'order.checkout.hotmart_balance';

interface IAstronHook {
  hottok: string;
  prod: number | string;
  prod_name?: string;
  off: string;
  price: number;
  email: string;
  name: string;
  doc: string;
  phone_local_code: number;
  phone_number: number | string;
  transaction: string;
  status: 'approved' | 'canceled' | 'refunded'  | 'dispute' | 'chargeback' | 'blocked' | 'billet_printed' | 'wayting_payment' | 'delayed';
  payment_type: IAstronPaymantType;
  name_subscription_plan?: string;
  subscriber_code?: string;
  recurrency_period?:  7 | 30 | 60 | 90 | 180 | 360;
  recurrency?: number;
  subscription_status?: 'active' | 'canceled' | 'past_due' | 'expired' | 'started' | 'inactive';
  purchase_date: string;
  confirmation_purchase_date: string;
  billet_barcode?: string;
  producer_name?: string;
  full_price: number;
  product_support_email?: string;
  installments_number?: number;
  productOfferPaymentMode: 'pagamento_unico' | 'multiplos_pagamentos' | 'pagamento_vista';
}

interface ISniperxHook {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone_number: string;
  doc_type: string;
  doc: string;
  postal_code: string;
  address: string;
  complement: string | null;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  card_number: string | null;
  card_installments: string | null;
  payment_method: 'pix' | 'boleto' | 'credit_card';
  information_additional: string | null;
  shipping_method: string;
  shipping_deadline: string | null;
  shipping_price: string | null;
  ip: string;
  origin: string;
  cart_payload_id: number;
  source: string;
  source_url: string;
  user_uuid: string;
  amount: number;
  gateway: string;
  shop_id: number;
  uuid: string;
  updated_at: string;
  created_at: string;
  id: number;
  hash_id: string;
  products: Array<{
    id: number;
    title: string;
    variant_title: string;
    image: string | null;
    quantity: number;
    price: string;
    order_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
  sub_total: number;
  interest: number;
  full_address: string;
  full_name: string;
  payment_gateway_title: string;
  payment_method_title: string;
  subscription: boolean;
  asset_download_url: string;
  items: Array<{
    id: number;
    title: string;
    variant_title: string;
    image: string | null;
    quantity: number;
    price: string;
    order_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }>;
}

class OrderApprovedService {
  constructor(
  ) {}

  public async execute(sniperxbody: ISniperxHook): Promise<void> {
    const { data: { token } } = await sniperx.post<{ token: string }>('/shop/auth/credentials', {
      email: process.env.SNIPERX_USER,
      password: process.env.SNIPERX_PASSWORD,
      shop_uuid: process.env.SNIPERX_SHOP,
    });

    sniperx.defaults.headers.common.authorization = `Bearer ${token}`;

    const { data: { sku } } = await sniperx.post<{ sku: string }>(`/shop/products/show/${sniperxbody.products[0].id}`);

    const payment_type = (): IAstronPaymantType => {
      if (sniperxbody.payment_method === 'pix') {
        return 'bank_transfer';
      }

      if (sniperxbody.payment_method === 'boleto') {
        return 'billet';
      }

      return 'credit_card';
    }

    const body: IAstronHook = {
      hottok: process.env.ASTRON_HOTTOK as string,
      prod: process.env.SNIPERX_SHOP as string,
      off: sku,
      name: sniperxbody.full_name,
      email: sniperxbody.email,
      full_price: sniperxbody.amount,
      price: sniperxbody.amount,
      transaction: sniperxbody.uuid,
      purchase_date: sniperxbody.created_at,
      status: 'approved',
      phone_number: sniperxbody.phone_number,
      phone_local_code: 55,
      doc: sniperxbody.doc,
      productOfferPaymentMode: 'pagamento_unico',
      payment_type: payment_type(),
      confirmation_purchase_date: new Date().toISOString(),
    }

    await astronmembers.post(`/hotmart-webhook/${process.env.ASTRON_API_ID}`, body);

    console.log('OK');
  }
}

export default OrderApprovedService;
