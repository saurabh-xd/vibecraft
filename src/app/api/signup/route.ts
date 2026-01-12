import { Client } from "pg";

// Use environment variables for credentials
const pgClient = new Client("postgresql://neondb_owner:npg_6HkIrslWitY9@ep-curly-recipe-adlbozgs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");

// Connect once when the module loads, or use connection pooling
 pgClient.connect();

export async function POST(request: Request) {
  try {
    const { username, password, email, city, country, street, pincode } = await request.json();

   
await pgClient.query("BEGIN");
  
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id;`
  console.log(insertQuery);
  

    const response = await pgClient.query(insertQuery, [username, email, password]);
    const userId = response.rows[0].id;

    const addressQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5);`
    const addressResponse  = await pgClient.query(addressQuery, [city, country, street, pincode, userId]);

 await pgClient.query("COMMIT");

    return Response.json({
      success: true,
      message: "User registered successfully",
    }, { status: 201 });

  } catch (error:any) {
   

    return Response.json({
      success: false,
      message: "Error registering user"
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { success: false, message: "User id is required" },
        { status: 400 }
      );
    }

    const query = `
      SELECT 
        users.id,
        users.username,
        users.email,
        addresses.city,
        addresses.country,
        addresses.street,
        addresses.pincode
      FROM users
      JOIN addresses ON users.id = addresses.user_id
      WHERE users.id = $1;
    `;

    const response = await pgClient.query(query, [id]);

    return Response.json({
      success: true,
      data: response.rows[0] || null
    });

  } catch (error) {
    console.error("GET user error:", error);

    return Response.json(
      { success: false, message: "Error fetching user" },
      { status: 500 }
    );
  }
}
 
