import postgres from "postgres";

const sql = postgres("postgres://admin:admin@localhost:5432/forum");

export default sql;
