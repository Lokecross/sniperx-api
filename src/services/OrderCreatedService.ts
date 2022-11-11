import astronmembers from '../apis/astronmembers';

class OrderCreatedService {
  constructor(
  ) {}

  public async execute(data: any): Promise<void> {
    console.log(data)

    // await astronmembers.post('/tools/hotmart-webhook', {
    //   testing: true,
    // });
  }
}

export default OrderCreatedService;
