const { Op, fn, col, literal } = require("sequelize");
const FleetTripModel = require("../../models/trip/fleet-trip-details/Fleet-trip.model");
const {
  FuelTransactionModel,
  FuelStationModel,
} = require("../../models/fuel/fuel.model");
/**
 * Get Fleet Trip Metrics (Month & Today separated)
 */

exports.getFleetTripMetrics = async (req, res) => {
  try {
    const { cid } = req;
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const startPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    // ---- Fetch Metrics ----
    const [currentMetrics, prevMetrics, todayMetrics, monthlyTrend] =
      await Promise.all([
        // Current Month Totals
        FleetTripModel.findAll({
          attributes: [
            "routeName",
            [fn("SUM", col("balance")), "totalBalance"],
          ],
          where: {
            cid,
            date: { [Op.between]: [startOfMonth, endOfMonth] },
            isDeleted: false,
          },
          group: ["routeName"],
          raw: true,
        }),
        // Previous Month Totals
        FleetTripModel.findAll({
          attributes: [
            "routeName",
            [fn("SUM", col("balance")), "totalBalance"],
          ],
          where: {
            cid,
            date: { [Op.between]: [startPrevMonth, endPrevMonth] },
            isDeleted: false,
          },
          group: ["routeName"],
          raw: true,
        }),
        // Today's Totals
        FleetTripModel.findAll({
          attributes: [
            "routeName",
            [fn("SUM", col("balance")), "totalBalance"],
          ],
          where: {
            cid,
            date: { [Op.between]: [startOfDay, endOfDay] },
            isDeleted: false,
          },
          group: ["routeName"],
          raw: true,
        }),
        // Monthly Trend for Last 12 Months (route-wise)
        FleetTripModel.findAll({
          attributes: [
            [fn("YEAR", col("date")), "year"],
            [fn("MONTH", col("date")), "month"],
            "routeName",
            [fn("SUM", col("balance")), "totalBalance"],
          ],
          where: {
            cid,
            isDeleted: false,
            date: {
              [Op.between]: [
                new Date(now.getFullYear(), now.getMonth() - 11, 1),
                endOfMonth,
              ],
            },
          },
          group: [
            fn("YEAR", col("date")),
            fn("MONTH", col("date")),
            "routeName",
          ],
          order: [
            [fn("YEAR", col("date")), "ASC"],
            [fn("MONTH", col("date")), "ASC"],
            ["routeName", "ASC"],
          ],
          raw: true,
        }),
      ]);

    // ---- Monthly Metrics with Growth ----
    const monthData = currentMetrics.map((curr) => {
      const prev = prevMetrics.find((p) => p.routeName === curr.routeName);
      const prevBalance = prev ? parseFloat(prev.totalBalance) : 0;
      const currBalance = parseFloat(curr.totalBalance);
      const growth = prevBalance
        ? (((currBalance - prevBalance) / prevBalance) * 100).toFixed(2)
        : "100.00";
      return {
        routeName: curr.routeName,
        totalBalance: currBalance,
        growthPercent: growth,
      };
    });

    // ---- Today Metrics ----
    const todayData = todayMetrics.map((t) => ({
      routeName: t.routeName,
      totalBalance: parseFloat(t.totalBalance),
    }));

    // ---- Format Graph Data per Month ----
    const formattedGraph = [];
    monthlyTrend.forEach((m) => {
      const monthName = new Date(m.year, m.month - 1).toLocaleString(
        "default",
        { month: "short" }
      );
      const label = `${monthName} ${m.year}`;
      const monthObj = formattedGraph.find((g) => g.month === label);
      const totalBalance = parseFloat(m.totalBalance);

      if (monthObj) {
        monthObj.data.push({ routeName: m.routeName, totalBalance });
      } else {
        formattedGraph.push({
          month: label,
          data: [{ routeName: m.routeName, totalBalance }],
        });
      }
    });

    // ---- Date Labels ----
    const formattedMonth = now.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    const formattedDate = now.toLocaleDateString("en-GB");

    res.json({
      success: true,
      month: { label: formattedMonth, data: monthData },
      today: { label: formattedDate, data: todayData },
      graph: formattedGraph,
    });
  } catch (error) {
    console.error("Error in getFleetTripMetrics:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getRecentPayments = async (req, res) => {
  try {
    const { cid } = req;
    const recentPayments = await FuelTransactionModel.findAll({
      where: { cid, isDeleted: false },
      order: [["date", "DESC"]],
      limit: 4,
      include: [
        {
          model: FuelStationModel,
          as: "FuelStation",
          attributes: ["id", "FuelStationName"],
        },
      ],
    });

    res.json({ success: true, recentPayments });
  } catch (error) {
    console.error("Error in getRecentPayments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
