#coding: utf-8

from flask import Flask, request
from json import json
app = Flask(__name__)

@app.route("/json.json")
def get_tasks():
    return ""
if __name__ == "__main__":
    app.run()


