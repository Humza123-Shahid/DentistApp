const router = require('express').Router();
const Payment = require('../../models/Payment');
const Expense = require('../../models/Expense');
var fetchuser=require('../../middleware/fetchuser');

router.get('/revenue-expense-chart',fetchuser, async (req, res) => {
  try {
    const currentYear = new Date().getFullYear(); // 2025

    // Year boundaries
    const startOfYear = new Date(`${currentYear}-01-01`);
    const endOfYear   = new Date(`${currentYear}-12-31`);
    const revenue = await Payment.aggregate([
        {
        $match: {
          paymentDate: { $gte: startOfYear, $lte: endOfYear }  // ← filter year
        }
      },
      { $group: {
          _id: { $month: '$paymentDate' },
          total: { $sum: '$amount' }
      }},
      { $sort: { '_id': 1 } }
    ]);

    const expenses = await Expense.aggregate([
        {
        $match: {
          expenseDate: { $gte: startOfYear, $lte: endOfYear }  // ← filter year
        }
      },
      { $group: {
          _id: { $month: '$expenseDate' },
          total: { $sum: '$amount' }
      }},
      { $sort: { '_id': 1 } }
    ]);

    // Merge into one array by month
    const MONTHS = ['Jan','Feb','Mar','Apr','May',
                    'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const merged = MONTHS.map((month, i) => {
      const monthNum = i + 1;
      const rev = revenue.find(r => r._id === monthNum);
      const exp = expenses.find(e => e._id === monthNum);
      return {
        month,
        revenue: rev?.total || 0,
        expenses: exp?.total || 0,
      };
    });

    res.json(merged);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;