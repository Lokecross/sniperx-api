import astronmembers from '../apis/astronmembers';

interface IAstronHook {
  hottok: string;
  prod: number;
  prod_name: string;
  off: string;
  price: number;
  email: string;
  name: string;
  doc: string;
  phone_local_code: number;
  phone_number: number;
  transaction: string;
  status: 'approved' | 'canceled' | 'refunded'  | 'dispute' | 'chargeback' | 'blocked' | 'billet_printed' | 'wayting_payment' | 'delayed';
  payment_type: 'billet'| 'credit_card'| 'debit_card'| 'bank_transfer'|
  'moip_balance'| 'bcash_balance'|
  'paypal'|'order.checkout.hotmart_balance';
  name_subscription_plan?: string;
  subscriber_code: string;
  recurrency_period:  7 | 30 | 60 | 90 | 180 | 360;
  recurrency: number;
  subscription_status?: 'active' | 'canceled' | 'past_due' | 'expired' | 'started' | 'inactive';
  purchase_date: string;
  confirmation_purchase_date: string;
  billet_barcode?: string;
  producer_name: string;
  full_price: number;
  product_support_email: string;
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
  payment_method: string;
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
  products: Array<string>;
  sub_total: number;
  interest: number;
  full_address: string;
  full_name: string;
  payment_gateway_title: string;
  payment_method_title: string;
  subscription: boolean;
  asset_download_url: string;
  items: Array<string>;
}

class OrderCreatedService {
  constructor(
  ) {}

  public async execute(sniperx: ISniperxHook): Promise<void> {
    const body: IAstronHook = {
      hottok: 'ThisIsALongSecureToken',
      name: sniperx.full_name,
      email: sniperx.email,
      full_price: sniperx.amount,
      price: sniperx.amount,
      subscriber_code: sniperx.user_uuid,
      transaction: sniperx.uuid,
      purchase_date: sniperx.created_at,
      status: 'wayting_payment',
      prod: 1,
      prod_name: 'Testing prod_name',
      producer_name: 'Testing producer_name',
      phone_number: Number(sniperx.phone_number),
      phone_local_code: 55,
      doc: sniperx.doc,
      productOfferPaymentMode: 'pagamento_unico',
      payment_type: 'debit_card',
      product_support_email: 'dev@sniperx.co',
      confirmation_purchase_date: sniperx.created_at,
      recurrency: 1,
      recurrency_period: 360,
      off: sniperx.uuid,

      // subscription_status: 'active',
      // name_subscription_plan: '',
      // installments_number: 1,
      // billet_barcode: '',
    }

    const { data } = await astronmembers.post('/hotmart-webhook/JQR6yHV2CrkJgcp', body);

    console.log(data);
  }
}

export default OrderCreatedService;
