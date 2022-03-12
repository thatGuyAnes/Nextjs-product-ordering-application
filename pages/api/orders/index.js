import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json({success: true, data: orders});
    } catch (err) {
      res.status(400).json({ success: false, error: err });
    }
  }
  if (method === 'POST') {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({success: true, data: order});
    } catch (err) {
      // res.status(400).json({ success: false, error: err });
      res.status(500).json({ success: false, error: err });
    }
  }
};

export default handler;
