const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");

const PORT = 3001;

const app = express();

app.use(cors());

const sqlConfig = {
	user: "",
	password: "",
	server: "",
	database: "",
	driver: "msnodesqlv8",
};

app.get("/", function (req, res) {
	const limit = req.query.limit;
	const skip = req.query.skip;
	const user = req.query.user;
	const status = req.query.status;
	const dateFrom = req.query.dateFrom;
	const dateTo = req.query.dateTo;

	const dateQuery = {
		from: `AuditDate >= '${dateFrom}'`,
		to: `AuditDate <= '${dateTo}'`,
		both: `AuditDate BETWEEN '${dateFrom}' AND '${dateTo}'`,
		none: "",
	};

	sql.connect(sqlConfig, (err) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			var request = new sql.Request();
			request.query(
				`USE XELCODE;
						SELECT Id, MobileUserId, MobileDomain, Branch, OperationName, Status, Category, ExceptionType, ExceptionMessage, StartTime, EndTime, Duration, Inputs, Output, AuditDate 
						FROM dbo.LogHeader WHERE MobileUserId LIKE '%${user}%' AND Status LIKE '%${status}%' AND ${
					dateQuery[
						!dateTo
							? "from"
							: !dateFrom
							? "to"
							: dateFrom && dateTo
							? "both"
							: "none"
					]
				} ORDER BY StartTime OFFSET ${skip} ROWS FETCH NEXT ${limit} ROWS ONLY;`,
				function (error, recordset) {
					if (error) {
						console.log("Database connection error while getting recordset");
						res.sendStatus(500);
						throw error;
					}

					console.log(recordset[0]);
					recordset.recordset.length
						? res.send(recordset)
						: res.sendStatus(404);
				}
			);
		}
	});
});

app.get("/getRowsCount", function (req, res) {
	const user = req.query.user;
	const status = req.query.status;
	const dateFrom = req.query.dateFrom;
	const dateTo = req.query.dateTo;

	const dateQuery = {
		from: `AuditDate >= '${dateFrom}'`,
		to: `AuditDate <= '${dateTo}'`,
		both: `AuditDate BETWEEN '${dateFrom}' AND '${dateTo}'`,
		none: "",
	};

	sql.connect(sqlConfig, (err) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else {
			var request = new sql.Request();
			request.query(
				`USE XELCODE;
						SELECT COUNT(Id) FROM dbo.LogHeader WHERE MobileUserId LIKE '%${user}%' AND Status LIKE '%${status}%' AND ${
					dateQuery[
						!dateTo
							? "from"
							: !dateFrom
							? "to"
							: dateFrom && dateTo
							? "both"
							: "none"
					]
				};`,
				function (error, recordset) {
					if (error) {
						console.log("Database connection error while getting rows count");
						res.sendStatus(500);
						throw error;
					}

					console.log(recordset[0]);
					recordset.recordset.length
						? res.send(recordset)
						: res.sendStatus(404);
				}
			);
		}
	});
});

app.listen(PORT, function () {
	console.log(`Server started at ${PORT}`);
});
