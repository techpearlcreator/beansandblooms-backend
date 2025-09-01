// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',            // your DB user
    host: 'localhost',           // DB host
    database: 'fullstack-db',   // your DB name
    password: 'techpearl',   // your DB password
    port: 5432,
});

// API endpoint to save orders
app.post('/api/orders', async (req, res) => {
    const { customerName, address, orderItems, orderTotal, orderNumber, orderTime, screenshotUrl } = req.body;

    try {
        const query = `
            INSERT INTO orders 
            (customer_name, address, order_items, total_amount, order_number, order_time, screenshot_url)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
        `;
        await pool.query(query, [
            customerName,
            address,
            JSON.stringify(orderItems), // store as JSON string
            orderTotal,
            orderNumber,
            orderTime,
            screenshotUrl
        ]);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
