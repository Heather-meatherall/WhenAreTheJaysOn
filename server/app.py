import statsapi
import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from config import SECRET_KEY

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
CORS(app)

# Define the team ID and date range
team_id = 141  # Toronto Blue Jays

@app.route("/playingToday")
def playingToday():
    date = datetime.datetime.now()
    
    schedule = statsapi.schedule(team=team_id, start_date=date.strftime("%Y-%m-%d"), end_date=date.strftime("%Y-%m-%d"))

    if schedule:
        return jsonify({"result": "Yes! The Jays are playing today!", "schedule": schedule})

    return jsonify({"result": "No! The Jays aren't playing today", "next": schedule})

@app.route("/loadGames")
def loadGames():
    start = datetime.datetime.now()
    # add thirty days to today's date
    end =(start + datetime.timedelta(30))

    # Fetch the schedule
    schedule = statsapi.schedule(team=team_id, start_date=start.strftime("%Y-%m-%d"), end_date=end.strftime("%Y-%m-%d"),)

    return jsonify({"start": start.strftime("%Y-%m-%d"), "end": end.strftime("%Y-%m-%d"), "schedule": schedule})





