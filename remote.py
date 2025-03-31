from flask import Flask, render_template, request, Response
import pyautogui
from pynput.keyboard import Key, Controller
from flask_cors import CORS
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)
keyboard = Controller()


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/volUp", methods=["GET"])
def volUp():
    keyboard.press(Key.media_volume_up)
    return "ok"


@app.route("/volDown", methods=["GET"])
def volDown():
    keyboard.press(Key.media_volume_down)
    return "ok"


@app.route("/volMute", methods=["GET"])
def volMute():
    keyboard.press(Key.media_volume_mute)
    return "ok"


@app.route("/playpause", methods=["GET"])
def playpause():
    keyboard.press(Key.media_play_pause)
    return "ok"


@app.route("/up", methods=["GET"])
def up():
    keyboard.press(Key.up)
    return "ok"


@app.route("/down", methods=["GET"])
def down():
    keyboard.press(Key.down)
    return "ok"


@app.route("/left", methods=["GET"])
def left():
    keyboard.press(Key.left)
    return "ok"


@app.route("/right", methods=["GET"])
def right():
    keyboard.press(Key.right)

    return "ok"


@app.route("/typeText", methods=["POST"], strict_slashes=False)
def typeText():
    text = request.json["text"]
    if text:
        keyboard.type(text)
    return "ok"


@app.route("/enter", methods=["GET"])
def enter():
    keyboard.press(Key.enter)
    return "ok"


@app.route("/backspace", methods=["GET"])
def backspace():
    keyboard.press(Key.backspace)
    return "ok"


@app.route("/tab", methods=["GET"])
def tab():
    keyboard.press(Key.tab)
    return "ok"


@app.route("/skipForward", methods=["GET"])
def skipForward():
    keyboard.press(Key.media_next)
    return "ok"


@app.route("/skipBackward", methods=["GET"])
def skipBackward():
    keyboard.press(Key.media_previous)
    return "ok"


@app.route("/clickLeft", methods=["GET"])
def clickLeft():
    pyautogui.leftClick()
    return "ok"


@app.route("/clickRight", methods=["GET"])
def clickRight():
    pyautogui.rightClick()
    return "ok"


@app.route("/moveMouse", methods=["POST"], strict_slashes=False)
def moveMouse():
    try:
        x = request.json["x"]
        y = request.json["y"]
        speed = int(request.json["speed"])
        if x and y and speed:
            oldX, oldY = pyautogui.position()
            try:
                pyautogui.moveTo(oldX + (x * speed), oldY - (y * speed))
            except pyautogui.FailSafeException:
                pass
    except ValueError:
        pass
    return "ok"


def generate_frames():
    while True:
        screenshot = pyautogui.screenshot()

        frame = np.array(screenshot)

        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        x, y = pyautogui.position()

        cv2.circle(frame, (x, y), 10, (0, 0, 255), -1)

        _, buffer = cv2.imencode(".jpg", frame)

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" + buffer.tobytes() + b"\r\n"
        )


@app.route("/stream")
def stream():
    return Response(
        generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
