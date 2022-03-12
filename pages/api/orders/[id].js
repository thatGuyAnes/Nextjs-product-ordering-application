import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const order = await Order.findById(id);
      res.status(200).json({success: true, data: order});
    } catch (err) {
      res.status(500).json({ success: false, error: err});
    }
  }
  if (method === 'PUT') {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({success: true, data: order});
    } catch (err) {
      res.status(500).json({success: true, error: err});
    }
  }
  if (method === 'DELETE') {
  }
};

export default handler;
