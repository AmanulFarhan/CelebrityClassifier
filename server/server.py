from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/classify_image', methods = ['GET', 'POST'])
def classify_image():
    image_data = request.form.get('image_data')
    if not image_data:
        response = jsonify({'error': 'image_data is required'})
        response.status_code = 400
        response.headers.add('Access-Control-Allow-Origin', "*")
        return response

    response = jsonify(util.classify_image(image_data))
    print(response)
    response.headers.add('Access-Control-Allow-Origin', "*")
    return response

util.load_saved_artifacts()

if (__name__ == "__main__"):
    print("Starting Python server for celebrity classifier")
    util.load_saved_artifacts()
    app.run(port=5000)
