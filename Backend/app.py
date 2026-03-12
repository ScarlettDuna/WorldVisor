from flask import Flask, jsonify
from flask_cors import CORS
import psycopg
from dotenv import load_dotenv
import os

load_dotenv() # para que python lea el .env

app = Flask(__name__)
CORS(
	app, 
	origins=["http://localhost:5173"],
	methods=["GET", "POST", "PUT", "DELETE"])

conn = psycopg.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)

@app.route("/")
def home():
	return "Backend del visor gis funcionando"

"""
GET /cities
[
	{"name": "Madrid", "lat": 40.4168, "lon": -3.7038},
	{"name": "Paris", "lat": 48.8566, "lon": 2.3522}
]
"""
@app.route("/cities")
def get_cities():
	cur = conn.cursor()
	cur.execute("SELECT name, lat, lon FROM visited_cities")
	rows = cur.fetchall()
	cities = []

	for row in rows:
		city = {
			"name": row[0],
			"lat": row[1],
			"lon": row[2]
		}
		cities.append(city)
	return jsonify(cities)


if __name__ == "__main__":
    app.run(debug=True)