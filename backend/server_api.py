from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import requests

app = Flask(__name__)
CORS(app, support_credentials=True)

RANDOM_USER_API = "https://randomuser.me/api/"

@app.route('/user')

def get_random_user():
    gender = request.args.get('gender', None)
    
    params = {}
    if gender:
        params['gender'] = gender
    response = requests.get(RANDOM_USER_API, params=params)

    if response.status_code == 200:
        user_data = response.json()
        return jsonify(user_data['results'][0])
    else:
        return jsonify({"error": "Unable to fetch user data"}), 500

if __name__ == '__main__':
    app.run(debug=True)