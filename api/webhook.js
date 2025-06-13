export default async function handler(req, res) {
  if (req.method === 'POST') {
    // process webhook
    res.status(200).json({ received: req.body })
  } else {
    res.status(405).end()
  }
}
